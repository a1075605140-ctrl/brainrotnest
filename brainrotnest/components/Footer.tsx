import Link from "next/link";

const mainLinks = [
  { href: "/quiz", label: "Quiz" },
  { href: "/characters", label: "Characters" },
  { href: "/games", label: "Games" },
  { href: "/blog", label: "Blog" },
];

const legalLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer
      className="w-full py-8 mt-auto"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
        {/* Main nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors duration-200 hover:text-white"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Legal links */}
        <nav className="flex flex-wrap items-center justify-center gap-4">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs transition-colors duration-200 hover:text-white"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p
          className="text-sm"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          © {new Date().getFullYear()} BrainrotNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
