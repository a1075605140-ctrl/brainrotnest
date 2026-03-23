import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with BrainrotNest for questions, suggestions, or business inquiries.",
};

export default function ContactPage() {
  return (
    <div
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka), cursive",
              color: "var(--color-text)",
            }}
          >
            Contact <span style={{ color: "#BFFF00" }}>Us</span>
          </h1>
          <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
            Have a question, suggestion, or business inquiry? We&apos;d love to
            hear from you.
          </p>
        </div>

        {/* Divider */}
        <div
          className="mb-10"
          style={{ borderTop: "1px solid var(--color-border)" }}
        />

        {/* Email Block */}
        <div
          className="rounded-2xl p-6 mb-10 flex items-center gap-4"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl"
            style={{ backgroundColor: "rgba(191,255,0,0.12)" }}
          >
            ✉️
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              Email us directly
            </p>
            <a
              href="mailto:contact@brainrotnest.com"
              className="font-bold transition-opacity hover:opacity-80"
              style={{ color: "#BFFF00", fontSize: "1rem" }}
            >
              contact@brainrotnest.com
            </a>
          </div>
        </div>

        {/* Contact Form (Client Component) */}
        <ContactForm />

        {/* Back link */}
        <div className="mt-12">
          <Link
            href="/"
            className="text-sm transition-colors duration-200 hover:opacity-80"
            style={{ color: "#BFFF00" }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
