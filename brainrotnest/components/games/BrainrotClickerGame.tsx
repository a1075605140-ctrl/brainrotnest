'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Link from 'next/link'
import SFX from '@/lib/sounds'
import { burstDots, floatingText, screenFlash, confetti, glowPulse, collectFly } from '@/lib/effects'

const SAVE_KEY = 'brainrotnest_clicker_save'
const LOGIN_KEY = 'brainrotnest_clicker_login'
const LEGACY_SAVE_KEY = 'brainrot-clicker-save'

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

const ACHIEVEMENTS = [
  { id: 'first-click', emoji: '🏆', name: 'First Click', desc: 'Click for the first time' },
  { id: '100-clicks', emoji: '🔥', name: '100 Clicks', desc: 'Reach 100 total clicks' },
  { id: 'speed-demon', emoji: '⚡', name: 'Speed Demon', desc: 'Click 50 times in 10 seconds' },
  { id: 'night-owl', emoji: '🌙', name: 'Night Owl', desc: 'Play after midnight' },
  { id: 'bombardiro', emoji: '🐊', name: 'Bombardiro Unlocked', desc: 'Unlock Bombardiro Crocodilo' },
  { id: 'full-roster', emoji: '👑', name: 'Full Roster', desc: 'Unlock all characters' },
  { id: 'millionaire', emoji: '💰', name: 'Millionaire', desc: 'Earn 1,000,000 total points' },
  { id: 'to-the-moon', emoji: '🚀', name: 'To The Moon', desc: 'Earn 10,000,000 total points' },
]

const RANDOM_EVENTS = [
  { id: 'surge', emoji: '🎰', name: 'Brainrot Surge', desc: 'Click income ×3!', color: '#ff6b9d' },
  { id: 'chaos', emoji: '🌀', name: 'Chaos Mode', desc: 'Passive income ×5!', color: '#a78bfa' },
  { id: 'golden', emoji: '⭐', name: 'Golden Click', desc: 'Next click ×100!', color: '#facc15' },
]

function getDailyReward(streak: number): number {
  const rewards = [100, 250, 500, 1000, 2000, 5000, 10000]
  return rewards[Math.min(streak - 1, rewards.length - 1)]
}

function getComboMultiplier(combo: number): number {
  if (combo >= 50) return 10
  if (combo >= 20) return 5
  if (combo >= 10) return 3
  if (combo >= 5) return 2
  return 1
}

function formatElapsed(hours: number): string {
  if (hours < 1 / 60) return 'a few seconds'
  if (hours < 1) return `${Math.round(hours * 60)} minutes`
  return `${hours.toFixed(1)} hours`
}

interface ClickEffect { id: number; x: number; y: number; value: number }
interface Upgrade { id: string; name: string; emoji: string; baseCost: number; purchased: number; description: string }
interface ClickUpgrade extends Upgrade { bonusPerClick: number }
interface PassiveUpgrade extends Upgrade { bonusPerSecond: number }
interface Toast { id: string; emoji: string; name: string }

