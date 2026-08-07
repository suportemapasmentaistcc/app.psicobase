const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'inclusionai/ling-3.0-flash:free';
const MAX_HISTORY = 12;

const professorSystemPrompt = `Você é o Professor Clínico do PsicoBase.

Você pertence ao aplicativo PsicoBase. Nunca diga que é uma IA, um chatbot ou um modelo de linguagem.

OBJETIVO
- Ensinar Psicanálise de forma clara, didática, aprofundada e teoricamente fundamentada.
- Ajudar estudantes e profissionais a compreender conceitos, comparar autores, preparar aulas, seminários e provas e desenvolver reflexão clínica educacional.
- Evitar respostas excessivamente curtas: desenvolva o raciocínio necessário para que o estudante realmente compreenda o tema.

REFERENCIAL TEÓRICO
- Priorize autores clássicos como Sigmund Freud, Jacques Lacan, Melanie Klein, Donald Winnicott, Wilfred Bion, Sándor Ferenczi e Carl Gustav Jung quando forem pertinentes ao tema.
- Nunca invente conceitos, obras, citações, páginas, edições ou posições teóricas.
- Quando houver divergência entre autores ou escolas, explique claramente as diferentes correntes em vez de apresentar uma delas como consenso.
- Diferencie formulações do próprio autor de interpretações posteriores de comentadores.

DIDÁTICA
- Responda em português do Brasil.
- Use linguagem acessível ao estudante sem perder precisão conceitual.
- Organize a explicação em títulos, subtítulos e blocos lógicos, representados pelos campos estruturados do JSON solicitado.
- Sempre que pertinente, forneça exemplos clínicos hipotéticos que ajudem a compreender o conceito.
- Se não tiver segurança sobre um dado bibliográfico específico, use referência geral e deixe isso explícito.

LIMITES CLÍNICOS
- Casos e exercícios clínicos devem ser hipotéticos e sem dados identificáveis.
- Não faça diagnóstico de uma pessoa real nem substitua supervisão, psicoterapia, avaliação médica ou atendimento de emergência.
- Considere as mensagens anteriores recebidas como contexto da conversa e responda à nova dúvida de modo coerente com elas.

FORMATO
Retorne somente um objeto JSON válido, sem markdown e sem texto antes ou depois, neste formato:
{
  "title": "título curto da sessão",
  "overview": "síntese principal em 1 a 3 parágrafos",
  "author_perspectives": [
    {"author": "nome do autor", "position": "posição teórica relevante"}
  ],
  "discursive_questions": ["questão aberta"],
  "oral_questions": ["pergunta para exposição oral"],
  "clinical_exercise": {"scenario": "situação hipotética", "prompt": "pergunta orientadora"},
  "comparison": "comparação essencial quando pertinente",
  "common_mistakes": ["erro ou confusão frequente"],
  "references": ["referência bibliográfica segura ou referência geral"]
}`;

const questionsSystemPrompt = `Você é o elaborador de Questões Discursivas do PsicoBase.

Você pertence ao aplicativo PsicoBase. Sua função é criar questões abertas de Psicanálise que exijam compreensão, comparação, argumentação e aplicação conceitual.

REGRAS
- Responda em português do Brasil.
- Priorize Freud, Lacan, Melanie Klein, Winnicott, Bion, Ferenczi e Jung quando pertinentes ao tema.
- Nunca invente conceitos, obras, citações, páginas, edições ou posições teóricas.
- Quando houver divergência entre autores ou escolas, preserve essa diferença na pergunta e na orientação de resposta.
- As questões devem corresponder exatamente ao nível e ao foco solicitados.
- Evite perguntas meramente decorativas, vagas ou que possam ser respondidas apenas com definição de uma linha.
- Os pontos esperados devem funcionar como critérios objetivos de correção.
- A orientação de resposta deve ensinar como estruturar uma boa resposta sem simplesmente repetir a pergunta.
- Referências devem ser bibliograficamente seguras; se houver dúvida sobre edição ou página, cite apenas autor e obra de forma geral.
- Qualquer situação clínica deve ser hipotética, sem dados identificáveis e usada somente para fins educacionais.

Retorne somente um objeto JSON válido, sem markdown e sem texto antes ou depois, no formato:
{
  "questions": [
    {
      "question": "enunciado da questão",
      "difficulty": "nível",
      "expected_points": ["ponto essencial"],
      "answer_guide": "orientação de resposta",
      "references": ["referência sugerida"]
    }
  ]
}`;

