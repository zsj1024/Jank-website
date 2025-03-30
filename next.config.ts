import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_NAME: "Jank",
    NEXT_PUBLIC_SITE_URL: "http://127.0.0.1:9010",
    NEXT_PUBLIC_API_URL: "https://fenderisfine.icu/api",
    // NEXT_PUBLIC_API_URL: "https://www.jank.org.cn/api",
    // NEXT_PUBLIC_API_URL: 'http://127.0.0.1:9010/api',
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:9010/api"
        }/:path*`,
      },
    ];
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
