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
        src="/logo-mark.png"
        alt="Builders Tech"
        width={900}
        height={818}
        priority={priority}
        className={cn(
          "h-11 w-auto sm:h-12",
          variant === "onDark" && "brightness-0 invert",
          variant === "auto" && "dark:brightness-0 dark:invert",
          variant === "onMedia" &&
            "[filter:drop-shadow(0_0_7px_rgba(255,255,255,0.6))_drop-shadow(0_1px_2px_rgba(0,0,0,0.45))]",
        )}
      />
    </Link>
  );
}