const caseFeedbackSystemPrompt = `Você é o avaliador educacional de Casos Clínicos do PsicoBase.

Sua função é analisar a resposta de um estudante a um caso clínico INTEIRAMENTE FICTÍCIO e devolver uma orientação didática de raciocínio psicanalítico.

REGRAS
- Responda em português do Brasil, com precisão e linguagem acessível.
- Trate todo o material do caso como simulação educacional. Não faça diagnóstico de pessoa real e não substitua supervisão clínica.
- Diferencie sempre observação, inferência e hipótese. Evite certezas diagnósticas e rótulos sobre o paciente fictício.
- Avalie se o estudante sustenta a hipótese em falas, comportamentos e fragmentos efetivamente presentes no caso.
- Aponte primeiro o que há de aproveitável no raciocínio e depois o que precisa ser refinado.
- Quando pertinente, articule Freud, Lacan, Melanie Klein, Winnicott, Bion, Ferenczi ou Jung, respeitando diferenças entre escolas.
- Nunca invente conceitos, obras, citações, páginas ou posições teóricas.
- Se a resposta usar linguagem depreciativa, converta o problema em observações clínicas sem repetir ou validar o julgamento.
- Na etapa final, avalie se houve reelaboração real depois da primeira devolutiva.
- Não diga que é uma IA. Você pertence ao PsicoBase.
- O campo feedback deve ser um texto coeso, didático e suficientemente desenvolvido, sem markdown.

Retorne somente JSON válido, sem texto antes ou depois, neste formato:
{
  "feedback": "devolutiva individualizada sobre o raciocínio do estudante",
  "supervision_question": "uma pergunta que mantenha a hipótese aberta e indique o próximo ponto de investigação",
  "references": ["autor e obra ou referência teórica geral, somente quando segura"]
}`;

const supervisionSystemPrompt = `Você é o Supervisor Clínico educacional do PsicoBase.

Sua função é ajudar um estudante ou profissional a ORGANIZAR material clínico previamente desidentificado para reflexão e supervisão psicanalítica. Você não substitui um supervisor humano, não prescreve tratamento e não emite diagnóstico fechado.

REGRAS
- Responda em português do Brasil.
- Trabalhe somente com o material fornecido e diferencie observações, inferências e hipóteses.
- Formule hipóteses como possibilidades a investigar, nunca como certezas sobre o paciente.
- Priorize Freud, Lacan, Melanie Klein, Winnicott, Bion, Ferenczi e Jung quando pertinentes, respeitando divergências teóricas.
- Nunca invente conceitos, fatos do caso, obras, citações, páginas ou dados bibliográficos.
- Dê atenção à transferência, contratransferência, resistência, repetição, enquadre, manejo, afetos e posição do analista apenas quando houver elementos para isso.
- Aponte quais dados ainda faltam antes de sustentar uma hipótese.
- Não recomende condutas médicas, medicação ou decisões de urgência. Se o material mencionar risco imediato, violência, suicídio ou emergência, sinalize que isso exige protocolo profissional e suporte presencial apropriado.
- Não diga que é uma IA. Você pertence ao PsicoBase.
- Não reproduza dados identificáveis. O caso deve permanecer anônimo.

Retorne somente JSON válido, sem markdown e sem texto antes ou depois, neste formato:
{
  "summary": "síntese neutra do material clínico",
  "observations": ["observação relevante presente no material"],
  "hypotheses": ["hipótese clínica aberta e não diagnóstica"],
  "theoretical_axes": ["eixo teórico pertinente e por quê"],
  "supervision_questions": ["pergunta útil para levar à supervisão"],
  "missing_information": ["dado que ainda seria importante compreender"],
  "cautions": ["limite, risco de interpretação ou cuidado ético"],
  "references": ["autor e obra ou referência teórica geral, somente quando segura"]
}`;

