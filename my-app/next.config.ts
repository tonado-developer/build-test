import type { NextConfig } from "next";

const isDDEV = process.env.DDEV_SITENAME;
const allowedOrigins = isDDEV ? [
  `127.0.0.1`,
  `${process.env.DDEV_SITENAME}.ddev.site`,
  `https://${process.env.DDEV_SITENAME}.ddev.site`
] : [];

const nextConfig: NextConfig = {
  allowedDevOrigins: allowedOrigins,
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true }
  }),
};

export default nextConfig;