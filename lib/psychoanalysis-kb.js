const KNOWLEDGE_BASE = [
  {
    id: 'transferencia',
    title: 'Transferência',
    aliases: ['transferência','transferencia','amor de transferência','relação analítica'],
    summary: 'Na tradição freudiana, a transferência designa a atualização, na relação analítica, de protótipos afetivos e modos de vínculo anteriormente constituídos. Ela é simultaneamente condição do tratamento e campo em que resistências podem se manifestar.',
    perspectives: [
      { author: 'Sigmund Freud', position: 'A transferência aparece como repetição e atualização de vínculos, fantasias e expectativas no encontro com o analista. Seu manejo não consiste em simplesmente eliminá-la, mas em torná-la analisável.' },
      { author: 'Jacques Lacan', position: 'Lacan relaciona a transferência à posição de sujeito suposto saber e ao modo como o desejo se articula no dispositivo analítico.' },
      { author: 'Donald Winnicott', position: 'Winnicott enfatiza as condições do ambiente, da confiabilidade e do manejo, sobretudo em situações regressivas.' }
    ],
    clinical: 'Em leitura clínica, interessa observar como a pessoa endereça demandas, expectativas, afetos e silêncios ao analista, sem transformar esses elementos em diagnóstico automático.',
    related: ['resistência','repetição','desejo','contratransferência','associação livre'],
    references: ['Freud — A dinâmica da transferência (1912)', 'Freud — Observações sobre o amor de transferência (1915)', 'Lacan — O Seminário, Livro 11: Os quatro conceitos fundamentais da psicanálise (1964)', 'Winnicott — O ambiente e os processos de maturação']
  },
  {
    id: 'recalque', title: 'Recalque', aliases: ['recalque','repressão','repressao','retorno do recalcado'],
    summary: 'O recalque é um processo central na metapsicologia freudiana pelo qual representações ligadas a exigências pulsionais permanecem afastadas da consciência, sem que seus efeitos deixem de operar.',
    perspectives: [
      {author:'Sigmund Freud',position:'Freud distingue recalque originário, recalque propriamente dito e retorno do recalcado. O processo não elimina a representação; modifica suas condições de acesso à consciência.'},
      {author:'Jean Laplanche',position:'Laplanche ressalta a dimensão tradutiva, o caráter enigmático da mensagem do outro e as reelaborações do conceito ao longo da obra freudiana.'},
      {author:'Jacques Lacan',position:'Lacan relê o recalque no campo da linguagem e do significante, articulando-o ao retorno do recalcado nas formações do inconsciente.'}
    ],
    clinical:'O conceito ajuda a pensar lapsos, sonhos, sintomas e repetições, mas não autoriza afirmar, sem trabalho clínico, qual conteúdo específico estaria recalcado.',
    related:['inconsciente','sintoma','retorno do recalcado','resistência','pulsão'],
    references:['Freud — O recalque (1915)','Freud — O inconsciente (1915)','Laplanche e Pontalis — Vocabulário da Psicanálise','Lacan — Escritos']
  },
  {
    id:'inconsciente',title:'Inconsciente',aliases:['inconsciente','formações do inconsciente','formacoes do inconsciente'],
    summary:'Na psicanálise, o inconsciente não é apenas aquilo que não está consciente. Em Freud, ele constitui um sistema e uma dimensão dinâmica do psiquismo, reconhecível por seus efeitos em sonhos, sintomas, atos falhos e formações substitutivas.',
    perspectives:[
      {author:'Sigmund Freud',position:'Freud formula o inconsciente como sistema regido por processos próprios, como condensação e deslocamento, e posteriormente o reinscreve na segunda tópica.'},
      {author:'Jacques Lacan',position:'Lacan afirma que o inconsciente é estruturado como uma linguagem, destacando a cadeia significante, a fala e o endereçamento ao Outro.'}
    ],
    clinical:'A escuta psicanalítica considera equívocos, repetições, interrupções, escolhas de palavras e formações sintomáticas como vias de investigação, não como códigos fixos.',
    related:['sonho','ato falho','sintoma','recalque','significante'],
    references:['Freud — A interpretação dos sonhos (1900)','Freud — O inconsciente (1915)','Lacan — O Seminário, Livro 11','Lacan — Escritos']
  },
  {
    id:'pulsao',title:'Pulsão',aliases:['pulsão','pulsao','trieb','pulsão de morte','pulsao de morte'],
    summary:'A pulsão é um conceito-limite entre o somático e o psíquico. Freud a descreve por fonte, pressão, finalidade e objeto, destacando que o objeto pode variar.',
    perspectives:[
      {author:'Sigmund Freud',position:'A pulsão não equivale a instinto. Ela apresenta pressão constante e pode sofrer destinos como reversão, retorno sobre a própria pessoa, recalque e sublimação.'},
      {author:'Jacques Lacan',position:'Lacan enfatiza o circuito pulsional e a satisfação obtida no próprio contorno do objeto, articulando pulsão, falta e objeto a.'}
    ],
    clinical:'O conceito permite investigar modos repetitivos de satisfação e sofrimento sem reduzi-los a necessidades biológicas simples.',
    related:['libido','objeto','satisfação','repetição','objeto a'],
    references:['Freud — Pulsões e seus destinos (1915)','Freud — Além do princípio do prazer (1920)','Lacan — O Seminário, Livro 11']
  },
  {
    id:'desejo',title:'Desejo',aliases:['desejo','demanda','necessidade demanda desejo'],
    summary:'Na leitura lacaniana, o desejo não se confunde com necessidade nem com demanda. Ele emerge na diferença que permanece quando a necessidade passa pela linguagem e se dirige ao Outro.',
    perspectives:[
      {author:'Jacques Lacan',position:'O desejo é articulado ao significante, à falta e ao desejo do Outro; não se reduz a um objeto empírico que possa encerrá-lo.'},
      {author:'Sigmund Freud',position:'Embora Freud não organize sua teoria nos mesmos termos, a realização de desejo ocupa lugar central na teoria dos sonhos e na compreensão das formações do inconsciente.'}
    ],
    clinical:'A escuta do desejo exige não responder imediatamente à demanda como se ela esgotasse o que está em jogo na fala.',
    related:['demanda','necessidade','Outro','falta','fantasia'],
    references:['Freud — A interpretação dos sonhos (1900)','Lacan — A direção do tratamento e os princípios de seu poder','Lacan — O Seminário, Livro 5']
  },
  {
    id:'objeto-a',title:'Objeto a',aliases:['objeto a','objeto causa do desejo','objeto pequeno a'],
    summary:'O objeto a é um conceito lacaniano que não designa um objeto comum, mas uma função de causa do desejo e um resto produzido na constituição do sujeito.',
    perspectives:[{author:'Jacques Lacan',position:'O objeto a aparece em diferentes formulações e modalidades, articulado ao desejo, à fantasia, à angústia e ao circuito pulsional.'}],
    clinical:'Seu uso clínico exige precisão: não se trata de procurar qual pessoa ou coisa “é” o objeto a, mas de examinar a função que certos objetos assumem na economia do desejo.',
    related:['desejo','fantasia','angústia','pulsão','Outro'],
    references:['Lacan — O Seminário, Livro 10: A angústia','Lacan — O Seminário, Livro 11','Lacan — Escritos']
  },
  {
    id:'falso-self',title:'Falso self',aliases:['falso self','falso eu','self verdadeiro','verdadeiro self'],
    summary:'Winnicott formula o falso self para descrever organizações defensivas que se constituem em resposta a exigências ambientais, protegendo aspectos espontâneos do self.',
    perspectives:[{author:'Donald Winnicott',position:'O falso self existe em graus. Em formas patológicas, pode predominar uma adaptação excessiva que encobre a espontaneidade e a sensação de realidade pessoal.'}],
    clinical:'O conceito não deve ser usado como rótulo moral. A questão é compreender a função protetiva da adaptação e as condições ambientais que sustentam ou impedem a espontaneidade.',
    related:['verdadeiro self','holding','ambiente','gesto espontâneo','adaptação'],
    references:['Winnicott — Distorção do ego em termos de falso e verdadeiro self','Winnicott — O ambiente e os processos de maturação']
  },
  {
    id:'holding',title:'Holding',aliases:['holding','sustentação','sustentacao','ambiente suficientemente bom'],
    summary:'Holding refere-se ao conjunto de condições de sustentação física e psíquica que favorecem integração, continuidade de ser e desenvolvimento emocional.',
    perspectives:[{author:'Donald Winnicott',position:'O holding inclui confiabilidade, adaptação ambiental e manejo. Na clínica, informa a compreensão do setting e da capacidade do analista de sustentar situações regressivas.'}],
    clinical:'Não significa apenas acolhimento afetivo. Envolve continuidade, previsibilidade, limites e manejo adequado do enquadre.',
    related:['manejo','setting','integração','dependência','mãe suficientemente boa'],
    references:['Winnicott — O ambiente e os processos de maturação','Winnicott — Da pediatria à psicanálise']
  },
  {
    id:'identificacao-projetiva',title:'Identificação projetiva',aliases:['identificação projetiva','identificacao projetiva','posição esquizoparanóide'],
    summary:'Melanie Klein formula a identificação projetiva para pensar fantasias inconscientes em que partes do self são projetadas no objeto, afetando a relação com ele.',
    perspectives:[
      {author:'Melanie Klein',position:'O conceito se articula às ansiedades primitivas, às relações de objeto e à posição esquizoparanóide.'},
      {author:'Wilfred Bion',position:'Bion amplia o conceito para pensar comunicação, continente-conteúdo e transformação de experiências emocionais.'}
    ],
    clinical:'É importante não usar o conceito como explicação total de qualquer impacto emocional no analista. A formulação deve ser sustentada pelo processo e discutida em supervisão.',
    related:['projeção','continente-conteúdo','posição esquizoparanóide','contratransferência'],
    references:['Klein — Notas sobre alguns mecanismos esquizoides (1946)','Bion — Aprender com a experiência']
  },
  {
    id:'funcao-alfa',title:'Função alfa',aliases:['função alfa','funcao alfa','elementos beta','continente conteúdo'],
    summary:'Bion denomina função alfa a capacidade de transformar impressões sensoriais e experiências emocionais brutas em elementos passíveis de sonho, pensamento e ligação.',
    perspectives:[{author:'Wilfred Bion',position:'Quando a função alfa falha, elementos beta permanecem não metabolizados e podem ser evacuados. A relação continente-conteúdo ajuda a pensar processos de transformação.'}],
    clinical:'O conceito orienta uma escuta das condições de pensabilidade e simbolização, sem converter manifestações difíceis em diagnósticos automáticos.',
    related:['elementos beta','continente-conteúdo','rêverie','pensamento'],
    references:['Bion — Aprender com a experiência','Bion — Elementos de psicanálise']
  },
  {
    id:'compulsao-repeticao',title:'Compulsão à repetição',aliases:['compulsão à repetição','compulsao a repeticao','repetição','repeticao'],
    summary:'A compulsão à repetição designa a tendência a reeditar experiências, posições e relações, inclusive quando produzem sofrimento e não parecem obedecer ao princípio do prazer.',
    perspectives:[
      {author:'Sigmund Freud',position:'Freud relaciona repetição, transferência, elaboração e, posteriormente, os problemas que conduzem à formulação da pulsão de morte.'},
      {author:'Jacques Lacan',position:'Lacan diferencia automaton e tyche, articulando repetição à cadeia significante e ao encontro faltoso com o real.'}
    ],
    clinical:'A repetição deve ser descrita no processo concreto: o que se repete, em que condições, com quais diferenças e qual função assume.',
    related:['transferência','pulsão de morte','elaboração','real','sintoma'],
    references:['Freud — Recordar, repetir e elaborar (1914)','Freud — Além do princípio do prazer (1920)','Lacan — O Seminário, Livro 11']
  },
  {
    id:'narcisismo',title:'Narcisismo',aliases:['narcisismo','ideal do eu','ego ideal'],
    summary:'Freud introduz o narcisismo para pensar investimentos libidinais no eu e suas relações com escolha de objeto, idealização e constituição do ideal do eu.',
    perspectives:[
      {author:'Sigmund Freud',position:'O narcisismo não se reduz a vaidade. Ele integra a economia libidinal e participa da constituição do eu e dos ideais.'},
      {author:'Jacques Lacan',position:'Lacan articula o narcisismo à imagem especular, ao eu imaginário e à alienação constitutiva.'}
    ],
    clinical:'A noção deve ser usada com cuidado, distinguindo funcionamento narcísico, defesas, fragilidade do eu e uso cotidiano pejorativo do termo.',
    related:['eu','ideal do eu','ego ideal','estádio do espelho','libido'],
    references:['Freud — Introdução ao narcisismo (1914)','Lacan — O estádio do espelho como formador da função do eu']
  }
];

function normalize(value=''){
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
}
function tokens(value=''){
  return normalize(value).split(/[^a-z0-9]+/).filter(x=>x.length>2);
}
function retrieve(query, limit=3){
  const q=normalize(query); const qt=tokens(query);
  return KNOWLEDGE_BASE.map(entry=>{
    const hay=normalize([entry.title,...entry.aliases,entry.summary,...entry.related].join(' '));
    let score=entry.aliases.some(a=>q.includes(normalize(a))||normalize(a).includes(q))?20:0;
    for(const t of qt) if(hay.includes(t)) score+=2;
    if(normalize(entry.title)===q) score+=20;
    return {...entry,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,limit);
}
function contextFor(query){
  const found=retrieve(query,3);
  return {found, text:found.map(e=>`TEMA: ${e.title}\nSÍNTESE CURADA: ${e.summary}\nPERSPECTIVAS:\n${e.perspectives.map(p=>`- ${p.author}: ${p.position}`).join('\n')}\nNOTA CLÍNICA: ${e.clinical}\nRELAÇÕES: ${e.related.join(', ')}\nREFERÊNCIAS: ${e.references.join(' | ')}`).join('\n\n---\n\n')};
}
module.exports={KNOWLEDGE_BASE,retrieve,contextFor};
