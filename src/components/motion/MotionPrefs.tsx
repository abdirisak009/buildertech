"use client";

import { useSyncExternalStore } from "react";
import { MotionConfig } from "motion/react";

/**
 * Animation settings the site administrator controls from the CMS.
 *
 * `factor` scales every duration: 1 is the designed speed, above 1 is slower,
 * below 1 is faster. The individual flags switch a single effect off while
 * leaving the rest alone.
 */
export type MotionPrefs = {
  enabled: boolean;
  factor: number;
  reveal: boolean;
  typing: boolean;
  counters: boolean;
  hover: boolean;
};

export const DEFAULT_MOTION_PREFS: MotionPrefs = {
  enabled: true,
  factor: 1,
  reveal: true,
  typing: true,
  counters: true,
  hover: true,
};

export const SPEED_FACTORS: Record<string, number> = {
  slow: 1.5,
  normal: 1,
  fast: 0.6,
};

let current: MotionPrefs = DEFAULT_MOTION_PREFS;
const listeners = new Set<() => void>();

/** Called once the public site settings arrive from the API. */
export function setMotionPrefs(next: Partial<MotionPrefs>) {
  const merged = { ...current, ...next };
  if (
    (Object.keys(merged) as (keyof MotionPrefs)[]).every(
      (key) => merged[key] === current[key],
    )
  ) {
    return;
  }
  current = merged;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useMotionPrefs(): MotionPrefs {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => DEFAULT_MOTION_PREFS,
  );
}

/**
 * Turning animations off in the CMS is expressed as "reduced motion" for the
 * whole tree, so every component that already respects a visitor's own
 * reduced-motion setting switches off too — no per-component wiring needed.
 */
export function MotionPrefsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefs = useMotionPrefs();
  return (
    <MotionConfig reducedMotion={prefs.enabled ? "user" : "always"}>
      {children}
    </MotionConfig>
  );
}
