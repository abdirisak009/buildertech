"use client";

import { useEffect, useRef, useState } from "react";

/* Minimal typings for the YouTube IFrame API we use. */
declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement,
        opts: Record<string, unknown>,
      ) => { destroy: () => void };
      PlayerState: { PLAYING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

/** Loads the YouTube IFrame API once and resolves when it's ready. */
function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<void>((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    document.head.appendChild(s);
  });
  return apiPromise;
}

/**
 * Muted, looping YouTube background video for the hero.
 *
 * It autoplays (browsers only allow muted autoplay) and is revealed only once
 * the player reports it is actually PLAYING — so there is no thumbnail flash
 * and, if the clip ever can't play, the hero's poster image simply remains.
 * Skipped entirely for users who prefer reduced motion.
 */
export function HeroVideo({ youtubeId }: { youtubeId: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = hostRef.current;
    if (!host) return;

    let player: { destroy: () => void } | null = null;
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled || !window.YT || !host) return;
      player = new window.YT.Player(host, {
        videoId: youtubeId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 1,
          playlist: youtubeId, // required for loop
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
          fs: 0,
          disablekb: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e: { target: { mute: () => void; playVideo: () => void } }) => {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e: { data: number }) => {
            if (e.data === window.YT?.PlayerState.PLAYING) setPlaying(true);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        player?.destroy();
      } catch {
        /* noop */
      }
    };
  }, [youtubeId]);

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Sized to cover the hero like object-fit: cover, then scaled up so the
          YouTube title/branding chrome (top and bottom of the frame) overscans
          past the edges and is clipped by the overflow-hidden parent. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-150 [&>iframe]:size-full">
        <div ref={hostRef} className="size-full" />
      </div>
    </div>
  );
}
