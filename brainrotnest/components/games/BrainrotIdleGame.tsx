'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

interface Generator {
  id: string
  name: string
  emoji: string
  baseCost: number
  baseRate: number
  owned: number
  description: string
}

interface Milestone {
  points: number
  reward: string
  bonus: number
}

interface SaveData {
  points: number
  totalPoints: number
  generators: Generator[]
  multiplier: number
  reachedMilestones: number[]
  timestamp: number
  playTime: number
}

const INITIAL_GENERATORS: Generator[] = [
  { id: 'egg', name: 'Brainrot Egg', emoji: '🥚', baseCost: 10, baseRate: 0.1, owned: 0, description: 'Slowly generates brainrot' },
  { id: 'tralalero', name: 'Tralalero Farm', emoji: '🦈', baseCost: 100, baseRate: 0.5, owned: 0, description: 'Sharks swimming in circles' },
  { id: 'tung', name: 'Tung Tung Studio', emoji: '🥁', baseCost: 500, baseRate: 2, owned: 0, description: 'Non-stop drumming' },
  { id: 'bombardiro', name: 'Bombardiro Base', emoji: '🐊', baseCost: 2000, baseRate: 8, owned: 0, description: 'Aerial brainrot bombing' },
  { id: 'cappuccino', name: 'Cappuccino Lab', emoji: '💀', baseCost: 8000, baseRate: 25, owned: 0, description: 'Silent but productive' },
  { id: 'satellite', name: 'Satellite Cow Station', emoji: '🐄', baseCost: 30000, baseRate: 100, owned: 0, description: 'Orbital brainrot generation' },
]

const MILESTONES: Milestone[] = [
  { points: 100, reward: '🥚 First Egg!', bonus: 1.1 },
  { points: 1000, reward: '🦈 Tralalero Joins!', bonus: 1.2 },
  { points: 10000, reward: '🥁 Tung Tung Approved!', bonus: 1.5 },
  { points: 100000, reward: '🐊 Bombardiro Arrives!', bonus: 2 },
  { points: 1000000, reward: '💀 Cappuccino Assassino!', bonus: 3 },
  { points: 10000000, reward: '🐄 Orbital Achievement!', bonus: 5 },
]

const SAVE_KEY = 'brainrot-idle-save'
const MAX_OFFLINE_SECONDS = 8 * 60 * 60

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + 'B'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(2) + 'K'
  return Math.floor(n).toString()
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

function getCost(gen: Generator, qty: number): number {
  let total = 0
  for (let i = 0; i < qty; i++) {
    total += Math.floor(gen.baseCost * Math.pow(1.15, gen.owned + i))
  }
  return total
}

function getMaxBuy(gen: Generator, points: number): number {
  let qty = 0
  let total = 0
  while (true) {
    const next = Math.floor(gen.baseCost * Math.pow(1.15, gen.owned + qty))
    if (total + next > points) break
    total += next
    qty++
    if (qty >= 1000) break
  }
  return qty
}

type BuyQty = 1 | 10 | 'max'

