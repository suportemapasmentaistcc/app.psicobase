const { contextFor } = require('../lib/psychoanalysis-kb');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

function send(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

async function validateUser(authorization) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;
  if (!authorization?.startsWith('Bearer ')) return false;
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: authorization,
    },
  });
  return response.ok;
}

function extractJson(text) {
  const cleaned = String(text || '')
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
  try { return JSON.parse(cleaned); } catch {}
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start >= 0 && end > start) return JSON.parse(cleaned.slice(start, end + 1));
  throw new Error('Resposta inválida do modelo.');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Método não permitido.' });
  }

  try {
    const authorized = await validateUser(req.headers.authorization);
    if (!authorized) return send(res, 401, { error: 'Entre novamente para gerar questões.' });
    if (!OPENROUTER_API_KEY) return send(res, 500, { error: 'A API de geração ainda não foi configurada.' });

    const { topic, count = 5, level = 'Intermediário', focus = 'Compreensão teórica' } = req.body || {};
    const safeTopic = String(topic || '').trim().slice(0, 240);
    const safeCount = Math.min(10, Math.max(1, Number(count) || 5));
    if (!safeTopic) return send(res, 400, { error: 'Informe um tema.' });

    const retrieved = contextFor(safeTopic);
    if (!retrieved.found.length) return send(res, 422, { error: 'Este tema ainda não possui base curada suficiente.' });

    const systemPrompt = `Você é um elaborador acadêmico especializado em Psicanálise. Use exclusivamente a BASE CURADA fornecida. Crie questões discursivas rigorosas em português brasileiro.
Regras obrigatórias:
- Diferencie claramente as formulações de Freud, Lacan, Winnicott, Melanie Klein, Bion, Laplanche e outros autores quando forem pertinentes.
- Não misture escolas teóricas como se fossem equivalentes.
- Não invente citações literais, páginas, capítulos ou dados bibliográficos.
- Sugira apenas obras reconhecidas e diretamente relacionadas ao tema; quando não houver segurança, omita a referência.
- Em temas clínicos, mantenha finalidade educacional e reflexiva; não forneça diagnóstico ou conduta para paciente real.
- Retorne exclusivamente JSON válido, sem markdown.
Formato: {"questions":[{"question":"...","difficulty":"...","expected_points":["..."],"answer_guide":"...","references":["Autor — Obra (ano original, quando seguro)"]}]}`;

    const userPrompt = `BASE CURADA DA PSICOBASE:\n${retrieved.text}\n\nTema: ${safeTopic}\nQuantidade: ${safeCount}\nNível: ${String(level).slice(0, 40)}\nFoco: ${String(focus).slice(0, 80)}\nCrie questões variadas, não repetitivas e suficientemente elaboradas para avaliação discursiva.`;

    const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://app-psicobase.vercel.app',
        'X-Title': 'PsicoBase',
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        temperature: 0.35,
        max_tokens: 3500,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    const raw = await aiResponse.json();
    if (!aiResponse.ok) {
      console.error('OpenRouter error:', raw);
      return send(res, 502, { error: 'O serviço de geração está temporariamente indisponível.' });
    }

    const content = raw?.choices?.[0]?.message?.content;
    const parsed = extractJson(content);
    const questions = Array.isArray(parsed.questions) ? parsed.questions.slice(0, safeCount) : [];
    if (!questions.length) return send(res, 502, { error: 'Não foi possível estruturar as questões. Tente novamente.' });

    return send(res, 200, { questions });
  } catch (error) {
    console.error(error);
    return send(res, 500, { error: 'Erro interno ao gerar questões.' });
  }
};
