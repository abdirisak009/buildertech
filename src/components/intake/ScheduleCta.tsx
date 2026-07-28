"use client";

import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useOptionalIntake } from "@/components/intake/IntakeProvider";
import { ButtonLink } from "@/components/ui/Button";
import type { Locale } from "@/i18n/config";

const button = cva(
  [
    "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "min-h-12 rounded-full px-7 text-[0.9375rem] font-semibold",
    "font-[family-name:var(--font-display)] tracking-tight",
    "transition-[background-color,color,border-color,transform,box-shadow] duration-250",
    "ease-[cubic-bezier(0.22,0.61,0.36,1)]",
    "active:translate-y-px cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-orange-500 text-white hover:bg-orange-400 shadow-[0_6px_24px_-8px_rgba(232,120,56,0.7)] hover:shadow-[0_10px_32px_-8px_rgba(232,120,56,0.85)]",
        navy: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.8)]",
        outline:
          "border-2 border-current bg-transparent hover:bg-current/10",
        ghost: "bg-transparent hover:bg-foreground/5",
        light:
          "bg-white text-navy-800 hover:bg-gold-100 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.4)]",
      },
      size: {
        md: "min-h-12 px-7",
        sm: "min-h-11 px-5 text-sm",
        lg: "min-h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ScheduleCtaProps = VariantProps<typeof button> & {
  locale: Locale;
  label: string;
  className?: string;
  showArrow?: boolean;
  /** Fallback href when IntakeProvider is not mounted */
  href?: string;
  onClick?: () => void;
};

/**
 * Opens the Client Intake Form modal. Falls back to /contact if the
 * provider is not available (e.g. isolated render).
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
  const intake = useOptionalIntake();
  const fallback = href ?? `/${locale}/contact#intake`;

  if (!intake) {
    return (
      <ButtonLink
        href={fallback}
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

  return (
    <button
      type="button"
      className={cn(button({ variant, size }), className)}
      onClick={() => {
        onClick?.();
        intake.openIntake();
      }}
    >
      {label}
      {showArrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      )}
    </button>
  );
}
