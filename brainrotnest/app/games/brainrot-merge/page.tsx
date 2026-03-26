import type { Metadata } from 'next'
import Link from 'next/link'
import BrainrotMergeGame from '@/components/games/BrainrotMergeGame'
import AdPlaceholder from '@/components/AdPlaceholder'

export const metadata: Metadata = {
  title: 'Brainrot Merge — Merge Italian Brainrot Characters Game',
  description:
    'Play Brainrot Merge free! Merge Italian Brainrot characters to reach La Vaca Saturno. 2048-style puzzle game with all your favorite brainrot characters.',
  alternates: { canonical: 'https://www.brainrotnest.com/games/brainrot-merge' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Brainrot Merge',
  description: 'Merge Italian Brainrot characters to unlock legendary forms. Free browser game.',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.brainrotnest.com/games/brainrot-merge',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function BrainrotMergePage() {
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
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Brainrot Merge</span>
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
          🔀 Brainrot Merge
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

      <AdPlaceholder size="banner" />

      {/* Game Component */}
      <div style={{ width: '100%', margin: '20px 0' }}>
        <BrainrotMergeGame />
      </div>

      <AdPlaceholder size="banner" />

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
          About Brainrot Merge
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '12px' }}>
          Brainrot Merge is BrainrotNest&apos;s original 2048-style puzzle game — but instead of
          sliding numbered tiles, you&apos;re merging the full cast of Italian Brainrot characters.
          Combine two Brainrot Eggs to hatch a Baby Brainrot. Merge Baby Brainrots to summon
          Tralalero Tralala. Keep evolving until you reach the pinnacle of Italian chaos:{' '}
          <strong style={{ color: '#fff' }}>La Vaca Saturno</strong> — a cow, in orbit.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          Every merge adds to your score, and every move counts. Plan your merges carefully or
          watch the board fill up with mismatched creatures you can&apos;t combine. Your best
          score is saved locally so you can always aim higher on your next run.
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
          <li>
            Use <strong style={{ color: '#fff' }}>arrow keys</strong> (desktop) or{' '}
            <strong style={{ color: '#fff' }}>swipe</strong> (mobile) to slide all characters in one
            direction.
          </li>
          <li>
            Two characters of the same type that collide will{' '}
            <strong style={{ color: '#fff' }}>merge</strong> into the next evolution.
          </li>
          <li>
            After every move, a new{' '}
            <strong style={{ color: '#fff' }}>Brainrot Egg 🥚</strong> appears in a random empty
            cell.
          </li>
          <li>
            Earn points for every merge — higher-level characters are worth exponentially more.
          </li>
          <li>
            Reach <strong style={{ color: '#facc15' }}>La Vaca Saturno 🐄</strong> (level 12) to
            win. You can keep playing afterwards for a higher score!
          </li>
          <li>
            The game ends when the board is full and no adjacent characters can merge.
          </li>
        </ol>
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
