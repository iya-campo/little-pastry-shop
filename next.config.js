/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['xsgames.co'],
    loader: 'akamai',
    path: '',
  },
};

module.exports = nextConfig;
