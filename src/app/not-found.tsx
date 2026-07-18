import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
      <div
        aria-hidden
        className="absolute -right-32 top-0 h-[32rem] w-[32rem] rounded-full bg-gold-500/12 blur-[120px]"
      />
      <Container className="relative py-24">
        <Eyebrow className="text-navy-200">Error 404</Eyebrow>
        <h1 className="mt-6 max-w-[16ch] text-display-lg">
          This page was never <span className="text-gold-500">drawn</span>.
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-navy-100">
          The address you followed does not exist on this site. Head back to the
          homepage, or tell us what you were looking for and we will point you at
          it.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            <ArrowLeft aria-hidden className="size-4" />
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg" className="text-white">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
