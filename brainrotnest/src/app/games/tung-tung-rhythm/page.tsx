import type { Metadata } from 'next'
import Link from 'next/link'
import TungTungRhythm from '@/components/games/TungTungRhythm'

export const metadata: Metadata = {
  title: 'Tung Tung Rhythm — Free Italian Brainrot Rhythm Game | BrainrotNest',
  description:
    'Play Tung Tung Rhythm! Hit the beats as Tung Tung Sahur drums his way across the screen. Free Italian Brainrot rhythm game.',
  alternates: { canonical: 'https://brainrotnest.com/games/tung-tung-rhythm' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Tung Tung Rhythm',
  description:
    'Play Tung Tung Rhythm and hit the beat in this free Italian Brainrot rhythm game starring Tung Tung Sahur.',
  applicationCategory: 'GameApplication',
  genre: 'Rhythm',
  operatingSystem: 'Web Browser',
  isAccessibleForFree: true,
  url: 'https://brainrotnest.com/games/tung-tung-rhythm',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'BrainrotNest' },
}

export default function TungTungRhythmPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-5 flex items-center gap-2 text-sm text-zinc-400">
        <Link href="/" className="hover:text-zinc-200">Home</Link>
        <span>›</span>
        <Link href="/games" className="hover:text-zinc-200">Games</Link>
        <span>›</span>
        <span className="text-zinc-200">Tung Tung Rhythm</span>
      </nav>

      <section className="mb-6">
        <div className="mb-3 inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold tracking-wide text-emerald-300">
          NEW
        </div>
        <h1 className="font-[var(--font-fredoka)] text-3xl font-bold text-white md:text-5xl">
          🥁 Tung Tung Rhythm
        </h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          Keep up with Tung Tung Sahur and smash the right drum pad before each beat disappears.
          Build combos, survive misses, and push BPM all the way to 180.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {['Rhythm', 'Reflex', 'Keyboard + Touch', 'Italian Brainrot'].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-700 bg-zinc-800/70 px-3 py-1 text-xs font-medium text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 md:p-6">
        <TungTungRhythm />
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <h2 className="mb-3 font-[var(--font-fredoka)] text-2xl font-bold text-white">How to Play</h2>
          <ul className="space-y-2 text-sm leading-7 text-zinc-300">
            <li>Use keyboard keys A / D / J / L, or tap each drum pad on mobile.</li>
            <li>Hit only the highlighted pad before it disappears to score points.</li>
            <li>Each successful hit gives 10 points; every 5-hit combo adds an extra +5 bonus.</li>
            <li>You have 3 lives. A miss costs one life, and zero lives means game over.</li>
            <li>BPM starts at 80 and increases by +10 every 10 seconds (up to 180).</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <h2 className="mb-3 font-[var(--font-fredoka)] text-2xl font-bold text-white">Game Info</h2>
          <dl className="space-y-2 text-sm text-zinc-300">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <dt>Mode</dt>
              <dd className="font-semibold text-zinc-100">Endless Survival</dd>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <dt>Lives</dt>
              <dd className="font-semibold text-zinc-100">3</dd>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <dt>Controls</dt>
              <dd className="font-semibold text-zinc-100">A / D / J / L + Touch</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Audio</dt>
              <dd className="font-semibold text-zinc-100">Web Audio Synth</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <h2 className="mb-3 font-[var(--font-fredoka)] text-2xl font-bold text-white">About Tung Tung Rhythm</h2>
        <p className="leading-7 text-zinc-300">
          This rhythm minigame celebrates the chaotic drum energy of{' '}
          <Link href="/characters/tung-tung-sahur" className="font-semibold text-yellow-300 hover:text-yellow-200">
            Tung Tung Sahur
          </Link>
          . React fast, keep your combo alive, and survive the rising speed curve as the beat gets more intense.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 font-[var(--font-fredoka)] text-2xl font-bold text-white">More Games</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/games/brainrot-clicker"
            className="rounded-lg border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm font-medium text-zinc-200 hover:border-zinc-500"
          >
            Brainrot Clicker
          </Link>
          <Link
            href="/games/brainrot-quiz-game"
            className="rounded-lg border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm font-medium text-zinc-200 hover:border-zinc-500"
          >
            Brainrot Quiz
          </Link>
          <Link
            href="/games/brainrot-puzzle"
            className="rounded-lg border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm font-medium text-zinc-200 hover:border-zinc-500"
          >
            Memory Game
          </Link>
        </div>
      </section>
    </div>
  )
}
