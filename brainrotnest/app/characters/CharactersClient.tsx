"use client"

import { useState } from "react"
import Link from "next/link"
import type { Character } from "@/lib/charactersData"

export default function CharactersClient({ characters }: { characters: Character[] }) {
  const [query, setQuery] = useState("")

  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      {/* Search bar */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="🔍  Search characters..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-lg rounded-2xl px-5 py-3 text-base outline-none transition-all duration-200"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "var(--color-text)",
            fontFamily: "var(--font-nunito), sans-serif",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(74,222,128,0.45)"
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74,222,128,0.08)"
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"
            e.currentTarget.style.boxShadow = "none"
          }}
        />
      </div>

      {/* Characters grid */}
      {filtered.length === 0 ? (
        <p className="text-center py-16 text-lg" style={{ color: "var(--color-text-muted)" }}>
          No characters found for &ldquo;{query}&rdquo;
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((char) => (
            <CharacterCard key={char.slug} char={char} />
          ))}
        </div>
      )}
    </>
  )
}

function CharacterCard({ char }: { char: Character }) {
  return (
    <Link
      href={`/characters/${char.slug}`}
      className="rounded-2xl p-5 flex flex-col gap-3 group"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        transition: "transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.transform = "translateY(-4px)"
        el.style.borderColor = "rgba(255,255,255,0.22)"
        el.style.backgroundColor = "rgba(255,255,255,0.07)"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.transform = "translateY(0)"
        el.style.borderColor = "var(--color-border)"
        el.style.backgroundColor = "var(--color-surface)"
      }}
    >
      {/* Emoji */}
      <span style={{ fontSize: 64, lineHeight: 1 }}>{char.emoji}</span>

      {/* Name */}
      <h2
        className="text-lg leading-tight"
        style={{ fontFamily: "var(--font-fredoka), cursive" }}
      >
        {char.name}
      </h2>

      {/* Tagline */}
      <p className="text-xs leading-snug" style={{ color: "var(--color-text-muted)" }}>
        {char.tagline}
      </p>

      {/* Personality pills */}
      <div className="flex flex-wrap gap-1 mt-auto">
        {char.personality.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "rgba(167,139,250,0.18)",
              color: "#c4b5fd",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
