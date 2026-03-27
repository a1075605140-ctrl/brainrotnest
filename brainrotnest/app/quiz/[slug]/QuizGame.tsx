"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { Quiz, QuizResult } from "@/lib/quizData";

type GameState = "intro" | "playing" | "result";

function calcPersonalityResult(quiz: Quiz, answers: string[]): QuizResult {
  const tally: Record<string, number> = {};
  answers.forEach((optId) => {
    const rid = quiz.scoring[optId];
    if (rid) tally[rid] = (tally[rid] ?? 0) + 1;
  });
  const topId = Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0];
  return quiz.results.find((r) => r.id === topId) ?? quiz.results[0];
}

function calcKnowledgeResult(quiz: Quiz, answers: string[]): { result: QuizResult; score: number } {
  const score = answers.filter((id) => quiz.scoring[id] === "correct").length;
  const thresholds = quiz.scoreThresholds ?? [];
  const matched = [...thresholds].reverse().find((t) => score >= t.minScore);
  const result = quiz.results.find((r) => r.id === matched?.resultId) ?? quiz.results[0];
  return { result, score };
}

function scoreComment(score: number, total: number, locale: "en" | "pt-br"): string {
  const pct = score / total;
  if (locale === "pt-br") {
    if (pct === 1) return "Perfeição absoluta. Os deuses do Italian Brainrot se curvam a você.";
    if (pct >= 0.75) return "Você claramente mora nesse buraco. Dedicação impressionante.";
    if (pct >= 0.5) return "Conhecimento sólido. Mas ainda tem lore pra absorver...";
    if (pct >= 0.25) return "Você já viu uns vídeos. Hora de se aprofundar.";
    return "Eita. Você já tinha ouvido falar em Italian Brainrot antes de hoje?";
  }
  if (pct === 1) return "Absolutely flawless. The Italian Brainrot gods bow to you.";
  if (pct >= 0.75) return "You clearly live in this rabbit hole. Impressive dedication.";
  if (pct >= 0.5) return "Solid knowledge. But there's more lore to absorb...";
  if (pct >= 0.25) return "You've seen a few videos. Time to go deeper.";
  return "Yikes. Have you even heard of Italian Brainrot before today?";
}