export default function BrainrotClickerGame() {
  // ── Core state ──────────────────────────────────────────────────────────
  const [points, setPoints] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [totalClicks, setTotalClicks] = useState(0)
  const [clickUpgrades, setClickUpgrades] = useState<ClickUpgrade[]>(INITIAL_CLICK_UPGRADES)
  const [passiveUpgrades, setPassiveUpgrades] = useState<PassiveUpgrade[]>(INITIAL_PASSIVE_UPGRADES)
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([])
  const [isClicking, setIsClicking] = useState(false)
  const [activeTab, setActiveTab] = useState<'click' | 'passive' | 'achievements'>('click')
  const [soundEnabled, setSoundEnabled] = useState(true)

  // ── Character unlock popup ──────────────────────────────────────────────
  const [unlockedPopup, setUnlockedPopup] = useState<string | null>(null)
  const [unlockedEmoji, setUnlockedEmoji] = useState('')
  const [unlockedSlug, setUnlockedSlug] = useState('')
  const [unlockedDesc, setUnlockedDesc] = useState('')

  // ── Achievements ────────────────────────────────────────────────────────
  const [achievements, setAchievements] = useState<Set<string>>(new Set())
  const [toastQueue, setToastQueue] = useState<Toast[]>([])
  const [currentToast, setCurrentToast] = useState<Toast | null>(null)

  // ── Combo ───────────────────────────────────────────────────────────────
  const [combo, setCombo] = useState(0)
  const comboTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clickTimestampsRef = useRef<number[]>([])

  // ── Random events ───────────────────────────────────────────────────────
  const [activeEvent, setActiveEvent] = useState<{ id: string; endTime: number } | null>(null)
  const [goldenClickUsed, setGoldenClickUsed] = useState(false)
  const [eventCountdown, setEventCountdown] = useState(0)

  // ── Load-time popups ────────────────────────────────────────────────────
  const [offlinePopup, setOfflinePopup] = useState<{ hours: number; earned: number } | null>(null)
  const [dailyLoginPopup, setDailyLoginPopup] = useState<{ streak: number; reward: number } | null>(null)

  // ── Refs ────────────────────────────────────────────────────────────────
  const effectIdRef = useRef(0)
  const gameRef = useRef<HTMLDivElement>(null)
  const passiveTimerRef = useRef(0)
  const eventSchedulerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Derived values ──────────────────────────────────────────────────────
  const sfx = useMemo(() => {
    if (!soundEnabled) return new Proxy({} as typeof SFX, { get: () => (..._args: unknown[]) => {} })
    return SFX
  }, [soundEnabled])

  const pointsPerClick = useMemo(
    () => 1 + clickUpgrades.reduce((s, u) => s + u.bonusPerClick * u.purchased, 0),
    [clickUpgrades],
  )

  const pointsPerSecond = useMemo(
    () => passiveUpgrades.reduce((s, u) => s + u.bonusPerSecond * u.purchased, 0),
    [passiveUpgrades],
  )

  const effectivePointsPerSecond = useMemo(
    () => (activeEvent?.id === 'chaos' ? pointsPerSecond * 5 : pointsPerSecond),
    [pointsPerSecond, activeEvent],
  )

  const comboMultiplier = useMemo(() => getComboMultiplier(combo), [combo])

  const displayPointsPerClick = useMemo(() => {
    let v = pointsPerClick
    if (activeEvent?.id === 'surge') v *= 3
    v *= comboMultiplier
    return v
  }, [pointsPerClick, activeEvent, comboMultiplier])

  const currentCharacter = useMemo(() => {
    const u = CHARACTERS.filter(c => totalPoints >= c.unlockAt)
    return u[u.length - 1]
  }, [totalPoints])

  const nextCharacter = useMemo(
    () => CHARACTERS.find(c => totalPoints < c.unlockAt) ?? null,
    [totalPoints],
  )

  const progressToNext = useMemo(() => {
    if (!nextCharacter) return 100
    const prev = currentCharacter.unlockAt
    const next = nextCharacter.unlockAt
    return Math.min(100, ((totalPoints - prev) / (next - prev)) * 100)
  }, [totalPoints, currentCharacter, nextCharacter])

  const unlockedCount = useMemo(
    () => CHARACTERS.filter(c => totalPoints >= c.unlockAt).length,
    [totalPoints],
  )

  const achievementCount = useMemo(() => achievements.size, [achievements])

  // ── Helpers ─────────────────────────────────────────────────────────────
  const getUpgradeCost = (u: Upgrade) => Math.floor(u.baseCost * Math.pow(1.5, u.purchased))

  const formatNumber = (n: number) => {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
    return Math.floor(n).toString()
  }

  // ── Achievement unlock (stable, idempotent) ─────────────────────────────
  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      const ach = ACHIEVEMENTS.find(a => a.id === id)
      if (ach) {
        const t: Toast = { id: ach.id, emoji: ach.emoji, name: ach.name }
        setTimeout(() => setToastQueue(q => [...q, t]), 0)
      }
      return next
    })
  }, [])

  // ── Click handler ────────────────────────────────────────────────────────
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const now = Date.now()

    // Update timestamps: 10s window covers both combo (2s) and Speed Demon (10s)
    clickTimestampsRef.current = [...clickTimestampsRef.current, now].filter(t => now - t <= 10000)
    const comboNow = clickTimestampsRef.current.filter(t => now - t <= 2000).length
    setCombo(comboNow)

    if (comboTimerRef.current) clearTimeout(comboTimerRef.current)
    comboTimerRef.current = setTimeout(() => setCombo(0), 2000)

    if (clickTimestampsRef.current.length >= 50) unlockAchievement('speed-demon')

    // Determine click value
    let clickValue: number
    let isGolden = false

    if (activeEvent?.id === 'golden' && !goldenClickUsed) {
      clickValue = pointsPerClick * 100
      isGolden = true
      setGoldenClickUsed(true)
      setActiveEvent(null)
    } else {
      let base = pointsPerClick
      if (activeEvent?.id === 'surge') base *= 3
      clickValue = base * getComboMultiplier(comboNow)
    }

    sfx.click()
    if (gameRef.current) {
      const cr = gameRef.current.getBoundingClientRect()
      const cx = e.clientX - cr.left
      const cy = e.clientY - cr.top
      burstDots(gameRef.current, cx, cy, isGolden ? ['#FFD700', '#FFA500', '#FFE44D'] : ['#BFFF00', '#FFD700', '#FF6B9D'], 8)
      floatingText(gameRef.current, cx, cy - 20, `+${formatNumber(clickValue)}${isGolden ? ' ⭐' : ''}`, isGolden ? '#FFD700' : '#BFFF00')
    }

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPoints(p => {
      const np = p + clickValue
      setTotalPoints(prev => {
        const nt = prev + clickValue
        const prevUnlocked = CHARACTERS.filter(c => prev >= c.unlockAt)
        const newUnlocked = CHARACTERS.filter(c => nt >= c.unlockAt)
        if (newUnlocked.length > prevUnlocked.length) {
          const nc = newUnlocked[newUnlocked.length - 1]
          setUnlockedPopup(nc.name)
          setUnlockedEmoji(nc.emoji)
          setUnlockedSlug(nc.slug)
          setUnlockedDesc(nc.description)
          sfx.unlock()
          if (gameRef.current) {
            confetti(gameRef.current, 50, [nc.emoji, '🎉', '⭐'])
            screenFlash('rgba(191,255,0,0.2)')
          }
        }
        return nt
      })
      return np
    })

    setTotalClicks(prev => {
      const n = prev + 1
      if (n === 1) unlockAchievement('first-click')
      if (n >= 100) unlockAchievement('100-clicks')
      return n
    })

    const id = effectIdRef.current++
    setClickEffects(ef => [...ef, { id, x, y, value: clickValue }])
    setTimeout(() => setClickEffects(ef => ef.filter(ce => ce.id !== id)), 800)

    setIsClicking(true)
    setTimeout(() => setIsClicking(false), 100)
  }, [pointsPerClick, activeEvent, goldenClickUsed, sfx, unlockAchievement])

  // ── Buy handlers ──────────────────────────────────────────────────────────
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

  // ── Load game + offline earnings + daily login ────────────────────────────
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    try {
      const savedStr = localStorage.getItem(SAVE_KEY) || localStorage.getItem(LEGACY_SAVE_KEY)
      if (savedStr) {
        const data = JSON.parse(savedStr) as Record<string, unknown>
        const savedPU = (data.passiveUpgrades as PassiveUpgrade[] | undefined) ?? []
        const savedPPS = savedPU.reduce((s, u) => s + u.bonusPerSecond * u.purchased, 0)
        let lp = (data.points as number | undefined) ?? 0
        let ltp = (data.totalPoints as number | undefined) ?? 0

        if (data.lastExit && savedPPS > 0) {
          const elapsed = Math.min((Date.now() - (data.lastExit as number)) / 1000, 86400)
          const earned = Math.floor(savedPPS * elapsed)
          if (earned > 0) {
            lp += earned
            ltp += earned
            setOfflinePopup({ hours: Math.round((elapsed / 3600) * 10) / 10, earned })
          }
        }

        setPoints(lp)
        setTotalPoints(ltp)
        if (data.totalClicks) setTotalClicks(data.totalClicks as number)
        if (data.clickUpgrades) setClickUpgrades(data.clickUpgrades as ClickUpgrade[])
        if (data.passiveUpgrades) setPassiveUpgrades(data.passiveUpgrades as PassiveUpgrade[])
        if (data.achievements) setAchievements(new Set(data.achievements as string[]))
      }
    } catch { /* ignore */ }

    try {
      const loginData = JSON.parse(localStorage.getItem(LOGIN_KEY) ?? '{}') as { lastDate?: string; streak?: number }
      const today = new Date().toDateString()
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      if (loginData.lastDate !== today) {
        const streak = loginData.lastDate === yesterday ? (loginData.streak ?? 0) + 1 : 1
        const reward = getDailyReward(streak)
        localStorage.setItem(LOGIN_KEY, JSON.stringify({ lastDate: today, streak }))
        setDailyLoginPopup({ streak, reward })
        setPoints(p => p + reward)
        setTotalPoints(p => p + reward)
      }
    } catch { /* ignore */ }

    const hour = new Date().getHours()
    if (hour < 6) setTimeout(() => unlockAchievement('night-owl'), 600)
  }, []) // intentional empty deps — runs once on mount

  // ── Achievement checks driven by totalPoints (passive income path) ────────
  useEffect(() => {
    const ids = CHARACTERS.filter(c => totalPoints >= c.unlockAt).map(c => c.id)
    if (ids.includes('bombardiro')) unlockAchievement('bombardiro')
    if (ids.length === CHARACTERS.length) unlockAchievement('full-roster')
    if (totalPoints >= 1000000) unlockAchievement('millionaire')
    if (totalPoints >= 10000000) unlockAchievement('to-the-moon')
  }, [totalPoints, unlockAchievement])

  // ── Auto-save every 5 s ───────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify({
          points, totalPoints, totalClicks,
          clickUpgrades, passiveUpgrades,
          achievements: Array.from(achievements),
          lastExit: Date.now(),
        }))
      } catch { /* ignore */ }
    }, 5000)
    return () => clearInterval(interval)
  }, [points, totalPoints, totalClicks, clickUpgrades, passiveUpgrades, achievements])

  // ── Save on page close ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => {
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify({
          points, totalPoints, totalClicks,
          clickUpgrades, passiveUpgrades,
          achievements: Array.from(achievements),
          lastExit: Date.now(),
        }))
      } catch { /* ignore */ }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [points, totalPoints, totalClicks, clickUpgrades, passiveUpgrades, achievements])

  // ── Passive income ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (effectivePointsPerSecond === 0) return
    const interval = setInterval(() => {
      setPoints(p => p + effectivePointsPerSecond)
      setTotalPoints(p => p + effectivePointsPerSecond)
      passiveTimerRef.current += 1
      if (passiveTimerRef.current >= 5) {
        passiveTimerRef.current = 0
        sfx.passiveIncome()
        if (gameRef.current) {
          collectFly(gameRef.current, '💰', 20 + Math.random() * 60, 20 + Math.random() * 40, 20, 20)
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [effectivePointsPerSecond, sfx])

  // ── Random event scheduler ────────────────────────────────────────────────
  useEffect(() => {
    function schedule() {
      const delay = 90000 + Math.random() * 60000 // 90–150 s
      eventSchedulerRef.current = setTimeout(() => {
        const ev = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)]
        setActiveEvent({ id: ev.id, endTime: Date.now() + 30000 })
        setGoldenClickUsed(false)
        if (gameRef.current) screenFlash(ev.color + '44')
        schedule()
      }, delay)
    }
    schedule()
    return () => { if (eventSchedulerRef.current) clearTimeout(eventSchedulerRef.current) }
  }, [])

  // ── Event countdown + expiry ──────────────────────────────────────────────
  useEffect(() => {
    if (!activeEvent) { setEventCountdown(0); return }
    const interval = setInterval(() => {
      const rem = Math.ceil((activeEvent.endTime - Date.now()) / 1000)
      if (rem <= 0) { setActiveEvent(null); setEventCountdown(0) }
      else setEventCountdown(rem)
    }, 250)
    return () => clearInterval(interval)
  }, [activeEvent])

  // ── Toast queue: show one at a time, 3.5 s each ───────────────────────────
  useEffect(() => {
    if (currentToast || toastQueue.length === 0) return
    const [next, ...rest] = toastQueue
    setCurrentToast(next)
    setToastQueue(rest)
    const timer = setTimeout(() => setCurrentToast(null), 3500)
    return () => clearTimeout(timer)
  }, [toastQueue, currentToast])

  // ── JSX ───────────────────────────────────────────────────────────────────
  const activeEventData = activeEvent ? RANDOM_EVENTS.find(e => e.id === activeEvent.id) : null

  return (
    <div
      ref={gameRef}
      style={{
        background: '#0e0e1a',
        height: '100%',
        color: '#fff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: activeEventData
          ? `inset 0 0 0 2px ${activeEventData.color}88, inset 0 0 60px ${activeEventData.color}22`
          : 'none',
        transition: 'box-shadow 0.6s ease',
      }}
    >
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
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes comboPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
        @keyframes eventSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalBounce {
          0%   { transform: scale(0.7); opacity: 0; }
          60%  { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); }
        }
        .combo-badge { animation: comboPop 0.25s ease; }
        .event-banner { animation: eventSlideDown 0.3s ease; }
        .modal-box { animation: modalBounce 0.35s ease forwards; }
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
        {/* ── LEFT: Score + Character List ── */}
        <div className="clicker-left">
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '40px', fontWeight: 700, lineHeight: 1.1, color: '#fff' }}>
              {formatNumber(points)}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>Brainrot Points</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
              👆 <strong style={{ color: '#facc15' }}>{formatNumber(displayPointsPerClick)}</strong>/click
              {comboMultiplier > 1 && <span style={{ color: '#ff6b9d', marginLeft: '4px', fontWeight: 700 }}>×{comboMultiplier}</span>}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
              ⚡ <strong style={{ color: '#4ade80' }}>{formatNumber(effectivePointsPerSecond)}</strong>/sec
              {activeEvent?.id === 'chaos' && <span style={{ color: '#a78bfa', marginLeft: '4px', fontWeight: 700 }}>×5</span>}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>
              Total: {formatNumber(totalPoints)}
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
                    localStorage.removeItem(SAVE_KEY)
                    localStorage.removeItem(LEGACY_SAVE_KEY)
                    localStorage.removeItem(LOGIN_KEY)
                    window.location.reload()
                  }
                }}
                style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '11px', color: 'rgba(255,255,255,0.3)', padding: '4px 8px', borderRadius: '4px', transition: 'color 0.15s' }}
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
                    style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 8px', borderRadius: '8px', border: isCurrent ? '1px solid rgba(250,204,21,0.5)' : '1px solid transparent', background: isCurrent ? 'rgba(250,204,21,0.05)' : 'transparent', opacity: isUnlocked ? 1 : 0.35 }}
                  >
                    <span style={{ fontSize: '18px', flexShrink: 0 }}>{isUnlocked ? char.emoji : '🔒'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {isUnlocked
                        ? <div style={{ fontSize: '11px', fontWeight: 600, color: isCurrent ? '#facc15' : '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{char.name}</div>
                        : <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>{formatNumber(char.unlockAt)} pts</div>
                      }
                    </div>
                    {isCurrent && <span style={{ fontSize: '10px', color: '#facc15', flexShrink: 0 }}>▶</span>}
                    {isUnlocked && !isCurrent && <span style={{ fontSize: '10px', color: '#4ade80', flexShrink: 0 }}>✓</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── CENTER: Click Area ── */}
        <div className="clicker-center">
          {/* Random event banner */}
          {activeEventData && (
            <div
              className="event-banner"
              style={{
                width: '100%',
                maxWidth: '320px',
                marginBottom: '12px',
                padding: '8px 14px',
                borderRadius: '10px',
                background: activeEventData.color + '22',
                border: `1px solid ${activeEventData.color}66`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '20px' }}>{activeEventData.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: activeEventData.color }}>{activeEventData.name}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>{activeEventData.desc}</div>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: activeEventData.color, flexShrink: 0 }}>{eventCountdown}s</div>
            </div>
          )}

          <div style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '20px', fontWeight: 700, color: '#facc15', marginBottom: '4px', textAlign: 'center' }}>
            {currentCharacter.name}
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textAlign: 'center' }}>
            {currentCharacter.description}
          </div>

          {/* Combo badge */}
          {combo >= 5 && (
            <div
              key={combo}
              className="combo-badge"
              style={{
                marginBottom: '8px',
                padding: '4px 14px',
                borderRadius: '20px',
                background: `rgba(255,107,157,0.15)`,
                border: '1px solid rgba(255,107,157,0.4)',
                fontSize: '13px',
                fontWeight: 700,
                color: '#ff6b9d',
                flexShrink: 0,
              }}
            >
              🔥 {combo}× COMBO &nbsp;·&nbsp; {comboMultiplier}× MULTIPLIER
            </div>
          )}

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

          {/* Progress bar */}
          <div style={{ width: '100%', maxWidth: '260px', marginTop: '20px', flexShrink: 0 }}>
            <div style={{ marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                {nextCharacter ? `Next: ${nextCharacter.emoji} ${nextCharacter.name}` : 'MAX LEVEL! 🎉'}
              </span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                className={progressToNext > 90 ? 'progress-bar-shine' : ''}
                style={{ height: '100%', background: 'linear-gradient(90deg, #4ade80, #22d3ee)', borderRadius: '3px', width: `${progressToNext}%`, transition: 'width 0.3s ease' }}
              />
            </div>
            {nextCharacter && (
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '4px', textAlign: 'right' }}>
                {formatNumber(nextCharacter.unlockAt - totalPoints)} pts to go
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Upgrades / Achievements ── */}
        <div className="clicker-right">
          {/* Tabs */}
          <div className="upgrade-tabs" style={{ display: 'flex', gap: '4px', marginBottom: '12px', flexShrink: 0 }}>
            {([
              { key: 'click', label: '👆 Click' },
              { key: 'passive', label: '⚡ Passive' },
              { key: 'achievements', label: `🏆 ${achievementCount}/${ACHIEVEMENTS.length}` },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flex: 1,
                  padding: '7px 2px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 600,
                  background: activeTab === tab.key ? 'rgba(250,204,21,0.15)' : 'rgba(255,255,255,0.05)',
                  color: activeTab === tab.key ? '#facc15' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Upgrade list */}
          {activeTab !== 'achievements' && (
            <div className="upgrades-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              {(activeTab === 'click' ? clickUpgrades : passiveUpgrades).map(upgrade => {
                const cost = getUpgradeCost(upgrade)
                const canAfford = points >= cost
                return (
                  <div
                    key={upgrade.id}
                    className="upgrade-card"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <span style={{ fontSize: '22px', flexShrink: 0 }}>{upgrade.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>{upgrade.name}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{upgrade.description}</div>
                      {upgrade.purchased > 0 && <div style={{ fontSize: '10px', color: '#facc15', marginTop: '2px' }}>×{upgrade.purchased}</div>}
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
          )}

          {/* Achievements list */}
          {activeTab === 'achievements' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {achievementCount}/{ACHIEVEMENTS.length} Unlocked
              </div>
              {ACHIEVEMENTS.map(ach => {
                const unlocked = achievements.has(ach.id)
                return (
                  <div
                    key={ach.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px',
                      borderRadius: '8px',
                      background: unlocked ? 'rgba(250,204,21,0.06)' : 'rgba(255,255,255,0.03)',
                      border: unlocked ? '1px solid rgba(250,204,21,0.25)' : '1px solid rgba(255,255,255,0.05)',
                      opacity: unlocked ? 1 : 0.45,
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ fontSize: '20px', flexShrink: 0 }}>{unlocked ? ach.emoji : '🔒'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: unlocked ? '#facc15' : '#fff' }}>{ach.name}</div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{ach.desc}</div>
                    </div>
                    {unlocked && <span style={{ fontSize: '14px', flexShrink: 0 }}>✓</span>}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Offline earnings popup (priority) ── */}
      {offlinePopup && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, padding: '16px' }}>
          <div
            className="modal-box"
            style={{ background: '#1a1a2e', border: '2px solid rgba(74,222,128,0.4)', borderRadius: '16px', padding: '30px 32px', textAlign: 'center', maxWidth: '320px', width: '100%', boxShadow: '0 0 60px rgba(74,222,128,0.12)' }}
          >
            <div style={{ fontSize: '56px', lineHeight: 1, marginBottom: '12px' }}>💤</div>
            <div style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '22px', fontWeight: 700, color: '#4ade80', marginBottom: '8px' }}>Welcome Back!</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>
              You were away for <strong style={{ color: '#fff' }}>{formatElapsed(offlinePopup.hours)}</strong>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#facc15', fontFamily: 'var(--font-fredoka), Fredoka One, cursive', margin: '12px 0' }}>
              +{formatNumber(offlinePopup.earned)}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>Brainrot Points earned while you slept</div>
            <button
              onClick={() => setOfflinePopup(null)}
              style={{ padding: '10px 28px', borderRadius: '8px', border: 'none', background: '#4ade80', color: '#000', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
            >
              Collect! 🎉
            </button>
          </div>
        </div>
      )}

      {/* ── Daily login popup (shows after offline popup is closed) ── */}
      {!offlinePopup && dailyLoginPopup && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, padding: '16px' }}>
          <div
            className="modal-box"
            style={{ background: '#1a1a2e', border: '2px solid rgba(250,204,21,0.4)', borderRadius: '16px', padding: '30px 32px', textAlign: 'center', maxWidth: '320px', width: '100%', boxShadow: '0 0 60px rgba(250,204,21,0.12)' }}
          >
            <div style={{ fontSize: '56px', lineHeight: 1, marginBottom: '12px' }}>🎁</div>
            <div style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '22px', fontWeight: 700, color: '#facc15', marginBottom: '8px' }}>Daily Login!</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: i < dailyLoginPopup.streak ? '#facc15' : 'rgba(255,255,255,0.1)',
                    border: i === dailyLoginPopup.streak - 1 ? '2px solid #fff' : '1px solid rgba(255,255,255,0.15)',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {i < dailyLoginPopup.streak ? '✓' : ''}
                </div>
              ))}
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
              Day <strong style={{ color: '#fff' }}>{dailyLoginPopup.streak}</strong> streak
              {dailyLoginPopup.streak >= 7 && <span style={{ color: '#facc15', marginLeft: '6px' }}>🌟 MAX!</span>}
            </div>
            <div style={{ fontSize: '30px', fontWeight: 700, color: '#facc15', fontFamily: 'var(--font-fredoka), Fredoka One, cursive', margin: '12px 0' }}>
              +{formatNumber(dailyLoginPopup.reward)}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>Brainrot Points</div>
            <button
              onClick={() => setDailyLoginPopup(null)}
              style={{ padding: '10px 28px', borderRadius: '8px', border: 'none', background: '#facc15', color: '#000', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
            >
              Claim! 🔥
            </button>
          </div>
        </div>
      )}

      {/* ── Character unlock popup ── */}
      {unlockedPopup && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, borderRadius: '12px', padding: '16px' }}>
          <div
            className="animate-big-bounce"
            style={{ background: '#1a1a2e', border: '2px solid rgba(250,204,21,0.4)', borderRadius: '16px', padding: '32px 36px', textAlign: 'center', boxShadow: '0 0 60px rgba(250,204,21,0.15)', maxWidth: '340px', width: '100%' }}
          >
            <div style={{ fontSize: '72px', lineHeight: 1, marginBottom: '12px' }}>{unlockedEmoji}</div>
            <div style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '26px', fontWeight: 700, color: '#facc15', letterSpacing: '0.05em', marginBottom: '6px' }}>UNLOCKED!</div>
            <div style={{ fontSize: '16px', color: '#fff', fontWeight: 600, marginBottom: '6px' }}>{unlockedPopup}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginBottom: '24px', lineHeight: 1.5 }}>{unlockedDesc}</div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setUnlockedPopup(null)}
                style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' }}
              >
                继续点击 →
              </button>
              <Link
                href={`/characters/${unlockedSlug}`}
                onClick={() => setUnlockedPopup(null)}
                style={{ padding: '9px 18px', borderRadius: '8px', background: '#facc15', color: '#000', fontSize: '13px', fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}
              >
                查看角色详情 →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Achievement toast (bottom-right) ── */}
      {currentToast && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            background: '#1a1a2e',
            border: '1px solid rgba(250,204,21,0.45)',
            borderRadius: '12px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 70,
            animation: 'slideInRight 0.3s ease',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
            maxWidth: '220px',
          }}
        >
          <span style={{ fontSize: '22px', flexShrink: 0 }}>{currentToast.emoji}</span>
          <div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.45)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Achievement!</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#facc15', lineHeight: 1.2 }}>{currentToast.name}</div>
          </div>
        </div>
      )}
    </div>
  )
}
