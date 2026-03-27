import type { Metadata } from "next"
import Link from "next/link"
import { games } from "@/lib/gamesData.pt-br"
import { ptBrAlternates } from "@/lib/ptBrAlternates"

export const metadata: Metadata = {
  title: "Brainrot Games — Jogue jogos Italian Brainrot grátis online",
  description:
    "Os melhores jogos de italian brainrot grátis no navegador. Brainrot Clicker, Steal a Brainrot, Brainrot Merge e mais. Sem download.",
  alternates: ptBrAlternates("games"),
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Jogos Italian Brainrot",
  description: "Jogos Italian Brainrot grátis online",
  numberOfItems: games.length,
  itemListElement: games.map((game, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: game.name,
    url: `https://brainrotnest.com/pt-br/games/${game.slug}`,
    description: game.metaDescription,
  })),
}

const faqs = [
  {
    q: "O que são jogos de italian brainrot?",
    a: "São jogos de navegador gratuitos baseados no universo meme Italian Brainrot — com personagens como Bombardiro Crocodilo e Tralalero Tralala. Há clickers, cartas multiplayer, quebra-cabeças e tower defense.",
  },
  {
    q: "Brainrot Clicker é grátis?",
    a: "Sim! Brainrot Clicker é totalmente grátis no navegador. Sem download e sem cadastro. Abra a página e comece a clicar para coletar personagens.",
  },
  {
    q: "O que é Steal a Brainrot?",
    a: "É um jogo online multiplayer de roubar cartas: cada jogador começa com personagens Brainrot e precisa roubar rivais para completar a coleção. Inspirado no jogo físico popular na comunidade.",
  },
  {
    q: "Preciso baixar algo?",
    a: "Não. Todos os jogos do BrainrotNest rodam no navegador — desktop e mobile. É só clicar em jogar.",
  },
  {
    q: "Qual o melhor jogo de italian brainrot?",
    a: "Brainrot Clicker é o mais jogado no solo; Steal a Brainrot Online é ótimo para jogar com amigos. Os dois são grátis aqui no BrainrotNest.",
  },
]

const featuredGames = games.filter((g) => g.featured)
const allGames = games

export default function GamesPagePtBr() {
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
            🎮 Jogos online grátis
          </span>
          <h1
            className="text-4xl sm:text-5xl mb-4"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Jogos{" "}
            <span style={{ color: "var(--color-accent-green)" }}>Brainrot</span>
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "var(--color-text-muted)" }}>
            Jogue Italian Brainrot grátis online — sem download. Clique, roube, mescle e defenda sua base no caos.
          </p>
        </div>

        <section className="mb-14">
          <h2
            className="text-2xl mb-6"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            ⭐ Destaques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredGames.map((game) => (
              <Link
                key={game.slug}
                href={`/pt-br/games/${game.slug}`}
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
                    Em breve
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
                    Jogar agora →
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl text-sm font-bold w-fit"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    Em breve
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2
            className="text-2xl mb-6"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Todos os jogos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allGames.map((game) => (
              <Link
                key={game.slug}
                href={`/pt-br/games/${game.slug}`}
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
                      Jogar →
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      Em breve
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2
            className="text-2xl sm:text-3xl mb-6"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Perguntas frequentes
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

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link
            href="/pt-br/quiz/brainrot-quiz"
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
                Acha que manja de Brainrot?
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Faça o quiz de Italian Brainrot e descubra.
              </p>
            </div>
            <span
              className="px-6 py-2.5 rounded-xl font-bold text-sm"
              style={{ backgroundColor: "var(--color-accent-yellow)", color: "#422006" }}
            >
              Ir ao quiz →
            </span>
          </Link>

          <Link
            href="/pt-br/characters"
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
                Conheça os personagens
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Explore o elenco completo de Italian Brainrot.
              </p>
            </div>
            <span className="btn-outline px-6 py-2.5 rounded-xl font-bold text-sm">
              Ver personagens →
            </span>
          </Link>
        </section>

      </div>
    </>
  )
}
