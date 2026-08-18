import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard/ecommerce',
        permanent: false,
      },
    ]
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'pdfjs-dist': path.resolve(__dirname, 'node_modules/pdfjs-dist'),
      canvas: false,
    }
    return config
  },
  allowedDevOrigins: ['dyvena.ibnualfarezi.my.id'],
}

export default nextConfig
