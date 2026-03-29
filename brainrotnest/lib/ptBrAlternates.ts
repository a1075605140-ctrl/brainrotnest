import type { Metadata } from "next";

const BASE = "https://www.brainrotnest.com";

/** Root hreflang pair for global / pt-br segment layouts. */
export const rootHreflangLanguages: Record<string, string> = {
  en: `${BASE}`,
  "pt-BR": `${BASE}/pt-br`,
};

/** `segment` e.g. "", "characters", "blog/my-post" (no leading slash) */
export function ptBrAlternates(segment: string): NonNullable<Metadata["alternates"]> {
  const enUrl = segment ? `${BASE}/${segment}` : `${BASE}/`;
  const ptUrl = segment ? `${BASE}/pt-br/${segment}` : `${BASE}/pt-br`;
  return {
    canonical: ptUrl,
    languages: {
      en: enUrl,
      "pt-BR": ptUrl,
    },
  };
}
