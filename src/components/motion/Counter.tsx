"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useMotionPrefs } from "./MotionPrefs";

export function Counter({
  value,
  suffix = "",
  decimals = 0,
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const prefs = useMotionPrefs();
  const reduced = useReducedMotion() || !prefs.counters;
  const [progressValue, setProgressValue] = useState(0);

  // With reduced motion we never animate — render the final value directly.
  const display = reduced ? value : progressValue;

  useEffect(() => {
    if (!inView || reduced) return;

    let frame = 0;
    let start: number | null = null;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * prefs.factor), 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setProgressValue(value * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, duration, prefs.factor]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="tabular">
      {formatted}
      {suffix}
    </span>
  );
}
