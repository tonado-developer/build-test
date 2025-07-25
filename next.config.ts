import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
  }),
  images: {
    domains: ['sandbox.programmierung-bw.de'],
    unoptimized: true
  },
};

export default nextConfig;