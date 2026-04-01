import type { Metadata } from "next";
import Link from "next/link";
import { enAlternates } from "@/lib/ptBrAlternates";

export const metadata: Metadata = {
  title: "BrainrotNest — The Ultimate Italian Brainrot Hub",
  description:
    "Explore characters, take quizzes, and play games at BrainrotNest — your #1 Italian Brainrot wiki.",
  alternates: enAlternates(""),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.brainrotnest.com/#website",
      "url": "https://www.brainrotnest.com",
      "name": "BrainrotNest",
      "description": "The ultimate Italian Brainrot wiki, quiz and games hub",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.brainrotnest.com/characters?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.brainrotnest.com/#organization",
      "name": "BrainrotNest",
      "url": "https://www.brainrotnest.com",
      "logo": "https://www.brainrotnest.com/logo.png",
    },
  ],
};

const characters = [
  {
    name: "Bombardiro Crocodilo",
    emoji: "🐊",
    slug: "bombardiro-crocodilo",
    desc: "The fearsome flying crocodile bomber of Italy.",
  },
  {
    name: "Tung Tung Sahur",
    emoji: "🥁",
    slug: "tung-tung-sahur",
    desc: "Rhythmic chaos incarnate. He beats at dawn.",
  },
  {
    name: "Ballerina Cappuccina",
    emoji: "🩰",
    slug: "ballerina-cappuccina",
    desc: "Dancing on coffee foam since the Renaissance.",
  },
  {
    name: "Cappuccino Assassino",
    emoji: "☕",
    slug: "cappuccino-assassino",
    desc: "A caffeinated killer with Italian charm.",
  },
];

const characterPills = [
  { name: "Bombardiro Crocodilo", emoji: "🐊", slug: "bombardiro-crocodilo" },
  { name: "Tung Tung Sahur", emoji: "🥁", slug: "tung-tung-sahur" },
  { name: "Tralalero Tralala", emoji: "🎭", slug: "tralalero-tralala" },
  { name: "Ballerina Cappuccina", emoji: "🩰", slug: "ballerina-cappuccina" },
  { name: "Brr Brr Patapim", emoji: "❄️", slug: "brr-brr-patapim" },
  { name: "Cappuccino Assassino", emoji: "☕", slug: "cappuccino-assassino" },
  { name: "Lirili Larila", emoji: "🎵", slug: "lirili-larila" },
  { name: "Bobrito Bandito", emoji: "🤠", slug: "bobrito-bandito" },
  { name: "Frulli Frulla", emoji: "🌀", slug: "frulli-frulla" },
  { name: "La Vaca Saturno Satalite", emoji: "🐄", slug: "la-vaca-saturno-satalite" },
];

const stats = [
  { value: "10+", label: "Characters" },
  { value: "8", label: "Games" },
  { value: "100", label: "Quiz Questions" },
  { value: "∞", label: "Brainrot" },
];

const quizCards = [
  {
    title: "Name That Sound!",
    desc: "Can you match the brainrot creature to its signature noise?",
    tag: "Audio",
  },
  {
    title: "Origins Quiz",
    desc: "How well do you know the lore behind each Italian Brainrot character?",
    tag: "Lore",
  },
];

const games = [
  {
    title: "Brainrot Clicker",
    slug: "brainrot-clicker",
    emoji: "🖱️",
    desc: "Click to summon infinite Italian chaos.",
    tag: "Idle",
  },
  {
    title: "Steal a Brainrot",
    slug: "steal-a-brainrot-online",
    emoji: "🤏",
    desc: "Swipe characters before your rivals do.",
    tag: "Strategy",
  },
  {
    title: "Brainrot Merge",
    slug: "brainrot-merge",
    emoji: "🔀",
    desc: "Merge creatures to unlock legendary forms.",
    tag: "Puzzle",
  },
  {
    title: "Brainrot Tower",
    slug: "brainrot-tower",
    emoji: "🏰",
    desc: "Defend your base with an army of brainrots.",
    tag: "Tower Defense",
  },
];

