import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { quizzes, getQuizBySlug } from "@/lib/quizData";
import QuizGame from "./QuizGame";
import { enAlternates } from "@/lib/ptBrAlternates";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return quizzes.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) return {};
  return {
    title: quiz.seoTitle,
    description: quiz.seoDescription,
    alternates: enAlternates(`quiz/${slug}`),
  };
}

export default async function QuizDetailPage({ params }: Props) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: quiz.title,
    description: quiz.seoDescription,
    educationalUse: "assessment",
    numberOfQuestions: quiz.questions.length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <QuizGame quiz={quiz} />
    </>
  );
}
