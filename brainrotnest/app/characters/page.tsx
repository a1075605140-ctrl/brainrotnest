import type { Metadata } from "next"
import Link from "next/link"
import { characters } from "@/lib/charactersData"
import CharactersClient from "./CharactersClient"

export const metadata: Metadata = {
  title: "All Italian Brainrot Characters — Complete List 2026",
  description:
    "The complete list of all 22 Italian Brainrot characters including Bombardiro Crocodilo, Tung Tung Sahur, La Vaca Saturno Saturnita, Boneca Ambalabu and more. Full wiki with descriptions.",
  alternates: {
    canonical: "https://www.brainrotnest.com/characters",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Italian Brainrot Characters",
  description: "Complete list of all Italian Brainrot characters",
  numberOfItems: characters.length,
  itemListElement: characters.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    url: `https://www.brainrotnest.com/characters/${c.slug}`,
  })),
}

const faqs = [
  {
    q: "What are Italian Brainrot characters?",
    a: "Italian Brainrot characters are a collection of absurdist, surreal meme creatures that originated on the Italian internet in 2024. Each character combines unexpected concepts — like a flying crocodile bomber or a cow in Saturn's orbit — with distinct personalities, catchphrases, and abilities. They form a shared fictional universe known as the Italian Brainrot universe.",
  },
  {
    q: "Who is the most popular Italian Brainrot character?",
    a: "Bombardiro Crocodilo is widely considered the most popular and iconic Italian Brainrot character. As the original character that started the entire meme phenomenon, he holds legendary status in the community. Tung Tung Sahur and Ballerina Cappuccina are also among the most recognized characters.",
  },
  {
    q: "What is Bombardiro Crocodilo?",
    a: "Bombardiro Crocodilo is a flying crocodile with bomber aircraft capabilities — the founding figure of Italian Brainrot. He is known for aerial bombardments, his signature war cry 'BOMBARDIRO!!!', and being the catalyst that launched the entire Italian Brainrot meme universe in 2024.",
  },
  {
    q: "How many Italian Brainrot characters are there?",
    a: "The official Italian Brainrot character roster documented on BrainrotNest currently includes 22 characters: Bombardiro Crocodilo, Tung Tung Sahur, Tralalero Tralala, Ballerina Cappuccina, Brr Brr Patapim, Cappuccino Assassino, Lirili Larila, Bobrito Bandito, Frulli Frulla, La Vaca Saturno Satalite, La Vaca Saturno Saturnita, Trippi Troppi, Chimpanzini Bananini, Bombombini Gusini, Frigo Camello, Cocofanto Elefanto, Boneca Ambalabu, Burbaloni Luliloli, Glorbo Fruttodrillo, Bananita Dolphina, Giraffa Celeste, and Zibra Zubra Zibralini.",
  },
  {
    q: "Where do Italian Brainrot characters come from?",
    a: "Italian Brainrot characters originated primarily from Italian and Indonesian internet communities in 2024. The trend started with absurdist AI-generated imagery and meme videos featuring surreal creature combinations paired with repetitive, catchy audio. The memes spread globally through TikTok, YouTube, and Discord, creating one of the most distinctive internet subcultures of the mid-2020s.",
  },
]

export default function CharactersPage() {
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
            🧬 Complete Wiki
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl mb-4 leading-tight"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            All Italian Brainrot{" "}
            <span style={{ color: "var(--color-accent-green)" }}>Characters</span>
          </h1>

          <p className="text-base sm:text-lg max-w-2xl leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            The complete wiki — <strong style={{ color: "var(--color-text)" }}>22 italian brainrot characters</strong> documented with full lore,
            abilities, and origin stories. The definitive{" "}
            <strong style={{ color: "var(--color-text)" }}>italian brainrot list</strong> from Bombardiro Crocodilo
            to La Vaca Saturno Saturnita.
          </p>

          {/* CTA links */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/quiz/brainrot-quiz"
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
            >
              🎮 Which Character Are You?
            </Link>
            <Link
              href="/blog/all-italian-brainrot-characters-complete-list"
              className="btn-outline inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
            >
              📖 Read the Full Guide
            </Link>
          </div>
        </div>

        {/* Client grid + search */}
        <CharactersClient characters={characters} />

        {/* FAQ Section */}
        <section className="mt-24" aria-label="Frequently Asked Questions">
          <h2
            className="text-3xl sm:text-4xl mb-8"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Frequently Asked{" "}
            <span style={{ color: "var(--color-accent-yellow)" }}>Questions</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <h3
                  className="text-lg mb-2"
                  style={{ fontFamily: "var(--font-fredoka), cursive", color: "var(--color-text)" }}
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

        {/* Bottom CTA */}
        <div
          className="mt-16 rounded-3xl p-8 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(74,222,128,0.08) 0%, rgba(250,204,21,0.06) 100%)",
            border: "1px solid rgba(74,222,128,0.2)",
          }}
        >
          <p className="text-2xl mb-2" style={{ fontFamily: "var(--font-fredoka), cursive" }}>
            Which Italian Brainrot character are you? 🧠
          </p>
          <p className="text-sm mb-5" style={{ color: "var(--color-text-muted)" }}>
            Take the quiz and find your Brainrot alter ego in 60 seconds.
          </p>
          <Link
            href="/quiz/brainrot-quiz"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
          >
            🎮 Take the Quiz
          </Link>
        </div>
      </div>
    </>
  )
}
