import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";

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
    title: pages.legal.privacy.meta.title,
    description: pages.legal.privacy.meta.description,
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { pages, site } = getContent(locale);
  const l = pages.legal;
  const d = l.privacy;

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
        image={IMAGES.heroFaq}
        imageAlt={d.hero.imageAlt}
      />

      <Section>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border-2 border-gold-500 bg-gold-500/10 p-6 sm:p-8">
                <h2 className="text-lg">{d.notice.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {d.notice.bodyPre}
                  <strong>{d.notice.bodyStrong}</strong>
                  {d.notice.bodyPost}
                </p>
              </div>

              <p className="mt-10 text-sm uppercase tracking-[0.16em] text-subtle-foreground">
                {l.lastUpdatedLabel(l.lastUpdated)}
              </p>

              <div className="mt-8 space-y-10">
                <section>
                  <h2 className="text-display-md">{d.whoWeAre.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {d.whoWeAre.body(site.name, site.address.full, site.url)}
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">{d.whatWeCollect.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {d.whatWeCollect.intro}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {d.whatWeCollect.items.map((item) => (
                      <li
                        key={item}
                        className="border-l-2 border-border pl-5 leading-relaxed text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 leading-relaxed text-muted-foreground">
                    {d.whatWeCollect.outro}
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">{d.howWeUse.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {d.howWeUse.body}
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">{d.whoWeShare.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {d.whoWeShare.body}
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">{d.howLong.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {d.howLong.body}
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">{d.cookies.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {d.cookies.body}
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">{d.yourChoices.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {d.yourChoices.bodyPre}
                    <a
                      href={`mailto:${site.email}`}
                      className="text-navy-700 underline underline-offset-4 hover:text-navy-600 dark:text-gold-400 dark:hover:text-gold-300"
                    >
                      {site.email}
                    </a>
                    {d.yourChoices.bodyPost}
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">{d.contact.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {d.contact.intro}
                  </p>
                  <ul className="mt-5 space-y-3 text-muted-foreground">
                    <li>
                      {l.contactLabels.email}{" "}
                      <a
                        href={`mailto:${site.email}`}
                        className="inline-flex min-h-11 items-center text-navy-700 underline underline-offset-4 hover:text-navy-600 dark:text-gold-400 dark:hover:text-gold-300"
                      >
                        {site.email}
                      </a>
                    </li>
                    <li>
                      {l.contactLabels.phone}{" "}
                      <a
                        href={`tel:${site.phoneHref}`}
                        className="inline-flex min-h-11 items-center text-navy-700 underline underline-offset-4 hover:text-navy-600 dark:text-gold-400 dark:hover:text-gold-300"
                      >
                        {site.phone}
                      </a>
                    </li>
                    <li>{l.contactLabels.post(site.address.full)}</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-display-md">{d.changes.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {d.changes.body}
                  </p>
                </section>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
