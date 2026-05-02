import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Videos",
  assetPrefix: "/Videos/",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
