"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vimeo background video for the hero.
 *
 * The clip is private on Vimeo, so it only plays on domains added to the
 * video's embed allow-list (Vimeo → Settings → Privacy → "Where can this video
 * be embedded?"). Rather than risk showing Vimeo's grey "Sorry, privacy
 * settings" panel on a non-allow-listed domain, the iframe stays invisible
 * until the player confirms it is actually playing (via the postMessage API).
 * If it never plays — private/blocked, or reduced-motion — the hero's poster
 * image simply remains, with no error visible.
 */
export function HeroVideo({ vimeoId }: { vimeoId: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const post = (method: string, value?: string) =>
      ref.current?.contentWindow?.postMessage(
        JSON.stringify(value ? { method, value } : { method }),
        "*",
      );

    function onMessage(e: MessageEvent) {
      if (typeof e.origin !== "string" || !e.origin.includes("vimeo.com")) return;
      let data: { event?: string; method?: string };
      try {
        data = JSON.parse(e.data);
      } catch {
        return;
      }
      if (data.event === "ready") {
        post("addEventListener", "playing");
        post("addEventListener", "timeupdate");
        post("addEventListener", "error");
      }
      if (data.event === "playing" || data.event === "timeupdate") {
        setPlaying(true);
      }
      if (data.event === "error") {
        setPlaying(false);
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    >
      <iframe
        ref={ref}
        title="Builders Tech showreel"
        src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1`}
        allow="autoplay; fullscreen; picture-in-picture"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
