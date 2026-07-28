"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Typewriter effect — types `text` out one character at a time with a blinking
 * caret. Reduced-motion users get the full text immediately. The full string is
 * always exposed to assistive tech via aria-label.
 */
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
  /** When true, the text types out, pauses, deletes, and repeats forever. */
  loop?: boolean;
  /** How long the finished word stays on screen before deleting (ms). */
  holdTime?: number;
  /** Per-character deletion speed (ms). */
  deleteSpeed?: number;
}) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;

    let i = 0;
    let phase: "typing" | "holding" | "deleting" = "typing";
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (phase === "typing") {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          if (!loop) return;
          phase = "holding";
          timer = setTimeout(tick, holdTime);
          return;
        }
        timer = setTimeout(tick, speed);
      } else if (phase === "holding") {
        phase = "deleting";
        timer = setTimeout(tick, deleteSpeed);
      } else {
        i -= 1;
        setCount(i);
        if (i <= 0) {
          phase = "typing";
          timer = setTimeout(tick, speed);
          return;
        }
        timer = setTimeout(tick, deleteSpeed);
      }
    };

    const start = setTimeout(tick, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [reduced, text.length, speed, startDelay, loop, holdTime, deleteSpeed]);

  // Reduced-motion users see the full text with no animation.
  const shown = reduced ? text.length : count;
  const done = shown >= text.length;

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, shown)}</span>
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