export default function HomePage() {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 sm:py-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,107,0.15) 0%, transparent 70%)",
          }}
        />

        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          style={{
            backgroundColor: "rgba(255,107,107,0.15)",
            border: "1px solid rgba(255,107,107,0.3)",
            color: "var(--color-accent-red)",
          }}
        >
          🐊 Italian Brainrot HQ
        </span>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl leading-tight mb-4"
          style={{ fontFamily: "var(--font-fredoka), cursive" }}
        >
          The #1{" "}
          <span style={{ color: "var(--color-accent-red)" }}>Italian Brainrot</span>{" "}
          <span style={{ color: "var(--color-accent-yellow)" }}>Hub</span>{" "}
          🧠
        </h1>

        <p
          className="max-w-xl text-lg sm:text-xl mb-6"
          style={{ color: "var(--color-text-muted)" }}
        >
          Quizzes · Characters · Free Games — All in one place
        </p>

        {/* Trust stats */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-sm font-semibold">
          <span style={{ color: "var(--color-text-muted)" }}>22 Characters</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span style={{ color: "var(--color-text-muted)" }}>8 Games</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span style={{ color: "var(--color-text-muted)" }}>3 Quizzes</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span style={{ color: "var(--color-accent-green)", fontWeight: 700 }}>100% Free</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link
            href="/games/brainrot-clicker"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg btn-cta-game"
          >
            🎮 Play Brainrot Clicker
          </Link>
          <Link
            href="/quiz/brainrot-quiz"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base btn-cta-quiz"
          >
            🧠 Which Character Are You?
          </Link>
        </div>

        {/* Animated character emojis */}
        <div className="flex items-end justify-center gap-10" aria-hidden="true">
          <span className="text-5xl animate-float" style={{ animationDelay: "0s" }}>🐊</span>
          <span className="text-6xl animate-float" style={{ animationDelay: "0.5s" }}>🥁</span>
          <span className="text-5xl animate-float" style={{ animationDelay: "1s" }}>🩰</span>
        </div>
      </section>

      {/* ── Character Pills ── */}
      <section className="px-4 pb-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {characterPills.map((char) => (
              <Link
                key={char.slug}
                href={`/characters/${char.slug}`}
                className="pill-char px-4 py-2 rounded-full text-sm font-semibold select-none"
              >
                {char.emoji} {char.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-4 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="card-surface flex flex-col items-center justify-center py-10 rounded-2xl"
              >
                <span
                  className="text-5xl sm:text-6xl mb-2"
                  style={{ fontFamily: "var(--font-fredoka), cursive" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-sm font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quiz ── */}
      <section className="px-4 py-14">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl mb-8"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Test Your Knowledge
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Featured */}
            <Link
              href="/quiz/brainrot-quiz"
              className="card-yellow md:col-span-2 rounded-2xl p-8 flex flex-col justify-between min-h-52"
            >
              <div>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                  style={{
                    backgroundColor: "rgba(250,204,21,0.2)",
                    color: "var(--color-accent-yellow)",
                  }}
                >
                  ⭐ Featured
                </span>
                <h3
                  className="text-2xl sm:text-3xl mb-3"
                  style={{ fontFamily: "var(--font-fredoka), cursive" }}
                >
                  Which Italian Brainrot Character Are You?
                </h3>
                <p style={{ color: "var(--color-text-muted)" }}>
                  Answer 10 chaotic questions and discover your inner brainrot
                  beast. Are you Bombardiro or Ballerina Cappuccina?
                </p>
              </div>
              <span
                className="mt-6 inline-flex items-center gap-2 font-bold"
                style={{ color: "var(--color-accent-yellow)" }}
              >
                Start Quiz →
              </span>
            </Link>

            {/* Small cards */}
            <div className="flex flex-col gap-5">
              {quizCards.map((quiz) => (
                <Link
                  key={quiz.title}
                  href="/quiz"
                  className="card-surface rounded-2xl p-6 flex flex-col justify-between flex-1"
                >
                  <div>
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-3"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {quiz.tag}
                    </span>
                    <h4
                      className="text-lg mb-2"
                      style={{ fontFamily: "var(--font-fredoka), cursive" }}
                    >
                      {quiz.title}
                    </h4>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                      {quiz.desc}
                    </p>
                  </div>
                  <span
                    className="mt-4 text-sm font-bold"
                    style={{ color: "var(--color-accent-red)" }}
                  >
                    Play →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Characters ── */}
      <section className="px-4 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-3xl sm:text-4xl"
              style={{ fontFamily: "var(--font-fredoka), cursive" }}
            >
              Meet the Characters
            </h2>
            <Link
              href="/characters"
              className="text-sm font-bold hover:underline"
              style={{ color: "var(--color-accent-green)" }}
            >
              View all characters →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {characters.map((char) => (
              <Link
                key={char.slug}
                href={`/characters/${char.slug}`}
                className="card-surface rounded-2xl p-4 sm:p-6 flex flex-col gap-3"
              >
                <span className="text-4xl sm:text-5xl">{char.emoji}</span>
                <h3
                  className="text-base sm:text-lg leading-tight"
                  style={{ fontFamily: "var(--font-fredoka), cursive" }}
                >
                  {char.name}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {char.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog CTA ── */}
      <section className="px-4 py-14">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{
              background: "linear-gradient(135deg, rgba(250,204,21,0.07) 0%, rgba(74,222,128,0.05) 100%)",
              border: "1px solid rgba(250,204,21,0.2)",
            }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--color-accent-yellow)" }}>
                📝 From the Blog
              </p>
              <h2
                className="text-2xl sm:text-3xl mb-2"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                Learn the Lore
              </h2>
              <p className="text-sm max-w-md" style={{ color: "var(--color-text-muted)" }}>
                Deep-dive guides on Italian Brainrot characters, origins, and the best games to play.
              </p>
            </div>
            <Link
              href="/blog"
              className="btn-outline px-7 py-3 rounded-xl font-bold text-sm shrink-0"
            >
              Read the Blog →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Games ── */}
      <section className="px-4 py-14 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-3xl sm:text-4xl"
              style={{ fontFamily: "var(--font-fredoka), cursive" }}
            >
              Play Brainrot Games
            </h2>
            <Link
              href="/games"
              className="text-sm font-bold hover:underline"
              style={{ color: "var(--color-accent-green)" }}
            >
              All games →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {games.map((game) => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="card-green rounded-2xl p-4 sm:p-6 flex flex-col gap-3"
              >
                <span className="text-3xl sm:text-4xl">{game.emoji}</span>
                <span
                  className="inline-block w-fit px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: "rgba(74,222,128,0.12)",
                    color: "var(--color-accent-green)",
                    border: "1px solid rgba(74,222,128,0.25)",
                  }}
                >
                  {game.tag}
                </span>
                <h3
                  className="text-base sm:text-lg leading-tight"
                  style={{ fontFamily: "var(--font-fredoka), cursive" }}
                >
                  {game.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {game.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
