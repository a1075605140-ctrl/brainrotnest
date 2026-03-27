import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { quizzesPtBr, getQuizBySlugPtBr } from "@/lib/quizData.pt-br";
import QuizGame from "../../../quiz/[slug]/QuizGame";
import { ptBrAlternates } from "@/lib/ptBrAlternates";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return quizzesPtBr
    .filter((q) => q.slug !== "brainrot-quiz")
    .map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizBySlugPtBr(slug);
  if (!quiz) return {};
  return {
    title: quiz.seoTitle,
    description: quiz.seoDescription,
    alternates: ptBrAlternates(`quiz/${slug}`),
  };
}

export default async function QuizDetailPagePtBr({ params }: Props) {
  const { slug } = await params;
  const quiz = getQuizBySlugPtBr(slug);
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
      <QuizGame quiz={quiz} charactersHref="/pt-br/characters" locale="pt-br" />
    </>
  );
}
