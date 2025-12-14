import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Optimize images with high quality for product images
    formats: ['image/avif', 'image/webp'],
    // Increase device sizes for better quality on larger screens
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Increase image sizes for better quality
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024],
    // Quality levels for responsive images (supports quality prop up to 95)
    // Array must contain at most 20 elements
    qualities: [75, 95],
    // Minimum quality threshold (default is 75, we want higher)
    minimumCacheTTL: 60,
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




