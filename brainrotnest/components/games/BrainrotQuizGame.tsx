'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import Link from 'next/link'
import SFX from '@/lib/sounds'
import { burstEmoji, burstDots, floatingText, screenFlash, confetti, glowPulse, screenShake } from '@/lib/effects'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  emoji: string
}

const ALL_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Which Italian Brainrot character is a crocodile fused with a bomber plane?",
    options: ["Tralalero Tralala", "Bombardiro Crocodilo", "Tung Tung Sahur", "Cappuccino Assassino"],
    correct: 1,
    emoji: "🐊"
  },
  {
    id: 2,
    question: "What animal is Tralalero Tralala?",
    options: ["Crocodile", "Frog", "Shark", "Cat"],
    correct: 2,
    emoji: "🦈"
  },
  {
    id: 3,
    question: "Tung Tung Sahur is associated with which instrument?",
    options: ["Guitar", "Piano", "Drum", "Violin"],
    correct: 2,
    emoji: "🥁"
  },
  {
    id: 4,
    question: "What drink is Ballerina Cappuccina named after?",
    options: ["Espresso", "Cappuccino", "Latte", "Americano"],
    correct: 1,
    emoji: "☕"
  },
  {
    id: 5,
    question: "Which character is described as 'silent but deadly'?",
    options: ["Bobrito Bandito", "Frulli Frulla", "Cappuccino Assassino", "Brr Brr Patapim"],
    correct: 2,
    emoji: "💀"
  },
  {
    id: 6,
    question: "What animal is La Vaca Saturno Satalite?",
    options: ["Horse", "Pig", "Sheep", "Cow"],
    correct: 3,
    emoji: "🐄"
  },
  {
    id: 7,
    question: "Which character is a cowboy-themed bandito?",
    options: ["Lirili Larila", "Bobrito Bandito", "Frulli Frulla", "Brr Brr Patapim"],
    correct: 1,
    emoji: "🤠"
  },
  {
    id: 8,
    question: "What is Italian Brainrot primarily known for?",
    options: ["Cooking recipes", "AI-generated animal characters", "Sports highlights", "Movie reviews"],
    correct: 1,
    emoji: "🧠"
  },
  {
    id: 9,
    question: "Which platform made Italian Brainrot go viral?",
    options: ["LinkedIn", "Pinterest", "TikTok", "Twitter"],
    correct: 2,
    emoji: "📱"
  },
  {
    id: 10,
    question: "Frulli Frulla is associated with which food?",
    options: ["Pizza", "Pasta", "Fruit", "Gelato"],
    correct: 2,
    emoji: "🍓"
  },
  {
    id: 11,
    question: "Which character lives in orbit around Saturn?",
    options: ["Bombardiro Crocodilo", "Brr Brr Patapim", "La Vaca Saturno Satalite", "Lirili Larila"],
    correct: 2,
    emoji: "🪐"
  },
  {
    id: 12,
    question: "What language is 'Brainrot' content primarily narrated in?",
    options: ["Spanish", "French", "Italian", "Portuguese"],
    correct: 2,
    emoji: "🇮🇹"
  },
  {
    id: 13,
    question: "Which character is flower-themed?",
    options: ["Lirili Larila", "Tung Tung Sahur", "Bobrito Bandito", "Tralalero Tralala"],
    correct: 0,
    emoji: "🌺"
  },
  {
    id: 14,
    question: "What does 'Brainrot' refer to in internet culture?",
    options: ["A cooking show", "Addictive bizarre content", "A music genre", "A sports game"],
    correct: 1,
    emoji: "🤪"
  },
  {
    id: 15,
    question: "Which character is frog-themed?",
    options: ["Cappuccino Assassino", "Frulli Frulla", "Brr Brr Patapim", "Lirili Larila"],
    correct: 2,
    emoji: "🐸"
  },
  {
    id: 16,
    question: "Oxford's Word of the Year 2024 was related to what concept?",
    options: ["Brainrot", "Rizz", "Slay", "Delulu"],
    correct: 0,
    emoji: "📚"
  },
  {
    id: 17,
    question: "Which character is associated with ballet dancing?",
    options: ["Lirili Larila", "Ballerina Cappuccina", "Frulli Frulla", "Tung Tung Sahur"],
    correct: 1,
    emoji: "💃"
  },
  {
    id: 18,
    question: "What generation is most associated with Italian Brainrot?",
    options: ["Baby Boomers", "Gen X", "Millennials", "Gen Z"],
    correct: 3,
    emoji: "👾"
  },
  {
    id: 19,
    question: "Which character's name means 'assassin' in Italian?",
    options: ["Bombardiro Crocodilo", "Cappuccino Assassino", "Bobrito Bandito", "Brr Brr Patapim"],
    correct: 1,
    emoji: "🗡️"
  },
  {
    id: 20,
    question: "How many main Italian Brainrot characters are on BrainrotNest?",
    options: ["5", "8", "10", "15"],
    correct: 2,
    emoji: "🔢"
  },
  {
    id: 21,
    question: "Which character is described as 'a cow in orbit'?",
    options: ["Brr Brr Patapim", "La Vaca Saturno Satalite", "Frulli Frulla", "Lirili Larila"],
    correct: 1,
    emoji: "🛸"
  },
  {
    id: 22,
    question: "What type of game is 'Brainrot Clicker'?",
    options: ["Shooting game", "Racing game", "Incremental clicker", "Card game"],
    correct: 2,
    emoji: "👆"
  },
  {
    id: 23,
    question: "Which character has bomber plane abilities?",
    options: ["Tung Tung Sahur", "Bombardiro Crocodilo", "Cappuccino Assassino", "Bobrito Bandito"],
    correct: 1,
    emoji: "✈️"
  },
  {
    id: 24,
    question: "What is Brr Brr Patapim's personality described as?",
    options: ["Warm and friendly", "Cold and cryptic", "Loud and chaotic", "Sweet and gentle"],
    correct: 1,
    emoji: "❄️"
  },
  {
    id: 25,
    question: "Which character steals things in their lore?",
    options: ["Lirili Larila", "Frulli Frulla", "Bobrito Bandito", "Brr Brr Patapim"],
    correct: 2,
    emoji: "🤠"
  },
  {
    id: 26,
    question: "Italian Brainrot characters are primarily generated using what technology?",
    options: ["Traditional animation", "AI generation", "Hand drawing", "Pixel art"],
    correct: 1,
    emoji: "🤖"
  },
  {
    id: 27,
    question: "Which character's name contains a fruit?",
    options: ["Tung Tung Sahur", "Brr Brr Patapim", "Frulli Frulla", "Lirili Larila"],
    correct: 2,
    emoji: "🍓"
  },
  {
    id: 28,
    question: "What is the catchphrase of Tung Tung Sahur?",
    options: ["BOMBARDIRO!!!", "TUNG TUNG TUNG!", "Tralalero~", "..."],
    correct: 1,
    emoji: "🥁"
  },
  {
    id: 29,
    question: "Which character is completely silent?",
    options: ["Bombardiro Crocodilo", "Tung Tung Sahur", "Cappuccino Assassino", "Frulli Frulla"],
    correct: 2,
    emoji: "🤫"
  },
  {
    id: 30,
    question: "Where does La Vaca Saturno Satalite live?",
    options: ["Under the ocean", "In the jungle", "In orbit", "In a volcano"],
    correct: 2,
    emoji: "🌍"
  },
]

