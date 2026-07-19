import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";

import { getContent } from "@/content";
import { IMAGES } from "@/content/images";
import { isLocale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { pages } = getContent(locale);
  return {
    title: pages.contact.meta.title,
    description: pages.contact.meta.description,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { pages, site } = getContent(locale);
  const d = pages.contact;

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={d.hero.breadcrumb}
        eyebrow={d.hero.eyebrow}
        title={
          <>
            {d.hero.titleLead}
            <span className="text-gold-500">{d.hero.titleAccent}</span>
            {d.hero.titleTail}
          </>
        }
        lead={d.hero.lead}
        image={IMAGES.heroContact}
        imageAlt={d.hero.imageAlt}
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>{d.brief.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-display-md">{d.brief.title}</h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                  {d.brief.lead}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-10">
                  <ContactForm locale={locale} />
                </div>
              </Reveal>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-40 lg:self-start">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-border bg-surface p-8">
                  <h2 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.18em] text-subtle-foreground">
                    {d.sidebar.title}
                  </h2>

                  <ul className="mt-7 space-y-6">
                    <li className="flex items-start gap-4">
                      <Phone
                        aria-hidden
                        className="mt-0.5 size-5 shrink-0 text-gold-600 dark:text-gold-400"
                        strokeWidth={1.75}
                      />
                      <div>
                        <span className="block text-sm font-semibold">
                          {d.sidebar.phone}
                        </span>
                        <a
                          href={`tel:${site.phoneHref}`}
                          className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground underline-offset-4 hover:text-gold-700 dark:hover:text-gold-400"
                        >
                          {site.phone}
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <MessageCircle
                        aria-hidden
                        className="mt-0.5 size-5 shrink-0 text-gold-600 dark:text-gold-400"
                        strokeWidth={1.75}
                      />
                      <div>
                        <span className="block text-sm font-semibold">
                          {d.sidebar.whatsapp}
                        </span>
                        <a
                          href={`https://wa.me/${site.phoneHref.replace("+", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        >
                          {d.sidebar.whatsappLink}
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <Mail
                        aria-hidden
                        className="mt-0.5 size-5 shrink-0 text-gold-600 dark:text-gold-400"
                        strokeWidth={1.75}
                      />
                      <div className="min-w-0">
                        <span className="block text-sm font-semibold">
                          {d.sidebar.email}
                        </span>
                        <a
                          href={`mailto:${site.email}`}
                          className="break-all text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        >
                          {site.email}
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <MapPin
                        aria-hidden
                        className="mt-0.5 size-5 shrink-0 text-gold-600 dark:text-gold-400"
                        strokeWidth={1.75}
                      />
                      <div>
                        <span className="block text-sm font-semibold">
                          {d.sidebar.office}
                        </span>
                        <address className="text-sm not-italic text-muted-foreground">
                          {site.address.street}
                          <br />
                          {site.address.city}, {site.address.state}{" "}
                          {site.address.zip}
                        </address>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <Clock
                        aria-hidden
                        className="mt-0.5 size-5 shrink-0 text-gold-600 dark:text-gold-400"
                        strokeWidth={1.75}
                      />
                      <div>
                        <span className="block text-sm font-semibold">
                          {d.sidebar.turnaround}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {d.sidebar.turnaroundValue}
                        </span>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-8 border-t border-border pt-7">
                    <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.18em] text-subtle-foreground">
                      {d.sidebar.serviceArea}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {site.serviceArea}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="relative mt-6 overflow-hidden rounded-2xl bg-navy-800 p-8 text-white">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-blueprint opacity-60"
                  />
                  <div className="relative">
                    <p className="font-[family-name:var(--font-display)] text-lg leading-snug">
                      {d.stopWork.title}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-100">
                      {d.stopWork.body}
                    </p>
                    <a
                      href={`tel:${site.phoneHref}`}
                      className="mt-5 inline-flex min-h-11 items-center gap-2 font-[family-name:var(--font-display)] font-semibold text-gold-500 underline-offset-4 hover:underline"
                    >
                      <Phone aria-hidden className="size-4" />
                      {site.phone}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow={d.nextSteps.eyebrow}
            title={d.nextSteps.title}
          />

          <RevealGroup className="mt-16 grid gap-8 sm:grid-cols-3">
            {d.nextSteps.items.map((step) => (
              <RevealItem key={step.n}>
                <div className="border-t-2 border-gold-500 pt-6">
                  <span className="tabular font-[family-name:var(--font-display)] text-4xl font-bold text-foreground/15">
                    {step.n}
                  </span>
                  <h3 className="mt-4 text-lg">{step.t}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {step.b}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  );
}
