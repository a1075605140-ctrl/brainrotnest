import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blogData";
import { getAllCharacterSlugs } from "@/lib/charactersData";
import { getAllGameSlugs } from "@/lib/gamesData";
import { getAllQuizSlugs } from "@/lib/quizData";

const BASE_URL = "https://www.brainrotnest.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/characters`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/games`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
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
  }));

  const characterRoutes: MetadataRoute.Sitemap = getAllCharacterSlugs().map((slug) => ({
    url: `${BASE_URL}/characters/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const gameRoutes: MetadataRoute.Sitemap = getAllGameSlugs().map((slug) => ({
    url: `${BASE_URL}/games/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const englishEntries: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...quizRoutes,
    ...characterRoutes,
    ...gameRoutes,
    ...blogRoutes,
  ];

  const ptBrEntries: MetadataRoute.Sitemap = englishEntries.map((entry) => {
    const pathname = new URL(entry.url).pathname;
    const normalized =
      pathname.length > 1 && pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;
    const ptPath = normalized === "/" ? "/pt-br" : `/pt-br${normalized}`;
    return {
      url: `${BASE_URL}${ptPath}`,
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    };
  });

  return [...englishEntries, ...ptBrEntries];
}
