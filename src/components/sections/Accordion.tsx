"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = { q: string; a: string };

export function Accordion({
  items,
  idPrefix,
  defaultOpen = null,
}: {
  items: AccordionItem[];
  idPrefix: string;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reduced = useReducedMotion();

  return (
    <ul className="border-t border-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="border-b border-border">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-panel-${i}`}
                id={`${idPrefix}-button-${i}`}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight sm:text-lg">
                  {item.q}
                </span>
                <Plus
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0 text-gold-600 transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] dark:text-gold-400",
                    isOpen && "rotate-45",
                  )}
                  strokeWidth={2}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={`${idPrefix}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${idPrefix}-button-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.3,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 pr-10 leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
