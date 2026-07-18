"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X, Phone, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { SITE } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();
  // The drawer is bound to the route it was opened on, so navigating away
  // closes it without needing a route-change effect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenedAt(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpenedAt(null);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // The hero sits behind a transparent header only at the top of the page.
  const solid = scrolled || open;

  return (
    <>
      {/* Utility bar */}
      <div className="relative z-50 hidden bg-navy-900 text-white lg:block">
        <Container>
          <div className="flex h-10 items-center justify-between text-xs">
            <p className="text-navy-100">{SITE.headline}</p>
            <div className="flex items-center gap-6">
              <a
                href={`tel:${SITE.phoneHref}`}
                className="flex items-center gap-2 font-medium transition-colors hover:text-gold-400"
              >
                <Phone aria-hidden className="size-3.5 text-gold-500" strokeWidth={2} />
                {SITE.phone}
              </a>
              <span className="text-navy-200">{SITE.address.full}</span>
            </div>
          </div>
        </Container>
      </div>

      <header
        className={cn(
          "fixed inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter,top] duration-300",
          // At the very top the utility bar is on screen, so the header sits
          // below it. Once scrolled, the bar is gone — the header must pin to
          // top-0 or a transparent strip is left for content to show through.
          solid ? "top-0" : "top-0 lg:top-10",
          solid
            ? "border-b border-border bg-background/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container>
          <div className="flex h-20 items-center justify-between gap-4">
            <Logo priority variant={solid ? "auto" : "onDark"} />

            <DesktopNav onDark={!solid} />

            <div className="flex items-center gap-2">
              <ThemeToggle
                className={cn(
                  !solid && "border-white/25 text-white hover:bg-white/10",
                )}
              />

              <ButtonLink
                href="/contact"
                size="sm"
                className="hidden xl:inline-flex"
              >
                Schedule Your Project
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </ButtonLink>

              <button
                type="button"
                onClick={() => setOpenedAt(open ? null : pathname)}
                aria-expanded={open}
                aria-controls="mobile-drawer"
                aria-label={open ? "Close menu" : "Open menu"}
                className={cn(
                  "inline-grid size-11 cursor-pointer place-items-center rounded-full border lg:hidden",
                  solid
                    ? "border-border-strong text-foreground"
                    : "border-white/25 text-white",
                )}
              >
                {open ? (
                  <X aria-hidden className="size-5" />
                ) : (
                  <Menu aria-hidden className="size-5" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Rendered outside <header>: the header's backdrop-filter would otherwise
          become the containing block for this fixed element and collapse it. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            key="drawer"
            initial={{ opacity: 0, y: reduced ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto border-t border-border bg-background lg:hidden"
          >
            <MobileNav onNavigate={() => setOpenedAt(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
