import type { Metadata } from "next"
import Link from "next/link"
import { characters } from "@/lib/charactersData.pt-br"
import { ptBrAlternates } from "@/lib/ptBrAlternates"
import CharactersClientPtBr from "./CharactersClient"

export const metadata: Metadata = {
  title: "Todos os personagens de Italian Brainrot — lista completa 2026",
  description:
    "Lista completa dos personagens de Italian Brainrot: Bombardiro Crocodilo, Tung Tung Sahur, La Vaca Saturno Saturnita e mais. Wiki com descrições.",
  alternates: ptBrAlternates("characters"),
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Personagens Italian Brainrot",
  description: "Lista completa de personagens Italian Brainrot",
  numberOfItems: characters.length,
  itemListElement: characters.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    url: `https://brainrotnest.com/pt-br/characters/${c.slug}`,
  })),
}

const faqs = [
  {
    q: "O que são personagens de Italian Brainrot?",
    a: "São criaturas memes surrealistas que nasceram na internet italiana em 2024. Cada uma mistura conceitos inesperados — como um crocodilo bombardeiro — com personalidade, bordões e habilidades. Formam um universo ficcional compartilhado.",
  },
  {
    q: "Quem é o personagem mais popular?",
    a: "Bombardiro Crocodilo é amplamente considerado o mais icônico, por ter iniciado o fenômeno. Tung Tung Sahur e Ballerina Cappuccina também estão entre os mais reconhecidos.",
  },
  {
    q: "O que é Bombardiro Crocodilo?",
    a: "É um crocodilo voador com poder de bombardeiro — a figura fundadora do Italian Brainrot, conhecido pelo grito “BOMBARDIRO!!!” e por ter impulsionado o universo meme em 2024.",
  },
  {
    q: "Quantos personagens existem?",
    a: `O elenco documentado no BrainrotNest inclui ${characters.length} personagens, incluindo Bombardiro Crocodilo, Tung Tung Sahur, Tralalero Tralala, Ballerina Cappuccina e outros até Zibra Zubra Zibralini.`,
  },
  {
    q: "De onde vieram esses personagens?",
    a: "Tiveram origem principalmente em comunidades da internet italiana e indonesia em 2024, com imagens absurdas geradas por IA e áudios repetitivos. Viralizaram no TikTok, YouTube e Discord.",
  },
]

export default function CharactersPagePtBr() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
            style={{
              backgroundColor: "rgba(74,222,128,0.12)",
              border: "1px solid rgba(74,222,128,0.25)",
              color: "var(--color-accent-green)",
            }}
          >
            🧬 Wiki completa
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl mb-4 leading-tight"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Todos os personagens de{" "}
            <span style={{ color: "var(--color-accent-green)" }}>Italian Brainrot</span>
          </h1>

          <p className="text-base sm:text-lg max-w-2xl leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            A wiki definitiva —{" "}
            <strong style={{ color: "var(--color-text)" }}>{characters.length} personagens</strong> com lore,
            habilidades e histórias de origem. A lista completa de Bombardiro Crocodilo a La Vaca Saturno Saturnita.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/pt-br/quiz/brainrot-quiz"
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
            >
              🎮 Qual personagem você é?
            </Link>
            <Link
              href="/pt-br/blog/all-italian-brainrot-characters-complete-list"
              className="btn-outline inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
            >
              📖 Guia completo
            </Link>
          </div>
        </div>

        <CharactersClientPtBr characters={characters} />

        <section className="mt-24" aria-label="Perguntas frequentes">
          <h2
            className="text-3xl sm:text-4xl mb-8"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Perguntas{" "}
            <span style={{ color: "var(--color-accent-yellow)" }}>frequentes</span>
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

        <div
          className="mt-16 rounded-3xl p-8 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(74,222,128,0.08) 0%, rgba(250,204,21,0.06) 100%)",
            border: "1px solid rgba(74,222,128,0.2)",
          }}
        >
          <p className="text-2xl mb-2" style={{ fontFamily: "var(--font-fredoka), cursive" }}>
            Qual personagem de Italian Brainrot você é? 🧠
          </p>
          <p className="text-sm mb-5" style={{ color: "var(--color-text-muted)" }}>
            Faça o quiz e descubra seu alter ego em menos de um minuto.
          </p>
          <Link
            href="/pt-br/quiz/brainrot-quiz"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
          >
            🎮 Fazer o quiz
          </Link>
        </div>
      </div>
    </>
  )
}
