import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SITE } from "@/content/site";

export function CtaSection({
  eyebrow = "Free consultation",
  title = "Schedule your project today.",
  lead = "Tell us what you are building. We'll give you a free consultation, an honest opinion on what your budget will actually cover, and permit-ready plans in 10 business days.",
  primary = { href: "/contact", label: "Schedule Your Project" },
  showPhone = true,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  primary?: { href: string; label: string };
  showPhone?: boolean;
}) {
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
              <Eyebrow className="text-navy-200">{eyebrow}</Eyebrow>
              <h2 className="mt-6 text-display-lg">{title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-100">{lead}</p>

              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={primary.href} size="lg">
                  {primary.label}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </ButtonLink>
                {showPhone && (
                  <ButtonLink
                    href={`tel:${SITE.phoneHref}`}
                    variant="outline"
                    size="lg"
                    className="text-white"
                  >
                    <Phone aria-hidden className="size-4" />
                    {SITE.phone}
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
