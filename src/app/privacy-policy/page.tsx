import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";

import { SITE } from "@/content/site";
import { IMAGES } from "@/content/images";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Builders Tech collects, uses and protects the information you share when you request a consultation or contact us about a project.",
};

const LAST_UPDATED = "18 July 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        breadcrumb="Privacy Policy"
        eyebrow="Legal"
        title={
          <>
            Privacy <span className="text-gold-500">policy</span>.
          </>
        }
        lead="What we collect when you contact us about a project, why we collect it, and how to ask us to delete it."
        image={IMAGES.heroFaq}
        imageAlt="Atlanta skyline at dusk"
      />

      <Section>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border-2 border-gold-500 bg-gold-500/10 p-6 sm:p-8">
                <h2 className="text-lg">Template text — not yet legal advice</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  This page is placeholder content written to describe how a
                  small design and construction firm typically handles personal
                  information. It has <strong>not</strong> been reviewed by an
                  attorney and must be checked by a legal professional against
                  Georgia and federal requirements before this site goes live.
                </p>
              </div>

              <p className="mt-10 text-sm uppercase tracking-[0.16em] text-subtle-foreground">
                Last updated {LAST_UPDATED}
              </p>

              <div className="mt-8 space-y-10">
                <section>
                  <h2 className="text-display-md">Who we are</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {SITE.name} is a design and construction management firm
                    based at {SITE.address.full}. This policy covers the
                    information we collect through {SITE.url} and through direct
                    enquiries by phone, email or WhatsApp.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">What we collect</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    We only ask for what we need to quote and deliver work:
                  </p>
                  <ul className="mt-5 space-y-3">
                    {[
                      "Contact details you give us — name, email address, phone number.",
                      "Project details you choose to send — property address, plot dimensions, intended use, budget range, and any drawings or photographs you attach.",
                      "Basic technical information your browser sends when you visit the site, such as page views and approximate location, used only to understand which pages are useful.",
                    ].map((item) => (
                      <li
                        key={item}
                        className="border-l-2 border-border pl-5 leading-relaxed text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 leading-relaxed text-muted-foreground">
                    We do not collect payment card details through this website,
                    and we do not knowingly collect information from children.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">How we use it</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Your information is used to respond to your enquiry, prepare
                    a quote, produce and deliver drawings, and keep records of
                    the work we have done for you. We may contact you about a
                    live project without asking again, because that contact is
                    part of the service. We do not sell your information, and we
                    do not add you to marketing lists unless you ask us to.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">Who we share it with</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    We share project information only where the work requires
                    it — for example with engineers, surveyors or contractors
                    working on your project, or with a municipality when a
                    permit application depends on it. We also use ordinary
                    business software, such as email and cloud storage
                    providers, which necessarily process this information on our
                    behalf. We may disclose information where the law requires
                    it.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">How long we keep it</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Enquiries that do not become projects are kept for a limited
                    period and then deleted. Project records, including drawing
                    sets, are kept for longer because construction documentation
                    may be needed years later for insurance, warranty or
                    resale purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">Cookies and analytics</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    This site uses only the cookies needed for it to function,
                    plus any privacy-respecting analytics we may add to count
                    page views. We do not run advertising trackers. Your browser
                    settings can block cookies entirely; the site will still
                    work.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">Your choices</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    You can ask us what information we hold about you, ask us to
                    correct it, or ask us to delete it. Email{" "}
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-navy-700 underline underline-offset-4 hover:text-navy-600 dark:text-gold-400 dark:hover:text-gold-300"
                    >
                      {SITE.email}
                    </a>{" "}
                    and we will respond. Where a request would require us to
                    delete records we are obliged to keep, we will explain why.
                  </p>
                </section>

                <section>
                  <h2 className="text-display-md">Contact us</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Questions about this policy or about your data:
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
                  <h2 className="text-display-md">Changes to this policy</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    If we change how we handle information we will update this
                    page and the date shown above. Material changes affecting an
                    active project will be communicated to you directly.
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
