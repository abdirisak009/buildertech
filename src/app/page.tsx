import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote, Star, Clock, MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { HomeHero } from "@/components/sections/HomeHero";
import { CtaSection } from "@/components/sections/CtaSection";

import { SITE } from "@/content/site";
import { SERVICES, HEADLINE_OFFERS, WORK_CATEGORIES } from "@/content/services";
import { WHY_CHOOSE_US, TESTIMONIALS, APPROACH } from "@/content/about";
import { PRODUCTS } from "@/content/products";
import { IMAGES } from "@/content/images";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* ---------------- Three headline offers ---------------- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Where to start"
            title="Three ways we get involved."
            lead="Most projects reach us in one of three states: urgently stalled, still an idea, or ready to build."
          />

          <RevealGroup className="mt-16 grid gap-5 lg:grid-cols-3">
            {HEADLINE_OFFERS.map((offer, i) => (
              <RevealItem key={offer.slug} as="article" className="h-full">
                <Link
                  href={offer.href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-8 transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_24px_60px_-28px_rgba(10,36,114,0.45)]"
                >
                  <span
                    aria-hidden
                    className="tabular font-[family-name:var(--font-display)] text-5xl font-bold text-foreground/12"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-xl">{offer.title}</h3>
                  <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">
                    {offer.body}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-sm font-semibold text-navy-700 dark:text-gold-400">
                    Learn more
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------- Services grid ---------------- */}
      <Section tone="muted">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeader
              eyebrow="What we do"
              title="Seven services, one team."
              lead="Design, engineering, documentation and delivery — appoint us for a single plan set or the whole build."
              maxWidth="max-w-2xl"
            />
            <Reveal delay={0.2}>
              <ButtonLink href="/services" variant="outline">
                All services
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </ButtonLink>
            </Reveal>
          </div>

          <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <RevealItem key={service.slug} as="article" className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_24px_60px_-28px_rgba(10,36,114,0.45)]"
                  >
                    <span className="inline-grid size-12 place-items-center rounded-xl bg-gold-500/15 text-gold-700 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950 dark:text-gold-400">
                      <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-6 text-xl">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.short}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-sm font-semibold text-navy-700 dark:text-gold-400">
                      Learn more
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------- Approach ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <Reveal direction="right">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src={IMAGES.studioTeam}
                  alt="A project team reviewing plans and figures around a table"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/45 to-transparent"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <Eyebrow>{APPROACH.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-display-lg">
                  Great things, made <span className="text-gold-600 dark:text-gold-400">simple</span>.
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
                  {APPROACH.lead}
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  {APPROACH.body}
                </p>
              </Reveal>

              <RevealGroup as="ul" delay={0.3} className="mt-9 space-y-4">
                {[
                  { icon: Clock, text: "Permit-ready plans in 10 business days" },
                  { icon: Star, text: "134+ five-star reviews across three platforms" },
                  { icon: MapPin, text: SITE.serviceArea },
                ].map(({ icon: Icon, text }) => (
                  <RevealItem as="li" key={text}>
                    <div className="flex items-start gap-3.5">
                      <Icon
                        aria-hidden
                        className="mt-0.5 size-5 shrink-0 text-gold-600 dark:text-gold-400"
                        strokeWidth={1.75}
                      />
                      <span className="text-muted-foreground">{text}</span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal delay={0.38}>
                <ButtonLink href="/how-it-works" variant="navy" className="mt-9">
                  How it works
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Work categories ---------------- */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
        <div
          aria-hidden
          className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-gold-500/12 blur-[120px]"
        />
        <Container className="relative">
          <Reveal>
            <Eyebrow className="text-navy-200">Our work</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 max-w-3xl text-display-lg">
              No project is too big or too small.
            </h2>
          </Reveal>

          <RevealGroup as="ul" delay={0.16} stagger={0.04} className="mt-12 flex flex-wrap gap-2.5">
            {WORK_CATEGORIES.map((category) => (
              <RevealItem as="li" key={category}>
                <span className="inline-flex rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm text-navy-100 backdrop-blur-sm">
                  {category}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------------- Why choose us ---------------- */}
      <Section>
        <Container>
          <SectionHeader eyebrow="Why choose us" title="Local, proven, fast." />

          <RevealGroup className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-3">
            {WHY_CHOOSE_US.map((item) => (
              <RevealItem key={item.number}>
                <div className="border-t-2 border-gold-500 pt-6">
                  <span className="tabular font-[family-name:var(--font-display)] text-5xl font-bold text-foreground/15">
                    {item.number}
                  </span>
                  <h3 className="mt-4 text-lg">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------- Stock plans teaser ---------------- */}
      <Section tone="muted">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeader
              eyebrow="Products"
              title="Ready-to-build stock plans."
              lead="Standard geometry, professional drawings, instant delivery. Buy a plan set today and start pulling permits."
              maxWidth="max-w-2xl"
            />
            <Reveal delay={0.2}>
              <ButtonLink href="/products/stock-plans" variant="outline">
                Browse stock plans
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </ButtonLink>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product) => (
              <RevealItem key={product.slug} className="h-full">
                <Link
                  href="/products/stock-plans"
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-gold-500"
                >
                  <span className="text-xs uppercase tracking-[0.14em] text-subtle-foreground">
                    {product.size}
                  </span>
                  <h3 className="mt-2 text-base leading-snug">{product.name}</h3>
                  <span className="tabular mt-auto pt-6 font-[family-name:var(--font-display)] text-2xl font-bold text-gold-600 dark:text-gold-400">
                    ${product.price.toLocaleString("en-US")}
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------- Testimonial ---------------- */}
      <Section>
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Client feedback"
            title="134+ five-star reviews."
            maxWidth="max-w-2xl"
          />

          <RevealGroup className="mx-auto mt-14 max-w-3xl">
            {TESTIMONIALS.map((t) => (
              <RevealItem key={t.author}>
                <figure className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
                  <Quote
                    aria-hidden
                    className="mx-auto size-8 text-gold-500"
                    strokeWidth={1.5}
                  />
                  <blockquote className="mt-6">
                    <p className="font-[family-name:var(--font-display)] text-xl leading-snug tracking-tight sm:text-2xl">
                      “{t.quote}”
                    </p>
                  </blockquote>
                  <figcaption className="mt-8 text-sm">
                    <span className="block font-semibold text-foreground">
                      {t.author}
                    </span>
                    <span className="text-subtle-foreground">{t.context}</span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
