import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  [
    "group/btn relative inline-flex items-center justify-center gap-2",
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
          "bg-gold-500 text-navy-950 hover:bg-gold-300 shadow-[0_6px_24px_-8px_rgba(255,186,8,0.7)] hover:shadow-[0_10px_32px_-8px_rgba(255,186,8,0.85)]",
        navy: "bg-navy-700 text-white hover:bg-navy-600 shadow-[0_6px_24px_-10px_rgba(10,36,114,0.8)]",
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

type ButtonProps = VariantProps<typeof button> & {
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  className,
  variant,
  size,
  children,
  ...rest
}: ButtonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      className={cn(button({ variant, size }), className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Button({
  className,
  variant,
  size,
  children,
  ...rest
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(button({ variant, size }), className)} {...rest}>
      {children}
    </button>
  );
}
