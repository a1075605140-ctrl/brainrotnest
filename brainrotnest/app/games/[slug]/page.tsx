import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { games, getGameBySlug, getOtherGames } from "@/lib/gamesData"
import GameIframe from "./GameIframe"
import AdPlaceholder from "@/components/AdPlaceholder"
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const game = getGameBySlug(slug)
  if (!game) return {}
  return {
    title: game.metaTitle,
    description: game.metaDescription,
    alternates: {
      canonical: `https://brainrotnest.com/games/${slug}`,
    },
  }
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params
  const game = getGameBySlug(slug)
  if (!game) notFound()

  const otherGames = getOtherGames(game.slug, 3)
  const paragraphs = game.description.split("\n\n")
  const isMultiplayer = game.tags.includes("Multiplayer")

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: game.name,
    description: game.metaDescription,
    applicationCategory: "GameApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://brainrotnest.com" },
          { name: "Games", url: "https://brainrotnest.com/games" },
          { name: game.name, url: `https://brainrotnest.com/games/${game.slug}` },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: "var(--color-text-muted)" }}>
          <Link href="/" className="hover:underline" style={{ color: "var(--color-text-muted)" }}>
            Home
          </Link>
          <span>/</span>
          <Link href="/games" className="hover:underline" style={{ color: "var(--color-text-muted)" }}>
            Games
          </Link>
          <span>/</span>
          <span style={{ color: "var(--color-text)" }}>{game.name}</span>
        </nav>

        {/* Game title row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span style={{ fontSize: 40 }}>{game.emoji}</span>
          <h1
            className="text-3xl sm:text-4xl"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            {game.name}
          </h1>
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

        {/* Ad banner above game */}
        <div className="mb-4">
          <AdPlaceholder size="banner" />
        </div>

        {/* Game area */}
        {game.isAvailable ? (
          <GameIframe iframeUrl={game.iframeUrl} gameName={game.name} />
        ) : (
          <div
            className="w-full flex flex-col items-center justify-center gap-4"
            style={{
              height: "clamp(300px, 56vw, 560px)",
              borderRadius: 12,
              border: "2px dashed rgba(255,255,255,0.12)",
              backgroundColor: "rgba(255,255,255,0.03)",
            }}
          >
            <span style={{ fontSize: 64 }}>{game.emoji}</span>
            <p
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-fredoka), cursive" }}
            >
              Coming Soon
            </p>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              {game.tagline}
            </p>
            <button
              disabled
              className="mt-2 px-6 py-2.5 rounded-xl text-sm font-bold cursor-not-allowed"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.35)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Notify Me When Available
            </button>
          </div>
        )}

        {/* Two-column content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

          {/* Left column */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* About */}
            <section>
              <h2
                className="text-2xl sm:text-3xl mb-4"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                About{" "}
                <span style={{ color: "var(--color-accent-green)" }}>{game.name}</span>
              </h2>
              <div className="flex flex-col gap-4">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Ad rectangle in middle of content */}
            <div className="flex justify-start">
              <AdPlaceholder size="rectangle" />
            </div>

            {/* How to Play */}
            <section>
              <h2
                className="text-2xl sm:text-3xl mb-5"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                How to Play
              </h2>
              <ol className="flex flex-col gap-3">
                {game.howToPlay.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 flex items-center justify-center text-sm font-bold rounded-full"
                      style={{
                        width: 28,
                        height: 28,
                        backgroundColor: "#4ade80",
                        color: "#052e16",
                        fontFamily: "var(--font-fredoka), cursive",
                        fontSize: "0.9rem",
                      }}
                    >
                      {index + 1}
                    </span>
                    <span
                      className="text-base leading-relaxed pt-0.5"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-5">

            {/* Game Info card */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <h3
                className="text-xl mb-5"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                Game Info
              </h3>
              <dl className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <dt className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                    Category
                  </dt>
                  <dd className="flex flex-wrap gap-1 justify-end">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: "rgba(74,222,128,0.1)",
                          color: "var(--color-accent-green)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                    Platform
                  </dt>
                  <dd className="text-sm font-semibold">Browser</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                    Price
                  </dt>
                  <dd className="text-sm font-semibold" style={{ color: "var(--color-accent-green)" }}>
                    Free
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                    Players
                  </dt>
                  <dd className="text-sm font-semibold">
                    {isMultiplayer ? "Multiplayer" : "Single Player"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                    Status
                  </dt>
                  <dd>
                    {game.isAvailable ? (
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: "rgba(74,222,128,0.15)",
                          color: "var(--color-accent-green)",
                        }}
                      >
                        Available
                      </span>
                    ) : (
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        Coming Soon
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            {/* More Games card */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <h3
                className="text-xl mb-4"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                More Games
              </h3>
              <div className="flex flex-col gap-3">
                {otherGames.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/games/${other.slug}`}
                    className="card-green flex items-center gap-3 rounded-xl px-3 py-2.5"
                  >
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{other.emoji}</span>
                    <div className="min-w-0">
                      <p
                        className="text-sm font-semibold leading-tight truncate"
                        style={{ fontFamily: "var(--font-fredoka), cursive" }}
                      >
                        {other.name}
                      </p>
                      <p
                        className="text-xs truncate"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {other.isAvailable ? "Play Now" : "Coming Soon"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/games"
                className="mt-4 flex items-center justify-center text-sm font-bold py-2.5 rounded-xl transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "rgba(74,222,128,0.1)",
                  color: "var(--color-accent-green)",
                  border: "1px solid rgba(74,222,128,0.2)",
                }}
              >
                View All Games →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link
            href="/quiz/brainrot-quiz"
            className="rounded-3xl p-7 text-center flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(250,204,21,0.07) 100%)",
              border: "1px solid rgba(255,107,107,0.25)",
            }}
          >
            <span style={{ fontSize: 40 }}>❓</span>
            <div>
              <p
                className="text-xl mb-1"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                Think you know your Brainrot?
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Test your knowledge in the Italian Brainrot quiz.
              </p>
            </div>
            <span className="btn-primary px-6 py-2.5 rounded-xl font-bold text-sm">
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
                Explore every Italian Brainrot character in the wiki.
              </p>
            </div>
            <span className="btn-outline px-6 py-2.5 rounded-xl font-bold text-sm">
              See All Characters →
            </span>
          </Link>
        </div>

        {/* Bottom ad banner */}
        <div className="mt-10">
          <AdPlaceholder size="banner" />
        </div>

      </div>
    </>
  )
}
