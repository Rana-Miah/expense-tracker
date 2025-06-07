import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
  serverActions: {
    // edit: updated to new key. Was previously `allowedForwardedHosts`
    allowedOrigins: ['animated-tribble-pjjv6gqwpwj3wx7-3000.app.github.dev',"localhost:3000"],
  },
},
};

export default nextConfig;
