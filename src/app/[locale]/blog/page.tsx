import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

import { getContent } from "@/content";
import { IMAGES } from "@/content/images";
import { formatDate } from "@/lib/date";
import { getUi } from "@/i18n/ui";
import { isLocale, LOCALES } from "@/i18n/config";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { metadata } = getContent(locale).pages.blog;
  return { title: metadata.title, description: metadata.description };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { blogSections, posts, pages } = getContent(locale);
  const c = pages.blog;
  const ui = getUi(locale);

  /** Slug lookup keyed on the untranslated category key. */
  const categorySlug = new Map(blogSections.map((s) => [s.category, s.slug]));
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={c.hero.breadcrumb}
        eyebrow={c.hero.eyebrow}
        title={
          <>
            {c.hero.titleBefore}{" "}
            <span className="text-gold-500">{c.hero.titleAccent}</span>
            {c.hero.titleAfter}
          </>
        }
        lead={c.hero.lead}
        image={IMAGES.heroBlog}
        imageAlt={c.hero.imageAlt}
      />

      {/* ---------------- Sections ---------------- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow={c.sections.eyebrow}
            title={c.sections.title}
          />

          <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-2">
            {blogSections.map((section) => {
              const count = posts.filter(
                (p) => p.category === section.category,
              ).length;
              return (
                <RevealItem key={section.slug} as="article" className="h-full">
                  <Link
                    href={`/${locale}/blog/${section.slug}`}
                    className="group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-8 text-white transition-[transform,box-shadow] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_28px_70px_-30px_rgba(10,36,114,0.7)] sm:p-10"
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-blueprint opacity-70"
                    />
                    <div
                      aria-hidden
                      className="absolute -right-20 -top-24 size-72 rounded-full bg-gold-500/15 blur-[110px]"
                    />

                    <div className="relative">
                      <p className="tabular text-xs uppercase tracking-[0.2em] text-navy-200">
                        {count} {c.sections.articleNoun(count)}
                      </p>
                      <h3 className="mt-6 text-display-md">{section.title}</h3>
                      <p className="mt-5 max-w-md leading-relaxed text-navy-100">
                        {section.lead}
                      </p>
                    </div>

                    <span className="relative mt-10 inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-sm font-semibold text-gold-400">
                      {c.sections.read(section.title)}
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------- Latest posts ---------------- */}
      <Section tone="muted">
        <Container>
          <SectionHeader eyebrow={c.latest.eyebrow} title={c.latest.title} />

          <RevealGroup
            as="ul"
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {latest.map((post) => {
              const section = blogSections.find(
                (s) => s.category === post.category,
              );
              return (
                <RevealItem as="li" key={post.slug} className="h-full">
                  <Link
                    href={`/${locale}/blog/${categorySlug.get(post.category)}/${post.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-8 transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_24px_60px_-28px_rgba(10,36,114,0.45)]"
                  >
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.14em] text-subtle-foreground">
                      <span className="text-gold-700 dark:text-gold-400">
                        {section?.title ?? post.category}
                      </span>
                      <span aria-hidden>·</span>
                      <time dateTime={post.date}>
                        {formatDate(post.date, locale)}
                      </time>
                    </p>
                    <h3 className="mt-5 text-lg">{post.title}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                      {post.excerpt}
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
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}
