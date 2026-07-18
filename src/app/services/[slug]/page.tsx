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

import { SERVICES, getService } from "@/content/services";
import { SITE } from "@/content/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);
  const isStopWork = slug === "stop-work-orders";

  return (
    <>
      <PageHero
        breadcrumb={service.title}
        eyebrow={service.title}
        title={service.headline}
        lead={service.lead}
        image={service.image}
        imageAlt={`${service.title} — Builders Tech`}
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
                    <h2 className="text-xl">
                      Ignoring a Stop Work Order can result in fines, legal
                      penalties, or permit revocation.
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      No further work can continue until the identified issues
                      are corrected, proper approvals are obtained, and the order
                      is lifted by the issuing agency.
                    </p>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      Builders Tech specialises in providing the documentation
                      that helps get the Stop Work Order removed and gets your
                      project back on track.
                    </p>
                    <ButtonLink href={`tel:${SITE.phoneHref}`} className="mt-7">
                      Call {SITE.phone}
                    </ButtonLink>
                    <p className="mt-4 font-[family-name:var(--font-display)] text-sm font-semibold">
                      Don&apos;t let a red tag stop your project.
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
                  {isStopWork ? "Why orders get issued" : `Our ${service.title.toLowerCase()} include`}
                </Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-display-md">
                  {isStopWork
                    ? "A Stop Work Order typically follows one of three things."
                    : "What you get."}
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <ButtonLink href="/contact" variant="navy" className="mt-9">
                  {SITE.cta}
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
              <Eyebrow className="text-navy-200">Also available</Eyebrow>
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
            <Eyebrow>Keep exploring</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-display-md">Other services.</h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-3">
            {others.map((other) => {
              const Icon = other.icon;
              return (
                <RevealItem key={other.slug} className="h-full">
                  <Link
                    href={`/services/${other.slug}`}
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

      <CtaSection />
    </>
  );
}
