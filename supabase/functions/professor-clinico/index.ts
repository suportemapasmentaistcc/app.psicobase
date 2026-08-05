const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'deepseek/deepseek-v4-flash:free';
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

type HistoryMessage = { role: 'user' | 'assistant'; content: string };

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

function parseJsonPayload(content: unknown) {
  if (typeof content !== 'string' || !content.trim()) {
    throw new Error('A OpenRouter retornou uma resposta vazia.');
  }

  const cleaned = content.trim()
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
      response_format: { type: 'json_object' },
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload?.error?.message || payload?.message || `OpenRouter respondeu com HTTP ${response.status}.`;
    const error = new Error(message) as Error & { status?: number };
    error.status = response.status;
    throw error;
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
    const mode = body?.mode === 'questions' ? 'questions' : 'professor';
    const topic = typeof body?.topic === 'string' ? body.topic.trim().slice(0, 1200) : '';
    const level = typeof body?.level === 'string' ? body.level.trim().slice(0, 80) : 'Intermediário';
    if (!topic) return jsonResponse({ error: 'Informe o tema ou a dúvida da sessão.' }, 400);

    if (mode === 'questions') {
      const count = Math.min(10, Math.max(1, Number(body?.count) || 5));
      const focus = typeof body?.focus === 'string' ? body.focus.trim().slice(0, 120) : 'Compreensão teórica';
      const messages: Array<{ role: 'system' | 'user'; content: string }> = [
        { role: 'system', content: questionsSystemPrompt },
        { role: 'user', content: `Tema: ${topic}\nQuantidade: ${count}\nNível: ${level}\nFoco: ${focus}\nCrie exatamente ${count} questões.` },
      ];
      const payload = await callOpenRouter(apiKey, messages);
      const questions = Array.isArray(payload?.questions) ? payload.questions.slice(0, count) : [];
      if (!questions.length) throw new Error('O modelo não retornou questões válidas.');
      return jsonResponse({ questions, model: MODEL });
    }

    const goal = typeof body?.goal === 'string' ? body.goal.trim().slice(0, 120) : 'Compreender o conceito';
    const history = normalizeHistory(body?.history);
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: professorSystemPrompt },
      ...history,
      { role: 'user', content: `Tema ou dúvida: ${topic}\nNível: ${level}\nObjetivo: ${goal}` },
    ];
    const pack = await callOpenRouter(apiKey, messages);
    return jsonResponse({ pack, model: MODEL });
  } catch (error) {
    console.error('Erro no Professor Clínico:', error);
    return jsonResponse({ error: 'Não foi possível processar esta solicitação.' }, 500);
  }
});
