import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

import {
  BLOG_SECTIONS,
  POSTS,
  getPost,
  formatDate,
  type BlogCategory,
} from "@/content/blog";

const SLUG_BY_CATEGORY: Record<BlogCategory, string> = {
  "IRC Code Updates": "irc-code-updates",
  "Design Trends": "design-trends",
};

export function generateStaticParams() {
  return POSTS.map((post) => ({
    category: SLUG_BY_CATEGORY[post.category],
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = getPost(slug);
  if (!post || SLUG_BY_CATEGORY[post.category] !== category) notFound();

  const section = BLOG_SECTIONS.find((s) => s.slug === category);
  const more = POSTS.filter(
    (p) => p.category === post.category && p.slug !== post.slug,
  ).sort((a, b) => b.date.localeCompare(a.date));

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
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-navy-200">
                <li>
                  <Link href="/" className="transition-colors hover:text-gold-400">
                    Home
                  </Link>
                </li>
                <ChevronRight aria-hidden className="size-3.5 text-navy-300" />
                <li>
                  <Link
                    href="/blog"
                    className="transition-colors hover:text-gold-400"
                  >
                    Blog
                  </Link>
                </li>
                <ChevronRight aria-hidden className="size-3.5 text-navy-300" />
                <li>
                  <Link
                    href={`/blog/${category}`}
                    className="transition-colors hover:text-gold-400"
                  >
                    {post.category}
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
              <span className="text-gold-400">{post.category}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
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
                href={`/blog/${category}`}
                className="group mt-14 inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-sm font-semibold text-navy-700 dark:text-gold-400"
              >
                <ArrowLeft
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
                />
                All {section?.title ?? post.category}
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
              <h2 className="text-display-md">More from {post.category}.</h2>
            </Reveal>

            <RevealGroup
              as="ul"
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {more.map((other) => (
                <RevealItem as="li" key={other.slug} className="h-full">
                  <Link
                    href={`/blog/${category}/${other.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-8 transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_24px_60px_-28px_rgba(10,36,114,0.45)]"
                  >
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.14em] text-subtle-foreground">
                      <time dateTime={other.date}>{formatDate(other.date)}</time>
                      <span aria-hidden>·</span>
                      <span>{other.readingTime}</span>
                    </p>
                    <h3 className="mt-5 text-lg">{other.title}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                      {other.excerpt}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-sm font-semibold text-navy-700 dark:text-gold-400">
                      Read article
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

      <CtaSection />
    </>
  );
}
