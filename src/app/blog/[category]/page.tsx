import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

import {
  BLOG_SECTIONS,
  postsByCategory,
  formatDate,
  type BlogCategory,
} from "@/content/blog";
import { IMAGES } from "@/content/images";

/** postsByCategory() takes the category *title*, not the URL slug. */
const CATEGORY_BY_SLUG: Record<string, BlogCategory> = {
  "irc-code-updates": "IRC Code Updates",
  "design-trends": "Design Trends",
};

const HERO_IMAGE: Record<string, string> = {
  "irc-code-updates": IMAGES.heroFaq,
  "design-trends": IMAGES.heroBlog,
};

export function generateStaticParams() {
  return BLOG_SECTIONS.map((section) => ({ category: section.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const section = BLOG_SECTIONS.find((s) => s.slug === category);
  if (!section) return {};
  return {
    title: section.title,
    description: section.lead,
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const section = BLOG_SECTIONS.find((s) => s.slug === category);
  const title = CATEGORY_BY_SLUG[category];
  if (!section || !title) notFound();

  const posts = postsByCategory(title);

  return (
    <>
      <PageHero
        breadcrumb={section.title}
        eyebrow="Blog"
        title={section.title}
        lead={section.lead}
        image={HERO_IMAGE[category] ?? IMAGES.heroBlog}
        imageAlt={`${section.title} — Builders Tech`}
      />

      <Section>
        <Container>
          <p className="tabular text-xs uppercase tracking-[0.16em] text-subtle-foreground">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </p>

          <RevealGroup as="ul" className="mt-10 border-t border-border">
            {posts.map((post) => (
              <RevealItem as="li" key={post.slug} className="border-b border-border">
                <Link
                  href={`/blog/${category}/${post.slug}`}
                  className="group grid gap-6 py-10 transition-colors duration-300 lg:grid-cols-[14rem_1fr] lg:gap-12"
                >
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.14em] text-subtle-foreground lg:flex-col lg:items-start">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden className="lg:hidden">
                      ·
                    </span>
                    <span className="lg:mt-2">{post.readingTime}</span>
                  </p>

                  <div>
                    <h2 className="text-display-md transition-colors duration-300 group-hover:text-navy-700 dark:group-hover:text-gold-400">
                      {post.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-sm font-semibold text-navy-700 dark:text-gold-400">
                      Read article
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
