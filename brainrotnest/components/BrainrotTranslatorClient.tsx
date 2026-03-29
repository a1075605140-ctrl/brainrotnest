"use client";

import { useState, useCallback } from "react";
import { translateFullText, type TranslationIntensity } from "@/lib/brainrotTranslatorData";

const EXAMPLE_TEXTS = [
  "I am going to eat breakfast this morning and then walk to school.",
  "Hello friend! Today is a great day and I feel amazing.",
  "I really love this song, it makes me so happy every time I hear it.",
  "Bro this video is literally the funniest thing I have ever seen lmao.",
  "I think we should work together to solve this problem.",
];

const intensityOptions: { value: TranslationIntensity; label: string; desc: string; color: string }[] = [
  {
    value: "mild",
    label: "Mild Brainrot",
    desc: "Just a sprinkle of chaos",
    color: "#4ade80",
  },
  {
    value: "medium",
    label: "Medium Brainrot",
    desc: "Certified brainrot energy",
    color: "#facc15",
  },
  {
    value: "maximum",
    label: "MAXIMUM BRAINROT",
    desc: "Full Bombardiro mode activated",
    color: "#f87171",
  },
];

export default function BrainrotTranslatorClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [intensity, setIntensity] = useState<TranslationIntensity>("medium");
  const [copied, setCopied] = useState(false);
  const [hasTranslated, setHasTranslated] = useState(false);

  const handleTranslate = useCallback(() => {
    if (!inputText.trim()) return;
    const result = translateFullText(inputText, intensity);
    setOutputText(result);
    setHasTranslated(true);
  }, [inputText, intensity]);

  const handleCopy = useCallback(async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = outputText;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [outputText]);

  const handleExample = useCallback(() => {
    const random = EXAMPLE_TEXTS[Math.floor(Math.random() * EXAMPLE_TEXTS.length)];
    setInputText(random);
    setOutputText("");
    setHasTranslated(false);
  }, []);

  const handleClear = useCallback(() => {
    setInputText("");
    setOutputText("");
    setHasTranslated(false);
  }, []);

  const selectedIntensity = intensityOptions.find((o) => o.value === intensity)!;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Intensity Selector */}
      <div className="mb-6">
        <p
          className="text-sm font-semibold mb-3 uppercase tracking-wider"
          style={{ color: "var(--color-text-muted)" }}
        >
          Brainrot Intensity
        </p>
        <div className="grid grid-cols-3 gap-3">
          {intensityOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setIntensity(opt.value)}
              className="relative py-3 px-4 rounded-xl text-center transition-all duration-200 active:scale-95"
              style={{
                backgroundColor:
                  intensity === opt.value
                    ? `${opt.color}18`
                    : "rgba(255,255,255,0.04)",
                border: `2px solid ${intensity === opt.value ? opt.color : "rgba(255,255,255,0.08)"}`,
                color: intensity === opt.value ? opt.color : "var(--color-text-muted)",
              }}
            >
              <div
                className="text-sm font-bold"
                style={{
                  fontFamily: "var(--font-fredoka), cursive",
                  fontSize: opt.value === "maximum" ? "0.85rem" : "0.95rem",
                }}
              >
                {opt.label}
              </div>
              <div className="text-xs mt-0.5 hidden sm:block opacity-70">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Input / Output Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text-muted)" }}
            >
              Normal Language
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleExample}
                className="text-xs px-3 py-1 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "var(--color-text-muted)",
                }}
              >
                Try Example
              </button>
              {inputText && (
                <button
                  onClick={handleClear}
                  className="text-xs px-3 py-1 rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: "rgba(248,113,113,0.1)",
                    border: "1px solid rgba(248,113,113,0.2)",
                    color: "#f87171",
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setHasTranslated(false);
            }}
            placeholder="Type anything here... 
E.g. 'Hello, I am going to work today and I feel very tired.'"
            className="w-full h-48 p-4 rounded-xl text-sm resize-none transition-all duration-200 outline-none"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--color-text)",
              fontFamily: "var(--font-nunito), sans-serif",
              lineHeight: "1.6",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.25)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
            }}
          />
          <div
            className="text-xs text-right"
            style={{ color: "var(--color-text-muted)" }}
          >
            {inputText.length} / 500 characters
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: selectedIntensity.color }}
            >
              Brainrot Output
            </label>
            {outputText && (
              <button
                onClick={handleCopy}
                className="text-xs px-3 py-1 rounded-lg transition-all duration-200 flex items-center gap-1.5"
                style={{
                  backgroundColor: copied
                    ? "rgba(74,222,128,0.15)"
                    : "rgba(255,255,255,0.06)",
                  border: `1px solid ${copied ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.1)"}`,
                  color: copied ? "#4ade80" : "var(--color-text-muted)",
                }}
              >
                {copied ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            )}
          </div>
          <div
            className="w-full h-48 p-4 rounded-xl text-sm overflow-y-auto"
            style={{
              backgroundColor: hasTranslated
                ? `${selectedIntensity.color}08`
                : "rgba(255,255,255,0.02)",
              border: `1px solid ${hasTranslated ? `${selectedIntensity.color}30` : "rgba(255,255,255,0.06)"}`,
              color: hasTranslated ? "var(--color-text)" : "var(--color-text-muted)",
              fontFamily: "var(--font-nunito), sans-serif",
              lineHeight: "1.6",
              transition: "all 0.3s ease",
            }}
          >
            {outputText || (
              <span className="italic text-xs">
                Your brainrot translation will appear here...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Translate Button */}
      <div className="flex justify-center">
        <button
          onClick={handleTranslate}
          disabled={!inputText.trim()}
          className="relative px-10 py-4 rounded-2xl font-bold text-base transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            fontFamily: "var(--font-fredoka), cursive",
            fontSize: "1.1rem",
            backgroundColor: inputText.trim() ? selectedIntensity.color : "rgba(255,255,255,0.1)",
            color: inputText.trim() ? "#0e0e1a" : "var(--color-text-muted)",
            boxShadow: inputText.trim()
              ? `0 0 24px ${selectedIntensity.color}40, 0 4px 16px rgba(0,0,0,0.3)`
              : "none",
          }}
        >
          {intensity === "maximum"
            ? "🐊 BOMBARDIRO TRANSLATE!!!"
            : intensity === "medium"
            ? "☕ Translate to Brainrot"
            : "🎵 Translate"}
        </button>
      </div>

      {/* Character Guide */}
      <div
        className="mt-10 p-5 rounded-2xl"
        style={{
          backgroundColor: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: "var(--color-text-muted)" }}
        >
          Brainrot Vocabulary Key
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { char: "🐊 Bombardiro Crocodilo", meaning: "Chaos, explosions, domination" },
            { char: "🥁 Tung Tung Sahur", meaning: "Rhythm, noise, wake-up calls" },
            { char: "🎵 Tralalero Tralala", meaning: "Music, melody, sonic loops" },
            { char: "☕ Cappuccino Assassino", meaning: "Speed, precision, revenge" },
            { char: "💃 Ballerina Cappuccina", meaning: "Grace, power, coffee" },
            { char: "🦶 Brr Brr Patapim", meaning: "Giant feet, earthquakes, speed" },
            { char: "⏱️ Lirili Larila", meaning: "Time control, ancient wisdom" },
          ].map((item) => (
            <div
              key={item.char}
              className="flex flex-col gap-0.5 p-2 rounded-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <span className="text-xs font-semibold" style={{ color: "var(--color-text)" }}>
                {item.char}
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {item.meaning}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