// ─── Progress Bar ──────────────────────────────────────────────────────────
function ProgressBar({
  current,
  total,
  locale,
}: {
  current: number;
  total: number;
  locale: "en" | "pt-br";
}) {
  const pct = Math.round((current / total) * 100);
  const label =
    locale === "pt-br"
      ? `Pergunta ${current} de ${total}`
      : `Question ${current} of ${total}`;
  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: "4px", backgroundColor: "rgba(255,255,255,0.1)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-400"
          style={{ width: `${pct}%`, backgroundColor: "var(--color-accent-green)" }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function QuizGame({
  quiz,
  charactersHref = "/characters",
  locale = "en",
}: {
  quiz: Quiz;
  charactersHref?: string;
  locale?: "en" | "pt-br";
}) {
  const [state, setState] = useState<GameState>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const totalQuestions = quiz.questions.length;

  const restart = useCallback(() => {
    setState("intro");
    setCurrentIndex(0);
    setAnswers([]);
    setSelected(null);
  }, []);

  const handleOptionClick = useCallback(
    (optionId: string) => {
      if (selected !== null) return;
      setSelected(optionId);
      const newAnswers = [...answers, optionId];

      setTimeout(() => {
        if (currentIndex + 1 >= totalQuestions) {
          setAnswers(newAnswers);
          setState("result");
        } else {
          setAnswers(newAnswers);
          setCurrentIndex((i) => i + 1);
          setSelected(null);
        }
      }, 400);
    },
    [selected, answers, currentIndex, totalQuestions],
  );

  // ── Intro ──────────────────────────────────────────────────────────────
  if (state === "intro") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div
          className="rounded-2xl p-8 sm:p-10"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="text-center mb-8">
            <span className="text-6xl block mb-5">
              {quiz.type === "personality" ? "🎭" : "🧠"}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold inline-block mb-4"
              style={
                quiz.type === "personality"
                  ? { backgroundColor: "rgba(250,204,21,0.15)", color: "var(--color-accent-yellow)" }
                  : { backgroundColor: "rgba(74,222,128,0.12)", color: "var(--color-accent-green)" }
              }
            >
              {quiz.type === "personality"
                ? locale === "pt-br"
                  ? "Quiz de personalidade"
                  : "Personality Quiz"
                : locale === "pt-br"
                  ? "Quiz de conhecimento"
                  : "Knowledge Quiz"}
            </span>
            <h1
              className="text-3xl sm:text-4xl mb-4 leading-tight"
              style={{ fontFamily: "var(--font-fredoka), cursive" }}
            >
              {quiz.title}
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              {quiz.description}
            </p>
          </div>

          <div
            className="flex items-center justify-center gap-6 py-5 mb-8 rounded-xl"
            style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="text-center">
              <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka), cursive" }}>
                {totalQuestions}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                {locale === "pt-br" ? "Perguntas" : "Questions"}
              </p>
            </div>
            <div style={{ width: "1px", height: "36px", backgroundColor: "rgba(255,255,255,0.1)" }} />
            <div className="text-center">
              <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka), cursive" }}>
                ~2 min
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                {locale === "pt-br" ? "Tempo est." : "Est. Time"}
              </p>
            </div>
            <div style={{ width: "1px", height: "36px", backgroundColor: "rgba(255,255,255,0.1)" }} />
            <div className="text-center">
              <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka), cursive" }}>
                {locale === "pt-br" ? "Grátis" : "Free"}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                {locale === "pt-br" ? "Sem cadastro" : "No sign-up"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setState("playing")}
            className="w-full py-4 rounded-xl text-lg font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={
              quiz.type === "personality"
                ? {
                    backgroundColor: "var(--color-accent-yellow)",
                    color: "#0e0e1a",
                    boxShadow: "0 4px 20px rgba(250,204,21,0.3)",
                  }
                : {
                    backgroundColor: "var(--color-accent-green)",
                    color: "#0e0e1a",
                    boxShadow: "0 4px 20px rgba(74,222,128,0.3)",
                  }
            }
          >
            {locale === "pt-br" ? "Começar quiz →" : "Start Quiz →"}
          </button>
        </div>
      </div>
    );
  }

  // ── Playing ────────────────────────────────────────────────────────────
  if (state === "playing") {
    const question = quiz.questions[currentIndex];

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <ProgressBar current={currentIndex + 1} total={totalQuestions} locale={locale} />

        <div
          className="rounded-2xl p-7 sm:p-9"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h2
            className="text-2xl sm:text-3xl mb-8 leading-snug"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            {question.question}
          </h2>

          <div className="flex flex-col gap-3">
            {question.options.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(opt.id)}
                  disabled={selected !== null}
                  className="w-full text-left px-5 py-4 rounded-xl text-sm font-semibold transition-all duration-200 disabled:cursor-default"
                  style={
                    isSelected
                      ? {
                          backgroundColor: "rgba(250,204,21,0.2)",
                          border: "1px solid rgba(250,204,21,0.5)",
                          color: "var(--color-accent-yellow)",
                          transform: "scale(1.01)",
                        }
                      : selected !== null
                      ? {
                          backgroundColor: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.3)",
                        }
                      : {
                          backgroundColor: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "var(--color-text)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (selected !== null) return;
                    const el = e.currentTarget;
                    el.style.backgroundColor = "rgba(74,222,128,0.1)";
                    el.style.borderColor = "rgba(74,222,128,0.35)";
                    el.style.color = "var(--color-accent-green)";
                  }}
                  onMouseLeave={(e) => {
                    if (selected !== null) return;
                    const el = e.currentTarget;
                    el.style.backgroundColor = "rgba(255,255,255,0.05)";
                    el.style.borderColor = "rgba(255,255,255,0.1)";
                    el.style.color = "var(--color-text)";
                  }}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Result ─────────────────────────────────────────────────────────────
  if (quiz.type === "personality") {
    const result = calcPersonalityResult(quiz, answers);
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div
          className="rounded-2xl p-8 sm:p-10 text-center"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <span
            className="inline-block mb-5"
            style={{ fontSize: "80px", lineHeight: 1 }}
            role="img"
            aria-label={result.character}
          >
            {result.emoji}
          </span>

          <div className="mb-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: "rgba(250,204,21,0.15)",
                color: "var(--color-accent-yellow)",
              }}
            >
              {locale === "pt-br" ? "Você é..." : "You got..."}
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl mt-3 mb-1"
            style={{ fontFamily: "var(--font-fredoka), cursive" }}
          >
            {result.character}
          </h2>
          <p
            className="text-lg font-semibold mb-5"
            style={{ color: "var(--color-accent-yellow)" }}
          >
            {result.traits[0] &&
              (locale === "pt-br"
                ? `“${result.traits[0]}”`
                : `"The ${result.traits[0]}"`)}
          </p>

          <p
            className="text-sm leading-relaxed mb-7 max-w-md mx-auto"
            style={{ color: "var(--color-text-muted)" }}
          >
            {result.description}
          </p>

          {/* Trait pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {result.traits.map((trait) => (
              <span
                key={trait}
                className="px-4 py-1.5 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: "rgba(250,204,21,0.12)",
                  border: "1px solid rgba(250,204,21,0.25)",
                  color: "var(--color-accent-yellow)",
                }}
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Share text */}
          <p
            className="text-xs mb-8 italic"
            style={{ color: "var(--color-text-muted)" }}
          >
            {locale === "pt-br" ? (
              <>
                🔗 Saí como <strong style={{ color: "var(--color-text)" }}>{result.character}</strong> no Quiz Brainrot!
              </>
            ) : (
              <>
                🔗 I got <strong style={{ color: "var(--color-text)" }}>{result.character}</strong> on the Brainrot Quiz!
              </>
            )}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={restart}
              className="px-7 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 btn-outline"
            >
              {locale === "pt-br" ? "🔄 Refazer quiz" : "🔄 Retake Quiz"}
            </button>
            <Link
              href={charactersHref}
              className="px-7 py-3 rounded-xl text-sm font-bold text-center transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--color-accent-yellow)",
                color: "#0e0e1a",
                boxShadow: "0 4px 20px rgba(250,204,21,0.25)",
              }}
            >
              {locale === "pt-br" ? "🧬 Ver todos os personagens →" : "🧬 See All Characters →"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Knowledge result
  const { result, score } = calcKnowledgeResult(quiz, answers);
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div
        className="rounded-2xl p-8 sm:p-10 text-center"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <span
          className="inline-block mb-5"
          style={{ fontSize: "80px", lineHeight: 1 }}
          role="img"
          aria-label={result.character}
        >
          {result.emoji}
        </span>

        {/* Score */}
        <div className="mb-4">
          <span
            className="text-5xl font-bold"
            style={{ fontFamily: "var(--font-fredoka), cursive", color: "var(--color-accent-green)" }}
          >
            {score}
          </span>
          <span
            className="text-3xl font-bold"
            style={{ fontFamily: "var(--font-fredoka), cursive", color: "var(--color-text-muted)" }}
          >
            /{totalQuestions}
          </span>
        </div>

        <h2
          className="text-3xl sm:text-4xl mb-1"
          style={{ fontFamily: "var(--font-fredoka), cursive" }}
        >
          {result.character}
        </h2>
        <p
          className="text-sm leading-relaxed mb-5 max-w-md mx-auto"
          style={{ color: "var(--color-text-muted)" }}
        >
          {scoreComment(score, totalQuestions, locale)}
        </p>
        <p
          className="text-sm leading-relaxed mb-7 max-w-md mx-auto"
          style={{ color: "var(--color-text-muted)" }}
        >
          {result.description}
        </p>

        {/* Trait pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {result.traits.map((trait) => (
            <span
              key={trait}
              className="px-4 py-1.5 rounded-full text-xs font-bold"
              style={{
                backgroundColor: "rgba(74,222,128,0.12)",
                border: "1px solid rgba(74,222,128,0.25)",
                color: "var(--color-accent-green)",
              }}
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={restart}
            className="px-7 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 btn-outline"
          >
            {locale === "pt-br" ? "🔄 Tentar de novo" : "🔄 Try Again"}
          </button>
          <Link
            href={charactersHref}
            className="px-7 py-3 rounded-xl text-sm font-bold text-center transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--color-accent-green)",
              color: "#0e0e1a",
              boxShadow: "0 4px 20px rgba(74,222,128,0.25)",
            }}
          >
            {locale === "pt-br" ? "🧬 Conhecer os personagens →" : "🧬 Learn the Characters →"}
          </Link>
        </div>
      </div>
    </div>
  );
}
