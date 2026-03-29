import type { Metadata } from "next";
import BrainrotTranslatorClient from "@/components/BrainrotTranslatorClient";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brainrot Translator — Convert Any Text to Italian Brainrot Language",
  description:
    "Translate normal text into Italian Brainrot language! Convert your words using Bombardiro Crocodilo, Tung Tung Sahur, Tralalero Tralala and all your favorite brainrot characters. Free online brainrot text generator.",
  keywords: [
    "brainrot translator",
    "italian brainrot translator",
    "brainrot language converter",
    "brainrot text generator",
    "translate to brainrot",
    "bombardiro crocodilo translator",
    "tung tung sahur translator",
    "brainrot speak",
    "italian brainrot language",
    "brainrot text",
  ],
  alternates: {
    canonical: "https://www.brainrotnest.com/brainrot-translator",
  },
  openGraph: {
    title: "Brainrot Translator — Convert Any Text to Italian Brainrot",
    description:
      "Turn any normal text into pure Italian Brainrot chaos! Powered by Bombardiro Crocodilo, Tung Tung Sahur, and the full brainrot squad.",
    url: "https://www.brainrotnest.com/brainrot-translator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brainrot Translator — Convert Any Text to Italian Brainrot",
    description:
      "Turn any normal text into pure Italian Brainrot chaos! Free online tool.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Brainrot Translator",
  url: "https://www.brainrotnest.com/brainrot-translator",
  description:
    "Free online tool to translate normal English text into Italian Brainrot language. Uses vocabulary from Bombardiro Crocodilo, Tung Tung Sahur, Tralalero Tralala and more.",
  applicationCategory: "EntertainmentApplication",
  operatingSystem: "Web",
  isAccessibleForFree: true,
  inLanguage: "en",
};

export default function BrainrotTranslatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Brainrot Translator", href: "/brainrot-translator" },
        ]}
      />

      <div className="min-h-screen py-12 px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-4xl">🐊</span>
            <span className="text-4xl">☕</span>
            <span className="text-4xl">🥁</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka), cursive",
              color: "var(--color-text)",
              lineHeight: "1.15",
            }}
          >
            Brainrot Translator
          </h1>
          <p
            className="text-lg max-w-xl mx-auto mb-2"
            style={{ color: "var(--color-text-muted)", lineHeight: "1.6" }}
          >
            Convert any normal text into{" "}
            <span style={{ color: "var(--color-accent-red)" }}>
              Italian Brainrot language
            </span>
            . Powered by the full brainrot squad.
          </p>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Choose your intensity, type your text, and unleash the brainrot.
          </p>
        </div>

        {/* Main Translator Component */}
        <BrainrotTranslatorClient />

        {/* SEO Content Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-fredoka), cursive",
                color: "var(--color-text)",
              }}
            >
              What is Italian Brainrot Language?
            </h2>
            <div
              className="space-y-3 text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              <p>
                <strong style={{ color: "var(--color-text)" }}>Italian Brainrot</strong> is
                a viral internet subculture that originated in 2024, featuring AI-generated
                surreal characters with absurd Italian-inspired names and chaotic personalities.
                The &quot;brainrot language&quot; refers to the unique vocabulary, catchphrases,
                and speech patterns associated with these characters.
              </p>
              <p>
                Characters like{" "}
                <Link
                  href="/characters/bombardiro-crocodilo"
                  style={{ color: "var(--color-accent-red)" }}
                >
                  Bombardiro Crocodilo
                </Link>
                ,{" "}
                <Link
                  href="/characters/tung-tung-sahur"
                  style={{ color: "var(--color-accent-red)" }}
                >
                  Tung Tung Sahur
                </Link>
                , and{" "}
                <Link
                  href="/characters/tralalero-tralala"
                  style={{ color: "var(--color-accent-red)" }}
                >
                  Tralalero Tralala
                </Link>{" "}
                have developed their own vocabulary, phrases, and speech quirks that fans use
                in everyday conversation — creating a distinctive &quot;brainrot dialect.&quot;
              </p>
              <p>
                Our Brainrot Translator replaces common English words and phrases with their
                brainrot equivalents, letting you communicate entirely in the language of the
                brainrot dimension. Choose from three intensity levels: Mild Brainrot for
                subtle chaos, Medium Brainrot for certified brainrot energy, or MAXIMUM
                BRAINROT for full Bombardiro mode.
              </p>
            </div>

            <h2
              className="text-2xl font-bold mt-8 mb-4"
              style={{
                fontFamily: "var(--font-fredoka), cursive",
                color: "var(--color-text)",
              }}
            >
              How to Use the Brainrot Translator
            </h2>
            <ol
              className="space-y-2 text-sm leading-relaxed list-decimal list-inside"
              style={{ color: "var(--color-text-muted)" }}
            >
              <li>
                <strong style={{ color: "var(--color-text)" }}>Choose your intensity</strong>{" "}
                — Mild, Medium, or MAXIMUM BRAINROT
              </li>
              <li>
                <strong style={{ color: "var(--color-text)" }}>Type or paste your text</strong>{" "}
                — Any normal sentence or message works
              </li>
              <li>
                <strong style={{ color: "var(--color-text)" }}>Click Translate</strong>{" "}
                — Watch your words transform into pure brainrot
              </li>
              <li>
                <strong style={{ color: "var(--color-text)" }}>Copy and share</strong>{" "}
                — Send your brainrot translation to friends
              </li>
            </ol>
          </div>

          {/* Related Links */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              {
                href: "/characters",
                emoji: "🐊",
                title: "Character Wiki",
                desc: "Learn the full lore of every brainrot character",
              },
              {
                href: "/quiz",
                emoji: "🧠",
                title: "Brainrot Quiz",
                desc: "Test your Italian Brainrot knowledge",
              },
              {
                href: "/italian-brainrot-name-generator",
                emoji: "⚡",
                title: "Name Generator",
                desc: "Generate your own Italian Brainrot name",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col gap-2 p-5 rounded-2xl transition-all duration-200 group"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
                }}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span
                  className="font-bold text-sm"
                  style={{
                    fontFamily: "var(--font-fredoka), cursive",
                    color: "var(--color-text)",
                  }}
                >
                  {item.title}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
