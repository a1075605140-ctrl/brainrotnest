import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  getBlogPostBySlugPtBr,
  getOtherBlogPostsPtBr,
  getAllBlogSlugsPtBr,
  type BlogSection,
} from "@/lib/blogData.pt-br"
import FaqAccordion from "../../../blog/[slug]/FaqAccordion"
import TocLinks from "../../../blog/[slug]/TocLinks"
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd"
import { ptBrAlternates } from "@/lib/ptBrAlternates"

type Props = {
  params: Promise<{ slug: string }>
}

function ptBrHref(href: string): string {
  if (href.startsWith("#")) return href
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:")) {
    return href
  }
  if (href.startsWith("/pt-br")) return href
  return `/pt-br${href}`
}

export async function generateStaticParams() {
  return getAllBlogSlugsPtBr().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlugPtBr(slug)
  if (!post) return {}
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: ptBrAlternates(`blog/${slug}`),
  }
}

function headingToId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2
          key={index}
          id={headingToId(section.text!)}
          className="text-2xl sm:text-3xl mt-10 mb-4 scroll-mt-24"
          style={{
            fontFamily: "var(--font-fredoka), cursive",
            color: "var(--color-accent-green)",
          }}
        >
          {section.text}
        </h2>
      )

    case "h3":
      return (
        <h3
          key={index}
          className="text-xl sm:text-2xl mt-8 mb-3"
          style={{ fontFamily: "var(--font-fredoka), cursive" }}
        >
          {section.href ? (
            <Link
              href={ptBrHref(section.href)}
              className="hover:underline"
              style={{ color: "var(--color-text)" }}
            >
              {section.text}
            </Link>
          ) : (
            section.text
          )}
        </h3>
      )

    case "p":
      return (
        <p
          key={index}
          className="text-base mb-4"
          style={{ lineHeight: 1.8, color: "rgba(255,255,255,0.8)" }}
        >
          {section.text}
        </p>
      )

    case "ul":
      return (
        <ul key={index} className="flex flex-col gap-3 mb-6">
          {section.items?.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              <span
                style={{ color: "#4ade80", flexShrink: 0, marginTop: 4, fontSize: 10 }}
              >
                ✦
              </span>
              <span style={{ lineHeight: 1.75 }}>{item}</span>
            </li>
          ))}
          {section.linkItems?.map((item, i) => (
            <li key={`link-${i}`} className="flex items-start gap-2.5 text-sm">
              <span
                style={{ color: "#4ade80", flexShrink: 0, marginTop: 4, fontSize: 10 }}
              >
                ✦
              </span>
              <Link
                href={ptBrHref(item.href)}
                className="font-semibold hover:underline"
                style={{ color: "#4ade80", lineHeight: 1.75 }}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      )

    case "faq":
      return <FaqAccordion key={index} faqs={section.faqs!} />

    default:
      return null
  }
}

