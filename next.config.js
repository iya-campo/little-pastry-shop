/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  images: {
    domains: ['xsgames.co'],
    loader: 'akamai',
    path: '',
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/little-pastry-shop',
};

module.exports = nextConfig;
