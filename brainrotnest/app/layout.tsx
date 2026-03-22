import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const fredokaOne = Fredoka({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-fredoka",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://brainrotnest.com'),
  title: {
    default: 'BrainrotNest — Italian Brainrot Wiki, Quiz & Games',
    template: '%s | BrainrotNest'
  },
  description: 'The ultimate Italian Brainrot hub. Take quizzes, explore characters, play games. Bombardiro Crocodilo, Tung Tung Sahur and all your favorite brainrot characters.',
  keywords: ['italian brainrot', 'brainrot quiz', 'italian brainrot characters', 'brainrot games', 'bombardiro crocodilo', 'tung tung sahur'],
  authors: [{ name: 'BrainrotNest' }],
  creator: 'BrainrotNest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brainrotnest.com',
    siteName: 'BrainrotNest',
    title: 'BrainrotNest — Italian Brainrot Wiki, Quiz & Games',
    description: 'The ultimate Italian Brainrot hub. Quizzes, characters, games.',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'BrainrotNest — Italian Brainrot Wiki'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrainrotNest — Italian Brainrot Wiki, Quiz & Games',
    description: 'The ultimate Italian Brainrot hub.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'T8qJj2youiP9Iw8txhcSzKegVNE9oXgbpDMJMrv45iA'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${fredokaOne.variable} ${nunito.variable}`}
    >
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text)",
          fontFamily: "var(--font-nunito), sans-serif",
        }}
      >
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