export default async function BlogPostPagePtBr({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlugPtBr(slug)
  if (!post) notFound()

  const relatedPosts = getOtherBlogPostsPtBr(slug)

  const h2Sections = post.content
    .filter((s) => s.type === "h2" && s.text)
    .map((s) => ({ text: s.text!, id: headingToId(s.text!) }))

  const faqSections = post.content.filter((s) => s.type === "faq" && s.faqs)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    publisher: {
      "@type": "Organization",
      name: "BrainrotNest",
      url: "https://brainrotnest.com/pt-br",
    },
  }

  const faqJsonLd =
    faqSections.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqSections.flatMap((s) =>
            s.faqs!.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            }))
          ),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: "https://brainrotnest.com/pt-br" },
          { name: "Blog", url: "https://brainrotnest.com/pt-br/blog" },
          { name: post.title, url: `https://brainrotnest.com/pt-br/blog/${post.slug}` },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <nav
          className="flex items-center gap-2 text-sm mb-8 flex-wrap"
          style={{ color: "var(--color-text-muted)" }}
        >
          <Link
            href="/pt-br"
            className="hover:underline"
            style={{ color: "var(--color-text-muted)" }}
          >
            Início
          </Link>
          <span>/</span>
          <Link
            href="/pt-br/blog"
            className="hover:underline"
            style={{ color: "var(--color-text-muted)" }}
          >
            Blog
          </Link>
          <span>/</span>
          <span
            className="truncate max-w-xs"
            style={{ color: "var(--color-text)" }}
          >
            {post.title}
          </span>
        </nav>

        <div className="mb-10">
          <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 20 }}>{post.emoji}</div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl mb-5 leading-tight"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: "rgba(74,222,128,0.12)",
                  color: "var(--color-accent-green)",
                  border: "1px solid rgba(74,222,128,0.2)",
                }}
              >
                {tag}
              </span>
            ))}
            <span
              className="text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              {post.publishDate}
            </span>
            <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              · {post.readingTime}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">

          <article className="lg:col-span-3 min-w-0">
            {post.content.map((section, i) => renderSection(section, i))}
          </article>

          <aside className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-24">

            <div
              className="rounded-2xl p-5"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <h3
                className="text-base font-bold mb-4"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                Neste artigo
              </h3>
              <TocLinks items={h2Sections} />
            </div>

            <div
              className="rounded-2xl p-5"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <h3
                className="text-base font-bold mb-4"
                style={{ fontFamily: "var(--font-fredoka), cursive" }}
              >
                Links rápidos
              </h3>
              <div className="flex flex-col gap-3">
                <Link
                  href="/pt-br/quiz/brainrot-quiz"
                  className="text-sm font-semibold hover:underline"
                  style={{ color: "var(--color-accent-yellow)" }}
                >
                  🎯 Quiz Brainrot →
                </Link>
                <Link
                  href="/pt-br/characters"
                  className="text-sm font-semibold hover:underline"
                  style={{ color: "var(--color-accent-green)" }}
                >
                  🧬 Todos os personagens →
                </Link>
                <Link
                  href="/pt-br/games"
                  className="text-sm font-semibold hover:underline"
                  style={{ color: "var(--color-accent-red)" }}
                >
                  🎮 Jogos Brainrot →
                </Link>
              </div>
            </div>

          </aside>
        </div>

        <div className="mt-16">
          <h2
            className="text-2xl sm:text-3xl mb-6"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Artigos relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/pt-br/blog/${related.slug}`}
                className="rounded-2xl p-6 flex gap-4 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span style={{ fontSize: 40, flexShrink: 0, lineHeight: 1 }}>
                  {related.emoji}
                </span>
                <div className="min-w-0">
                  <p
                    className="text-base font-semibold mb-1 leading-snug"
                    style={{ fontFamily: "var(--font-fredoka), cursive" }}
                  >
                    {related.title}
                  </p>
                  <p
                    className="text-xs leading-relaxed line-clamp-2"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {related.description}
                  </p>
                  <span
                    className="text-xs font-bold mt-2 block"
                    style={{ color: "var(--color-accent-red)" }}
                  >
                    Ler artigo →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div
          className="mt-10 rounded-3xl p-10 text-center flex flex-col items-center gap-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(250,204,21,0.07) 100%)",
            border: "1px solid rgba(255,107,107,0.25)",
          }}
        >
          <span style={{ fontSize: 48 }}>🎯</span>
          <h2
            className="text-2xl sm:text-3xl"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            Qual personagem Brainrot você é?
          </h2>
          <p
            className="text-base max-w-md"
            style={{ color: "var(--color-text-muted)" }}
          >
            Faça o quiz oficial de personalidade Italian Brainrot e descubra qual caos combina com sua energia.
          </p>
          <Link
            href="/pt-br/quiz/brainrot-quiz"
            className="btn-primary px-8 py-3 rounded-xl font-bold text-base"
          >
            Fazer o quiz →
          </Link>
        </div>

      </div>
    </>
  )
}
