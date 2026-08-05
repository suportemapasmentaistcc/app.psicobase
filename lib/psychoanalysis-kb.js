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
  },
  {id:'resistencia',title:'Resistência',aliases:['resistência','resistencia'],summary:'Resistência designa as forças que se opõem ao acesso e à elaboração de conteúdos, vínculos e modos de satisfação no processo analítico.',perspectives:[{author:'Sigmund Freud',position:'Freud descreve diferentes formas de resistência e as relaciona ao recalque, à transferência e às instâncias psíquicas.'}],clinical:'Deve ser observada no processo e no vínculo, sem ser tratada como simples falta de colaboração.',related:['recalque','transferência','elaboração'],references:['Freud — Recordar, repetir e elaborar (1914)','Freud — Inibição, sintoma e angústia (1926)']},
  {id:'associacao-livre',title:'Associação livre',aliases:['associação livre','associacao livre'],summary:'Regra fundamental do método psicanalítico pela qual o analisando é convidado a dizer o que lhe ocorre, reduzindo a censura voluntária.',perspectives:[{author:'Sigmund Freud',position:'A associação livre substitui técnicas sugestivas e permite acompanhar derivações, interrupções e formações do discurso.'}],clinical:'A regra não elimina resistências; torna seus efeitos observáveis no próprio modo de falar.',related:['atenção flutuante','resistência','inconsciente'],references:['Freud — Sobre o início do tratamento (1913)','Freud — Recomendações aos médicos que exercem a psicanálise (1912)']},
  {id:'atencao-flutuante',title:'Atenção flutuante',aliases:['atenção flutuante','atencao flutuante'],summary:'Posição de escuta em que o analista evita selecionar antecipadamente o que seria mais importante, mantendo abertura às formações do discurso.',perspectives:[{author:'Sigmund Freud',position:'Freud propõe a atenção uniformemente suspensa como contraparte técnica da associação livre.'}],clinical:'Não significa passividade, distração ou ausência de elaboração clínica.',related:['associação livre','escuta','contratransferência'],references:['Freud — Recomendações aos médicos que exercem a psicanálise (1912)']},
  {id:'contratransferencia',title:'Contratransferência',aliases:['contratransferência','contratransferencia'],summary:'Conjunto de respostas afetivas e psíquicas do analista mobilizadas no encontro clínico, cuja compreensão varia entre tradições psicanalíticas.',perspectives:[{author:'Sigmund Freud',position:'Freud inicialmente a formula como algo que exige reconhecimento e trabalho por parte do analista.'},{author:'Wilfred Bion',position:'Tradições pós-kleinianas ampliam seu uso como fonte de investigação, desde que submetida à reflexão e supervisão.'}],clinical:'Não deve ser usada como prova imediata sobre o paciente; exige elaboração, contexto e supervisão.',related:['transferência','identificação projetiva','supervisão'],references:['Freud — As perspectivas futuras da terapêutica psicanalítica (1910)','Bion — Aprender com a experiência']},
  {id:'sintoma',title:'Sintoma',aliases:['sintoma','formação de compromisso'],summary:'O sintoma é uma formação que condensa conflito, defesa, satisfação substitutiva e sofrimento, não se reduzindo a um sinal isolado.',perspectives:[{author:'Sigmund Freud',position:'Freud descreve o sintoma como formação de compromisso entre exigência pulsional e defesa.'},{author:'Jacques Lacan',position:'Lacan enfatiza sua estrutura significante e, em formulações posteriores, sua função singular de amarração.'}],clinical:'A escuta busca a função e a história do sintoma para o sujeito, em vez de aplicar um significado universal.',related:['recalque','gozo','fantasia'],references:['Freud — Inibição, sintoma e angústia (1926)','Lacan — Escritos']},
  {id:'fantasia',title:'Fantasia',aliases:['fantasia','fantasma'],summary:'Fantasia é uma organização psíquica que dá forma a posições de desejo, cenas e relações com o objeto.',perspectives:[{author:'Sigmund Freud',position:'Freud examina fantasias conscientes e inconscientes em sua relação com sintomas e sexualidade.'},{author:'Jacques Lacan',position:'Lacan formaliza a fantasia como estrutura que enquadra a relação do sujeito com o objeto a.'}],clinical:'Não equivale a mentira ou imaginação voluntária; interessa sua função na economia subjetiva.',related:['desejo','objeto a','sintoma'],references:['Freud — Fantasias histéricas e sua relação com a bissexualidade (1908)','Lacan — O Seminário, Livro 11']},
  {id:'angustia',title:'Angústia',aliases:['angústia','angustia'],summary:'A angústia ocupa lugar central na teoria psicanalítica e recebe formulações distintas em Freud e Lacan.',perspectives:[{author:'Sigmund Freud',position:'Freud revê sua teoria e passa a considerar a angústia como sinal mobilizado diante de uma situação de perigo.'},{author:'Jacques Lacan',position:'Lacan afirma que a angústia não é sem objeto e a articula ao desejo do Outro e ao objeto a.'}],clinical:'Sua leitura exige distinguir experiência singular, situação desencadeante e função defensiva, sem substituir avaliação clínica abrangente.',related:['objeto a','desamparo','castração'],references:['Freud — Inibição, sintoma e angústia (1926)','Lacan — O Seminário, Livro 10: A angústia']},
  {id:'luto-melancolia',title:'Luto e melancolia',aliases:['luto','melancolia','luto e melancolia'],summary:'Freud diferencia o trabalho de luto de uma condição melancólica marcada por empobrecimento do eu e autorrecriminação.',perspectives:[{author:'Sigmund Freud',position:'No luto, o mundo se torna pobre; na melancolia, o próprio eu é atingido pela perda e pela ambivalência.'}],clinical:'A distinção é teórica e não substitui avaliação diagnóstica contemporânea.',related:['perda','ambivalência','narcisismo'],references:['Freud — Luto e melancolia (1917)']},
  {id:'edipo',title:'Complexo de Édipo',aliases:['édipo','edipo','complexo de édipo'],summary:'O complexo de Édipo organiza formulações sobre desejo, interdição, identificação e posição geracional.',perspectives:[{author:'Sigmund Freud',position:'Freud o relaciona à sexualidade infantil, às identificações e à formação do supereu.'},{author:'Jacques Lacan',position:'Lacan o relê em termos de função simbólica, Nome-do-Pai e metáfora paterna.'}],clinical:'Seu uso requer atenção às configurações familiares e simbólicas singulares, evitando esquemas rígidos.',related:['castração','supereu','nome-do-pai'],references:['Freud — O Ego e o Id (1923)','Lacan — O Seminário, Livro 5']},
  {id:'id-ego-superego',title:'Id, ego e superego',aliases:['id','ego','superego','segunda tópica'],summary:'Na segunda tópica freudiana, id, ego e superego designam instâncias e relações dinâmicas do aparelho psíquico.',perspectives:[{author:'Sigmund Freud',position:'O ego media exigências pulsionais, realidade e superego, sem ser inteiramente consciente ou soberano.'}],clinical:'As instâncias não são personagens internos, mas modelos para pensar conflito, defesa e identificação.',related:['inconsciente','ideal do eu','defesas'],references:['Freud — O Ego e o Id (1923)']},
  {id:'negacao',title:'Negação',aliases:['negação','negacao','verneinung'],summary:'A negação permite que um conteúdo recalcado alcance a consciência sob a forma de recusa, sem que o recalque seja plenamente levantado.',perspectives:[{author:'Sigmund Freud',position:'Freud mostra como o juízo negativo pode reconhecer intelectualmente um conteúdo e, ao mesmo tempo, manter sua recusa afetiva.'}],clinical:'A formulação deve ser usada na análise do discurso concreto, não como regra automática para inverter tudo o que é negado.',related:['recalque','juízo','inconsciente'],references:['Freud — A negação (1925)']},
  {id:'sublimacao',title:'Sublimação',aliases:['sublimação','sublimacao'],summary:'Sublimação designa destinos pulsionais em que finalidade e objeto se transformam em atividades socialmente valorizadas.',perspectives:[{author:'Sigmund Freud',position:'Freud a articula à cultura, criação e destinos da pulsão, embora não tenha produzido uma teoria única e fechada do conceito.'}],clinical:'Não deve ser confundida com simples produtividade ou repressão bem-sucedida.',related:['pulsão','cultura','criação'],references:['Freud — Pulsões e seus destinos (1915)','Freud — O mal-estar na civilização (1930)']},
  {id:'mecanismos-defesa',title:'Mecanismos de defesa',aliases:['mecanismos de defesa','defesas do ego'],summary:'Mecanismos de defesa são operações psíquicas que modulam conflitos, afetos e representações, com diferentes graus de flexibilidade.',perspectives:[{author:'Anna Freud',position:'Anna Freud sistematiza mecanismos como recalque, regressão, formação reativa, isolamento e anulação.'}],clinical:'Defesas têm função protetiva e não devem ser classificadas apenas como defeitos.',related:['ego','recalque','formação reativa'],references:['Anna Freud — O ego e os mecanismos de defesa (1936)']},
  {id:'posicao-esquizoparanoide',title:'Posição esquizoparanoide',aliases:['posição esquizoparanoide','posicao esquizoparanoide'],summary:'Na teoria kleiniana, designa uma organização inicial marcada por cisão, idealização, perseguição e relações com objetos parciais.',perspectives:[{author:'Melanie Klein',position:'A posição não é uma fase abolida definitivamente; seus mecanismos podem reaparecer ao longo da vida.'}],clinical:'Não equivale a diagnóstico de esquizofrenia ou paranoia.',related:['identificação projetiva','cisão','posição depressiva'],references:['Klein — Notas sobre alguns mecanismos esquizoides (1946)']},
  {id:'posicao-depressiva',title:'Posição depressiva',aliases:['posição depressiva','posicao depressiva'],summary:'Na teoria kleiniana, corresponde à crescente integração do objeto, da ambivalência e da preocupação com o dano causado ao objeto amado.',perspectives:[{author:'Melanie Klein',position:'A elaboração da posição depressiva envolve culpa, reparação e reconhecimento de amor e ódio dirigidos ao mesmo objeto.'}],clinical:'Não equivale a transtorno depressivo; é uma posição psíquica teórica.',related:['reparação','ambivalência','posição esquizoparanoide'],references:['Klein — Amor, culpa e reparação']},
  {id:'objeto-transicional',title:'Objeto transicional',aliases:['objeto transicional','fenômenos transicionais'],summary:'Winnicott descreve objetos e fenômenos transicionais como pertencentes a uma área intermediária entre realidade interna e externa.',perspectives:[{author:'Donald Winnicott',position:'O objeto transicional participa da passagem da dependência inicial para formas mais complexas de relação e simbolização.'}],clinical:'Não é definido apenas pelo tipo de objeto, mas pela função que ocupa na experiência da criança.',related:['espaço potencial','brincar','holding'],references:['Winnicott — O brincar e a realidade (1971)']},
  {id:'espaco-potencial',title:'Espaço potencial',aliases:['espaço potencial','espaco potencial'],summary:'Área intermediária de experiência em que brincar, criatividade e cultura podem emergir.',perspectives:[{author:'Donald Winnicott',position:'O espaço potencial depende de confiança e de experiências ambientais suficientemente boas.'}],clinical:'Na clínica, informa a possibilidade de simbolização e jogo compartilhado.',related:['objeto transicional','brincar','criatividade'],references:['Winnicott — O brincar e a realidade (1971)']},
  {id:'reverie',title:'Rêverie',aliases:['rêverie','reverie'],summary:'Em Bion, rêverie descreve uma capacidade receptiva e transformadora do cuidador diante de experiências emocionais brutas.',perspectives:[{author:'Wilfred Bion',position:'A rêverie participa da função alfa e da relação continente-conteúdo.'}],clinical:'Não é devaneio livre; implica capacidade de receber, transformar e devolver experiência em forma pensável.',related:['função alfa','continente-conteúdo','elementos beta'],references:['Bion — Aprender com a experiência']},
  {id:'continente-conteudo',title:'Continente-conteúdo',aliases:['continente conteúdo','continente-conteudo'],summary:'Modelo bioniano para pensar relações de recepção e transformação de experiências emocionais.',perspectives:[{author:'Wilfred Bion',position:'Continente e conteúdo se transformam mutuamente e não correspondem simplesmente a pessoas fixas.'}],clinical:'Ajuda a pensar capacidade de elaboração, comunicação e falhas de transformação.',related:['rêverie','função alfa','identificação projetiva'],references:['Bion — Aprender com a experiência']},
  {id:'nome-do-pai',title:'Nome-do-Pai',aliases:['nome-do-pai','nome do pai'],summary:'Conceito lacaniano ligado à função simbólica de interdição, mediação e inscrição da lei na estrutura.',perspectives:[{author:'Jacques Lacan',position:'Lacan o articula à metáfora paterna e, em momentos posteriores, pluraliza suas funções.'}],clinical:'Não se reduz à presença empírica do pai ou a um modelo familiar único.',related:['édipo','metáfora paterna','foraclusão'],references:['Lacan — O Seminário, Livro 5','Lacan — Escritos']},
  {id:'real-simbolico-imaginario',title:'Real, simbólico e imaginário',aliases:['real simbólico imaginário','rsi'],summary:'Registros lacanianos usados para pensar imagem, linguagem, lei, corpo e aquilo que resiste à simbolização.',perspectives:[{author:'Jacques Lacan',position:'Os três registros são articulados ao longo de sua obra e, posteriormente, por meio da topologia dos nós.'}],clinical:'Não devem ser tratados como compartimentos independentes ou sinônimos de realidade, símbolo e imaginação cotidianos.',related:['significante','estádio do espelho','gozo'],references:['Lacan — O Seminário, Livro 1','Lacan — O Seminário, Livro 22']},
  {id:'gozo',title:'Gozo',aliases:['gozo','jouissance'],summary:'Em Lacan, gozo designa modos de satisfação que excedem o princípio do prazer e podem incluir sofrimento.',perspectives:[{author:'Jacques Lacan',position:'O conceito assume diferentes modalidades e se articula ao corpo, à lei, ao significante e à repetição.'}],clinical:'Não é sinônimo simples de prazer sexual ou felicidade.',related:['pulsão','repetição','sintoma'],references:['Lacan — O Seminário, Livro 7','Lacan — O Seminário, Livro 20']},
  {id:'estadio-espelho',title:'Estádio do espelho',aliases:['estádio do espelho','estadio do espelho'],summary:'Formulação lacaniana sobre a constituição do eu por identificação com uma imagem unificada.',perspectives:[{author:'Jacques Lacan',position:'A imagem oferece unidade antecipada, mas também introduz alienação e dependência do olhar do Outro.'}],clinical:'Não é apenas uma etapa cronológica ou um teste visual literal.',related:['narcisismo','imaginário','eu'],references:['Lacan — O estádio do espelho como formador da função do eu']},
  {id:'sexualidade-infantil',title:'Sexualidade infantil',aliases:['sexualidade infantil','fases psicossexuais'],summary:'Freud propõe que a sexualidade possui história infantil, zonas erógenas, fantasias e destinos anteriores à puberdade.',perspectives:[{author:'Sigmund Freud',position:'A sexualidade infantil é polimorfa e não pode ser reduzida ao modelo genital adulto.'}],clinical:'O conceito exige cuidado ético e não autoriza interpretações invasivas ou sexualização de comportamentos infantis.',related:['édipo','pulsão','recalque'],references:['Freud — Três ensaios sobre a teoria da sexualidade (1905)']},
  {id:'trauma',title:'Trauma psíquico',aliases:['trauma','trauma psíquico'],summary:'Na psicanálise, trauma pode designar excesso, ruptura de elaboração e efeitos produzidos a posteriori, com variações históricas entre autores.',perspectives:[{author:'Sigmund Freud',position:'Freud articula trauma, excitação e repetição, revendo o conceito em diferentes momentos.'},{author:'Sándor Ferenczi',position:'Ferenczi enfatiza o impacto da violência, da desautorização e da confusão de línguas.'}],clinical:'Não deve ser reduzido a evento isolado nem usado para reconstruir fatos sem base clínica.',related:['repetição','desamparo','a posteriori'],references:['Freud — Além do princípio do prazer (1920)','Ferenczi — Confusão de línguas entre os adultos e a criança (1933)']},
  {id:'desamparo',title:'Desamparo',aliases:['desamparo','hilflosigkeit'],summary:'O desamparo refere-se à dependência radical e à incapacidade inicial de o bebê regular sozinho suas necessidades e excitações.',perspectives:[{author:'Sigmund Freud',position:'Freud relaciona o desamparo à origem da angústia, do vínculo e da importância do outro auxiliador.'}],clinical:'Pode orientar a compreensão de dependência, perda e angústia sem funcionar como explicação totalizante.',related:['angústia','dependência','holding'],references:['Freud — Projeto para uma psicologia científica (1895)','Freud — Inibição, sintoma e angústia (1926)']},
  {id:'elaboracao',title:'Elaboração',aliases:['elaboração','elaboracao','working through'],summary:'Elaboração é o trabalho repetido pelo qual resistências, repetições e conflitos se tornam progressivamente analisáveis.',perspectives:[{author:'Sigmund Freud',position:'Freud distingue recordar, repetir e elaborar, destacando que insight isolado não basta.'}],clinical:'A elaboração exige tempo e retorno aos mesmos núcleos sob novas formas.',related:['repetição','resistência','transferência'],references:['Freud — Recordar, repetir e elaborar (1914)']}

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
