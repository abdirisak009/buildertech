import Image from "next/image";
import { ArrowRight, Phone, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { SITE, STATS } from "@/content/site";
import { IMAGES } from "@/content/images";

export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy-950 text-white">
      <Image
        src={IMAGES.heroHome}
        alt="Architectural floor plans and blueprints laid out on a drafting table"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/88 to-navy-950/60"
      />
      <div aria-hidden className="absolute inset-0 bg-blueprint opacity-70" />
      <div
        aria-hidden
        className="absolute -right-40 top-10 h-[42rem] w-[42rem] rounded-full bg-gold-500/14 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
      />

      <Container className="relative pb-16 pt-36 sm:pb-20 sm:pt-44">
        <Reveal>
          <Eyebrow className="text-navy-200">{SITE.headline}</Eyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-8 max-w-[14ch] text-display-xl">
            Design. Manage. <span className="text-gold-500">Build.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-6 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-gold-500 sm:text-3xl">
            {SITE.motto}
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl">
            {SITE.subhead} From a deck permit to a townhome development, Builders
            Tech delivers permit-ready plans in 10 business days — and can manage
            the build from there.
          </p>
        </Reveal>

        <Reveal delay={0.34}>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="lg">
              {SITE.cta}
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </ButtonLink>
            <ButtonLink
              href={`tel:${SITE.phoneHref}`}
              variant="outline"
              size="lg"
              className="text-white"
            >
              <Phone aria-hidden className="size-4" />
              {SITE.phone}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.42}>
          <div className="mt-8 flex items-center gap-3">
            <span className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-gold-500 text-gold-500" />
              ))}
            </span>
            <span className="text-sm text-navy-200">
              134+ five-star reviews on Google, Thumbtack &amp; Bark
            </span>
          </div>
        </Reveal>

        <RevealGroup
          as="div"
          delay={0.5}
          stagger={0.1}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-9 border-t border-white/15 pt-10 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <RevealItem key={stat.label}>
              <dl>
                <dt className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-gold-500 sm:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dt>
                <dd className="mt-2 text-xs uppercase tracking-[0.14em] text-navy-200">
                  {stat.label}
                </dd>
              </dl>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
