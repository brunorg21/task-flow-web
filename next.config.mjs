/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/taskflow/tasks',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
