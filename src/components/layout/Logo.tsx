import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/content/site";

/**
 * The supplied logo artwork is navy + gold on transparent, which reads well on
 * light surfaces. On dark surfaces we swap in a knocked-out white version via
 * a CSS filter so the wordmark stays legible.
 */
export function Logo({
  className,
  variant = "auto",
  priority,
}: {
  className?: string;
  variant?: "auto" | "light" | "onDark";
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.name} — home`}
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src="/logo.png"
        alt={`${SITE.name} — ${SITE.tagline}`}
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
