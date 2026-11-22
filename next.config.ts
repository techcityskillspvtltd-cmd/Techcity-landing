import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    // Careers form: résumés up to 5 MB, plus room for the rest of the form.
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  cacheComponents: true,
  // The product roadmap page became Reports.
  async redirects() {
    return [{ source: "/company/roadmap", destination: "/reports", permanent: true }];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
