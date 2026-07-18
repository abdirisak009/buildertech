import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Reveal } from "@/components/motion/Reveal";

export function Section({
  className,
  children,
  id,
  tone = "default",
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  tone?: "default" | "muted" | "navy";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 sm:py-28 lg:py-32",
        tone === "muted" && "bg-surface-muted",
        tone === "navy" && "bg-navy-900 text-white",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-[family-name:var(--font-display)]",
        "text-xs font-semibold uppercase tracking-[0.2em] text-subtle-foreground",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-gold-500" />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  maxWidth = "max-w-3xl",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  maxWidth?: string;
}) {
  return (
    <div
      className={cn(
        maxWidth,
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow align={align}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="mt-5 text-display-lg">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-6 text-lg leading-relaxed text-muted-foreground",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export { Container };
