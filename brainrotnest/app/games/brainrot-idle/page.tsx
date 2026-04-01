import type { Metadata } from 'next'
import Link from 'next/link'
import BrainrotIdleGame from '@/components/games/BrainrotIdleGame'
import { enAlternates } from '@/lib/ptBrAlternates'

export const metadata: Metadata = {
  title: 'Brainrot Idle — Italian Brainrot Idle Clicker Game Free',
  description:
    'Play Brainrot Idle free! Build your brainrot empire and earn points even when offline. Italian Brainrot idle game with 6 generators and milestones.',
  alternates: enAlternates('games/brainrot-idle'),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Brainrot Idle',
  description: 'Build your brainrot empire and earn points even when offline.',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.brainrotnest.com/games/brainrot-idle',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function BrainrotIdlePage() {
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
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Brainrot Idle</span>
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
          💤 Brainrot Idle
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
        <BrainrotIdleGame />
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
          About Brainrot Idle
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '12px' }}>
          Brainrot Idle is the purest idle game in the Italian Brainrot universe. Build your empire
          by purchasing six iconic generators — from humble Brainrot Eggs all the way to the Satellite
          Cow Station in orbit. Each generator produces Brainrot Points automatically, even when the
          tab is closed. Return after hours away to collect your offline earnings at 50% efficiency
          (up to 8 hours).
        </p>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          Six milestones unlock increasingly powerful production multipliers as your total earnings
          grow. Reach the Orbital Achievement for a 5× multiplier and watch your empire spiral into
          full brainrot overdrive. Your progress is saved automatically every 30 seconds.
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
          <li>Buy generators to start earning Brainrot Points per second.</li>
          <li>Each generator costs 15% more per copy owned — buy in bulk with ×10 or ×Max.</li>
          <li>Unlock milestones by accumulating total points to boost your multiplier.</li>
          <li>Close the tab and come back later — offline earnings wait for you to collect.</li>
          <li>Progress saves automatically every 30 seconds.</li>
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
          href="/games/brainrot-puzzle"
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
          → Play Memory Game
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
