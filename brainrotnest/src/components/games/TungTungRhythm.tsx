'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const PAD_KEYS = ['A', 'D', 'J', 'L'] as const
const PAD_LABELS = ['Tung', 'Tung', 'Sa', 'Hur']
const PAD_COLORS = [
  'from-orange-500 to-red-500',
  'from-yellow-400 to-orange-500',
  'from-pink-500 to-rose-500',
  'from-amber-500 to-yellow-400',
]

type HitState = 'idle' | 'hit' | 'miss'

type AudioKit = {
  hit: () => void
  miss: () => void
  combo: () => void
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function createAudioKit(ctx: AudioContext): AudioKit {
  const safeNow = () => ctx.currentTime + 0.001

  const hit = () => {
    const now = safeNow()
    const master = ctx.createGain()
    master.gain.setValueAtTime(0.0001, now)
    master.gain.exponentialRampToValueAtTime(0.22, now + 0.01)
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.16)
    master.connect(ctx.destination)

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(120, now)
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.14)
    osc.connect(master)
    osc.start(now)
    osc.stop(now + 0.17)

    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.14), ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'lowpass'
    noiseFilter.frequency.value = 1400
    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.12, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)
    noise.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(master)
    noise.start(now)
  }

  const miss = () => {
    const now = safeNow()
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(450, now)
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.3)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.18, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2200, now)
    filter.frequency.exponentialRampToValueAtTime(700, now + 0.3)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.33)
  }

  const combo = () => {
    const now = safeNow()
    const notes = [440, 554, 659]
    notes.forEach((freq, index) => {
      const start = now + index * 0.055
      const osc = ctx.createOscillator()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, start)
      osc.frequency.exponentialRampToValueAtTime(freq * 1.08, start + 0.08)
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(0.13, start + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.11)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.12)
    })
  }

  return { hit, miss, combo }
}

