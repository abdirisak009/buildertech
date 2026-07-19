import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { getContent } from "@/content";
import type { Locale } from "@/i18n/config";

export function CtaSection({
  locale,
  eyebrow,
  title,
  lead,
  primary,
  showPhone = true,
}: {
  locale: Locale;
  eyebrow?: string;
  title?: string;
  lead?: string;
  primary?: { href: string; label: string };
  showPhone?: boolean;
}) {
  const { site, pages } = getContent(locale);
  const d = pages.cta;

  const primaryCta = primary ?? {
    href: "/contact",
    label: d.primaryLabel,
  };

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-navy-900 px-6 py-16 text-white sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
            <div
              aria-hidden
              className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-gold-500/18 blur-[110px]"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
            />

            <div className="relative max-w-3xl">
              <Eyebrow className="text-navy-200">{eyebrow ?? d.eyebrow}</Eyebrow>
              <h2 className="mt-6 text-display-lg">{title ?? d.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-100">
                {lead ?? d.lead}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={`/${locale}${primaryCta.href}`} size="lg">
                  {primaryCta.label}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </ButtonLink>
                {showPhone && (
                  <ButtonLink
                    href={`tel:${site.phoneHref}`}
                    variant="outline"
                    size="lg"
                    className="text-white"
                  >
                    <Phone aria-hidden className="size-4" />
                    {site.phone}
                  </ButtonLink>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
