'use client'
import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import type { CSSProperties } from 'react'
import SFX from '@/lib/sounds'
import { burstEmoji, burstDots, floatingText, screenFlash, confetti, pulseRing, screenShake } from '@/lib/effects'

const CHARACTERS = [
  { level: 1,  name: 'Brainrot Egg',         emoji: '🥚', points: 1    },
  { level: 2,  name: 'Baby Brainrot',         emoji: '🐣', points: 2    },
  { level: 3,  name: 'Tralalero Tralala',     emoji: '🦈', points: 4    },
  { level: 4,  name: 'Tung Tung Sahur',       emoji: '🥁', points: 8    },
  { level: 5,  name: 'Brr Brr Patapim',       emoji: '🐸', points: 16   },
  { level: 6,  name: 'Lirili Larila',         emoji: '🌺', points: 32   },
  { level: 7,  name: 'Frulli Frulla',         emoji: '🍓', points: 64   },
  { level: 8,  name: 'Bobrito Bandito',       emoji: '🤠', points: 128  },
  { level: 9,  name: 'Ballerina Cappuccina',  emoji: '☕', points: 256  },
  { level: 10, name: 'Cappuccino Assassino',  emoji: '💀', points: 512  },
  { level: 11, name: 'Bombardiro Crocodilo',  emoji: '🐊', points: 1024 },
  { level: 12, name: 'La Vaca Saturno',       emoji: '🐄', points: 2048 },
]

type Grid = (number | null)[][]
type GameState = 'playing' | 'won' | 'lost'

// ── grid helpers ──────────────────────────────────────────────────────────────

function createEmptyGrid(): Grid {
  return Array.from({ length: 4 }, () => Array(4).fill(null))
}

function addRandomTile(grid: Grid): Grid {
  const empty: [number, number][] = []
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      if (grid[r][c] === null) empty.push([r, c])
  if (empty.length === 0) return grid
  const [r, c] = empty[Math.floor(Math.random() * empty.length)]
  return grid.map((row, ri) =>
    ri === r ? row.map((v, ci) => (ci === c ? 1 : v)) : [...row]
  )
}

function initGrid(): Grid {
  return addRandomTile(addRandomTile(createEmptyGrid()))
}

// ── slide logic ───────────────────────────────────────────────────────────────

function slideLeft(
  row: (number | null)[]
): { row: (number | null)[]; score: number; mergedAt: number[] } {
  const tiles = row.filter((v): v is number => v !== null)
  let score = 0
  const result: (number | null)[] = []
  const mergedAt: number[] = []
  let i = 0
  while (i < tiles.length) {
    if (i + 1 < tiles.length && tiles[i] === tiles[i + 1] && tiles[i] < 12) {
      const merged = tiles[i] + 1
      result.push(merged)
      mergedAt.push(result.length - 1)
      score += CHARACTERS[merged - 1].points
      i += 2
    } else {
      result.push(tiles[i])
      i++
    }
  }
  while (result.length < 4) result.push(null)
  return { row: result, score, mergedAt }
}

function moveLeft(
  grid: Grid
): { grid: Grid; score: number; moved: boolean; mergedCells: string[] } {
  let score = 0
  let moved = false
  const mergedCells: string[] = []
  const newGrid = grid.map((row, r) => {
    const res = slideLeft(row)
    score += res.score
    res.mergedAt.forEach(c => mergedCells.push(`${r},${c}`))
    if (res.row.some((v, i) => v !== row[i])) moved = true
    return res.row
  })
  return { grid: newGrid, score, moved, mergedCells }
}

function transpose(g: Grid): Grid {
  return Array.from({ length: 4 }, (_, c) =>
    Array.from({ length: 4 }, (_, r) => g[r][c])
  ) as Grid
}

function flipH(g: Grid): Grid {
  return g.map(row => [...row].reverse())
}

type MoveResult = { grid: Grid; score: number; moved: boolean; mergedCells: string[] }

function applyMove(grid: Grid, dir: string): MoveResult {
  if (dir === 'ArrowLeft') return moveLeft(grid)

  if (dir === 'ArrowRight') {
    const r = moveLeft(flipH(grid))
    return {
      ...r,
      grid: flipH(r.grid),
      mergedCells: r.mergedCells.map(k => {
        const [a, b] = k.split(',').map(Number)
        return `${a},${3 - b}`
      }),
    }
  }

  if (dir === 'ArrowUp') {
    const r = moveLeft(transpose(grid))
    return {
      ...r,
      grid: transpose(r.grid),
      mergedCells: r.mergedCells.map(k => {
        const [a, b] = k.split(',').map(Number)
        return `${b},${a}`
      }),
    }
  }

  // ArrowDown: transpose → flipH → moveLeft → flipH → transpose
  const r = moveLeft(flipH(transpose(grid)))
  return {
    ...r,
    grid: transpose(flipH(r.grid)),
    mergedCells: r.mergedCells.map(k => {
      const [a, b] = k.split(',').map(Number)
      return `${3 - b},${a}`
    }),
  }
}

