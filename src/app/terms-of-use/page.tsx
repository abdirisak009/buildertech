import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";

import { SITE } from "@/content/site";
import { IMAGES } from "@/content/images";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that apply to using the Builders Tech website, including what our published information does and does not commit us to.",
};

const LAST_UPDATED = "18 July 2026";

export default function TermsOfUsePage() {
  return (
    <>
      <PageHero
        breadcrumb="Terms of Use"
        eyebrow="Legal"
        title={
          <>
            Terms of <span className="text-gold-500">use</span>.
          </>
        }
        lead="What this website is, what it is not, and the terms that apply when you use it or send us an enquiry."
        image={IMAGES.heroServices}
        imageAlt="Abstract view of a glass building façade"
      />

      <Section>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border-2 border-gold-500 bg-gold-500/10 p-6 sm:p-8">
                <h2 className="text-lg">Template text — not yet legal advice</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  This page is placeholder content written to reflect how a
                  small design and construction firm typically sets out website
                  terms. It has <strong>not</strong> been reviewed by an
                  attorney and must be checked by a legal professional against
                  Georgia and federal requirements before this site goes live.
                </p>
              </div>

              <p className="mt-10 text-sm uppercase tracking-[0.16em] text-subtle-foreground">
                Last updated {LAST_UPDATED}
              </p>

              <div className="mt-8 space-y-10">
                <section>
                  <h2 className="text-display-md">Accepting these terms</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    By using {SITE.url} you agree to these terms. If you do not
                    agree with them, please do not use the site. These terms
                    cover the website only — work we carry out for you is
                    governed by the separate written contract you sign with{" "}
                    {SITE.name}.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">
                    The site is information, not advice
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Pages describing permits, timelines, code requirements and
                    costs are general guidance written for a broad audience.
                    Building codes, zoning rules and county review processes
                    differ between jurisdictions and change over time. Nothing
                    here is architectural, engineering or legal advice for your
                    specific property, and you should not rely on it to make a
                    construction decision. Ask us — or a licensed professional —
                    about your actual project first.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">Quotes and timelines</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Prices, ranges and turnaround times shown on this site are
                    indicative. Our stated ten-business-day turnaround for
                    drawing sets applies once we have the information and
                    deposit needed to begin, and to scopes of the kind
                    described. A binding quote is only the written quote we send
                    you for your project.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">Permit submissions</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    We produce permit-ready documentation. We do not submit
                    applications to municipalities on your behalf, and we cannot
                    guarantee the outcome or timing of any authority&rsquo;s
                    review. Where a reviewer returns comments on a set we
                    produced, we will help address them as set out in your
                    contract.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">
                    Intellectual property
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    The text, layout, photography and drawings shown on this
                    site belong to {SITE.name} or are used with permission. You
                    may view and print pages for your own reference. You may not
                    republish, resell or reuse them commercially without our
                    written consent. Rights in drawings we produce for a client
                    are dealt with in that client&rsquo;s contract, not here.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">Using the site properly</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Please do not attempt to disrupt the site, access parts of
                    it you are not authorised to reach, scrape it at volume, or
                    submit anything unlawful, misleading or infringing through
                    our contact forms. Information you send us should be yours
                    to send.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">Links to other sites</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    We link to third parties such as surveyors, inspectors,
                    trades and suppliers because we have found them useful. We
                    do not control those sites and are not responsible for their
                    content, their services or their privacy practices.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">Liability</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    The site is provided as it is. To the fullest extent
                    permitted by law, {SITE.name} is not liable for loss arising
                    from reliance on general information published here. Nothing
                    in these terms limits any liability that cannot lawfully be
                    limited, and nothing here reduces our obligations under a
                    signed client contract.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">Governing law</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    These terms are governed by the laws of the State of
                    Georgia, and the courts of Georgia have jurisdiction over
                    any dispute arising from use of this site.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">Contact us</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Questions about these terms:
                  </p>
                  <ul className="mt-5 space-y-3 text-muted-foreground">
                    <li>
                      Email:{" "}
                      <a
                        href={`mailto:${SITE.email}`}
                        className="inline-flex min-h-11 items-center text-navy-700 underline underline-offset-4 hover:text-navy-600 dark:text-gold-400 dark:hover:text-gold-300"
                      >
                        {SITE.email}
                      </a>
                    </li>
                    <li>
                      Phone:{" "}
                      <a
                        href={`tel:${SITE.phoneHref}`}
                        className="inline-flex min-h-11 items-center text-navy-700 underline underline-offset-4 hover:text-navy-600 dark:text-gold-400 dark:hover:text-gold-300"
                      >
                        {SITE.phone}
                      </a>
                    </li>
                    <li>Post: {SITE.address.full}</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-display-md">Changes to these terms</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    We may update these terms. The date above shows when they
                    last changed, and continuing to use the site after a change
                    means you accept the updated terms.
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
