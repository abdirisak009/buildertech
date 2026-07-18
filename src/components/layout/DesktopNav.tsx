"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV, type NavItem } from "@/content/site";

export function DesktopNav({ onDark }: { onDark: boolean }) {
  const pathname = usePathname();
  // Keyed to the route it was opened on, so a navigation closes the panel
  // without needing a route-change effect that setStates synchronously.
  const [openOn, setOpenOn] = useState<{ key: string; path: string } | null>(
    null,
  );
  const openKey = openOn?.path === pathname ? openOn.key : null;
  const setOpenKey = (key: string | null) =>
    setOpenOn(key ? { key, path: pathname } : null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenKey(null), 140);
  };

  const isActive = (item: NavItem) => {
    if (item.href === "/") return pathname === "/";
    if (pathname.startsWith(item.href)) return true;
    return item.children?.some((c) => pathname.startsWith(c.href)) ?? false;
  };

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {NAV.map((item) => {
          const active = isActive(item);
          const hasChildren = !!item.children?.length;
          const open = openKey === item.label;
          const Icon = item.icon;

          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                if (hasChildren) setOpenKey(item.label);
              }}
              onMouseLeave={scheduleClose}
            >
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                aria-expanded={hasChildren ? open : undefined}
                onFocus={() => hasChildren && setOpenKey(item.label)}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-medium",
                  "transition-colors duration-200",
                  onDark
                    ? active
                      ? "text-white"
                      : "text-white/75 hover:text-white"
                    : active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon
                  aria-hidden
                  className={cn(
                    "size-4 shrink-0 transition-colors duration-200",
                    active
                      ? "text-gold-500"
                      : onDark
                        ? "text-white/50 group-hover:text-white"
                        : "text-subtle-foreground",
                  )}
                  strokeWidth={1.75}
                />
                {item.label}
                {hasChildren && (
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "size-3.5 transition-transform duration-250",
                      open && "rotate-180",
                    )}
                    strokeWidth={2.25}
                  />
                )}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3.5 bottom-1 h-0.5 origin-left rounded-full bg-gold-500",
                    "transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>

              {hasChildren && (
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: reduced ? 0 : 8, scale: reduced ? 1 : 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: reduced ? 0 : 6, scale: reduced ? 1 : 0.98 }}
                      transition={{
                        duration: reduced ? 0 : 0.22,
                        ease: [0.22, 0.61, 0.36, 1],
                      }}
                      className={cn(
                        "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3",
                        item.children!.length > 4 ? "w-[42rem]" : "w-[24rem]",
                      )}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_28px_70px_-24px_rgba(5,18,60,0.45)]">
                        <div aria-hidden className="h-1 bg-gold-500" />
                        <ul
                          className={cn(
                            "grid gap-1 p-3",
                            item.children!.length > 4 && "grid-cols-2",
                          )}
                        >
                          {item.children!.map((child) => {
                            const childActive = pathname.startsWith(child.href);
                            const ChildIcon = child.icon;
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    "group/link flex gap-3.5 rounded-xl p-3.5 transition-colors duration-200",
                                    childActive
                                      ? "bg-gold-500/12"
                                      : "hover:bg-surface-muted",
                                  )}
                                >
                                  <span
                                    aria-hidden
                                    className={cn(
                                      "mt-0.5 inline-grid size-9 shrink-0 place-items-center rounded-lg transition-colors duration-250",
                                      childActive
                                        ? "bg-gold-500 text-navy-950"
                                        : "bg-gold-500/15 text-gold-700 group-hover/link:bg-gold-500 group-hover/link:text-navy-950 dark:text-gold-400",
                                    )}
                                  >
                                    <ChildIcon className="size-[18px]" strokeWidth={1.75} />
                                  </span>

                                  <span className="min-w-0">
                                    <span className="flex items-center gap-2 font-[family-name:var(--font-display)] text-[0.9375rem] font-semibold tracking-tight text-foreground">
                                      {child.label}
                                      <ArrowRight
                                        aria-hidden
                                        className="size-3.5 -translate-x-1 text-gold-600 opacity-0 transition-all duration-250 group-hover/link:translate-x-0 group-hover/link:opacity-100 dark:text-gold-400"
                                      />
                                    </span>
                                    {child.description && (
                                      <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                                        {child.description}
                                      </span>
                                    )}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
