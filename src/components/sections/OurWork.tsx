"use client";

import { useEffect, useState, type TransitionEvent } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

type Project = { title: string; category: string; blurb: string };
type Slide = Project & { image: string };

const AUTOPLAY_MS = 3000;

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
  const reduced = useReducedMotion();

  const slides: Slide[] = projects.map((p, i) => ({ ...p, image: images[i] }));
  const n = slides.length;

  // Cards visible per view (responsive).
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () => setPerView(lg.matches ? 3 : sm.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);

  const view = Math.min(perView, n);

  // Clone `view` slides on both ends so the track can loop seamlessly.
  const extended: Slide[] = [
    ...slides.slice(n - view),
    ...slides,
    ...slides.slice(0, view),
  ];

  const [pos, setPos] = useState(view);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  // Reset when the responsive view count changes.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setAnimate(false);
      setPos(view);
    });
    return () => cancelAnimationFrame(raf);
  }, [view]);

  // Re-enable the transition after an instant (no-animation) jump.
  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  // Auto-advance every 3 seconds (paused on hover / reduced motion).
  useEffect(() => {
    if (paused || reduced || n <= 1) return;
    const id = setInterval(() => setPos((p) => p + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduced, n]);

  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "transform") return;
    if (pos >= view + n) {
      setAnimate(false);
      setPos(pos - n);
    } else if (pos < view) {
      setAnimate(false);
      setPos(pos + n);
    }
  };

  const cardPct = 100 / view;
  const realIndex = ((pos - view) % n + n) % n;

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

        <Reveal delay={0.1}>
          <div
            className="relative mt-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="overflow-hidden">
              <div
                className="flex"
                style={{
                  transform: `translateX(-${pos * cardPct}%)`,
                  transition: animate
                    ? "transform 750ms cubic-bezier(0.22,0.61,0.36,1)"
                    : "none",
                }}
                onTransitionEnd={onTransitionEnd}
              >
                {extended.map((slide, i) => (
                  <div
                    key={i}
                    className="shrink-0 px-3"
                    style={{ flex: `0 0 ${cardPct}%` }}
                  >
                    <article className="group/card relative overflow-hidden rounded-2xl border border-border bg-navy-950 shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:ring-2 hover:ring-gold-500/60">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
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
                ))}
              </div>
            </div>

            {/* Controls */}
            {n > 1 && (
              <div className="mt-8 flex items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={() => setPos((p) => p - 1)}
                  aria-label="Previous"
                  className="grid size-11 place-items-center rounded-full border border-border text-foreground transition hover:border-gold-400 hover:bg-gold-500 hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  <ArrowLeft aria-hidden className="size-5" />
                </button>

                <div className="flex items-center gap-2.5">
                  {slides.map((s, i) => (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => {
                        setPos(view + i);
                      }}
                      aria-label={`Go to ${s.title}`}
                      aria-current={i === realIndex}
                      className={
                        "h-2 rounded-full transition-all duration-300 " +
                        (i === realIndex
                          ? "w-8 bg-gold-500"
                          : "w-2 bg-border hover:bg-gold-500/50")
                      }
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setPos((p) => p + 1)}
                  aria-label="Next"
                  className="grid size-11 place-items-center rounded-full border border-border text-foreground transition hover:border-gold-400 hover:bg-gold-500 hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  <ArrowRight aria-hidden className="size-5" />
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
