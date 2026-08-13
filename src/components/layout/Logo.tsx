import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

/**
 * The BT hexagon mark only (no wordmark). The artwork is gold + navy on a
 * transparent field.
 *
 * - `light`   — original colours, for light surfaces.
 * - `auto`    — original on light, knocked out to white in dark mode.
 * - `onDark`  — solid white silhouette, for solid dark surfaces (footer).
 * - `onMedia` — original colours + a soft halo, so the two-tone mark stays
 *   legible over the video/photo hero (navy lifts off dark frames, gold off
 *   light ones) without losing its brand colours.
 */
export function Logo({
  locale,
  homeLabel,
  className,
  variant = "auto",
  priority,
}: {
  locale: Locale;
  homeLabel: string;
  className?: string;
  variant?: "auto" | "light" | "onDark" | "onMedia";
  priority?: boolean;
}) {
  return (
    <Link
      href={`/${locale}`}
      aria-label={homeLabel}
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src="/logo-mark-trim.png"
        alt="Builders Tech"
        width={228}
        height={203}
        priority={priority}
        className={cn(
          "h-12 w-auto sm:h-14 [transform:scale(var(--cms-logo-scale,1))]",
          variant === "onDark" && "brightness-0 invert",
          variant === "auto" && "dark:brightness-0 dark:invert",
          // Solid white mark over the hero media, with a soft shadow so it lifts
          // off the footage cleanly.
          variant === "onMedia" &&
            "[filter:brightness(0)_invert(1)_drop-shadow(0_2px_6px_rgba(0,0,0,0.55))]",
        )}
      />
    </Link>
  );
}
