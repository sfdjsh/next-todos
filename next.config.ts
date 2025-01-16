import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/todos?page=1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
