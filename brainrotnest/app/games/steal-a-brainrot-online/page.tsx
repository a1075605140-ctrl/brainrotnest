import type { Metadata } from 'next'
import Link from 'next/link'
import StealBrainrotGame from '@/components/games/StealBrainrotGame'
import { enAlternates } from '@/lib/ptBrAlternates'

export const metadata: Metadata = {
  title: 'Steal a Brainrot — Free Online Brainrot Card Game',
  description:
    'Play Steal a Brainrot free online! The card stealing game where you steal Italian Brainrot characters from your opponent. No download needed.',
  alternates: enAlternates('games/steal-a-brainrot-online'),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Steal a Brainrot',
  description: 'Free online multiplayer card game. Steal Italian Brainrot character cards to win.',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.brainrotnest.com/games/steal-a-brainrot-online',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function StealABrainrotPage() {
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
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Steal a Brainrot</span>
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
          🃏 Steal a Brainrot
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
        <StealBrainrotGame />
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
          About Steal a Brainrot
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '12px' }}>
          Steal a Brainrot is BrainrotNest&apos;s original card-stealing game where you go
          head-to-head against the AI with a hand of Italian Brainrot characters. Each character has
          a Power rating — play your strongest card against a weaker opponent card to steal it and
          add it to your collection.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          But be careful: if your card loses, the AI steals yours instead! Draw from the shared
          deck to replenish your hand and keep fighting. When the deck runs dry, whoever collected
          the most characters wins. From the humble Tralalero Tralala (Power 1) to the mighty
          La Vaca Saturno (Power 8), every card counts.
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
          <li>Both you and the AI start with 3 random Brainrot character cards.</li>
          <li>Click a card in your hand to select it — the yellow border shows your pick.</li>
          <li>
            Press <strong style={{ color: '#fff' }}>⚔️ Steal!</strong> to challenge the AI.
          </li>
          <li>
            If your card&apos;s Power beats the AI&apos;s random card, you steal their card.
            Otherwise, they steal yours.
          </li>
          <li>Both sides draw a replacement card from the deck after each battle.</li>
          <li>The AI automatically takes its own turn after yours.</li>
          <li>When the deck is empty, the player with the most collected cards wins!</li>
        </ol>
      </section>

      {/* Internal Links */}
      <section style={{ marginTop: '36px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
          → Play Brainrot Memory Game
        </Link>
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
