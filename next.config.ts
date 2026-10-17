import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "pv-3eef60ed7a27-4166a5a7-9310-4376-b00a-0fb22a33de9e.style.dev",
  ],
};

export default nextConfig;
