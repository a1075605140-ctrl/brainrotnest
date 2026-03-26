import type { Metadata } from 'next'
import Link from 'next/link'
import BrainrotClickerGame from '@/components/games/BrainrotClickerGame'
import AdPlaceholder from '@/components/AdPlaceholder'

export const metadata: Metadata = {
  title: 'Brainrot Clicker — Free Italian Brainrot Clicker Game Online',
  description:
    'Play Brainrot Clicker free! The original Italian Brainrot clicker game. Click to unlock all 10 characters including Bombardiro Crocodilo, Tung Tung Sahur and more. No download needed.',
  alternates: { canonical: 'https://www.brainrotnest.com/games/brainrot-clicker' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Brainrot Clicker',
  description: 'Free online Italian Brainrot clicker game. Click to unlock all brainrot characters.',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.brainrotnest.com/games/brainrot-clicker',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function BrainrotClickerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Full-viewport game area — no scroll needed */}
      <div style={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        <BrainrotClickerGame />
      </div>

      {/* SEO content — scroll down to read */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px 48px' }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/games" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Games</Link>
          <span>›</span>
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>Brainrot Clicker</span>
        </nav>

        {/* Title Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <h1 style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '32px', fontWeight: 700, color: '#fff', margin: 0 }}>
            🎮 Brainrot Clicker
          </h1>
          <span style={{
            background: 'rgba(74,222,128,0.15)',
            border: '1px solid rgba(74,222,128,0.3)',
            color: '#4ade80',
            borderRadius: '20px',
            padding: '3px 12px',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.03em',
          }}>
            Original Game
          </span>
        </div>

        <AdPlaceholder size="banner" />

      {/* About Section */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
          About Brainrot Clicker
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '12px' }}>
          Brainrot Clicker is BrainrotNest&apos;s original clicker game — a free online italian brainrot clicker built around
          the viral Italian Brainrot universe. Click your starter character to earn Brainrot Points, then spend them on
          upgrades that boost your clicking power and passive income. As your total points grow, you&apos;ll unlock all 10
          iconic Italian brainrot characters: from the humble Tralalero Tralala to the cosmic La Vaca Saturno.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          Unlike other clicker games, Brainrot Clicker is packed with the genuine chaos energy that made the Italian
          Brainrot meme universe famous. Every upgrade feels ridiculous on purpose, and hitting a new character unlock
          is the kind of dopamine hit that makes you immediately start grinding for the next one.
        </p>
      </section>

      {/* How to Play */}
      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
          How to Play
        </h2>
        <ol style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
          <li>Click the big emoji to earn Brainrot Points.</li>
          <li>Buy <strong style={{ color: '#fff' }}>Click Upgrades</strong> to earn more points per click.</li>
          <li>Buy <strong style={{ color: '#fff' }}>Passive Income</strong> upgrades to earn points automatically every second.</li>
          <li>Unlock all 10 Italian Brainrot characters by reaching point milestones.</li>
          <li>Reach 5,000,000 total points to unlock the final character — La Vaca Saturno. A cow. In orbit.</li>
        </ol>
      </section>

      {/* Internal Links */}
      <section style={{ marginTop: '36px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link
          href="/characters"
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
            transition: 'all 0.15s',
          }}
        >
          → Meet All Characters
        </Link>
        <Link
          href="/quiz/brainrot-quiz"
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
            transition: 'all 0.15s',
          }}
        >
          → Take the Brainrot Quiz
        </Link>
      </section>
      </div>
    </>
  )
}
