import mdx from '@next/mdx';
import { fileURLToPath } from 'url';

// Get __filename equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['next-mdx-remote'],

  // 🔥 ADD THESE FOR FASTER COMPILATION
  experimental: {
    turbo: {
      // Enable Turbopack for faster dev server
      rules: {
        '*.mdx': {
          loaders: ['mdx'],
          as: '*.js',
        },
      },
    },
  },

  // Disable type checking during development
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },

  // Disable ESLint during development
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },

  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '**',
      },
    ],
    // Reduce image optimization in dev
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // Sass options
  sassOptions: {
    compiler: 'modern',
    silenceDeprecations: ['legacy-js-api'],
  },

  // Webpack optimizations - SIMPLIFIED VERSION
  webpack: (config, { dev, isServer }) => {
    // Only in development
    if (dev && !isServer) {
      // Cache webpack builds - simplified without __filename
      config.cache = {
        type: 'filesystem',
      };
    }

    return config;
  },
};

// Only apply MDX if not using Turbopack
const config = process.env.TURBOPACK ? nextConfig : withMDX(nextConfig);
export default config;
