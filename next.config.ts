import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.DEPLOY_TARGET === 'static' && {
    output: 'export',
    trailingSlash: true,
  }),
  images: {
    ...(process.env.DEPLOY_TARGET === 'static' 
      ? { unoptimized: true }
      : { domains: ['sandbox.programmierung-bw.de'] }
    ),
  },
};

export default nextConfig;