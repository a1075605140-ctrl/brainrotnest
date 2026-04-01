import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blogData";
import { getAllCharacterSlugs } from "@/lib/charactersData";
import { getAllGameSlugs } from "@/lib/gamesData";
import { getAllQuizSlugs } from "@/lib/quizData";

const BASE_URL = "https://www.brainrotnest.com";

/** Build reciprocal hreflang alternates for a paired en/pt-br URL. */
function hreflangPair(enUrl: string, ptUrl: string) {
  return {
    alternates: {
      languages: {
        en: enUrl,
        "pt-BR": ptUrl,
        "x-default": enUrl,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Pages that have a pt-br counterpart
  const staticRoutesWithPtBr: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      ...hreflangPair(BASE_URL, `${BASE_URL}/pt-br`),
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      ...hreflangPair(`${BASE_URL}/quiz`, `${BASE_URL}/pt-br/quiz`),
    },
    {
      url: `${BASE_URL}/characters`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      ...hreflangPair(`${BASE_URL}/characters`, `${BASE_URL}/pt-br/characters`),
    },
    {
      url: `${BASE_URL}/games`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      ...hreflangPair(`${BASE_URL}/games`, `${BASE_URL}/pt-br/games`),
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      ...hreflangPair(`${BASE_URL}/blog`, `${BASE_URL}/pt-br/blog`),
    },
  ];

  // Pages with no pt-br version (no hreflang needed)
  const staticRoutesEnOnly: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/italian-brainrot-name-generator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/brainrot-translator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const quizRoutes: MetadataRoute.Sitemap = getAllQuizSlugs().map((slug) => ({
    url: `${BASE_URL}/quiz/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    ...hreflangPair(`${BASE_URL}/quiz/${slug}`, `${BASE_URL}/pt-br/quiz/${slug}`),
  }));

  const characterRoutes: MetadataRoute.Sitemap = getAllCharacterSlugs().map((slug) => ({
    url: `${BASE_URL}/characters/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    ...hreflangPair(`${BASE_URL}/characters/${slug}`, `${BASE_URL}/pt-br/characters/${slug}`),
  }));

  const gameRoutes: MetadataRoute.Sitemap = getAllGameSlugs().map((slug) => ({
    url: `${BASE_URL}/games/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
    ...hreflangPair(`${BASE_URL}/games/${slug}`, `${BASE_URL}/pt-br/games/${slug}`),
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
    ...hreflangPair(`${BASE_URL}/blog/${slug}`, `${BASE_URL}/pt-br/blog/${slug}`),
  }));

  const englishEntries: MetadataRoute.Sitemap = [
    ...staticRoutesWithPtBr,
    ...staticRoutesEnOnly,
    ...quizRoutes,
    ...characterRoutes,
    ...gameRoutes,
    ...blogRoutes,
  ];

  // pt-br mirror entries with reciprocal hreflang
  const ptBrEntries: MetadataRoute.Sitemap = [
    ...staticRoutesWithPtBr,
    ...quizRoutes,
    ...characterRoutes,
    ...gameRoutes,
    ...blogRoutes,
  ].map((entry) => {
    const pathname = new URL(entry.url).pathname;
    const normalized =
      pathname.length > 1 && pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;
    const ptPath = normalized === "/" ? "/pt-br" : `/pt-br${normalized}`;
    const ptUrl = `${BASE_URL}${ptPath}`;
    const enUrl = entry.url;
    return {
      url: ptUrl,
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      ...hreflangPair(enUrl, ptUrl),
    };
  });

  return [...englishEntries, ...ptBrEntries];
}
