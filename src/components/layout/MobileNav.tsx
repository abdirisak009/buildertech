"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, ArrowRight, Phone, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import type { NavItem } from "@/content";
import type { Locale } from "@/i18n/config";
import type { UiDict } from "@/i18n/ui";

export function MobileNav({
  nav,
  locale,
  ui,
  contact,
  onNavigate,
}: {
  nav: readonly NavItem[];
  locale: Locale;
  ui: UiDict;
  contact: { phone: string; phoneHref: string; email: string; cta: string };
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const href = (path: string) => `/${locale}${path === "/" ? "" : path}`;

  return (
    <Container className="py-6">
      <ul className="divide-y divide-border">
        {nav.map((item, i) => {
          const hasChildren = !!item.children?.length;
          const isOpen = expanded === item.label;
          const itemHref = href(item.href);
          const active =
            pathname.startsWith(itemHref) ||
            (item.children?.some((c) => pathname.startsWith(href(c.href))) ??
              false);
          const Icon = item.icon;

          return (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: reduced ? 0 : -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: reduced ? 0 : 0.04 + i * 0.04,
                duration: 0.32,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              <div className="flex items-center">
                <Link
                  href={itemHref}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex flex-1 items-center gap-4 py-5 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight",
                    active ? "text-gold-600 dark:text-gold-400" : "text-foreground",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "inline-grid size-10 shrink-0 place-items-center rounded-xl transition-colors",
                      active
                        ? "bg-gold-500 text-navy-950"
                        : "bg-gold-500/15 text-gold-700 dark:text-gold-400",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  {item.label}
                </Link>

                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    aria-label={
                      isOpen
                        ? ui.a11y.collapseMenu(item.label)
                        : ui.a11y.expandMenu(item.label)
                    }
                    className="inline-grid size-12 shrink-0 cursor-pointer place-items-center rounded-full border border-border-strong text-muted-foreground"
                  >
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "size-5 transition-transform duration-250",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                ) : (
                  <ArrowRight
                    aria-hidden
                    className="size-5 shrink-0 text-subtle-foreground"
                  />
                )}
              </div>

              <AnimatePresence initial={false}>
                {hasChildren && isOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: reduced ? 0 : 0.28,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <li className="pb-4">
                      <ul className="space-y-1 border-l-2 border-gold-500 pl-4">
                        {item.children!.map((child) => {
                          const ChildIcon = child.icon;
                          const childHref = href(child.href);
                          const childActive = pathname.startsWith(childHref);
                          return (
                            <li key={child.href}>
                              <Link
                                href={childHref}
                                onClick={onNavigate}
                                className={cn(
                                  "flex min-h-12 items-center gap-3 rounded-lg py-3 pl-2 pr-3 text-base transition-colors",
                                  childActive
                                    ? "font-semibold text-gold-700 dark:text-gold-400"
                                    : "text-muted-foreground",
                                )}
                              >
                                <ChildIcon
                                  aria-hidden
                                  className={cn(
                                    "size-[18px] shrink-0",
                                    childActive
                                      ? "text-gold-600 dark:text-gold-400"
                                      : "text-subtle-foreground",
                                  )}
                                  strokeWidth={1.75}
                                />
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>

      <ButtonLink
        href={href("/contact")}
        size="lg"
        className="mt-8 w-full"
        onClick={onNavigate}
      >
        {contact.cta}
      </ButtonLink>

      <div className="mt-8 space-y-3 text-sm">
        <a
          href={`tel:${contact.phoneHref}`}
          className="flex items-center gap-3 text-muted-foreground"
        >
          <Phone aria-hidden className="size-4 text-gold-600 dark:text-gold-400" />
          {contact.phone}
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-3 break-all text-muted-foreground"
        >
          <Mail aria-hidden className="size-4 shrink-0 text-gold-600 dark:text-gold-400" />
          {contact.email}
        </a>
      </div>
    </Container>
  );
}
