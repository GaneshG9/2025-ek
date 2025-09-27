import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // GitHub Pages optimizations
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  
  // GitHub Pages deployment settings
  assetPrefix: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES ? '/eka-2025' : '',
  basePath: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES ? '/eka-2025' : '',
  
  // Performance optimizations (swcMinify is enabled by default in Next.js 13+)
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Environment-specific settings
  ...(process.env.NODE_ENV === 'production' && {
    // Disable source maps in production for better performance
    productionBrowserSourceMaps: false,
  }),
  images: {
    // GitHub Pages optimization - disable optimization for static export
    unoptimized: true,
    // Performance optimizations (for when not using static export)
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
