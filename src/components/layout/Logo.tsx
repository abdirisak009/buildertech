import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

/**
 * The supplied logo artwork is navy + gold on transparent, which reads well on
 * light surfaces. On dark surfaces we swap in a knocked-out white version via
 * a CSS filter so the wordmark stays legible.
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
        src="/logo.png"
        alt="Builders Tech — Design. Manage. Build."
        width={4236}
        height={1095}
        priority={priority}
        className={cn(
          "h-9 w-auto sm:h-10",
          variant === "onDark" && "brightness-0 invert",
          variant === "auto" && "dark:brightness-0 dark:invert",
        )}
      />
    </Link>
  );
}
