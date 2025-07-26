import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev, isServer }) => {
    // Only include Stagewise in development and client-side
    if (dev && !isServer) {
      // Add any specific webpack configurations for Stagewise if needed
    }
    
    return config;
  },
};

export default nextConfig;
