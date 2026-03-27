import type { Metadata } from 'next'
import Link from 'next/link'
import BrainrotTowerGame from '@/components/games/BrainrotTowerGame'

export const metadata: Metadata = {
  title: 'Brainrot Tower Defense — Italian Brainrot Tower Game Free',
  description:
    'Play Brainrot Tower Defense free! Place Italian Brainrot character towers to defend against 10 waves of enemies. Free strategy game in your browser.',
  alternates: { canonical: 'https://www.brainrotnest.com/games/brainrot-tower' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Brainrot Tower Defense',
  description: 'Place Italian Brainrot character towers to defend against 10 waves of enemies.',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.brainrotnest.com/games/brainrot-tower',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function BrainrotTowerPage() {
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
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Brainrot Tower Defense</span>
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
          🏰 Brainrot Tower Defense
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
        <BrainrotTowerGame />
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
          About Brainrot Tower Defense
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '12px' }}>
          Brainrot Tower Defense is BrainrotNest&apos;s original strategy game where you deploy
          beloved Italian Brainrot characters as defensive towers along a winding path. Place
          Tralalero the shark for rapid single-target fire, Tung Tung the drum for punishing
          area-of-effect beats, Bombardiro the crocodile for long-range sniper shots, and the
          legendary Cappuccino for an absolutely relentless attack speed.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          Ten waves of increasingly dangerous enemies — from tiny Mini Brainrots to terrifying
          Boss Brainrots — will march from the entrance to your nest. Defeat enemies to earn gold
          and expand your defenses. Survive all ten waves to declare victory and save the nest
          from brainrot chaos.
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
          <li>Select a tower type from the panel — each has a different cost, damage, range, and fire rate.</li>
          <li>Click any empty non-path tile on the grid to place the selected tower.</li>
          <li>Press <strong style={{ color: '#fff' }}>▶ Wave N</strong> to send the next wave of enemies.</li>
          <li>Enemies follow the brown path from ➤ (entrance) to 🏠 (exit) — stop them before they reach the end!</li>
          <li>Each enemy that exits costs you one life — lose all 20 lives and it&apos;s game over.</li>
          <li>Defeated enemies drop gold — spend it on more towers to strengthen your defense.</li>
          <li>Survive all 10 waves to win. Good luck!</li>
        </ol>
      </section>

      {/* Tower reference */}
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
          Tower Guide
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
          {[
            { emoji: '🦈', name: 'Tralalero', cost: 50, range: 3, rate: 'Fast', desc: 'The starter tower. Great value, single-target, fires every second.' },
            { emoji: '🥁', name: 'Tung Tung', cost: 100, range: 2, rate: 'Fast', desc: 'Hits all enemies in range — ideal for clustered waves.' },
            { emoji: '🐊', name: 'Bombardiro', cost: 200, range: 4, rate: 'Slow', desc: 'Highest damage per shot with the longest reach on the field.' },
            { emoji: '💀', name: 'Cappuccino', cost: 300, range: 3, rate: 'Ultra', desc: 'Fires every 0.5 s — melts bosses with sheer attack volume.' },
          ].map(t => (
            <div
              key={t.name}
              style={{
                padding: '12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '8px',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{t.emoji} <strong style={{ color: '#fff' }}>{t.name}</strong></div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '4px' }}>
                💰 {t.cost} · Range {t.range} · {t.rate} fire
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Internal Links */}
      <section style={{ marginTop: '36px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
