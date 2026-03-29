"use client";

import Link from "next/link";

const links = [
  {
    href: "/characters",
    emoji: "🐊",
    title: "Character Wiki",
    desc: "Learn the full lore of every brainrot character",
  },
  {
    href: "/quiz",
    emoji: "🧠",
    title: "Brainrot Quiz",
    desc: "Test your Italian Brainrot knowledge",
  },
  {
    href: "/italian-brainrot-name-generator",
    emoji: "⚡",
    title: "Name Generator",
    desc: "Generate your own Italian Brainrot name",
  },
];

export default function TranslatorRelatedLinks() {
  return (
    <div className="mt-8 grid sm:grid-cols-3 gap-4">
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col gap-2 p-5 rounded-2xl transition-all duration-200 group"
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
            e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
            e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
          }}
        >
          <span className="text-2xl">{item.emoji}</span>
          <span
            className="font-bold text-sm"
            style={{
              fontFamily: "var(--font-fredoka), cursive",
              color: "var(--color-text)",
            }}
          >
            {item.title}
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            {item.desc}
          </span>
        </Link>
      ))}
    </div>
  );
}
