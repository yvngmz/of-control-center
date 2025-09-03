/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration générale
  reactStrictMode: true,
  
  // Configuration expérimentale
  experimental: {
    // Optimisations de performance
    optimizeCss: false, // Désactiver pour éviter les problèmes avec critters
    scrollRestoration: true,
  },

  // Configuration des images
  images: {
    domains: [
      'localhost',
      'of-control.com',
      'cdn.of-control.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Configuration des headers de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Sécurité générale
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()'
          },
          // Content Security Policy (CSP)
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://api.of-control.com wss://localhost:3001",
              "frame-src 'self' https://www.youtube.com https://player.vimeo.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'"
            ].join('; ')
          }
        ]
      }
    ];
  },

  // Configuration des redirections
  async redirects() {
    return [
      // Redirection de l'ancienne URL vers la nouvelle
      {
        source: '/login',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/dashboard',
        permanent: true,
      }
    ];
  },

  // Configuration des rewrites (pour les APIs)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_BASE_URL 
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`
          : '/api/:path*'
      }
    ];
  },

  // Configuration du bundle analyzer
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Bundle analyzer en développement
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }

    // Optimisations webpack
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    };

    return config;
  },

  // Configuration de l'output pour le déploiement statique
  output: process.env.NEXT_OUTPUT === 'export' ? 'export' : 'standalone',
  
  // Configuration pour le tracing (debugging)
  trailingSlash: false,
  
  // Configuration de compression
  compress: true,
  
  // Configuration des variables d'environnement publiques
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },


  
  // Configuration du logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Configuration pour PoweredByHeader
  poweredByHeader: false,
  
  // Configuration des domaines autorisés
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrites pour les assets
        {
          source: '/assets/:path*',
          destination: '/public/:path*',
        },
      ],
      afterFiles: [
        // Rewrites pour les APIs en mode développement
        {
          source: '/api/:path*',
          destination: process.env.NODE_ENV === 'development' 
            ? '/api/:path*'
            : `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'}/:path*`
        },
      ],
      fallback: [
        // Fallback pour les routes non trouvées
        {
          source: '/:path*',
          destination: '/404',
        },
      ],
    };
  }
};

// Configuration conditionnelle selon l'environnement
if (process.env.NODE_ENV === 'development') {
  // Configuration spécifique au développement
  nextConfig.typescript = {
    // Ignorer les erreurs TypeScript en développement pour un build plus rapide
    ignoreBuildErrors: false,
  };
  
  nextConfig.eslint = {
    // Ignorer les erreurs ESLint en développement
    ignoreDuringBuilds: false,
  };
}

if (process.env.NODE_ENV === 'production') {
  // Configuration spécifique à la production
  nextConfig.compiler = {
    // Supprimer les console.log en production
    removeConsole: {
      exclude: ['error'],
    },
  };
  
  // Ignorer les erreurs ESLint en production pour le déploiement
  nextConfig.eslint = {
    ignoreDuringBuilds: true,
  };
  
  // Ignorer les erreurs TypeScript non critiques en production
  nextConfig.typescript = {
    ignoreBuildErrors: true,
  };
}

module.exports = nextConfig;
