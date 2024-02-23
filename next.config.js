/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      prerenderExclude: [
        /^\/api\/.*/,
      ],
    },
  };
  
  module.exports = nextConfig;