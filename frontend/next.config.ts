import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/flask/:path*",
        destination: "http://127.0.0.1:5000/admin_api/:path*",
      },
      {
        source: "/admin_api/:path*",
        destination: "http://127.0.0.1:5000/admin_api/:path*",
      },
      {
        source: "/static/:path*",
        destination: "http://127.0.0.1:5000/static/:path*",
      },
    ];
  },
};

export default nextConfig;