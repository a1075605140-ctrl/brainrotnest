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
    tagline: "Click to spread the brainrot. You can't stop.",
    description:
      "Brainrot Clicker is the definitive Italian Brainrot idle game — a clicking experience that starts innocent and escalates rapidly into full chaos. Every click generates Brainrot Points, which you use to unlock beloved characters from the Italian Brainrot universe. Watch as your collection grows from a single chaotic creature to a full roster of ten deranged icons, each generating passive points automatically.\n\nWhat separates Brainrot Clicker from ordinary clicker games is the sheer personality packed into every interaction. Characters react to your clicks, chaos events trigger at milestone moments, and the whole thing refuses to let you put it down. Whether you're grinding for the rarest characters or mindlessly clicking through a study break, Brainrot Clicker delivers exactly the kind of brain-melting engagement the Italian Brainrot universe is famous for.",
    howToPlay: [
      "Click the main character to generate Brainrot Points",
      "Use points to unlock new Italian Brainrot characters",
      "Each character generates passive points automatically",
      "Reach milestones to unlock special chaos events",
      "Can you collect all 10 characters?",
    ],
    tags: ["Clicker", "Idle", "Casual"],
    iframeUrl: "https://html5.gamedistribution.com/cb70400cb9914c9caff17b1ebbff4f79/?gd_sdk_referrer_url=https://www.brainrotnest.com/games/brainrot-clicker",
    isAvailable: true,
    featured: true,
    metaTitle: "Brainrot Clicker — Italian Brainrot Clicker Game (Play Free)",
    metaDescription:
      "Play Brainrot Clicker free online! The ultimate Italian brainrot clicker game. Click to unlock all characters. No download needed.",
  },
  {
    slug: "steal-a-brainrot-online",
    name: "Steal a Brainrot",
    emoji: "🔀",
    tagline: "Steal characters from your friends. Online.",
    description:
      "Steal a Brainrot is the multiplayer card-stealing game that has taken the Italian Brainrot community by storm. Each player starts with three randomly assigned Brainrot characters and must use wit, bluffing, and fast thinking to steal from rivals and build the ultimate collection. Successfully identify a character trait from another player's hand to swipe them, or risk having your own precious characters taken.\n\nThe game's appeal lies in its perfect balance of strategy and chaos — two things the Italian Brainrot universe does exceptionally well. With every round bringing new character combinations and wild stealing attempts, no two games ever play the same way. Challenge friends, climb the rankings, and discover which Brainrot characters are the most coveted prizes in any match.",
    howToPlay: [
      "Each player starts with 3 random Brainrot characters",
      "On your turn, attempt to steal a character from another player",
      "Successfully guess their character's trait to steal it",
      "Collect all characters to win",
      "Watch out — others can steal yours too!",
    ],
    tags: ["Multiplayer", "Strategy", "Card Game"],
    iframeUrl: "",
    isAvailable: false,
    featured: true,
    metaTitle: "Steal a Brainrot Online — Free Multiplayer Brainrot Game",
    metaDescription:
      "Play Steal a Brainrot online free! The popular brainrot card stealing game. Challenge friends and steal Italian brainrot characters.",
  },
  {
    slug: "brainrot-merge",
    name: "Brainrot Merge",
    emoji: "🔀",
    tagline: "Merge characters to reach La Vaca Saturno!",
    description:
      "Brainrot Merge is the puzzle game that asks a simple question: what happens when you combine two Italian Brainrot characters? The answer is always something weirder, more powerful, and significantly more unhinged than the sum of its parts. Drag matching characters together on the board, watch them fuse into rarer forms, and work toward discovering every possible merged combination.\n\nStrategic thinking is just as important as quick reactions in Brainrot Merge. The board fills up fast, and a single misplaced merge can leave you completely stuck. Plan your combinations carefully, discover hidden secret merges between specific character pairs, and aim for the legendary forms sitting at the very top of the evolution chain.",
    howToPlay: [
      "Drag matching Brainrot characters together to merge them",
      "Merged characters evolve into rarer, more powerful forms",
      "Fill the board strategically — don't get stuck",
      "Discover all secret merged character combinations",
    ],
    tags: ["Merge", "Puzzle", "Strategy"],
    iframeUrl: "",
    isAvailable: true,
    featured: false,
    metaTitle: "Brainrot Merge — Merge Italian Brainrot Characters Game",
    metaDescription:
      "Play Brainrot Merge free! Merge Italian Brainrot characters to reach La Vaca Saturno. 2048-style puzzle game with all your favorite brainrot characters.",
  },
  {
    slug: "brainrot-puzzle",
    name: "Brainrot Memory Game",
    emoji: "🧩",
    tagline: "Match all the Italian Brainrot characters!",
    description:
      "Brainrot Memory Game is BrainrotNest's original card-matching game built around the viral Italian Brainrot universe. Flip cards to find matching pairs of beloved characters — from Tralalero Tralala to Cappuccino Assassino — before the timer runs out. Three difficulty levels keep the challenge fresh whether you're a casual fan or a dedicated Brainrot scholar.\n\nYour best scores are saved locally so you can always chase a new personal record. The scoring system rewards both speed and accuracy — fewer moves with more time remaining means a higher final score. Can you get a perfect run on Hard mode?",
    howToPlay: [
      "Choose Easy, Medium, or Hard difficulty",
      "Flip cards two at a time to find matching character pairs",
      "Match all pairs before the timer runs out to win",
      "Score = (time remaining × 10) − (moves × 2)",
      "Beat your best score across all three difficulties!",
    ],
    tags: ["Memory", "Puzzle", "Casual"],
    iframeUrl: "",
    isAvailable: true,
    featured: false,
    metaTitle: "Brainrot Memory Game — Match Italian Brainrot Characters",
    metaDescription:
      "Play Brainrot Memory Game free! Match all Italian Brainrot character pairs before time runs out. Easy, Medium and Hard difficulty. No download needed.",
  },
  {
    slug: "brainrot-craft",
    name: "Brainrot Craft",
    emoji: "⚒️",
    tagline: "Build your brainrot empire.",
    description:
      "Brainrot Craft puts you in control of building your very own Italian Brainrot empire from the ground up. Gather resources, discover crafting recipes inspired by Brainrot characters, and construct structures that automate your production pipeline. Every Italian Brainrot character unlocks a unique recipe, rewarding players who explore the full roster.\n\nThe idle elements of Brainrot Craft make it perfectly suited for long play sessions and casual drop-in gaming alike. Return after a break to find your empire growing, your resources accumulated, and new crafting possibilities waiting to be unlocked. The goal is total domination of the Brainrot dimension — one structure at a time.",
    howToPlay: [
      "Gather resources by clicking the environment",
      "Craft items using Italian Brainrot character recipes",
      "Build structures to automate resource collection",
      "Expand your empire and unlock all characters",
    ],
    tags: ["Crafting", "Idle", "Strategy"],
    iframeUrl: "",
    isAvailable: false,
    featured: false,
    metaTitle: "Brainrot Craft — Build Your Italian Brainrot Empire",
    metaDescription:
      "Play Brainrot Craft free online! Craft, build and expand your Italian Brainrot empire. Idle crafting game in your browser.",
  },
  {
    slug: "brainrot-idle",
    name: "Brainrot Idle",
    emoji: "💤",
    tagline: "Even offline, the brainrot spreads.",
    description:
      "Brainrot Idle is the purest expression of Italian Brainrot as a game mechanic: the chaos continues even when you're not watching. Set up your production pipeline, assign characters to their optimal roles, and let the Brainrot economy run itself. Your offline earnings accumulate in real time, waiting for you to return and collect.\n\nThe prestige system takes Brainrot Idle from a simple idle game to an endlessly deep experience. Reset your progress for powerful multipliers that send production into overdrive, unlock exclusive prestige-only characters, and compete for the highest production rates in the Brainrot dimension. The longer you play — and the longer you stay away — the more powerful your empire becomes.",
    howToPlay: [
      "Set up your brainrot production pipeline",
      "Characters generate points even when you're away",
      "Return to collect your offline earnings",
      "Prestige to multiply your production speed",
    ],
    tags: ["Idle", "Casual"],
    iframeUrl: "",
    isAvailable: false,
    featured: false,
    metaTitle: "Brainrot Idle — Italian Brainrot Idle Game Online",
    metaDescription:
      "Play Brainrot Idle free! An Italian Brainrot idle game that runs even when offline. Collect characters and prestige for max brainrot.",
  },
  {
    slug: "brainrot-tower",
    name: "Brainrot Tower Defense",
    emoji: "🏰",
    tagline: "Defend the nest from brainrot waves!",
    description:
      "Brainrot Tower Defense transforms the Italian Brainrot character roster into a full tactical arsenal. Place characters along the path to intercept incoming enemy waves, each one contributing unique abilities to the defense. Bombardiro handles long-range sniper shots, Tung Tung creates area-of-effect rhythm attacks, and every character brings something irreplaceable to the battlefield.\n\nTen increasingly difficult waves push your defenses to the limit — from quick Mini Brainrots to devastating Boss Brainrots. Spend your earned gold wisely between waves, cover the path with complementary tower types, and see if you have what it takes to protect the nest from total brainrot chaos.",
    howToPlay: [
      "Select a tower type and click an empty tile to place it",
      "Each character has unique damage, range, and fire rate",
      "Press Next Wave to send enemies marching toward your nest",
      "Defeat enemies to earn gold for more towers",
      "Survive all 10 waves to win!",
    ],
    tags: ["Tower Defense", "Strategy"],
    iframeUrl: "",
    isAvailable: true,
    featured: false,
    metaTitle: "Brainrot Tower Defense — Italian Brainrot Tower Game Free",
    metaDescription:
      "Play Brainrot Tower Defense free! Place Italian Brainrot character towers to defend against 10 waves of enemies. Free strategy game in your browser.",
  },
  {
    slug: "brainrot-quiz-game",
    name: "Brainrot Quiz Game",
    emoji: "❓",
    tagline: "How much brainrot do you actually know?",
    description:
      "Brainrot Quiz Game is the definitive test of Italian Brainrot knowledge — 30 seconds per question, no lifelines, no mercy. Questions span character lore, origin stories, catchphrases, abilities, and obscure Brainrot universe trivia that separates casual fans from true devotees. Chain consecutive correct answers to build score multipliers and climb the leaderboard.\n\nAs you progress through the quiz packs, questions escalate from accessible to genuinely challenging. Early rounds test the basics — can you identify characters by emoji? Later rounds demand deep knowledge of the lore that only true Brainrot scholars possess. Whether you're studying the characters beforehand or diving in cold, Brainrot Quiz Game is the most entertaining way to find out exactly how much brainrot you actually know.",
    howToPlay: [
      "Answer trivia questions about Italian Brainrot characters",
      "30 seconds per question — think fast",
      "Chain correct answers for score multipliers",
      "Unlock harder question packs as you progress",
    ],
    tags: ["Quiz", "Trivia", "Casual"],
    iframeUrl: "",
    isAvailable: true,
    featured: false,
    metaTitle: "Brainrot Quiz Game — Italian Brainrot Trivia Game Online",
    metaDescription:
      "Play Brainrot Quiz Game free! Test your Italian Brainrot knowledge in this fast-paced trivia game. How much brainrot do you know?",
  },
]

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug)
}

export function getOtherGames(currentSlug: string, count = 3): Game[] {
  const available = games.filter((g) => g.slug !== currentSlug && g.isAvailable)
  const unavailable = games.filter((g) => g.slug !== currentSlug && !g.isAvailable)
  return [...available, ...unavailable].slice(0, count)
}

export function getAllGameSlugs(): string[] {
  return games.map((g) => g.slug)
}
