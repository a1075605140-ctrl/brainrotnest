import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blogData";
import { enAlternates } from "@/lib/ptBrAlternates";

export const metadata: Metadata = {
  title: "Brainrot Blog — Italian Brainrot Guides, Characters & More",
  description:
    "Learn everything about Italian Brainrot. Character guides, meme origins, game reviews and more on the BrainrotNest blog.",
  alternates: enAlternates("blog"),
};

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
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
          Learn everything about Italian Brainrot. Character guides, meme origins, game
          reviews and more.
        </p>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
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
              Read More →
            </span>
          </Link>
        ))}
      </div>

      {/* Bottom internal links */}
      <div
        className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <p className="text-sm font-semibold" style={{ color: "var(--color-text-muted)" }}>
          Explore BrainrotNest:
        </p>
        <Link
          href="/quiz/brainrot-quiz"
          className="btn-primary px-5 py-2 rounded-xl text-sm font-bold"
        >
          Take the Quiz →
        </Link>
        <Link
          href="/characters"
          className="btn-outline px-5 py-2 rounded-xl text-sm font-bold"
        >
          Meet Characters →
        </Link>
        <Link
          href="/games"
          className="btn-outline px-5 py-2 rounded-xl text-sm font-bold"
        >
          Play Games →
        </Link>
      </div>
    </div>
  );
}
