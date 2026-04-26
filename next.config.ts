import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/rabdulwahid",
  assetPrefix: "/rabdulwahid",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;