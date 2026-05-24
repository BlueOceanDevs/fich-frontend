import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a self-contained build at .next/standalone (server.js +
  // pruned node_modules). The Dockerfile copies that as the runtime
  // root — cuts the final image from ~600 MB to ~150 MB and removes
  // the need to ship a full node_modules in production.
  output: "standalone",
  reactCompiler: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
