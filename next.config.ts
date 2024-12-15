import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "avatars.slack-edge.com",
      "infoskjermstorageaccount.blob.core.windows.net",
    ],
  },
};

export default nextConfig;
