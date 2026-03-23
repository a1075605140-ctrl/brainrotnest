"use client";

import { useState } from "react";

const inputStyle = {
  width: "100%",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "12px",
  padding: "12px 16px",
  color: "var(--color-text)",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s",
} as React.CSSProperties;

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{
          backgroundColor: "rgba(191,255,0,0.06)",
          border: "1px solid rgba(191,255,0,0.25)",
        }}
      >
        <div className="text-4xl mb-4">🎉</div>
        <h2
          className="text-2xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-fredoka), cursive",
            color: "var(--color-text)",
          }}
        >
          Message Sent!
        </h2>
        <p className="text-base" style={{ color: "var(--color-text-muted)" }}>
          Thanks for reaching out. We&apos;ll get back to you as soon as
          possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold mb-2"
          style={{ color: "var(--color-text-muted)" }}
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "rgba(191,255,0,0.5)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")
          }
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold mb-2"
          style={{ color: "var(--color-text-muted)" }}
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "rgba(191,255,0,0.5)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")
          }
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold mb-2"
          style={{ color: "var(--color-text-muted)" }}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us what's on your mind..."
          value={form.message}
          onChange={handleChange}
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "rgba(191,255,0,0.5)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")
          }
        />
      </div>

      <button
        type="submit"
        className="self-start px-7 py-3 rounded-xl text-sm font-bold transition-opacity duration-200 hover:opacity-80 active:scale-95"
        style={{
          backgroundColor: "#BFFF00",
          color: "#0A0A0F",
        }}
      >
        Send Message
      </button>
    </form>
  );
}
