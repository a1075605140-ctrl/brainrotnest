'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

const prefixes = [
  'Bombardiro', 'Tralalero', 'Cappuccino', 'Frigo', 'Lirili',
  'Brr Brr', 'Chimpanzini', 'Bombombini', 'Cocofanto', 'Frulli',
  'Ballerina', 'Bobrito', 'Burbaloni', 'Bananita', 'Glorbo',
]

const suffixes = [
  'Crocodilo', 'Tralala', 'Assassino', 'Camello', 'Larila',
  'Patapim', 'Bananini', 'Gusini', 'Elefanto', 'Frulla',
  'Cappuccina', 'Bandito', 'Luliloli', 'Dolphina', 'Fruttodrillo',
]

const EXISTING = new Set([
  'Bombardiro Crocodilo', 'Tralalero Tralala', 'Cappuccino Assassino',
  'Frigo Camello', 'Lirili Larila', 'Brr Brr Patapim', 'Chimpanzini Bananini',
  'Bombombini Gusini', 'Cocofanto Elefanto', 'Frulli Frulla',
  'Ballerina Cappuccina', 'Bobrito Bandito',
])

function generateName(): string {
  let name = ''
  let attempts = 0
  do {
    const p = prefixes[Math.floor(Math.random() * prefixes.length)]
    const s = suffixes[Math.floor(Math.random() * suffixes.length)]
    name = `${p} ${s}`
    attempts++
  } while (EXISTING.has(name) && attempts < 20)
  return name
}

export default function NameGeneratorClient() {
  const [name, setName] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = useCallback(() => {
    setName(generateName())
    setCopied(false)
  }, [])

  const handleCopy = useCallback(() => {
    if (!name) return
    navigator.clipboard.writeText(name).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [name])

  const shareText = name
    ? `My Italian Brainrot name is ${name} 🧠 Find yours at brainrotnest.com/italian-brainrot-name-generator`
    : ''
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`

  return (
    <>
      {/* Generator Card */}
      <div
        className="rounded-3xl p-8 sm:p-10 text-center mb-8"
        style={{
          background: 'linear-gradient(135deg, rgba(74,222,128,0.07) 0%, rgba(250,204,21,0.06) 100%)',
          border: '1px solid rgba(74,222,128,0.2)',
        }}
      >
        {/* Result display */}
        <div className="mb-8 min-h-[80px] flex items-center justify-center">
          {name ? (
            <p
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#facc15', lineHeight: 1.2 }}
            >
              {name}
            </p>
          ) : (
            <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
              Press the button to reveal your Brainrot name ↓
            </p>
          )}
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold mb-6 w-full sm:w-auto"
          style={{ fontSize: '18px' }}
        >
          🎲 Generate My Brainrot Name
        </button>

        {/* Action buttons — visible only after generating */}
        {name && (
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
              style={{
                backgroundColor: copied ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.08)',
                border: copied ? '1px solid rgba(74,222,128,0.4)' : '1px solid rgba(255,255,255,0.15)',
                color: copied ? 'var(--color-accent-green)' : 'var(--color-text)',
                cursor: 'pointer',
              }}
            >
              {copied ? '✓ Copied!' : '📋 Copy Name'}
            </button>

            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
              style={{
                backgroundColor: 'rgba(29,161,242,0.12)',
                border: '1px solid rgba(29,161,242,0.25)',
                color: '#1da1f2',
                textDecoration: 'none',
              }}
            >
              🐦 Share on X
            </a>

            <button
              onClick={handleGenerate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
              style={{
                backgroundColor: 'rgba(250,204,21,0.1)',
                border: '1px solid rgba(250,204,21,0.25)',
                color: '#facc15',
                cursor: 'pointer',
              }}
            >
              🔄 Try Again
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      <section
        className="rounded-2xl p-6 mb-8"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
      >
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: 'var(--font-fredoka), cursive' }}
        >
          About This Generator
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          Italian Brainrot names follow a specific pattern: two-part names with Italian-sounding syllables,
          often combining animals, foods, and random objects. This generator remixes the naming conventions
          of the Italian Brainrot universe to create your unique brainrot alter ego.
          Not happy with your name? Keep generating — there are hundreds of combinations.
          Want to find out which real Italian Brainrot character matches your personality instead?
          Take the official BrainrotNest quiz.
        </p>
      </section>

      {/* CTA links */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/quiz/brainrot-quiz"
          className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
        >
          🎮 Take the Personality Quiz
        </Link>
        <Link
          href="/characters"
          className="btn-outline inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
        >
          🧬 Meet Real Characters
        </Link>
      </div>
    </>
  )
}
