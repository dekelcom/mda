import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Question images are proxied through /api/img (the MOT host is http-only),
  // so no remote image patterns are needed here.
  reactStrictMode: true,
  // This app lives in a subdirectory; pin the trace root to itself so Next
  // doesn't pick up a parent lockfile when building.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
