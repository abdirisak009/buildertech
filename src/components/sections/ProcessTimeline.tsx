"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScheduleCta } from "@/components/intake/ScheduleCta";
import { Reveal } from "@/components/motion/Reveal";
import type { Locale } from "@/i18n/config";
import { API_URL } from "@/lib/api/client";

type Step = { title: string; body: string };
type Resolved = { title: string; body: string; image: string; photoSize: number };
function asset(v: string) { const o = API_URL.replace(/\/api\/v1\/?$/, ""); return /^(https?:|data:|blob:)/.test(v) ? v : `${o}${v}`; }

export function ProcessTimeline({
  locale,
  eyebrow,
  title,
  lead,
  steps,
  images,
  ctaLabel,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  lead: string;
  steps: Step[];
  images: string[];
  ctaLabel: string;
}) {
  const listRef = useRef<HTMLOListElement>(null);
  // Progress of the scroll through the timeline (0 → 1).
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });

  // Steps are managed from Content Studio → Our Process (title, text, image,
  // size, order). Falls back to the built-in steps until the CMS responds.
  const [cms, setCms] = useState<Resolved[] | null>(null);
  useEffect(() => {
    fetch(`${API_URL}/content?types=process`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((x) => {
        const rows = x.data as { key: string; title: string; data: string }[];
        const list = rows
          .map((it) => { try { const d = JSON.parse(it.data); return { title: it.title, body: d.body || "", image: d.image || "", photoSize: Number(d.photoSize) || 100, order: typeof d.order === "number" ? d.order : parseInt(String(it.key).replace(/\D/g, ""), 10) || 0 }; } catch { return null; } })
          .filter((s) => !!s && !!s.image) as (Resolved & { order: number })[];
        list.sort((a, b) => a.order - b.order);
        if (list.length) setCms(list);
      })
      .catch(() => undefined);
  }, []);
  const resolved: Resolved[] = cms ?? steps.map((s, i) => ({ title: s.title, body: s.body, image: images[i], photoSize: 100 }));

  return (
    <Section tone="navy" className="pt-12 sm:pt-14 lg:pt-16">
      <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
      <Container className="relative">
        <div className="text-center">
          <Reveal>
            <Eyebrow align="center" className="text-navy-200">
              {eyebrow}
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-display-lg text-white">{title}</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">
              {lead}
            </p>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative mx-auto mt-16 max-w-5xl">
          {/* Baseline spine */}
          <span
            aria-hidden
            className="absolute bottom-6 left-6 top-6 w-0.5 -translate-x-1/2 bg-white/15"
          />
          {/* Scroll-linked progress fill */}
          <motion.span
            aria-hidden
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-6 left-6 top-6 w-0.5 origin-top -translate-x-1/2 bg-gold-500"
          />

          {resolved.map((step, i) => (
            <ProcessStep
              key={`${step.title}-${i}`}
              index={i}
              total={resolved.length}
              step={step}
              image={step.image}
              photoSize={step.photoSize}
              progress={scrollYProgress}
            />
          ))}
        </ol>

        <Reveal delay={0.15}>
          <div className="mt-14 flex justify-center">
            <ScheduleCta locale={locale} label={ctaLabel} size="lg" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function ProcessStep({
  index,
  total,
  step,
  image,
  photoSize = 100,
  progress,
}: {
  index: number;
  total: number;
  step: Step;
  image: string;
  photoSize?: number;
  progress: MotionValue<number>;
}) {
  const threshold = total > 1 ? index / (total - 1) : 0;
  // The number lights up as the scroll progress reaches its position.
  const background = useTransform(
    progress,
    [threshold - 0.04, threshold + 0.01],
    ["rgba(255,255,255,0.14)", "#e87838"],
  );
  const color = useTransform(
    progress,
    [threshold - 0.04, threshold + 0.01],
    ["#ffffff", "#0a0a0b"],
  );
  const dotScale = useTransform(
    progress,
    [threshold - 0.04, threshold + 0.01],
    [0.92, 1],
  );

  return (
    <li>
      <Reveal>
        <div className="grid grid-cols-[3rem_1fr] gap-x-5 gap-y-5 pb-8 last:pb-0 sm:gap-x-6">
          <div className="relative z-10 flex justify-center">
            <motion.span
              style={{ backgroundColor: background, color, scale: dotScale }}
              className="tabular inline-grid size-12 shrink-0 place-items-center rounded-full font-[family-name:var(--font-display)] text-lg font-bold shadow-[0_6px_20px_-8px_rgba(232,120,56,0.8)]"
            >
              {index + 1}
            </motion.span>
          </div>

          <div className="grid gap-6 pt-1.5 lg:grid-cols-2 lg:items-center lg:gap-10">
            <div>
              <h3 className="text-xl text-white sm:text-2xl">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-navy-100">{step.body}</p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={asset(image)}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                style={{ transform: `scale(${photoSize / 100})` }}
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-950/30 to-transparent"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </li>
  );
}
