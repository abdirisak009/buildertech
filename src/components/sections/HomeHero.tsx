import Image from "next/image";
import { ArrowRight, Phone, Star, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { getContent } from "@/content";
import { IMAGES } from "@/content/images";
import type { Locale } from "@/i18n/config";

export function HomeHero({ locale }: { locale: Locale }) {
  const { site, stats, pages } = getContent(locale);
  const copy = pages.home.hero;

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy-950 text-white">
      {/* Poster image sits underneath as the fallback: it shows before the
          video loads, if the video fails, and for reduced-motion users (the
          video is hidden for them via motion-reduce:hidden). */}
      <Image
        src={IMAGES.interiorFinished}
        alt={copy.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        poster={IMAGES.interiorFinished}
        className="absolute inset-0 size-full object-cover opacity-80 motion-reduce:hidden"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Lighter scrim than other sections — the footage should read clearly,
          only darkened enough to keep the headline legible. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/35"
      />
      <div aria-hidden className="absolute inset-0 bg-blueprint opacity-25" />
      <div
        aria-hidden
        className="absolute -right-40 top-10 h-[42rem] w-[42rem] rounded-full bg-gold-500/14 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
      />

      <Container className="relative pb-16 pt-36 sm:pb-20 sm:pt-44">
        <Reveal>
          <h1 className="max-w-[16ch] text-display-xl">
            {copy.titleBefore}
            <span className="text-gold-500">{copy.titleAccent}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl">
            {copy.subhead}
          </p>
        </Reveal>

        {/* Architectural → Structural → Civil */}
        <Reveal delay={0.22}>
          <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-2 font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight">
            {copy.flow.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className={i === 1 ? "text-gold-500" : "text-white"}>
                  {step}
                </span>
                {i < copy.flow.length - 1 && (
                  <ChevronRight aria-hidden className="size-4 text-navy-300" />
                )}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`/${locale}/contact`} size="lg">
              {site.cta}
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </ButtonLink>
            <ButtonLink
              href={`tel:${site.phoneHref}`}
              variant="outline"
              size="lg"
              className="text-white"
            >
              <Phone aria-hidden className="size-4" />
              {site.phone}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.38}>
          <div className="mt-8 flex items-center gap-3">
            <span className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-gold-500 text-gold-500" />
              ))}
            </span>
            <span className="text-sm text-navy-200">{copy.reviews}</span>
          </div>
        </Reveal>

        <RevealGroup
          as="div"
          delay={0.5}
          stagger={0.1}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-9 border-t border-white/15 pt-10 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <dl>
                <dt className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-gold-500 sm:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dt>
                <dd className="mt-2 text-xs uppercase tracking-[0.14em] text-navy-200">
                  {stat.label}
                </dd>
              </dl>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
