"use client";

import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import type { Locale } from "@/i18n/config";

type ScheduleCtaProps = {
  locale: Locale;
  label: string;
  className?: string;
  variant?: "primary" | "navy" | "outline" | "ghost" | "light";
  size?: "md" | "sm" | "lg";
  showArrow?: boolean;
  /** Override the destination (defaults to the intake page). */
  href?: string;
  onClick?: () => void;
};

/**
 * Navigates to the Client Intake Form page. (Previously opened a modal; the
 * form now lives on its own simple, mobile-first page.)
 */
export function ScheduleCta({
  locale,
  label,
  className,
  variant = "primary",
  size = "md",
  showArrow = true,
  href,
  onClick,
}: ScheduleCtaProps) {
  const target = href ?? `/${locale}/get-started`;

  return (
    <ButtonLink
      href={target}
      className={className}
      variant={variant}
      size={size}
      onClick={onClick}
    >
      {label}
      {showArrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      )}
    </ButtonLink>
  );
}
