import type { NextConfig } from 'next';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4200';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${SERVER_URL}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
