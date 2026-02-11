import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // <--- Required for GitHub Pages

  // 1. Disable server-side image optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
