import type { Metadata } from 'next'
import Link from 'next/link'
import BrainrotMemoryGame from '@/components/games/BrainrotMemoryGame'
import { enAlternates } from '@/lib/ptBrAlternates'

export const metadata: Metadata = {
  title: 'Brainrot Memory Game — Match Italian Brainrot Characters',
  description:
    'Play Brainrot Memory Game free! Match all Italian Brainrot character pairs before time runs out. Easy, Medium and Hard difficulty. No download needed.',
  alternates: enAlternates('games/brainrot-puzzle'),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Brainrot Memory Game',
  description: 'Match Italian Brainrot characters in this free memory card game.',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.brainrotnest.com/games/brainrot-puzzle',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function BrainrotMemoryPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 48px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav
        style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
          Home
        </Link>
        <span>›</span>
        <Link href="/games" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
          Games
        </Link>
        <span>›</span>
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Brainrot Memory Game</span>
      </nav>

      {/* Title Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
            fontSize: '32px',
            fontWeight: 700,
            color: '#fff',
            margin: 0,
          }}
        >
          🧩 Brainrot Memory Game
        </h1>
        <span
          style={{
            background: 'rgba(74,222,128,0.15)',
            border: '1px solid rgba(74,222,128,0.3)',
            color: '#4ade80',
            borderRadius: '20px',
            padding: '3px 12px',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.03em',
          }}
        >
          Original Game
        </span>
      </div>

      {/* Game */}
      <div style={{ width: '100%', margin: '20px 0' }}>
        <BrainrotMemoryGame />
      </div>

      {/* About */}
      <section style={{ marginTop: '40px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
            fontSize: '24px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '12px',
          }}
        >
          About Brainrot Memory Game
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '12px' }}>
          Brainrot Memory Game is BrainrotNest&apos;s original card-matching game built around the
          viral Italian Brainrot universe. Flip cards to find matching pairs of beloved characters —
          from the iconic Tralalero Tralala to the fearsome Cappuccino Assassino — before the timer
          runs out. Three difficulty levels keep the challenge fresh whether you&apos;re a casual fan
          or a dedicated Brainrot scholar.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          Your best scores are saved locally so you can always chase a new personal record. The
          scoring system rewards both speed and accuracy — fewer moves with more time remaining
          means a higher final score. Can you get a perfect run on Hard mode?
        </p>
      </section>

      {/* How to Play */}
      <section style={{ marginTop: '32px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
            fontSize: '24px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '12px',
          }}
        >
          How to Play
        </h2>
        <ol
          style={{
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.8,
            paddingLeft: '20px',
            margin: 0,
          }}
        >
          <li>Choose a difficulty — Easy (6 pairs, 60s), Medium (8 pairs, 45s), or Hard (8 pairs, 30s).</li>
          <li>Click any face-down card to flip it over and reveal the character.</li>
          <li>Flip a second card — if the characters match, the pair is locked in.</li>
          <li>If they don&apos;t match, both cards flip back after a short delay.</li>
          <li>Match all pairs before the timer hits zero to win!</li>
          <li>
            Score is calculated as:{' '}
            <strong style={{ color: '#fff' }}>(time remaining × 10) − (moves × 2)</strong>.
          </li>
        </ol>
      </section>

      {/* Internal Links */}
      <section
        style={{ marginTop: '36px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}
      >
        <Link
          href="/games/brainrot-clicker"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 18px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'rgba(255,255,255,0.7)',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          → Play Brainrot Clicker
        </Link>
        <Link
          href="/characters"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 18px',
            background: 'rgba(250,204,21,0.07)',
            border: '1px solid rgba(250,204,21,0.2)',
            borderRadius: '8px',
            color: '#facc15',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          → Meet All Characters
        </Link>
      </section>
    </div>
  )
}
