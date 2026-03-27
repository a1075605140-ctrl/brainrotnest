import type { Metadata } from "next";
import Link from "next/link";
import { quizzesPtBr } from "@/lib/quizData.pt-br";
import { ptBrAlternates } from "@/lib/ptBrAlternates";

export const metadata: Metadata = {
  title: "Quiz Brainrot — Qual personagem de Italian Brainrot você é?",
  description:
    "Faça o quiz grátis e descubra qual personagem de Italian Brainrot combina com você. Também teste seu conhecimento de lore!",
  alternates: ptBrAlternates("quiz"),
};

const faqItems = [
  {
    q: "O que é um quiz brainrot?",
    a: "É um teste de personalidade ou conhecimento baseado no Italian Brainrot — memes virais com híbridos absurdos e nomes italianos. Temos quiz de personalidade e de conhecimento sobre o lore.",
  },
  {
    q: "Qual personagem de italian brainrot sou eu?",
    a: "Faça o quiz de personalidade acima! Pode ser Bombardiro Crocodilo (caos), Ballerina Cappuccina (elegância), Tung Tung Sahur (ritmo) ou Cappuccino Assassino — cada um reflete um arquétipo.",
  },
  {
    q: "Quantos personagens existem?",
    a: "O universo cresceu com dezenas de personagens. Os mais famosos incluem Bombardiro, Tung Tung Sahur, Ballerina Cappuccina, Cappuccino Assassino, Tralalero Tralala, Brr Brr Patapim e muitos outros.",
  },
  {
    q: "O que é Italian Brainrot?",
    a: "É uma tendência meme de 2024–2025 com imagens de IA de híbridos bizarros com nomes que soam italianos. Explodiu no TikTok, YouTube Shorts e Reddit.",
  },
  {
    q: "O quiz é confiável?",
    a: "O de personalidade é divertido e combina vibes com arquétipos — não é ciência. O de conhecimento tem respostas objetivas certas ou erradas sobre fatos do lore.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function QuizPagePtBr() {
  const [personalityQuiz, knowledgeQuiz] = [quizzesPtBr[0], quizzesPtBr[1]];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-14 text-center">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-5"
            style={{
              backgroundColor: "rgba(250,204,21,0.12)",
              border: "1px solid rgba(250,204,21,0.25)",
              color: "var(--color-accent-yellow)",
            }}
          >
            🧠 Quizzes Italian Brainrot
          </span>
          <h1
            className="text-4xl sm:text-6xl mb-5 leading-tight"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Descubra seu{" "}
            <span style={{ color: "var(--color-accent-yellow)" }}>Brainrot</span> interior
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Veja qual personagem combina com você ou teste seu conhecimento de lore. Dois quizzes. Zero sossego.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <Link
            href={`/pt-br/quiz/${personalityQuiz.slug}`}
            className="rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 group"
            style={{
              backgroundColor: "rgba(250,204,21,0.07)",
              border: "1px solid rgba(250,204,21,0.22)",
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-5xl">🎭</span>
              <span
                className="px-3 py-1 rounded-full text-xs font-bold shrink-0 mt-1"
                style={{
                  backgroundColor: "rgba(250,204,21,0.2)",
                  color: "var(--color-accent-yellow)",
                }}
              >
                ⭐ Destaque
              </span>
            </div>

            <div>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-bold inline-block mb-3"
                style={{
                  backgroundColor: "rgba(250,204,21,0.15)",
                  color: "var(--color-accent-yellow)",
                }}
              >
                Quiz de personalidade
              </span>
              <h2
                className="text-2xl leading-snug mb-2"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                {personalityQuiz.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {personalityQuiz.description}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-1">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  color: "var(--color-text-muted)",
                }}
              >
                📝 {personalityQuiz.questions.length} perguntas
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  color: "var(--color-text-muted)",
                }}
              >
                ⏱️ ~2 min
              </span>
            </div>

            <span
              className="mt-2 text-sm font-bold transition-colors"
              style={{ color: "var(--color-accent-yellow)" }}
            >
              Começar quiz →
            </span>
          </Link>

          <Link
            href={`/pt-br/quiz/${knowledgeQuiz.slug}`}
            className="rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 group"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-5xl">🧠</span>
            </div>

            <div>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-bold inline-block mb-3"
                style={{
                  backgroundColor: "rgba(74,222,128,0.12)",
                  color: "var(--color-accent-green)",
                }}
              >
                Quiz de conhecimento
              </span>
              <h2
                className="text-2xl leading-snug mb-2"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                {knowledgeQuiz.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {knowledgeQuiz.description}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-1">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  color: "var(--color-text-muted)",
                }}
              >
                📝 {knowledgeQuiz.questions.length} perguntas
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  color: "var(--color-text-muted)",
                }}
              >
                ⏱️ ~2 min
              </span>
            </div>

            <span
              className="mt-2 text-sm font-bold transition-colors"
              style={{ color: "var(--color-accent-green)" }}
            >
              Começar quiz →
            </span>
          </Link>
        </div>

        <section>
          <h2
            className="text-3xl mb-8"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Perguntas{" "}
            <span style={{ color: "var(--color-accent-yellow)" }}>frequentes</span>
          </h2>
          <div className="flex flex-col gap-4">
            {faqItems.map((item, i) => (
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
                  style={{ fontFamily: "var(--font-fredoka), cursive" }}
                >
                  {item.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-14 text-center">
          <p className="text-sm mb-3" style={{ color: "var(--color-text-muted)" }}>
            Quer conhecer os personagens antes do quiz?
          </p>
          <Link
            href="/pt-br/characters"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 btn-outline"
          >
            🧬 Ver todos os personagens →
          </Link>
        </div>
      </div>
    </>
  );
}
