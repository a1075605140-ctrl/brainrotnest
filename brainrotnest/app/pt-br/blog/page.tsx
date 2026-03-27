import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blogData.pt-br";
import { ptBrAlternates } from "@/lib/ptBrAlternates";

export const metadata: Metadata = {
  title: "Blog Brainrot — Guias, personagens Italian Brainrot e mais",
  description:
    "Tudo sobre Italian Brainrot: guias de personagens, origens dos memes, reviews de jogos e mais no blog BrainrotNest.",
  alternates: ptBrAlternates("blog"),
};

export default function BlogPagePtBr() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <span
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
          style={{
            backgroundColor: "rgba(250,204,21,0.1)",
            border: "1px solid rgba(250,204,21,0.2)",
            color: "var(--color-accent-yellow)",
          }}
        >
          📝 Blog
        </span>
        <h1
          className="text-4xl sm:text-5xl mb-4"
          style={{ fontFamily: "var(--font-fredoka), cursive" }}
        >
          Brainrot{" "}
          <span style={{ color: "var(--color-accent-yellow)" }}>Blog</span>
        </h1>
        <p className="text-lg max-w-2xl" style={{ color: "var(--color-text-muted)" }}>
          Aprenda tudo sobre Italian Brainrot: guias de personagens, origens dos memes, reviews de jogos e mais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/pt-br/blog/${post.slug}`}
            className="rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <span style={{ fontSize: 48, lineHeight: 1 }}>{post.emoji}</span>
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span>{post.publishDate}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h2
              className="text-xl leading-snug"
              style={{ fontFamily: "var(--font-fredoka), cursive" }}
            >
              {post.title}
            </h2>
            <p
              className="text-sm leading-relaxed flex-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              {post.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "rgba(74,222,128,0.12)",
                    color: "var(--color-accent-green)",
                    border: "1px solid rgba(74,222,128,0.2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span
              className="text-sm font-bold"
              style={{ color: "var(--color-accent-red)" }}
            >
              Ler mais →
            </span>
          </Link>
        ))}
      </div>

      <div
        className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <p className="text-sm font-semibold" style={{ color: "var(--color-text-muted)" }}>
          Explore o BrainrotNest:
        </p>
        <Link
          href="/pt-br/quiz/brainrot-quiz"
          className="btn-primary px-5 py-2 rounded-xl text-sm font-bold"
        >
          Fazer o quiz →
        </Link>
        <Link
          href="/pt-br/characters"
          className="btn-outline px-5 py-2 rounded-xl text-sm font-bold"
        >
          Personagens →
        </Link>
        <Link
          href="/pt-br/games"
          className="btn-outline px-5 py-2 rounded-xl text-sm font-bold"
        >
          Jogos →
        </Link>
      </div>
    </div>
  );
}
