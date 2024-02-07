/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', '172.20.10.4'],
  },
  env: {
    API_BASE_URL: 'http://localhost:8080',
  },
};

module.exports = nextConfig;
