import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  transpilePackages: ["sanity", "next-sanity", "@sanity/ui", "@sanity/icons", "@sanity/vision"],
};

export default nextConfig;
