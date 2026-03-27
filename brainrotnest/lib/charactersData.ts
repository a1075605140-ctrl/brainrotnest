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
    tagline: "The OG chaos agent of Italian Brainrot",
    description:
      "Bombardiro Crocodilo is the undisputed founding father of Italian Brainrot chaos. Born somewhere over the skies of ancient Rome, this fearsome flying crocodile bomber has been terrorizing the Mediterranean since before recorded history. His signature move — aerial bombardment with absolutely zero warning — has made him the most feared and simultaneously beloved figure in the entire Brainrot universe. There is no strategy, no target, no reason. Just bombardment.\n\nDespite his purely destructive nature, Bombardiro possesses an oddly magnetic personality that draws crowds from across the Brainrot dimension. Other characters don't gather to watch his bombings out of choice — they simply cannot look away. Scientists in the Brainrot Research Institute have documented this phenomenon as \"compulsory spectating disorder,\" triggered solely by the sound of his war cry.\n\nAs the original Italian Brainrot character, Bombardiro Crocodilo holds sacred status in the lore. He is the catalyst who started it all — the first domino in a chain reaction of beautiful, unhinged chaos. Without Bombardiro, there would be no Tung Tung, no Ballerina, no universe worth brainfrotting over.",
    origin:
      "Bombardiro Crocodilo erupted onto the internet in early 2024 when Italian meme creators fused imagery of military fighter jets with crocodile anatomy to absurd, glorious effect. The resulting creature — part apex predator, part aerial weapon — captured a universal truth about chaos that resonated globally within days. The meme spread across TikTok and Discord servers worldwide, spawning an entire extended universe of equally deranged characters in its wake.",
    personality: ["Chaotic", "Fearless", "Unpredictable", "Iconic"],
    abilities: ["Aerial bombardment", "Crocodile grip", "Maximum chaos"],
    catchphrase: "BOMBARDIRO!!!",
    relatedCharacters: ["cappuccino-assassino", "tung-tung-sahur", "tralalero-tralala"],
    metaTitle: "Bombardiro Crocodilo — Italian Brainrot Character Wiki",
    metaDescription:
      "Bombardiro Crocodilo is the OG Italian Brainrot character — a flying crocodile bomber of pure chaos. Learn his full lore, origin, abilities, and catchphrase.",
  },
  {
    slug: "tung-tung-sahur",
    name: "Tung Tung Sahur",
    emoji: "🥁",
    tagline: "The rhythm that awakens the brainrot",
    description:
      "Tung Tung Sahur is the percussive prophet of the Brainrot universe — a relentless drummer whose beats don't just keep time, they tear reality itself a new one. Operating exclusively at pre-dawn hours, Tung Tung has turned the sacred Islamic tradition of sahur wake-up calls into something far more aggressive and far less welcome. His drumming has been clocked at 847 BPM and shows no signs of slowing down.\n\nWhat makes Tung Tung truly terrifying is not the volume — though village elders describe his drumming as \"the sound of every migraine arriving simultaneously\" — but the rhythm itself. Those who hear his beats for more than 11 seconds reportedly find themselves unable to think about anything else for the next three business days. Psychiatrists call it the Tung Tung Loop. Survivors just call it Tuesday.\n\nDespite the chaos he causes, Tung Tung Sahur is deeply respected within the Brainrot community. He is the hype man for every major Brainrot event, the alarm clock nobody asked for, and the reason entire neighborhoods wake up in cold sweats. In a universe full of dangerous characters, Tung Tung stands apart: he is the rhythm of Brainrot itself.",
    origin:
      "Tung Tung Sahur originated from Indonesian Brainrot meme culture, where sahur — the pre-dawn meal eaten during Ramadan — is traditionally announced with drums. Indonesian internet creators took this familiar cultural touchstone and cranked it to pure absurdist extremes, creating a drumming entity so relentless and chaotic that it transcended cultural borders and became a global Brainrot icon almost overnight.",
    personality: ["Energetic", "Rhythmic", "Relentless", "Loud"],
    abilities: ["Drum-based attacks", "Sahur awakening call", "Beat manipulation"],
    catchphrase: "TUNG TUNG TUNG!",
    relatedCharacters: ["bombardiro-crocodilo", "brr-brr-patapim", "lirili-larila"],
    metaTitle: "Tung Tung Sahur — Italian Brainrot Character Wiki",
    metaDescription:
      "Tung Tung Sahur is the relentless drummer of Italian Brainrot. Discover his origin, abilities, catchphrase, and why his beats cause chaos across the Brainrot universe.",
  },
  {
    slug: "tralalero-tralala",
    name: "Tralalero Tralala",
    emoji: "🎵",
    tagline: "The melodic menace of the brainrot universe",
    description:
      "Tralalero Tralala moves through the Brainrot universe like a song that you cannot un-hear — beautiful, haunting, and absolutely devastating to your long-term cognitive function. At first glance, this mysterious musical entity appears harmless: a gentle melody floating through the air, a soft tralala that beckons you closer. By the time you realize the trap, it's already too late. The melody is inside you now.\n\nWhat separates Tralalero from other Brainrot characters is the sophisticated nature of the threat. Where Bombardiro bombs and Tung Tung drums, Tralalero simply sings — and that's somehow worse. His ear-worm deployment capability has been rated S-tier by the Brainrot Threat Assessment Board. Victims report involuntarily humming \"tralalero tralala~\" during job interviews, funerals, and court proceedings.\n\nDespite the psychological damage he causes, Tralalero Tralala is beloved precisely because of his deceptive calm. In a universe of screaming chaos, he offers something that sounds almost peaceful — right up until you realize you haven't thought a single original thought in six days. He is Italian Brainrot's most elegant weapon: the melody that makes the madness beautiful.",
    origin:
      "Tralalero Tralala emerged from the Italian Brainrot wave of 2024 as a counterpoint to the loud, bombastic energy of characters like Bombardiro. Italian meme creators wanted something that captured the seductive, repetitive nature of viral content — a character that hooks you softly rather than blasting you into submission. The result was a melodic entity whose simple, catchy tune spread faster than any explosion ever could.",
    personality: ["Musical", "Deceptively calm", "Mysterious", "Catchy"],
    abilities: ["Sonic brainwashing", "Melody trap", "Ear-worm deployment"],
    catchphrase: "Tralalero... tralala~",
    relatedCharacters: ["ballerina-cappuccina", "lirili-larila", "bombardiro-crocodilo"],
    metaTitle: "Tralalero Tralala — Italian Brainrot Character Wiki",
    metaDescription:
      "Tralalero Tralala is the melodic menace of Italian Brainrot. His songs cause sonic brainwashing and ear-worm deployment. Full lore, origin, and abilities.",
  },
  {
    slug: "ballerina-cappuccina",
    name: "Ballerina Cappuccina",
    emoji: "☕",
    tagline: "Grace, caffeine, and zero chill",
    description:
      "Ballerina Cappuccina is the most elegantly lethal entity in the entire Brainrot universe. She arrives in a swirl of pirouettes and espresso steam, her movements so graceful they seem almost peaceful — right up until the moment she deploys her signature Espresso Beam and vaporizes everything within a 40-meter radius. She was classically trained at the Bologna Academy of Dance and also at an undisclosed Italian military facility.\n\nHer caffeine-fueled combat style is unlike anything the Brainrot world has ever seen. Standard ballet forms have been weaponized: the grand jeté becomes a leaping strike, the arabesque becomes a targeting stance, and the pirouette — spinning at speeds that create a localized weather event — has become her most feared offensive maneuver. Fellow characters have described witnessing her in combat as \"watching something genuinely beautiful destroy you.\"\n\nOff the battlefield, Ballerina Cappuccina maintains an air of extreme refinement. She insists on proper Italian espresso only (absolutely no Americano), attends every performance at La Scala, and sends handwritten thank-you notes after each elimination. She is chaos wearing a tutu, and she makes it look incredible.",
    origin:
      "Ballerina Cappuccina was born from Italian Brainrot's love of contradictions — the delicate art of ballet colliding head-on with Italy's intense coffee culture. Meme creators imagined what would happen if you combined a prima ballerina with a triple-shot espresso and gave the result a complete disregard for personal safety. The character exploded in popularity because she captured something true: grace and aggression are not opposites.",
    personality: ["Elegant", "Caffeinated", "Fierce", "Unpredictable"],
    abilities: ["Ballet combat", "Espresso beam", "Pirouette of doom"],
    catchphrase: "Cappuccina STRIKES!",
    relatedCharacters: ["tralalero-tralala", "cappuccino-assassino", "lirili-larila"],
    metaTitle: "Ballerina Cappuccina — Italian Brainrot Character Wiki",
    metaDescription:
      "Ballerina Cappuccina is the caffeinated ballet warrior of Italian Brainrot. Learn her lore, espresso beam ability, and why she's one of the most beloved Brainrot characters.",
  },
  {
    slug: "brr-brr-patapim",
    name: "Brr Brr Patapim",
    emoji: "🦶",
    tagline: "Every step shakes the earth — and the internet",
    description:
      "Brr Brr Patapim is the forest giant of the Italian Brainrot universe — a powerful fusion of wild primate and ancient woodland, defined above all else by his exaggeratedly enormous feet. Those feet are not a cosmetic quirk. They are the entire threat. Each step Brr Brr Patapim takes sends shockwaves radiating outward across the forest floor, toppling trees, disrupting fault lines, and triggering seismic readings that geologists have collectively agreed to log as \"unexplained recurring events\" rather than engage with the true cause.\n\nDespite his size and raw destructive output, Brr Brr Patapim moves at speeds that contradict every physical law governing large objects. He has been clocked crossing entire Brainrot biomes in the time it takes other characters to finish a sentence. The combination of blinding speed and earthquake-generating footfalls makes him an S-tier threat in close-quarters combat — by the time opponents register his approach, they are already inside the impact radius.\n\nWhat makes Brr Brr Patapim genuinely beloved is the rhythm of him. He doesn't arrive silently. Every approach is announced by the cadence of his steps — \"brr brr patapim\" — which the Brainrot community has set to music, memed relentlessly, and adopted as the unofficial soundtrack of chaotic energy. He erupted into internet consciousness in late March 2025 and has not slowed down since. The forest has never been louder.",
    origin:
      "Brr Brr Patapim emerged from the Italian Brainrot explosion of early 2025, going viral at the end of March when TikTok creators combined forest-creature aesthetics with primate energy and a pair of feet so oversized they became the character's defining feature. The rhythmic sound of his name — itself a perfect piece of audio brainrot — spread faster than almost any preceding character and cemented him as one of the most deeply memeable entities in the extended Brainrot universe.",
    personality: ["Powerful", "Fast", "Rhythmic", "Wild"],
    abilities: ["Earthquake stomp", "Shockwave sprint", "Forest tremor"],
    catchphrase: "Brr brr patapim!",
    relatedCharacters: ["tung-tung-sahur", "bobrito-bandito", "la-vaca-saturno-saturnita"],
    appearsIn: [
      { slug: "brainrot-clicker", name: "Brainrot Clicker", emoji: "👆" },
      { slug: "brainrot-quiz-game", name: "Brainrot Quiz Game", emoji: "❓" },
      { slug: "brainrot-puzzle", name: "Brainrot Memory Game", emoji: "🧩" },
    ],
    metaTitle: "Brr Brr Patapim — Italian Brainrot Character Guide | BrainrotNest",
    metaDescription:
      "Discover Brr Brr Patapim, the forest-monkey hybrid with giant feet. One of the most popular Italian Brainrot characters with S-tier combat power.",
  },
  {
    slug: "cappuccino-assassino",
    name: "Cappuccino Assassino",
    emoji: "⚔️",
    tagline: "Caffeine-fueled. Blade-armed. Revenge-driven.",
    description:
      "Cappuccino Assassino is the most visually iconic assassin in the Italian Brainrot universe: a ninja warrior whose head is a perfectly formed cappuccino cup, whose four limbs terminate in razor-sharp blades, and whose every movement is powered by a caffeine metabolism that operates at speeds modern science cannot fully document. He does not walk into a fight. He appears inside it, already mid-strike, and is gone before the impact registers.\n\nThe backstory driving Cappuccino Assassino is one of the most emotionally resonant in the Brainrot universe. As a child, he witnessed the devastation caused by Bombardiro Crocodilo — a bombing run that changed everything — and vowed to dedicate his existence to becoming skilled enough to face that threat directly. Years of secret training in undisclosed mountain locations produced the blade-limbed nightmare that now operates across every Brainrot dimension with perfect efficiency.\n\nHis personal life adds another layer to the character. He is the husband of Ballerina Cappuccina, and their relationship — two caffeinated warriors from opposite combat traditions — has become one of the most discussed dynamics in Brainrot lore. The contrast between his silent precision and her theatrical devastation is exactly the kind of energy that keeps the Brainrot community theorizing in comment sections at 3am. His speed remains his greatest asset. By the time you hear the blade, the fight is already over.",
    origin:
      "Cappuccino Assassino was created to give Italian Brainrot's coffee aesthetic a more overtly combative expression. While Ballerina Cappuccina weaponized ballet and grace, creators wanted a character that combined coffee with the ninja archetype — silent, blade-based, caffeine-driven. The decision to make his head a cappuccino cup and his limbs literal blades created an immediately iconic silhouette. The revenge narrative linking him to Bombardiro Crocodilo and the relationship with Ballerina Cappuccina were layered in by the community as the character grew into a full figure in the lore.",
    personality: ["Silent", "Deadly", "Driven", "Ninja"],
    abilities: ["Blade-limb strikes", "Caffeine burst speed", "Ninja shadow step"],
    catchphrase: "For Cappuccina. For vengeance.",
    relatedCharacters: ["bombardiro-crocodilo", "ballerina-cappuccina", "bobrito-bandito"],
    appearsIn: [
      { slug: "brainrot-clicker", name: "Brainrot Clicker", emoji: "👆" },
      { slug: "brainrot-quiz-game", name: "Brainrot Quiz Game", emoji: "❓" },
      { slug: "steal-a-brainrot-online", name: "Steal a Brainrot", emoji: "🔀" },
    ],
    metaTitle: "Cappuccino Assassino — Italian Brainrot Ninja Character | BrainrotNest",
    metaDescription:
      "Meet Cappuccino Assassino, the caffeine-powered ninja assassin of Italian Brainrot. Husband of Ballerina Cappuccina, enemy of Bombardiro Crocodilo.",
  },
  {
    slug: "lirili-larila",
    name: "Lirili Larila",
    emoji: "⏱️",
    tagline: "Time bends. Cactus blooms. The watch ticks.",
    description:
      "Lirili Larila is the Brainrot universe's self-appointed Guardian of Time — a vast, unhurried entity born from the fusion of desert cactus and ancient elephant, who wears sandals with total confidence and keeps a mysterious watch on their wrist that no one has ever seen them check but that everyone suspects is important. They are, by theoretical measurement, the second most powerful entity in the known Brainrot universe. The gap between second and first exists because the watch runs on energy, and energy is finite.\n\nThe ability to control time — to pause it, rewind it, fast-forward through moments that displease them — is the most broken power set in the Brainrot canon. Lirili Larila can stop a battle mid-explosion and rearrange the outcome at their leisure. They can rewind a defeat and approach the encounter differently. They can fast-forward through conversations they find tedious and arrive at conclusions without going through the inconvenience of the middle. The only limitation is the energy cost, which is significant, which means Lirili Larila is almost never seen at full output.\n\nThis restraint is intentional and characterful. Lirili Larila is described in the community as the Brainrot universe's reluctant guardian — not aggressive, not territorial, not looking for fights. But when something threatens the fabric of the dimension they have quietly sworn to protect, the watch comes off, the energy flows, and the results are considered unreportable by anyone close enough to observe them.",
    origin:
      "Lirili Larila emerged from the Italian Brainrot tradition of building high-concept power characters with deliberate aesthetic contradictions. A cactus-elephant hybrid wearing sandals and carrying a time-control watch checks every box for the universe's blend of the absurd and the genuinely formidable. The Guardian archetype — powerful but restrained, dangerous when provoked — resonated deeply with a community that had grown sophisticated in its appreciation of Brainrot lore depth.",
    personality: ["Mysterious", "Ancient", "Restrained", "Guardian"],
    abilities: ["Time pause", "Time rewind", "Time fast-forward"],
    catchphrase: "Lirili... larila. Time is mine.",
    relatedCharacters: ["ballerina-cappuccina", "tralalero-tralala", "la-vaca-saturno-saturnita"],
    appearsIn: [
      { slug: "brainrot-puzzle", name: "Brainrot Memory Game", emoji: "🧩" },
      { slug: "brainrot-quiz-game", name: "Brainrot Quiz Game", emoji: "❓" },
      { slug: "brainrot-merge", name: "Brainrot Merge", emoji: "🔀" },
    ],
    metaTitle: "Lirili Larila — Italian Brainrot Time Controller | BrainrotNest",
    metaDescription:
      "Learn about Lirili Larila, the cactus-elephant hybrid who controls time. One of Italian Brainrot's most mysterious and powerful characters.",
  },
  {
    slug: "bobrito-bandito",
    name: "Bobrito Bandito",
    emoji: "🤠",
    tagline: "Rides fast. Steals faster.",
    description:
      "Bobrito Bandito is Italian Brainrot's contribution to the grand outlaw tradition — a character so committed to the cowboy aesthetic that he has genuinely made it his entire personality, lifestyle, and threat profile. He rides a horse named Espresso (yes, named after the coffee), wears a hat slightly too large for his head, and has never in his life arrived anywhere on time. He has, however, always arrived at exactly the right moment to steal something.\n\nHis lasso mastery is legendary in the Brainrot universe. Bobrito can rope anything — physical objects, abstract concepts, entire narrative arcs — and claim them as his own with the casual ease of someone who has simply decided that ownership is a suggestion rather than a rule. His Quick Draw is second to none, his Bandito Escape has never failed him, and his wanted poster has been reprinted so many times that the printing facility considers him their most reliable client.\n\nDespite being the most-wanted outlaw in the Brainrot dimension, Bobrito is universally liked. There's something genuinely charming about someone who steals so confidently and rides away so stylishly. He tips his hat, he says \"yeehaw,\" and he disappears over the horizon before anyone can remember what he took. He is chaos with good manners, and the Brainrot universe is a richer (if less secure) place for having him.",
    origin:
      "Bobrito Bandito emerged from Italian Brainrot creators' deep and sincere love for American Western aesthetics filtered through an Italian lens. The result was a character who is simultaneously very cowboy and very Italian — passionate, dramatic, operatically criminal, and deeply concerned with personal style. The character resonated because everyone secretly wants to be an outlaw with good hat game.",
    personality: ["Cunning", "Cowboy energy", "Rebellious", "Charismatic"],
    abilities: ["Lasso mastery", "Quick draw", "Bandito escape"],
    catchphrase: "Yeehaw, bandito style!",
    relatedCharacters: ["cappuccino-assassino", "brr-brr-patapim", "la-vaca-saturno-satalite"],
    metaTitle: "Bobrito Bandito — Italian Brainrot Character Wiki",
    metaDescription:
      "Bobrito Bandito is Italian Brainrot's cowboy outlaw. He rides fast, steals faster, and tips his hat while doing it. Full lore, abilities, and origin story.",
  },
  {
    slug: "frulli-frulla",
    name: "Frulli Frulla",
    emoji: "🍓",
    tagline: "Fruity on the outside. Feral on the inside.",
    description:
      "Frulli Frulla is the most colorful character in the Brainrot universe, and by a significant margin also the most feral. Do not let the strawberry emoji fool you. Do not let the cheerful name fool you. Do not, under any circumstances, let the bright colors and fruity scent fool you. Frulli Frulla has not been \"fine\" for quite some time, and everyone who has gotten close enough to notice has had difficulty discussing it afterward.\n\nHer combat capabilities are entirely fruit-based, which sounds ridiculous until you have been hit by a mango traveling at terminal velocity or caught in a smoothie surge that carries the kinetic energy of a small avalanche. The Berry Blast is classified as an area-denial weapon by four Brainrot military agencies. Her Fruit Projectiles have been documented at speeds that exceed the structural tolerances of most Brainrot architecture. She is a nutritional nightmare.\n\nFrulli Frulla's defining quality is the energy gap between her appearance and her reality. She looks like the mascot for a children's juice brand. She fights like something that has watched too many action movies and has decided that fruit is an underutilized weapon system. In the Brainrot universe, she represents a core truth: the most colorful things are often the most dangerous, and anyone who offers you a smoothie should be regarded with appropriate suspicion.",
    origin:
      "Frulli Frulla was born from Italian Brainrot's tradition of taking wholesome concepts and pushing them to their violent, absurd extremes. Italian creators started with the idea of fruit — innocent, healthy, colorful — and asked what would happen if it became a threat. The answer was Frulli Frulla: a character who weaponized nutrition and made the entire Brainrot community question their relationship with produce.",
    personality: ["Colorful", "Energetic", "Feral", "Fruity"],
    abilities: ["Fruit projectiles", "Smoothie surge", "Berry blast"],
    catchphrase: "FRULLI FRULLI FRULLA!",
    relatedCharacters: ["brr-brr-patapim", "lirili-larila", "tung-tung-sahur"],
    metaTitle: "Frulli Frulla — Italian Brainrot Character Wiki",
    metaDescription:
      "Frulli Frulla is the feral fruity character of Italian Brainrot. Fruity on the outside, completely unhinged on the inside. Full lore, abilities, and origin.",
  },
  {
    slug: "la-vaca-saturno-satalite",
    name: "La Vaca Saturno Satalite",
    emoji: "🐄",
    tagline: "A cow. In orbit. Don't question it.",
    description:
      "La Vaca Saturno Satalite is a cow. She is in orbit around Saturn. There is no further explanation available, nor has any explanation ever been requested. The Brainrot Research Institute closed the investigation into her origins in 2024 after the lead researcher filed a three-word report: \"it just is.\" This is generally accepted as the most accurate description of La Vaca ever produced.\n\nFrom her orbital position, La Vaca conducts what can only be described as strategic mooing at gravitational frequencies. Scientists are divided on whether the Gravitational Moo is a weapon, a communication attempt, or simply what happens when a cow reaches the vacuum of space and decides to make the most of it. What is not disputed is the effect: anything in the trajectory of a Gravitational Moo experiences a sudden, overwhelming compulsion to stop what they're doing and reconsider their life choices.\n\nLa Vaca Saturno Satalite represents something profound in the Brainrot universe: the understanding that scale and cosmic inevitability are just as valid forms of chaos as explosions and drumming. She does not hurry. She does not explain herself. She simply orbits, moos occasionally, and reminds everyone that somewhere above them, there is a cow — and she is watching. From Saturn.",
    origin:
      "La Vaca Saturno Satalite emerged from the maximalist phase of Italian Brainrot, when creators began competing to produce the most incomprehensible, scale-defying characters possible. A cow in orbit around Saturn won that competition by a significant margin. The character resonated because she represented the ultimate in Brainrot logic: if nothing makes sense, why not put a cow in space? There is no good answer to this question. That's the point.",
    personality: ["Cosmic", "Bovine", "Slow burn", "Inevitable"],
    abilities: ["Satellite crash", "Gravitational moo", "Orbital stomping"],
    catchphrase: "MOO... from orbit.",
    relatedCharacters: ["bobrito-bandito", "bombardiro-crocodilo", "brr-brr-patapim"],
    metaTitle: "La Vaca Saturno Satalite — Italian Brainrot Character Wiki",
    metaDescription:
      "La Vaca Saturno Satalite is a cow in orbit around Saturn. Don't question it. Full Italian Brainrot lore, abilities, origin story, and gravitational moo explained.",
  },
  {
    slug: "trippi-troppi",
    name: "Trippi Troppi",
    emoji: "🦐",
    tagline: "King of the deep — and absolutely unhinged about it.",
    description:
      "Trippi Troppi is the undisputed sovereign of the Aquatic Alliance, a shrimp-cat hybrid of such profound wrongness that marine biologists have collectively agreed to pretend he doesn't exist. He moves through the ocean like a hallucination given fins, his psychedelic aura warping the water around him into colors that don't technically exist in the visible spectrum. Nearby fish report seeing their entire life choices flash before their eyes, which is difficult when you're a fish but apparently very upsetting.\n\nHis combat style is equal parts scientific impossibility and pure vibes. The Sonic Snap — produced by his oversized shrimp claw — generates a shockwave clocked at 860 newtons of force, which is either impressive or terrifying depending on whether you're the one snapping or the one being snapped at. The Psychedelic Pulse radiates outward in concentric rings of impossible color, causing temporary philosophical crises in anyone caught within range. The Deep Sea Devouring is not something the Brainrot Research Institute has been able to document directly, as the researchers assigned to observe it have not returned.\n\nAs leader of the Aquatic Alliance, Trippi Troppi commands loyalty through a combination of raw power, hallucinogenic authority, and the simple fact that nobody wants to be on the receiving end of that claw. He attends every major Brainrot summit, arrives dramatically from below the surface, and has never once explained what \"troppa trippa\" actually means. Some mysteries are better left in the deep.",
    origin:
      "Trippi Troppi first emerged in February 2025 when TikTok creator @1raidex_ posted the original bear-fish hybrid version, which promptly went viral before the shrimp-cat iteration took over and became the dominant form. The combination of a mantis shrimp's terrifying snapping claw with feline energy captured the Brainrot community's imagination immediately. Within weeks, Trippi had been crowned king of an entire aquatic faction, complete with lore, alliances, and a dedicated fanbase willing to debate his taxonomy in very serious comment sections.",
    personality: ["Aquatic", "Psychedelic", "Leader"],
    abilities: ["Sonic Snap", "Psychedelic Pulse", "Deep Sea Devouring"],
    catchphrase: "Trippi Troppi, troppa trippa!",
    relatedCharacters: ["tralalero-tralala", "bombardiro-crocodilo", "brr-brr-patapim"],
    metaTitle: "Trippi Troppi — Italian Brainrot Character Wiki",
    metaDescription:
      "Trippi Troppi is the shrimp-cat king of the Aquatic Alliance in Italian Brainrot. Learn his lore, Sonic Snap ability, psychedelic powers, and origin on TikTok.",
  },
  {
    slug: "chimpanzini-bananini",
    name: "Chimpanzini Bananini",
    emoji: "🍌",
    tagline: "Half monkey. Half banana. Fully uncontrollable.",
    description:
      "Chimpanzini Bananini is what happens when the laws of biology, botany, and basic dignity all fail at the same time. A chimpanzee's green-furred head erupts from a half-peeled banana with the energy of someone who has been trapped in a fruit for too long and has thoughts about it. He arrived on the internet fully formed, fully chaotic, and completely uninterested in answering any questions about how any of this works. The fruit is the body. The monkey is the soul. The chaos is the entire point.\n\nHis fighting style is aggressively fruit-based in ways that go beyond anything Frulli Frulla has ever attempted. The Banana Boomerang is a precision weapon disguised as a snack, curving through the air with the accuracy of someone who has spent their entire life throwing things from trees and has gotten very good at it. The Peel Slip trap is deceptively simple — a banana peel placed with surgical precision — but its effectiveness has been documented in 47 separate Brainrot incident reports. The Fruit Frenzy state, triggered by stress or excitement, turns Chimpanzini into a blur of airborne produce and terrifying screeches.\n\nDespite the chaos, there's something deeply endearing about Chimpanzini Bananini. He's enthusiastic in the way that only someone who has recently escaped a fruit can be. His \"wa wa wa\" is somehow both a battle cry and an expression of pure joy. He is Italian Brainrot's most viral export of 2025, and he absolutely knows it, which has done nothing to improve his humility.",
    origin:
      "Chimpanzini Bananini was created by TikTok creator @alexey_pigeon and posted on March 13, 2025. Within 48 hours the video had accumulated 29 million views — a rate of virality that broke several platform records and caused the Brainrot community to immediately canonize him as a major character. The simplicity of the concept — monkey emerging from banana — combined with the unhinged execution made it instantly, universally shareable. @alexey_pigeon had struck gold, or rather, yellow.",
    personality: ["Fruity", "Chaotic", "Viral"],
    abilities: ["Banana Boomerang", "Peel Slip", "Fruit Frenzy"],
    catchphrase: "Chimpanzini Bananini! Wa wa wa!",
    relatedCharacters: ["trippi-troppi", "bombardiro-crocodilo", "lirili-larila"],
    metaTitle: "Chimpanzini Bananini — Italian Brainrot Character Wiki",
    metaDescription:
      "Chimpanzini Bananini is the viral banana-monkey hybrid of Italian Brainrot. 29M views in 48 hours. Full lore, abilities, origin story, and catchphrase.",
  },
  {
    slug: "bombombini-gusini",
    name: "Bombombini Gusini",
    emoji: "🪿",
    tagline: "Bombardiro's brother. Somehow more precise. Somehow still a goose.",
    description:
      "Bombombini Gusini is Bombardiro Crocodilo's younger sibling and the Brainrot universe's proof that military aviation and waterfowl are more compatible than anyone suspected. Where Bombardiro is a crocodile fused with a bomber jet and guided by pure chaos, Gusini is a goose fused with a fighter jet and guided by something approaching tactical precision — which in the Brainrot universe is terrifying in a completely different way. His grenade launchers are mounted on his wings. His flight path is calculated. His honk is a targeting confirmation.\n\nThe Grenade Egg is Bombombini's signature move: an explosive projectile that looks, critically, like an egg, and is deployed with the casual confidence of something that lays explosive objects as a matter of routine. Carpet Bombing covers a wide area with methodical efficiency that military strategists have described as \"disturbingly competent for a goose.\" The Air Strike is a precision dive that Gusini executes with his neck fully extended, beak pointed forward, looking like something between a missile and the world's most aggressive bird watching enthusiast.\n\nIn terms of raw firepower, Gusini carries slightly less than his brother. What he lacks in boom, he compensates for entirely in accuracy — a trade-off that the Brainrot community has debated passionately in comment sections for months. The sibling rivalry between Bombardiro and Bombombini is loving, competitive, and has caused property damage across four Brainrot dimensions. Neither of them has ever apologized about this.",
    origin:
      "Bombombini Gusini originated as a fan-created derivative of Bombardiro Crocodilo, exploring what it would look like if Bombardiro had a bird-type sibling with a more tactical approach to aerial warfare. The goose was a deliberate choice — geese are universally acknowledged as one of nature's most aggressive and unpredictable animals, making the combination with military hardware feel almost logical. What started as a sibling joke quickly developed its own full lore and fanbase, cementing Bombombini as a fully independent character.",
    personality: ["Explosive", "Military", "Sibling"],
    abilities: ["Grenade Egg", "Carpet Bombing", "Air Strike"],
    catchphrase: "BOMBOMBINI!",
    relatedCharacters: ["bombardiro-crocodilo", "tralalero-tralala", "cappuccino-assassino"],
    metaTitle: "Bombombini Gusini — Italian Brainrot Character Wiki",
    metaDescription:
      "Bombombini Gusini is Bombardiro Crocodilo's goose-jet sibling in Italian Brainrot. More precise, still explosive. Full lore, abilities, origin, and catchphrase.",
  },
  {
    slug: "frigo-camello",
    name: "Frigo Camello",
    emoji: "🐪",
    tagline: "A refrigerator camel, wandering Europe, feeling things.",
    description:
      "Frigo Camello is Italian Brainrot's resident melancholic — a camel whose body is a refrigerator, whose feet are clad in Timberland boots, and whose soul carries a weight that no amount of cold storage can adequately preserve. He wanders the cobblestone streets of European cities without apparent destination or purpose, humming quietly to himself, his refrigerator body humming a slightly different note in counterpoint. Passersby have described encountering him as \"unexpectedly moving\" and \"I can't explain why I felt sad about the camel fridge.\"\n\nHis abilities are a perfect expression of his duality. Frost Breath delivers a freezing exhale that crystallizes the air around his targets — not to destroy, but to preserve, as if Frigo wishes everything could be kept as it is before sadness changes it. Cold Storage traps opponents in a stasis of chilled contemplation, which sounds like a weakness but in practice leaves them standing very still with a lot of feelings. Desert Mirage conjures heat-shimmer illusions despite Frigo's cold nature, because he carries the desert in his memory even as his body runs at four degrees Celsius.\n\nIn the Brainrot hierarchy of chaos and comedy, Frigo Camello occupies a unique emotional register. He is not trying to destroy you. He is not trying to rule you. He is simply walking, quietly, through the beautiful and indifferent cities of Europe, wearing boots that were not designed for a refrigerator camel, carrying cold things inside him, and occasionally murmuring his own name like a small, refrigerated prayer.",
    origin:
      "Frigo Camello emerged from Italian Brainrot's quieter, more melancholic tradition — a counterpoint to the bombastic chaos of characters like Bombardiro. Italian creators found something deeply funny and unexpectedly touching about a camel-refrigerator wandering European streets in Timberland boots, which is exactly the sort of emotional contradiction that Brainrot culture thrives on. His sad energy became a beloved contrast to the louder characters, and he developed a dedicated following among fans who appreciated that the universe had room for a little gentle melancholy.",
    personality: ["Cold", "Melancholic", "Wanderer"],
    abilities: ["Frost Breath", "Cold Storage", "Desert Mirage"],
    catchphrase: "Frigo... camello...",
    relatedCharacters: ["brr-brr-patapim", "la-vaca-saturno-satalite", "bobrito-bandito"],
    metaTitle: "Frigo Camello — Italian Brainrot Character Wiki",
    metaDescription:
      "Frigo Camello is the melancholic refrigerator camel of Italian Brainrot, wandering Europe in Timberland boots. Full lore, cold abilities, and origin story.",
  },
  {
    slug: "cocofanto-elefanto",
    name: "Cocofanto Elefanto",
    emoji: "🐘",
    tagline: "Stops time. Wears sandals. Has no notes.",
    description:
      "Cocofanto Elefanto is the most powerful entity in the Italian Brainrot universe, which makes it somewhat notable that he has chosen to express this power primarily through the wearing of sandals and the periodic freezing of all temporal reality. He is an elephant fused with a coconut — the physics of which are unclear and the aesthetics of which are entirely confident — and he possesses the ability to halt time itself, which he uses with the casual frequency of someone who simply finds the world moves at a pace they don't agree with.\n\nTime Freeze is Cocofanto's most discussed ability, and for good reason: when he activates it, everything stops. Birds halt mid-flight. Explosions pause. The Brainrot universe holds its breath. Only Cocofanto continues to move, adjusting things, repositioning situations, occasionally eating a coconut while the rest of existence waits for him to be done. The Trunk Slam brings all that frozen-time energy crashing down at once, a hit that has been compared by witnesses to \"being struck by a timeline.\" Coconut Shell Defense is exactly what it sounds like, and is more effective than any sane person would expect a coconut to be.\n\nCocofanto Elefanto was created by @alexey_pigeon — the same creator behind Chimpanzini Bananini — and shares that character's confident absurdism. But where Chimpanzini is frenetic, Cocofanto is unhurried. He has time. He has all the time. He is the time. The sandals are load-bearing to the aesthetic and they will not be discussed further.",
    origin:
      "Cocofanto Elefanto was created by TikTok's @alexey_pigeon, who also gave the world Chimpanzini Bananini. The character represented @alexey_pigeon's exploration of power fantasy through Brainrot logic: what would the strongest possible Brainrot character look like? The answer was an elephant-coconut hybrid capable of stopping time and wearing sandals with complete confidence. The character immediately resonated with the community as both a comedic powerhouse and a surprisingly majestic figure in the Brainrot canon.",
    personality: ["Tropical", "Time-bender", "Powerful"],
    abilities: ["Time Freeze", "Trunk Slam", "Coconut Shell Defense"],
    catchphrase: "COCOFANTO!",
    relatedCharacters: ["chimpanzini-bananini", "lirili-larila", "tung-tung-sahur"],
    metaTitle: "Cocofanto Elefanto — Italian Brainrot Character Wiki",
    metaDescription:
      "Cocofanto Elefanto is the time-stopping elephant-coconut of Italian Brainrot. He freezes time, wears sandals, and answers to no one. Full lore, abilities, and origin.",
  },
  {
    slug: "boneca-ambalabu",
    name: "Boneca Ambalabu",
    emoji: "🪆",
    tagline: "Sits still. Watches everything.",
    description:
      "Boneca Ambalabu is the most unsettling presence to emerge from the Indonesian internet in recent memory, which is saying something given the neighborhood. A doll-like creature of indeterminate origin, Boneca sits cross-legged with the stillness of an object that has decided, on its own terms, to become something far more than an object. Its eyes are always open. They are always facing you. Distance does not change this.\n\nThe Brainrot Research Institute attempted to measure Boneca Ambalabu's power level and the equipment returned readings that the lead researcher described as \"impolite.\" What is understood is that the stillness itself is the weapon. Boneca does not need to move to win an encounter — the psychological weight of its unblinking attention has caused veteran Brainrot fighters to simply sit down and reconsider their priorities. This has been classified as a win condition.\n\nDo not make eye contact with Boneca Ambalabu. This advice appears in three separate Brainrot survival guides and is the only piece of advice that appears in all three. Nobody who has made eye contact has reported feeling fine afterward. Several have reported feeling \"watched\" in environments where being watched is physically impossible, such as the inside of a locked refrigerator. Boneca Ambalabu is not in the refrigerator. As far as anyone can confirm.",
    origin:
      "Boneca Ambalabu emerged from Indonesian TikTok in early 2025 as part of the Indonesian Brainrot wave that also produced Tung Tung Sahur. Where Tung Tung arrived with drums and noise, Boneca arrived in total silence — a doll-like figure that became viral precisely because it did nothing. The community immediately recognized that doing nothing, in the right way, is somehow more threatening than anything else. Within weeks, Boneca had been canonized as one of the highest power levels in the extended Brainrot universe.",
    personality: ["Mysterious", "Silent", "Unsettling"],
    abilities: ["Psychological warfare", "Motionless intimidation"],
    catchphrase: "...",
    relatedCharacters: ["tung-tung-sahur", "brr-brr-patapim", "cappuccino-assassino"],
    metaTitle: "Boneca Ambalabu — Italian Brainrot Character Wiki",
    metaDescription:
      "Boneca Ambalabu is the unsettling doll-creature of Indonesian Brainrot. Sits still, watches everything, and has an alarmingly high power level. Do not make eye contact.",
  },
  {
    slug: "burbaloni-luliloli",
    name: "Burbaloni Luliloli",
    emoji: "🥥",
    tagline: "Glows at midnight. Nobody asked why.",
    description:
      "Burbaloni Luliloli is a coconut-capybara hybrid that, according to established Brainrot lore, glows in the dark — specifically at midnight, and specifically only at midnight. The community has never verified this through direct observation because nobody wants to be outdoors alone at midnight waiting to see if a coconut capybara lights up, and yet nobody has proven it false either. The lore simply states it. Everyone has accepted this. Moving on.\n\nThe glow itself is described in community documentation as a \"passive aura\" — not a weapon, not a signal, just a gentle luminescence that emanates from Burbaloni without apparent purpose or destination. Scientists in the Brainrot Research Institute have listed it as their lowest-priority investigation, which says less about Burbaloni and more about what the higher-priority investigations involve. The Midnight Summoning ability is better understood: call the name three times after midnight, and Burbaloni will appear. Whether you want this is a separate question the lore does not address.\n\nDespite the mysterious glow and the witching-hour availability, Burbaloni Luliloli carries an energy that the community describes as \"oddly chill.\" There is no aggression, no documented combat history, no incident reports. Just a glowing coconut capybara, available after midnight, asking nothing of you. In the context of the Brainrot universe, this is either deeply reassuring or the most suspicious thing anyone has ever heard.",
    origin:
      "Burbaloni Luliloli originated in the Italian Brainrot community in 2025 as part of the second wave of characters that leaned into ambient mystery rather than chaos. Italian creators wanted a character with lore that raised more questions than it answered — a creature whose defining feature was something nobody could prove or disprove. The glowing at midnight concept was chosen specifically because it is both verifiable and practically unverifiable. The community found this philosophically interesting and immediately adopted Burbaloni as canon.",
    personality: ["Legendary", "Nocturnal", "Glowing"],
    abilities: ["Passive glow aura", "Midnight summoning"],
    catchphrase: "Burbaloni... luliloli~",
    relatedCharacters: ["cocofanto-elefanto", "lirili-larila", "frigo-camello"],
    metaTitle: "Burbaloni Luliloli — Italian Brainrot Character Wiki",
    metaDescription:
      "Burbaloni Luliloli is the glowing coconut-capybara of Italian Brainrot. Glows at midnight. Nobody asked why. Full lore, abilities, and origin story.",
  },
  {
    slug: "glorbo-fruttodrillo",
    name: "Glorbo Fruttodrillo",
    emoji: "🍊",
    tagline: "Part fruit. Part crocodile. Fully unhinged.",
    description:
      "Glorbo Fruttodrillo is the point at which Italian Brainrot looked at Bombardiro Crocodilo and thought: what if the crocodile were also a citrus fruit? The scientific community has declined to comment on whether this is an improvement. It is, however, definitively more chaotic — a crocodile whose scales are apparently made of orange peel, whose breath is concentrated citric acid, and whose jaw strength has been measured at levels that structural engineers describe as \"a deliberate personal attack on load-bearing architecture.\"\n\nThe Fruit Acid Spray is Glorbo's signature ranged attack: a pressurized jet of citric acid delivered with the enthusiasm of someone who has just discovered that being both a crocodile and a fruit is actually quite advantageous in combat. The range is impressive. The cleanup is not. Victims describe the sensation as \"getting squirted by a lemon, but the lemon is also trying to eat you.\" The Crocodile Jaw Strength needs no elaboration beyond noting that it is, in fact, crocodile jaw strength, plus whatever structural reinforcement the citrus heritage provides.\n\nGlorbo Fruttodrillo doesn't have a strategy. Glorbo has a direction — usually forward — and everything that was in that direction has to figure out the rest on its own. Scientists declined to comment on Glorbo specifically because the three researchers assigned to the study kept getting sprayed with acid before they could complete their notes. The files are archived under \"fruit-related incidents\" and have not been reopened.",
    origin:
      "Glorbo Fruttodrillo emerged from the Italian Brainrot meme community in 2025 as a direct extension of Bombardiro Crocodilo's legacy into the fruit-hybrid subgenre. After the success of Frulli Frulla and Chimpanzini Bananini, creators began exploring what crocodile-fruit combinations might look like. The answer was Glorbo: a character that combined the physical menace of a crocodile with the acidity of citrus fruit and the chaotic energy of someone who sees no contradiction in being both simultaneously.",
    personality: ["Chaotic", "Hybrid", "Powerful"],
    abilities: ["Fruit acid spray", "Crocodile jaw strength"],
    catchphrase: "GLORBO!",
    relatedCharacters: ["bombardiro-crocodilo", "frulli-frulla", "chimpanzini-bananini"],
    metaTitle: "Glorbo Fruttodrillo — Italian Brainrot Character Wiki",
    metaDescription:
      "Glorbo Fruttodrillo is the fruit-crocodile hybrid of Italian Brainrot. Part orange, part apex predator, fully chaotic. Full lore, abilities, and origin story.",
  },
  {
    slug: "bananita-dolphina",
    name: "Bananita Dolphina",
    emoji: "🍌",
    tagline: "Cheerful. Aquatic. Inexplicable.",
    description:
      "Bananita Dolphina is a banana-dolphin fusion with an unwavering cheerfulness that the Brainrot Research Institute has classified as \"structurally inexplicable.\" There is no documented reason for this cheerfulness. The fusion itself should not produce a happy creature — a banana has no nervous system and a dolphin, while intelligent, is at best cautiously optimistic. And yet Bananita exists in a state of pure, uncomplicated joy that has proven completely immune to all known sources of Brainrot distress.\n\nHer Sonar Waves operate at the intersection of dolphin echolocation and tropical energy frequencies, producing a pulse that is simultaneously a navigation tool and what acoustic engineers describe as \"the sound of a fruit being genuinely delighted about everything.\" The Tropical Energy Aura radiates outward in a constant state, brightening the mood of everyone in her vicinity without their consent — a phenomenon that the Brainrot community has debated extensively, ultimately concluding that they are fine with it.\n\nBananita Dolphina holds a unique position in the Italian Brainrot universe: she is the character most often cited as having no discernible reason to exist, and simultaneously one of the most beloved. This paradox does not bother her. Nothing bothers her. She is a banana dolphin and she is having a wonderful time, and the community has decided that this is enough. The universe is better for containing something that simply exists happily and asks no further questions of itself.",
    origin:
      "Bananita Dolphina emerged from the Italian Brainrot community in 2025 as a deliberate counterpoint to the more aggressive characters in the roster. After extensive chaos from Bombardiro, Glorbo, and others, creators wanted a character whose entire identity was uncomplicated friendliness. The banana-dolphin concept was chosen because both components are conventionally cheerful — yellow, round, associated with positivity — and fusing them produced something that doubled down on those qualities without adding anything threatening. The community adopted her immediately as the universe's designated source of good vibes.",
    personality: ["Friendly", "Aquatic", "Cheerful"],
    abilities: ["Sonar waves", "Tropical energy aura"],
    catchphrase: "Bananita~",
    relatedCharacters: ["trippi-troppi", "chimpanzini-bananini", "lirili-larila"],
    metaTitle: "Bananita Dolphina — Italian Brainrot Character Wiki",
    metaDescription:
      "Bananita Dolphina is the cheerful banana-dolphin of Italian Brainrot. Friendly, aquatic, and completely inexplicable. Full lore, abilities, and origin story.",
  },
  {
    slug: "giraffa-celeste",
    name: "Giraffa Celeste",
    emoji: "🦒",
    tagline: "She floats. The lore simply says she floats.",
    description:
      "Giraffa Celeste is a celestial giraffe. She floats. This is the complete official lore, as written, as archived, as accepted. The Italian Brainrot community received these two words — \"she floats\" — and decided, collectively and without dissent, that this was sufficient. No follow-up questions were filed. No amendments have been proposed. The lore committee has not met since publishing this description, as there is nothing further to discuss.\n\nHer Levitation ability is self-evident and requires no elaboration beyond noting that it is permanent, altitude-adjustable, and has never been explained by any known physical mechanism. The Celestial Reach derives from her giraffe neck extended into the upper atmosphere, where she can touch things that other characters cannot reach and has occasionally done so for reasons the community can only speculate about. The Neck-Based Attacks are exactly what they sound like, delivered from a floating position at altitudes that give her a significant tactical advantage over anything that is obligated to remain on the ground.\n\nGiraffa Celeste occupies a specific emotional register in the Brainrot universe: she is the character that makes people feel, inexplicably, that everything is going to be fine. Not because she offers protection or power — her combat record is officially undocumented — but because the sight of a giraffe floating serenely through the sky, above all the chaos, not bothered by any of it, suggests that some things simply transcend the mayhem. She floats. That's enough.",
    origin:
      "Giraffa Celeste was created by the Italian Brainrot community in 2025 during a period when creators were experimenting with minimalist lore — characters defined by a single, inarguable fact rather than extensive backstory. The concept of a floating giraffe was proposed and immediately adopted because it required no additional explanation and somehow felt complete. The decision to write the official lore as simply \"she floats\" was deliberate, and the community's unquestioning acceptance of this became part of the character's identity.",
    personality: ["Celestial", "Ethereal", "Tall"],
    abilities: ["Levitation", "Celestial reach", "Neck-based attacks"],
    catchphrase: "Giraffa... celeste...",
    relatedCharacters: ["la-vaca-saturno-satalite", "ballerina-cappuccina", "lirili-larila"],
    metaTitle: "Giraffa Celeste — Italian Brainrot Character Wiki",
    metaDescription:
      "Giraffa Celeste is the floating celestial giraffe of Italian Brainrot. The lore says she floats. The community accepted this. Full lore, abilities, and origin story.",
  },
  {
    slug: "la-vaca-saturno-saturnita",
    name: "La Vaca Saturno Saturnita",
    emoji: "🪐",
    tagline: "The cosmic cow who broke the power scale.",
    description:
      "La Vaca Saturno Saturnita is the most powerful entity ever documented in the Italian Brainrot universe — a cosmic bovine of unfathomable scale who floats serenely in the orbital path of Saturn, wrapped in the planet's rings as though they were a personal accessory, and who has never once acknowledged that anyone else exists unless she has decided to end them. The Brainrot Research Institute attempted to measure her power level in 2025. The equipment returned a single value: \"yes.\"\n\nHer abilities operate at a scale that most Brainrot characters cannot conceptualize from their ground-level perspective. Gravity manipulation allows her to alter the pull of celestial bodies around her — redirecting asteroid fields, collapsing orbital trajectories, and occasionally using Jupiter's moons as impromptu projectiles when the situation calls for it. The Meteor Milk is her signature strike: a pressurized beam of cosmic dairy delivered at relativistic speeds that has been documented reshaping small moons on contact. Her Saturn Ring Lash uses the planet's actual rings as a melee weapon across astronomical distances.\n\nWhat separates Saturnita from simply being \"the most powerful\" is the mystery layered into her existence. Nobody knows her origin. No creator has been credibly linked to her conception. She simply appeared in the Brainrot canon, fully formed, already at maximum power, already in Saturn's orbit, already looking down at everything else with the patient calm of something that has never had to try. The community has theorized endlessly. The theories have not converged. She does not comment.",
    origin:
      "La Vaca Saturno Saturnita appeared in the Italian Brainrot universe in 2025 as the culmination of the community's escalating power scaling discussions. After months of debates about which character was strongest, creators produced Saturnita as a deliberate answer: a character so powerful that the question stopped being interesting. Her name — a blend of 'la vaca' (the cow), 'Saturno' (Saturn), and 'saturnita' (little Saturn) — captures the character's blend of the cosmic and the absurd perfectly. Her origin remains genuinely unattributed.",
    personality: ["Cosmic", "Omnipotent", "Mysterious", "Inevitable"],
    abilities: ["Gravity manipulation", "Meteor Milk strike", "Saturn Ring Lash"],
    catchphrase: "Moo. From the cosmos.",
    relatedCharacters: ["bombardiro-crocodilo", "lirili-larila", "brr-brr-patapim"],
    appearsIn: [
      { slug: "brainrot-merge", name: "Brainrot Merge", emoji: "🔀" },
      { slug: "brainrot-clicker", name: "Brainrot Clicker", emoji: "👆" },
      { slug: "brainrot-quiz-game", name: "Brainrot Quiz Game", emoji: "❓" },
    ],
    metaTitle: "La Vaca Saturno Saturnita — Italian Brainrot's Most Powerful Character | BrainrotNest",
    metaDescription:
      "Meet La Vaca Saturno Saturnita, the cosmic cow with Saturn's rings and universe-level powers. The most powerful Italian Brainrot character ever created.",
  },
  {
    slug: "zibra-zubra-zibralini",
    name: "Zibra Zubra Zibralini",
    emoji: "🦓",
    tagline: "Extra syllables. Extra chaos.",
    description:
      "Zibra Zubra Zibralini is a zebra with extra syllables, extra everything, and no confirmed abilities on record — a combination that the Brainrot Research Institute has quietly assessed as more threatening than most characters with documented power sets. The reasoning is straightforward: unknown quantities in the Brainrot universe have historically proven far worse than expected. The community has reached the same conclusion independently and unanimously agrees that the absence of information about Zibra Zubra Zibralini is itself deeply concerning.\n\nThe stripes are the subject of ongoing theoretical debate. The leading hypothesis — Stripes-Based abilities — is classified, which either means the researchers know something or means there is nothing to know and they classified it anyway to feel better. Secondary hypotheses include the stripes functioning as a hypnotic pattern, a targeting system, a frequency modulator, or simply being stripes that are somehow more threatening than regular stripes. None of these hypotheses has been confirmed. None has been ruled out.\n\nWhat is known is this: Zibra Zubra Zibralini exists. It has three name segments where one would suffice. Its power level is unregistered. Every time a Brainrot character has been described as \"probably not that dangerous,\" subsequent events have proven that assessment wrong, and Zibra Zubra Zibralini has never even been assessed. The community has decided this is scarier than any power level that could have been assigned. The extra syllables do not help.",
    origin:
      "Zibra Zubra Zibralini emerged from the Italian Brainrot community in 2025 as an experiment in what happens when a character's name does more work than their lore. The triple-segment name — echoing the community's tradition of rhythmic, repetitive character names — was designed to feel maximalist and slightly unhinged. The decision to leave abilities classified was a deliberate creative choice: in a universe where every character has documented powers, the one with none on record becomes uniquely mysterious. The community embraced this immediately.",
    personality: ["Chaotic", "Striped", "Unpredictable"],
    abilities: ["Unknown", "Classified", "Possibly stripes-based"],
    catchphrase: "ZIBRA ZUBRA ZIBRALINI!",
    relatedCharacters: ["bombardiro-crocodilo", "bobrito-bandito", "glorbo-fruttodrillo"],
    metaTitle: "Zibra Zubra Zibralini — Italian Brainrot Character Wiki",
    metaDescription:
      "Zibra Zubra Zibralini is the mysterious striped chaos-zebra of Italian Brainrot. No confirmed abilities. Somehow more threatening for it. Full lore and origin.",
  },
]

export function getCharacterBySlug(slug: string): Character | undefined {
  return characters.find((c) => c.slug === slug)
}

export function getRelatedCharacters(slugs: string[]): Character[] {
  return slugs
    .map((slug) => characters.find((c) => c.slug === slug))
    .filter((c): c is Character => c !== undefined)
}

export function getAllCharacterSlugs(): string[] {
  return characters.map((c) => c.slug)
}
