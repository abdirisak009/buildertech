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
}: {
  text: string;
  className?: string;
  startDelay?: number;
  speed?: number;
}) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [reduced, text.length, speed, startDelay]);

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
