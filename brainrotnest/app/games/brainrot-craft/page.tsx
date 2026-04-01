import type { Metadata } from 'next'
import Link from 'next/link'
import BrainrotCraftGame from '@/components/games/BrainrotCraftGame'
import { enAlternates } from '@/lib/ptBrAlternates'

export const metadata: Metadata = {
  title: 'Brainrot Craft — Italian Brainrot Crafting Game Free',
  description:
    'Play Brainrot Craft free! Gather resources and craft Italian Brainrot items. Collect Brainrot, Chaos, Espresso and more to craft powerful items.',
  alternates: enAlternates('games/brainrot-craft'),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Brainrot Craft',
  description: 'Gather resources and craft Italian Brainrot items.',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.brainrotnest.com/games/brainrot-craft',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function BrainrotCraftPage() {
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
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Brainrot Craft</span>
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
          ⚒️ Brainrot Craft
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
        <BrainrotCraftGame />
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
          About Brainrot Craft
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '12px' }}>
          Brainrot Craft puts you in control of building your very own Italian Brainrot empire
          from the ground up. Gather six distinct resources — Brainrot, Chaos, Espresso, Feathers,
          Scales, and Rhythm — by clicking dedicated buttons, then combine them using crafting
          recipes to earn points and forge powerful items.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          Work your way up from a Basic Nest all the way to the legendary Satellite Dish. Each
          recipe rewards more points than the last, so plan your resource gathering carefully and
          see how high you can push your score!
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
          <li>Click the resource buttons on the left to gather +2 of each resource per click.</li>
          <li>Check the crafting recipes on the right — ingredients turn green when you have enough.</li>
          <li>Hit &quot;Craft!&quot; to consume the ingredients and earn points.</li>
          <li>Items can be crafted multiple times — the crafting log tracks your recent activity.</li>
          <li>Craft all 6 items and maximize your score!</li>
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
          href="/games/brainrot-idle"
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
          → Play Brainrot Idle
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
