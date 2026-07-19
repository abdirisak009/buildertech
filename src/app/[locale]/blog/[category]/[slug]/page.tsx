import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

import { getContent } from "@/content";
import { formatDate } from "@/lib/date";
import { getUi } from "@/i18n/ui";
import { isLocale, LOCALES } from "@/i18n/config";
/* Slugs are byte-identical across locales — enumerate them from English. */
import { BLOG_SECTIONS, POSTS } from "@/content/en/blog";

export function generateStaticParams() {
  const slugByCategory = new Map(BLOG_SECTIONS.map((s) => [s.category, s.slug]));
  return LOCALES.flatMap((locale) =>
    POSTS.map((post) => ({
      locale,
      category: slugByCategory.get(post.category) ?? "",
      slug: post.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getContent(locale).getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  if (!isLocale(locale)) notFound();

  const { blogSections, posts, getPost, pages } = getContent(locale);
  const post = getPost(slug);
  const section = blogSections.find((s) => s.slug === category);
  if (!post || !section || section.category !== post.category) notFound();

  const c = pages.blog;
  const ui = getUi(locale);

  const more = posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {/* ---------------- Header ---------------- */}
      <header className="relative isolate overflow-hidden bg-navy-950 text-white">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
        <div
          aria-hidden
          className="absolute -right-24 top-0 h-[36rem] w-[36rem] rounded-full bg-gold-500/12 blur-[120px]"
        />

        <Container className="relative pb-20 pt-32 sm:pb-24 sm:pt-40">
          <Reveal>
            <nav aria-label={ui.a11y.breadcrumb}>
              <ol className="flex flex-wrap items-center gap-2 text-xs text-navy-200">
                <li>
                  <Link
                    href={`/${locale}`}
                    className="transition-colors hover:text-gold-400"
                  >
                    {ui.breadcrumb.home}
                  </Link>
                </li>
                <ChevronRight aria-hidden className="size-3.5 text-navy-300" />
                <li>
                  <Link
                    href={`/${locale}/blog`}
                    className="transition-colors hover:text-gold-400"
                  >
                    {c.post.breadcrumbBlog}
                  </Link>
                </li>
                <ChevronRight aria-hidden className="size-3.5 text-navy-300" />
                <li>
                  <Link
                    href={`/${locale}/blog/${category}`}
                    className="transition-colors hover:text-gold-400"
                  >
                    {section.title}
                  </Link>
                </li>
                <ChevronRight aria-hidden className="size-3.5 text-navy-300" />
                <li aria-current="page" className="text-gold-400">
                  {post.title}
                </li>
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.2em] text-navy-200">
              <span className="text-gold-400">{section.title}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <h1 className="mt-6 max-w-[22ch] text-display-lg">{post.title}</h1>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-navy-100">
              {post.excerpt}
            </p>
          </Reveal>
        </Container>
      </header>

      {/* ---------------- Article body ---------------- */}
      <Section>
        <Container>
          <article className="max-w-3xl">
            {post.body.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 40)} delay={i === 0 ? 0 : 0.04}>
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground first:mt-0">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal>
              <Link
                href={`/${locale}/blog/${category}`}
                className="group mt-14 inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-sm font-semibold text-navy-700 dark:text-gold-400"
              >
                <ArrowLeft
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
                />
                {c.post.backToCategory(section.title)}
              </Link>
            </Reveal>
          </article>
        </Container>
      </Section>

      {/* ---------------- More from this category ---------------- */}
      {more.length > 0 && (
        <Section tone="muted">
          <Container>
            <Reveal>
              <h2 className="text-display-md">
                {c.post.moreFrom(section.title)}
              </h2>
            </Reveal>

            <RevealGroup
              as="ul"
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {more.map((other) => (
                <RevealItem as="li" key={other.slug} className="h-full">
                  <Link
                    href={`/${locale}/blog/${category}/${other.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-8 transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_24px_60px_-28px_rgba(10,36,114,0.45)]"
                  >
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.14em] text-subtle-foreground">
                      <time dateTime={other.date}>
                        {formatDate(other.date, locale)}
                      </time>
                      <span aria-hidden>·</span>
                      <span>{other.readingTime}</span>
                    </p>
                    <h3 className="mt-5 text-lg">{other.title}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                      {other.excerpt}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-sm font-semibold text-navy-700 dark:text-gold-400">
                      {ui.common.readArticle}
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      <CtaSection locale={locale} />
    </>
  );
}