const TOTAL_QUESTIONS = 12
const TIME_PER_QUESTION = 30

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getResult(score: number) {
  if (score <= 4) return { emoji: '🤡', title: 'Certified Normie', comment: "Do you even know what brainrot is?" }
  if (score <= 8) return { emoji: '🧠', title: 'Brainrot Apprentice', comment: "Not bad, you're getting there!" }
  if (score <= 11) return { emoji: '🎓', title: 'Italian Brainrot Scholar', comment: "Impressive! You really know your brainrot!" }
  return { emoji: '👑', title: 'You ARE the Brainrot', comment: "Perfect score! Tung Tung Sahur approves!" }
}

export default function BrainrotQuizGame() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro')
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const gameRef = useRef<HTMLDivElement>(null)
  const comboRef = useRef(0)

  const sfx = useMemo(() => {
    if (!soundEnabled) return new Proxy({} as typeof SFX, { get: () => (..._args: any[]) => {} })
    return SFX
  }, [soundEnabled])

  const goToNext = useCallback(() => {
    setSelectedAnswer(null)
    setIsAnswered(false)
    setTimeLeft(TIME_PER_QUESTION)
    if (currentIndex + 1 >= TOTAL_QUESTIONS) {
      setGameState('result')
    } else {
      setCurrentIndex(i => i + 1)
    }
  }, [currentIndex])

  const handleAnswer = useCallback((optionIndex: number, btnEl?: HTMLElement | null) => {
    if (isAnswered) return
    setSelectedAnswer(optionIndex)
    setIsAnswered(true)
    const correct = questions[currentIndex].correct === optionIndex
    if (correct) {
      setScore(s => s + 1)
      comboRef.current += 1
      sfx.correct()
      if (btnEl) glowPulse(btnEl, '#4ade80')
      if (gameRef.current) {
        const container = gameRef.current
        burstEmoji(container, 200, 200, '✅', 6)
        floatingText(container, 200, 160, 'CORRECT!', '#4ade80', 26)
        burstDots(container, 200, 200, ['#4ade80','#00E5FF','#BFFF00'], comboRef.current * 3)
        if (comboRef.current >= 3) {
          sfx.combo(comboRef.current)
          floatingText(container, 200, 120, `COMBO x${comboRef.current}!`, '#FFD700', 24)
          burstDots(container, 200, 200, ['#FFD700','#FF6B9D','#00E5FF'], comboRef.current * 3)
        }
        if (comboRef.current >= 5) {
          screenShake(container, 3, 200)
        }
      }
    } else {
      comboRef.current = 0
      sfx.wrong()
      if (btnEl) {
        btnEl.classList.remove('animate-head-shake')
        void btnEl.offsetWidth
        btnEl.classList.add('animate-head-shake')
        setTimeout(() => btnEl.classList.remove('animate-head-shake'), 500)
      }
      screenFlash('rgba(239,68,68,0.15)')
    }
    setAnswers(prev => [...prev, correct])
    setTimeout(goToNext, 800)
  }, [isAnswered, questions, currentIndex, goToNext, sfx])

  useEffect(() => {
    if (gameState !== 'playing' || isAnswered) return
    if (timeLeft <= 0) {
      comboRef.current = 0
      setIsAnswered(true)
      setSelectedAnswer(null)
      setAnswers(prev => [...prev, false])
      setTimeout(goToNext, 800)
      return
    }
    if (timeLeft <= 5) {
      sfx.tickUrgent()
    } else {
      sfx.tick()
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [gameState, isAnswered, timeLeft, goToNext, sfx])

  useEffect(() => {
    if (gameState !== 'result') return
    if (score >= 9) {
      sfx.victory()
      if (gameRef.current) confetti(gameRef.current, 60, ['🏆','🎉','⭐','✨'])
    } else {
      sfx.gameOver()
      if (gameRef.current) burstEmoji(gameRef.current, 200, 200, '💀', 8)
    }
  }, [gameState, score, sfx])

  const startGame = () => {
    const shuffled = fisherYatesShuffle(ALL_QUESTIONS).slice(0, TOTAL_QUESTIONS)
    setQuestions(shuffled)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setScore(0)
    setAnswers([])
    setTimeLeft(TIME_PER_QUESTION)
    comboRef.current = 0
    setGameState('playing')
  }

  const timeWarning = timeLeft < 10
  const timePct = (timeLeft / TIME_PER_QUESTION) * 100

  if (gameState === 'intro') {
    return (
      <div style={{ background: '#0e0e1a', borderRadius: '12px', minHeight: '480px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', lineHeight: 1, marginBottom: '20px' }}>❓</div>
        <h2 style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '36px', fontWeight: 700, color: '#fff', margin: '0 0 10px' }}>
          Brainrot Quiz Game
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', marginBottom: '28px' }}>
          Test your Italian Brainrot knowledge!
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
          {['12 questions', '30 seconds each', 'No cheating'].map(item => (
            <span key={item} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>
              {item}
            </span>
          ))}
        </div>
        <button
          onClick={startGame}
          style={{ background: '#4ade80', color: '#000', border: 'none', borderRadius: '10px', padding: '14px 40px', fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '20px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.02em', transition: 'opacity 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Start Quiz →
        </button>
      </div>
    )
  }

  if (gameState === 'result') {
    const result = getResult(score)
    return (
      <div ref={gameRef} style={{ background: '#0e0e1a', borderRadius: '12px', padding: '40px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontSize: '72px', lineHeight: 1, marginBottom: '16px' }}>{result.emoji}</div>
        <div style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '28px', fontWeight: 700, color: '#facc15', marginBottom: '8px' }}>
          {result.title}
        </div>
        <div style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '48px', fontWeight: 700, color: '#fff', margin: '8px 0' }}>
          {score} / {TOTAL_QUESTIONS}
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '28px' }}>{result.comment}</p>

        {/* Answer Review */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          {answers.map((correct, i) => (
            <div key={i} style={{ width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, background: correct ? 'rgba(74,222,128,0.15)' : 'rgba(239,68,68,0.15)', border: `1px solid ${correct ? 'rgba(74,222,128,0.4)' : 'rgba(239,68,68,0.4)'}`, color: correct ? '#4ade80' : '#ef4444' }}>
              {correct ? '✓' : '✗'}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={startGame}
            style={{ background: '#4ade80', color: '#000', border: 'none', borderRadius: '8px', padding: '12px 28px', fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '17px', fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Play Again
          </button>
          <Link
            href="/characters"
            style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 28px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '17px', fontWeight: 600 }}
          >
            Meet the Characters →
          </Link>
        </div>
      </div>
    )
  }

  const q = questions[currentIndex]
  if (!q) return null

  return (
    <div ref={gameRef} style={{ background: '#0e0e1a', borderRadius: '12px', padding: '24px 20px', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .quiz-option:hover:not(:disabled) { opacity: 0.88; }
        .quiz-option:active:not(:disabled) { transform: scale(0.98); }
      `}</style>

      <button
        onClick={() => setSoundEnabled(prev => !prev)}
        className="absolute top-3 right-3 z-10 px-3 py-2 rounded-lg text-white text-sm"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>

      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <span style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '16px', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
          Question {currentIndex + 1} / {TOTAL_QUESTIONS}
        </span>
        <span style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '16px', color: '#facc15', fontWeight: 700 }}>
          Score: {score}
        </span>
      </div>

      {/* Timer Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>TIME LEFT</span>
          <span
            className={timeLeft <= 5 ? 'animate-urgent' : ''}
            style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '18px', fontWeight: 700, color: timeWarning ? '#ef4444' : '#4ade80', transition: 'color 0.3s' }}
          >
            {timeLeft}s
          </span>
        </div>
        <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: '4px', width: `${timePct}%`, background: timeWarning ? '#ef4444' : 'linear-gradient(90deg, #4ade80, #22d3ee)', transition: 'width 1s linear, background 0.3s' }} />
        </div>
      </div>

      {/* Question Card */}
      <div className="animate-fade-in-up" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '28px 20px', marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', lineHeight: 1, marginBottom: '16px' }}>{q.emoji}</div>
        <p style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '22px', fontWeight: 600, color: '#fff', lineHeight: 1.4, margin: 0 }}>
          {q.question}
        </p>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {q.options.map((option, idx) => {
          const isCorrect = idx === q.correct
          const isSelected = idx === selectedAnswer

          let bg = 'rgba(255,255,255,0.05)'
          let border = '1px solid rgba(255,255,255,0.1)'
          let textColor = 'rgba(255,255,255,0.85)'
          let indicator = ''

          if (isAnswered) {
            if (isCorrect) {
              bg = 'rgba(74,222,128,0.15)'
              border = '1px solid rgba(74,222,128,0.5)'
              textColor = '#4ade80'
              indicator = '✓'
            } else if (isSelected && !isCorrect) {
              bg = 'rgba(239,68,68,0.15)'
              border = '1px solid rgba(239,68,68,0.5)'
              textColor = '#ef4444'
              indicator = '✗'
            }
          }

          return (
            <button
              key={idx}
              className="quiz-option"
              disabled={isAnswered}
              onClick={e => handleAnswer(idx, e.currentTarget)}
              style={{ width: '100%', padding: '14px 18px', borderRadius: '10px', background: bg, border, color: textColor, cursor: isAnswered ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', fontFamily: 'inherit', fontSize: '15px', fontWeight: 600, textAlign: 'left', transition: 'all 0.2s' }}
            >
              <span>{option}</span>
              {indicator && <span style={{ fontSize: '18px', fontWeight: 700, flexShrink: 0 }}>{indicator}</span>}
            </button>
          )
        })}
      </div>

      {/* Timeout message */}
      {isAnswered && selectedAnswer === null && (
        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>
          Time&apos;s up! Moving on...
        </div>
      )}
    </div>
  )
}
