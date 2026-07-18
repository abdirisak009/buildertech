import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";
import { BLOG_SECTIONS, POSTS } from "@/content/blog";

const CATEGORY_SLUG: Record<string, string> = {
  "IRC Code Updates": "irc-code-updates",
  "Design Trends": "design-trends",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => new URL(path, SITE.url).toString();

  const staticPaths = [
    { path: "/", priority: 1 },
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

  return [
    ...staticPaths.map((p) => ({
      url: url(p.path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...SERVICES.map((s) => ({
      url: url(`/services/${s.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...BLOG_SECTIONS.map((s) => ({
      url: url(`/blog/${s.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...POSTS.map((p) => ({
      url: url(`/blog/${CATEGORY_SLUG[p.category]}/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
