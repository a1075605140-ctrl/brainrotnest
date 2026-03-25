'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import SFX from '@/lib/sounds'
import { burstDots, floatingText, screenFlash, confetti, glowPulse, collectFly } from '@/lib/effects'

const CHARACTERS = [
  { id: 'tralalero', name: 'Tralalero Tralala', emoji: '🦈', unlockAt: 0, description: 'Your first brainrot companion' },
  { id: 'bombardiro', name: 'Bombardiro Crocodilo', emoji: '🐊', unlockAt: 500, description: 'The OG chaos agent' },
  { id: 'tung-tung', name: 'Tung Tung Sahur', emoji: '🥁', unlockAt: 2000, description: 'The rhythm keeper' },
  { id: 'ballerina', name: 'Ballerina Cappuccina', emoji: '☕', unlockAt: 8000, description: 'Grace and caffeine' },
  { id: 'cappuccino', name: 'Cappuccino Assassino', emoji: '💀', unlockAt: 25000, description: 'Silent but deadly' },
  { id: 'lirili', name: 'Lirili Larila', emoji: '🌺', unlockAt: 80000, description: 'Blooms dangerously' },
  { id: 'bobrito', name: 'Bobrito Bandito', emoji: '🤠', unlockAt: 200000, description: 'Rides fast, steals faster' },
  { id: 'frulli', name: 'Frulli Frulla', emoji: '🍓', unlockAt: 500000, description: 'Fruity but feral' },
  { id: 'brr-brr', name: 'Brr Brr Patapim', emoji: '🐸', unlockAt: 1000000, description: 'Cold and cryptic' },
  { id: 'la-vaca', name: 'La Vaca Saturno', emoji: '🐄', unlockAt: 5000000, description: 'A cow. In orbit.' },
]

const INITIAL_CLICK_UPGRADES = [
  { id: 'cursor', name: 'Extra Cursor', emoji: '👆', baseCost: 50, bonusPerClick: 1, purchased: 0, description: '+1 per click' },
  { id: 'espresso', name: 'Espresso Shot', emoji: '☕', baseCost: 200, bonusPerClick: 3, purchased: 0, description: '+3 per click' },
  { id: 'tung-drum', name: 'Tung Drum', emoji: '🥁', baseCost: 800, bonusPerClick: 8, purchased: 0, description: '+8 per click' },
  { id: 'croc-army', name: 'Croc Army', emoji: '🐊', baseCost: 3000, bonusPerClick: 20, purchased: 0, description: '+20 per click' },
  { id: 'brainrot-beam', name: 'Brainrot Beam', emoji: '✨', baseCost: 10000, bonusPerClick: 50, purchased: 0, description: '+50 per click' },
  { id: 'satellite-cow', name: 'Satellite Cow', emoji: '🐄', baseCost: 50000, bonusPerClick: 150, purchased: 0, description: '+150 per click' },
]

const INITIAL_PASSIVE_UPGRADES = [
  { id: 'auto-click', name: 'Auto Clicker', emoji: '🤖', baseCost: 100, bonusPerSecond: 1, purchased: 0, description: '+1 per second' },
  { id: 'brainrot-farm', name: 'Brainrot Farm', emoji: '🌿', baseCost: 500, bonusPerSecond: 5, purchased: 0, description: '+5 per second' },
  { id: 'chaos-factory', name: 'Chaos Factory', emoji: '🏭', baseCost: 2000, bonusPerSecond: 15, purchased: 0, description: '+15 per second' },
  { id: 'orbital-station', name: 'Orbital Station', emoji: '🛸', baseCost: 10000, bonusPerSecond: 60, purchased: 0, description: '+60 per second' },
]

interface ClickEffect {
  id: number
  x: number
  y: number
  value: number
}

interface Upgrade {
  id: string
  name: string
  emoji: string
  baseCost: number
  purchased: number
  description: string
}

interface ClickUpgrade extends Upgrade {
  bonusPerClick: number
}

interface PassiveUpgrade extends Upgrade {
  bonusPerSecond: number
}

