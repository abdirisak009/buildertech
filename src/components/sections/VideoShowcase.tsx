"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

/**
 * A polished YouTube showcase card. The video autoplays muted on load (so
 * browsers allow it) and loops; viewers can unmute with the player controls.
 */
export function VideoShowcase({
  eyebrow,
  title,
  lead,
  youtubeId,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  youtubeId: string;
  playLabel: string;
}) {
  const embed =
    `https://www.youtube-nocookie.com/embed/${youtubeId}` +
    `?autoplay=1&mute=1&loop=1&playlist=${youtubeId}` +
    `&rel=0&modestbranding=1&playsinline=1`;

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pb-20 text-white sm:pb-28 lg:pb-32">
      <div aria-hidden className="absolute inset-0 bg-blueprint opacity-[0.06]" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow align="center" className="text-navy-200">
              {eyebrow}
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-display-lg text-white">{title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-lg leading-relaxed text-navy-100">{lead}</p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="group relative mx-auto mt-14 max-w-4xl">
            {/* Ambient glow */}
            <div
              aria-hidden
              className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-r from-gold-500/40 via-blue-500/30 to-gold-500/40 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
            />
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/15 bg-black shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/10">
              <iframe
                src={embed}
                title={title}
                className="absolute inset-0 size-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
