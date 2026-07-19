"use client";

import { useRouter, usePathname } from "next/navigation";
import { Languages, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { setCookie, ONE_YEAR } from "@/lib/cookies";
import {
  LOCALES,
  LOCALE_LABELS,
  LOCALE_COOKIE,
  withLocale,
  type Locale,
} from "@/i18n/config";

export function LanguageSwitcher({
  locale,
  label,
  switchTo,
  className,
  onDark,
}: {
  locale: Locale;
  label: string;
  switchTo: (name: string) => string;
  className?: string;
  onDark?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (next: Locale) => {
    // Remember the explicit choice so auto-detection does not override it.
    setCookie(LOCALE_COOKIE, next, ONE_YEAR);
    setOpen(false);
    router.push(withLocale(pathname, next));
    router.refresh();
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
        className={cn(
          "inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-full border px-3.5",
          "text-sm font-medium transition-colors duration-200",
          onDark
            ? "border-white/25 text-white hover:bg-white/10"
            : "border-border-strong text-foreground hover:bg-foreground/5",
        )}
      >
        <Languages aria-hidden className="size-[18px]" strokeWidth={1.75} />
        <span className="uppercase">{locale}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: reduced ? 0 : 6, scale: reduced ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : 4, scale: reduced ? 1 : 0.98 }}
            transition={{ duration: reduced ? 0 : 0.18, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_20px_50px_-20px_rgba(5,18,60,0.45)]"
          >
            {LOCALES.map((option) => {
              const active = option === locale;
              return (
                <li key={option}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => choose(option)}
                    aria-label={switchTo(LOCALE_LABELS[option].native)}
                    className={cn(
                      "flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 px-4 text-left text-sm transition-colors",
                      active
                        ? "bg-gold-500/12 font-semibold text-foreground"
                        : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                    )}
                  >
                    {LOCALE_LABELS[option].native}
                    {active && (
                      <Check
                        aria-hidden
                        className="size-4 text-gold-600 dark:text-gold-400"
                        strokeWidth={2.5}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
