import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Quote, Star } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { HomeHero } from "@/components/sections/HomeHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { WhereWeWork } from "@/components/sections/WhereWeWork";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { OurWork } from "@/components/sections/OurWork";
import { VideoShowcase } from "@/components/sections/VideoShowcase";

import { getContent, type TrustLogo } from "@/content";
import { getUi } from "@/i18n/ui";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/content/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { pages } = getContent(locale);
  return {
    title: { absolute: pages.home.meta.title },
    description: pages.home.meta.description,
  };
}

/** Featured project images for the "Our Work" slider, in order. */
const WORK_SLIDES = [
  "/work/construction.png",
  "/work/project-management.png",
  "/work/renderings.png",
];

/** Logos for the "Other Places You Can Find Us" section, in order. */
const FIND_US_LOGOS = [
  "/find-us/bark.png",
  "/find-us/thumbtack.png",
  "/find-us/google-reviews.png",
  "/find-us/nextdoor.png",
  "/find-us/houzz.png",
  "/find-us/facebook.png",
];

/** Background image revealed on hover for each home service card, in order. */
const SERVICE_IMAGES = [
  IMAGES.stopWork,
  IMAGES.blueprints,
  IMAGES.structural,
  IMAGES.civil,
  IMAGES.studioTeam,
  IMAGES.residentialHome,
  IMAGES.apartments,
];

