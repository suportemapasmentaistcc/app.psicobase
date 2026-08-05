const { contextFor } = require('../lib/psychoanalysis-kb');
const SUPABASE_URL=process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY=process.env.SUPABASE_ANON_KEY;
const OPENROUTER_API_KEY=process.env.OPENROUTER_API_KEY;
function send(res,status,body){res.status(status).setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify(body));}
async function validateUser(auth){if(!SUPABASE_URL||!SUPABASE_ANON_KEY||!auth?.startsWith('Bearer '))return false;const r=await fetch(`${SUPABASE_URL}/auth/v1/user`,{headers:{apikey:SUPABASE_ANON_KEY,Authorization:auth}});return r.ok;}
function extractJson(text){const c=String(text||'').replace(/^```json\s*/i,'').replace(/^```\s*/i,'').replace(/```\s*$/i,'').trim();try{return JSON.parse(c)}catch{}const s=c.indexOf('{'),e=c.lastIndexOf('}');if(s>=0&&e>s)return JSON.parse(c.slice(s,e+1));throw new Error('Resposta inválida.');}
module.exports=async function(req,res){
 if(req.method!=='POST')return send(res,405,{error:'Método não permitido.'});
 try{
  if(!await validateUser(req.headers.authorization))return send(res,401,{error:'Entre novamente para continuar.'});
  if(!OPENROUTER_API_KEY)return send(res,500,{error:'O serviço de elaboração ainda não foi configurado.'});
  const {topic,level='Intermediário',goal='Compreender o conceito'}=req.body||{};
  const safeTopic=String(topic||'').trim().slice(0,240); if(!safeTopic)return send(res,400,{error:'Informe um tema.'});
  const retrieved=contextFor(safeTopic);
  if(!retrieved.found.length)return send(res,422,{error:'Este tema ainda não possui base curada suficiente. Tente um conceito disponível na PsicoBase.'});
  const system=`Você é o Professor Clínico da PsicoBase, uma ferramenta acadêmica de psicanálise. Você NÃO é a autoridade: os autores e obras são a autoridade. Use exclusivamente a BASE CURADA fornecida. Não invente citações, páginas, capítulos, anos ou conceitos. Separe autores e escolas. Em clínica, mantenha finalidade educacional, não diagnostique e não prescreva condutas. Escreva em português brasileiro. Retorne somente JSON válido no formato: {"pack":{"title":"","overview":"","author_perspectives":[{"author":"","position":""}],"discursive_questions":[{"question":""}],"oral_questions":[""],"clinical_exercise":{"scenario":"","prompt":""},"comparison":"","common_mistakes":[""],"references":[""]}}.`;
  const user=`TEMA SOLICITADO: ${safeTopic}\nNÍVEL: ${String(level).slice(0,40)}\nOBJETIVO: ${String(goal).slice(0,80)}\n\nBASE CURADA DA PSICOBASE:\n${retrieved.text}\n\nCrie uma sessão de estudo coerente, com 4 questões discursivas, 4 perguntas orais e um exercício clínico breve. As referências devem ser apenas as já presentes na base.`;
  const r=await fetch('https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${OPENROUTER_API_KEY}`,'HTTP-Referer':'https://app-psicobase.vercel.app','X-Title':'PsicoBase Professor Clínico'},body:JSON.stringify({model:'openrouter/free',temperature:.25,max_tokens:4200,messages:[{role:'system',content:system},{role:'user',content:user}]})});
  const raw=await r.json(); if(!r.ok){console.error(raw);return send(res,502,{error:'O serviço está temporariamente indisponível.'});}
  const parsed=extractJson(raw?.choices?.[0]?.message?.content); if(!parsed?.pack)return send(res,502,{error:'Não foi possível estruturar a sessão.'});
  parsed.pack.retrieved_topics=retrieved.found.map(x=>x.title);
  return send(res,200,parsed);
 }catch(e){console.error(e);return send(res,500,{error:'Erro interno ao preparar a sessão.'});}
};