export default function TungTungRhythm() {
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [lives, setLives] = useState(3)
  const [bpm, setBpm] = useState(80)
  const [activePad, setActivePad] = useState<number | null>(null)
  const [hitStates, setHitStates] = useState<HitState[]>(['idle', 'idle', 'idle', 'idle'])
  const [gameOver, setGameOver] = useState(false)
  const [copied, setCopied] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const audioKitRef = useRef<AudioKit | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const beatIntervalRef = useRef<number | null>(null)
  const bpmIntervalRef = useRef<number | null>(null)
  const activePadRef = useRef<number | null>(null)
  const livesRef = useRef(3)
  const gameOverRef = useRef(false)

  const bpmProgress = useMemo(() => ((bpm - 80) / 100) * 100, [bpm])

  const clearBeatTimer = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const resetBeatInterval = useCallback((currentBpm: number, runner: () => void) => {
    if (beatIntervalRef.current) {
      window.clearInterval(beatIntervalRef.current)
    }
    const intervalMs = Math.round(60000 / currentBpm)
    beatIntervalRef.current = window.setInterval(runner, intervalMs)
  }, [])

  const getAudioKit = useCallback(() => {
    if (typeof window === 'undefined') return null
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctx) return null
      audioCtxRef.current = new Ctx()
      audioKitRef.current = createAudioKit(audioCtxRef.current)
    }
    if (audioCtxRef.current.state === 'suspended') {
      void audioCtxRef.current.resume()
    }
    return audioKitRef.current
  }, [])

  const markPadState = useCallback((index: number, state: HitState, duration: number) => {
    setHitStates((prev) => prev.map((item, i) => (i === index ? state : item)))
    window.setTimeout(() => {
      setHitStates((prev) => prev.map((item, i) => (i === index && item === state ? 'idle' : item)))
    }, duration)
  }, [])

  const endGame = useCallback(() => {
    setGameOver(true)
    gameOverRef.current = true
    clearBeatTimer()
    if (beatIntervalRef.current) window.clearInterval(beatIntervalRef.current)
    if (bpmIntervalRef.current) window.clearInterval(bpmIntervalRef.current)
    setActivePad(null)
    activePadRef.current = null
  }, [clearBeatTimer])

  const registerMiss = useCallback((padIndex: number | null) => {
    if (gameOverRef.current) return
    const kit = getAudioKit()
    kit?.miss()
    if (padIndex !== null) {
      markPadState(padIndex, 'miss', 250)
    }
    setCombo(0)
    setLives((prev) => {
      const next = prev - 1
      livesRef.current = next
      if (next <= 0) {
        endGame()
        return 0
      }
      return next
    })
  }, [endGame, getAudioKit, markPadState])

  const spawnBeat = useCallback(() => {
    if (gameOverRef.current) return
    if (activePadRef.current !== null) {
      registerMiss(activePadRef.current)
    }

    const nextPad = Math.floor(Math.random() * 4)
    const visibleWindow = Math.max(220, Math.round((60000 / bpm) * 0.72))
    setActivePad(nextPad)
    activePadRef.current = nextPad

    clearBeatTimer()
    timeoutRef.current = window.setTimeout(() => {
      if (activePadRef.current === nextPad && !gameOverRef.current) {
        setActivePad(null)
        activePadRef.current = null
        registerMiss(nextPad)
      }
    }, visibleWindow)
  }, [bpm, clearBeatTimer, registerMiss])

  const hitPad = useCallback((index: number) => {
    if (gameOverRef.current) return
    const kit = getAudioKit()

    if (activePadRef.current === index) {
      clearBeatTimer()
      setActivePad(null)
      activePadRef.current = null

      kit?.hit()
      markPadState(index, 'hit', 150)

      setCombo((prev) => {
        const nextCombo = prev + 1
        setMaxCombo((oldMax) => (nextCombo > oldMax ? nextCombo : oldMax))
        const bonus = nextCombo % 5 === 0 ? 5 : 0
        setScore((oldScore) => oldScore + 10 + bonus)
        if (bonus > 0) {
          kit?.combo()
        }
        return nextCombo
      })
      return
    }

    registerMiss(activePadRef.current)
  }, [clearBeatTimer, getAudioKit, markPadState, registerMiss])

  const restart = useCallback(() => {
    clearBeatTimer()
    if (beatIntervalRef.current) window.clearInterval(beatIntervalRef.current)
    if (bpmIntervalRef.current) window.clearInterval(bpmIntervalRef.current)
    setScore(0)
    setCombo(0)
    setMaxCombo(0)
    setLives(3)
    livesRef.current = 3
    setBpm(80)
    setActivePad(null)
    activePadRef.current = null
    setHitStates(['idle', 'idle', 'idle', 'idle'])
    setGameOver(false)
    gameOverRef.current = false
    setCopied(false)
  }, [clearBeatTimer])

  useEffect(() => {
    if (gameOver) return
    spawnBeat()
    resetBeatInterval(bpm, spawnBeat)
  }, [bpm, gameOver, resetBeatInterval, spawnBeat])

  useEffect(() => {
    if (gameOver) return
    if (bpmIntervalRef.current) window.clearInterval(bpmIntervalRef.current)
    bpmIntervalRef.current = window.setInterval(() => {
      setBpm((prev) => clamp(prev + 10, 80, 180))
    }, 10000)
    return () => {
      if (bpmIntervalRef.current) window.clearInterval(bpmIntervalRef.current)
    }
  }, [gameOver])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase()
      const index = PAD_KEYS.indexOf(key as (typeof PAD_KEYS)[number])
      if (index >= 0) {
        event.preventDefault()
        hitPad(index)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [hitPad])

  useEffect(() => {
    return () => {
      clearBeatTimer()
      if (beatIntervalRef.current) window.clearInterval(beatIntervalRef.current)
      if (bpmIntervalRef.current) window.clearInterval(bpmIntervalRef.current)
      if (audioCtxRef.current) {
        void audioCtxRef.current.close()
      }
    }
  }, [clearBeatTimer])

  const shareResult = async () => {
    const text = `我在 Tung Tung Rhythm 打了 ${score} 分，最大连击 ${maxCombo}！来挑战：https://brainrotnest.com/games/tung-tung-rhythm`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-950 to-zinc-900 p-4 sm:p-6">
      <div className="mb-5 space-y-3">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-2 sm:px-4">
          <div className="text-sm text-zinc-300">❤️ {lives} / 3</div>
          <div className="text-sm text-zinc-100">Score: <span className="font-semibold">{score}</span></div>
          <div className="text-sm text-zinc-300">BPM {bpm}</div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-yellow-300 transition-all duration-300"
            style={{ width: `${bpmProgress}%` }}
          />
        </div>
      </div>

      <div className="pointer-events-none mb-4 flex h-16 items-center justify-center">
        <div
          className={[
            'text-4xl font-black tracking-wide text-zinc-100 transition-all duration-200 sm:text-5xl',
            combo > 0 && combo % 5 === 0 ? 'animate-pulse scale-125 text-yellow-300' : 'scale-100',
          ].join(' ')}
        >
          {combo > 0 ? `COMBO ${combo}` : 'READY'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {PAD_KEYS.map((key, index) => {
          const isActive = activePad === index
          const state = hitStates[index]
          const stateClass =
            state === 'hit'
              ? 'brightness-150 scale-110'
              : state === 'miss'
                ? 'brightness-50'
                : 'brightness-100 scale-100'
          const activeClass = isActive
            ? 'scale-105 ring-4 ring-white/70 shadow-[0_0_35px_rgba(250,204,21,0.4)]'
            : 'ring-1 ring-zinc-800'

          return (
            <button
              key={key}
              type="button"
              onMouseDown={() => hitPad(index)}
              onTouchStart={(event) => {
                event.preventDefault()
                hitPad(index)
              }}
              className={[
                'relative h-32 overflow-hidden rounded-2xl bg-gradient-to-br p-4 text-left text-white transition-all duration-150 active:scale-95 sm:h-40',
                PAD_COLORS[index],
                activeClass,
                stateClass,
              ].join(' ')}
            >
              {isActive ? (
                <span className="pointer-events-none absolute inset-0 m-auto h-14 w-14 animate-ping rounded-full border border-white/70 bg-white/20" />
              ) : null}
              <div className="relative z-10 flex h-full flex-col justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">Key {key}</span>
                <span className="text-2xl font-black sm:text-3xl">{PAD_LABELS[index]}</span>
              </div>
            </button>
          )
        })}
      </div>

      {gameOver ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-6 text-center">
            <h3 className="text-2xl font-black text-white">Game Over</h3>
            <p className="mt-3 text-zinc-300">最终分数：<span className="font-bold text-white">{score}</span></p>
            <p className="mt-1 text-zinc-300">最大连击：<span className="font-bold text-white">{maxCombo}</span></p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={restart}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
              >
                再来一局
              </button>
              <button
                type="button"
                onClick={shareResult}
                className="rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-700"
              >
                {copied ? '已复制' : '分享成绩'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