/** Image beside each of the 5 process steps, in order. */
const PROCESS_IMAGES = [
  IMAGES.processIntake, // 1. Submission of intake form
  IMAGES.processEstimate, // 2. Project estimate
  IMAGES.processSiteVisit, // 3. Consultation & site visit
  IMAGES.processDesign, // 4. Design development
  IMAGES.processSubmission, // 5. Project submission
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { homeServices, trustLogos, testimonials, reviewPlatforms, pages } =
    getContent(locale);
  const ui = getUi(locale);
  const c = pages.home;
  const href = (p: string) => `/${locale}${p}`;

  return (
    <>
      <HomeHero locale={locale} />

      {/* ---------------- Services (6 cards, dark) ---------------- */}
      <section className="relative isolate overflow-hidden bg-navy-950 pb-14 pt-20 text-white sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-[0.08]" />
        <Container className="relative">
          <div className="text-center">
            <Reveal>
              <h2 className="text-display-lg text-white">{c.services.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
                {c.services.lead}
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {homeServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <RevealItem key={service.title} as="article" className="h-full">
                  <Link
                    href={href(service.href)}
                    className="group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-[transform,border-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:border-gold-500/50"
                  >
                    {/* Photo revealed on hover */}
                    <Image
                      src={SERVICE_IMAGES[i]}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                      className="absolute inset-0 -z-10 object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/85 to-black/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <div className="flex items-center gap-4">
                      <span className="inline-grid size-12 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                        <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                      </span>
                      <h3 className="text-lg font-semibold italic tracking-tight text-gold-400">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-navy-100">
                      {service.body}
                    </p>
                    <ul className="mt-5 grid gap-2">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <Check
                            aria-hidden
                            className="mt-0.5 size-4 shrink-0 text-gold-400"
                            strokeWidth={2.5}
                          />
                          <span className="text-sm text-navy-100">{point}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-sm font-semibold text-gold-400">
                      {ui.common.learnMore}
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

          <Reveal delay={0.15}>
            <div className="mt-12 flex justify-center">
              <ButtonLink href={href("/contact")} size="lg">
                {ui.header.cta}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Where we work (Georgia map) ---------------- */}
      <WhereWeWork copy={pages.services.whereWeWork} />

      {/* ---------------- Process (5 steps) ---------------- */}
      <ProcessTimeline
        eyebrow={c.process.eyebrow}
        title={c.process.title}
        lead={c.process.lead}
        steps={c.process.steps}
        images={PROCESS_IMAGES}
        ctaHref={href("/contact")}
        ctaLabel={ui.header.cta}
      />

      {/* ---------------- Our Work (slider) ---------------- */}
      <OurWork
        eyebrow={c.work.eyebrow}
        title={c.work.title}
        lead={c.work.lead}
        viewAll={c.work.viewAll}
        viewAllHref={href("/services")}
        projects={c.work.projects}
        images={WORK_SLIDES}
      />

      {/* ---------------- Why choose (3 cards on blueprint) ---------------- */}
      <section className="relative isolate overflow-hidden bg-surface-muted py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="absolute inset-0 bg-blueprint opacity-[0.06] dark:opacity-[0.1]"
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-display-lg">{c.why.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                {c.why.lead}
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-16 grid gap-5 lg:grid-cols-3">
            {c.why.cards.map((card) => (
              <RevealItem key={card.title} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/80 p-8 backdrop-blur-sm">
                  <h3 className="text-xl">{card.title}</h3>
                  <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 self-start rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-sm font-medium text-gold-700 dark:text-gold-300">
                    <Check aria-hidden className="size-4" strokeWidth={2.5} />
                    {card.pill}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-14 max-w-2xl text-center text-lg text-muted-foreground">
              {c.why.closing}
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href={href("/contact")} size="lg">
                {ui.header.cta}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Companies Who Trust Us (constellation) ---------------- */}
      <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white sm:py-28 lg:py-32">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-[0.06]" />
        <Container className="relative">
          <Reveal>
            <h2 className="text-center text-display-lg text-white">
              {c.trust.title}
            </h2>
          </Reveal>

          {(() => {
            const half = Math.ceil(trustLogos.length / 2);
            const left = trustLogos.slice(0, half);
            const right = trustLogos.slice(half);
            return (
              <div className="mt-16 flex flex-col items-center gap-10 lg:flex-row lg:justify-between lg:gap-8">
                {/* Left cluster */}
                <RevealGroup
                  as="ul"
                  stagger={0.05}
                  className="order-2 grid grid-cols-3 gap-5 sm:gap-6 lg:order-1"
                >
                  {left.map((logo) => (
                    <RevealItem as="li" key={logo.src}>
                      <LogoBadge logo={logo} />
                    </RevealItem>
                  ))}
                </RevealGroup>

                {/* Center TrustDale seal */}
                <Reveal className="order-1 shrink-0 lg:order-2 lg:mx-4">
                  <div className="relative size-56 sm:size-72 lg:size-80">
                    <Image
                      src="/trustdale-seal.png"
                      alt="TrustDale Certified — Investigated, Certified, Guaranteed"
                      fill
                      sizes="320px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </Reveal>

                {/* Right cluster */}
                <RevealGroup
                  as="ul"
                  stagger={0.05}
                  className="order-3 grid grid-cols-3 gap-5 sm:gap-6"
                >
                  {right.map((logo) => (
                    <RevealItem as="li" key={logo.src}>
                      <LogoBadge logo={logo} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            );
          })()}
        </Container>
      </section>

      {/* ---------------- Video showcase ---------------- */}
      <VideoShowcase
        eyebrow={c.video.eyebrow}
        title={c.video.title}
        lead={c.video.lead}
        youtubeId={c.video.youtubeId}
        playLabel={c.video.playLabel}
      />

      {/* ---------------- Reviews (dark) ---------------- */}
      <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white sm:py-28 lg:py-32">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-[0.06]" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow align="center" className="text-navy-200">
                {c.testimonials.eyebrow}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-display-lg text-white">
                {c.testimonials.title}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-lg leading-relaxed text-navy-100">
                {c.testimonials.lead}
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
            {testimonials.map((t) => (
              <RevealItem key={t.context} className="h-full">
                <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                  <span className="flex" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-gold-500 text-gold-500" />
                    ))}
                  </span>
                  <Quote
                    aria-hidden
                    className="mt-5 size-7 text-gold-500/50"
                    strokeWidth={1.5}
                  />
                  <blockquote className="mt-3 flex-1">
                    <p className="leading-relaxed text-white">“{t.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-6 text-sm font-semibold text-navy-200">
                    {t.context}
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <span className="text-xs uppercase tracking-[0.16em] text-navy-300">
                {c.testimonials.platformsLabel}
              </span>
              {reviewPlatforms.map((p) => (
                <span
                  key={p}
                  className="font-[family-name:var(--font-display)] font-semibold text-navy-100"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Other Places You Can Find Us ---------------- */}
      <section className="relative isolate overflow-hidden bg-navy-950 pb-20 text-white sm:pb-28 lg:pb-32">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-[0.06]" />
        <Container className="relative">
          <Reveal>
            <h2 className="text-center text-display-md text-white">
              {c.findUs.title}
            </h2>
          </Reveal>
          <RevealGroup
            as="ul"
            stagger={0.06}
            className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-3"
          >
            {c.findUs.platforms.map((name, i) => (
              <RevealItem as="li" key={name}>
                <div className="grid h-28 place-items-center rounded-2xl bg-white px-6 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-1 sm:h-32">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={FIND_US_LOGOS[i]}
                    alt={name}
                    loading="lazy"
                    className="max-h-16 w-auto max-w-[80%] object-contain sm:max-h-20"
                  />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CtaSection locale={locale} />
    </>
  );
}

/** A partner logo in a white circular badge. */
function LogoBadge({ logo }: { logo: TrustLogo }) {
  return (
    <div
      title={logo.name}
      className="relative grid size-24 place-items-center overflow-hidden rounded-full bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 sm:size-28"
    >
      <Image
        src={logo.src}
        alt={logo.name}
        fill
        sizes="112px"
        className="object-contain p-4"
      />
    </div>
  );
}
