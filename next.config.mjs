/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const byCookie = (value, to) => ({
      source: '/',
      has: [{ type: 'cookie', key: 'sitefy-lang', value }],
      destination: to,
      permanent: false,
    })
    return [byCookie('en', '/en'), byCookie('ar', '/ara'), { source: '/', destination: '/geo', permanent: false }]
  },
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
