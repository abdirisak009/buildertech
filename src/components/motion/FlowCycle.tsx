"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { useMotionPrefs } from "./MotionPrefs";

/**
 * The Architectural → Structural → Civil flow, revealed with a typewriter
 * effect (matching the hero headline): the words type out one character at a
 * time, hold, delete, and loop. A blinking caret follows the cursor.
 * Reduced-motion users get the full line, statically.
 */
export function FlowCycle({
  steps,
  speed = 80,
  holdTime = 1600,
  deleteSpeed = 40,
}: {
  steps: string[];
  speed?: number;
  holdTime?: number;
  deleteSpeed?: number;
}) {
  const prefs = useMotionPrefs();
  const reduced = useReducedMotion() || !prefs.typing;
  const total = steps.reduce((sum, s) => sum + s.length, 0);
  const [typed, setTyped] = useState(0);
  // With motion off the whole line is shown at once, no timers involved.
  const count = reduced ? total : typed;

  useEffect(() => {
    if (reduced) return;

    const scale = prefs.factor;
    let i = 0;
    let phase: "typing" | "holding" | "deleting" = "typing";
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (phase === "typing") {
        i += 1;
        setTyped(i);
        if (i >= total) {
          phase = "holding";
          timer = setTimeout(tick, holdTime * scale);
          return;
        }
        timer = setTimeout(tick, speed * scale);
      } else if (phase === "holding") {
        phase = "deleting";
        timer = setTimeout(tick, deleteSpeed * scale);
      } else {
        i -= 1;
        setTyped(i);
        if (i <= 0) {
          phase = "typing";
          timer = setTimeout(tick, speed * scale);
          return;
        }
        timer = setTimeout(tick, deleteSpeed * scale);
      }
    };

    timer = setTimeout(tick, speed * scale);
    return () => clearTimeout(timer);
  }, [reduced, total, speed, holdTime, deleteSpeed, prefs.factor]);

  // How many characters of each word are visible for the current count.
  const shownPerWord = steps.map((s, i) => {
    const before = steps
      .slice(0, i)
      .reduce((sum, prev) => sum + prev.length, 0);
    return Math.max(0, Math.min(s.length, count - before));
  });

  // The word the caret currently sits in — the first not-yet-complete word, or
  // the last word once everything is typed.
  let activeWord = steps.findIndex((s, i) => shownPerWord[i] < s.length);
  if (activeWord === -1) activeWord = steps.length - 1;
  const done = count >= total;

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2 font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight">
      {steps.map((step, i) => {
        const shown = shownPerWord[i];
        const complete = shown >= step.length;
        return (
          <span key={step} className="flex items-center gap-2">
            <span
              className={cn(
                i === activeWord ? "text-gold-500" : "text-white",
              )}
            >
              {step.slice(0, shown)}
              {i === activeWord && (
                <span
                  aria-hidden
                  className={cn(
                    "ml-0.5 inline-block w-[0.06em] self-stretch bg-gold-500 align-baseline",
                    "h-[0.85em] translate-y-[0.08em]",
                    done ? "animate-caret" : "opacity-100",
                  )}
                />
              )}
            </span>
            {complete && i < steps.length - 1 && (
              <ChevronRight aria-hidden className="size-4 text-gold-500" />
            )}
          </span>
        );
      })}
    </div>
  );
}
