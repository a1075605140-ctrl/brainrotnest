import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Brainrot Not Found | BrainrotNest",
  description: "This page doesn't exist. Even Bombardiro Crocodilo couldn't find it.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div
        style={{ fontSize: 96, lineHeight: 1, marginBottom: 24 }}
        role="img"
        aria-label="Bombardiro Crocodilo"
      >
        🐊
      </div>

      <h1
        className="text-4xl sm:text-5xl mb-4"
        style={{ fontFamily: "var(--font-fredoka), cursive" }}
      >
        404 —{" "}
        <span style={{ color: "var(--color-accent-red)" }}>Brainrot Not Found</span>
      </h1>

      <p
        className="text-base sm:text-lg max-w-md mb-10"
        style={{ color: "var(--color-text-muted)" }}
      >
        Even Bombardiro Crocodilo couldn&apos;t find this page.
        <br />
        It may have been bombed into oblivion.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="btn-primary px-7 py-3 rounded-xl font-bold text-sm"
        >
          🏠 Back to Home
        </Link>
        <Link
          href="/characters"
          className="btn-outline px-7 py-3 rounded-xl font-bold text-sm"
        >
          🧬 Meet the Characters
        </Link>
      </div>
    </div>
  );
}
