'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

type PadKey = 'A' | 'D' | 'J' | 'L'
type GamePhase = 'idle' | 'playing' | 'gameover'

interface ActiveBeat {
  id: number
  padIndex: number
  spawnTime: number
  windowMs: number
}

const PAD_KEYS: PadKey[] = ['A', 'D', 'J', 'L']
const PAD_LABELS = ['A', 'D', 'J', 'L']
const PAD_EMOJIS = ['🥁', '🪘', '🎵', '🎶']
const PAD_COLORS = [
  'from-orange-500 to-red-600',
  'from-yellow-500 to-orange-500',
  'from-pink-500 to-rose-600',
  'from-amber-500 to-yellow-600',
]
const PAD_GLOW = [
  'shadow-orange-500/80',
  'shadow-yellow-500/80',
  'shadow-pink-500/80',
  'shadow-amber-500/80',
]
const MAX_LIVES = 3
const BPM_START = 80
const BPM_MAX = 180
const BPM_STEP = 10
const BPM_INTERVAL_MS = 10_000

function createAudioCtx(): AudioContext {
  return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
}

function playDrumHit(ctx: AudioContext, padIndex: number, combo: number) {
  const freqs = [80, 100, 120, 90]
  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freqs[padIndex] + combo * 2, now)
  osc.frequency.exponentialRampToValueAtTime(freqs[padIndex] * 0.3, now + 0.12)
  gain.gain.setValueAtTime(0.9, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
  osc.start(now)
  osc.stop(now + 0.15)
  const bufSize = ctx.sampleRate * 0.08
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3
  const noise = ctx.createBufferSource()
  noise.buffer = buf
  const nGain = ctx.createGain()
  noise.connect(nGain)
  nGain.connect(ctx.destination)
  nGain.gain.setValueAtTime(0.4, now)
  nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
  noise.start(now)
}

function playMissSound(ctx: AudioContext) {
  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(220, now)
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.25)
  gain.gain.setValueAtTime(0.4, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28)
  osc.start(now)
  osc.stop(now + 0.3)
}

function playComboSound(ctx: AudioContext, combo: number) {
  if (combo < 5 || combo % 5 !== 0) return
  const now = ctx.currentTime
  const noteFreqs = [523, 659, 784, 1047]
  noteFreqs.slice(0, Math.min(4, Math.floor(combo / 5))).forEach((f, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'triangle'
    osc.frequency.value = f
    gain.gain.setValueAtTime(0, now + i * 0.08)
    gain.gain.linearRampToValueAtTime(0.3, now + i * 0.08 + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.15)
    osc.start(now + i * 0.08)
    osc.stop(now + i * 0.08 + 0.2)
  })
}

