import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

/**
 * The BT hexagon mark only (no wordmark). The artwork is gold + navy on a
 * transparent field, which reads on light surfaces. On dark surfaces we knock
 * it out to a clean white silhouette via a CSS filter so it stays legible.
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
  variant?: "auto" | "light" | "onDark";
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
        )}
      />
    </Link>
  );
}
