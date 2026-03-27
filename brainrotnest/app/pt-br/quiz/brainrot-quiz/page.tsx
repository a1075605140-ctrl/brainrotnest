import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQuizBySlugPtBr } from "@/lib/quizData.pt-br";
import QuizGame from "../../../quiz/[slug]/QuizGame";
import { ptBrAlternates } from "@/lib/ptBrAlternates";

const SLUG = "brainrot-quiz";

export async function generateMetadata(): Promise<Metadata> {
  const quiz = getQuizBySlugPtBr(SLUG);
  if (!quiz) return {};
  return {
    title: quiz.seoTitle,
    description: quiz.seoDescription,
    alternates: ptBrAlternates(`quiz/${SLUG}`),
  };
}

export default async function BrainrotQuizPagePtBr() {
  const quiz = getQuizBySlugPtBr(SLUG);
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
