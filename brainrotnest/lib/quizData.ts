export type QuizOption = { id: string; text: string };
export type QuizQuestion = { id: string; question: string; options: QuizOption[] };
export type QuizResult = {
  id: string;
  character: string;
  emoji: string;
  description: string;
  traits: string[];
};
export type Quiz = {
  slug: string;
  type: "personality" | "knowledge";
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  questions: QuizQuestion[];
  results: QuizResult[];
  /** optionId -> resultId (personality) or "correct" (knowledge) */
  scoring: Record<string, string>;
  /** knowledge quizzes only: sorted ascending by minScore */
  scoreThresholds?: { minScore: number; resultId: string }[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Quiz 1 — Personality
// ─────────────────────────────────────────────────────────────────────────────
const brainrotQuiz: Quiz = {
  slug: "brainrot-quiz",
  type: "personality",
  title: "Which Italian Brainrot Character Are You?",
  description:
    "Answer 12 chaotic questions to discover your inner Italian Brainrot beast. Are you the explosive Bombardiro, the elegant Ballerina, the rhythmic Tung Tung, or the deadly Cappuccino Assassino?",
  seoTitle: "Brainrot Quiz — Which Italian Brainrot Character Are You? (2026)",
  seoDescription:
    "Take our brainrot quiz to find out which Italian Brainrot character matches your personality. 12 fun questions, instant results!",
  questions: [
    {
      id: "q1",
      question: "What's your vibe on a Monday morning?",
      options: [
        { id: "q1_a", text: "Ready to cause absolute mayhem 💥" },
        { id: "q1_b", text: "Sipping espresso and looking flawless ☕" },
        { id: "q1_c", text: "Already drumming my fingers to a beat 🥁" },
        { id: "q1_d", text: "Plotting something in complete silence... 🤫" },
      ],
    },
    {
      id: "q2",
      question: "Your friends would describe you as...",
      options: [
        { id: "q2_a", text: "Unpredictable and explosively fun" },
        { id: "q2_b", text: "Graceful but secretly intimidating" },
        { id: "q2_c", text: "Always making some kind of noise" },
        { id: "q2_d", text: "Dangerously quiet and observant" },
      ],
    },
    {
      id: "q3",
      question: "Pick a chaotic activity:",
      options: [
        { id: "q3_a", text: "Bombing a medieval Italian village from above" },
        { id: "q3_b", text: "Pirouetting in a crowded espresso bar" },
        { id: "q3_c", text: "Drumming at full volume at 3am" },
        { id: "q3_d", text: "Eliminating someone's coffee without a sound" },
      ],
    },
    {
      id: "q4",
      question: "Your go-to snack is:",
      options: [
        { id: "q4_a", text: "Whatever I can grab while flying at mach speed" },
        { id: "q4_b", text: "A perfectly crafted layered cappuccino" },
        { id: "q4_c", text: "Anything I can eat rhythmically" },
        { id: "q4_d", text: "Something dark and bitter, like my soul" },
      ],
    },
    {
      id: "q5",
      question: "How do you handle a problem?",
      options: [
        { id: "q5_a", text: "Crash into it headfirst and deal with the damage later" },
        { id: "q5_b", text: "Glide around it with effortless elegance" },
        { id: "q5_c", text: "Beat it into submission with pure rhythm" },
        { id: "q5_d", text: "Make it quietly disappear without a trace" },
      ],
    },
    {
      id: "q6",
      question: "Your ideal Friday night:",
      options: [
        { id: "q6_a", text: "Explosions, mayhem, pure unhinged chaos" },
        { id: "q6_b", text: "Dancing until sunrise with perfect form" },
        { id: "q6_c", text: "Drumming session that goes until dawn" },
        { id: "q6_d", text: "Alone in the shadows, planning my next move" },
      ],
    },
    {
      id: "q7",
      question: "Pick your superpower:",
      options: [
        { id: "q7_a", text: "Flight + unlimited aerial bombs 🛩️" },
        { id: "q7_b", text: "Hypnotic pirouettes that stun enemies ✨" },
        { id: "q7_c", text: "Unbreakable rhythm that controls reality 🥁" },
        { id: "q7_d", text: "Perfect invisibility + instant-kill precision 💀" },
      ],
    },
    {
      id: "q8",
      question: "What is your spirit animal?",
      options: [
        { id: "q8_a", text: "A winged crocodile with a bomb strapped to it 🐊" },
        { id: "q8_b", text: "An elegant swan bathing in a latte 🦢" },
        { id: "q8_c", text: "A monkey that never stops drumming 🐒" },
        { id: "q8_d", text: "A black cat that judges everyone silently 🐈‍⬛" },
      ],
    },
    {
      id: "q9",
      question: "At a party, you are...",
      options: [
        { id: "q9_a", text: "The one who literally crashed through the wall" },
        { id: "q9_b", text: "The most elegant person in the entire room" },
        { id: "q9_c", text: "The DJ / live drummer everyone loves" },
        { id: "q9_d", text: "Watching from the corner, calculating everything" },
      ],
    },
    {
      id: "q10",
      question: "Your one fatal flaw is:",
      options: [
        { id: "q10_a", text: "Absolutely no off switch for destruction" },
        { id: "q10_b", text: "Too fabulous for most social situations" },
        { id: "q10_c", text: "Physically incapable of stopping the beat" },
        { id: "q10_d", text: "Trust issues with literally everyone" },
      ],
    },
    {
      id: "q11",
      question: "Pick an Italian word that resonates with you:",
      options: [
        { id: "q11_a", text: "BOMBARDARE! (to bomb everything)" },
        { id: "q11_b", text: "Eleganza (elegance above all)" },
        { id: "q11_c", text: "Ritmo (rhythm is life)" },
        { id: "q11_d", text: "Silenzio (silence is power)" },
      ],
    },
    {
      id: "q12",
      question: "Your personal catchphrase would be:",
      options: [
        { id: "q12_a", text: "\"HERE COMES TROUBLE!\" 💥" },
        { id: "q12_b", text: "\"Perfection is the only standard.\" 💅" },
        { id: "q12_c", text: "\"Don't fight the beat — become the beat.\" 🥁" },
        { id: "q12_d", text: "\"...\" (actions speak louder) 😶" },
      ],
    },
  ],
  results: [
    {
      id: "bombardiro-crocodilo",
      character: "Bombardiro Crocodilo",
      emoji: "🐊",
      description:
        "You are pure, unfiltered chaos in physical form. Like the legendary flying crocodile bomber of Italy, you crash into situations headfirst and ask questions later. People either love your energy or run from it — usually both. Life's too short for subtlety.",
      traits: ["Explosive Energy", "Fearlessly Chaotic", "Born for Destruction"],
    },
    {
      id: "ballerina-cappuccina",
      character: "Ballerina Cappuccina",
      emoji: "☕",
      description:
        "Graceful, precise, and fueled by an intense caffeine-powered passion for perfection. You glide through life with apparent elegance, but those who truly know you understand there's a spinning, foam-topped storm brewing beneath the surface.",
      traits: ["Effortlessly Elegant", "Secretly Intense", "Caffeinated Perfectionist"],
    },
    {
      id: "tung-tung-sahur",
      character: "Tung Tung Sahur",
      emoji: "🥁",
      description:
        "You live life to a rhythm only you can fully hear. Your energy is infectious, your timing is supernatural, and you have an uncanny ability to turn any situation into a percussive experience. Wherever you go, people start moving.",
      traits: ["Rhythmic Soul", "Infectious Energy", "Legendary Night Owl"],
    },
    {
      id: "cappuccino-assassino",
      character: "Cappuccino Assassino",
      emoji: "💀",
      description:
        "Silent, calculating, and devastatingly effective. You operate in the shadows with Italian charm and espresso-dark precision. Most people never see you coming — and that's exactly how you've always planned it.",
      traits: ["Coldly Strategic", "Mysteriously Quiet", "Lethally Calm"],
    },
  ],
  scoring: {
    q1_a: "bombardiro-crocodilo", q1_b: "ballerina-cappuccina", q1_c: "tung-tung-sahur",  q1_d: "cappuccino-assassino",
    q2_a: "bombardiro-crocodilo", q2_b: "ballerina-cappuccina", q2_c: "tung-tung-sahur",  q2_d: "cappuccino-assassino",
    q3_a: "bombardiro-crocodilo", q3_b: "ballerina-cappuccina", q3_c: "tung-tung-sahur",  q3_d: "cappuccino-assassino",
    q4_a: "bombardiro-crocodilo", q4_b: "ballerina-cappuccina", q4_c: "tung-tung-sahur",  q4_d: "cappuccino-assassino",
    q5_a: "bombardiro-crocodilo", q5_b: "ballerina-cappuccina", q5_c: "tung-tung-sahur",  q5_d: "cappuccino-assassino",
    q6_a: "bombardiro-crocodilo", q6_b: "ballerina-cappuccina", q6_c: "tung-tung-sahur",  q6_d: "cappuccino-assassino",
    q7_a: "bombardiro-crocodilo", q7_b: "ballerina-cappuccina", q7_c: "tung-tung-sahur",  q7_d: "cappuccino-assassino",
    q8_a: "bombardiro-crocodilo", q8_b: "ballerina-cappuccina", q8_c: "tung-tung-sahur",  q8_d: "cappuccino-assassino",
    q9_a: "bombardiro-crocodilo", q9_b: "ballerina-cappuccina", q9_c: "tung-tung-sahur",  q9_d: "cappuccino-assassino",
    q10_a: "bombardiro-crocodilo", q10_b: "ballerina-cappuccina", q10_c: "tung-tung-sahur", q10_d: "cappuccino-assassino",
    q11_a: "bombardiro-crocodilo", q11_b: "ballerina-cappuccina", q11_c: "tung-tung-sahur", q11_d: "cappuccino-assassino",
    q12_a: "bombardiro-crocodilo", q12_b: "ballerina-cappuccina", q12_c: "tung-tung-sahur", q12_d: "cappuccino-assassino",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Quiz 2 — Knowledge
// ─────────────────────────────────────────────────────────────────────────────
const italianBrainrotQuiz: Quiz = {
  slug: "italian-brainrot-quiz",
  type: "knowledge",
  title: "Italian Brainrot Quiz — Test Your Knowledge!",
  description:
    "Think you know Italian Brainrot? Put your knowledge of characters, lore, origins, and memes to the ultimate test. 12 questions. No mercy.",
  seoTitle: "Italian Brainrot Quiz — 100 Questions (How Much Do You Know?)",
  seoDescription:
    "The ultimate Italian brainrot quiz! Test your knowledge of all Italian brainrot characters, memes, and lore. Can you score 100%?",
  questions: [
    {
      id: "q1",
      question: "What type of creature is Bombardiro Crocodilo?",
      options: [
        { id: "q1_a", text: "A flying alligator with missiles" },
        { id: "q1_b", text: "A flying crocodile turned aerial bomber" },
        { id: "q1_c", text: "An armored lizard from the Alps" },
        { id: "q1_d", text: "A dragon-crocodile hybrid from Rome" },
      ],
    },
    {
      id: "q2",
      question: "What is Tung Tung Sahur's most iconic trait?",
      options: [
        { id: "q2_a", text: "His ability to fly over the Italian coast" },
        { id: "q2_b", text: "His uncontrollable coffee addiction" },
        { id: "q2_c", text: "His rhythmic drumming that wakes entire villages at 3am" },
        { id: "q2_d", text: "His frozen breath from the Alps" },
      ],
    },
    {
      id: "q3",
      question: "Ballerina Cappuccina is best known for:",
      options: [
        { id: "q3_a", text: "Bombing Italian coastlines from above" },
        { id: "q3_b", text: "Dancing ballet and coffee-themed pirouettes since the Renaissance" },
        { id: "q3_c", text: "Drumming at 3am in residential areas" },
        { id: "q3_d", text: "Stealing pasta from unsuspecting Italians" },
      ],
    },
    {
      id: "q4",
      question: "Which character is described as 'a caffeinated killer with Italian charm'?",
      options: [
        { id: "q4_a", text: "Ballerina Cappuccina" },
        { id: "q4_b", text: "Bombardiro Crocodilo" },
        { id: "q4_c", text: "Brr Brr Patapim" },
        { id: "q4_d", text: "Cappuccino Assassino" },
      ],
    },
    {
      id: "q5",
      question: "Where does Brr Brr Patapim come from?",
      options: [
        { id: "q5_a", text: "The ancient Roman catacombs" },
        { id: "q5_b", text: "The Venice canals" },
        { id: "q5_c", text: "The Italian Alps" },
        { id: "q5_d", text: "The island of Sicily" },
      ],
    },
    {
      id: "q6",
      question: "What does Bobrito Bandito steal instead of gold?",
      options: [
        { id: "q6_a", text: "Espresso beans" },
        { id: "q6_b", text: "Italian flags" },
        { id: "q6_c", text: "Pasta" },
        { id: "q6_d", text: "Drums" },
      ],
    },
    {
      id: "q7",
      question: "How does Tralalero Tralala communicate?",
      options: [
        { id: "q7_a", text: "Through rhythmic drumbeats" },
        { id: "q7_b", text: "By writing in ancient Italian script" },
        { id: "q7_c", text: "Using coffee-based morse code" },
        { id: "q7_d", text: "Only through saying 'lalala'" },
      ],
    },
    {
      id: "q8",
      question: "What type of animal is La Vaca Saturno Satalite?",
      options: [
        { id: "q8_a", text: "A cosmic horse orbiting Jupiter" },
        { id: "q8_b", text: "A cosmic cow orbiting Saturn" },
        { id: "q8_c", text: "A space whale near Neptune" },
        { id: "q8_d", text: "A flying bull from the stratosphere" },
      ],
    },
    {
      id: "q9",
      question: "What is Frulli Frulla's signature power?",
      options: [
        { id: "q9_a", text: "Freezing everything within a 10-metre radius" },
        { id: "q9_b", text: "Flying at the speed of light" },
        { id: "q9_c", text: "Spinning and blending anything in its path into a smoothie" },
        { id: "q9_d", text: "Creating music that causes amnesia" },
      ],
    },
    {
      id: "q10",
      question: "The word 'Sahur' in Tung Tung Sahur is a reference to:",
      options: [
        { id: "q10_a", text: "A type of ancient Italian drum" },
        { id: "q10_b", text: "The pre-dawn meal eaten before fasting in Ramadan" },
        { id: "q10_c", text: "A famous Spanish flamenco dance" },
        { id: "q10_d", text: "A Roman emperor known for his drumming" },
      ],
    },
    {
      id: "q11",
      question: "What do Lirili Larila's melodies cause in those who hear them?",
      options: [
        { id: "q11_a", text: "Uncontrollable laughter for 24 hours" },
        { id: "q11_b", text: "Temporary amnesia of all other sounds" },
        { id: "q11_c", text: "An irresistible urge to eat pasta" },
        { id: "q11_d", text: "Permanent dancing until exhaustion" },
      ],
    },
    {
      id: "q12",
      question: "Which Italian Brainrot character is known for orbiting Saturn?",
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
      character: "Certified Normie",
      emoji: "🤡",
      description:
        "You clearly haven't spent enough time in the Italian Brainrot rabbit hole. That's fine — everyone starts somewhere. Hit the Characters page and come back when you've done your research.",
      traits: ["Blissfully Unaware", "Needs More Lore", "Still Redeemable"],
    },
    {
      id: "apprentice",
      character: "Brainrot Apprentice",
      emoji: "🧠",
      description:
        "Not bad! You've clearly been exposed to some Italian Brainrot content, but there's still plenty of lore you haven't absorbed. Keep watching, keep learning, keep rotting.",
      traits: ["Partially Infected", "Lore Curious", "On the Right Path"],
    },
    {
      id: "scholar",
      character: "Italian Brainrot Scholar",
      emoji: "🎓",
      description:
        "Impressive. You know your Bombardiro from your Ballerina and your Sahur from your Assassino. The Italian Brainrot community respects your dedication to the craft.",
      traits: ["Deep Lore Knowledge", "Respected in the Community", "Almost Ascended"],
    },
    {
      id: "brainrot-god",
      character: "You ARE the Brainrot",
      emoji: "👑",
      description:
        "Perfect score. You didn't just absorb the Italian Brainrot lore — you have become it. At this point you might actually BE one of the characters. Seek help. Also, congratulations.",
      traits: ["Complete Brainrot", "Lore Incarnate", "Beyond Saving"],
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
    { minScore: 0,  resultId: "normie" },
    { minScore: 5,  resultId: "apprentice" },
    { minScore: 9,  resultId: "scholar" },
    { minScore: 12, resultId: "brainrot-god" },
  ],
};

export const quizzes: Quiz[] = [brainrotQuiz, italianBrainrotQuiz];

export function getQuizBySlug(slug: string): Quiz | undefined {
  return quizzes.find((q) => q.slug === slug);
}

export function getAllQuizSlugs(): string[] {
  return quizzes.map((q) => q.slug);
}
