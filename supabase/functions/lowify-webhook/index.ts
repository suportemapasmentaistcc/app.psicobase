const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' };
const EXPECTED_PRODUCT_ID = Deno.env.get('LOWIFY_PRO_PRODUCT_ID') || 'jeONK3';

function respond(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

function normalize(value: unknown) {
  return String(value ?? '').trim().toLowerCase().replace(/[\s-]+/g, '_');
}

function getPath(obj: unknown, path: string): unknown {
  let current: unknown = obj;
  for (const key of path.split('.')) {
    if (!current || typeof current !== 'object' || !(key in current)) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

function firstValue(obj: unknown, paths: string[]) {
  for (const path of paths) {
    const value = getPath(obj, path);
    if (value !== undefined && value !== null && String(value).trim()) return String(value).trim();
  }
  return '';
}

function findEmail(value: unknown, depth = 0): string {
  if (!value || depth > 5 || typeof value !== 'object') return '';
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    if (/e-?mail/i.test(key) && typeof item === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.trim())) {
      return item.trim().toLowerCase();
    }
  }
  for (const item of Object.values(value as Record<string, unknown>)) {
    const nested = findEmail(item, depth + 1);
    if (nested) return nested;
  }
  return '';
}

async function sha256(text: string) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function serviceConfig() {
  const url = Deno.env.get('SUPABASE_URL') || '';
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  if (!url || !key) throw new Error('Supabase service configuration unavailable.');
  return { url, key };
}

async function adminFetch(path: string, init: RequestInit = {}) {
  const { url, key } = serviceConfig();
  const headers = new Headers(init.headers);
  headers.set('apikey', key);
  headers.set('Authorization', `Bearer ${key}`);
  if (init.body) headers.set('Content-Type', 'application/json');
  return fetch(`${url}/rest/v1/${path}`, { ...init, headers });
}

async function eventAlreadyProcessed(eventKey: string) {
  const response = await adminFetch(`payment_events?event_key=eq.${encodeURIComponent(eventKey)}&select=event_key&limit=1`);
  if (!response.ok) throw new Error(`Falha ao consultar idempotência (${response.status}).`);
  const rows = await response.json().catch(() => []);
  return Array.isArray(rows) && rows.length > 0;
}

async function recordEvent(event: { eventKey: string; status: string; email: string; productId: string; action: string }) {
  const response = await adminFetch('payment_events', {
    method: 'POST',
    headers: { 'Prefer': 'return=minimal' },
    body: JSON.stringify({
      event_key: event.eventKey,
      provider: 'lowify',
      event_status: event.status || null,
      customer_email: event.email || null,
      product_id: event.productId || null,
      action_taken: event.action,
    }),
  });
  if (!response.ok && response.status !== 409) throw new Error(`Falha ao registrar webhook (${response.status}).`);
}

async function updateProfileByEmail(email: string, accessStatus: 'active' | 'expired') {
  const response = await adminFetch(`profiles?email=ilike.${encodeURIComponent(email)}&select=id,email,access_status`, {
    method: 'PATCH',
    headers: { 'Prefer': 'return=representation' },
    body: JSON.stringify({ access_status: accessStatus }),
  });
  const rows = await response.json().catch(() => []);
  if (!response.ok) throw new Error(`Falha ao atualizar perfil (${response.status}).`);
  return Array.isArray(rows) ? rows : [];
}

async function parsePayload(req: Request) {
  const raw = await req.text();
  if (!raw.trim()) return { raw, payload: {} as Record<string, unknown> };
  try {
    return { raw, payload: JSON.parse(raw) as Record<string, unknown> };
  } catch {
    const params = new URLSearchParams(raw);
    return { raw, payload: Object.fromEntries(params.entries()) as Record<string, unknown> };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return respond({ ok: false, error: 'method_not_allowed' }, 405);

  const configuredSecret = Deno.env.get('LOWIFY_WEBHOOK_SECRET') || '';
  const suppliedSecret = new URL(req.url).searchParams.get('token') || '';
  if (!configuredSecret || suppliedSecret !== configuredSecret) {
    return respond({ ok: false, error: 'unauthorized_webhook' }, 401);
  }

  try {
    const { raw, payload } = await parsePayload(req);
    const email = (firstValue(payload, [
      'customer.email', 'buyer.email', 'client.email', 'payer.email', 'user.email',
      'data.customer.email', 'data.buyer.email', 'data.email', 'email',
    ]) || findEmail(payload)).toLowerCase();
    const statusRaw = firstValue(payload, [
      'payment.status', 'transaction.status', 'order.status', 'subscription.status',
      'data.payment.status', 'data.transaction.status', 'data.status', 'status', 'event', 'type',
    ]);
    const status = normalize(statusRaw);
    const productId = firstValue(payload, [
      'product.id', 'product.product_id', 'data.product.id', 'data.product_id',
      'order.product_id', 'transaction.product_id', 'product_id', 'offer.product_id',
    ]);
    const providerId = firstValue(payload, [
      'event_id', 'webhook_id', 'transaction.id', 'transaction_id', 'order.id', 'order_id',
      'payment.id', 'payment_id', 'data.id', 'id',
    ]);
    /* O mesmo pagamento pode gerar pending -> approved -> refunded usando o
       mesmo transaction_id. O status faz parte da chave para não descartar a
       mudança de estado como se fosse um webhook duplicado. */
    const eventKey = `lowify:${providerId ? `${providerId}:${status || 'unknown'}` : await sha256(raw)}`;

    if (await eventAlreadyProcessed(eventKey)) return respond({ ok: true, duplicate: true });

    if (productId && productId !== EXPECTED_PRODUCT_ID) {
      await recordEvent({ eventKey, status, email, productId, action: 'ignored_product' });
      return respond({ ok: true, ignored: 'product' });
    }

    const approved = new Set([
      'approved', 'paid', 'completed', 'complete', 'success', 'successful', 'confirmed',
      'payment_approved', 'purchase_approved', 'order_approved', 'active',
    ]);
    const revoked = new Set([
      'refunded', 'refund', 'chargeback', 'charged_back', 'canceled', 'cancelled',
      'subscription_canceled', 'subscription_cancelled', 'payment_refunded',
    ]);

    if (!email || !status) {
      await recordEvent({ eventKey, status, email, productId, action: 'ignored_missing_fields' });
      return respond({ ok: true, ignored: 'missing_fields' });
    }

    let action = 'ignored_status';
    let rows: unknown[] = [];
    if (approved.has(status)) {
      rows = await updateProfileByEmail(email, 'active');
      action = rows.length ? 'activated' : 'account_not_found';
    } else if (revoked.has(status)) {
      rows = await updateProfileByEmail(email, 'expired');
      action = rows.length ? 'revoked' : 'account_not_found';
    }

    await recordEvent({ eventKey, status, email, productId, action });
    return respond({ ok: true, action, matched_account: rows.length > 0 });
  } catch (error) {
    console.error('Lowify webhook error:', error);
    return respond({ ok: false, error: 'webhook_processing_failed' }, 500);
  }
});
