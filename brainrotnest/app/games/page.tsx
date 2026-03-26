import type { Metadata } from "next"
import Link from "next/link"
import { games } from "@/lib/gamesData"

export const metadata: Metadata = {
  title: "Brainrot Games — Play Italian Brainrot Games Free Online",
  description:
    "Play the best Italian brainrot games free online. Brainrot Clicker, Steal a Brainrot, Brainrot Merge and more. No download needed.",
  alternates: {
    canonical: "https://www.brainrotnest.com/games",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Italian Brainrot Games",
  description: "Free online Italian Brainrot games",
  numberOfItems: 8,
  itemListElement: games.map((game, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: game.name,
    url: `https://www.brainrotnest.com/games/${game.slug}`,
    description: game.metaDescription,
  })),
}

const faqs = [
  {
    q: "What are Italian brainrot games?",
    a: "Italian brainrot games are free browser games based on the viral Italian Brainrot meme universe — featuring characters like Bombardiro Crocodilo, Tralalero Tralala, and more. They include clicker games, multiplayer card games, puzzle games, and tower defense.",
  },
  {
    q: "Is Brainrot Clicker free to play?",
    a: "Yes! Brainrot Clicker is completely free to play directly in your browser. No download, no account required. Just open the page and start clicking to collect all 15 Italian Brainrot characters.",
  },
  {
    q: "What is Steal a Brainrot game?",
    a: "Steal a Brainrot is a multiplayer online card-stealing game where each player starts with Brainrot characters and must steal from rivals to collect them all. It's based on the popular physical card game from the Italian Brainrot community.",
  },
  {
    q: "Do I need to download these games?",
    a: "No download needed for any BrainrotNest game. All games run entirely in your web browser — desktop and mobile both supported. Just click Play and you're in.",
  },
  {
    q: "What is the best Italian brainrot game?",
    a: "Brainrot Clicker is the most popular Italian brainrot game for solo play, while Steal a Brainrot Online is the top choice for playing with friends. Both are free and available right now on BrainrotNest.",
  },
]

const featuredGames = games.filter((g) => g.featured)
const allGames = games

export default function GamesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Hero */}
        <div className="mb-12">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
            style={{
              backgroundColor: "rgba(74,222,128,0.12)",
              border: "1px solid rgba(74,222,128,0.25)",
              color: "var(--color-accent-green)",
            }}
          >
            🎮 Free Online Games
          </span>
          <h1
            className="text-4xl sm:text-5xl mb-4"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Brainrot{" "}
            <span style={{ color: "var(--color-accent-green)" }}>Games</span>
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "var(--color-text-muted)" }}>
            Play free Italian Brainrot games online — no download needed. Click, steal,
            merge, and defend your way through the chaos.
          </p>
        </div>

        {/* Featured Games */}
        <section className="mb-14">
          <h2
            className="text-2xl mb-6"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            ⭐ Featured Games
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredGames.map((game) => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                style={{
                  backgroundColor: "rgba(74,222,128,0.08)",
                  border: "1px solid rgba(74,222,128,0.25)",
                }}
              >
                {!game.isAvailable && (
                  <span
                    className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    Coming Soon
                  </span>
                )}
                <span style={{ fontSize: 64, lineHeight: 1 }}>{game.emoji}</span>
                <div>
                  <h3
                    className="text-2xl mb-1"
                    style={{ fontFamily: "var(--font-fredoka), cursive" }}
                  >
                    {game.name}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: "var(--color-text-muted)" }}>
                    {game.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: "rgba(74,222,128,0.12)",
                          color: "var(--color-accent-green)",
                          border: "1px solid rgba(74,222,128,0.25)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {game.isAvailable ? (
                  <span
                    className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl text-sm font-extrabold w-fit"
                    style={{
                      backgroundColor: "#4ade80",
                      color: "#052e16",
                    }}
                  >
                    Play Now →
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl text-sm font-bold w-fit"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    Coming Soon
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* All Games Grid */}
        <section className="mb-16">
          <h2
            className="text-2xl mb-6"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            All Games
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allGames.map((game) => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 relative"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span style={{ fontSize: 36 }}>{game.emoji}</span>
                <div>
                  <h3
                    className="text-base leading-tight mb-1"
                    style={{ fontFamily: "var(--font-fredoka), cursive" }}
                  >
                    {game.name}
                  </h3>
                  <p
                    className="text-xs leading-relaxed mb-3"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {game.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {game.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: "rgba(74,222,128,0.1)",
                          color: "var(--color-accent-green)",
                          border: "1px solid rgba(74,222,128,0.2)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {game.isAvailable ? (
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-extrabold"
                      style={{
                        backgroundColor: "#4ade80",
                        color: "#052e16",
                      }}
                    >
                      Play →
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2
            className="text-2xl sm:text-3xl mb-6"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <h3
                  className="text-base font-bold mb-2"
                  style={{ fontFamily: "var(--font-fredoka), cursive", fontSize: "1.1rem" }}
                >
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTAs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link
            href="/quiz/brainrot-quiz"
            className="rounded-3xl p-7 text-center flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, rgba(250,204,21,0.1) 0%, rgba(255,107,107,0.07) 100%)",
              border: "1px solid rgba(250,204,21,0.25)",
            }}
          >
            <span style={{ fontSize: 40 }}>❓</span>
            <div>
              <p
                className="text-xl mb-1"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                Think You Know Brainrot?
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Take the Italian Brainrot quiz and find out.
              </p>
            </div>
            <span
              className="px-6 py-2.5 rounded-xl font-bold text-sm"
              style={{ backgroundColor: "var(--color-accent-yellow)", color: "#422006" }}
            >
              Take the Quiz →
            </span>
          </Link>

          <Link
            href="/characters"
            className="rounded-3xl p-7 text-center flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <span style={{ fontSize: 40 }}>🧬</span>
            <div>
              <p
                className="text-xl mb-1"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                Meet the Characters
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Explore the full Italian Brainrot character roster.
              </p>
            </div>
            <span className="btn-outline px-6 py-2.5 rounded-xl font-bold text-sm">
              See All Characters →
            </span>
          </Link>
        </section>

      </div>
    </>
  )
}
