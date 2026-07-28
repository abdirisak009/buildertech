"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * The Architectural → Structural → Civil flow. A gold highlight travels from
 * one step to the next on a loop, so the pipeline reads as an active process.
 * Reduced-motion users get a static state with the middle step highlighted.
 */
export function FlowCycle({
  steps,
  interval = 1400,
}: {
  steps: string[];
  interval?: number;
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(reduced ? 1 : 0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % steps.length);
    }, interval);
    return () => clearInterval(id);
  }, [reduced, steps.length, interval]);

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2 font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2">
          <span
            className={cn(
              "transition-[color,transform,text-shadow] duration-500 ease-out",
              i === active
                ? "scale-105 text-gold-500 [text-shadow:0_0_18px_rgba(255,186,8,0.55)]"
                : "text-white/90",
            )}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <ChevronRight
              aria-hidden
              className={cn(
                "size-4 transition-colors duration-500",
                i === active ? "text-gold-500" : "text-navy-300",
              )}
            />
          )}
        </span>
      ))}
    </div>
  );
}
