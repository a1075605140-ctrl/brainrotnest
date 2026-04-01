import type { Metadata } from 'next'
import Link from 'next/link'
import BrainrotQuizGame from '@/components/games/BrainrotQuizGame'
import { enAlternates } from '@/lib/ptBrAlternates'

export const metadata: Metadata = {
  title: 'Brainrot Quiz Game — Italian Brainrot Trivia Game Online',
  description:
    'Play Brainrot Quiz Game free! Test your Italian Brainrot knowledge in 12 questions. How well do you know Bombardiro Crocodilo, Tung Tung Sahur and more?',
  alternates: enAlternates('games/brainrot-quiz-game'),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Brainrot Quiz Game',
  description: 'Italian Brainrot trivia quiz game — 12 questions, 30 seconds each',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.brainrotnest.com/games/brainrot-quiz-game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function BrainrotQuizGamePage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 48px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href="/games" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Games</Link>
        <span>›</span>
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Brainrot Quiz Game</span>
      </nav>

      {/* Title Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '32px', fontWeight: 700, color: '#fff', margin: 0 }}>
          ❓ Brainrot Quiz Game
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

      {/* Game Component */}
      <div style={{ width: '100%', margin: '20px 0' }}>
        <BrainrotQuizGame />
      </div>

      {/* About Section */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
          About Brainrot Quiz Game
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '12px' }}>
          Brainrot Quiz Game is BrainrotNest&apos;s original trivia game — a free online quiz that puts your Italian Brainrot
          knowledge to the ultimate test. Every session draws 12 random questions from a pool of 30, covering character lore,
          abilities, catchphrases, and fun facts from across the entire Italian Brainrot universe. You&apos;ve got 30 seconds
          per question, and the clock doesn&apos;t forgive hesitation.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          Do you know which character is fused with a bomber plane? Can you name the one who lives in Saturn&apos;s orbit?
          Whether you&apos;re a Certified Normie or a true Italian Brainrot Scholar, find out exactly where you stand on
          the brainrot spectrum.
        </p>
      </section>

      {/* How to Play */}
      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
          How to Play
        </h2>
        <ol style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
          <li>Hit <strong style={{ color: '#fff' }}>Start Quiz</strong> to begin — 12 random questions are selected every time.</li>
          <li>Read the question and click your answer before the <strong style={{ color: '#fff' }}>30-second timer</strong> runs out.</li>
          <li>Correct answers turn <strong style={{ color: '#4ade80' }}>green</strong>; wrong ones turn <strong style={{ color: '#ef4444' }}>red</strong>, and the right answer is revealed.</li>
          <li>After all 12 questions, see your score and title — from <em>Certified Normie</em> to <em>You ARE the Brainrot</em>.</li>
          <li>Hit <strong style={{ color: '#fff' }}>Play Again</strong> for a fresh set of questions — no two runs are the same.</li>
        </ol>
      </section>

      {/* Internal Links */}
      <section style={{ marginTop: '36px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
          }}
        >
          → Take the Brainrot Quiz
        </Link>
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
          }}
        >
          → Meet All Characters
        </Link>
      </section>
    </div>
  )
}
