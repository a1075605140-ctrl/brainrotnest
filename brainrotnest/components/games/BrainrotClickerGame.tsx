'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Link from 'next/link'
import SFX from '@/lib/sounds'
import { burstDots, floatingText, screenFlash, confetti, glowPulse, collectFly } from '@/lib/effects'

const CHARACTERS = [
  { id: 'tralalero', slug: 'tralalero-tralala', name: 'Tralalero Tralala', emoji: '🦈', unlockAt: 0, description: 'Your first brainrot companion' },
  { id: 'bombardiro', slug: 'bombardiro-crocodilo', name: 'Bombardiro Crocodilo', emoji: '🐊', unlockAt: 500, description: 'The OG chaos agent' },
  { id: 'tung-tung', slug: 'tung-tung-sahur', name: 'Tung Tung Sahur', emoji: '🥁', unlockAt: 2000, description: 'The rhythm keeper' },
  { id: 'ballerina', slug: 'ballerina-cappuccina', name: 'Ballerina Cappuccina', emoji: '☕', unlockAt: 8000, description: 'Grace and caffeine' },
  { id: 'cappuccino', slug: 'cappuccino-assassino', name: 'Cappuccino Assassino', emoji: '💀', unlockAt: 25000, description: 'Silent but deadly' },
  { id: 'lirili', slug: 'lirili-larila', name: 'Lirili Larila', emoji: '🌺', unlockAt: 80000, description: 'Blooms dangerously' },
  { id: 'bobrito', slug: 'bobrito-bandito', name: 'Bobrito Bandito', emoji: '🤠', unlockAt: 200000, description: 'Rides fast, steals faster' },
  { id: 'frulli', slug: 'frulli-frulla', name: 'Frulli Frulla', emoji: '🍓', unlockAt: 500000, description: 'Fruity but feral' },
  { id: 'brr-brr', slug: 'brr-brr-patapim', name: 'Brr Brr Patapim', emoji: '🐸', unlockAt: 1000000, description: 'Cold and cryptic' },
  { id: 'la-vaca', slug: 'la-vaca-saturno-satalite', name: 'La Vaca Saturno', emoji: '🐄', unlockAt: 5000000, description: 'A cow. In orbit.' },
  { id: 'trippi-troppi', slug: 'trippi-troppi', name: 'Trippi Troppi', emoji: '🦐', unlockAt: 8000000, description: 'King of the deep. Absolutely unhinged.' },
  { id: 'chimpanzini', slug: 'chimpanzini-bananini', name: 'Chimpanzini Bananini', emoji: '🍌', unlockAt: 15000000, description: 'Half monkey. Half banana. Fully chaotic.' },
  { id: 'bombombini', slug: 'bombombini-gusini', name: 'Bombombini Gusini', emoji: '🪿', unlockAt: 30000000, description: "Bombardiro's brother. Still explodes." },
  { id: 'frigo-camello', slug: 'frigo-camello', name: 'Frigo Camello', emoji: '🐪', unlockAt: 60000000, description: 'A fridge camel. Wandering. Feeling things.' },
  { id: 'cocofanto', slug: 'cocofanto-elefanto', name: 'Cocofanto Elefanto', emoji: '🐘', unlockAt: 100000000, description: 'Stops time. Wears sandals. Has no notes.' },
  { id: 'boneca', slug: 'boneca-ambalabu', name: 'Boneca Ambalabu', emoji: '🪆', unlockAt: 150000000, description: 'Sits still. Watches everything.' },
  { id: 'burbaloni', slug: 'burbaloni-luliloli', name: 'Burbaloni Luliloli', emoji: '🥥', unlockAt: 250000000, description: 'Glows at midnight. Nobody asked why.' },
  { id: 'glorbo', slug: 'glorbo-fruttodrillo', name: 'Glorbo Fruttodrillo', emoji: '🍊', unlockAt: 400000000, description: 'Part fruit. Part crocodile. Fully unhinged.' },
  { id: 'bananita', slug: 'bananita-dolphina', name: 'Bananita Dolphina', emoji: '🍌', unlockAt: 600000000, description: 'Cheerful. Aquatic. Inexplicable.' },
  { id: 'giraffa', slug: 'giraffa-celeste', name: 'Giraffa Celeste', emoji: '🦒', unlockAt: 900000000, description: 'She floats. The lore simply says she floats.' },
  { id: 'zibra', slug: 'zibra-zubra-zibralini', name: 'Zibra Zubra Zibralini', emoji: '🦓', unlockAt: 1500000000, description: 'Extra syllables. Extra chaos.' },
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
  const [unlockedSlug, setUnlockedSlug] = useState<string>('')
  const [unlockedDesc, setUnlockedDesc] = useState<string>('')
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
          setUnlockedSlug(newChar.slug)
          setUnlockedDesc(newChar.description)
          sfx.unlock()
          if (gameRef.current) {
            confetti(gameRef.current, 50, [newChar.emoji, '🎉', '⭐'])
            screenFlash('rgba(191,255,0,0.2)')
          }
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
    <div ref={gameRef} style={{ background: '#0e0e1a', height: '100%', color: '#fff', position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <style>{`
        .clicker-layout {
          flex: 1;
          display: flex;
          flex-direction: row;
          overflow: hidden;
          min-height: 0;
        }
        .clicker-left {
          width: 25%;
          min-width: 190px;
          border-right: 1px solid rgba(255,255,255,0.08);
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        .clicker-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 16px;
          border-right: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          min-width: 0;
        }
        .clicker-right {
          width: 25%;
          min-width: 210px;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        .upgrade-btn:hover:not(:disabled) { opacity: 0.85; }
        .upgrade-btn:active:not(:disabled) { transform: scale(0.97); }
        .char-row { transition: background 0.15s; }
        .char-row:hover { background: rgba(255,255,255,0.04) !important; }
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-60px) scale(1.2); }
        }
        /* Mobile layout */
        @media (max-width: 767px) {
          .clicker-layout { flex-direction: column; }
          .clicker-left {
            width: 100%;
            min-width: unset;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            padding: 10px 16px;
            flex-direction: row;
            align-items: center;
            gap: 12px;
            overflow-y: visible;
            flex-shrink: 0;
          }
          .clicker-left .char-list-section { display: none; }
          .clicker-left .score-controls { flex-direction: row; }
          .clicker-center {
            flex: 1;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            min-height: 0;
            padding: 12px;
          }
          .clicker-right {
            width: 100%;
            min-width: unset;
            height: 34%;
            flex-shrink: 0;
            overflow-x: auto;
            overflow-y: hidden;
            padding: 10px 16px;
          }
          .upgrades-list {
            display: flex !important;
            flex-direction: row !important;
            width: max-content;
            gap: 8px;
            height: 100%;
          }
          .upgrade-card {
            width: 155px;
            flex-shrink: 0;
            height: fit-content;
          }
          .upgrade-tabs { flex-shrink: 0; }
        }
      `}</style>

      <div className="clicker-layout">
        {/* LEFT: Score + Character List */}
        <div className="clicker-left">
          {/* Score */}
          <div style={{ flexShrink: 0 }}>
            <div style={{
              fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
              fontSize: '40px',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#fff',
            }}>
              {formatNumber(points)}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>
              Brainrot Points
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
              👆 <strong style={{ color: '#facc15' }}>{pointsPerClick}</strong>/click
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
              ⚡ <strong style={{ color: '#4ade80' }}>{pointsPerSecond}</strong>/sec
            </div>
            <div className="score-controls" style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSoundEnabled(prev => !prev)}
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '14px', color: '#fff' }}
              >
                {soundEnabled ? '🔊' : '🔇'}
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure? This will reset all progress!')) {
                    localStorage.removeItem('brainrot-clicker-save')
                    window.location.reload()
                  }
                }}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
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
                Reset
              </button>
            </div>
          </div>

          {/* Character list */}
          <div className="char-list-section" style={{ flex: 1, minHeight: 0 }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Characters ({unlockedCount}/{CHARACTERS.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
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
                      gap: '7px',
                      padding: '6px 8px',
                      borderRadius: '8px',
                      border: isCurrent ? '1px solid rgba(250,204,21,0.5)' : '1px solid transparent',
                      background: isCurrent ? 'rgba(250,204,21,0.05)' : 'transparent',
                      opacity: isUnlocked ? 1 : 0.35,
                    }}
                  >
                    <span style={{ fontSize: '18px', flexShrink: 0 }}>
                      {isUnlocked ? char.emoji : '🔒'}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {isUnlocked ? (
                        <div style={{ fontSize: '11px', fontWeight: 600, color: isCurrent ? '#facc15' : '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {char.name}
                        </div>
                      ) : (
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>
                          {formatNumber(char.unlockAt)} pts
                        </div>
                      )}
                    </div>
                    {isCurrent && <span style={{ fontSize: '10px', color: '#facc15', flexShrink: 0 }}>▶</span>}
                    {isUnlocked && !isCurrent && <span style={{ fontSize: '10px', color: '#4ade80', flexShrink: 0 }}>✓</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* CENTER: Click Area */}
        <div className="clicker-center">
          <div style={{
            fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
            fontSize: '20px',
            fontWeight: 700,
            color: '#facc15',
            marginBottom: '4px',
            textAlign: 'center',
          }}>
            {currentCharacter.name}
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '12px', textAlign: 'center' }}>
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
              fontSize: 'clamp(90px, 12vw, 160px)',
              lineHeight: 1,
              transform: isClicking ? 'scale(1.15)' : 'scale(1)',
              transition: 'transform 0.1s ease',
              userSelect: 'none',
              padding: '8px',
              borderRadius: '50%',
              flexShrink: 0,
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
                  fontSize: '22px',
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
          <div style={{ width: '100%', maxWidth: '260px', marginTop: '20px', flexShrink: 0 }}>
            <div style={{ marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                {nextCharacter ? `Next: ${nextCharacter.emoji} ${nextCharacter.name}` : 'MAX LEVEL! 🎉'}
              </span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                className={progressToNext > 90 ? 'progress-bar-shine' : ''}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #4ade80, #22d3ee)',
                  borderRadius: '3px',
                  width: `${progressToNext}%`,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            {nextCharacter && (
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '4px', textAlign: 'right' }}>
                {formatNumber(nextCharacter.unlockAt - totalPoints)} pts to go
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Upgrades Panel */}
        <div className="clicker-right">
          {/* Tabs */}
          <div className="upgrade-tabs" style={{ display: 'flex', gap: '4px', marginBottom: '12px', flexShrink: 0 }}>
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
          <div className="upgrades-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            {(activeTab === 'click' ? clickUpgrades : passiveUpgrades).map(upgrade => {
              const cost = getUpgradeCost(upgrade)
              const canAfford = points >= cost
              return (
                <div
                  key={upgrade.id}
                  className="upgrade-card"
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

      {/* Unlock Modal */}
      {unlockedPopup && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            borderRadius: '12px',
            padding: '16px',
          }}
        >
          <div
            className="animate-big-bounce"
            style={{
              background: '#1a1a2e',
              border: '2px solid rgba(250,204,21,0.4)',
              borderRadius: '16px',
              padding: '32px 36px',
              textAlign: 'center',
              boxShadow: '0 0 60px rgba(250,204,21,0.15)',
              maxWidth: '340px',
              width: '100%',
            }}
          >
            <div style={{ fontSize: '72px', lineHeight: 1, marginBottom: '12px' }}>{unlockedEmoji}</div>
            <div style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '26px', fontWeight: 700, color: '#facc15', letterSpacing: '0.05em', marginBottom: '6px' }}>
              UNLOCKED!
            </div>
            <div style={{ fontSize: '16px', color: '#fff', fontWeight: 600, marginBottom: '6px' }}>{unlockedPopup}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginBottom: '24px', lineHeight: 1.5 }}>{unlockedDesc}</div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setUnlockedPopup(null)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
              >
                继续点击 →
              </button>
              <Link
                href={`/characters/${unlockedSlug}`}
                onClick={() => setUnlockedPopup(null)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  background: '#facc15',
                  color: '#000',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                查看角色详情 →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
