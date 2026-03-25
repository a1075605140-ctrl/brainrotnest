'use client'
import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import SFX from '@/lib/sounds'
import { burstDots, floatingText, screenFlash, confetti, screenShake, pulseRing } from '@/lib/effects'

const CHARACTERS = [
  { id: 'tralalero', name: 'Tralalero Tralala', emoji: '🦈' },
  { id: 'bombardiro', name: 'Bombardiro Crocodilo', emoji: '🐊' },
  { id: 'tung-tung', name: 'Tung Tung Sahur', emoji: '🥁' },
  { id: 'ballerina', name: 'Ballerina Cappuccina', emoji: '☕' },
  { id: 'cappuccino', name: 'Cappuccino Assassino', emoji: '💀' },
  { id: 'lirili', name: 'Lirili Larila', emoji: '🌺' },
  { id: 'bobrito', name: 'Bobrito Bandito', emoji: '🤠' },
  { id: 'frulli', name: 'Frulli Frulla', emoji: '🍓' },
]

const DIFFICULTIES = {
  easy: { pairs: 6, time: 60, label: 'Easy', emoji: '😊' },
  medium: { pairs: 8, time: 45, label: 'Medium', emoji: '😤' },
  hard: { pairs: 8, time: 30, label: 'Hard', emoji: '💀' },
}

interface Card {
  id: number
  characterId: string
  emoji: string
  name: string
  isFlipped: boolean
  isMatched: boolean
}

type GameState = 'intro' | 'playing' | 'result'
type Difficulty = 'easy' | 'medium' | 'hard'
type ResultType = 'win' | 'lose'

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildDeck(difficulty: Difficulty): Card[] {
  const { pairs } = DIFFICULTIES[difficulty]
  const chosen = CHARACTERS.slice(0, pairs)
  const doubled = chosen.flatMap((ch) => [
    { characterId: ch.id, emoji: ch.emoji, name: ch.name },
    { characterId: ch.id, emoji: ch.emoji, name: ch.name },
  ])
  return shuffleArray(doubled).map((c, i) => ({
    ...c,
    id: i,
    isFlipped: false,
    isMatched: false,
  }))
}

function calcScore(timeLeft: number, moves: number): number {
  return Math.max(0, timeLeft * 10 - moves * 2)
}

const LS_KEY = 'brainrot-memory-best'

function loadBestScores(): Record<string, number> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveBestScore(difficulty: string, score: number) {
  if (typeof window === 'undefined') return
  const prev = loadBestScores()
  if ((prev[difficulty] ?? -1) < score) {
    localStorage.setItem(LS_KEY, JSON.stringify({ ...prev, [difficulty]: score }))
  }
}

