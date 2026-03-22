"use client"

import { useCallback } from "react"

type TocItem = { text: string; id: string }

export default function TocLinks({ items }: { items: TocItem[] }) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    },
    []
  )

  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-2">
          <span style={{ color: "var(--color-accent-green)", flexShrink: 0, marginTop: 2 }}>
            ▸
          </span>
          <a
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className="text-sm leading-snug hover:underline"
            style={{ color: "var(--color-text-muted)" }}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  )
}
