import Image from "next/image";
import { ArrowRight, Phone, Star, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { HeroVideo } from "./HeroVideo";
import { getContent } from "@/content";
import { IMAGES } from "@/content/images";
import { LOCALE_LABELS, type Locale } from "@/i18n/config";

/** YouTube clip used as the hero background. Replace to swap the video. */
const HERO_YOUTUBE_ID = "UL5YI8KGemg";

/** The multicolour Google "G" mark, used to badge the review rating. */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-label="Google" role="img">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

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

      <HeroVideo youtubeId={HERO_YOUTUBE_ID} />

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
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
          {/* ---- Left: copy ---- */}
          <div>
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
              </div>
            </Reveal>

            <Reveal delay={0.38}>
              <div className="mt-8 flex items-center gap-2.5">
                <GoogleG className="size-5 shrink-0" />
                <span className="flex" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold-500 text-gold-500" />
                  ))}
                </span>
                <span className="text-sm text-navy-200">{copy.reviews}</span>
              </div>
            </Reveal>
          </div>

          {/* ---- Right: animated mark + language phone lines ---- */}
          <div className="flex flex-col items-center gap-8 lg:items-end">
            {/* Animated BT circuit mark (gold). Transparent GIF → `unoptimized`
                keeps it animating; the CSS filter recolours the blue to gold. */}
            <Reveal className="hidden lg:block">
              <Image
                src="/animated.gif"
                alt=""
                aria-hidden
                width={1280}
                height={720}
                unoptimized
                className="w-[22rem] xl:w-[26rem] [filter:grayscale(1)_sepia(1)_saturate(6)_hue-rotate(3deg)_brightness(1.05)_drop-shadow(0_10px_40px_rgba(255,186,8,0.3))]"
              />
            </Reveal>

            {/* Language phone lines */}
            <Reveal delay={0.36} className="w-full lg:w-auto">
              <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
                <ButtonLink href={`tel:${site.phoneHref}`} size="lg">
                  <Phone aria-hidden className="size-4" />
                  {LOCALE_LABELS.en.native}
                </ButtonLink>
                <ButtonLink href={`tel:${site.phoneEsHref}`} size="lg">
                  <Phone aria-hidden className="size-4" />
                  {LOCALE_LABELS.es.native}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

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