export default function BrainrotIdleGame() {
  const [points, setPoints] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [pointsPerSecond, setPointsPerSecond] = useState(0)
  const [generators, setGenerators] = useState<Generator[]>(INITIAL_GENERATORS)
  const [multiplier, setMultiplier] = useState(1)
  const [reachedMilestones, setReachedMilestones] = useState<number[]>([])
  const [playTime, setPlayTime] = useState(0)
  const [offlineEarnings, setOfflineEarnings] = useState<number | null>(null)
  const [celebrationMsg, setCelebrationMsg] = useState<string | null>(null)
  const [buyQty, setBuyQty] = useState<BuyQty>(1)
  const [loaded, setLoaded] = useState(false)

  const generatorsRef = useRef(generators)
  const multiplierRef = useRef(multiplier)
  const pointsRef = useRef(points)
  const totalPointsRef = useRef(totalPoints)
  const reachedRef = useRef(reachedMilestones)
  const playTimeRef = useRef(playTime)

  generatorsRef.current = generators
  multiplierRef.current = multiplier
  pointsRef.current = points
  totalPointsRef.current = totalPoints
  reachedRef.current = reachedMilestones
  playTimeRef.current = playTime

  // Load save on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVE_KEY)
      if (raw) {
        const save: SaveData = JSON.parse(raw)
        const pps = save.generators.reduce((sum, g) => sum + g.baseRate * g.owned * save.multiplier, 0)
        const offlineSecs = Math.min((Date.now() - save.timestamp) / 1000, MAX_OFFLINE_SECONDS)
        const earned = pps * offlineSecs * 0.5

        setPoints(save.points + (earned > 0 ? earned : 0))
        setTotalPoints(save.totalPoints + (earned > 0 ? earned : 0))
        setGenerators(save.generators)
        setMultiplier(save.multiplier)
        setReachedMilestones(save.reachedMilestones)
        setPlayTime(save.playTime || 0)

        if (earned >= 1) {
          setOfflineEarnings(earned)
        }
      }
    } catch {
      // ignore corrupt saves
    }
    setLoaded(true)
  }, [])

  // Tick: passive income + play time
  useEffect(() => {
    if (!loaded) return
    const interval = setInterval(() => {
      const gens = generatorsRef.current
      const mult = multiplierRef.current
      const pps = gens.reduce((sum, g) => sum + g.baseRate * g.owned * mult, 0)
      setPointsPerSecond(pps)
      setPoints(p => p + pps)
      setTotalPoints(p => p + pps)
      setPlayTime(t => t + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [loaded])

  // Milestone check
  useEffect(() => {
    const newReached: number[] = []
    let newMultiplier = 1
    MILESTONES.forEach((m, i) => {
      if (totalPoints >= m.points) {
        newMultiplier = m.bonus
        if (!reachedMilestones.includes(i)) {
          newReached.push(i)
        }
      }
    })
    if (newReached.length > 0) {
      const latest = newReached[newReached.length - 1]
      setCelebrationMsg(MILESTONES[latest].reward)
      setTimeout(() => setCelebrationMsg(null), 3000)
      setReachedMilestones(prev => [...prev, ...newReached])
      setMultiplier(newMultiplier)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPoints])

  // Autosave every 30s
  useEffect(() => {
    if (!loaded) return
    const interval = setInterval(() => {
      const save: SaveData = {
        points: pointsRef.current,
        totalPoints: totalPointsRef.current,
        generators: generatorsRef.current,
        multiplier: multiplierRef.current,
        reachedMilestones: reachedRef.current,
        timestamp: Date.now(),
        playTime: playTimeRef.current,
      }
      localStorage.setItem(SAVE_KEY, JSON.stringify(save))
    }, 30000)
    return () => clearInterval(interval)
  }, [loaded])

  const collectOffline = useCallback(() => {
    setOfflineEarnings(null)
  }, [])

  const buyGenerator = useCallback((genId: string) => {
    setGenerators(prev => {
      const gen = prev.find(g => g.id === genId)
      if (!gen) return prev
      const qty = buyQty === 'max' ? getMaxBuy(gen, pointsRef.current) : buyQty
      if (qty === 0) return prev
      const cost = getCost(gen, qty)
      if (pointsRef.current < cost) return prev
      setPoints(p => p - cost)
      return prev.map(g => g.id === genId ? { ...g, owned: g.owned + qty } : g)
    })
  }, [buyQty])

  const getBuyLabel = (gen: Generator): string => {
    const qty = buyQty === 'max' ? getMaxBuy(gen, points) : buyQty
    if (qty === 0) return 'Can\'t afford'
    const cost = getCost(gen, qty)
    return `Buy ×${qty} — ${formatNumber(cost)}`
  }

  const canAfford = (gen: Generator): boolean => {
    const qty = buyQty === 'max' ? getMaxBuy(gen, points) : buyQty
    if (qty === 0) return false
    return points >= getCost(gen, qty)
  }

  const currentPPS = generators.reduce((sum, g) => sum + g.baseRate * g.owned * multiplier, 0)

  return (
    <div style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', color: '#fff', minHeight: '600px' }}>

      {/* Offline Earnings Modal */}
      {offlineEarnings !== null && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
            border: '2px solid rgba(139,92,246,0.5)',
            borderRadius: '20px',
            padding: '40px 48px',
            textAlign: 'center',
            maxWidth: '380px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>💤</div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', color: '#c4b5fd' }}>
              Welcome Back!
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontSize: '15px' }}>
              While you were away, your brainrot empire kept running.
            </p>
            <div style={{
              background: 'rgba(139,92,246,0.2)',
              borderRadius: '12px',
              padding: '16px 24px',
              margin: '20px 0',
            }}>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>Offline earnings (50% efficiency)</div>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#a78bfa' }}>
                +{formatNumber(offlineEarnings)}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Brainrot Points</div>
            </div>
            <button
              onClick={collectOffline}
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 40px',
                fontSize: '18px',
                fontWeight: 700,
                color: '#fff',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Collect!
            </button>
          </div>
        </div>
      )}

      {/* Celebration Toast */}
      {celebrationMsg && (
        <div style={{
          position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 999,
          background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
          borderRadius: '50px',
          padding: '12px 28px',
          fontSize: '18px',
          fontWeight: 700,
          color: '#1c1917',
          boxShadow: '0 8px 32px rgba(245,158,11,0.4)',
          whiteSpace: 'nowrap',
          animation: 'fadeIn 0.3s ease',
        }}>
          🎉 {celebrationMsg} — Multiplier unlocked!
        </div>
      )}

      {/* Header: Points Display */}
      <div style={{
        textAlign: 'center',
        padding: '32px 16px 24px',
        background: 'linear-gradient(180deg, rgba(139,92,246,0.15) 0%, transparent 100%)',
        borderRadius: '16px',
        marginBottom: '24px',
        border: '1px solid rgba(139,92,246,0.2)',
      }}>
        <div style={{
          fontSize: '56px',
          fontWeight: 700,
          lineHeight: 1,
          background: 'linear-gradient(135deg, #c4b5fd, #a78bfa, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '4px',
        }}>
          {formatNumber(points)}
        </div>
        <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Brainrot Points
        </div>
        <div style={{ fontSize: '20px', color: '#a78bfa', fontWeight: 600 }}>
          +{currentPPS.toFixed(1)} per second
        </div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>
          Total earned: {formatNumber(totalPoints)}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
        gap: '20px',
        alignItems: 'start',
      }}>

        {/* Left: Generators */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Generators</h2>
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['1', '10', 'max'] as const).map(q => {
                const val = q === 'max' ? 'max' : Number(q) as BuyQty
                const active = buyQty === val
                return (
                  <button
                    key={q}
                    onClick={() => setBuyQty(val as BuyQty)}
                    style={{
                      padding: '5px 14px',
                      borderRadius: '8px',
                      border: active ? '1px solid #a78bfa' : '1px solid rgba(255,255,255,0.15)',
                      background: active ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.05)',
                      color: active ? '#c4b5fd' : 'rgba(255,255,255,0.5)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    ×{q}
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {generators.map(gen => {
              const affordable = canAfford(gen)
              const genRate = gen.baseRate * gen.owned * multiplier
              return (
                <div
                  key={gen.id}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${affordable ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {/* Emoji */}
                  <div style={{ fontSize: '32px', flexShrink: 0, width: '40px', textAlign: 'center' }}>
                    {gen.emoji}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: '15px' }}>{gen.name}</span>
                      <span style={{
                        background: 'rgba(139,92,246,0.2)',
                        borderRadius: '20px',
                        padding: '1px 8px',
                        fontSize: '12px',
                        color: '#c4b5fd',
                        flexShrink: 0,
                      }}>
                        Owned: {gen.owned}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{gen.description}</div>
                    {gen.owned > 0 && (
                      <div style={{ fontSize: '12px', color: '#a78bfa', marginTop: '3px' }}>
                        Generating: {genRate.toFixed(2)}/sec
                      </div>
                    )}
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={() => buyGenerator(gen.id)}
                    disabled={!affordable}
                    style={{
                      flexShrink: 0,
                      padding: '8px 14px',
                      borderRadius: '10px',
                      border: 'none',
                      background: affordable
                        ? 'linear-gradient(135deg, #16a34a, #22c55e)'
                        : 'rgba(255,255,255,0.07)',
                      color: affordable ? '#fff' : 'rgba(255,255,255,0.3)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: affordable ? 'pointer' : 'not-allowed',
                      fontFamily: 'inherit',
                      whiteSpace: 'nowrap',
                      minWidth: '130px',
                      textAlign: 'center',
                    }}
                  >
                    {getBuyLabel(gen)}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Milestones + Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Milestones */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px',
            padding: '18px',
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 14px' }}>Milestones</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {MILESTONES.map((m, i) => {
                const reached = reachedMilestones.includes(i)
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: reached ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${reached ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.06)'}`,
                    }}
                  >
                    <span style={{ fontSize: '16px', flexShrink: 0 }}>{reached ? '✓' : '🔒'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {reached ? (
                        <>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#4ade80' }}>{m.reward}</div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>×{m.bonus} multiplier</div>
                        </>
                      ) : (
                        <>
                          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{m.reward}</div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                            {formatNumber(m.points)} pts needed
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stats */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px',
            padding: '18px',
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 14px' }}>Stats</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Total Earned', value: formatNumber(totalPoints) },
                { label: 'Points / Second', value: currentPPS.toFixed(2) },
                { label: 'Multiplier', value: `×${multiplier}` },
                { label: 'Play Time', value: formatTime(playTime) },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>{label}</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#c4b5fd' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (max-width: 640px) {
          .idle-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
