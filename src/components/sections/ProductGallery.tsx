"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory } from "@/content";
import type { Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

type Filter = "All" | ProductCategory;
type CategoryOption = { value: Filter; label: string };

const PRICE_LOCALE: Record<Locale, string> = { en: "en-US", es: "es-US" };

export function ProductGallery({
  products,
  categories,
  locale,
}: {
  products: readonly Product[];
  /** `value` is the untranslated filter key; `label` is what gets rendered. */
  categories: readonly CategoryOption[];
  locale: Locale;
}) {
  // ui carries functions, so it is resolved here rather than passed in.
  const ui = getUi(locale);
  const [filter, setFilter] = useState<Filter>(categories[0]?.value ?? "All");
  const reduced = useReducedMotion();

  const price = useMemo(
    () =>
      new Intl.NumberFormat(PRICE_LOCALE[locale], {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  const allValue = categories[0]?.value;

  const visible = useMemo(
    () =>
      filter === allValue
        ? products
        : products.filter((p) => p.category === filter),
    [filter, products, allValue],
  );

  return (
    <div>
      {/* ---------------- Filter chips ---------------- */}
      <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap gap-2.5" aria-label={ui.common.filterByCategory}>
          {categories.map((category) => {
            const active = filter === category.value;
            return (
              <li key={category.value}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(category.value)}
                  className={cn(
                    "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-5 text-sm font-semibold",
                    "font-[family-name:var(--font-display)] tracking-tight",
                    "transition-[background-color,color,border-color] duration-250 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
                    active
                      ? "border-navy-700 bg-navy-700 text-white dark:border-gold-500 dark:bg-gold-500 dark:text-navy-950"
                      : "border-border-strong bg-transparent text-muted-foreground hover:border-navy-700 hover:text-foreground dark:hover:border-gold-500",
                  )}
                >
                  {category.label}
                </button>
              </li>
            );
          })}
        </ul>

        <p aria-live="polite" className="tabular text-sm text-subtle-foreground">
          {ui.common.showingOf(visible.length, products.length, ui.common.planSets)}
        </p>
      </div>

      {/* ---------------- Grid ---------------- */}
      <motion.ul
        layout={!reduced}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((product) => (
            <motion.li
              key={product.slug}
              layout={!reduced}
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -12 }}
              transition={{
                duration: reduced ? 0 : 0.4,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="h-full"
            >
              <ProductCard
                product={product}
                priceText={price.format(product.price)}
                locale={locale}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

function ProductCard({
  product,
  priceText,
  locale,
}: {
  product: Product;
  priceText: string;
  locale: Locale;
}) {
  const ui = getUi(locale);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_24px_60px_-28px_rgba(10,36,114,0.45)]">
      {/* Blueprint panel — plan sets are drawings, not photographs. */}
      <div className="relative isolate aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-70" />
        <div
          aria-hidden
          className="absolute -right-16 -top-16 size-56 rounded-full bg-gold-500/12 blur-[80px]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
        />

        {/* Corner ticks — drafting sheet framing */}
        <div aria-hidden className="absolute inset-5 border border-white/12" />
        <div
          aria-hidden
          className="absolute left-5 top-5 size-4 border-l-2 border-t-2 border-gold-500/70"
        />
        <div
          aria-hidden
          className="absolute bottom-5 right-5 size-4 border-b-2 border-r-2 border-gold-500/70"
        />

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <span className="tabular font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-gold-500 sm:text-4xl">
            {product.size}
          </span>
          <span className="mt-3 text-[0.6875rem] uppercase tracking-[0.2em] text-navy-200">
            {product.category}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-lg">{product.name}</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {product.summary}
        </p>

        <p className="mt-6 text-xs uppercase tracking-[0.16em] text-subtle-foreground">
          {ui.common.includes}
        </p>
        <ul className="mt-3 flex-1 space-y-2">
          {product.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check
                aria-hidden
                className="mt-1 size-4 shrink-0 text-gold-600 dark:text-gold-400"
                strokeWidth={2.5}
              />
              <span className="text-sm leading-relaxed text-muted-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-6">
          <p className="tabular font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-gold-600 dark:text-gold-400">
            {priceText}
          </p>
          <ButtonLink
            href={`/${locale}/contact?plan=${product.slug}`}
            size="sm"
            aria-label={ui.common.purchaseAria(product.name)}
          >
            {ui.common.purchasePlan}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
