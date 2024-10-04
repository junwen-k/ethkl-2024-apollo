/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/siteplan',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
