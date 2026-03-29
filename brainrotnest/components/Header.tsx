"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/quiz", label: "Quiz" },
  { href: "/characters", label: "Characters" },
  { href: "/games", label: "Games" },
  { href: "/brainrot-translator", label: "Translator" },
  { href: "/italian-brainrot-name-generator", label: "Name Gen" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          backgroundColor: "rgba(14,14,26,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 select-none" onClick={() => setMobileOpen(false)}>
            <span
              style={{
                fontFamily: "var(--font-fredoka), cursive",
                fontSize: "1.6rem",
                color: "#ffffff",
                letterSpacing: "0.02em",
              }}
            >
              Brainrot
            </span>
            <span
              style={{
                fontFamily: "var(--font-fredoka), cursive",
                fontSize: "1.6rem",
                color: "var(--color-accent-red)",
                letterSpacing: "0.02em",
              }}
            >
              Nest
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-nunito), sans-serif",
                  border: "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "var(--color-text)";
                  el.style.backgroundColor = "rgba(255,255,255,0.06)";
                  el.style.border = "1px solid rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "var(--color-text-muted)";
                  el.style.backgroundColor = "transparent";
                  el.style.border = "1px solid transparent";
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span
              className="block w-5 h-0.5 rounded transition-all"
              style={{ backgroundColor: "var(--color-text)" }}
            />
            <span
              className="block w-5 h-0.5 rounded transition-all"
              style={{ backgroundColor: "var(--color-text)" }}
            />
            <span
              className="block w-4 h-0.5 rounded transition-all"
              style={{ backgroundColor: "var(--color-text)" }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay Nav */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col md:hidden"
          style={{
            backgroundColor: "rgba(14,14,26,0.98)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Top bar with logo + close */}
          <div className="flex items-center justify-between px-6 h-16">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1 select-none"
            >
              <span
                style={{
                  fontFamily: "var(--font-fredoka), cursive",
                  fontSize: "1.6rem",
                  color: "#ffffff",
                }}
              >
                Brainrot
              </span>
              <span
                style={{
                  fontFamily: "var(--font-fredoka), cursive",
                  fontSize: "1.6rem",
                  color: "var(--color-accent-red)",
                }}
              >
                Nest
              </span>
            </Link>

            {/* Close button (X) */}
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--color-text)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav links — vertically centered, large text */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="w-full max-w-xs text-center py-4 rounded-2xl text-3xl font-bold transition-all duration-200 active:scale-95"
                style={{
                  fontFamily: "var(--font-fredoka), cursive",
                  color: "var(--color-text)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom branding */}
          <div className="px-6 pb-8 text-center">
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              The Ultimate Italian Brainrot Hub
            </p>
          </div>
        </div>
      )}
    </>
  );
}
