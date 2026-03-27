import type { Metadata } from "next";
import { rootHreflangLanguages } from "@/lib/ptBrAlternates";

export const metadata: Metadata = {
  alternates: {
    languages: rootHreflangLanguages,
  },
};

export default function PtBrLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
