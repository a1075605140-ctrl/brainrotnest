import Link from "next/link";

const footerLinks = [
  { href: "/quiz", label: "Quiz" },
  { href: "/characters", label: "Characters" },
  { href: "/games", label: "Games" },
  { href: "/blog", label: "Blog" },
];

export default function Footer() {
  return (
    <footer
      className="w-full py-8 mt-auto"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-sm"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          © {new Date().getFullYear()} BrainrotNest. All rights reserved.
        </p>

        <nav className="flex items-center gap-6">
          {footerLinks.map((link) => (
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
      </div>
    </footer>
  );
}