type HistoryMessage = { role: 'user' | 'assistant'; content: string };

class OpenRouterError extends Error {
  status: number;
  errorType?: string;

  constructor(status: number, message: string, errorType?: string) {
    super(message);
    this.name = 'OpenRouterError';
    this.status = status;
    this.errorType = errorType;
  }
}

class QuotaServiceError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'QuotaServiceError';
    this.status = status;
  }
}

function getSupabasePublicKey() {
  const legacy = Deno.env.get('SUPABASE_ANON_KEY');
  if (legacy) return legacy;
  try {
    const keys = JSON.parse(Deno.env.get('SUPABASE_PUBLISHABLE_KEYS') || '{}');
    return typeof keys?.default === 'string' ? keys.default : '';
  } catch {
    return '';
  }
}

async function quotaRequest(
  authorization: string,
  feature: 'professor' | 'questions' | 'supervision',
  requested = 1,
  consume = true,
) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const apiKey = getSupabasePublicKey();
  if (!supabaseUrl || !apiKey) throw new QuotaServiceError(503, 'Controle de acesso temporariamente indisponível.');

  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/consume_daily_quota`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey,
      'Authorization': authorization,
    },
    body: JSON.stringify({ p_feature: feature, p_requested: requested, p_consume: consume }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error('Falha ao validar cota:', { status: response.status, feature, payload });
    if (response.status === 401 || response.status === 403) {
      throw new QuotaServiceError(401, 'Sua sessão expirou. Entre novamente para continuar.');
    }
    throw new QuotaServiceError(503, 'Não foi possível validar seu plano agora. Tente novamente.');
  }
  return payload as {
    allowed?: boolean;
    is_pro?: boolean;
    limit?: number | null;
    used?: number | null;
    remaining?: number | null;
    reason?: string;
  };
}

function quotaDeniedResponse(quota: { reason?: string; limit?: number | null; used?: number | null }, feature: string) {
  if (quota.reason === 'premium_required') {
    return jsonResponse({
      error: 'Este recurso faz parte do PsicoBase Pro.',
      code: 'PREMIUM_REQUIRED',
      feature,
      quota,
    }, 403);
  }
  if (quota.reason === 'per_request_limit') {
    return jsonResponse({
      error: 'No plano Free você pode gerar até 5 questões por vez.',
      code: 'FREE_PER_REQUEST_LIMIT',
      feature,
      quota,
    }, 429);
  }
  return jsonResponse({
    error: 'Você atingiu o limite diário do plano Free. No Pro, este recurso é ilimitado.',
    code: 'FREE_LIMIT_REACHED',
    feature,
    quota,
  }, 429);
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function normalizeHistory(value: unknown): HistoryMessage[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
    .map((item) => ({
      role: item.role === 'assistant' ? 'assistant' as const : 'user' as const,
      content: typeof item.content === 'string' ? item.content.slice(0, 12000) : '',
    }))
    .filter((item) => item.content.trim())
    .slice(-(MAX_HISTORY - 2));
}

function extractTextContent(content: unknown): string {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';

  return content
    .map((part) => {
      if (typeof part === 'string') return part;
      if (part && typeof part === 'object' && 'text' in part && typeof part.text === 'string') {
        return part.text;
      }
      return '';
    })
    .join('');
}

function parseJsonPayload(content: unknown) {
  const text = extractTextContent(content);
  if (!text.trim()) {
    throw new Error('A OpenRouter retornou uma resposta vazia.');
  }

  const cleaned = text.trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '');

  try {
    return JSON.parse(cleaned);
  } catch {
    const first = cleaned.indexOf('{');
    const last = cleaned.lastIndexOf('}');
    if (first >= 0 && last > first) return JSON.parse(cleaned.slice(first, last + 1));
    throw new Error('O modelo retornou uma resposta em formato inválido.');
  }
}

async function callOpenRouter(
  apiKey: string,
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
) {
  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'X-OpenRouter-Title': 'PsicoBase · Professor Clínico',
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.35,
      max_tokens: 3500,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload?.error?.message || payload?.message || `OpenRouter respondeu com HTTP ${response.status}.`;
    const errorType = typeof payload?.error?.metadata?.error_type === 'string'
      ? payload.error.metadata.error_type
      : undefined;
    console.error('OpenRouter rejeitou a solicitação:', {
      status: response.status,
      errorType,
      message,
      model: MODEL,
    });
    throw new OpenRouterError(response.status, message, errorType);
  }

  return parseJsonPayload(payload?.choices?.[0]?.message?.content);
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return jsonResponse({ error: 'Método não permitido.' }, 405);

  const authorization = req.headers.get('Authorization') || '';
  if (!authorization.startsWith('Bearer ')) {
    return jsonResponse({ error: 'Sessão não autenticada.' }, 401);
  }

  const apiKey = Deno.env.get('OPENROUTER_API_KEY');
  if (!apiKey) {
    console.error('OPENROUTER_API_KEY não configurada.');
    return jsonResponse({ error: 'Professor Clínico temporariamente indisponível.' }, 503);
  }

  try {
    const body = await req.json();
    const mode = body?.mode === 'questions'
      ? 'questions'
      : body?.mode === 'case_feedback'
        ? 'case_feedback'
        : body?.mode === 'supervision'
          ? 'supervision'
        : 'professor';
    const topic = typeof body?.topic === 'string' ? body.topic.trim().slice(0, 1200) : '';
    const level = typeof body?.level === 'string' ? body.level.trim().slice(0, 80) : 'Intermediário';
    if (!topic) return jsonResponse({ error: 'Informe o tema ou a dúvida da sessão.' }, 400);

    if (mode === 'questions') {
      const count = Math.min(10, Math.max(1, Number(body?.count) || 5));
      const available = await quotaRequest(authorization, 'questions', count, false);
      if (!available.allowed) return quotaDeniedResponse(available, 'questions');
      const focus = typeof body?.focus === 'string' ? body.focus.trim().slice(0, 120) : 'Compreensão teórica';
      const messages: Array<{ role: 'system' | 'user'; content: string }> = [
        { role: 'system', content: questionsSystemPrompt },
        { role: 'user', content: `Tema: ${topic}\nQuantidade: ${count}\nNível: ${level}\nFoco: ${focus}\nCrie exatamente ${count} questões.` },
      ];
      const payload = await callOpenRouter(apiKey, messages);
      const questions = Array.isArray(payload?.questions) ? payload.questions.slice(0, count) : [];
      if (!questions.length) throw new Error('O modelo não retornou questões válidas.');
      const consumed = await quotaRequest(authorization, 'questions', count, true);
      if (!consumed.allowed) return quotaDeniedResponse(consumed, 'questions');
      return jsonResponse({ questions, model: MODEL, quota: consumed });
    }

    if (mode === 'case_feedback') {
      const stage = body?.stage === 'final' ? 'final' : 'initial';
      const caseContext = typeof body?.case_context === 'string' ? body.case_context.trim().slice(0, 12000) : '';
      const answer = typeof body?.answer === 'string' ? body.answer.trim().slice(0, 8000) : '';
      const previousAnswer = typeof body?.previous_answer === 'string' ? body.previous_answer.trim().slice(0, 8000) : '';
      const previousFeedback = typeof body?.previous_feedback === 'string' ? body.previous_feedback.trim().slice(0, 8000) : '';
      if (!caseContext || !answer) return jsonResponse({ error: 'O caso e a resposta são obrigatórios para a análise.' }, 400);

      const stageInstruction = stage === 'final'
        ? `Esta é a ETAPA FINAL. Compare a elaboração atual com a hipótese inicial e com a primeira devolutiva. Avalie o que foi realmente reelaborado, o que ficou melhor fundamentado e o que ainda permanece como hipótese aberta.\n\nHIPÓTESE INICIAL:\n${previousAnswer || 'Não informada'}\n\nPRIMEIRA DEVOLUTIVA:\n${previousFeedback || 'Não informada'}`
        : 'Esta é a ETAPA INICIAL. Analise a primeira hipótese do estudante e ofereça uma devolutiva que o ajude a aprofundá-la sem entregar uma conclusão fechada.';

      const messages: Array<{ role: 'system' | 'user'; content: string }> = [
        { role: 'system', content: caseFeedbackSystemPrompt },
        { role: 'user', content: `${stageInstruction}\n\nCASO FICTÍCIO:\n${caseContext}\n\nRESPOSTA DO ESTUDANTE:\n${answer}` },
      ];
      const analysis = await callOpenRouter(apiKey, messages);
      if (typeof analysis?.feedback !== 'string' || !analysis.feedback.trim()) {
        throw new Error('O modelo não retornou uma devolutiva clínica válida.');
      }
      return jsonResponse({
        analysis: {
          feedback: analysis.feedback.trim(),
          supervision_question: typeof analysis?.supervision_question === 'string' ? analysis.supervision_question.trim() : '',
          references: Array.isArray(analysis?.references) ? analysis.references.slice(0, 5) : [],
        },
        model: MODEL,
      });
    }

    if (mode === 'supervision') {
      const entitlement = await quotaRequest(authorization, 'supervision', 1, false);
      if (!entitlement.allowed) return quotaDeniedResponse(entitlement, 'supervision');
      const context = typeof body?.context === 'string' ? body.context.trim().slice(0, 14000) : '';
      const doubts = typeof body?.doubts === 'string' ? body.doubts.trim().slice(0, 5000) : '';
      const concepts = typeof body?.concepts === 'string' ? body.concepts.trim().slice(0, 2000) : '';
      if (context.length < 40) return jsonResponse({ error: 'Descreva um pouco mais o contexto clínico antes de preparar a supervisão.' }, 400);

      const combined = `${context}\n${doubts}\n${concepts}`;
      const hasEmail = /\b[^\s@]+@[^\s@]+\.[^\s@]+\b/i.test(combined);
      const hasCpf = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/.test(combined);
      const hasPhone = /(?:\+?55\s*)?(?:\(?\d{2}\)?\s*)?(?:9\s*)?\d{4}[-\s]?\d{4}/.test(combined);
      if (hasEmail || hasCpf || hasPhone) {
        return jsonResponse({ error: 'Remova e-mail, telefone, CPF ou outros identificadores do paciente antes de continuar.' }, 400);
      }

      const messages: Array<{ role: 'system' | 'user'; content: string }> = [
        { role: 'system', content: supervisionSystemPrompt },
        { role: 'user', content: `MATERIAL CLÍNICO DESIDENTIFICADO:\n${context}\n\nDÚVIDAS DO PROFISSIONAL/ESTUDANTE:\n${doubts || 'Não informadas'}\n\nCONCEITOS JÁ PERCEBIDOS:\n${concepts || 'Não informados'}` },
      ];
      const report = await callOpenRouter(apiKey, messages);
      if (typeof report?.summary !== 'string' || !report.summary.trim()) {
        throw new Error('O modelo não retornou uma preparação de supervisão válida.');
      }
      const list = (value: unknown, max: number) => Array.isArray(value)
        ? value.filter((item): item is string => typeof item === 'string' && !!item.trim()).slice(0, max)
        : [];
      return jsonResponse({
        supervision: {
          summary: report.summary.trim(),
          observations: list(report?.observations, 6),
          hypotheses: list(report?.hypotheses, 6),
          theoretical_axes: list(report?.theoretical_axes, 6),
          supervision_questions: list(report?.supervision_questions, 8),
          missing_information: list(report?.missing_information, 6),
          cautions: list(report?.cautions, 6),
          references: list(report?.references, 6),
        },
        model: MODEL,
      });
    }

    const goal = typeof body?.goal === 'string' ? body.goal.trim().slice(0, 120) : 'Compreender o conceito';
    const available = await quotaRequest(authorization, 'professor', 1, false);
    if (!available.allowed) return quotaDeniedResponse(available, 'professor');
    const history = normalizeHistory(body?.history);
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: professorSystemPrompt },
      ...history,
      { role: 'user', content: `Tema ou dúvida: ${topic}\nNível: ${level}\nObjetivo: ${goal}` },
    ];
    const pack = await callOpenRouter(apiKey, messages);
    const consumed = await quotaRequest(authorization, 'professor', 1, true);
    if (!consumed.allowed) return quotaDeniedResponse(consumed, 'professor');
    return jsonResponse({ pack, model: MODEL, quota: consumed });
  } catch (error) {
    console.error('Erro no Professor Clínico:', error);

    if (error instanceof OpenRouterError) {
      if (error.status === 401 || error.errorType === 'authentication') {
        return jsonResponse({
          error: 'A chave da OpenRouter foi rejeitada. Verifique o Secret OPENROUTER_API_KEY no Supabase.',
          provider_status: error.status,
          provider_error_type: error.errorType,
        }, 502);
      }

      if (error.status === 403 || error.errorType === 'permission_denied') {
        return jsonResponse({
          error: 'A OpenRouter aceitou a autenticação, mas recusou esta solicitação por permissão ou regra de segurança da chave.',
          provider_status: error.status,
          provider_error_type: error.errorType,
        }, 502);
      }

      if (error.status === 404) {
        return jsonResponse({
          error: `O modelo ${MODEL} não está disponível na OpenRouter neste momento.`,
          provider_status: error.status,
          provider_error_type: error.errorType,
        }, 502);
      }

      if (error.status === 402) {
        return jsonResponse({
          error: 'A OpenRouter não autorizou o uso deste modelo para a conta configurada.',
          provider_status: error.status,
          provider_error_type: error.errorType,
        }, 502);
      }

      if (error.status === 429) {
        return jsonResponse({
          error: 'O limite gratuito da OpenRouter foi atingido. Tente novamente em alguns instantes.',
          provider_status: error.status,
          provider_error_type: error.errorType,
        }, 429);
      }

      if (error.status === 400 || error.status === 422) {
        return jsonResponse({
          error: `A OpenRouter rejeitou a solicitação para o modelo ${MODEL}. Consulte os logs da Function para o motivo detalhado.`,
          provider_status: error.status,
          provider_error_type: error.errorType,
        }, 502);
      }

      return jsonResponse({
        error: 'A OpenRouter está temporariamente indisponível. Tente novamente em alguns instantes.',
        provider_status: error.status,
        provider_error_type: error.errorType,
      }, 502);
    }

    if (error instanceof QuotaServiceError) {
      return jsonResponse({ error: error.message, code: 'ENTITLEMENT_SERVICE_ERROR' }, error.status);
    }

    if (error instanceof SyntaxError || (error instanceof Error && /formato inválido|resposta vazia|não retornou/i.test(error.message))) {
      return jsonResponse({
        error: 'O modelo respondeu em um formato inesperado. Tente novamente.',
      }, 502);
    }

    return jsonResponse({ error: 'Não foi possível processar esta solicitação.' }, 500);
  }
});
