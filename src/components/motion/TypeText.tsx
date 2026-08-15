"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Typewriter effect. Types `text` out one character at a time with a blinking
 * caret. Reduced-motion users get the full text immediately, exposed to
 * assistive tech via aria-label.
 *
 * `text` (and any CMS override) may contain MULTIPLE phrases separated by a
 * newline or an arrow (→). When more than one phrase is given, they rotate:
 * each is typed, held, deleted, then the next one is typed — forever. A single
 * phrase behaves as before (types once, or loops if `loop` is set).
 */
const PHRASE_SPLIT = /\s*(?:→|\r?\n)\s*/;
function parsePhrases(raw: string): string[] {
  const list = raw.split(PHRASE_SPLIT).map((s) => s.trim()).filter(Boolean);
  return list.length ? list : [raw];
}

export function TypeText({
  text,
  className,
  startDelay = 500,
  speed = 85,
  loop = false,
  holdTime = 1800,
  deleteSpeed = 45,
}: {
  text: string;
  className?: string;
  startDelay?: number;
  speed?: number;
  /** When true, a single phrase types out, pauses, deletes, and repeats. */
  loop?: boolean;
  /** How long a finished phrase stays on screen before deleting (ms). */
  holdTime?: number;
  /** Per-character deletion speed (ms). */
  deleteSpeed?: number;
}) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [speedFactor, setSpeedFactor] = useState(1);
  // `source` is the raw value (may hold several phrases); `index` is which one
  // is currently on screen.
  const [source, setSource] = useState(text);
  const [index, setIndex] = useState(0);
  const cmsKey = `animated:type:${text}`;

  const phrases = useMemo(() => parsePhrases(source), [source]);
  const multi = phrases.length > 1;
  const current = phrases[index % phrases.length] || "";

  useEffect(() => {
    const update = (event: Event) => {
      const detail = (event as CustomEvent<{ key: string; speed: number }>).detail;
      if (detail?.key === cmsKey) setSpeedFactor(detail.speed > 0 ? detail.speed : 1);
    };
    document.addEventListener("cms:animation-speed", update);
    return () => document.removeEventListener("cms:animation-speed", update);
  }, [cmsKey]);
  useEffect(() => {
    const update = (event: Event) => {
      const detail = (event as CustomEvent<{ key: string; value: string }>).detail;
      if (detail?.key === cmsKey) {
        setSource(detail.value);
        setIndex(0);
        setCount(0);
      }
    };
    document.addEventListener("cms:animated-text", update);
    return () => document.removeEventListener("cms:animated-text", update);
  }, [cmsKey]);

  useEffect(() => {
    if (reduced) return;

    let i = 0;
    let phase: "typing" | "holding" | "deleting" = "typing";
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (phase === "typing") {
        i += 1;
        setCount(i);
        if (i >= current.length) {
          // A single, non-looping phrase stops fully typed. Multiple phrases
          // always rotate (looping is implied).
          if (!loop && !multi) return;
          phase = "holding";
          timer = setTimeout(tick, holdTime / speedFactor);
          return;
        }
        timer = setTimeout(tick, speed / speedFactor);
      } else if (phase === "holding") {
        phase = "deleting";
        timer = setTimeout(tick, deleteSpeed / speedFactor);
      } else {
        i -= 1;
        setCount(i);
        if (i <= 0) {
          if (multi) {
            // Advance to the next phrase; changing `index` restarts this effect
            // which types the next one from the start.
            setIndex((x) => (x + 1) % phrases.length);
            return;
          }
          phase = "typing";
          timer = setTimeout(tick, speed / speedFactor);
          return;
        }
        timer = setTimeout(tick, deleteSpeed / speedFactor);
      }
    };

    const start = setTimeout(tick, startDelay / speedFactor);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [reduced, current, index, phrases.length, multi, speed, startDelay, loop, holdTime, deleteSpeed, speedFactor]);

  // Reduced-motion users see the first phrase in full, no animation.
  const shown = reduced ? current.length : count;
  const done = shown >= current.length;

  return (
    <span
      className={className}
      aria-label={current}
      data-cms-key={cmsKey}
      data-cms-kind="text"
      data-cms-animated="true"
      data-cms-original={text}
      data-cms-current={source}
    >
      <span aria-hidden>{current.slice(0, shown)}</span>
      <span
        aria-hidden
        className={cn(
          "ml-0.5 inline-block w-[0.06em] self-stretch bg-current align-baseline",
          "h-[0.85em] translate-y-[0.08em]",
          done ? "animate-caret" : "opacity-100",
        )}
      />
    </span>
  );
}
