import type { Metadata } from "next";
import Link from "next/link";
import { ptBrAlternates } from "@/lib/ptBrAlternates";
import { characters as charactersPtBr } from "@/lib/charactersData.pt-br";
import { games as gamesPtBr } from "@/lib/gamesData.pt-br";

export const metadata: Metadata = {
  title: "BrainrotNest — O hub definitivo de Italian Brainrot",
  description:
    "Explore personagens, faça quizzes e jogue gratuitamente no BrainrotNest — sua wiki nº 1 de Italian Brainrot.",
  alternates: ptBrAlternates(""),
};

const nCharacters = charactersPtBr.length;
const nGames = gamesPtBr.filter((g) => g.isAvailable).length;
const nQuizzes = 2;

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://brainrotnest.com/pt-br/#website",
      url: "https://brainrotnest.com/pt-br",
      name: "BrainrotNest",
      description: "Wiki, quizzes e jogos de Italian Brainrot",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://brainrotnest.com/pt-br/characters?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://brainrotnest.com/pt-br/#organization",
      name: "BrainrotNest",
      url: "https://brainrotnest.com/pt-br",
      logo: "https://brainrotnest.com/logo.png",
    },
  ],
};

const featuredSlugs = new Set([
  "bombardiro-crocodilo",
  "tung-tung-sahur",
  "ballerina-cappuccina",
  "cappuccino-assassino",
]);

const characters = charactersPtBr.filter((c) => featuredSlugs.has(c.slug)).map((c) => ({
  name: c.name,
  emoji: c.emoji,
  slug: c.slug,
  desc: c.tagline,
}));

const characterPills = charactersPtBr.slice(0, 10).map((c) => ({
  name: c.name,
  emoji: c.emoji,
  slug: c.slug,
}));

const stats = [
  { value: String(nCharacters), label: "Personagens" },
  { value: String(nGames), label: "Jogos" },
  { value: "100", label: "Perguntas de quiz" },
  { value: "∞", label: "Brainrot" },
];

const quizCards = [
  {
    title: "Adivinhe o som!",
    desc: "Você consegue associar cada criatura brainrot ao barulho icônico dela?",
    tag: "Áudio",
  },
  {
    title: "Quiz de origens",
    desc: "Quanto você sabe sobre o lore por trás de cada personagem?",
    tag: "Lore",
  },
];

const homeGameSlugs = [
  "brainrot-clicker",
  "steal-a-brainrot-online",
  "brainrot-merge",
  "brainrot-tower",
] as const;

const games = homeGameSlugs
  .map((slug) => gamesPtBr.find((g) => g.slug === slug))
  .filter((g): g is NonNullable<typeof g> => Boolean(g))
  .map((game) => ({
    title: game.name,
    slug: game.slug,
    emoji: game.emoji,
    desc: game.tagline,
    tag: game.tags[0] ?? "Jogo",
  }));

export default function HomePagePtBr() {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
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
          🐊 QG do Italian Brainrot
        </span>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl leading-tight mb-4"
          style={{ fontFamily: "var(--font-fredoka), cursive" }}
        >
          O hub nº 1 de{" "}
          <span style={{ color: "var(--color-accent-red)" }}>Italian Brainrot</span>{" "}
          <span style={{ color: "var(--color-accent-yellow)" }}>no Brasil</span> 🧠
        </h1>

        <p
          className="max-w-xl text-lg sm:text-xl mb-6"
          style={{ color: "var(--color-text-muted)" }}
        >
          Quizzes · Personagens · Jogos grátis — tudo num lugar só
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-sm font-semibold">
          <span style={{ color: "var(--color-text-muted)" }}>
            {nCharacters} personagens
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span style={{ color: "var(--color-text-muted)" }}>{nGames} jogos</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span style={{ color: "var(--color-text-muted)" }}>{nQuizzes} quizzes</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span style={{ color: "var(--color-accent-green)", fontWeight: 700 }}>100% grátis</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link
            href="/pt-br/games/brainrot-clicker"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg btn-cta-game"
          >
            🎮 Jogar Brainrot Clicker
          </Link>
          <Link
            href="/pt-br/quiz/brainrot-quiz"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base btn-cta-quiz"
          >
            🧠 Qual personagem você é?
          </Link>
        </div>

        <div className="flex items-end justify-center gap-10" aria-hidden="true">
          <span className="text-5xl animate-float" style={{ animationDelay: "0s" }}>🐊</span>
          <span className="text-6xl animate-float" style={{ animationDelay: "0.5s" }}>🥁</span>
          <span className="text-5xl animate-float" style={{ animationDelay: "1s" }}>🩰</span>
        </div>
      </section>

      <section className="px-4 pb-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {characterPills.map((char) => (
              <Link
                key={char.slug}
                href={`/pt-br/characters/${char.slug}`}
                className="pill-char px-4 py-2 rounded-full text-sm font-semibold select-none"
              >
                {char.emoji} {char.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

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

      <section className="px-4 py-14">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl mb-8"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Teste seus conhecimentos
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            <Link
              href="/pt-br/quiz/brainrot-quiz"
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
                  ⭐ Destaque
                </span>
                <h3
                  className="text-2xl sm:text-3xl mb-3"
                  style={{ fontFamily: "var(--font-fredoka), cursive" }}
                >
                  Qual personagem de Italian Brainrot você é?
                </h3>
                <p style={{ color: "var(--color-text-muted)" }}>
                  Responda a perguntas caóticas e descubra sua fera interior. Será Bombardiro ou
                  Ballerina Cappuccina?
                </p>
              </div>
              <span
                className="mt-6 inline-flex items-center gap-2 font-bold"
                style={{ color: "var(--color-accent-yellow)" }}
              >
                Começar quiz →
              </span>
            </Link>

            <div className="flex flex-col gap-5">
              {quizCards.map((quiz) => (
                <Link
                  key={quiz.title}
                  href="/pt-br/quiz"
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
                    Jogar →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-3xl sm:text-4xl"
              style={{ fontFamily: "var(--font-fredoka), cursive" }}
            >
              Conheça os personagens
            </h2>
            <Link
              href="/pt-br/characters"
              className="text-sm font-bold hover:underline"
              style={{ color: "var(--color-accent-green)" }}
            >
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {characters.map((char) => (
              <Link
                key={char.slug}
                href={`/pt-br/characters/${char.slug}`}
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

      <section className="px-4 py-14">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{
              background:         "linear-gradient(135deg, rgba(250,204,21,0.07) 0%, rgba(74,222,128,0.05) 100%)",
              border: "1px solid rgba(250,204,21,0.2)",
            }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--color-accent-yellow)" }}>
                📝 Do blog
              </p>
              <h2
                className="text-2xl sm:text-3xl mb-2"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                Aprofunde-se no lore
              </h2>
              <p className="text-sm max-w-md" style={{ color: "var(--color-text-muted)" }}>
                Guias sobre personagens, origens dos memes e os melhores jogos para jogar agora.
              </p>
            </div>
            <Link
              href="/pt-br/blog"
              className="btn-outline px-7 py-3 rounded-xl font-bold text-sm shrink-0"
            >
              Ler o blog →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-3xl sm:text-4xl"
              style={{ fontFamily: "var(--font-fredoka), cursive" }}
            >
              Jogos Brainrot
            </h2>
            <Link
              href="/pt-br/games"
              className="text-sm font-bold hover:underline"
              style={{ color: "var(--color-accent-green)" }}
            >
              Todos os jogos →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {games.map((game) => (
              <Link
                key={game.slug}
                href={`/pt-br/games/${game.slug}`}
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
