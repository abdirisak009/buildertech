import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

import { BLOG_SECTIONS, POSTS, formatDate } from "@/content/blog";
import { IMAGES } from "@/content/images";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "IRC code updates and design trends from Builders Tech — what changed in the residential code, and what Atlanta clients are actually asking us to draw.",
};

const CATEGORY_SLUG = new Map(BLOG_SECTIONS.map((s) => [s.title, s.slug]));

export default function BlogPage() {
  const latest = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero
        breadcrumb="Blog"
        eyebrow="Writing"
        title={
          <>
            Notes from the{" "}
            <span className="text-gold-500">drawing board</span>.
          </>
        }
        lead="Two things we get asked about constantly: what the code now requires, and what everyone else is building. We write about both in plain language."
        image={IMAGES.heroBlog}
        imageAlt="An engineer reviewing a physical model and drawings"
      />

      {/* ---------------- Sections ---------------- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Sections"
            title="Two places to start."
          />

          <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-2">
            {BLOG_SECTIONS.map((section) => {
              const count = POSTS.filter(
                (p) => p.category === section.title,
              ).length;
              return (
                <RevealItem key={section.slug} as="article" className="h-full">
                  <Link
                    href={`/blog/${section.slug}`}
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
                        {count} {count === 1 ? "article" : "articles"}
                      </p>
                      <h3 className="mt-6 text-display-md">{section.title}</h3>
                      <p className="mt-5 max-w-md leading-relaxed text-navy-100">
                        {section.lead}
                      </p>
                    </div>

                    <span className="relative mt-10 inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-sm font-semibold text-gold-400">
                      Read {section.title}
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
          <SectionHeader
            eyebrow="Latest posts"
            title="Everything we have published."
          />

          <RevealGroup
            as="ul"
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {latest.map((post) => (
              <RevealItem as="li" key={post.slug} className="h-full">
                <Link
                  href={`/blog/${CATEGORY_SLUG.get(post.category)}/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-8 transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_24px_60px_-28px_rgba(10,36,114,0.45)]"
                >
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.14em] text-subtle-foreground">
                    <span className="text-gold-700 dark:text-gold-400">
                      {post.category}
                    </span>
                    <span aria-hidden>·</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </p>
                  <h3 className="mt-5 text-lg">{post.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                    {post.excerpt}
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

      <CtaSection />
    </>
  );
}