export default function BrainrotClickerGame() {
  const [points, setPoints] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [clickUpgrades, setClickUpgrades] = useState<ClickUpgrade[]>(INITIAL_CLICK_UPGRADES)
  const [passiveUpgrades, setPassiveUpgrades] = useState<PassiveUpgrade[]>(INITIAL_PASSIVE_UPGRADES)
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([])
  const [isClicking, setIsClicking] = useState(false)
  const [unlockedPopup, setUnlockedPopup] = useState<string | null>(null)
  const [unlockedEmoji, setUnlockedEmoji] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'click' | 'passive'>('click')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const effectIdRef = useRef(0)
  const gameRef = useRef<HTMLDivElement>(null)
  const passiveTimerRef = useRef(0)

  const sfx = useMemo(() => {
    if (!soundEnabled) return new Proxy({} as typeof SFX, { get: () => (..._args: any[]) => {} })
    return SFX
  }, [soundEnabled])

  const pointsPerClick = useMemo(() => {
    return 1 + clickUpgrades.reduce((sum, u) => sum + u.bonusPerClick * u.purchased, 0)
  }, [clickUpgrades])

  const pointsPerSecond = useMemo(() => {
    return passiveUpgrades.reduce((sum, u) => sum + u.bonusPerSecond * u.purchased, 0)
  }, [passiveUpgrades])

  const currentCharacter = useMemo(() => {
    const unlocked = CHARACTERS.filter(c => totalPoints >= c.unlockAt)
    return unlocked[unlocked.length - 1]
  }, [totalPoints])

  const nextCharacter = useMemo(() => {
    return CHARACTERS.find(c => totalPoints < c.unlockAt) ?? null
  }, [totalPoints])

  const progressToNext = useMemo(() => {
    if (!nextCharacter) return 100
    const prev = currentCharacter.unlockAt
    const next = nextCharacter.unlockAt
    return Math.min(100, ((totalPoints - prev) / (next - prev)) * 100)
  }, [totalPoints, currentCharacter, nextCharacter])

  const unlockedCount = useMemo(() => {
    return CHARACTERS.filter(c => totalPoints >= c.unlockAt).length
  }, [totalPoints])

  const getUpgradeCost = (upgrade: Upgrade) => {
    return Math.floor(upgrade.baseCost * Math.pow(1.5, upgrade.purchased))
  }

  const formatNumber = (n: number) => {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
    return Math.floor(n).toString()
  }

  const saveGame = useCallback((p: number, tp: number, cu: ClickUpgrade[], pu: PassiveUpgrade[]) => {
    try {
      localStorage.setItem('brainrot-clicker-save', JSON.stringify({
        points: p,
        totalPoints: tp,
        clickUpgrades: cu,
        passiveUpgrades: pu,
      }))
    } catch (e) {}
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    sfx.click()
    if (gameRef.current) {
      const container = gameRef.current
      const containerRect = container.getBoundingClientRect()
      const cx = e.clientX - containerRect.left
      const cy = e.clientY - containerRect.top
      burstDots(container, cx, cy, ['#BFFF00', '#FFD700', '#FF6B9D'], 8)
      floatingText(container, cx, cy - 20, `+${formatNumber(pointsPerClick)}`, '#BFFF00')
    }

    setPoints(p => {
      const newPoints = p + pointsPerClick
      setTotalPoints(prev => {
        const newTotal = prev + pointsPerClick
        const prevUnlocked = CHARACTERS.filter(c => prev >= c.unlockAt)
        const newUnlocked = CHARACTERS.filter(c => newTotal >= c.unlockAt)
        if (newUnlocked.length > prevUnlocked.length) {
          const newChar = newUnlocked[newUnlocked.length - 1]
          setUnlockedPopup(newChar.name)
          setUnlockedEmoji(newChar.emoji)
          sfx.unlock()
          if (gameRef.current) {
            confetti(gameRef.current, 50, [newChar.emoji, '🎉', '⭐'])
            screenFlash('rgba(191,255,0,0.2)')
          }
          setTimeout(() => setUnlockedPopup(null), 2500)
        }
        saveGame(newPoints, newTotal, clickUpgrades, passiveUpgrades)
        return newTotal
      })
      return newPoints
    })

    const id = effectIdRef.current++
    setClickEffects(prev => [...prev, { id, x, y, value: pointsPerClick }])
    setTimeout(() => {
      setClickEffects(prev => prev.filter(ef => ef.id !== id))
    }, 800)

    setIsClicking(true)
    setTimeout(() => setIsClicking(false), 100)
  }, [pointsPerClick, clickUpgrades, passiveUpgrades, saveGame, sfx])

  const buyClickUpgrade = useCallback((upgradeId: string, btnEl?: HTMLElement | null) => {
    setClickUpgrades(prev => prev.map(u => {
      if (u.id !== upgradeId) return u
      const cost = getUpgradeCost(u)
      if (points < cost) {
        sfx.error()
        if (btnEl) {
          btnEl.classList.remove('animate-head-shake')
          void btnEl.offsetWidth
          btnEl.classList.add('animate-head-shake')
          setTimeout(() => btnEl.classList.remove('animate-head-shake'), 500)
        }
        return u
      }
      sfx.purchase()
      if (btnEl) glowPulse(btnEl, '#4ade80')
      setPoints(p => p - cost)
      return { ...u, purchased: u.purchased + 1 }
    }))
  }, [points, sfx])

  const buyPassiveUpgrade = useCallback((upgradeId: string, btnEl?: HTMLElement | null) => {
    setPassiveUpgrades(prev => prev.map(u => {
      if (u.id !== upgradeId) return u
      const cost = getUpgradeCost(u)
      if (points < cost) {
        sfx.error()
        if (btnEl) {
          btnEl.classList.remove('animate-head-shake')
          void btnEl.offsetWidth
          btnEl.classList.add('animate-head-shake')
          setTimeout(() => btnEl.classList.remove('animate-head-shake'), 500)
        }
        return u
      }
      sfx.purchase()
      if (btnEl) glowPulse(btnEl, '#4ade80')
      setPoints(p => p - cost)
      return { ...u, purchased: u.purchased + 1 }
    }))
  }, [points, sfx])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('brainrot-clicker-save')
      if (saved) {
        const data = JSON.parse(saved)
        if (data.points) setPoints(data.points)
        if (data.totalPoints) setTotalPoints(data.totalPoints)
        if (data.clickUpgrades) setClickUpgrades(data.clickUpgrades)
        if (data.passiveUpgrades) setPassiveUpgrades(data.passiveUpgrades)
      }
    } catch (e) {
      console.log('No save found')
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('brainrot-clicker-save', JSON.stringify({
        points,
        totalPoints,
        clickUpgrades,
        passiveUpgrades,
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [points, totalPoints, clickUpgrades, passiveUpgrades])

  useEffect(() => {
    if (pointsPerSecond === 0) return
    const interval = setInterval(() => {
      setPoints(p => p + pointsPerSecond)
      setTotalPoints(p => p + pointsPerSecond)

      passiveTimerRef.current += 1
      if (passiveTimerRef.current >= 5) {
        passiveTimerRef.current = 0
        sfx.passiveIncome()
        if (gameRef.current) {
          const rx = 20 + Math.random() * 60
          const ry = 20 + Math.random() * 40
          collectFly(gameRef.current, '💰', rx, ry, 20, 20)
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [pointsPerSecond, sfx])

  return (
    <div ref={gameRef} style={{ background: '#0e0e1a', minHeight: '700px', color: '#fff', position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
      <button
        onClick={() => setSoundEnabled(prev => !prev)}
        className="absolute top-3 right-3 z-10 px-3 py-2 rounded-lg text-white text-sm"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>

      {/* Score Header */}
      <div style={{ position: 'relative', textAlign: 'center', padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <button
          onClick={() => {
            if (confirm('Are you sure? This will reset all progress!')) {
              localStorage.removeItem('brainrot-clicker-save')
              window.location.reload()
            }
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '14px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.3)',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,100,100,0.7)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
        >
          Reset Game
        </button>
        <div style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '48px', fontWeight: 700, lineHeight: 1, color: '#fff' }}>
          {formatNumber(points)}
        </div>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
          Brainrot Points
        </div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
          {pointsPerClick}/click · {pointsPerSecond}/sec
        </div>
      </div>

      {/* Main 3-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '0' }} className="game-grid">
        <style>{`
          @media (min-width: 1024px) {
            .game-grid { grid-template-columns: 220px 1fr 260px !important; }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .game-grid { grid-template-columns: 1fr 1fr !important; }
          }
          .upgrade-btn:hover:not(:disabled) { opacity: 0.85; }
          .upgrade-btn:active:not(:disabled) { transform: scale(0.97); }
          .char-row { transition: background 0.15s; }
          .char-row:hover { background: rgba(255,255,255,0.04) !important; }
          @keyframes floatUp {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-60px) scale(1.2); }
          }
        `}</style>

        {/* Left: Character List */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.08)', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Characters ({unlockedCount}/10)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {CHARACTERS.map(char => {
              const isUnlocked = totalPoints >= char.unlockAt
              const isCurrent = char.id === currentCharacter.id
              return (
                <div
                  key={char.id}
                  className="char-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: isCurrent ? '1px solid rgba(250,204,21,0.5)' : '1px solid transparent',
                    background: isCurrent ? 'rgba(250,204,21,0.05)' : 'transparent',
                    opacity: isUnlocked ? 1 : 0.4,
                  }}
                >
                  <span style={{ fontSize: '22px', flexShrink: 0 }}>
                    {isUnlocked ? char.emoji : '🔒'}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {isUnlocked ? (
                      <>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: isCurrent ? '#facc15' : '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {char.name}
                        </div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {char.description}
                        </div>
                      </>
                    ) : (
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                        Unlock at {formatNumber(char.unlockAt)} pts
                      </div>
                    )}
                  </div>
                  {isUnlocked && (
                    <span style={{ fontSize: '12px', color: '#4ade80', flexShrink: 0 }}>✓</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Center: Click Area */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '22px', fontWeight: 700, color: '#facc15', marginBottom: '8px', textAlign: 'center' }}>
            {currentCharacter.name}
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px', textAlign: 'center' }}>
            {currentCharacter.description}
          </div>

          {/* Click Button */}
          <button
            onClick={handleClick}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '120px',
              lineHeight: 1,
              transform: isClicking ? 'scale(1.15)' : 'scale(1)',
              transition: 'transform 0.1s ease',
              userSelect: 'none',
              padding: '8px',
              borderRadius: '50%',
            }}
            aria-label={`Click ${currentCharacter.name}`}
          >
            {currentCharacter.emoji}
            {clickEffects.map(effect => (
              <span
                key={effect.id}
                style={{
                  position: 'absolute',
                  left: effect.x,
                  top: effect.y,
                  color: '#facc15',
                  fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
                  fontSize: '20px',
                  fontWeight: 700,
                  pointerEvents: 'none',
                  animation: 'floatUp 0.8s ease-out forwards',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}
              >
                +{formatNumber(effect.value)}
              </span>
            ))}
          </button>

          {/* Progress to next character */}
          <div style={{ width: '100%', maxWidth: '280px', marginTop: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                {nextCharacter ? `Next: ${nextCharacter.emoji} ${nextCharacter.name}` : 'MAX LEVEL! 🎉'}
              </span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                className={progressToNext > 90 ? 'progress-bar-shine' : ''}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #4ade80, #22d3ee)',
                  borderRadius: '4px',
                  width: `${progressToNext}%`,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            {nextCharacter && (
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '4px', textAlign: 'right' }}>
                {formatNumber(nextCharacter.unlockAt - totalPoints)} points to go
              </div>
            )}
          </div>
        </div>

        {/* Right: Upgrades Panel */}
        <div style={{ padding: '16px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
            {(['click', 'passive'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: '7px 4px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: activeTab === tab ? 'rgba(250,204,21,0.15)' : 'rgba(255,255,255,0.05)',
                  color: activeTab === tab ? '#facc15' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.15s',
                }}
              >
                {tab === 'click' ? '👆 Click' : '⚡ Passive'}
              </button>
            ))}
          </div>

          {/* Upgrade List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {(activeTab === 'click' ? clickUpgrades : passiveUpgrades).map(upgrade => {
              const cost = getUpgradeCost(upgrade)
              const canAfford = points >= cost
              return (
                <div
                  key={upgrade.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span style={{ fontSize: '22px', flexShrink: 0 }}>{upgrade.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>{upgrade.name}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{upgrade.description}</div>
                    {upgrade.purchased > 0 && (
                      <div style={{ fontSize: '10px', color: '#facc15', marginTop: '2px' }}>
                        ×{upgrade.purchased}
                      </div>
                    )}
                  </div>
                  <button
                    className="upgrade-btn"
                    disabled={!canAfford}
                    onClick={e => {
                      const btn = e.currentTarget
                      if (activeTab === 'click') buyClickUpgrade(upgrade.id, btn)
                      else buyPassiveUpgrade(upgrade.id, btn)
                    }}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: canAfford ? 'pointer' : 'not-allowed',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: canAfford ? '#4ade80' : 'rgba(255,255,255,0.1)',
                      color: canAfford ? '#000' : 'rgba(255,255,255,0.3)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      transition: 'all 0.15s',
                    }}
                  >
                    {formatNumber(cost)}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Unlock Popup Overlay */}
      {unlockedPopup && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            borderRadius: '12px',
          }}
        >
          <div
            className="animate-big-bounce"
            style={{
              background: '#1a1a2e',
              border: '2px solid rgba(250,204,21,0.4)',
              borderRadius: '16px',
              padding: '40px 48px',
              textAlign: 'center',
              boxShadow: '0 0 60px rgba(250,204,21,0.15)',
            }}
          >
            <div style={{ fontSize: '72px', lineHeight: 1, marginBottom: '12px' }}>{unlockedEmoji}</div>
            <div style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '28px', fontWeight: 700, color: '#facc15', letterSpacing: '0.05em', marginBottom: '8px' }}>
              UNLOCKED!
            </div>
            <div style={{ fontSize: '16px', color: '#fff', fontWeight: 600 }}>{unlockedPopup}</div>
          </div>
        </div>
      )}
    </div>
  )
}
