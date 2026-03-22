"use client"

import { useState } from "react"

type Faq = { q: string; a: string }

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3 my-4">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <button
            className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span
              className="text-sm font-bold leading-snug"
              style={{ color: "var(--color-accent-yellow)" }}
            >
              {faq.q}
            </span>
            <span
              className="text-base shrink-0 transition-transform duration-200"
              style={{
                color: "var(--color-text-muted)",
                transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                display: "inline-block",
              }}
            >
              ▾
            </span>
          </button>
          {openIndex === i && (
            <div className="px-5 pb-5">
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                {faq.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
