/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')]
  },
  // serverRuntimeConfig: {
  //   NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  //   NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  //   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  //   NEXT_PUBLIC_SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
  //   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  //   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
  // },

  // publicRuntimeConfig: {
  //   NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  //   NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  //   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  //   NEXT_PUBLIC_SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
  //   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  //   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
  // },
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
