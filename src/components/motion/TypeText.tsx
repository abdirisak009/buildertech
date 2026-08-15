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
  const [speedFactor,setSpeedFactor]=useState(1);
  const [displayText,setDisplayText]=useState(text);
  const cmsKey = `animated:type:${text}`;

  useEffect(()=>{const update=(event:Event)=>{const detail=(event as CustomEvent<{key:string;speed:number}>).detail;if(detail?.key===cmsKey)setSpeedFactor(detail.speed>0?detail.speed:1)};document.addEventListener("cms:animation-speed",update);return()=>document.removeEventListener("cms:animation-speed",update)},[cmsKey]);
  useEffect(()=>{const update=(event:Event)=>{const detail=(event as CustomEvent<{key:string;value:string}>).detail;if(detail?.key===cmsKey){setDisplayText(detail.value);setCount(0)}};document.addEventListener("cms:animated-text",update);return()=>document.removeEventListener("cms:animated-text",update)},[cmsKey]);

  useEffect(() => {
    if (reduced) return;

    let i = 0;
    let phase: "typing" | "holding" | "deleting" = "typing";
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (phase === "typing") {
        i += 1;
        setCount(i);
        if (i >= displayText.length) {
          if (!loop) return;
          phase = "holding";
          timer = setTimeout(tick, holdTime/speedFactor);
          return;
        }
        timer = setTimeout(tick, speed/speedFactor);
      } else if (phase === "holding") {
        phase = "deleting";
        timer = setTimeout(tick, deleteSpeed/speedFactor);
      } else {
        i -= 1;
        setCount(i);
        if (i <= 0) {
          phase = "typing";
          timer = setTimeout(tick, speed/speedFactor);
          return;
        }
        timer = setTimeout(tick, deleteSpeed/speedFactor);
      }
    };

    const start = setTimeout(tick, startDelay/speedFactor);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [reduced, displayText.length, speed, startDelay, loop, holdTime, deleteSpeed,speedFactor]);

  // Reduced-motion users see the full text with no animation.
  const shown = reduced ? displayText.length : count;
  const done = shown >= displayText.length;

  return (
    <span className={className} aria-label={displayText} data-cms-key={cmsKey} data-cms-kind="text" data-cms-animated="true" data-cms-original={text} data-cms-current={displayText}>
      <span aria-hidden>{displayText.slice(0, shown)}</span>
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
