/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/src/app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
