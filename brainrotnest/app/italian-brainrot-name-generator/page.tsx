import type { Metadata } from 'next'
import NameGeneratorClient from './NameGeneratorClient'

export const metadata: Metadata = {
  title: 'Italian Brainrot Name Generator — Create Your Brainrot Alter Ego',
  description: 'Generate a random Italian Brainrot character name. Free online tool with hundreds of combinations. Find your chaotic alter ego.',
  alternates: {
    canonical: 'https://www.brainrotnest.com/italian-brainrot-name-generator',
  },
  openGraph: {
    title: 'Italian Brainrot Name Generator',
    description: 'Generate your own Italian Brainrot character name. Free, instant, endlessly chaotic.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Italian Brainrot Name Generator',
  url: 'https://www.brainrotnest.com/italian-brainrot-name-generator',
  description: 'Generate a random Italian Brainrot character name. Free online tool.',
  applicationCategory: 'EntertainmentApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function ItalianBrainrotNameGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        {/* Badge */}
        <div className="mb-6">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              backgroundColor: 'rgba(74,222,128,0.12)',
              border: '1px solid rgba(74,222,128,0.25)',
              color: 'var(--color-accent-green)',
            }}
          >
            🎲 Free Tool
          </span>
        </div>

        {/* H1 */}
        <h1
          className="text-4xl sm:text-5xl mb-3 leading-tight"
          style={{ fontFamily: 'var(--font-fredoka), cursive' }}
        >
          Italian Brainrot{' '}
          <span style={{ color: 'var(--color-accent-green)' }}>Name Generator</span>
        </h1>

        <p className="text-base sm:text-lg mb-10" style={{ color: 'var(--color-text-muted)' }}>
          Generate your chaotic Italian Brainrot alter ego
        </p>

        <NameGeneratorClient />
      </div>
    </>
  )
}
