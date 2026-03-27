import type { Quiz } from "./quizData"

// ─────────────────────────────────────────────────────────────────────────────
// Quiz 1 — Personalidade (PT-BR)
// ─────────────────────────────────────────────────────────────────────────────
const brainrotQuizPtBr: Quiz = {
  slug: "brainrot-quiz",
  type: "personality",
  title: "Qual personagem de Italian Brainrot você é?",
  description:
    "Responda 12 perguntas caóticas e descubra sua fera interior do Italian Brainrot. Você é o explosivo Bombardiro, a elegante Ballerina, o rítmico Tung Tung ou o letal Cappuccino Assassino?",
  seoTitle: "Quiz Brainrot — Qual personagem de Italian Brainrot você é? (2026)",
  seoDescription:
    "Faça nosso quiz brainrot e descubra qual personagem Italian Brainrot combina com a sua personalidade. 12 perguntas divertidas, resultado na hora!",
  questions: [
    {
      id: "q1",
      question: "Qual é a sua vibe numa segunda de manhã?",
      options: [
        { id: "q1_a", text: "Pronto(a) pra causar caos absoluto 💥" },
        { id: "q1_b", text: "Tomando espresso e impecável ☕" },
        { id: "q1_c", text: "Já batucando os dedos no ritmo 🥁" },
        { id: "q1_d", text: "Tramando algo em silêncio total... 🤫" },
      ],
    },
    {
      id: "q2",
      question: "Seus amigos diriam que você é...",
      options: [
        { id: "q2_a", text: "Imprevisível e uma diversão explosiva" },
        { id: "q2_b", text: "Elegante, mas secretamente intimidador(a)" },
        { id: "q2_c", text: "Sempre fazendo algum barulho" },
        { id: "q2_d", text: "Perigosamente quieto(a) e observador(a)" },
      ],
    },
    {
      id: "q3",
      question: "Escolha uma atividade caótica:",
      options: [
        { id: "q3_a", text: "Bombardear uma vila medieval italiana de cima" },
        { id: "q3_b", text: "Pirueta num bar lotado tomando espresso" },
        { id: "q3_c", text: "Tocar bateria no talo às 3h da manhã" },
        { id: "q3_d", text: "Eliminar o café de alguém sem fazer barulho" },
      ],
    },
    {
      id: "q4",
      question: "Seu lanche favorito é:",
      options: [
        { id: "q4_a", text: "O que der pra pegar voando a velocidade máxima" },
        { id: "q4_b", text: "Um cappuccino perfeitamente camadas" },
        { id: "q4_c", text: "Qualquer coisa que dê pra comer no ritmo" },
        { id: "q4_d", text: "Algo escuro e amargo, como a minha alma" },
      ],
    },
    {
      id: "q5",
      question: "Como você lida com um problema?",
      options: [
        { id: "q5_a", text: "De cara, e vejo o estrago depois" },
        { id: "q5_b", text: "Contorno com elegância natural" },
        { id: "q5_c", text: "Espanco no ritmo até se submeter" },
        { id: "q5_d", text: "Faço sumir quietinho, sem rastro" },
      ],
    },
    {
      id: "q6",
      question: "Sexta à noite ideal:",
      options: [
        { id: "q6_a", text: "Explosões, caos, puro descontrole" },
        { id: "q6_b", text: "Dançar até o nascer do sol com forma perfeita" },
        { id: "q6_c", text: "Roda de bateria até o amanhecer" },
        { id: "q6_d", text: "Sozinho nas sombras, planejando o próximo passo" },
      ],
    },
    {
      id: "q7",
      question: "Escolha um superpoder:",
      options: [
        { id: "q7_a", text: "Voo + bombas aéreas ilimitadas 🛩️" },
        { id: "q7_b", text: "Piruetes hipnóticas que aparam inimigos ✨" },
        { id: "q7_c", text: "Ritmo inquebrável que controla a realidade 🥁" },
        { id: "q7_d", text: "Invisibilidade perfeita + precisão letal 💀" },
      ],
    },
    {
      id: "q8",
      question: "Qual é seu animal espiritual?",
      options: [
        { id: "q8_a", text: "Crocodilo alado com bomba amarrada 🐊" },
        { id: "q8_b", text: "Cisne elegante num banho de latte 🦢" },
        { id: "q8_c", text: "Macaco que nunca para de bater 🐒" },
        { id: "q8_d", text: "Gato preto que julga todo mundo em silêncio 🐈‍⬛" },
      ],
    },
    {
      id: "q9",
      question: "Numa festa, você é...",
      options: [
        { id: "q9_a", text: "Quem literalmente entrou pela parede" },
        { id: "q9_b", text: "A pessoa mais elegante da sala" },
        { id: "q9_c", text: "O DJ / baterista que todo mundo ama" },
        { id: "q9_d", text: "No canto, calculando tudo" },
      ],
    },
    {
      id: "q10",
      question: "Seu defeito fatal é:",
      options: [
        { id: "q10_a", text: "Não ter botão de desligar pra destruição" },
        { id: "q10_b", text: "Ser fabuloso demais pra maioria" },
        { id: "q10_c", text: "Ser fisicamente incapaz de parar o beat" },
        { id: "q10_d", text: "Desconfiar de literalmente todo mundo" },
      ],
    },
    {
      id: "q11",
      question: "Escolha uma palavra italiana que combina com você:",
      options: [
        { id: "q11_a", text: "BOMBARDARE! (bombardear tudo)" },
        { id: "q11_b", text: "Eleganza (elegância acima de tudo)" },
        { id: "q11_c", text: "Ritmo (ritmo é vida)" },
        { id: "q11_d", text: "Silenzio (silêncio é poder)" },
      ],
    },
    {
      id: "q12",
      question: "Seu bordão pessoal seria:",
      options: [
        { id: "q12_a", text: "\"LÁ VEM O PROBLEMA!\" 💥" },
        { id: "q12_b", text: "\"Perfeição é o único padrão.\" 💅" },
        { id: "q12_c", text: "\"Não lute contra o beat — seja o beat.\" 🥁" },
        { id: "q12_d", text: "\"...\" (ações falam mais) 😶" },
      ],
    },
  ],
  results: [
    {
      id: "bombardiro-crocodilo",
      character: "Bombardiro Crocodilo",
      emoji: "🐊",
      description:
        "Você é caos puro em forma física. Como o lendário crocodilo bombardeiro voador da Itália, você entra de cara nas situações e pergunta depois. As pessoas ou amam sua energia ou fogem — em geral as duas coisas. A vida é curta demais pra sutileza.",
      traits: ["Energia explosiva", "Caótico sem medo", "Nascido pra destruição"],
    },
    {
      id: "ballerina-cappuccina",
      character: "Ballerina Cappuccina",
      emoji: "☕",
      description:
        "Gracioso(a), preciso(a) e movido(a) por uma paixão intensa pela perfeição abastecida de cafeína. Você desliza pela vida com elegância aparente, mas quem te conhece de verdade sabe que há uma tempestade espumando por baixo.",
      traits: ["Elegantíssimo(a)", "Intenso(a) no sigilo", "Perfeccionista cafeinado(a)"],
    },
    {
      id: "tung-tung-sahur",
      character: "Tung Tung Sahur",
      emoji: "🥁",
      description:
        "Você vive num ritmo que só você ouve direito. Sua energia é contagiante, seu timing é sobrenatural e você transforma qualquer lugar em experiência percussiva. Por onde passa, o povo se mexe.",
      traits: ["Alma rítmica", "Energia contagiante", "Coruja lendária"],
    },
    {
      id: "cappuccino-assassino",
      character: "Cappuccino Assassino",
      emoji: "💀",
      description:
        "Silencioso(a), calculista e devastadoramente eficiente. Você opera nas sombras com charme italiano e precisão digna de espresso escuro. A maioria nunca te vê chegar — e é exatamente assim que você planejou.",
      traits: ["Estrategista frio(a)", "Misteriosamente quieto(a)", "Letalmente calmo(a)"],
    },
  ],
  scoring: {
    q1_a: "bombardiro-crocodilo",
    q1_b: "ballerina-cappuccina",
    q1_c: "tung-tung-sahur",
    q1_d: "cappuccino-assassino",
    q2_a: "bombardiro-crocodilo",
    q2_b: "ballerina-cappuccina",
    q2_c: "tung-tung-sahur",
    q2_d: "cappuccino-assassino",
    q3_a: "bombardiro-crocodilo",
    q3_b: "ballerina-cappuccina",
    q3_c: "tung-tung-sahur",
    q3_d: "cappuccino-assassino",
    q4_a: "bombardiro-crocodilo",
    q4_b: "ballerina-cappuccina",
    q4_c: "tung-tung-sahur",
    q4_d: "cappuccino-assassino",
    q5_a: "bombardiro-crocodilo",
    q5_b: "ballerina-cappuccina",
    q5_c: "tung-tung-sahur",
    q5_d: "cappuccino-assassino",
    q6_a: "bombardiro-crocodilo",
    q6_b: "ballerina-cappuccina",
    q6_c: "tung-tung-sahur",
    q6_d: "cappuccino-assassino",
    q7_a: "bombardiro-crocodilo",
    q7_b: "ballerina-cappuccina",
    q7_c: "tung-tung-sahur",
    q7_d: "cappuccino-assassino",
    q8_a: "bombardiro-crocodilo",
    q8_b: "ballerina-cappuccina",
    q8_c: "tung-tung-sahur",
    q8_d: "cappuccino-assassino",
    q9_a: "bombardiro-crocodilo",
    q9_b: "ballerina-cappuccina",
    q9_c: "tung-tung-sahur",
    q9_d: "cappuccino-assassino",
    q10_a: "bombardiro-crocodilo",
    q10_b: "ballerina-cappuccina",
    q10_c: "tung-tung-sahur",
    q10_d: "cappuccino-assassino",
    q11_a: "bombardiro-crocodilo",
    q11_b: "ballerina-cappuccina",
    q11_c: "tung-tung-sahur",
    q11_d: "cappuccino-assassino",
    q12_a: "bombardiro-crocodilo",
    q12_b: "ballerina-cappuccina",
    q12_c: "tung-tung-sahur",
    q12_d: "cappuccino-assassino",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Quiz 2 — Conhecimento (PT-BR)
// ─────────────────────────────────────────────────────────────────────────────
const italianBrainrotQuizPtBr: Quiz = {
  slug: "italian-brainrot-quiz",
  type: "knowledge",
  title: "Quiz Italian Brainrot — teste o que você sabe!",
  description:
    "Acha que manja de Italian Brainrot? Prove o que sabe sobre personagens, lore, origens e memes no teste definitivo. 12 perguntas. Sem piedade.",
  seoTitle: "Quiz Italian Brainrot — 12 perguntas (quanto você sabe?)",
  seoDescription:
    "O quiz definitivo de Italian brainrot! Teste seu conhecimento sobre personagens, memes e lore. Você consegue 100%?",
  questions: [
    {
      id: "q1",
      question: "Que tipo de criatura é Bombardiro Crocodilo?",
      options: [
        { id: "q1_a", text: "Jacaré voador com mísseis" },
        { id: "q1_b", text: "Crocodilo voador que virou bombardeiro" },
        { id: "q1_c", text: "Lagarto blindado dos Alpes" },
        { id: "q1_d", text: "Híbrido dragão-crocodilo de Roma" },
      ],
    },
    {
      id: "q2",
      question: "Qual é o traço mais icônico de Tung Tung Sahur?",
      options: [
        { id: "q2_a", text: "Voar sobre o litoral italiano" },
        { id: "q2_b", text: "Vício incontrolável em café" },
        { id: "q2_c", text: "Bateria rítmica que acorda vilarejos inteiros às 3h" },
        { id: "q2_d", text: "Sopro gelado dos Alpes" },
      ],
    },
    {
      id: "q3",
      question: "Ballerina Cappuccina é mais conhecida por:",
      options: [
        { id: "q3_a", text: "Bombardear o litoral italiano de cima" },
        { id: "q3_b", text: "Dançar balé e piruetas temáticas de café desde o Renascimento" },
        { id: "q3_c", text: "Tocar bateria às 3h em bairro residencial" },
        { id: "q3_d", text: "Roubar macarronada de italianos desavisados" },
      ],
    },
    {
      id: "q4",
      question: "Qual personagem é descrito como “assassino cafeinado com charme italiano”?",
      options: [
        { id: "q4_a", text: "Ballerina Cappuccina" },
        { id: "q4_b", text: "Bombardiro Crocodilo" },
        { id: "q4_c", text: "Brr Brr Patapim" },
        { id: "q4_d", text: "Cappuccino Assassino" },
      ],
    },
    {
      id: "q5",
      question: "De onde vem Brr Brr Patapim?",
      options: [
        { id: "q5_a", text: "Das antigas catacumbas romanas" },
        { id: "q5_b", text: "Dos canais de Veneza" },
        { id: "q5_c", text: "Dos Alpes italianos" },
        { id: "q5_d", text: "Da ilha da Sicília" },
      ],
    },
    {
      id: "q6",
      question: "O que Bobrito Bandito rouba em vez de ouro?",
      options: [
        { id: "q6_a", text: "Grãos de espresso" },
        { id: "q6_b", text: "Bandeiras italianas" },
        { id: "q6_c", text: "Massa / macarrão" },
        { id: "q6_d", text: "Baterias" },
      ],
    },
    {
      id: "q7",
      question: "Como Tralalero Tralala se comunica?",
      options: [
        { id: "q7_a", text: "Por batidas ritmicas de tambor" },
        { id: "q7_b", text: "Escrevendo em italiano arcaico" },
        { id: "q7_c", text: "Com código morse à base de café" },
        { id: "q7_d", text: "Só dizendo 'lalala'" },
      ],
    },
    {
      id: "q8",
      question: "Que tipo de animal é La Vaca Saturno Satalite?",
      options: [
        { id: "q8_a", text: "Cavalo cósmico orbitando Júpiter" },
        { id: "q8_b", text: "Vaca cósmica orbitando Saturno" },
        { id: "q8_c", text: "Baleia espacial perto de Netuno" },
        { id: "q8_d", text: "Touro voador da estratosfera" },
      ],
    },
    {
      id: "q9",
      question: "Qual é o poder marca-registro de Frulli Frulla?",
      options: [
        { id: "q9_a", text: "Congelar tudo num raio de 10 metros" },
        { id: "q9_b", text: "Voar na velocidade da luz" },
        { id: "q9_c", text: "Girar e liquidificar tudo no caminho num smoothie" },
        { id: "q9_d", text: "Música que causa amnésia" },
      ],
    },
    {
      id: "q10",
      question: "A palavra “Sahur” em Tung Tung Sahur refere-se a:",
      options: [
        { id: "q10_a", text: "Um tipo de tambor italiano antigo" },
        { id: "q10_b", text: "A refeição antes do jejum no Ramadã" },
        { id: "q10_c", text: "Uma dança famosa de flamenco espanhol" },
        { id: "q10_d", text: "Um imperador romano viciado em bateria" },
      ],
    },
    {
      id: "q11",
      question: "O que as melodias de Lirili Larila causam em quem ouve?",
      options: [
        { id: "q11_a", text: "Risada incontrolável por 24 horas" },
        { id: "q11_b", text: "Amnésia temporária de todos os outros sons" },
        { id: "q11_c", text: "Vontade irresistível de comer massa" },
        { id: "q11_d", text: "Dança permanente até o esgotamento" },
      ],
    },
    {
      id: "q12",
      question: "Qual personagem Italian Brainrot orbita Saturno?",
      options: [
        { id: "q12_a", text: "Frulli Frulla" },
        { id: "q12_b", text: "Brr Brr Patapim" },
        { id: "q12_c", text: "La Vaca Saturno Satalite" },
        { id: "q12_d", text: "Lirili Larila" },
      ],
    },
  ],
  results: [
    {
      id: "normie",
      character: "Normie de carteirinha",
      emoji: "🤡",
      description:
        "Você claramente ainda não passou tempo suficiente no buraco do Italian Brainrot. Tudo bem — todo mundo começa em algum lugar. Visite a página de personagens e volte depois de estudar.",
      traits: ["Felizmente ignorante", "Precisa de mais lore", "Ainda dá pra salvar"],
    },
    {
      id: "apprentice",
      character: "Aprendiz de Brainrot",
      emoji: "🧠",
      description:
        "Nada mal! Você já teve contato com Italian Brainrot, mas ainda tem muito lore pra absorver. Continue assistindo, aprendendo e “apodrecendo”.",
      traits: ["Parcialmente infectado(a)", "Curioso(a) pelo lore", "No caminho certo"],
    },
    {
      id: "scholar",
      character: "Erudito(a) do Italian Brainrot",
      emoji: "🎓",
      description:
        "Impressionante. Você sabe distinguir Bombardiro de Ballerina e Sahur de Assassino. A comunidade Italian Brainrot respeita sua dedicação.",
      traits: ["Lore profundo", "Respeitado(a) na comunidade", "Quase ascendeu"],
    },
    {
      id: "brainrot-god",
      character: "Você É o Brainrot",
      emoji: "👑",
      description:
        "Placar perfeito. Você não só absorveu o lore do Italian Brainrot — virou ele. Neste ponto você pode ser literalmente um dos personagens. Procure ajuda. E parabéns.",
      traits: ["Brainrot total", "Lore encarnado(a)", "Sem volta"],
    },
  ],
  scoring: {
    q1_b: "correct",
    q2_c: "correct",
    q3_b: "correct",
    q4_d: "correct",
    q5_c: "correct",
    q6_c: "correct",
    q7_d: "correct",
    q8_b: "correct",
    q9_c: "correct",
    q10_b: "correct",
    q11_b: "correct",
    q12_c: "correct",
  },
  scoreThresholds: [
    { minScore: 0, resultId: "normie" },
    { minScore: 5, resultId: "apprentice" },
    { minScore: 9, resultId: "scholar" },
    { minScore: 12, resultId: "brainrot-god" },
  ],
}

export const quizzesPtBr: Quiz[] = [brainrotQuizPtBr, italianBrainrotQuizPtBr]

export function getQuizBySlugPtBr(slug: string): Quiz | undefined {
  return quizzesPtBr.find((q) => q.slug === slug)
}
