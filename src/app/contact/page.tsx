import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";

import { SITE } from "@/content/site";
import { IMAGES } from "@/content/images";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Free consultation with Builders Tech. Call 404-542-4280, email us, or send your project details. Permit-ready plans in 10 business days across metro Atlanta.",
};

const NEXT_STEPS = [
  {
    n: "01",
    t: "We read your brief",
    b: "A designer — not a call centre — reads what you sent and checks it against what the county will actually allow on that parcel.",
  },
  {
    n: "02",
    t: "Free consultation",
    b: "We call you back to talk through scope, site and budget, and give you an honest view of what is realistic.",
  },
  {
    n: "03",
    t: "Written quote",
    b: "A fixed quote for the drawing set you need. Approve it and your plans are ready in 10 business days.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb="Contact"
        eyebrow="Free consultation"
        title={
          <>
            Schedule your project{" "}
            <span className="text-gold-500">today</span>.
          </>
        }
        lead="Tell us what you are building. We offer free consultations to discuss your project and provide expert advice — no obligation, no sales pitch."
        image={IMAGES.heroContact}
        imageAlt="A modern residential building seen from below"
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>Project brief</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-display-md">Send us the details.</h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                  The more you can tell us up front, the more useful our first
                  reply will be. Nothing here is a commitment.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-10">
                  <ContactForm />
                </div>
              </Reveal>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-40 lg:self-start">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-border bg-surface p-8">
                  <h2 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.18em] text-subtle-foreground">
                    Direct contact
                  </h2>

                  <ul className="mt-7 space-y-6">
                    <li className="flex items-start gap-4">
                      <Phone
                        aria-hidden
                        className="mt-0.5 size-5 shrink-0 text-gold-600 dark:text-gold-400"
                        strokeWidth={1.75}
                      />
                      <div>
                        <span className="block text-sm font-semibold">Phone</span>
                        <a
                          href={`tel:${SITE.phoneHref}`}
                          className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground underline-offset-4 hover:text-gold-700 dark:hover:text-gold-400"
                        >
                          {SITE.phone}
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
                          WhatsApp
                        </span>
                        <a
                          href={`https://wa.me/${SITE.phoneHref.replace("+", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        >
                          Message us on WhatsApp
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
                        <span className="block text-sm font-semibold">Email</span>
                        <a
                          href={`mailto:${SITE.email}`}
                          className="break-all text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        >
                          {SITE.email}
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
                        <span className="block text-sm font-semibold">Office</span>
                        <address className="text-sm not-italic text-muted-foreground">
                          {SITE.address.street}
                          <br />
                          {SITE.address.city}, {SITE.address.state}{" "}
                          {SITE.address.zip}
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
                          Turnaround
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Permit-ready plans in 10 business days
                        </span>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-8 border-t border-border pt-7">
                    <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.18em] text-subtle-foreground">
                      Service area
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {SITE.serviceArea}
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
                      Got a Stop Work Order?
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-100">
                      Call us first, before anything else. We produce the
                      documentation that gets the red tag lifted and your project
                      moving again.
                    </p>
                    <a
                      href={`tel:${SITE.phoneHref}`}
                      className="mt-5 inline-flex min-h-11 items-center gap-2 font-[family-name:var(--font-display)] font-semibold text-gold-500 underline-offset-4 hover:underline"
                    >
                      <Phone aria-hidden className="size-4" />
                      {SITE.phone}
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
            eyebrow="What happens next"
            title="Three steps, no sales pitch."
          />

          <RevealGroup className="mt-16 grid gap-8 sm:grid-cols-3">
            {NEXT_STEPS.map((step) => (
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
