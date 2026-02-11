import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // Similarly, ignore ESLint errors during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Since you are deploying to GitHub Pages, you likely need this too:
  output: "export",
};

export default nextConfig;