export default function TungTungRhythm() {
  const [phase, setPhase] = useState<GamePhase>('idle')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(MAX_LIVES)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [bpm, setBpm] = useState(BPM_START)
  const [activeBeats, setActiveBeats] = useState<ActiveBeat[]>([])
  const [hitFlash, setHitFlash] = useState<number | null>(null)
  const [missFlash, setMissFlash] = useState<number | null>(null)
  const [comboFlash, setComboFlash] = useState(false)
  const [copied, setCopied] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const beatIdRef = useRef(0)
  const bpmRef = useRef(BPM_START)
  const livesRef = useRef(MAX_LIVES)
  const comboRef = useRef(0)
  const scoreRef = useRef(0)
  const phaseRef = useRef<GamePhase>('idle')
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const bpmTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const expireCheckRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => { bpmRef.current = bpm }, [bpm])
  useEffect(() => { livesRef.current = lives }, [lives])
  useEffect(() => { comboRef.current = combo }, [combo])
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { phaseRef.current = phase }, [phase])

  const stopGame = useCallback(() => {
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current)
    if (bpmTimerRef.current) clearInterval(bpmTimerRef.current)
    if (expireCheckRef.current) clearInterval(expireCheckRef.current)
    spawnTimerRef.current = null
    bpmTimerRef.current = null
    expireCheckRef.current = null
  }, [])

  const scheduleNextBeat = useCallback(() => {
    if (phaseRef.current !== 'playing') return
    const intervalMs = (60 / bpmRef.current) * 1000
    spawnTimerRef.current = setTimeout(() => {
      if (phaseRef.current !== 'playing') return
      const padIndex = Math.floor(Math.random() * 4)
      const windowMs = Math.max(600, intervalMs * 1.8)
      const id = beatIdRef.current++
      setActiveBeats(prev => [...prev, { id, padIndex, spawnTime: Date.now(), windowMs }])
      scheduleNextBeat()
    }, intervalMs)
  }, [])

  const handleExpiry = useCallback(() => {
    const now = Date.now()
    setActiveBeats(prev => {
      const expired = prev.filter(b => now - b.spawnTime > b.windowMs)
      const remaining = prev.filter(b => now - b.spawnTime <= b.windowMs)
      if (expired.length > 0 && phaseRef.current === 'playing') {
        expired.forEach(b => {
          setMissFlash(b.padIndex)
          setTimeout(() => setMissFlash(null), 250)
          if (audioCtxRef.current) playMissSound(audioCtxRef.current)
        })
        const newLives = livesRef.current - expired.length
        setCombo(0)
        comboRef.current = 0
        if (newLives <= 0) {
          setLives(0)
          livesRef.current = 0
          stopGame()
          setActiveBeats([])
          setPhase('gameover')
          phaseRef.current = 'gameover'
        } else {
          setLives(newLives)
          livesRef.current = newLives
        }
      }
      return remaining
    })
  }, [stopGame])

  const startGame = useCallback(() => {
    if (!audioCtxRef.current) audioCtxRef.current = createAudioCtx()
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume()
    stopGame()
    beatIdRef.current = 0
    bpmRef.current = BPM_START
    livesRef.current = MAX_LIVES
    comboRef.current = 0
    scoreRef.current = 0
    setScore(0)
    setLives(MAX_LIVES)
    setCombo(0)
    setMaxCombo(0)
    setBpm(BPM_START)
    setActiveBeats([])
    setPhase('playing')
    phaseRef.current = 'playing'
    bpmTimerRef.current = setInterval(() => {
      const next = Math.min(bpmRef.current + BPM_STEP, BPM_MAX)
      bpmRef.current = next
      setBpm(next)
    }, BPM_INTERVAL_MS)
    expireCheckRef.current = setInterval(handleExpiry, 50)
    scheduleNextBeat()
  }, [stopGame, scheduleNextBeat, handleExpiry])

  const hitPad = useCallback((padIndex: number) => {
    if (phaseRef.current !== 'playing') return
    if (!audioCtxRef.current) return
    let hit = false
    setActiveBeats(prev => {
      const idx = prev.findIndex(b => b.padIndex === padIndex)
      if (idx === -1) return prev
      hit = true
      return prev.filter((_, i) => i !== idx)
    })
    if (hit) {
      const newCombo = comboRef.current + 1
      comboRef.current = newCombo
      setCombo(newCombo)
      setMaxCombo(prev => Math.max(prev, newCombo))
      const points = 10 + Math.floor(newCombo / 5) * 5
      const newScore = scoreRef.current + points
      scoreRef.current = newScore
      setScore(newScore)
      setHitFlash(padIndex)
      setTimeout(() => setHitFlash(null), 150)
      playDrumHit(audioCtxRef.current!, padIndex, newCombo)
      playComboSound(audioCtxRef.current!, newCombo)
      if (newCombo > 0 && newCombo % 5 === 0) {
        setComboFlash(true)
        setTimeout(() => setComboFlash(false), 400)
      }
    }
  }, [])

  useEffect(() => {
    const keyMap: Record<string, number> = { a: 0, d: 1, j: 2, l: 3 }
    const onKey = (e: KeyboardEvent) => {
      const idx = keyMap[e.key.toLowerCase()]
      if (idx !== undefined) hitPad(idx)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hitPad])

  useEffect(() => () => stopGame(), [stopGame])

  const handleShare = () => {
    const text = `🥁 I scored ${score} in Tung Tung Rhythm with a ${maxCombo}x combo!\nPlay at brainrotnest.com/games/tung-tung-rhythm`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const heartRow = Array.from({ length: MAX_LIVES }, (_, i) => i < lives ? '❤️' : '🖤')

  const speedLabel = (() => {
    const level = Math.round((bpm - BPM_START) / BPM_STEP) + 1
    return `TUNG TUNG × ${level}`
  })()

  return (
    <div className="flex flex-col items-center gap-6 w-full select-none">
      {phase === 'playing' && (
        <div className="flex flex-wrap items-center justify-between w-full max-w-lg gap-2 px-2">
          <div className="flex gap-1 text-xl">{heartRow}</div>
          <div className="text-center">
            <div className={`text-2xl font-bold transition-transform duration-100 ${comboFlash ? 'scale-150 text-yellow-400' : 'text-white'}`}>
              {combo > 1 ? `${combo}x` : ''}
            </div>
            {combo > 1 && <div className="text-xs text-yellow-400 -mt-1">COMBO</div>}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">{score}</div>
            <div className="text-xs text-zinc-400">SCORE</div>
          </div>
        </div>
      )}
      {phase === 'playing' && (
        <div className="w-full max-w-lg px-2">
          <div className="flex justify-between text-xs text-zinc-500 mb-1">
            <span>{speedLabel}</span>
            <span>{bpm} BPM</span>
          </div>
          <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
              style={{ width: `${((bpm - BPM_START) / (BPM_MAX - BPM_START)) * 100}%` }}
            />
          </div>
        </div>
      )}
      {phase === 'playing' && (
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg px-2">
          {PAD_KEYS.map((_, i) => {
            const isActive = activeBeats.some(b => b.padIndex === i)
            const isHit = hitFlash === i
            const isMiss = missFlash === i
            return (
              <button
                key={i}
                onPointerDown={() => hitPad(i)}
                className={`
                  relative flex flex-col items-center justify-center
                  h-32 sm:h-40 rounded-2xl font-bold
                  transition-all duration-75 active:scale-95
                  bg-gradient-to-br ${PAD_COLORS[i]}
                  ${isActive ? `scale-105 shadow-2xl ${PAD_GLOW[i]} ring-4 ring-white/60` : 'opacity-30 scale-100 shadow-none'}
                  ${isHit ? 'brightness-150 scale-110' : ''}
                  ${isMiss ? 'brightness-50' : ''}
                `}
              >
                <span className="text-4xl sm:text-5xl">{PAD_EMOJIS[i]}</span>
                <span className="text-white/80 text-sm mt-1">{PAD_LABELS[i]}</span>
                {isActive && (
                  <span className="absolute inset-0 rounded-2xl animate-ping bg-white/20 pointer-events-none" />
                )}
              </button>
            )
          })}
        </div>
      )}
      {phase === 'idle' && (
        <div className="flex flex-col items-center gap-6 py-8 text-center">
          <div className="text-7xl animate-bounce">🥁</div>
          <h2 className="text-2xl font-bold text-white">Tung Tung Rhythm</h2>
          <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
            Hit the glowing pads in time with the beat!<br />
            Use <kbd className="px-1.5 py-0.5 rounded bg-zinc-700 text-xs font-mono">A</kbd>&nbsp;
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-700 text-xs font-mono">D</kbd>&nbsp;
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-700 text-xs font-mono">J</kbd>&nbsp;
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-700 text-xs font-mono">L</kbd> or tap the pads.<br />
            Miss 3 beats and it&apos;s over.
          </p>
          <button
            onClick={startGame}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg hover:from-orange-400 hover:to-red-500 transition-all duration-200 shadow-lg shadow-orange-500/30 active:scale-95"
          >
            Start Drumming 🥁
          </button>
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs text-xs text-zinc-500">
            <div className="bg-zinc-800/60 rounded-lg p-2">BPM ramps 80→180</div>
            <div className="bg-zinc-800/60 rounded-lg p-2">Combo = bonus points</div>
            <div className="bg-zinc-800/60 rounded-lg p-2">3 lives</div>
            <div className="bg-zinc-800/60 rounded-lg p-2">Miss = lose a life</div>
          </div>
        </div>
      )}
      {phase === 'gameover' && (
        <div className="flex flex-col items-center gap-5 py-8 text-center w-full max-w-sm">
          <div className="text-6xl">💀</div>
          <h2 className="text-2xl font-bold text-white">Game Over</h2>
          <div className="w-full bg-zinc-800/70 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="text-zinc-400">Score</span>
              <span className="text-green-400 font-bold text-xl">{score}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Max Combo</span>
              <span className="text-yellow-400 font-bold">{maxCombo}x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Final BPM</span>
              <span className="text-orange-400 font-bold">{bpm}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={startGame}
              className="flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold hover:opacity-90 transition-opacity active:scale-95"
            >
              Play Again
            </button>
            <button
              onClick={handleShare}
              className="flex-1 px-5 py-2.5 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white font-semibold transition-colors active:scale-95"
            >
              {copied ? '✅ Copied!' : '📋 Share Score'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
