import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.slack-edge.com",
      },
      {
        protocol: "https",
        hostname: "infoskjermstorageaccount.blob.core.windows.net",
      },
    ],
  },
};

export default nextConfig;
