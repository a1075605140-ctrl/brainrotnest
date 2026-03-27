export type Game = {
  slug: string
  name: string
  emoji: string
  tagline: string
  description: string
  howToPlay: string[]
  tags: string[]
  iframeUrl: string
  isAvailable: boolean
  featured: boolean
  metaTitle: string
  metaDescription: string
}

export const games: Game[] = [
  {
    slug: "brainrot-clicker",
    name: "Brainrot Clicker",
    emoji: "👆",
    tagline: "Clique para espalhar o brainrot. Você não consegue parar.",
    description:
      "Brainrot Clicker é o idle game definitivo do Italian Brainrot — uma experiência de cliques que começa inocente e escala rápido até o caos total. Cada clique gera Pontos Brainrot, que você usa para desbloquear personagens queridos do universo Italian Brainrot. Veja sua coleção crescer de uma única criatura caótica até um elenco completo de dez ícones malucos, cada um gerando pontos passivos automaticamente.\n\nO que separa Brainrot Clicker de clickers comuns é a personalidade em cada interação. Personagens reagem aos seus cliques, eventos de caos disparam em marcos, e o jogo se recusa a deixar você largar o celular. Esteja farmando os personagens mais raros ou clicando sem pensar no intervalo da faculdade, Brainrot Clicker entrega exatamente o tipo de engajamento derretedor de cérebro pelo qual o Italian Brainrot é famoso.",
    howToPlay: [
      "Clique no personagem principal para gerar Pontos Brainrot",
      "Use os pontos para desbloquear novos personagens do Italian Brainrot",
      "Cada personagem gera pontos passivos automaticamente",
      "Alcance marcos para desbloquear eventos especiais de caos",
      "Consegue reunir os 10 personagens?",
    ],
    tags: ["Clicker", "Idle", "Casual"],
    iframeUrl:
      "https://html5.gamedistribution.com/cb70400cb9914c9caff17b1ebbff4f79/?gd_sdk_referrer_url=https://www.brainrotnest.com/games/brainrot-clicker",
    isAvailable: true,
    featured: true,
    metaTitle: "Brainrot Clicker — Jogo Clicker Italian Brainrot (jogue grátis)",
    metaDescription:
      "Jogue Brainrot Clicker grátis online! O clicker definitivo de Italian brainrot. Clique para desbloquear todos os personagens. Sem download.",
  },
  {
    slug: "steal-a-brainrot-online",
    name: "Steal a Brainrot",
    emoji: "🔀",
    tagline: "Roube personagens dos seus amigos. Online.",
    description:
      "Steal a Brainrot é o jogo multiplayer de roubar cartas que conquistou a comunidade Italian Brainrot. Cada jogador começa com três personagens Brainrot sorteados e precisa de astúcia, blefe e raciocínio rápido para roubar rivais e montar a coleção suprema. Identifique com sucesso um traço da mão de outro jogador para ficar com a carta — ou arrisque perder os seus próprios personagens preciosos.\n\nO apelo do jogo está no equilíbrio entre estratégia e caos — duas coisas que o universo Italian Brainrot faz muito bem. A cada rodada surgem novas combinações de personagens e tentativas malucas de roubo; nenhuma partida se repete. Desafie amigos, suba no ranking e descubra quais personagens Brainrot são os prêmios mais cobiçados.",
    howToPlay: [
      "Cada jogador começa com 3 personagens Brainrot aleatórios",
      "Na sua vez, tente roubar um personagem de outro jogador",
      "Acerte o traço do personagem dele para conquistar a carta",
      "Reúna todos os personagens para vencer",
      "Cuidado — os outros também podem roubar os seus!",
    ],
    tags: ["Multijogador", "Estratégia", "Cartas"],
    iframeUrl: "",
    isAvailable: true,
    featured: true,
    metaTitle: "Steal a Brainrot — Jogo de cartas Brainrot online grátis",
    metaDescription:
      "Jogue Steal a Brainrot grátis online! O jogo de roubar cartas em que você rouba personagens Italian Brainrot do oponente. Sem download.",
  },
  {
    slug: "brainrot-merge",
    name: "Brainrot Merge",
    emoji: "🔀",
    tagline: "Fundir personagens até chegar na La Vaca Saturno!",
    description:
      "Brainrot Merge é o quebra-cabeça que faz uma pergunta simples: o que acontece quando você combina dois personagens Italian Brainrot? A resposta é sempre algo mais estranho, mais poderoso e bem mais descontrolado que a soma das partes. Arraste personagens iguais no tabuleiro, veja-os fundir em formas mais raras e trabalhe para descobrir cada combinação possível.\n\nPensamento estratégico importa tanto quanto reflexos rápidos. O tabuleiro enche rápido, e um merge mal colocado pode travar tudo. Planeje fusões, descubra merges secretos entre pares específicos e mire nas formas lendárias no topo da cadeia evolutiva.",
    howToPlay: [
      "Arraste personagens Brainrot iguais para fundi-los",
      "Personagens fundidos evoluem para formas mais raras e fortes",
      "Encha o tabuleiro com estratégia — não fique preso",
      "Descubra todas as combinações secretas de fusão",
    ],
    tags: ["Merge", "Quebra-cabeça", "Estratégia"],
    iframeUrl: "",
    isAvailable: true,
    featured: false,
    metaTitle: "Brainrot Merge — Jogo de fundir personagens Italian Brainrot",
    metaDescription:
      "Jogue Brainrot Merge grátis! Funda personagens Italian Brainrot até a La Vaca Saturno. Quebra-cabeça estilo 2048 com seu elenco favorito de brainrot.",
  },
  {
    slug: "brainrot-puzzle",
    name: "Jogo da Memória Brainrot",
    emoji: "🧩",
    tagline: "Combine todos os personagens Italian Brainrot!",
    description:
      "Jogo da Memória Brainrot é o jogo original de BrainrotNest de encontrar pares, ambientado no viral Italian Brainrot. Vire cartas para achar pares de personagens queridos — de Tralalero Tralala a Cappuccino Assassino — antes que o tempo acabe. Três níveis de dificuldade mantêm o desafio fresco, seja fã casual ou estudioso de Brainrot.\n\nSuas melhores pontuações ficam salvas localmente para você buscar um novo recorde. A pontuação premia velocidade e precisão — menos jogadas com mais tempo restante significam nota maior. Consegue zerar no modo Difícil?",
    howToPlay: [
      "Escolha a dificuldade Fácil, Médio ou Difícil",
      "Vire duas cartas por vez para achar pares do mesmo personagem",
      "Combine todos os pares antes do fim do tempo para ganhar",
      "Pontuação = (tempo restante × 10) − (jogadas × 2)",
      "Supere seu melhor placar nos três níveis!",
    ],
    tags: ["Memória", "Quebra-cabeça", "Casual"],
    iframeUrl: "",
    isAvailable: true,
    featured: false,
    metaTitle: "Jogo da Memória Brainrot — combine personagens Italian Brainrot",
    metaDescription:
      "Jogue o Jogo da Memória Brainrot grátis! Encontre todos os pares antes do tempo acabar. Fácil, Médio e Difícil. Sem download.",
  },
  {
    slug: "brainrot-craft",
    name: "Brainrot Craft",
    emoji: "⚒️",
    tagline: "Construa seu império brainrot.",
    description:
      "Brainrot Craft coloca você no comando de erguer seu próprio império Italian Brainrot do zero. Colete recursos, descubra receitas inspiradas nos personagens e construa estruturas que automatizam sua produção. Cada personagem Italian Brainrot desbloqueia uma receita única, premiando quem explora o elenco inteiro.\n\nOs elementos idle combinam sessões longas com partidas rápidas. Volte após uma pausa e encontre seu império crescendo, recursos acumulados e novas possibilidades de crafting. O objetivo é dominar totalmente a dimensão Brainrot — uma estrutura de cada vez.",
    howToPlay: [
      "Colete recursos clicando no ambiente",
      "Fabrique itens com receitas dos personagens Italian Brainrot",
      "Construa estruturas para automatizar a coleta",
      "Expanda o império e desbloqueie todos os personagens",
    ],
    tags: ["Craft", "Idle", "Estratégia"],
    iframeUrl: "",
    isAvailable: true,
    featured: false,
    metaTitle: "Brainrot Craft — jogo de craft Italian Brainrot grátis",
    metaDescription:
      "Jogue Brainrot Craft grátis! Colete recursos e fabrique itens Italian Brainrot. Brainrot, Caos, Espresso e mais para criar itens poderosos.",
  },
  {
    slug: "brainrot-idle",
    name: "Brainrot Idle",
    emoji: "💤",
    tagline: "Mesmo offline, o brainrot se espalha.",
    description:
      "Brainrot Idle é a expressão mais pura do Italian Brainrot como mecânica de jogo: o caos continua mesmo quando você não está olhando. Monte sua linha de produção, aloque personagens nos melhores papéis e deixe a economia Brainrot rodar sozinha. Ganhos offline acumulam em tempo real, esperando você voltar para coletar.\n\nO sistema de prestígio transforma Brainrot Idle em experiência profunda. Zere o progresso por multiplicadores poderosos que disparam a produção, desbloqueie personagens exclusivos de prestígio e dispute as maiores taxas de produção da dimensão Brainrot. Quanto mais você joga — e quanto mais some — mais forte fica seu império.",
    howToPlay: [
      "Compre geradores para ganhar Pontos Brainrot por segundo",
      "Personagens geram pontos mesmo quando você está fora",
      "Volte para coletar ganhos offline (até 8 horas)",
      "Desbloqueie marcos para aumentar o multiplicador",
      "O progresso salva automaticamente a cada 30 segundos",
    ],
    tags: ["Idle", "Casual"],
    iframeUrl: "",
    isAvailable: true,
    featured: false,
    metaTitle: "Brainrot Idle — idle clicker Italian Brainrot grátis",
    metaDescription:
      "Jogue Brainrot Idle grátis! Monte seu império brainrot e ganhe pontos mesmo offline. Idle Italian Brainrot com 6 geradores e marcos.",
  },
  {
    slug: "brainrot-tower",
    name: "Brainrot Tower Defense",
    emoji: "🏰",
    tagline: "Defenda o ninho das ondas de brainrot!",
    description:
      "Brainrot Tower Defense transforma o elenco Italian Brainrot em arsenal tático completo. Posicione personagens ao longo do caminho para interceptar ondas inimigas; cada um contribui com habilidades únicas na defesa. Bombardiro cobre o longo alcance, Tung Tung cria ataques de área em ritmo, e todos trazem algo insubstituível para o campo de batalha.\n\nDez ondas cada vez mais difíceis testam seu limite — de Mini Brainrots rápidos a Boss Brainrots devastadores. Gaste o ouro ganhado com sabedoria entre as ondas, cubra o trajeto com torres complementares e veja se protege o ninho do caos brainrot total.",
    howToPlay: [
      "Escolha um tipo de torre e clique num tile vazio para colocá-la",
      "Cada personagem tem dano, alcance e cadência únicos",
      "Aperte Próxima onda para mandar inimigos rumo ao ninho",
      "Derrote inimigos para ganhar ouro e comprar mais torres",
      "Sobreviva às 10 ondas para vencer!",
    ],
    tags: ["Tower defense", "Estratégia"],
    iframeUrl: "",
    isAvailable: true,
    featured: false,
    metaTitle: "Brainrot Tower Defense — tower defense Italian Brainrot grátis",
    metaDescription:
      "Jogue Brainrot Tower Defense grátis! Coloque torres dos personagens Italian Brainrot e defenda-se de 10 ondas. Estratégia grátis no navegador.",
  },
  {
    slug: "brainrot-quiz-game",
    name: "Brainrot Quiz Game",
    emoji: "❓",
    tagline: "Quanto de brainrot você realmente sabe?",
    description:
      "Brainrot Quiz Game é o teste definitivo de conhecimento Italian Brainrot — 30 segundos por pergunta, sem ajudas, sem piedade. Perguntas vão de lore e origens a bordões, habilidades e curiosidades obscuras que separam fã casual de devoto. Encadeie acertos para multiplicadores de pontuação e suba no ranking.\n\nÀ medida que avança nos pacotes de perguntas, a dificuldade sobe de acessível a genuinamente exigente. As primeiras rodadas cobram o básico — reconhece o personagem pelo emoji? As últimas exigem lore que só estudioso Brainrot domina. Quer revisando personagens ou entrando frio, Brainrot Quiz Game é o jeito mais divertido de descobrir quanto brainrot você realmente tem na cabeça.",
    howToPlay: [
      "Responda perguntas sobre personagens Italian Brainrot",
      "30 segundos por pergunta — pense rápido",
      "Encadeie acertos para multiplicadores de pontuação",
      "Desbloqueie pacotes de perguntas mais difíceis conforme avança",
    ],
    tags: ["Quiz", "Trivia", "Casual"],
    iframeUrl: "",
    isAvailable: true,
    featured: false,
    metaTitle: "Brainrot Quiz Game — trivia Italian Brainrot online",
    metaDescription:
      "Jogue Brainrot Quiz Game grátis! Teste seu conhecimento Italian Brainrot neste trivia rápido. Quanto brainrot você sabe?",
  },
]

export function getGameBySlugPtBr(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug)
}

export function getOtherGamesPtBr(currentSlug: string, count = 3): Game[] {
  const available = games.filter((g) => g.slug !== currentSlug && g.isAvailable)
  const unavailable = games.filter((g) => g.slug !== currentSlug && !g.isAvailable)
  return [...available, ...unavailable].slice(0, count)
}

export function getAllGameSlugsPtBr(): string[] {
  return games.map((g) => g.slug)
}
