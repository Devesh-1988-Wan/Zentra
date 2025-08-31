
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboards',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
