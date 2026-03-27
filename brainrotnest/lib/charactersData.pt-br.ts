export type CharacterGame = {
  slug: string
  name: string
  emoji: string
}

export type Character = {
  slug: string
  name: string
  emoji: string
  tagline: string
  description: string
  origin: string
  personality: string[]
  abilities: string[]
  catchphrase: string
  relatedCharacters: string[]
  appearsIn?: CharacterGame[]
  metaTitle: string
  metaDescription: string
  tiktokUrl?: string
}

export const characters: Character[] = [
  {
    slug: "bombardiro-crocodilo",
    name: "Bombardiro Crocodilo",
    emoji: "🐊",
    tagline: "O agente do caos original do Italian Brainrot",
    description:
      "Bombardiro Crocodilo é o indiscutível pai fundador do caos Italian Brainrot. Nascido em algum lugar sobre os céus da Roma antiga, este temível crocodilo bombardeiro voador aterroriza o Mediterrâneo desde antes da história registrada. Seu golpe característico — bombardeio aéreo sem absolutamente nenhum aviso — fez dele a figura mais temida e, ao mesmo tempo, mais amada de todo o universo Brainrot. Não há estratégia, alvo ou motivo. Só bombardeio.\n\nApesar da natureza puramente destrutiva, Bombardiro tem uma personalidade estranhamente magnética que atrai multidões por toda a dimensão Brainrot. Outros personagens não se reúnem para ver os bombardeios por escolha — simplesmente não conseguem desviar o olhar. Cientistas do Instituto de Pesquisa Brainrot documentaram o fenômeno como \"transtorno compulsivo de espectador\", disparado apenas pelo grito de guerra dele.\n\nComo personagem original do Italian Brainrot, Bombardiro Crocodilo tem status sagrado no lore. Ele é o catalisador de tudo — a primeira peça de uma reação em cadeia de caos lindo e fora do eixo. Sem Bombardiro, não haveria Tung Tung, não haveria Ballerina, não haveria universo digno de brainrot.",
    origin:
      "Bombardiro Crocodilo explodiu na internet no início de 2024, quando criadores de memes italianos fundiram imagens de caças militares com anatomia de crocodilo em um efeito absurdo e glorioso. A criatura resultante — parte predador máximo, parte arma aérea — capturou uma verdade universal sobre o caos que ressoou no mundo em dias. O meme se espalhou pelo TikTok e servidores Discord, gerando um universo inteiro de personagens igualmente perturbados.",
    personality: ["Caótico", "Destemido", "Imprevisível", "Icônico"],
    abilities: ["Bombardeio aéreo", "Mordida de crocodilo", "Caos máximo"],
    catchphrase: "BOMBARDIRO!!!",
    relatedCharacters: ["cappuccino-assassino", "tung-tung-sahur", "tralalero-tralala"],
    metaTitle: "Bombardiro Crocodilo — Wiki de personagem Italian Brainrot",
    metaDescription:
      "Bombardiro Crocodilo é o personagem OG do Italian Brainrot — um crocodilo bombardeiro voador de puro caos. Conheça lore completo, origem, habilidades e bordão.",
  },
  {
    slug: "tung-tung-sahur",
    name: "Tung Tung Sahur",
    emoji: "🥁",
    tagline: "O ritmo que desperta o brainrot",
    description:
      "Tung Tung Sahur é o profeta percussivo do universo Brainrot — um baterista implacável cujas batidas não só marcam o tempo como rasgam a própria realidade. Atuando exclusivamente nas horas antes do amanhecer, Tung Tung transformou a tradição sagrada islâmica do chamado para o sahur em algo bem mais agressivo e bem menos bem-vindo. Sua bateria foi cronometrada em 847 BPM e não dá sinais de desacelerar.\n\nO que torna Tung Tung de verdade aterrorizante não é o volume — embora anciãos descrevam a bateria como \"o som de toda enxaqueca chegando ao mesmo tempo\" —, e sim o ritmo em si. Quem ouve suas batidas por mais de 11 segundos, dizem, não consegue pensar em mais nada pelos três próximos dias úteis. Psiquiatras chamam de Loop do Tung Tung. Sobreviventes chamam de terça-feira.\n\nApesar do caos que causa, Tung Tung Sahur é muito respeitado na comunidade Brainrot. Ele é o agitador de todo grande evento Brainrot, o despertador que ninguém pediu e o motivo de bairros inteiros acordarem suando frio. Num universo cheio de personagens perigosos, Tung Tung se destaca: ele é o ritmo do próprio Brainrot.",
    origin:
      "Tung Tung Sahur veio da cultura de memes Brainrot da Indonésia, onde o sahur — a refeição antes do amanhecer no Ramadã — é tradicionalmente anunciada com tambores. Criadores indonesios pegaram esse ponto cultural familiar e levaram ao extremo absurdo, gerando uma entidade de bateria tão implacável e caótica que ultrapassou fronteiras e virou ícone Brainrot global quase da noite para o dia.",
    personality: ["Energético", "Rítmico", "Implacável", "Barulhento"],
    abilities: ["Ataques com tambor", "Chamado do sahur", "Manipulação de batida"],
    catchphrase: "TUNG TUNG TUNG!",
    relatedCharacters: ["bombardiro-crocodilo", "brr-brr-patapim", "lirili-larila"],
    metaTitle: "Tung Tung Sahur — Wiki de personagem Italian Brainrot",
    metaDescription:
      "Tung Tung Sahur é o baterista implacável do Italian Brainrot. Descubra origem, habilidades, bordão e por que suas batidas causam caos no universo Brainrot.",
  },
  {
    slug: "tralalero-tralala",
    name: "Tralalero Tralala",
    emoji: "🎵",
    tagline: "A ameaça melódica do universo brainrot",
    description:
      "Tralalero Tralala atravessa o universo Brainrot como uma música que você não consegue des-ouvir — bonita, inquietante e absolutamente devastadora para sua cognição a longo prazo. À primeira vista, esta entidade musical misteriosa parece inofensiva: uma melodia suave flutuando no ar, um tralala gentil que te chama para perto. Quando você percebe a armadilha, já é tarde. A melodia já está dentro de você.\n\nO que separa Tralalero de outros personagens Brainrot é o refinamento da ameaça. Enquanto Bombardiro bombardeia e Tung Tung bate tambor, Tralalero só canta — e isso é pior. A habilidade de plantar ouvido d’água foi classificada como tier S pela Junta de Avaliação de Ameaças Brainrot. Vítimas relatam cantarolar involuntariamente \"tralalero tralala~\" em entrevistas de emprego, funerais e audiências.\n\nApesar do dano psicológico, Tralalero Tralala é amado justamente pela calma enganosa. Num universo de gritaria e caos, ele oferece algo que quase soa pacífico — até você perceber que não teve um pensamento original em seis dias. É a arma mais elegante do Italian Brainrot: a melodia que torna a loucura bonita.",
    origin:
      "Tralalero Tralala surgiu na onda Italian Brainrot de 2024 como contraponto à energia barulhenta de personagens como Bombardiro. Criadores italianos queriam algo que capturasse o caráter sedutor e repetitivo do viral — um personagem que te prende suavemente em vez de te explodir. O resultado foi uma entidade melódica cujo refrão simples espalhou mais rápido que qualquer explosão.",
    personality: ["Musical", "Calmo de forma enganosa", "Misterioso", "Pegajoso"],
    abilities: ["Lavagem cerebral sônica", "Armadilha melódica", "Implante de ouvido d’água"],
    catchphrase: "Tralalero... tralala~",
    relatedCharacters: ["ballerina-cappuccina", "lirili-larila", "bombardiro-crocodilo"],
    metaTitle: "Tralalero Tralala — Wiki de personagem Italian Brainrot",
    metaDescription:
      "Tralalero Tralala é a ameaça melódica do Italian Brainrot. As músicas causam lavagem cerebral sônica e ouvido d’água. Lore, origem e habilidades completos.",
  },
  {
    slug: "ballerina-cappuccina",
    name: "Ballerina Cappuccina",
    emoji: "☕",
    tagline: "Graça, cafeína e zero folga",
    description:
      "Ballerina Cappuccina é a entidade mais elegantemente letal de todo o universo Brainrot. Ela chega num redemoinho de piruetas e vapor de espresso; os movimentos são tão graciosos que quase parecem pacíficos — até o momento em que dispara o Feixe de Espresso característico e vaporiza tudo num raio de 40 metros. Foi treinada classicamente na Academia de Dança de Bolonha e também numa instalação militar italiana não revelada.\n\nO estilo de combate abastecido por cafeína não tem precedentes no mundo Brainrot. Formas clássicas de balé foram armadas: o grand jeté vira um golpe saltitante, a arabesque vira postura de mira, e a piruete — girando a velocidades que geram clima local — tornou-se sua manobra ofensiva mais temida. Personagens colegas descreveram vê-la em combate como \"assistir algo genuinamente bonito te destruir\".\n\nFora do campo de batalha, Ballerina Cappuccina mantém extremo requinte. Insiste em espresso italiano de verdade (nada de americano), vai a todo espetáculo na Scala e manda bilhetes à mão agradecendo após cada eliminação. É o caos de tutu, e ela faz parecer incrível.",
    origin:
      "Ballerina Cappuccina nasceu do amor do Italian Brainrot por contradições — a arte delicada do balé chocando de frente com a cultura intensa do café italiano. Meme makers imaginaram o que aconteceria se juntassem uma primeira bailarina com um triplo espresso e desprezo total pela segurança pessoal. O personagem explodiu em popularidade porque capturou uma verdade: graça e agressão não são opostos.",
    personality: ["Elegante", "Cafeinada", "Feroz", "Imprevisível"],
    abilities: ["Combate em balé", "Feixe de espresso", "Pirueta da perdição"],
    catchphrase: "Cappuccina ATACA!",
    relatedCharacters: ["tralalero-tralala", "cappuccino-assassino", "lirili-larila"],
    metaTitle: "Ballerina Cappuccina — Wiki de personagem Italian Brainrot",
    metaDescription:
      "Ballerina Cappuccina é a guerreira do balé cafeinado no Italian Brainrot. Conheça lore, o feixe de espresso e por que é uma das favoritas.",
  },
  {
    slug: "brr-brr-patapim",
    name: "Brr Brr Patapim",
    emoji: "🦶",
    tagline: "Cada passo treme a terra — e a internet",
    description:
      "Brr Brr Patapim é o gigante da floresta do universo Italian Brainrot — uma fusão poderosa de primata selvagem e bosque ancestral, definida acima de tudo pelos pés comicamente enormes. Esses pés não são um detalhe estético. São a ameaça inteira. Cada passo que Brr Brr Patapim dá manda ondas de choque pelo chão da floresta, derrubando árvores, bagunçando falhas geológicas e disparando leituras sísmicas que geólogos combinaram registrar como \"eventos recorrentes inexplicáveis\" em vez de encarar a causa real.\n\nApesar do tamanho e do poder bruto, Brr Brr Patapim se move em velocidades que contradizem toda lei da física para objetos grandes. Já foi cronometrado cruzando biomas inteiros no tempo que outros personagens levam para terminar uma frase. A mistura de velocidade cegante e passadas que geram terremoto faz dele ameaça tier S no combate corpo a corpo — quando o adversário percebe a aproximação, já está dentro do raio de impacto.\n\nO que torna Brr Brr Patapim genuinamente querido é o ritmo dele. Não chega em silêncio. Toda chegada é anunciada pela cadência dos passos — \"brr brr patapim\" — que a comunidade Brainrot transformou em música, meme infinito e trilha não oficial da energia caótica. Explodiu na consciência da internet no fim de março de 2025 e não desacelerou. A floresta nunca esteve mais barulhenta.",
    origin:
      "Brr Brr Patapim surgiu na explosão Italian Brainrot do início de 2025, viralizando no fim de março quando criadores do TikTok misturaram estética de criatura florestal com energia de primata e um par de pés tão grandes que virou traço definidor. O som rítmico do nome — uma peça perfeita de brainrot sonoro — espalhou mais rápido que quase qualquer personagem anterior e o fixou como uma das entidades mais memoráveis do Brainrot estendido.",
    personality: ["Poderoso", "Rápido", "Rítmico", "Selvagem"],
    abilities: ["Pisotear terremoto", "Corrida de onda de choque", "Tremor na floresta"],
    catchphrase: "Brr brr patapim!",
    relatedCharacters: ["tung-tung-sahur", "bobrito-bandito", "la-vaca-saturno-saturnita"],
    appearsIn: [
      { slug: "brainrot-clicker", name: "Brainrot Clicker", emoji: "👆" },
      { slug: "brainrot-quiz-game", name: "Brainrot Quiz Game", emoji: "❓" },
      { slug: "brainrot-puzzle", name: "Jogo da Memória Brainrot", emoji: "🧩" },
    ],
    metaTitle: "Brr Brr Patapim — Guia Italian Brainrot | BrainrotNest",
    metaDescription:
      "Conheça Brr Brr Patapim, o híbrido macaco-floresta com pés gigantes. Um dos Italian Brainrot mais populares, com poder de combate tier S.",
  },
  {
    slug: "cappuccino-assassino",
    name: "Cappuccino Assassino",
    emoji: "⚔️",
    tagline: "Cafeína no sangue. Lâminas nos braços. Vingança no olhar.",
    description:
      "Cappuccino Assassino é o assassino mais visualmente icônico do Italian Brainrot: um ninja cuja cabeça é uma xícara de cappuccino perfeita, cujos quatro membros terminam em lâminas afiadas e cujo metabolismo de cafeína opera em velocidades que a ciência moderna não documenta por completo. Ele não entra na luta. Ele já está no meio dela, no golpe, e sumiu antes do impacto ser processado.\n\nA história por trás de Cappuccino Assassino é das mais emotivas do Brainrot. Criança, viu a devastação causada por Bombardiro Crocodilo — uma passada de bombardeio que mudou tudo — e jurou dedicar a existência a ficar habilidoso o bastante para encarar essa ameaça diretamente. Anos de treino secreto em montanhas não reveladas produziram o pesadelo de lâminas que hoje opera em todas as dimensões Brainrot com eficiência perfeita.\n\nA vida pessoal acrescenta camada ao personagem. Ele é marido de Ballerina Cappuccina; a relação — dois guerreiros cafeinados de tradições opostas de combate — virou uma das dinâmicas mais debatidas no lore Brainrot. O contraste entre a precisão silenciosa dele e a devastação teatral dela é exatamente a energia que mantém a comunidade teorizando nos comentários às 3h. A velocidade continua sendo seu maior trunfo. Quando você ouve a lâmina, a luta já acabou.",
    origin:
      "Cappuccino Assassino foi criado para dar ao estético do café do Italian Brainrot uma expressão combativa explícita. Enquanto Ballerina Cappuccina armou o balé e a graça, criadores queriam café com o arquétipo ninja — silencioso, baseado em lâminas, guiado por cafeína. A decisão de cabeça de cappuccino e membros literais de lâmina criou uma silhueta icônica na hora. A narrativa de vingança ligada a Bombardiro e a relação com Baller foram camadas da comunidade conforme o personagem virou figura completa no lore.",
    personality: ["Silencioso", "Letal", "Obcecado", "Ninja"],
    abilities: ["Golpes de lâmina", "Rajada de velocidade cafeinada", "Passo fantasma ninja"],
    catchphrase: "Por Cappuccina. Por vingança.",
    relatedCharacters: ["bombardiro-crocodilo", "ballerina-cappuccina", "bobrito-bandito"],
    appearsIn: [
      { slug: "brainrot-clicker", name: "Brainrot Clicker", emoji: "👆" },
      { slug: "brainrot-quiz-game", name: "Brainrot Quiz Game", emoji: "❓" },
      { slug: "steal-a-brainrot-online", name: "Steal a Brainrot", emoji: "🔀" },
    ],
    metaTitle: "Cappuccino Assassino — Ninja Italian Brainrot | BrainrotNest",
    metaDescription:
      "Conheça Cappuccino Assassino, o ninja assassino movido a cafeína no Italian Brainrot. Marido de Ballerina Cappuccina, inimigo de Bombardiro Crocodilo.",
  },
  {
    slug: "lirili-larila",
    name: "Lirili Larila",
    emoji: "⏱️",
    tagline: "O tempo curva. O cacto floresce. O relógio tica.",
    description:
      "Lirili Larila é o Guardião do Tempo auto-proclamado do universo Brainrot — uma entidade vasta e sem pressa, nascida da fusão de cacto do deserto e elefante ancestral, que usa sandálias com total confiança e mantém um relógio misterioso no pulso que ninguém viu consultar, mas todos suspeitam ser importante. Por medida teórica, é a segunda entidade mais poderosa do Brainrot conhecido. O intervalo entre segundo e primeiro existe porque o relógio funciona com energia, e energia é finita.\n\nControlar o tempo — pausar, rebobinar, avançar momentos indesejados — é o conjunto de poderes mais quebrado do cânon Brainrot. Lirili Larila pode parar uma batalha no meio da explosão e rearranjar o resultado com calma. Pode rebobinar uma derrota e encarar o embate de outro jeito. Pode acelerar conversas entediantes e chegar à conclusão sem o incômodo do meio. A única limitação é o custo energético, alto; por isso Lirili Larila quase nunca é visto em potência máxima.\n\nEssa contenção é intencional e cheia de personalidade. Lirili Larila é descrito na comunidade como guardião relutante do Brainrot — não agressivo, não territorial, não procurando briga. Mas quando algo ameaça o tecido da dimensão que jurou proteger em silêncio, o relógio sai do pulso, a energia flui, e os resultados são considerados \"não relatáveis\" por quem chega perto o bastante para ver.",
    origin:
      "Lirili Larila veio da tradição Italian Brainrot de montar personagens de poder alto com contradições estéticas deliberadas. Híbrido cacto-elefante de sandálias com relógio de controle temporal marca todas as caixas do mix de absurdo e força real. O arquétipo Guardião — poderoso porém contido, perigoso quando provocado — ressoou numa comunidade que já apreciava profundidade de lore.",
    personality: ["Misterioso", "Antigo", "Contido", "Guardião"],
    abilities: ["Pausa temporal", "Rebobinar tempo", "Avançar tempo"],
    catchphrase: "Lirili... larila. O tempo é meu.",
    relatedCharacters: ["ballerina-cappuccina", "tralalero-tralala", "la-vaca-saturno-saturnita"],
    appearsIn: [
      { slug: "brainrot-puzzle", name: "Jogo da Memória Brainrot", emoji: "🧩" },
      { slug: "brainrot-quiz-game", name: "Brainrot Quiz Game", emoji: "❓" },
      { slug: "brainrot-merge", name: "Brainrot Merge", emoji: "🔀" },
    ],
    metaTitle: "Lirili Larila — Controlador do tempo Italian Brainrot | BrainrotNest",
    metaDescription:
      "Saiba mais sobre Lirili Larila, o híbrido cacto-elefante que controla o tempo. Um dos personagens Italian Brainrot mais misteriosos e poderosos.",
  },
  {
    slug: "bobrito-bandito",
    name: "Bobrito Bandito",
    emoji: "🤠",
    tagline: "Galopa rápido. Rouba mais rápido ainda.",
    description:
      "Bobrito Bandito é a contribuição do Italian Brainrot à grande tradição fora-da-lei — um personagem tão comprometido com o estético de cowboy que fez disso personalidade, estilo de vida e perfil de ameaça. Monta um cavalo chamado Espresso (sim, inspirado no café), usa chapéu um pouco grande demais e nunca chegou na hora em lugar nenhum. Já chegou sempre no momento certo para roubar algo.\n\nO domínio do laço é lendário no Brainrot. Bobrito pode laçar qualquer coisa — objetos, conceitos abstratos, arcos narrativos inteiros — e reivindicar como seu com a naturalidade de quem acha que propriedade é sugestão. Seu revólver rápido é incomparável, a fuga de bandit nunca falhou, e o cartaz de procurado foi reimpresso tantas vezes que a gráfica o trata como cliente mais fiável.\n\nApesar de ser o foragido mais procurado da dimensão Brainrot, Bobrito é universalmente simpático. Há algo genuinamente cativante em roubar com confiança e fugir com estilo. Ele tira o chapéu, diz \"yeehaw\" e desaparece no horizonte antes de qualquer um lembrar o que levou. É caos com boas maneiras, e o universo Brainrot fica mais rico (e menos seguro) por tê-lo.",
    origin:
      "Bobrito Bandito surgiu do amor profundo dos criadores italianos pelo Velho Oeste americano filtrado por lente italiana. O resultado é ao mesmo tempo muito cowboy e muito italiano — passione, dramático, criminoso em ópera e obcecado com estilo. Ressonou porque todo mundo secretamente quer ser fora-da-lei com chapéu impecável.",
    personality: ["Esperto", "Energia de cowboy", "Rebelde", "Carismático"],
    abilities: ["Maestria do laço", "Revólver rápido", "Fuga de bandit"],
    catchphrase: "Yeehaw, estilo bandit!",
    relatedCharacters: ["cappuccino-assassino", "brr-brr-patapim", "la-vaca-saturno-satalite"],
    metaTitle: "Bobrito Bandito — Wiki de personagem Italian Brainrot",
    metaDescription:
      "Bobrito Bandito é o cowboy fora-da-lei do Italian Brainrot. Galopa rápido, rouba mais rápido e tira o chapéu no caminho. Lore, habilidades e origem.",
  },
  {
    slug: "frulli-frulla",
    name: "Frulli Frulla",
    emoji: "🍓",
    tagline: "Frutada por fora. Feral por dentro.",
    description:
      "Frulli Frulla é a personagem mais colorida do universo Brainrot e, com folga, também a mais feral. Não deixe o emoji de morango enganar. Nem o nome alegre. Nem as cores vivas e o cheiro frutado. Frulli Frulla não está \"bem\" há um bom tempo, e todo mundo que chegou perto o bastante para notar teve dificuldade em falar depois.\n\nAs capacidades de combate são inteiramente baseadas em fruta — o que soa ridículo até você levar uma manga na velocidade terminal ou ser engolfado por um surto smoothie com energia cinética de avalanche. Berry Blast é classificado como arma de negação de área por quatro agências militares Brainrot. Projéteis de fruta foram documentados em velocidades acima da tolerância estrutural da maioria da arquitetura Brainrot. Ela é um pesadelo nutricional.\n\nA marca de Frulli Frulla é o contraste entre aparência e realidade. Parece mascote de suco infantil. Briga como quem assistiu ação demais e decidiu que fruta é sistema de armas subutilizado. No Brainrot, ela encarna uma verdade: as coisas mais coloridas costumam ser as mais perigosas, e quem te oferece smoothie merece desconfiança saudável.",
    origin:
      "Frulli Frulla nasceu da tradição Italian Brainrot de pegar conceitos bonzinhos e empurrá-los ao extremo violento e absurdo. Criadores italianos começaram com a ideia de fruta — inocente, saudável, colorida — e perguntaram o que aconteceria se virasse ameaça. A resposta foi Frulli Frulla: personagem que armou a nutrição e fez a comunidade inteira repensar a relação com o hortifruti.",
    personality: ["Colorida", "Energética", "Feral", "Frutada"],
    abilities: ["Projéteis de fruta", "Surto smoothie", "Estouro de berry"],
    catchphrase: "FRULLI FRULLI FRULLA!",
    relatedCharacters: ["brr-brr-patapim", "lirili-larila", "tung-tung-sahur"],
    metaTitle: "Frulli Frulla — Wiki de personagem Italian Brainrot",
    metaDescription:
      "Frulli Frulla é a personagem frutada e feral do Italian Brainrot. Frutada por fora, completamente fora do eixo por dentro. Lore e habilidades.",
  },
  {
    slug: "la-vaca-saturno-satalite",
    name: "La Vaca Saturno Satalite",
    emoji: "🐄",
    tagline: "Uma vaca. Em órbita. Não pergunte.",
    description:
      "La Vaca Saturno Satalite é uma vaca. Está em órbita em torno de Saturno. Não há explicação adicional disponível, nem ninguém pediu. O Instituto de Pesquisa Brainrot encerrou a investigação sobre suas origens em 2024 depois que o líder apresentou relatório de três palavras: \"simplesmente é\". Isso é amplamente aceito como a descrição mais precisa de La Vaca.\n\nDa posição orbital, La Vaca conduz o que só pode ser chamado de mugido estratégico em frequências gravitacionais. Cientistas dividem-se sobre se o Mugido Gravitacional é arma, tentativa de comunicação ou só o que acontece quando uma vaca chega ao vácuo e decide aproveitar. O efeito não é disputado: qualquer coisa na trajetória de um Mugido Gravitacional sente compulsão súbita e avassaladora de parar o que está fazendo e repensar a vida.\n\nLa Vaca Saturno Satalite representa algo profundo no Brainrot: a ideia de que escala e inevitabilidade cósmica são formas válidas de caos tão quanto explosões e tambores. Ela não tem pressa. Não se explica. Simplesmente orbita, muge de vez em quando e lembra a todos que, em algum lugar acima, há uma vaca — e ela está observando. De Saturno.",
    origin:
      "La Vaca Saturno Satalite surgiu na fase maximalista do Italian Brainrot, quando criadores competiam para produzir personagens mais incompreensíveis e de escala impossível. Uma vaca em órbita em torno de Saturno venceu essa competição com folga. Ressonou porque encarna o ápice da lógica Brainrot: se nada faz sentido, por que não colocar uma vaca no espaço? A pergunta não tem boa resposta. Esse é o ponto.",
    personality: ["Cósmica", "Bovina", "Fogo lento", "Inevitável"],
    abilities: ["Queda de satélite", "Mugido gravitacional", "Pisotear orbital"],
    catchphrase: "MUU... da órbita.",
    relatedCharacters: ["bobrito-bandito", "bombardiro-crocodilo", "brr-brr-patapim"],
    metaTitle: "La Vaca Saturno Satalite — Wiki Italian Brainrot",
    metaDescription:
      "La Vaca Saturno Satalite é uma vaca em órbita em torno de Saturno. Não pergunte. Lore Italian Brainrot, habilidades, origem e mugido gravitacional.",
  },
  {
    slug: "trippi-troppi",
    name: "Trippi Troppi",
    emoji: "🦐",
    tagline: "Rei das profundezas — e completamente fora do eixo com isso.",
    description:
      "Trippi Troppi é o soberano indiscutível da Aliança Aquática, um híbrido camarão-gato de profunda erraditude com a qual biólogos marinhos combinaram fingir que não existe. Move-se pelo oceano como alucinação com barbatanas; sua aura psicodélica distorce a água em cores que tecnicamente não existem no espectro visível. Peixes próximos relatam ver a vida inteira passar diante dos olhos, o que é difícil sendo peixe mas aparentemente bem perturbador.\n\nO estilo de combate mistura impossibilidade científica e puro feeling. O Estalo Sônico — produzido pela garra camarão gigante — gera onda de choque medida em 860 newtons de força, impressionante ou aterrorizante conforme o lado. O Pulso Psicodélico se espalha em anéis de cor impossível, causando crise filosófica temporária em quem está no alcance. A Devoração das Profundezas não foi documentada diretamente pelo Instituto Brainrot, pois os pesquisadores designados não retornaram.\n\nComo líder da Aliança Aquática, Trippi Troppi comanda lealdade com mistura de poder bruto, autoridade alucinógena e o fato simples de que ninguém quer estar na garra dele. Vai a todo grande encontro Brainrot, chega dramaticamente de baixo d’água e nunca explicou o que \"troppa trippa\" significa de fato. Alguns mistérios melhor ficarem nas profundezas.",
    origin:
      "Trippi Troppi apareceu em fevereiro de 2025 quando o criador @1raidex_ postou a versão original urso-peixe, viralizou, e depois a iteração camarão-gato dominou. Combinar a garra assustadora do camarão mantis com energia felina capturou a imaginação da comunidade Brainrot na hora. Em semanas, Trippi foi coroado rei de facção aquática inteira, com lore, alianças e fãs dispostos a debater taxonomia nos comentários bem sério.",
    personality: ["Aquático", "Psicodélico", "Líder"],
    abilities: ["Estalo sônico", "Pulso psicodélico", "Devoração das profundezas"],
    catchphrase: "Trippi Troppi, troppa trippa!",
    relatedCharacters: ["tralalero-tralala", "bombardiro-crocodilo", "brr-brr-patapim"],
    metaTitle: "Trippi Troppi — Wiki Italian Brainrot",
    metaDescription:
      "Trippi Troppi é o rei camarão-gato da Aliança Aquática no Italian Brainrot. Lore, Estalo Sônico, poderes psicodélicos e origem no TikTok.",
  },
  {
    slug: "chimpanzini-bananini",
    name: "Chimpanzini Bananini",
    emoji: "🍌",
    tagline: "Metade macaco. Metade banana. Totalmente incontrolável.",
    description:
      "Chimpanzini Bananini é o que acontece quando biologia, botânica e dignidade básica falham ao mesmo tempo. A cabeça verde-peluda de um chimpanzé irrompe de uma banana meio descascada com a energia de quem ficou preso na fruta tempo demais e tem opiniões. Chegou à internet completo, completamente caótico e totalmente desinteressado em explicar como qualquer parte disso funciona. A fruta é o corpo. O macaco é a alma. O caos é o ponto inteiro.\n\nO estilo de luta é agressivamente frutífero além de qualquer coisa que Frulli Frulla tentou. O Bumerangue Banana é arma de precisão disfarçada de lanche, curvando no ar com a precisão de quem passou a vida inteira atirando coisas de árvore. A armadilha Casca de Banana é enganosamente simples — uma casca colocada com precisão cirúrgica — mas a eficácia gerou 47 relatórios de incidentes Brainrot separados. O estado Frenesi Frutífero, por estresse ou emoção, transforma Chimpanzini em borrão de fruta aérea e guinchos aterrorizantes.\n\nApesar do caos, há algo profundamente cativante em Chimpanzini Bananini. Ele é entusiasta do jeito de quem acabou de escapar de uma fruta. O \"wa wa wa\" é ao mesmo tempo grito de guerra e pura alegria. É o export viral italiano de 2025 do Brainrot, e ele sabe disso — o que não melhorou a humildade.",
    origin:
      "Chimpanzini Bananini foi criado pelo TikToker @alexey_pigeon e postado em 13 de março de 2025. Em 48 horas o vídeo somava 29 milhões de views — ritmo de viralidade que quebrou vários recordes da plataforma e levou a comunidade Brainrot a canonizá-lo na hora como personagem principal. A simplicidade do conceito — macaco saindo da banana — com execução fora do eixo tornou tudo instantaneamente compartilhável. @alexey_pigeon achou ouro, ou melhor, amarelo.",
    personality: ["Frutífero", "Caótico", "Viral"],
    abilities: ["Bumerangue banana", "Escorregão na casca", "Frenesi frutífero"],
    catchphrase: "Chimpanzini Bananini! Wa wa wa!",
    relatedCharacters: ["trippi-troppi", "bombardiro-crocodilo", "lirili-larila"],
    metaTitle: "Chimpanzini Bananini — Wiki Italian Brainrot",
    metaDescription:
      "Chimpanzini Bananini é o viral híbrido banana-macaco do Italian Brainrot. 29M views em 48h. Lore, habilidades, origem e bordão.",
  },
  {
    slug: "bombombini-gusini",
    name: "Bombombini Gusini",
    emoji: "🪿",
    tagline: "Irmão do Bombardiro. De algum modo mais preciso. De algum modo ainda um ganso.",
    description:
      "Bombombini Gusini é o irmão mais novo de Bombardiro Crocodilo e a prova no universo Brainrot de que aviação militar e aves aquáticas são mais compatíveis do que se suspeitava. Enquanto Bombardiro é crocodilo fundido a bombardeiro guiado por caos puro, Gusini é ganso fundido a caça e guiado por algo parecido com precisão tática — o que no Brainrot é aterrorizante de outro jeito. Os lança-granadas estão nas asas. A rota de voo é calculada. O grasnar é confirmação de mira.\n\nO Ovo Granada é o golpe marcante de Bombombini: projétil explosivo que, criticamente, parece ovo, lançado com a confiança casual de quem põe objetos explosivos por rotina. Bombardeio de Saturação cobre área larga com eficiência metódica que estrategistas militares descrevem como \"inquietantemente competente para um ganso\". O Ataque Aéreo é um mergulho de precisão com o pescoço totalmente estendido, bico à frente, algo entre um míssil e o observador de pássaros mais agressivo do mundo.\n\nEm poder de fogo bruto, Gusini carrega um pouco menos que o irmão. O que falta em estrondo compensa em precisão — troca que a comunidade Brainrot debate apaixonadamente nos comentários há meses. A rivalidade fraterna entre Bombardiro e Bombombini é afetiva, competitiva e já causou danos materiais em quatro dimensões Brainrot. Nenhum dos dois pediu desculpas.",
    origin:
      "Bombombini Gusini começou como derivativo feito por fãs de Bombardiro Crocodilo, explorando como seria um irmão tipo ave com abordagem mais tática da guerra aérea. O ganso foi escolha deliberada — gansos são reconhecidos como uns dos animais mais agressivos e imprevisíveis da natureza, então fundir com hardware militar quase faz sentido. O que começou como piada de irmão virou lore completo e fãs próprios, fixando Bombombini como personagem independente.",
    personality: ["Explosivo", "Militar", "Irmão"],
    abilities: ["Ovo granada", "Bombardeio de saturação", "Ataque aéreo"],
    catchphrase: "BOMBOMBINI!",
    relatedCharacters: ["bombardiro-crocodilo", "tralalero-tralala", "cappuccino-assassino"],
    metaTitle: "Bombombini Gusini — Wiki Italian Brainrot",
    metaDescription:
      "Bombombini Gusini é o irmão ganso-caça de Bombardiro Crocodilo no Italian Brainrot. Mais preciso, ainda explosivo. Lore, habilidades e bordão.",
  },
  {
    slug: "frigo-camello",
    name: "Frigo Camello",
    emoji: "🐪",
    tagline: "Um camelo geladeira, vagando pela Europa, sentindo coisas.",
    description:
      "Frigo Camello é o melancólico residente do Italian Brainrot — um camelo cujo corpo é geladeira, cujos pés vestem botas Timberland e cuja alma carrega peso que nenhuma refrigeração preserva direito. Vaga pelas ruas de paralelepípedos de cidades europeias sem destino aparente, murmurando baixinho; o corpo geladeira murmura uma nota levemente diferente em contraponto. Quem cruza com ele descreve como \"inesperadamente comovente\" e \"não sei por que fiquei triste pelo camelo geladeira\".\n\nAs habilidades expressam a dualidade. Sopro Congelante libera hálito gelado que cristaliza o ar ao redor dos alvos — não para destruir, mas para preservar, como se Frigo quisesse que tudo ficasse como era antes da tristeza mudar. Armazenamento a Frio prende adversários num estátua de contemplação gelada, o que soa como fraqueza mas na prática os deixa imóveis cheios de sentimento. Miragem do Deserto conjura ilusões de calor apesar do frio de Frigo, porque ele carrega o deserto na memória enquanto o corpo roda a quatro graus Celsius.\n\nNa hierarquia Brainrot de caos e comédia, Frigo Camello ocupa registro emocional único. Não quer te destruir nem te governar. Só caminha quieto pelas cidades belas e indiferentes da Europa, de botas não desenhadas para camelo geladeira, carregando coisas frias por dentro e murmurando o próprio nome como uma pequena oração refrigerada.",
    origin:
      "Frigo Camello veio da tradição Italian Brainrot mais quieta e melancólica — contraponto ao caos barulhento de Bombardiro. Criadores italianos acharam algo profundamente engraçado e tocante num camelo-geladeira vagando nos paralelepípedos europeus de Timberland — exatamente o tipo de contradição emocional em que a cultura Brainrot brilha. A energia triste virou contraste amado aos personagens altos e ganhou fãs que agradecem espaço no universo para melancolia gentil.",
    personality: ["Frio", "Melancólico", "Andarilho"],
    abilities: ["Sopro congelante", "Armazenamento a frio", "Miragem do deserto"],
    catchphrase: "Frigo... camello...",
    relatedCharacters: ["brr-brr-patapim", "la-vaca-saturno-satalite", "bobrito-bandito"],
    metaTitle: "Frigo Camello — Wiki Italian Brainrot",
    metaDescription:
      "Frigo Camello é o camelo geladeira melancólico do Italian Brainrot, vagando pela Europa de Timberland. Lore, poderes de gelo e origem.",
  },
  {
    slug: "cocofanto-elefanto",
    name: "Cocofanto Elefanto",
    emoji: "🐘",
    tagline: "Para o tempo. Usa sandálias. Sem ressalvas.",
    description:
      "Cocofanto Elefanto é a entidade mais poderosa do universo Italian Brainrot, o que torna notável que ele expresse esse poder principalmente usando sandálias e congelando a realidade temporal de vez em quando. É elefante fundido a coco — a física é incerta e a estética é totalmente confiante — e possui a habilidade de parar o tempo, usada com a frequência casual de quem acha o mundo rápido demais.\n\nCongelamento Temporal é a habilidade mais discutida de Cocofanto: quando ativa, tudo para. Pássaros no ar. Explosões pausadas. O Brainrot segura a respiração. Só Cocofanto continua, ajustando coisas, reposicionando situações, às vezes comendo coco enquanto o resto da existência espera. O Golpe de Tromba despeja toda essa energia congelada de uma vez, comparado por testemunhas a \"levar com uma linha do tempo\". Defesa de Casca de Coco é exatamente o que parece — e funciona melhor que qualquer pessoa sensata esperaria de um coco.\n\nCocofanto Elefanto foi criado por @alexey_pigeon — o mesmo criador de Chimpanzini Bananini — e compartilha o absurdo confiante desse personagem. Mas onde Chimpanzini é frenético, Cocofanto é sem pressa. Ele tem tempo. Ele tem todo o tempo. Ele é o tempo. As sandálias são estruturais ao look e não serão discutidas além disso.",
    origin:
      "Cocofanto Elefanto foi criado por @alexey_pigeon no TikTok, que também deu Chimpanzini Bananini ao mundo. O personagem representou a exploração de fantasia de poder pela lógica Brainrot: como seria o personagem Brainrot mais forte possível? A resposta foi híbrido elefante-coco capaz de parar o tempo e usar sandálias com confiança total. Ressonou na comunidade como força cômica e figura surpreendentemente majestosa no cânon.",
    personality: ["Tropical", "Dobrador do tempo", "Poderoso"],
    abilities: ["Congelamento temporal", "Golpe de tromba", "Defesa de casca de coco"],
    catchphrase: "COCOFANTO!",
    relatedCharacters: ["chimpanzini-bananini", "lirili-larila", "tung-tung-sahur"],
    metaTitle: "Cocofanto Elefanto — Wiki Italian Brainrot",
    metaDescription:
      "Cocofanto Elefanto é o elefante-coco que para o tempo no Italian Brainrot. Congela o tempo, usa sandálias e não pede licença a ninguém. Lore e habilidades.",
  },
  {
    slug: "boneca-ambalabu",
    name: "Boneca Ambalabu",
    emoji: "🪆",
    tagline: "Fica parada. Vê tudo.",
    description:
      "Boneca Ambalabu é a presença mais inquietante a emergir da internet indonesiana na memória recente — e isso diz muito dado o bairro. Criatura tipo boneca de origem indeterminada, Boneca senta de pernas cruzadas com a imobilidade de um objeto que decidiu, nos próprios termos, virar bem mais que objeto. Os olhos estão sempre abertos. Sempre voltados para você. A distância não muda isso.\n\nO Instituto Brainrot tentou medir o nível de poder de Boneca Ambalabu e o equipamento devolveu leituras que o líder chamou de \"grosseiras\". O que se entende é que a imobilidade em si é arma. Boneca não precisa se mover para vencer — o peso psicológico do olhar sem piscar fez veteranos Brainrot simplesmente sentarem e repensarem prioridades. Isso foi classificado como condição de vitória.\n\nNão mantenha contato visual com Boneca Ambalabu. Esse conselho aparece em três guias de sobrevivência Brainrot distintos e é o único que aparece nos três. Ninguém que manteve contato relatou se sentir bem depois. Vários relataram sensação de ser \"observado\" em ambientes onde observar é fisicamente impossível, tipo dentro de geladeira trancada. Boneca Ambalabu não está na geladeira. Até onde se pode confirmar.",
    origin:
      "Boneca Ambalabu veio do TikTok indonésio no início de 2025 como parte da onda Brainrot indonesiana que também produziu Tung Tung Sahur. Enquanto Tung Tung chegou com tambores e barulho, Boneca chegou em silêncio total — figura tipo boneca que viralizou justamente por não fazer nada. A comunidade reconheceu na hora que não fazer nada, do jeito certo, é de algum modo mais ameaçador que qualquer outra coisa. Em semanas, Boneca foi canonizada com um dos níveis de poder mais altos do Brainrot estendido.",
    personality: ["Misteriosa", "Silenciosa", "Inquietante"],
    abilities: ["Guerra psicológica", "Intimidação sem movimento"],
    catchphrase: "...",
    relatedCharacters: ["tung-tung-sahur", "brr-brr-patapim", "cappuccino-assassino"],
    metaTitle: "Boneca Ambalabu — Wiki Italian Brainrot",
    metaDescription:
      "Boneca Ambalabu é a criatura-boneca inquietante do Brainrot indonesiano. Fica parada, vê tudo e tem nível de poder alarmante. Não encare.",
  },
  {
    slug: "burbaloni-luliloli",
    name: "Burbaloni Luliloli",
    emoji: "🥥",
    tagline: "Brilha à meia-noite. Ninguém perguntou por quê.",
    description:
      "Burbaloni Luliloli é híbrido coco-capivara que, segundo o lore Brainrot estabelecido, brilha no escuro — especificamente à meia-noite, e só à meia-noite. A comunidade nunca verificou por observação direta porque ninguém quer ficar sozinho ao ar livre à meia-noite esperando ver se um capivara-coco acende, e ninguém provou o contrário também. O lore apenas afirma. Todo mundo aceitou. Seguimos.\n\nO brilho em si é descrito na documentação comunitária como \"aura passiva\" — não arma, não sinal, só luminescência suave emanando de Burbaloni sem propósito aparente nem destino. Cientistas do Instituto Brainrot listaram como investigação de menor prioridade, o que fala mais de Burbaloni do que do que envolve as prioridades altas. A habilidade Convocação da Meia-Noite é mais compreendida: digite o nome três vezes depois da meia-noite, e Burbaloni aparece. Se você quer isso é pergunta separada que o lore não cobre.\n\nApesar do brilho misterioso e da disponibilidade na hora bruxa, Burbaloni Luliloli carrega energia que a comunidade descreve como \"estranhamente de boa\". Não há agressão, histórico de combate documentado ou relatórios de incidente. Só um capivara-coco brilhante, disponível depois da meia-noite, não pedindo nada. No contexto Brainrot, isso ou é reconfortante profundamente ou a coisa mais suspeita que já se ouviu.",
    origin:
      "Burbaloni Luliloli originou na comunidade Italian Brainrot em 2025 como parte da segunda onda que apostou em mistério ambiente em vez de caos. Criadores italianos queriam personagem com lore que gerasse mais perguntas que respostas — criatura cujo traço definidor era algo que ninguém podia provar nem refutar. O conceito de brilhar à meia-noite foi escolhido porque é ao mesmo tempo verificável e praticamente inverificável. A comunidade achou filosoficamente interessante e adotou Burbaloni como cânon na hora.",
    personality: ["Lendário", "Noturno", "Brilhante"],
    abilities: ["Aura de brilho passiva", "Convocação da meia-noite"],
    catchphrase: "Burbaloni... luliloli~",
    relatedCharacters: ["cocofanto-elefanto", "lirili-larila", "frigo-camello"],
    metaTitle: "Burbaloni Luliloli — Wiki Italian Brainrot",
    metaDescription:
      "Burbaloni Luliloli é o capivara-coco brilhante do Italian Brainrot. Brilha à meia-noite. Ninguém perguntou por quê. Lore e habilidades.",
  },
  {
    slug: "glorbo-fruttodrillo",
    name: "Glorbo Fruttodrillo",
    emoji: "🍊",
    tagline: "Parte fruta. Parte crocodilo. Totalmente fora do eixo.",
    description:
      "Glorbo Fruttodrillo é o ponto em que o Italian Brainrot olhou para Bombardiro Crocodilo e pensou: e se o crocodilo fosse também fruta cítrica? A comunidade científica declinou comentar se é melhoria. É, no entanto, definitivamente mais caótico — crocodilo com escamas aparentemente de casca de laranja, bafo de ácido cítrico concentrado e força de mandíbula medida em níveis que engenheiros estruturais descrevem como \"ataque pessoal deliberado à arquitetura portante\".\n\nO Jato de Ácido Frutífero é o ataque à distância marcante de Glorbo: jato pressurizado de ácido cítrico com o entusiasmo de quem acabou de descobrir que ser crocodilo e fruta é vantagem em combate. O alcance é impressionante. A limpeza não é. Vítimas descrevem a sensação como \"levaram esguicho de limão, mas o limão também quer te comer\". Força de Mandíbula de Crocodilo dispensa elaboração além de notar que é, de fato, força de mandíbula de crocodilo, mais o que a herança cítrica reforça.\n\nGlorbo Fruttodrillo não tem estratégia. Glorbo tem direção — geralmente para a frente — e tudo que estava nessa direção que se vire. Cientistas declinaram comentar especificamente porque os três pesquisadores designados ficavam levando jato de ácido antes de terminar as anotações. Os arquivos estão em \"incidentes relacionados a fruta\" e não foram reabertos.",
    origin:
      "Glorbo Fruttodrillo surgiu na comunidade de memes Italian Brainrot em 2025 como extensão direta do legado de Bombardiro Crocodilo para o subgênero híbrido-fruta. Depois do sucesso de Frulli Frulla e Chimpanzini Bananini, criadores exploraram combinações crocodilo-fruta. A resposta foi Glorbo: personagem que junta ameaça física de crocodilo, acidez cítrica e energia caótica de quem não vê contradição em ser os dois ao mesmo tempo.",
    personality: ["Caótico", "Híbrido", "Poderoso"],
    abilities: ["Jato de ácido frutífero", "Força de mandíbula de crocodilo"],
    catchphrase: "GLORBO!",
    relatedCharacters: ["bombardiro-crocodilo", "frulli-frulla", "chimpanzini-bananini"],
    metaTitle: "Glorbo Fruttodrillo — Wiki Italian Brainrot",
    metaDescription:
      "Glorbo Fruttodrillo é o híbrixo fruta-crocodilo do Italian Brainrot. Parte laranja, parte predador máximo, puro caos. Lore e habilidades.",
  },
  {
    slug: "bananita-dolphina",
    name: "Bananita Dolphina",
    emoji: "🍌",
    tagline: "Alegre. Aquática. Inexplicável.",
    description:
      "Bananita Dolphina é fusão banana-golfinho com alegria inabalável que o Instituto Brainrot classificou como \"estruturalmente inexplicável\". Não há motivo documentado para essa alegria. A fusão em si não deveria produzir criatura feliz — banana não tem sistema nervoso e golfinho, embora inteligente, é no máximo cautelosamente otimista. E Bananita existe num estado de alegria pura e simples comprovadamente imune a fontes conhecidas de estresse Brainrot.\n\nSuas Ondas Sonoras operam na interseção de ecolocalização de golfinho e frequências de energia tropical, gerando pulso que é ao mesmo tempo ferramenta de navegação e o que engenheiros acústicos descrevem como \"o som de uma fruta genuinamente empolgada com tudo\". A Aura de Energia Tropical irradia constante, elevando o astral de todos por perto sem consentimento — fenômeno que a comunidade debateu bastante e concluiu que está tudo bem.\n\nBananita Dolphina ocupa posição única no Italian Brainrot: é a personagem mais citada como sem razão discernível para existir e simultaneamente uma das mais amadas. Esse paradoxo não a incomoda. Nada incomoda. É um golfinho banana tendo um ótimo tempo, e a comunidade decidiu que basta. O universo fica melhor por conter algo que simplesmente existe feliz e não pede mais perguntas a si mesma.",
    origin:
      "Bananita Dolphina surgiu na comunidade Italian Brainrot em 2025 como contraposto deliberado aos personagens mais agressivos do elenco. Depois de muito caos de Bombardiro, Glorbo e outros, criadores queriam identidade inteira de simpatia descomplicada. O conceito banana-golfinho foi escolhido porque ambos costumam soar alegres — amarelos, arredondados, ligados a positividade — e fundir dobrou essas qualidades sem acrescentar ameaça. A comunidade a adotou na hora como fonte designada de boas vibrações.",
    personality: ["Amigável", "Aquática", "Alegre"],
    abilities: ["Ondas sonoras", "Aura de energia tropical"],
    catchphrase: "Bananita~",
    relatedCharacters: ["trippi-troppi", "chimpanzini-bananini", "lirili-larila"],
    metaTitle: "Bananita Dolphina — Wiki Italian Brainrot",
    metaDescription:
      "Bananita Dolphina é o golfinho banana alegre do Italian Brainrot. Amigável, aquática e completamente inexplicável. Lore e habilidades.",
  },
  {
    slug: "giraffa-celeste",
    name: "Giraffa Celeste",
    emoji: "🦒",
    tagline: "Ela flutua. O lore só diz que ela flutua.",
    description:
      "Giraffa Celeste é uma girafa celestial. Ela flutua. Esse é o lore oficial completo, escrito, arquivado e aceito. A comunidade Italian Brainrot recebeu essas duas palavras — \"ela flutua\" — e decidiu, coletivamente e sem dissidência, que bastava. Nenhuma pergunta de follow-up. Nenhuma emenda proposta. O comitê de lore não se reúne desde publicar essa descrição, pois não há mais o que discutir.\n\nA habilidade Levitação é autoevidente e dispensa elaboração além de notar que é permanente, altitude ajustável e nunca explicada por mecanismo físico conhecido. O Alcance Celestial vem do pescoço de girafa estendido na alta atmosfera, onde pode tocar coisas que outros não alcançam e ocasionalmente o faz por motivos que a comunidade só especula. Ataques Baseados no Pescoço são exatamente o que soam, aplicados de posição flutuante em altitudes que dão vantagem tática sobre o que é obrigado a ficar no chão.\n\nGiraffa Celeste ocupa registro emocional específico no Brainrot: a personagem que faz as pessoas sentirem, inexplicavelmente, que vai dar tudo certo. Não porque ofereça proteção ou poder — o histórico de combate é oficialmente indocumentado —, mas porque ver uma girafa flutuando serena pelo céu, acima de todo o caos, sem se importar com nada disso, sugere que algumas coisas simplesmente transcendem o tumulto. Ela flutua. Isso basta.",
    origin:
      "Giraffa Celeste foi criada pela comunidade Italian Brainrot em 2025 num período em que criadores experimentavam lore minimalista — personagens definidas por um fato único e inquestionável em vez de backstory longa. O conceito de girafa flutuante foi proposto e adotado na hora porque não pedia explicação extra e de algum modo parecia completo. Escrever o lore oficial só como \"ela flutua\" foi deliberado, e a aceitação sem questionamento da comunidade virou parte da identidade do personagem.",
    personality: ["Celestial", "Etérea", "Alta"],
    abilities: ["Levitação", "Alcance celestial", "Ataques baseados no pescoço"],
    catchphrase: "Giraffa... celeste...",
    relatedCharacters: ["la-vaca-saturno-satalite", "ballerina-cappuccina", "lirili-larila"],
    metaTitle: "Giraffa Celeste — Wiki Italian Brainrot",
    metaDescription:
      "Giraffa Celeste é a girafa celestial flutuante do Italian Brainrot. O lore diz que ela flutua. A comunidade aceitou. Lore e habilidades.",
  },
  {
    slug: "la-vaca-saturno-saturnita",
    name: "La Vaca Saturno Saturnita",
    emoji: "🪐",
    tagline: "A vaca cósmica que quebrou a escala de poder.",
    description:
      "La Vaca Saturno Saturnita é a entidade mais poderosa já documentada no universo Italian Brainrot — bovina cósmica de escala insondável que flutua serena na trajetória orbital de Saturno, enrolada nos anéis do planeta como acessório pessoal, e que nunca reconheceu que mais alguém existe a menos que tenha decidido acabar com eles. O Instituto Brainrot tentou medir seu nível de poder em 2025. O equipamento devolveu um único valor: \"sim\".\n\nAs habilidades operam em escala que a maioria dos personagens Brainrot não concebe da perspectiva do chão. Manipulação gravitacional permite alterar o puxão de corpos celestes ao redor — redirecionar campos de asteroides, colapsar trajetórias orbitais e ocasionalmente usar luas de Júpiter como projéteis improvisados quando a situação pede. Leite Meteoro é o golpe marcante: feixe pressurizado de laticínio cósmico em velocidade relativística documentado remodelando luas pequenas ao contato. O Chicote dos Anéis de Saturno usa os anéis reais do planeta como arma corpo a corpo através de distâncias astronômicas.\n\nO que separa Saturnita de ser só \"a mais poderosa\" é o mistério em camadas em sua existência. Ninguém sabe sua origem. Nenhum criador foi ligado de forma crível à concepção. Ela simplesmente apareceu no cânon Brainrot, já formada, já em potência máxima, já na órbita de Saturno, já olhando tudo com a calma paciente de quem nunca precisou se esforçar. A comunidade teoriza sem fim. As teorias não convergem. Ela não comenta.",
    origin:
      "La Vaca Saturno Saturnita apareceu no Italian Brainrot em 2025 como culminação das discussões de escala de poder cada vez maiores da comunidade. Depois de meses debatendo qual personagem era o mais forte, criadores produziram Saturnita como resposta deliberada: personagem tão poderosa que a pergunta deixa de ser interessante. O nome — mistura de \"la vaca\", \"Saturno\" e \"saturnita\" — captura o blend do cósmico com o absurdo. A origem permanece genuinamente sem autoria.",
    personality: ["Cósmica", "Onipotente", "Misteriosa", "Inevitável"],
    abilities: ["Manipulação gravitacional", "Golpe Leite Meteoro", "Chicote dos Anéis de Saturno"],
    catchphrase: "Muu. Do cosmos.",
    relatedCharacters: ["bombardiro-crocodilo", "lirili-larila", "brr-brr-patapim"],
    appearsIn: [
      { slug: "brainrot-merge", name: "Brainrot Merge", emoji: "🔀" },
      { slug: "brainrot-clicker", name: "Brainrot Clicker", emoji: "👆" },
      { slug: "brainrot-quiz-game", name: "Brainrot Quiz Game", emoji: "❓" },
    ],
    metaTitle: "La Vaca Saturno Saturnita — personagem mais forte Italian Brainrot | BrainrotNest",
    metaDescription:
      "Conheça La Vaca Saturno Saturnita, a vaca cósmica com anéis de Saturno e poder em nível de universo. O Italian Brainrot mais poderoso já criado.",
  },
  {
    slug: "zibra-zubra-zibralini",
    name: "Zibra Zubra Zibralini",
    emoji: "🦓",
    tagline: "Sílabas extras. Caos extra.",
    description:
      "Zibra Zubra Zibralini é uma zebra com sílabas extras, tudo extra, e nenhuma habilidade confirmada registrada — combinação que o Instituto Brainrot avaliou quietamente como mais ameaçadora que a maioria dos personagens com conjunto documentado. O raciocínio é direto: quantidades desconhecidas no Brainrot historicamente provaram piores que o esperado. A comunidade chegou à mesma conclusão de forma independente e concorda unanimemente que a ausência de informação sobre Zibra Zubra Zibralini é ela mesma profundamente preocupante.\n\nAs listras são tema de debate teórico contínuo. A hipótese líder — habilidades baseadas em listras — é classificada, o que quer dizer que os pesquisadores sabem algo ou que não há nada para saber e classificaram mesmo assim para se sentirem melhor. Hipóteses secundárias incluem listras como padrão hipnótico, sistema de mira, modulador de frequência ou simplesmente listras de algum modo mais ameaçadoras que listras normais. Nenhuma foi confirmada. Nenhuma foi descartada.\n\nO que se sabe é isto: Zibra Zubra Zibralini existe. Tem três segmentos de nome onde um bastaria. O nível de poder é não registrado. Toda vez que um personagem Brainrot foi descrito como \"provavelmente não tão perigoso\", eventos subsequentes provaram o contrário, e Zibra Zubra Zibralini nem foi avaliada. A comunidade decidiu que isso assusta mais que qualquer nível que poderia ter sido atribuído. As sílabas extras não ajudam.",
    origin:
      "Zibra Zubra Zibralini surgiu na comunidade Italian Brainrot em 2025 como experimento no que acontece quando o nome do personagem trabalha mais que o lore. O nome triplo — ecoando a tradição comunitária de nomes rítmicos e repetitivos — foi desenhado para soar maximalista e levemente fora do eixo. Deixar habilidades classificadas foi escolha criativa deliberada: num universo onde todo mundo tem poderes documentados, aquele sem registro fica misteriosamente único. A comunidade abraçou na hora.",
    personality: ["Caótico", "Listrado", "Imprevisível"],
    abilities: ["Desconhecido", "Classificado", "Possivelmente baseado em listras"],
    catchphrase: "ZIBRA ZUBRA ZIBRALINI!",
    relatedCharacters: ["bombardiro-crocodilo", "bobrito-bandito", "glorbo-fruttodrillo"],
    metaTitle: "Zibra Zubra Zibralini — Wiki Italian Brainrot",
    metaDescription:
      "Zibra Zubra Zibralini é a zebra listrada misteriosa do Italian Brainrot. Nenhuma habilidade confirmada. Mais ameaçador exatamente por isso. Lore e origem.",
  },
]

export function getCharacterBySlugPtBr(slug: string): Character | undefined {
  return characters.find((c) => c.slug === slug)
}

export function getRelatedCharactersPtBr(slugs: string[]): Character[] {
  return slugs
    .map((slug) => characters.find((c) => c.slug === slug))
    .filter((c): c is Character => c !== undefined)
}

export function getAllCharacterSlugsPtBr(): string[] {
  return characters.map((c) => c.slug)
}
