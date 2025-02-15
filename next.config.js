/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BUILD_TIMESTAMP: new Date().toISOString(),
  },
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
    domains: ['benh155.sg-host.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'benh155.sg-host.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // This will enable static rendering for dynamic routes
    workerThreads: false,
    cpus: 1,
    // Force everything to be dynamic
    isrMemoryCacheSize: 0,
  },
  swcMinify: true,
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
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
  // Force dynamic rendering
  unstable_runtimeJS: true,
  unstable_JsPreload: false,
  // Disable static optimization
  unstable_staticGeneration: false,
}

module.exports = nextConfig