function canMove(grid: Grid): boolean {
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === null) return true
      const v = grid[r][c] as number
      if (v < 12) {
        if (c < 3 && grid[r][c + 1] === v) return true
        if (r < 3 && grid[r + 1][c] === v) return true
      }
    }
  return false
}

function hasLevel12(grid: Grid): boolean {
  return grid.some(row => row.includes(12))
}

// ── styles ────────────────────────────────────────────────────────────────────

const CELL_STYLE: Record<number, CSSProperties> = {
  1:  { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' },
  2:  { background: 'rgba(255,255,255,0.11)', border: '1px solid rgba(255,255,255,0.16)' },
  3:  { background: 'rgba(74,222,128,0.12)',  border: '1px solid rgba(74,222,128,0.25)'  },
  4:  { background: 'rgba(74,222,128,0.20)',  border: '1px solid rgba(74,222,128,0.35)'  },
  5:  { background: 'rgba(250,204,21,0.12)',  border: '1px solid rgba(250,204,21,0.25)'  },
  6:  { background: 'rgba(250,204,21,0.20)',  border: '1px solid rgba(250,204,21,0.35)'  },
  7:  { background: 'rgba(249,115,22,0.12)',  border: '1px solid rgba(249,115,22,0.25)'  },
  8:  { background: 'rgba(249,115,22,0.20)',  border: '1px solid rgba(249,115,22,0.35)'  },
  9:  { background: 'rgba(239,68,68,0.12)',   border: '1px solid rgba(239,68,68,0.25)'   },
  10: { background: 'rgba(239,68,68,0.20)',   border: '1px solid rgba(239,68,68,0.35)'   },
  11: { background: 'rgba(167,139,250,0.16)', border: '1px solid rgba(167,139,250,0.32)' },
  12: {
    background: 'rgba(250,204,21,0.30)',
    border: '1px solid rgba(250,204,21,0.55)',
    boxShadow: '0 0 18px rgba(250,204,21,0.55), 0 0 40px rgba(250,204,21,0.22)',
  },
}

const DPAD_BTN: CSSProperties = {
  width: '52px',
  height: '52px',
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: '10px',
  color: 'rgba(255,255,255,0.8)',
  fontSize: '22px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  touchAction: 'manipulation',
}

const BTN: CSSProperties = {
  padding: '9px 18px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'opacity 0.15s',
}

// ── component ─────────────────────────────────────────────────────────────────

export default function BrainrotMergeGame() {
  const [grid, setGrid] = useState<Grid>(initGrid)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [gameState, setGameState] = useState<GameState>('playing')
  const [mergedCells, setMergedCells] = useState<Set<string>>(new Set())
  const [soundEnabled, setSoundEnabled] = useState(true)
  const gameRef = useRef<HTMLDivElement>(null)

  const sfx = useMemo(() => {
    if (!soundEnabled) return new Proxy({} as typeof SFX, { get: () => (..._args: any[]) => {} })
    return SFX
  }, [soundEnabled])

  // Refs for stable event handler (avoids keyboard listener churn)
  const gridRef = useRef<Grid>(grid)
  const gameStateRef = useRef<GameState>('playing')
  const wonOnce = useRef(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  // Keep refs in sync
  gridRef.current = grid
  gameStateRef.current = gameState

  // Load best score from localStorage
  useEffect(() => {
    try {
      const s = localStorage.getItem('brainrot-merge-best')
      if (s) setBestScore(+s)
    } catch {}
  }, [])

  // Sync best score to localStorage whenever score increases
  useEffect(() => {
    setBestScore(prev => {
      if (score > prev) {
        try { localStorage.setItem('brainrot-merge-best', String(score)) } catch {}
        return score
      }
      return prev
    })
  }, [score])

  const handleMove = useCallback((dir: string) => {
    if (gameStateRef.current === 'lost' || gameStateRef.current === 'won') return

    const { grid: moved, score: gained, moved: didMove, mergedCells: mc } =
      applyMove(gridRef.current, dir)
    if (!didMove) return

    const next = addRandomTile(moved)
    gridRef.current = next
    setGrid(next)

    if (gained > 0) {
      setScore(s => s + gained)
      sfx.merge()

      // visual effects at merged cells
      if (gameRef.current && mc.length > 0) {
        const container = gameRef.current
        const gridEl = container.querySelector('.bmg-grid') as HTMLElement | null
        if (gridEl) {
          const rect = gridEl.getBoundingClientRect()
          const containerRect = container.getBoundingClientRect()
          mc.forEach(key => {
            const [r, c] = key.split(',').map(Number)
            const cellSize = rect.width / 4
            const cx = (rect.left - containerRect.left) + c * cellSize + cellSize / 2
            const cy = (rect.top - containerRect.top) + r * cellSize + cellSize / 2
            const mergedLevel = next[r][c] ?? 1
            const char = CHARACTERS[Math.min(mergedLevel - 1, 11)]
            burstDots(container, cx, cy, ['#BFFF00','#FF6B9D','#00E5FF','#FFD700'], 15)
            pulseRing(container, cx, cy, '#BFFF00')
            if (mergedLevel >= 5) {
              burstEmoji(container, cx, cy, char.emoji, 10)
              if (mergedLevel >= 5) sfx.bigScore()
              if (mergedLevel >= 5) screenFlash('rgba(191,255,0,0.1)')
              if (mergedLevel >= 5) floatingText(container, cx, cy - 20, `LV${mergedLevel}!`, '#FFD700', 20)
              if (gameRef.current) screenShake(gameRef.current, 3, 200)
            }
          })
        }
      }
    }

    if (mc.length > 0) {
      setMergedCells(new Set(mc))
      setTimeout(() => setMergedCells(new Set()), 340)
    }

    if (!wonOnce.current && hasLevel12(next)) {
      gameStateRef.current = 'won'
      setGameState('won')
      sfx.victory()
      if (gameRef.current) {
        confetti(gameRef.current, 60, ['🐄','🎉','⭐','✨'])
        screenFlash('rgba(250,204,21,0.2)')
      }
    } else if (!canMove(next)) {
      gameStateRef.current = 'lost'
      setGameState('lost')
      sfx.gameOver()
      if (gameRef.current) {
        screenFlash('rgba(239,68,68,0.2)')
        screenShake(gameRef.current, 10, 400)
      }
    }
  }, [sfx])

  // Keyboard control — stable listener via ref pattern
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        handleMove(e.key)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleMove])

  // Touch control
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStart.current.x
    const dy = t.clientY - touchStart.current.y
    touchStart.current = null
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 28) handleMove(dx > 0 ? 'ArrowRight' : 'ArrowLeft')
    } else {
      if (Math.abs(dy) > 28) handleMove(dy > 0 ? 'ArrowDown' : 'ArrowUp')
    }
  }

  const newGame = () => {
    const fresh = initGrid()
    gridRef.current = fresh
    gameStateRef.current = 'playing'
    wonOnce.current = false
    setGrid(fresh)
    setScore(0)
    setGameState('playing')
    setMergedCells(new Set())
  }

  const keepPlaying = () => {
    wonOnce.current = true
    gameStateRef.current = 'playing'
    setGameState('playing')
  }

  return (
    <div
      ref={gameRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 8px 24px',
        userSelect: 'none',
        fontFamily: 'var(--font-nunito), sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setSoundEnabled(prev => !prev)}
        className="absolute top-2 right-2 z-10 px-3 py-2 rounded-lg text-white text-sm"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>
      <style>{`
        @keyframes brainrotMergePop {
          0%   { transform: scale(1); }
          45%  { transform: scale(1.22); }
          100% { transform: scale(1); }
        }
        .bmg-pop { animation: brainrotMergePop 0.34s cubic-bezier(.36,1.45,.6,1) both; }
        @media (min-width: 640px) { .bmg-dpad { display: none !important; } }
      `}</style>

      {/* ── Header row ─────────────────────────────────────────────────────── */}
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
            fontSize: 'clamp(20px,5.5vw,28px)',
            fontWeight: 700,
            color: '#fff',
            margin: 0,
            lineHeight: 1,
          }}
        >
          Brainrot Merge
        </h2>

        {/* Score cards */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {([
            { label: 'SCORE', value: score,     color: '#fff'    },
            { label: 'BEST',  value: bestScore, color: '#facc15' },
          ] as const).map(({ label, value, color }) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '6px 10px',
                textAlign: 'center',
                minWidth: '64px',
              }}
            >
              <div
                style={{
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '2px',
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: 'clamp(14px,4vw,18px)',
                  fontWeight: 700,
                  color,
                  fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
                }}
              >
                {value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── New Game button ─────────────────────────────────────────────────── */}
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '10px',
        }}
      >
        <button
          onClick={newGame}
          style={{
            ...BTN,
            background: 'rgba(250,204,21,0.12)',
            border: '1px solid rgba(250,204,21,0.3)',
            color: '#facc15',
          }}
        >
          New Game
        </button>
      </div>

      {/* ── 4×4 Grid ───────────────────────────────────────────────────────── */}
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          position: 'relative',
          background: 'rgba(255,255,255,0.045)',
          borderRadius: '16px',
          padding: '8px',
          boxSizing: 'border-box',
          touchAction: 'none',
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="bmg-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
          }}
        >
          {grid.flat().map((level, idx) => {
            const r = Math.floor(idx / 4)
            const c = idx % 4
            const char = level ? CHARACTERS[level - 1] : null
            const isMerged = mergedCells.has(`${r},${c}`)
            const cellStyle: CSSProperties =
              level
                ? (CELL_STYLE[Math.min(level, 12)] ?? CELL_STYLE[12])
                : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }

            return (
              <div
                key={idx}
                className={isMerged ? 'bmg-pop' : ''}
                style={{
                  aspectRatio: '1',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '3px',
                  overflow: 'hidden',
                  padding: '4px',
                  transition: 'background 0.12s',
                  ...cellStyle,
                }}
              >
                {char && (
                  <>
                    <span
                      style={{
                        fontSize: 'clamp(18px,5.2vw,28px)',
                        lineHeight: 1,
                        display: 'block',
                      }}
                    >
                      {char.emoji}
                    </span>
                    <span
                      style={{
                        fontSize: '8px',
                        color: 'rgba(255,255,255,0.55)',
                        textAlign: 'center',
                        lineHeight: 1.15,
                        overflow: 'hidden',
                        maxHeight: '18px',
                        padding: '0 2px',
                        display: 'block',
                        width: '100%',
                      }}
                    >
                      {char.name}
                    </span>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* ── Win overlay ──────────────────────────────────────────────────── */}
        {gameState === 'won' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '16px',
              background: 'rgba(0,0,0,0.80)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              zIndex: 10,
            }}
          >
            <div style={{ fontSize: '52px', lineHeight: 1 }}>🐄</div>
            <div
              style={{
                fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
                fontSize: '30px',
                fontWeight: 700,
                color: '#facc15',
                textShadow: '0 0 22px rgba(250,204,21,0.55)',
              }}
            >
              YOU WIN!
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', textAlign: 'center' }}>
              La Vaca Saturno reached orbit!
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>
              {score.toLocaleString()} pts
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button
                onClick={keepPlaying}
                style={{
                  ...BTN,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                }}
              >
                Keep Playing
              </button>
              <button
                onClick={newGame}
                style={{
                  ...BTN,
                  background: 'rgba(250,204,21,0.18)',
                  border: '1px solid rgba(250,204,21,0.4)',
                  color: '#facc15',
                }}
              >
                New Game
              </button>
            </div>
          </div>
        )}

        {/* ── Game Over overlay ────────────────────────────────────────────── */}
        {gameState === 'lost' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '16px',
              background: 'rgba(0,0,0,0.80)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              zIndex: 10,
            }}
          >
            <div style={{ fontSize: '52px', lineHeight: 1 }}>💀</div>
            <div
              style={{
                fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
                fontSize: '30px',
                fontWeight: 700,
                color: '#ef4444',
              }}
            >
              Game Over
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
              No more moves!
            </div>
            <div style={{ fontSize: '17px', fontWeight: 600, color: '#fff' }}>
              Score: {score.toLocaleString()}
            </div>
            <div style={{ fontSize: '14px', color: '#facc15' }}>
              Best: {bestScore.toLocaleString()}
            </div>
            <button
              onClick={newGame}
              style={{
                ...BTN,
                marginTop: '4px',
                background: 'rgba(239,68,68,0.18)',
                border: '1px solid rgba(239,68,68,0.4)',
                color: '#ef4444',
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* ── Mobile D-Pad (hidden ≥ 640 px via CSS) ────────────────────────── */}
      <div
        className="bmg-dpad"
        style={{
          marginTop: '20px',
          display: 'grid',
          gridTemplateAreas: '". up ." "left . right" ". down ."',
          gridTemplateColumns: 'repeat(3, 52px)',
          gridTemplateRows: 'repeat(3, 52px)',
          gap: '6px',
        }}
      >
        <button onClick={() => handleMove('ArrowUp')}    style={{ ...DPAD_BTN, gridArea: 'up'    }}>↑</button>
        <button onClick={() => handleMove('ArrowLeft')}  style={{ ...DPAD_BTN, gridArea: 'left'  }}>←</button>
        <button onClick={() => handleMove('ArrowRight')} style={{ ...DPAD_BTN, gridArea: 'right' }}>→</button>
        <button onClick={() => handleMove('ArrowDown')}  style={{ ...DPAD_BTN, gridArea: 'down'  }}>↓</button>
      </div>

      {/* Keyboard hint for desktop */}
      <p
        style={{
          marginTop: '12px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.28)',
          textAlign: 'center',
        }}
        className="bmg-hint"
      >
        Use arrow keys or swipe to move
      </p>
    </div>
  )
}
