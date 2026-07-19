import type { MetadataRoute } from "next";
import { SITE } from "@/content/en/site";
import { SERVICES } from "@/content/en/services";
import { BLOG_SECTIONS, POSTS } from "@/content/en/blog";
import { LOCALES } from "@/i18n/config";

const STATIC_PATHS: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/how-it-works", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  { path: "/products", priority: 0.7 },
  { path: "/products/stock-plans", priority: 0.8 },
  { path: "/blog", priority: 0.7 },
  { path: "/careers", priority: 0.6 },
  { path: "/careers/open-positions", priority: 0.6 },
  { path: "/careers/internships", priority: 0.5 },
  { path: "/resources", priority: 0.6 },
  { path: "/faq", priority: 0.7 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.9 },
  { path: "/privacy-policy", priority: 0.2 },
  { path: "/terms-of-use", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => new URL(path, SITE.url).toString();

  /** Every URL advertises its counterpart in the other language. */
  const alternates = (path: string) => ({
    languages: Object.fromEntries(
      LOCALES.map((l) => [l, url(`/${l}${path}`)]),
    ),
  });

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const { path, priority } of STATIC_PATHS) {
      entries.push({
        url: url(`/${locale}${path}`),
        lastModified,
        changeFrequency: "monthly",
        priority,
        alternates: alternates(path),
      });
    }

    for (const service of SERVICES) {
      const path = `/services/${service.slug}`;
      entries.push({
        url: url(`/${locale}${path}`),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: alternates(path),
      });
    }

    for (const section of BLOG_SECTIONS) {
      const path = `/blog/${section.slug}`;
      entries.push({
        url: url(`/${locale}${path}`),
        lastModified,
        changeFrequency: "weekly",
        priority: 0.6,
        alternates: alternates(path),
      });
    }

    for (const post of POSTS) {
      const section = BLOG_SECTIONS.find((s) => s.category === post.category);
      if (!section) continue;
      const path = `/blog/${section.slug}/${post.slug}`;
      entries.push({
        url: url(`/${locale}${path}`),
        lastModified: new Date(post.date),
        changeFrequency: "yearly",
        priority: 0.5,
        alternates: alternates(path),
      });
    }
  }

  return entries;
}
