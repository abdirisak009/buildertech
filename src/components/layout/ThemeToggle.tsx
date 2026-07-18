"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Deferred to a microtask so the mount flag is not set synchronously in the
  // effect body (which would cascade an extra render).
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-grid size-11 shrink-0 cursor-pointer place-items-center rounded-full",
        "border border-border-strong text-foreground",
        "transition-colors duration-200 hover:bg-foreground/5",
        className,
      )}
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      {mounted ? (
        isDark ? (
          <Sun aria-hidden className="size-[18px]" strokeWidth={1.75} />
        ) : (
          <Moon aria-hidden className="size-[18px]" strokeWidth={1.75} />
        )
      ) : (
        <Moon aria-hidden className="size-[18px] opacity-0" strokeWidth={1.75} />
      )}
    </button>
  );
}
