import type { Metadata } from "next";
import Link from "next/link";
import { quizzes } from "@/lib/quizData";

export const metadata: Metadata = {
  title: "Brainrot Quiz — Which Italian Brainrot Character Are You?",
  description:
    "Take our free brainrot quiz and find out which Italian Brainrot character you are. Also test your Italian brainrot knowledge with our lore quiz!",
  alternates: {
    canonical: "https://www.brainrotnest.com/quiz",
  },
};

const faqItems = [
  {
    q: "What is a brainrot quiz?",
    a: "A brainrot quiz is a fun personality or knowledge test based on Italian Brainrot — the viral internet trend of AI-generated Italian animal hybrids with absurd names. Our quizzes either match you to a character based on your personality, or test how much lore you actually know.",
  },
  {
    q: "Which Italian brainrot character are you?",
    a: "Take our personality quiz above to find out! You might be Bombardiro Crocodilo (the chaos agent), Ballerina Cappuccina (the elegant one), Tung Tung Sahur (the rhythm keeper), or Cappuccino Assassino (the silent destroyer). Each character reflects a different personality archetype.",
  },
  {
    q: "How many Italian brainrot characters are there?",
    a: "The Italian Brainrot universe has grown to include dozens of characters. The most popular include Bombardiro Crocodilo, Tung Tung Sahur, Ballerina Cappuccina, Cappuccino Assassino, Tralalero Tralala, Brr Brr Patapim, and many more. New characters are still being created by the community.",
  },
  {
    q: "What is Italian brainrot?",
    a: "Italian Brainrot is a viral internet meme trend originating in 2024-2025 featuring AI-generated images of bizarre animal-human hybrids with Italian-sounding names. They spread rapidly across TikTok, YouTube Shorts, and Reddit, becoming one of the most recognisable internet subcultures of 2025-2026.",
  },
  {
    q: "Is this quiz accurate?",
    a: "The personality quiz is designed for fun and is based on matching your vibe to character archetypes — not science. The knowledge quiz tests real facts about Italian Brainrot characters and lore, so those answers are objectively correct or incorrect. Either way, you'll have fun.",
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

export default function QuizPage() {
  const [personalityQuiz, knowledgeQuiz] = [quizzes[0], quizzes[1]];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="mb-14 text-center">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-5"
            style={{
              backgroundColor: "rgba(250,204,21,0.12)",
              border: "1px solid rgba(250,204,21,0.25)",
              color: "var(--color-accent-yellow)",
            }}
          >
            🧠 Italian Brainrot Quizzes
          </span>
          <h1
            className="text-4xl sm:text-6xl mb-5 leading-tight"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Find Your Inner{" "}
            <span style={{ color: "var(--color-accent-yellow)" }}>Brainrot</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Discover which Italian Brainrot character matches your personality, or
            put your lore knowledge to the ultimate test. Two quizzes. Zero chill.
          </p>
        </div>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {/* Featured — Personality */}
          <Link
            href={`/quiz/${personalityQuiz.slug}`}
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
                ⭐ Featured
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
                Personality Quiz
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
                📝 {personalityQuiz.questions.length} questions
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  color: "var(--color-text-muted)",
                }}
              >
                ⏱️ ~2 mins
              </span>
            </div>

            <span
              className="mt-2 text-sm font-bold transition-colors"
              style={{ color: "var(--color-accent-yellow)" }}
            >
              Start Quiz →
            </span>
          </Link>

          {/* Knowledge Quiz */}
          <Link
            href={`/quiz/${knowledgeQuiz.slug}`}
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
                Knowledge Quiz
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
                📝 {knowledgeQuiz.questions.length} questions
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  color: "var(--color-text-muted)",
                }}
              >
                ⏱️ ~2 mins
              </span>
            </div>

            <span
              className="mt-2 text-sm font-bold transition-colors"
              style={{ color: "var(--color-accent-green)" }}
            >
              Start Quiz →
            </span>
          </Link>
        </div>

        {/* FAQ */}
        <section>
          <h2
            className="text-3xl mb-8"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Frequently Asked{" "}
            <span style={{ color: "var(--color-accent-yellow)" }}>Questions</span>
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

        {/* Internal link to characters */}
        <div className="mt-14 text-center">
          <p className="text-sm mb-3" style={{ color: "var(--color-text-muted)" }}>
            Want to learn more about the characters before you quiz?
          </p>
          <Link
            href="/characters"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 btn-outline"
          >
            🧬 See All Characters →
          </Link>
        </div>
      </div>
    </>
  );
}
