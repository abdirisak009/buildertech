"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";

import { ContactForm } from "@/components/sections/ContactForm";
import { getUi } from "@/i18n/ui";
import type { Locale } from "@/i18n/config";

type IntakeContextValue = {
  open: boolean;
  openIntake: () => void;
  closeIntake: () => void;
};

const IntakeContext = createContext<IntakeContextValue | null>(null);

export function useIntake() {
  const ctx = useContext(IntakeContext);
  if (!ctx) {
    throw new Error("useIntake must be used within IntakeProvider");
  }
  return ctx;
}

/** Safe hook for optional use — returns null helpers when outside provider. */
export function useOptionalIntake() {
  return useContext(IntakeContext);
}

export function IntakeProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const reduced = useReducedMotion();
  const t = getUi(locale).form;

  const openIntake = useCallback(() => setOpen(true), []);
  const closeIntake = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openIntake, closeIntake }),
    [open, openIntake, closeIntake],
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeIntake();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeIntake]);

  return (
    <IntakeContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            key="intake-modal"
            className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <button
              type="button"
              aria-label={t.close}
              className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
              onClick={closeIntake}
            />
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : 20 }}
              transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative z-10 flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-border bg-background shadow-2xl sm:rounded-3xl"
            >
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border bg-surface px-5 py-4 sm:px-6">
                <div>
                  <p className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.16em] text-gold-700 dark:text-gold-400">
                    Builders Tech
                  </p>
                  <h2
                    id={titleId}
                    className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight sm:text-2xl"
                  >
                    {t.title}
                  </h2>
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {t.requiredNote}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeIntake}
                  aria-label={t.close}
                  className="inline-grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-border-strong text-foreground transition-colors hover:bg-foreground/5"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </div>
              <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
                <ContactForm
                  locale={locale}
                  compact
                  onSuccessClose={closeIntake}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </IntakeContext.Provider>
  );
}
