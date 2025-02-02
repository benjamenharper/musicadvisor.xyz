/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  images: {
    domains: ['musicadvisor.xyz'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'musicadvisor.xyz',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // This will enable static rendering for dynamic routes
    workerThreads: false,
    cpus: 1
  },
  async redirects() {
    return [
      {
        source: '/category/music-promotion',
        destination: '/category/promotion',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
