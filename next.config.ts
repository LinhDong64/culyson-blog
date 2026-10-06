import type { NextConfig } from "next";

const strapiUrl = new URL(process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("/**", strapiUrl)],
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development" && ["localhost", "127.0.0.1", "[::1]"].includes(strapiUrl.hostname),
  },
};

export default nextConfig;
