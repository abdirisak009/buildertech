import type { Metadata } from "next";
import { ArrowUpRight, Info, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

import { RESOURCES_INTRO, RESOURCE_CATEGORIES } from "@/content/resources";
import { IMAGES } from "@/content/images";

export const metadata: Metadata = {
  title: "Building Resources",
  description:
    "A directory of vetted local surveyors, inspectors, trades, suppliers and permit expeditors within 30 miles of our Decatur office. Builders Tech takes no commission from any provider listed.",
};

/** "404-973-5450" -> "+14049735450" for a tel: href. */
function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `tel:${digits.length === 10 ? `+1${digits}` : `+${digits}`}`;
}

const PROVIDER_COUNT = RESOURCE_CATEGORIES.reduce(
  (total, category) => total + category.providers.length,
  0,
);

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Building Resources"
        eyebrow="Local directory"
        title={
          <>
            The people we{" "}
            <span className="text-gold-500">actually call</span>.
          </>
        }
        lead={RESOURCES_INTRO}
        image={IMAGES.heroResources}
        imageAlt="An active residential construction site"
      >
        <p className="tabular mt-8 text-sm text-navy-200">
          {PROVIDER_COUNT} providers across {RESOURCE_CATEGORIES.length}{" "}
          categories
        </p>
      </PageHero>

      {/* ---------------- Jump nav ---------------- */}
      <section className="sticky top-0 z-30 border-b border-border bg-surface/90 py-4 backdrop-blur-md">
        <Container>
          <nav aria-label="Resource categories">
            <ul className="no-scrollbar flex gap-2 overflow-x-auto">
              {RESOURCE_CATEGORIES.map((category) => (
                <li key={category.id} className="shrink-0">
                  <a
                    href={`#${category.id}`}
                    className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full border border-border px-4 text-sm text-muted-foreground transition-colors duration-250 hover:border-border-strong hover:bg-surface-muted hover:text-foreground"
                  >
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      {/* ---------------- Disclaimer ---------------- */}
      <Section className="py-12 sm:py-14 lg:py-16">
        <Container>
          <Reveal>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface-muted p-6 sm:p-8">
              <span className="inline-grid size-11 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-700 dark:text-gold-400">
                <Info aria-hidden className="size-5" strokeWidth={2} />
              </span>
              <div>
                <h2 className="text-lg">No commission, no referral fees.</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Builders Tech takes no commission, kickback or referral fee
                  from any provider on this page. These are firms we have worked
                  alongside on real projects and would call again. Pricing,
                  licensing, insurance and scheduling are strictly between you
                  and the provider — please verify current credentials before you
                  hire.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------- Directory ---------------- */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="space-y-20">
            {RESOURCE_CATEGORIES.map((category) => (
              <div
                key={category.id}
                id={category.id}
                className="scroll-mt-28 border-t border-border pt-10"
              >
                <Reveal>
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <h2 className="text-display-md">{category.title}</h2>
                    <p className="tabular text-xs uppercase tracking-[0.16em] text-subtle-foreground">
                      {category.providers.length}{" "}
                      {category.providers.length === 1
                        ? "provider"
                        : "providers"}
                    </p>
                  </div>
                </Reveal>

                <RevealGroup
                  as="ul"
                  stagger={0.05}
                  className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {category.providers.map((provider) => (
                    <RevealItem
                      as="li"
                      key={provider.name}
                      className="h-full"
                    >
                      <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-[border-color,box-shadow] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:border-border-strong hover:shadow-[0_20px_50px_-30px_rgba(10,36,114,0.45)]">
                        <h3 className="text-lg leading-snug">{provider.name}</h3>

                        <div className="mt-5 flex flex-1 flex-col justify-end gap-2">
                          {provider.phone ? (
                            <a
                              href={telHref(provider.phone)}
                              className="tabular inline-flex min-h-11 items-center gap-2.5 text-sm font-semibold text-navy-700 transition-colors duration-250 hover:text-gold-700 dark:text-gold-400 dark:hover:text-gold-300"
                            >
                              <Phone
                                aria-hidden
                                className="size-4 shrink-0"
                                strokeWidth={2}
                              />
                              {provider.phone}
                              <span className="sr-only">
                                {" "}
                                — call {provider.name}
                              </span>
                            </a>
                          ) : (
                            <p className="inline-flex min-h-11 items-center text-sm text-subtle-foreground">
                              Nationwide retailer — find your nearest branch
                            </p>
                          )}

                          {provider.url && (
                            <a
                              href={provider.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link inline-flex min-h-11 items-center gap-2.5 text-sm font-semibold text-muted-foreground transition-colors duration-250 hover:text-foreground"
                            >
                              <ArrowUpRight
                                aria-hidden
                                className="size-4 shrink-0 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                strokeWidth={2}
                              />
                              Visit website
                              <span className="sr-only">
                                {" "}
                                for {provider.name} (opens in a new tab)
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------- Suggest a provider ---------------- */}
      <Section tone="muted">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow align="center">Keeping it current</Eyebrow>
              <h2 className="mt-5 text-display-md">
                Know someone who belongs here?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                This directory changes as we work. If a listing is out of date,
                or you have worked with a surveyor, inspector or trade in the
                Atlanta metro who does consistently good work, tell us and we
                will look into adding them.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaSection
        eyebrow="Need more than a phone number?"
        title="Let us coordinate it for you."
        lead="Managing surveyors, inspectors and trades is what our project management service does. Tell us about the project and we will tell you which of these you actually need."
      />
    </>
  );
}
