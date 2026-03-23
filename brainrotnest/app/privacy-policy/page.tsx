import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read BrainrotNest's Privacy Policy to understand how we collect, use, and protect your information.",
};

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect anonymous usage data through cookies and analytics tools. This includes pages visited, time spent on site, device type, and general location (country/region). We do not collect personally identifiable information unless you voluntarily provide it (e.g., via a contact form).",
  },
  {
    title: "How We Use Information",
    content:
      "The information we collect is used to improve user experience, understand how visitors interact with the site, and display relevant advertisements. We do not sell your personal data to third parties.",
  },
  {
    title: "Third-Party Services",
    content:
      "BrainrotNest uses third-party services including Google Analytics for traffic analysis, and advertising networks such as Google AdSense and Adsterra to serve ads. These services may collect data independently according to their own privacy policies.",
  },
  {
    title: "Cookies",
    content:
      "This site uses cookies to enhance your browsing experience and to enable analytics and advertising features. You can disable cookies at any time through your browser settings. Note that disabling cookies may affect certain site functionality.",
  },
  {
    title: "Children's Privacy",
    content:
      "BrainrotNest is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us so we can delete it.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated revision date. Continued use of the site after changes constitutes acceptance of the new policy.",
  },
  {
    title: "Contact",
    content:
      "If you have any questions or concerns about this Privacy Policy, please reach out to us via our Contact page.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka), cursive",
              color: "var(--color-text)",
            }}
          >
            Privacy <span style={{ color: "#BFFF00" }}>Policy</span>
          </h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Last updated: March 2026
          </p>
        </div>

        {/* Divider */}
        <div
          className="mb-10"
          style={{ borderTop: "1px solid var(--color-border)" }}
        />

        {/* Sections */}
        <div className="flex flex-col gap-8">
          {sections.map((section, index) => (
            <section key={index}>
              <h2
                className="text-xl font-bold mb-3"
                style={{
                  fontFamily: "var(--font-fredoka), cursive",
                  color: "var(--color-text)",
                }}
              >
                {section.title}
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className="mt-12 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div>
            <p
              className="font-semibold mb-1"
              style={{ color: "var(--color-text)" }}
            >
              Have questions about this policy?
            </p>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              We&apos;re happy to help clarify anything.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity duration-200 hover:opacity-80"
            style={{
              backgroundColor: "#BFFF00",
              color: "#0A0A0F",
            }}
          >
            Contact Us
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-8">
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
