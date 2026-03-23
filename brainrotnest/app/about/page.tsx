import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About BrainrotNest",
  description:
    "Learn about BrainrotNest — the ultimate hub for Italian Brainrot memes, characters, quizzes, and games.",
};

export default function AboutPage() {
  return (
    <div
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka), cursive",
              color: "var(--color-text)",
            }}
          >
            About{" "}
            <span style={{ color: "#BFFF00" }}>BrainrotNest</span>
          </h1>
          <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
            BrainrotNest is the ultimate hub for Italian Brainrot memes,
            characters, quizzes, and games.
          </p>
        </div>

        {/* Divider */}
        <div
          className="mb-10"
          style={{ borderTop: "1px solid var(--color-border)" }}
        />

        {/* What We Do */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka), cursive",
              color: "var(--color-text)",
            }}
          >
            What We Do
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "📖",
                title: "Character Encyclopedia",
                desc: "Explore detailed profiles for every Italian Brainrot character — from Bombardiro Crocodilo to Tung Tung Sahur and beyond.",
              },
              {
                icon: "🧠",
                title: "Personality Quizzes",
                desc: "Discover which brainrot character matches your vibe with our fun, shareable personality quizzes.",
              },
              {
                icon: "🎮",
                title: "Curated Brainrot Games",
                desc: "A hand-picked collection of games featuring your favorite brainrot characters.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Who We're For */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka), cursive",
              color: "var(--color-text)",
            }}
          >
            Who We&apos;re For
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            BrainrotNest is built for Gen Z meme lovers worldwide — anyone who
            lives and breathes internet culture and can&apos;t get enough of the
            chaotic, hilarious world of Italian Brainrot.
          </p>
        </section>

        {/* Disclaimer */}
        <section
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "rgba(191,255,0,0.05)",
            border: "1px solid rgba(191,255,0,0.2)",
          }}
        >
          <h2
            className="text-lg font-bold mb-2"
            style={{ color: "#BFFF00" }}
          >
            Disclaimer
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            This is a fan-made site created for entertainment purposes only. We
            do not claim ownership of any meme characters, images, or content
            originating from third-party creators. All trademarks and content
            belong to their respective owners.
          </p>
        </section>

        {/* Back link */}
        <div className="mt-12">
          <Link
            href="/"
            className="text-sm transition-colors duration-200 hover:opacity-80"
            style={{ color: "#BFFF00" }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
