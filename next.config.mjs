import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization - Military grade
  images: {
    // Modern formats for best compression
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different use cases
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024],
    // Quality levels for responsive images
    qualities: [75, 95],
    // Cache images for 1 year (immutable)
    minimumCacheTTL: 31536000,
    // Disable image optimization in development for faster builds
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false, // Remove X-Powered-By header for security
  
  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/generated_images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Allow cross-origin requests from ngrok and other development domains
  allowedDevOrigins: [
    'nonseparative-nonsuggestible-rosita.ngrok-free.dev',
    // Add other ngrok domains or development URLs as needed
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'app'),
      '@shared': path.resolve(__dirname, 'shared'),
    };
    // Include .glb files as assets
    config.module.rules.push({
      test: /\.glb$/,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;




