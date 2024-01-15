/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/account',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
