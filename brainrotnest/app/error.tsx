"use client";

import Link from "next/link";
import { useEffect } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("BrainrotNest error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div
        style={{ fontSize: 96, lineHeight: 1, marginBottom: 24 }}
        role="img"
        aria-label="Skull"
      >
        💀
      </div>

      <h1
        className="text-4xl sm:text-5xl mb-4"
        style={{ fontFamily: "var(--font-fredoka), cursive" }}
      >
        Something broke the{" "}
        <span style={{ color: "var(--color-accent-red)" }}>brainrot</span>
      </h1>

      <p
        className="text-base sm:text-lg max-w-md mb-10"
        style={{ color: "var(--color-text-muted)" }}
      >
        An unexpected error occurred. Even Cappuccino Assassino can&apos;t fix this silently.
        {error?.digest && (
          <span className="block mt-2 text-xs font-mono opacity-50">
            Error ID: {error.digest}
          </span>
        )}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="btn-primary px-7 py-3 rounded-xl font-bold text-sm"
        >
          🔄 Try Again
        </button>
        <Link
          href="/"
          className="btn-outline px-7 py-3 rounded-xl font-bold text-sm"
        >
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
