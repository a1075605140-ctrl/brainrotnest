import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import { characters, getCharacterBySlug, getRelatedCharacters } from "@/lib/charactersData"
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const character = getCharacterBySlug(slug)
  if (!character) return {}
  return {
    title: `${character.name} | Italian Brainrot Characters - BrainrotNest`,
    description: character.metaDescription,
    keywords: [
      character.name,
      "italian brainrot",
      "italian brainrot characters",
      `${character.name.toLowerCase()} brainrot`,
      "brainrot wiki",
      "brainrotnest",
    ],
    alternates: {
      canonical: `https://www.brainrotnest.com/characters/${slug}`,
    },
    openGraph: {
      title: `${character.name} | Italian Brainrot Characters - BrainrotNest`,
      description: character.metaDescription,
      url: `https://www.brainrotnest.com/characters/${slug}`,
      type: "article",
    },
  }
}

export default async function CharacterPage({ params }: Props) {
  const { slug } = await params
  const character = getCharacterBySlug(slug)
  if (!character) notFound()

  const related = getRelatedCharacters(character.relatedCharacters)

  const pageUrl = `https://www.brainrotnest.com/characters/${character.slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    headline: `${character.name} - Italian Brainrot Character`,
    description: character.metaDescription,
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "BrainrotNest",
      url: "https://www.brainrotnest.com",
    },
    about: {
      "@type": "Thing",
      name: character.name,
      description: character.metaDescription,
    },
    keywords: [
      "italian brainrot",
      character.name,
      "brainrot character",
      ...character.personality,
    ].join(", "),
  }

  const paragraphs = character.description.split("\n\n")

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.brainrotnest.com" },
          { name: "Characters", url: "https://www.brainrotnest.com/characters" },
          { name: character.name, url: `https://www.brainrotnest.com/characters/${character.slug}` },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-10" style={{ color: "var(--color-text-muted)" }}>
          <Link href="/" className="hover:underline" style={{ color: "var(--color-text-muted)" }}>
            Home
          </Link>
          <span>/</span>
          <Link href="/characters" className="hover:underline" style={{ color: "var(--color-text-muted)" }}>
            Characters
          </Link>
          <span>/</span>
          <span style={{ color: "var(--color-text)" }}>{character.name}</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-14">
          <div style={{ fontSize: 96, lineHeight: 1, marginBottom: 20 }}>{character.emoji}</div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl mb-3"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            {character.name}
          </h1>
          <p
            className="text-base sm:text-lg font-bold mb-5"
            style={{ color: "var(--color-accent-yellow)" }}
          >
            {character.tagline}
          </p>
          {/* Personality pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {character.personality.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: "rgba(167,139,250,0.18)",
                  color: "#c4b5fd",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">

          {/* Left: main content */}
          <div className="lg:col-span-2 flex flex-col gap-10">

            {/* About */}
            <section>
              <h2
                className="text-2xl sm:text-3xl mb-4"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                About{" "}
                <span style={{ color: "var(--color-accent-green)" }}>{character.name}</span>
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

            {/* Origin */}
            <section>
              <h2
                className="text-2xl sm:text-3xl mb-4"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                Origin
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {character.origin}
              </p>
            </section>

            {/* Catchphrase */}
            <section>
              <h2
                className="text-2xl sm:text-3xl mb-4"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                Catchphrase
              </h2>
              <blockquote
                className="text-xl sm:text-2xl italic pl-5 py-2"
                style={{
                  borderLeft: "3px solid #facc15",
                  color: "var(--color-text)",
                  fontFamily: "var(--font-nunito), sans-serif",
                }}
              >
                &ldquo;{character.catchphrase}&rdquo;
              </blockquote>
            </section>

            {/* Appears In */}
            {character.appearsIn && character.appearsIn.length > 0 && (
              <section>
                <h2
                  className="text-2xl sm:text-3xl mb-4"
                  style={{ fontFamily: "var(--font-fredoka), cursive" }}
                >
                  Appears In
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {character.appearsIn.map((game) => (
                    <Link
                      key={game.slug}
                      href={`/games/${game.slug}`}
                      className="rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <span style={{ fontSize: 28, flexShrink: 0 }}>{game.emoji}</span>
                      <div className="min-w-0">
                        <p
                          className="text-sm font-semibold leading-tight truncate"
                          style={{ fontFamily: "var(--font-fredoka), cursive" }}
                        >
                          {game.name}
                        </p>
                        <span
                          className="text-xs font-bold"
                          style={{ color: "var(--color-accent-green)" }}
                        >
                          Play free →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* TikTok Embed */}
            {character.tiktokUrl && (
              <section>
                <h2
                  className="text-2xl sm:text-3xl mb-4"
                  style={{ fontFamily: "var(--font-fredoka), cursive" }}
                >
                  Watch{" "}
                  <span style={{ color: "var(--color-accent-green)" }}>{character.name}</span>
                  {" "}in Action
                </h2>
                <div
                  className="rounded-2xl overflow-hidden p-4 flex justify-center"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <blockquote
                    className="tiktok-embed"
                    cite={character.tiktokUrl}
                    data-video-id={character.tiktokUrl.split("/video/")[1]?.split("?")[0]}
                    style={{ maxWidth: 605, minWidth: 325 }}
                  >
                    <section>
                      <a
                        href={character.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--color-accent-green)" }}
                      >
                        Watch on TikTok
                      </a>
                    </section>
                  </blockquote>
                  <Script
                    src="https://www.tiktok.com/embed.js"
                    strategy="lazyOnload"
                  />
                </div>
              </section>
            )}
          </div>

          {/* Right: sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-6">

            {/* Character Stats */}
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
                Character Stats
              </h3>

              {/* Personality */}
              <div className="mb-5">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Personality
                </p>
                <div className="flex flex-wrap gap-2">
                  {character.personality.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: "rgba(167,139,250,0.18)",
                        color: "#c4b5fd",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Abilities */}
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Abilities
                </p>
                <ul className="flex flex-col gap-2">
                  {character.abilities.map((ability) => (
                    <li
                      key={ability}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "var(--color-text)" }}
                    >
                      <span style={{ color: "#4ade80", flexShrink: 0 }}>✦</span>
                      {ability}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Related Characters */}
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
                Related Characters
              </h3>
              <div className="flex flex-col gap-3">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/characters/${rel.slug}`}
                    className="card-green flex items-center gap-3 rounded-xl px-3 py-2.5"
                  >
                    <span style={{ fontSize: 28 }}>{rel.emoji}</span>
                    <div className="min-w-0">
                      <p
                        className="text-sm font-semibold leading-tight truncate"
                        style={{ fontFamily: "var(--font-fredoka), cursive" }}
                      >
                        {rel.name}
                      </p>
                      <p
                        className="text-xs truncate"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {rel.tagline}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* More Italian Brainrot Characters */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2
                className="text-2xl sm:text-3xl"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                More{" "}
                <span style={{ color: "var(--color-accent-green)" }}>
                  Italian Brainrot Characters
                </span>
              </h2>
              <Link
                href="/characters"
                className="text-sm font-bold hover:underline shrink-0"
                style={{ color: "var(--color-accent-green)" }}
              >
                View all characters →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/characters/${rel.slug}`}
                  className="rounded-2xl p-5 flex items-start gap-4 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <span style={{ fontSize: 44, lineHeight: 1, flexShrink: 0 }}>
                    {rel.emoji}
                  </span>
                  <div className="min-w-0">
                    <p
                      className="text-base font-bold leading-snug mb-1 truncate"
                      style={{ fontFamily: "var(--font-fredoka), cursive" }}
                    >
                      {rel.name}
                    </p>
                    <p
                      className="text-xs leading-relaxed line-clamp-2"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {rel.tagline}
                    </p>
                    <span
                      className="text-xs font-bold mt-2 block"
                      style={{ color: "var(--color-accent-green)" }}
                    >
                      View character →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTAs */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Quiz CTA */}
          <div
            className="rounded-3xl p-7 text-center flex flex-col items-center gap-4"
            style={{
              background: "linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(250,204,21,0.07) 100%)",
              border: "1px solid rgba(255,107,107,0.25)",
            }}
          >
            <span style={{ fontSize: 40 }}>🎮</span>
            <div>
              <p
                className="text-xl mb-1"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                Are you a {character.name}?
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Take the quiz and find out your Brainrot character.
              </p>
            </div>
            <Link
              href="/quiz/brainrot-quiz"
              className="btn-primary px-6 py-2.5 rounded-xl font-bold text-sm"
            >
              Take the Quiz →
            </Link>
          </div>

          {/* Back to list */}
          <div
            className="rounded-3xl p-7 text-center flex flex-col items-center gap-4"
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
                Explore All Characters
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                View the complete Italian Brainrot character roster.
              </p>
            </div>
            <Link
              href="/characters"
              className="btn-outline px-6 py-2.5 rounded-xl font-bold text-sm"
            >
              See All Characters →
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}
