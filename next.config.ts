import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // <--- Required for GitHub Pages

  // 1. Disable server-side image optimization
  images: {
    unoptimized: true,
  },

  // 2. Add this ONLY if your site is at 'username.github.io/repo-name'
  // If your repo name is 'my-project', put '/my-project' here.
  // If your site is just 'username.github.io', leave this line out.
  basePath: process.env.NODE_ENV === "production" ? "/acm-website" : "",
};

export default nextConfig;
