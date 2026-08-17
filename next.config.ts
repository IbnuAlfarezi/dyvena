import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
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
}

export default nextConfig
