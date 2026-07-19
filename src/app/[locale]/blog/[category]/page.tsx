import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

import { getContent } from "@/content";
import { IMAGES } from "@/content/images";
import { formatDate } from "@/lib/date";
import { getUi } from "@/i18n/ui";
import { isLocale, LOCALES } from "@/i18n/config";
/* Slugs are byte-identical across locales — enumerate them from English. */
import { BLOG_SECTIONS } from "@/content/en/blog";

const HERO_IMAGE: Record<string, string> = {
  "irc-code-updates": IMAGES.heroFaq,
  "design-trends": IMAGES.heroBlog,
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    BLOG_SECTIONS.map((section) => ({ locale, category: section.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isLocale(locale)) return {};
  const section = getContent(locale).blogSections.find(
    (s) => s.slug === category,
  );
  if (!section) return {};
  return { title: section.title, description: section.lead };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (!isLocale(locale)) notFound();

  const { blogSections, postsByCategory, pages } = getContent(locale);
  const section = blogSections.find((s) => s.slug === category);
  if (!section) notFound();

  const c = pages.blog;
  const ui = getUi(locale);
  const posts = postsByCategory(section.category);

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={section.title}
        eyebrow={c.category.eyebrow}
        title={section.title}
        lead={section.lead}
        image={HERO_IMAGE[category] ?? IMAGES.heroBlog}
        imageAlt={`${section.title} — Builders Tech`}
      />

      <Section>
        <Container>
          <p className="tabular text-xs uppercase tracking-[0.16em] text-subtle-foreground">
            {posts.length} {c.category.articleNoun(posts.length)}
          </p>

          <RevealGroup as="ul" className="mt-10 border-t border-border">
            {posts.map((post) => (
              <RevealItem as="li" key={post.slug} className="border-b border-border">
                <Link
                  href={`/${locale}/blog/${category}/${post.slug}`}
                  className="group grid gap-6 py-10 transition-colors duration-300 lg:grid-cols-[14rem_1fr] lg:gap-12"
                >
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.14em] text-subtle-foreground lg:flex-col lg:items-start">
                    <time dateTime={post.date}>
                      {formatDate(post.date, locale)}
                    </time>
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
                      {ui.common.readArticle}
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

      <CtaSection locale={locale} />
    </>
  );
}
