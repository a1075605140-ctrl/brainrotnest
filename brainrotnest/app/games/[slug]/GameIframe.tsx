"use client"

import { useRef } from "react"

interface Props {
  iframeUrl: string
  gameName: string
}

export default function GameIframe({ iframeUrl, gameName }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  function handleFullscreen() {
    const el = iframeRef.current
    if (!el) return
    if (el.requestFullscreen) {
      el.requestFullscreen()
    }
  }

  return (
    <div
      className="relative w-full"
      style={{
        height: "clamp(280px, 60vw, 560px)",
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#000",
        border: "1px solid rgba(74,222,128,0.2)",
      }}
    >
      {/* Loading pulse background */}
      <div
        className="absolute inset-0 animate-pulse"
        style={{ backgroundColor: "rgba(74,222,128,0.04)", zIndex: 0 }}
      />

      <iframe
        ref={iframeRef}
        src={iframeUrl}
        title={gameName}
        allow="fullscreen; autoplay"
        allowFullScreen
        className="relative w-full h-full"
        style={{ border: "none", zIndex: 1 }}
      />

      {/* Fullscreen button */}
      <button
        onClick={handleFullscreen}
        aria-label="Enter fullscreen"
        className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-90"
        style={{
          backgroundColor: "rgba(0,0,0,0.65)",
          color: "rgba(255,255,255,0.85)",
          zIndex: 10,
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 3H5a2 2 0 0 0-2 2v3" />
          <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
          <path d="M3 16v3a2 2 0 0 0 2 2h3" />
          <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
        </svg>
        Fullscreen
      </button>
    </div>
  )
}
