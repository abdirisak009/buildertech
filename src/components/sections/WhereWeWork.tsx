"use client";

import { motion, useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import {
  GEORGIA_PATH,
  GEORGIA_VIEWBOX,
  METRO_VIEW,
  SERVICE_CITIES,
  SERVICE_CITIES_ALL,
  SERVICE_COUNTIES,
  SERVICE_ZONE,
} from "@/content/georgiaMap";

// Halo behind the SVG labels so city names stay legible over the map fill.
const LABEL_HALO = {
  paintOrder: "stroke" as const,
  stroke: "#0a0a0b",
  strokeWidth: 1.6,
  strokeLinejoin: "round" as const,
};

type Copy = {
  eyebrow: string;
  title: string;
  lead: string;
  countiesLabel: string;
  citiesLabel: string;
};

export function WhereWeWork({ copy }: { copy: Copy }) {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pb-20 pt-8 text-white sm:pb-28 sm:pt-10 lg:pb-32 lg:pt-14">
      <div aria-hidden className="absolute inset-0 bg-blueprint opacity-[0.07]" />
      <div
        aria-hidden
        className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-gold-500/10 blur-[130px]"
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="flex items-center justify-center gap-3 font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              <span aria-hidden className="h-px w-8 bg-gold-500" />
              {copy.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-display-lg text-white">{copy.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-lg leading-relaxed text-navy-100">
              {copy.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          {/* ---- Map ---- */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-xl">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-[2rem] bg-gold-500/10 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/40 p-3 shadow-2xl ring-1 ring-inset ring-white/5">
                <svg
                  viewBox={METRO_VIEW}
                  className="h-auto w-full"
                  role="img"
                  aria-label="Map of metro Atlanta, Georgia highlighting the Builders Tech service area"
                >
                  <defs>
                    <radialGradient id="ww-zone" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#e87838" stopOpacity="0.55" />
                      <stop offset="65%" stopColor="#e87838" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="#e87838" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* State outline (metro window) */}
                  <path
                    d={GEORGIA_PATH}
                    className="fill-white/[0.04] stroke-white/20"
                    strokeWidth={1.1}
                    strokeLinejoin="round"
                  />

                  {/* Metro-Atlanta service zone glow */}
                  <motion.ellipse
                    cx={SERVICE_ZONE.cx}
                    cy={SERVICE_ZONE.cy}
                    rx={SERVICE_ZONE.rx}
                    ry={SERVICE_ZONE.ry}
                    fill="url(#ww-zone)"
                    className="stroke-gold-500/70"
                    strokeWidth={0.7}
                    strokeDasharray="3 2.5"
                    initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
                    style={{
                      transformOrigin: `${SERVICE_ZONE.cx}px ${SERVICE_ZONE.cy}px`,
                    }}
                  />

                  {/* Radar sweep — expanding rings from the metro anchor */}
                  {!reduced &&
                    [0, 1, 2].map((ring) => (
                      <motion.circle
                        key={ring}
                        cx={SERVICE_ZONE.cx}
                        cy={SERVICE_ZONE.cy}
                        r={6}
                        fill="none"
                        stroke="#e87838"
                        strokeWidth={0.6}
                        initial={{ opacity: 0.5, scale: 0.4 }}
                        animate={{ opacity: [0.5, 0], scale: [0.4, 4] }}
                        transition={{
                          duration: 3.6,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: ring * 1.2,
                        }}
                        style={{
                          transformOrigin: `${SERVICE_ZONE.cx}px ${SERVICE_ZONE.cy}px`,
                        }}
                      />
                    ))}

                  {/* City markers with leader lines + labels */}
                  {SERVICE_CITIES.map((city, i) => {
                    const base = city.primary ? 2.6 : 1.9;
                    const delay = 0.3 + i * 0.12;
                    const textX = city.lx + (city.align === "start" ? 3 : -3);
                    return (
                      <motion.g
                        key={city.name}
                        initial={reduced ? false : { opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay }}
                      >
                        {/* Leader line from dot to label anchor */}
                        <line
                          x1={city.x}
                          y1={city.y}
                          x2={city.lx}
                          y2={city.ly}
                          className="stroke-gold-500/40"
                          strokeWidth={0.5}
                        />
                        <circle
                          cx={city.lx}
                          cy={city.ly}
                          r={0.9}
                          className="fill-gold-500/80"
                        />

                        {/* Pulsing ring */}
                        {!reduced && (
                          <motion.circle
                            cx={city.x}
                            cy={city.y}
                            r={base}
                            fill="none"
                            stroke="#e87838"
                            strokeWidth={0.9}
                            initial={{ opacity: 0.6, scale: 1 }}
                            animate={{ opacity: [0.6, 0], scale: [1, 3.2] }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: "easeOut",
                              delay: i * 0.25,
                            }}
                            style={{
                              transformOrigin: `${city.x}px ${city.y}px`,
                            }}
                          />
                        )}

                        {/* Solid dot */}
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r={base}
                          className={
                            city.primary ? "fill-gold-400" : "fill-gold-500"
                          }
                          stroke="#0a0a0b"
                          strokeWidth={0.5}
                        />

                        {/* Label */}
                        <text
                          x={textX}
                          y={city.ly + 1.7}
                          textAnchor={city.align}
                          style={LABEL_HALO}
                          className={
                            city.primary
                              ? "fill-white font-[family-name:var(--font-display)]"
                              : "fill-navy-50 font-[family-name:var(--font-display)]"
                          }
                          fontSize={city.primary ? 6.5 : 5.4}
                          fontWeight={city.primary ? 700 : 600}
                        >
                          {city.name}
                        </text>
                      </motion.g>
                    );
                  })}
                </svg>

                {/* Full-Georgia locator inset — confirms the region at a glance */}
                <div className="pointer-events-none absolute bottom-3 left-3 w-[70px] rounded-lg border border-white/10 bg-navy-950/85 px-2 pb-1.5 pt-2 backdrop-blur-sm">
                  <svg
                    viewBox={GEORGIA_VIEWBOX}
                    className="h-auto w-full"
                    aria-hidden
                  >
                    <path
                      d={GEORGIA_PATH}
                      className="fill-white/10 stroke-white/40"
                      strokeWidth={3}
                      strokeLinejoin="round"
                    />
                    <circle
                      cx={SERVICE_ZONE.cx}
                      cy={SERVICE_ZONE.cy}
                      r={22}
                      className="fill-gold-500/25"
                    />
                    <circle
                      cx={SERVICE_ZONE.cx}
                      cy={SERVICE_ZONE.cy}
                      r={9}
                      className="fill-gold-400"
                    />
                  </svg>
                  <p className="mt-1 text-center text-[8px] font-semibold uppercase tracking-[0.18em] text-navy-200">
                    Georgia
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---- Counties ---- */}
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold-400">
                  <MapPin aria-hidden className="size-4" />
                  {copy.countiesLabel}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {SERVICE_COUNTIES.map((county) => (
                    <li key={county}>
                      <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-gold-500/40 bg-gold-500/10 px-4 text-sm font-semibold text-gold-200 transition-colors hover:border-gold-400 hover:bg-gold-500/20">
                        <MapPin aria-hidden className="size-3.5 text-gold-400" />
                        {county}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---- Cities (full-width card grid) ---- */}
        <Reveal delay={0.1}>
          <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-200">
              {copy.citiesLabel}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {SERVICE_CITIES_ALL.map((city) => (
                <li key={city}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-navy-100 transition-colors hover:border-gold-500/50 hover:bg-white/[0.08] hover:text-white">
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-gold-500"
                    />
                    {city}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