export default function BrainrotMemoryGame() {
  const [gameState, setGameState] = useState<GameState>('intro')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isChecking, setIsChecking] = useState(false)
  const [bestScores, setBestScores] = useState<Record<string, number>>({})
  const [resultType, setResultType] = useState<ResultType>('win')
  const [finalScore, setFinalScore] = useState(0)
  const [finalMoves, setFinalMoves] = useState(0)
  const [finalTime, setFinalTime] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const gameRef = useRef<HTMLDivElement>(null)
  const comboRef = useRef(0)

  const sfx = useMemo(() => {
    if (!soundEnabled) return new Proxy({} as typeof SFX, { get: () => (..._args: any[]) => {} })
    return SFX
  }, [soundEnabled])

  useEffect(() => {
    setBestScores(loadBestScores())
  }, [])

  const startGame = useCallback(() => {
    const config = DIFFICULTIES[difficulty]
    setCards(buildDeck(difficulty))
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setTimeLeft(config.time)
    setIsChecking(false)
    setGameState('playing')
  }, [difficulty])

  // Countdown
  useEffect(() => {
    if (gameState !== 'playing') return
    if (timeLeft <= 0) {
      sfx.gameOver()
      if (gameRef.current) { screenFlash('rgba(239,68,68,0.2)'); screenShake(gameRef.current, 6, 300) }
      setResultType('lose')
      setFinalMoves(moves)
      setFinalTime(0)
      setFinalScore(0)
      setGameState('result')
      return
    }
    if (timeLeft <= 5) {
      sfx.tickUrgent()
    } else {
      sfx.tick()
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000)
    return () => clearTimeout(t)
  }, [gameState, timeLeft, moves, sfx])

  // Win check
  useEffect(() => {
    if (gameState !== 'playing') return
    const needed = DIFFICULTIES[difficulty].pairs
    if (matchedPairs === needed && needed > 0) {
      const score = calcScore(timeLeft, moves)
      saveBestScore(difficulty, score)
      setBestScores(loadBestScores())
      setResultType('win')
      setFinalScore(score)
      setFinalMoves(moves)
      setFinalTime(DIFFICULTIES[difficulty].time - timeLeft)
      sfx.victory()
      if (gameRef.current) {
        confetti(gameRef.current, 60, ['🎉','⭐','✨','🌟'])
        screenFlash('rgba(191,255,0,0.15)')
      }
      setGameState('result')
    }
  }, [matchedPairs, difficulty, gameState, timeLeft, moves, sfx])

  const handleCardClick = useCallback(
    (cardId: number, cardEl?: HTMLElement | null) => {
      if (isChecking || gameState !== 'playing') return
      const card = cards.find((c) => c.id === cardId)
      if (!card || card.isFlipped || card.isMatched) return
      if (flippedCards.includes(cardId)) return

      sfx.flip()

      const newFlipped = [...flippedCards, cardId]
      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
      )
      setFlippedCards(newFlipped)

      if (newFlipped.length === 2) {
        setIsChecking(true)
        setMoves((m) => m + 1)
        const [aId, bId] = newFlipped
        const a = cards.find((c) => c.id === aId)!
        const b = cards.find((c) => c.id === bId)!

        if (a.characterId === b.characterId) {
          sfx.match()
          comboRef.current += 1
          setCards((prev) =>
            prev.map((c) =>
              c.id === aId || c.id === bId ? { ...c, isMatched: true } : c
            )
          )
          setMatchedPairs((p) => p + 1)
          setFlippedCards([])
          setIsChecking(false)
          if (gameRef.current && cardEl) {
            const container = gameRef.current
            const rect = cardEl.getBoundingClientRect()
            const containerRect = container.getBoundingClientRect()
            const cx = rect.left - containerRect.left + rect.width / 2
            const cy = rect.top - containerRect.top + rect.height / 2
            burstDots(container, cx, cy, ['#4ade80','#00E5FF','#BFFF00'], 8)
            pulseRing(container, cx, cy, '#4ade80')
            floatingText(container, cx, cy - 20, '✓', '#4ade80', 28)
            if (comboRef.current >= 2) {
              sfx.combo(comboRef.current)
              floatingText(container, cx, cy - 50, `COMBO x${comboRef.current}!`, '#FFD700', 22)
            }
          }
        } else {
          sfx.mismatch()
          comboRef.current = 0
          if (gameRef.current) screenFlash('rgba(239,68,68,0.1)')
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === aId || c.id === bId ? { ...c, isFlipped: false } : c
              )
            )
            setFlippedCards([])
            setIsChecking(false)
          }, 800)
        }
      }
    },
    [cards, flippedCards, isChecking, gameState, sfx]
  )

  const tryHarder = () => {
    const order: Difficulty[] = ['easy', 'medium', 'hard']
    const next = order[Math.min(order.indexOf(difficulty) + 1, 2)]
    setDifficulty(next)
    setGameState('intro')
  }

  const tryEasier = () => {
    const order: Difficulty[] = ['easy', 'medium', 'hard']
    const prev = order[Math.max(order.indexOf(difficulty) - 1, 0)]
    setDifficulty(prev)
    setGameState('intro')
  }

  const config = DIFFICULTIES[difficulty]
  const isNewBest =
    resultType === 'win' &&
    (bestScores[difficulty] === undefined || finalScore >= bestScores[difficulty])

  // ── INTRO ──────────────────────────────────────────────────────────────
  if (gameState === 'intro') {
    return (
      <div style={styles.wrapper}>
        <div style={styles.introBox}>
          <div style={{ fontSize: '56px', marginBottom: '8px', lineHeight: 1 }}>🧩</div>
          <h2 style={styles.bigTitle}>Brainrot Memory Game</h2>
          <p style={styles.subtitle}>Match all the Italian Brainrot characters!</p>

          <div style={{ marginTop: '28px', marginBottom: '8px' }}>
            <p style={styles.sectionLabel}>Select Difficulty</p>
            <div style={styles.diffRow}>
              {(Object.keys(DIFFICULTIES) as Difficulty[]).map((d) => {
                const dc = DIFFICULTIES[d]
                const active = difficulty === d
                return (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    style={{
                      ...styles.diffBtn,
                      border: active
                        ? '2px solid #facc15'
                        : '2px solid rgba(255,255,255,0.1)',
                      background: active
                        ? 'rgba(250,204,21,0.12)'
                        : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <span style={{ fontSize: '22px' }}>{dc.emoji}</span>
                    <span style={styles.diffLabel}>{dc.label}</span>
                    <span style={styles.diffMeta}>{dc.pairs} pairs · {dc.time}s</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Best scores */}
          <div style={styles.bestRow}>
            {(Object.keys(DIFFICULTIES) as Difficulty[]).map((d) => (
              <div key={d} style={styles.bestItem}>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {DIFFICULTIES[d].label} Best
                </span>
                <span style={{ color: '#facc15', fontWeight: 700, fontSize: '15px' }}>
                  {bestScores[d] !== undefined ? bestScores[d] : '—'}
                </span>
              </div>
            ))}
          </div>

          <button onClick={startGame} style={styles.startBtn}>
            Start Game →
          </button>
        </div>
      </div>
    )
  }

  // ── PLAYING ────────────────────────────────────────────────────────────
  if (gameState === 'playing') {
    const cols = 4
    return (
      <div ref={gameRef} style={{ ...styles.wrapper, position: 'relative', overflow: 'hidden' }}>
        {/* Status bar */}
        <div style={{ ...styles.statusBar, gap: '8px' }}>
          <button
            onClick={() => setSoundEnabled(prev => !prev)}
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '14px', color: '#fff' }}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Moves</span>
            <span style={styles.statValue}>{moves}</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Pairs</span>
            <span style={styles.statValue}>{matchedPairs} / {config.pairs}</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Time</span>
            <span
              className={timeLeft <= 5 ? 'animate-urgent' : ''}
              style={{
                ...styles.statValue,
                color: timeLeft < 10 ? '#f87171' : '#fff',
                animation: timeLeft < 10 && timeLeft > 5 ? 'blink 0.8s step-start infinite' : undefined,
              }}
            >
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: '10px',
            width: '100%',
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          {cards.map((card) => (
            <CardTile
              key={card.id}
              card={card}
              onClick={(el) => handleCardClick(card.id, el)}
              disabled={isChecking || card.isFlipped || card.isMatched}
            />
          ))}
        </div>

        <style>{`
          @keyframes blink { 50% { opacity: 0.2; } }
          @keyframes matched { 0%,100% { transform: scale(1); } 50% { transform: scale(0.92); } }
        `}</style>
      </div>
    )
  }

  // ── RESULT ─────────────────────────────────────────────────────────────
  return (
    <div style={styles.wrapper}>
      <div style={styles.introBox}>
        {resultType === 'win' ? (
          <>
            <div style={{ fontSize: '56px', marginBottom: '8px' }}>🎉</div>
            <h2 style={{ ...styles.bigTitle, color: '#facc15' }}>You Won!</h2>
            {isNewBest && (
              <div style={styles.newBest}>New Best! 🏆</div>
            )}
          </>
        ) : (
          <>
            <div style={{ fontSize: '56px', marginBottom: '8px' }}>⏰</div>
            <h2 style={{ ...styles.bigTitle, color: '#f87171' }}>Time&apos;s Up!</h2>
            <p style={styles.subtitle}>
              You matched {matchedPairs} / {config.pairs} pairs
            </p>
          </>
        )}

        {resultType === 'win' && (
          <div style={styles.statsGrid}>
            <div style={styles.statBox}>
              <span style={styles.statBoxLabel}>Time Used</span>
              <span style={styles.statBoxValue}>{finalTime}s</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statBoxLabel}>Moves</span>
              <span style={styles.statBoxValue}>{finalMoves}</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statBoxLabel}>Score</span>
              <span style={{ ...styles.statBoxValue, color: '#facc15' }}>{finalScore}</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '24px' }}>
          <button onClick={startGame} style={styles.startBtn}>
            {resultType === 'win' ? 'Play Again' : 'Try Again'}
          </button>
          {resultType === 'win' ? (
            <button
              onClick={tryHarder}
              style={{ ...styles.startBtn, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
              disabled={difficulty === 'hard'}
            >
              Try Harder Difficulty
            </button>
          ) : (
            <button
              onClick={tryEasier}
              style={{ ...styles.startBtn, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
              disabled={difficulty === 'easy'}
            >
              Try Easier Difficulty
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Card Tile ──────────────────────────────────────────────────────────────

function CardTile({
  card,
  onClick,
  disabled,
}: {
  card: Card
  onClick: (el: HTMLElement | null) => void
  disabled: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const tileRef = useRef<HTMLDivElement>(null)
  const show = card.isFlipped || card.isMatched

  return (
    <div
      ref={tileRef}
      onClick={disabled && !card.isMatched ? undefined : () => onClick(tileRef.current)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '1',
        borderRadius: '10px',
        cursor: card.isMatched || disabled ? (card.isMatched ? 'default' : 'not-allowed') : 'pointer',
        perspective: '600px',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '10px',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s',
          transform: show ? 'rotateY(180deg)' : 'rotateY(0deg)',
          animation: card.isMatched ? 'matched 0.4s ease' : 'none',
        }}
      >
        {/* Back face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '10px',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: hovered && !disabled
              ? 'rgba(255,255,255,0.13)'
              : 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s',
          }}
        >
          <span style={{ fontSize: '28px', color: '#facc15', fontWeight: 700 }}>?</span>
        </div>

        {/* Front face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '10px',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: card.isMatched
              ? 'rgba(74,222,128,0.2)'
              : 'rgba(255,255,255,0.12)',
            border: card.isMatched
              ? '1px solid rgba(74,222,128,0.5)'
              : '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '4px',
          }}
        >
          <span style={{ fontSize: '28px', lineHeight: 1 }}>{card.emoji}</span>
          <span
            style={{
              fontSize: '9px',
              color: 'rgba(255,255,255,0.5)',
              textAlign: 'center',
              lineHeight: 1.2,
              maxWidth: '80%',
              wordBreak: 'break-word',
            }}
          >
            {card.name}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Styles ─────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 16px 32px',
    minHeight: '500px',
  },
  introBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '480px',
    textAlign: 'center',
  },
  bigTitle: {
    fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
    fontSize: '30px',
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 8px',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '14px',
    margin: '0 0 4px',
  },
  sectionLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: '10px',
  },
  diffRow: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  diffBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '12px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.15s',
    minWidth: '100px',
    color: '#fff',
    fontFamily: 'inherit',
  },
  diffLabel: {
    fontWeight: 700,
    fontSize: '15px',
  },
  diffMeta: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.45)',
  },
  bestRow: {
    display: 'flex',
    gap: '24px',
    marginTop: '20px',
    marginBottom: '4px',
  },
  bestItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  startBtn: {
    background: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 28px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'background 0.15s',
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '480px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '10px 20px',
    marginBottom: '16px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  statLabel: {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.35)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  statValue: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#fff',
    fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
  },
  statsGrid: {
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '12px 20px',
    minWidth: '90px',
  },
  statBoxLabel: {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.35)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  statBoxValue: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#fff',
    fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
  },
  newBest: {
    background: 'rgba(250,204,21,0.12)',
    border: '1px solid rgba(250,204,21,0.3)',
    color: '#facc15',
    borderRadius: '20px',
    padding: '4px 14px',
    fontSize: '13px',
    fontWeight: 700,
    marginTop: '6px',
  },
}
