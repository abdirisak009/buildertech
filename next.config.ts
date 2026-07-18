import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All imagery is served from /public/images — no remote hosts, so the
    // optimiser never depends on a third party being reachable or fast.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
