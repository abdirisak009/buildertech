"use client";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SERVICE_CITIES_ALL, SERVICE_COUNTIES } from "@/content/georgiaMap";

type Copy = { eyebrow: string; title: string; lead: string; countiesLabel: string; citiesLabel: string };

/** A glassy, edge-fading marquee row of place pills that floats over the video. */
function RotatingLine({ items, label }: { items: string[]; label: string }) {
  const line = [...items, ...items];
  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] py-5 shadow-[0_24px_70px_-35px_rgba(0,0,0,0.95)] backdrop-blur-md">
      <div className="mb-3 flex items-center gap-2 px-6 text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
        <MapPin className="size-4" />
        {label}
      </div>
      <div className="[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="ww-marquee flex w-max gap-3 px-6">
          {line.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="whitespace-nowrap rounded-full border border-white/15 bg-white/[0.08] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:border-gold-500/60 hover:bg-gold-500/15 hover:text-gold-100"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WhereWeWork({ copy }: { copy: Copy }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      {/* Full-section background video (falls back to its poster on load and for
          reduced-motion visitors). */}
      <Image
        src="/images/5387261.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/5387261.jpg"
        className="absolute inset-0 size-full object-cover motion-reduce:hidden"
      >
        <source src="/where-we-work.mp4" type="video/mp4" />
      </video>

      {/* Scrims for legibility + brand texture and glow. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/70 to-navy-950/95" />
      <div aria-hidden className="absolute inset-0 bg-blueprint opacity-20" />
      <div aria-hidden className="absolute -right-40 top-10 h-[38rem] w-[38rem] rounded-full bg-gold-500/12 blur-[150px]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <Container className="relative py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-gold-400">
              <span aria-hidden className="h-px w-8 bg-gold-500" />
              {copy.eyebrow}
              <span aria-hidden className="h-px w-8 bg-gold-500" />
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-display-lg text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">{copy.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-lg leading-8 text-navy-100">{copy.lead}</p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-16 max-w-6xl space-y-5">
            <RotatingLine label={copy.countiesLabel} items={SERVICE_COUNTIES} />
            <RotatingLine label={copy.citiesLabel} items={SERVICE_CITIES_ALL} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
