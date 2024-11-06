/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true, serverExternalPackages: ["mongoose"] , typedRoutes: true},
  webpack(config) {
      config.experiments = { ...config.experiments, topLevelAwait: true };
      return config;
  },
  images: {
    //remotePatterns: ['firebasestorage.googleapis.com','gyzedbhfnyygctzl.public.blob.vercel-storage.com'],
    domains: ['firebasestorage.googleapis.com','gyzedbhfnyygctzl.public.blob.vercel-storage.com'],

  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://e-commerce-platform-6x26-8dpwg9bwr-hasan-afifs-projects.vercel.app' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, PATCH, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
}

module.exports = nextConfig
