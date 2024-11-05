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
}

module.exports = nextConfig
