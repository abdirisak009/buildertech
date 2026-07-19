import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight, AlertTriangle } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

import { getContent } from "@/content";
import { SERVICES as SERVICES_EN } from "@/content/en/services";
import { LOCALES, isLocale } from "@/i18n/config";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SERVICES_EN.map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const { getService } = getContent(locale);
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.short,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const { site, services, getService, pages } = getContent(locale);
  const copy = pages.serviceDetail;

  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);
  const isStopWork = slug === "stop-work-orders";

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={service.title}
        eyebrow={service.title}
        title={service.headline}
        lead={service.lead}
        image={service.image}
        imageAlt={copy.imageAlt(service.title)}
      />

      {/* ---------------- Proof stats (renderings) ---------------- */}
      {service.proof && (
        <section className="border-b border-border bg-surface-muted py-16">
          <Container>
            <RevealGroup className="grid gap-10 sm:grid-cols-3">
              {service.proof.map((p) => (
                <RevealItem key={p.label}>
                  <dl>
                    <dt className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-gold-600 dark:text-gold-400">
                      {p.value}
                    </dt>
                    <dd className="mt-3 leading-relaxed text-muted-foreground">
                      {p.label}
                    </dd>
                  </dl>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>
      )}

      {/* ---------------- Stop work order warning ---------------- */}
      {isStopWork && (
        <Section>
          <Container>
            <Reveal>
              <div className="rounded-2xl border-2 border-gold-500 bg-gold-500/8 p-8 sm:p-10">
                <div className="flex items-start gap-4">
                  <AlertTriangle
                    aria-hidden
                    className="mt-1 size-6 shrink-0 text-gold-700 dark:text-gold-400"
                    strokeWidth={2}
                  />
                  <div>
                    <h2 className="text-xl">{copy.stopWork.title}</h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {copy.stopWork.body}
                    </p>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {copy.stopWork.bodySecondary}
                    </p>
                    <ButtonLink href={`tel:${site.phoneHref}`} className="mt-7">
                      {copy.stopWork.callLabel(site.phone)}
                    </ButtonLink>
                    <p className="mt-4 font-[family-name:var(--font-display)] text-sm font-semibold">
                      {copy.stopWork.note}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* ---------------- Scope ---------------- */}
      <Section tone={service.proof ? "default" : isStopWork ? "muted" : "default"}>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-40 lg:self-start">
              <Reveal>
                <Eyebrow>
                  {isStopWork
                    ? copy.scope.eyebrowStopWork
                    : copy.scope.eyebrow(service.title)}
                </Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-display-md">
                  {isStopWork ? copy.scope.titleStopWork : copy.scope.title}
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <ButtonLink
                  href={`/${locale}/contact`}
                  variant="navy"
                  className="mt-9"
                >
                  {site.cta}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </ButtonLink>
              </Reveal>
            </div>

            <RevealGroup as="ul" className="space-y-4">
              {service.items.map((item) => (
                <RevealItem as="li" key={item.title}>
                  <div className="flex gap-4 rounded-2xl border border-border bg-surface p-6">
                    <Check
                      aria-hidden
                      className="mt-1 size-5 shrink-0 text-gold-600 dark:text-gold-400"
                      strokeWidth={2.5}
                    />
                    <div>
                      <h3 className="text-lg">{item.title}</h3>
                      {item.body && (
                        <p className="mt-2 leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      )}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* ---------------- Secondary group (inspections) ---------------- */}
      {service.secondary && (
        <Section tone="navy">
          <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
          <Container className="relative">
            <Reveal>
              <Eyebrow className="text-navy-200">{copy.secondary.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-3xl text-display-lg">
                {service.secondary.heading}
              </h2>
            </Reveal>

            <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2">
              {service.secondary.items.map((item) => (
                <RevealItem key={item.title}>
                  <div className="h-full rounded-2xl border border-white/12 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-gold-500/50">
                    <h3 className="text-lg text-white">{item.title}</h3>
                    {item.body && (
                      <p className="mt-3 leading-relaxed text-navy-100">
                        {item.body}
                      </p>
                    )}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      {/* ---------------- Other services ---------------- */}
      <Section tone="muted">
        <Container>
          <Reveal>
            <Eyebrow>{copy.others.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-display-md">{copy.others.title}</h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-3">
            {others.map((other) => {
              const Icon = other.icon;
              return (
                <RevealItem key={other.slug} className="h-full">
                  <Link
                    href={`/${locale}/services/${other.slug}`}
                    className="group flex h-full gap-4 rounded-2xl border border-border bg-surface p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-gold-500"
                  >
                    <span className="inline-grid size-11 shrink-0 place-items-center rounded-lg bg-gold-500/15 text-gold-700 dark:text-gold-400">
                      <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                    </span>
                    <span>
                      <span className="block font-[family-name:var(--font-display)] font-semibold tracking-tight">
                        {other.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {other.short}
                      </span>
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}
