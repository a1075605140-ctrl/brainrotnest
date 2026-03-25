'use client'

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.3, detune = 0) {
  const ctx = getAudioContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type; osc.frequency.value = freq; osc.detune.value = detune
  gain.gain.setValueAtTime(volume, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  osc.connect(gain); gain.connect(ctx.destination)
  osc.start(ctx.currentTime); osc.stop(ctx.currentTime + duration)
}

function playSequence(notes: { freq: number; delay: number; duration: number; type?: OscillatorType; volume?: number }[]) {
  notes.forEach(({ freq, delay, duration, type = 'sine', volume = 0.3 }) => {
    setTimeout(() => playTone(freq, duration, type, volume), delay * 1000)
  })
}

function playNoise(duration: number, volume = 0.1) {
  const ctx = getAudioContext()
  const bufferSize = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
  const source = ctx.createBufferSource(); source.buffer = buffer
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(volume, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  const filter = ctx.createBiquadFilter(); filter.type = 'highpass'; filter.frequency.value = 3000
  source.connect(filter); filter.connect(gain); gain.connect(ctx.destination); source.start()
}

export const SFX = {
  click: () => playTone(800, 0.08, 'square', 0.15),
  score: () => playSequence([{ freq: 600, delay: 0, duration: 0.1, type: 'square', volume: 0.2 }, { freq: 900, delay: 0.08, duration: 0.15, type: 'square', volume: 0.2 }]),
  bigScore: () => playSequence([{ freq: 523, delay: 0, duration: 0.12, type: 'square', volume: 0.2 }, { freq: 659, delay: 0.08, duration: 0.12, type: 'square', volume: 0.2 }, { freq: 784, delay: 0.16, duration: 0.12, type: 'square', volume: 0.2 }, { freq: 1047, delay: 0.24, duration: 0.25, type: 'square', volume: 0.25 }]),
  unlock: () => playSequence([{ freq: 523, delay: 0, duration: 0.15, type: 'square', volume: 0.25 }, { freq: 659, delay: 0.12, duration: 0.15, type: 'square', volume: 0.25 }, { freq: 784, delay: 0.24, duration: 0.15, type: 'square', volume: 0.25 }, { freq: 1047, delay: 0.36, duration: 0.4, type: 'square', volume: 0.3 }]),
  purchase: () => { playTone(1200, 0.08, 'square', 0.15); setTimeout(() => playTone(1600, 0.12, 'square', 0.2), 60) },
  error: () => playSequence([{ freq: 200, delay: 0, duration: 0.15, type: 'sawtooth', volume: 0.2 }, { freq: 150, delay: 0.12, duration: 0.2, type: 'sawtooth', volume: 0.15 }]),
  correct: () => playSequence([{ freq: 880, delay: 0, duration: 0.1, type: 'sine', volume: 0.25 }, { freq: 1320, delay: 0.1, duration: 0.2, type: 'sine', volume: 0.25 }]),
  wrong: () => playSequence([{ freq: 300, delay: 0, duration: 0.2, type: 'sawtooth', volume: 0.15 }, { freq: 200, delay: 0.15, duration: 0.3, type: 'sawtooth', volume: 0.12 }]),
  tick: () => playTone(1000, 0.03, 'square', 0.1),
  tickUrgent: () => playSequence([{ freq: 1200, delay: 0, duration: 0.05, type: 'square', volume: 0.15 }, { freq: 1200, delay: 0.15, duration: 0.05, type: 'square', volume: 0.15 }]),
  merge: () => { playTone(600, 0.1, 'sine', 0.2); setTimeout(() => playTone(900, 0.15, 'sine', 0.25), 50); setTimeout(() => playTone(1200, 0.2, 'sine', 0.2), 100) },
  flip: () => playTone(400, 0.06, 'triangle', 0.15),
  match: () => playSequence([{ freq: 700, delay: 0, duration: 0.1, type: 'sine', volume: 0.2 }, { freq: 1050, delay: 0.1, duration: 0.2, type: 'sine', volume: 0.25 }]),
  mismatch: () => playTone(250, 0.2, 'triangle', 0.1),
  gameOver: () => playSequence([{ freq: 600, delay: 0, duration: 0.2, type: 'square', volume: 0.2 }, { freq: 500, delay: 0.2, duration: 0.2, type: 'square', volume: 0.18 }, { freq: 400, delay: 0.4, duration: 0.2, type: 'square', volume: 0.15 }, { freq: 250, delay: 0.6, duration: 0.5, type: 'sawtooth', volume: 0.15 }]),
  victory: () => playSequence([{ freq: 523, delay: 0, duration: 0.15, type: 'square', volume: 0.2 }, { freq: 523, delay: 0.15, duration: 0.15, type: 'square', volume: 0.2 }, { freq: 523, delay: 0.3, duration: 0.15, type: 'square', volume: 0.2 }, { freq: 659, delay: 0.45, duration: 0.15, type: 'square', volume: 0.22 }, { freq: 784, delay: 0.6, duration: 0.15, type: 'square', volume: 0.22 }, { freq: 1047, delay: 0.75, duration: 0.4, type: 'square', volume: 0.28 }]),
  hover: () => playTone(600, 0.03, 'sine', 0.05),
  dragStart: () => playTone(500, 0.05, 'triangle', 0.1),
  drop: () => playTone(300, 0.08, 'triangle', 0.12),
  combo: (count: number) => { const f = 600 + Math.min(count, 10) * 80; playTone(f, 0.1, 'square', 0.2 + Math.min(count, 10) * 0.01) },
  milestone: () => { playSequence([{ freq: 523, delay: 0, duration: 0.1, type: 'sine', volume: 0.2 }, { freq: 784, delay: 0.1, duration: 0.1, type: 'sine', volume: 0.2 }, { freq: 1047, delay: 0.2, duration: 0.1, type: 'sine', volume: 0.25 }, { freq: 1568, delay: 0.3, duration: 0.3, type: 'sine', volume: 0.3 }]); setTimeout(() => playNoise(0.15, 0.05), 400) },
  passiveIncome: () => playTone(1400, 0.04, 'sine', 0.06),
  steal: () => playSequence([{ freq: 400, delay: 0, duration: 0.08, type: 'sawtooth', volume: 0.2 }, { freq: 800, delay: 0.06, duration: 0.1, type: 'square', volume: 0.2 }, { freq: 1200, delay: 0.12, duration: 0.15, type: 'square', volume: 0.25 }]),
  stolen: () => playSequence([{ freq: 500, delay: 0, duration: 0.15, type: 'sawtooth', volume: 0.2 }, { freq: 300, delay: 0.12, duration: 0.25, type: 'sawtooth', volume: 0.18 }]),
  place: () => playTone(700, 0.1, 'triangle', 0.18),
  snapPiece: () => playSequence([{ freq: 800, delay: 0, duration: 0.06, type: 'sine', volume: 0.15 }, { freq: 1100, delay: 0.05, duration: 0.1, type: 'sine', volume: 0.2 }]),
  craft: () => playSequence([{ freq: 300, delay: 0, duration: 0.08, type: 'square', volume: 0.15 }, { freq: 500, delay: 0.08, duration: 0.08, type: 'square', volume: 0.15 }, { freq: 800, delay: 0.16, duration: 0.15, type: 'square', volume: 0.2 }]),
  harvest: () => { playTone(600, 0.06, 'sine', 0.12); setTimeout(() => playTone(900, 0.08, 'sine', 0.15), 40) },
  prestige: () => playSequence([{ freq: 1047, delay: 0, duration: 0.2, type: 'sine', volume: 0.25 }, { freq: 784, delay: 0.15, duration: 0.2, type: 'sine', volume: 0.22 }, { freq: 1047, delay: 0.3, duration: 0.15, type: 'sine', volume: 0.2 }, { freq: 1568, delay: 0.45, duration: 0.4, type: 'sine', volume: 0.3 }]),
  waveStart: () => playSequence([{ freq: 400, delay: 0, duration: 0.1, type: 'square', volume: 0.2 }, { freq: 600, delay: 0.1, duration: 0.1, type: 'square', volume: 0.2 }, { freq: 400, delay: 0.2, duration: 0.1, type: 'square', volume: 0.2 }]),
  towerPlace: () => playTone(500, 0.12, 'triangle', 0.2),
  towerShoot: () => { playTone(1500, 0.04, 'square', 0.1); setTimeout(() => playNoise(0.03, 0.06), 20) },
  enemyDeath: () => { playTone(200, 0.15, 'sawtooth', 0.15); playNoise(0.1, 0.08) },
  waveComplete: () => playSequence([{ freq: 523, delay: 0, duration: 0.12, type: 'square', volume: 0.2 }, { freq: 784, delay: 0.12, duration: 0.12, type: 'square', volume: 0.22 }, { freq: 1047, delay: 0.24, duration: 0.25, type: 'square', volume: 0.25 }]),
}

export default SFX
