import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

type Project = { title: string; category: string; blurb: string };
type Slide = Project & { image: string };

export function OurWork({
  eyebrow,
  title,
  lead,
  viewAll,
  viewAllHref,
  projects,
  images,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  viewAll: string;
  viewAllHref: string;
  projects: Project[];
  images: string[];
}) {
  const slides: Slide[] = projects.map((p, i) => ({ ...p, image: images[i] }));

  return (
    <Section>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            lead={lead}
            maxWidth="max-w-2xl"
          />
          <Reveal delay={0.2}>
            <ButtonLink href={viewAllHref} variant="outline">
              {viewAll}
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </ButtonLink>
          </Reveal>
        </div>
      </Container>

      {/* Continuous marquee — a single long strip that scrolls slowly and
          seamlessly through every project. Two identical copies of the cards
          sit side by side; the CSS animation shifts the track by -50% so the
          loop is invisible. It pauses on hover. Full-bleed (outside the
          Container) so cards run edge to edge. */}
      <Reveal delay={0.1}>
        <div className="marquee-pause relative mt-14 overflow-hidden">
          {/* Soft fades at both edges */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28"
          />

          <div className="work-marquee flex w-max gap-6 px-3">
            {slides.map((slide) => (
              <WorkCard key={slide.title} slide={slide} viewAll={viewAll} />
            ))}
            {/* Second copy for the seamless loop */}
            {slides.map((slide) => (
              <WorkCard
                key={`dup-${slide.title}`}
                slide={slide}
                viewAll={viewAll}
                aria-hidden
              />
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function WorkCard({
  slide,
  viewAll,
  ...rest
}: {
  slide: Slide;
  viewAll: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="w-[82vw] shrink-0 sm:w-[360px] lg:w-[400px]" {...rest}>
      <article className="group/card relative overflow-hidden rounded-2xl border border-border bg-navy-950 shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:ring-2 hover:ring-gold-500/60">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 360px, 82vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover/card:scale-110"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-transparent"
          />

          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-navy-950/60 px-3 py-1.5 font-[family-name:var(--font-display)] text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-300 backdrop-blur-sm">
            {slide.category}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="text-xl font-semibold text-white sm:text-2xl">
              {slide.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy-100">
              {slide.blurb}
            </p>
            <span className="mt-4 inline-flex translate-y-1 items-center gap-1.5 text-sm font-semibold text-gold-400 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
              {viewAll}
              <ArrowUpRight aria-hidden className="size-4" />
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}
