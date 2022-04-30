const path = require('path');
const csp = require('./csp');
const redirects = require('./redirects');
const cssVariables = require('./src/cssVariables');

module.exports = {
  images: {
    domains: [
      // add any domains that this site will serve images from, such as a CMS or CDN
      // example: "your-cms.com"
      'localhost'
    ],
    deviceSizes: [
      cssVariables.breakpoints.s,
      cssVariables.breakpoints.m,
      cssVariables.breakpoints.l,
      cssVariables.breakpoints.xl,
    ],
    minimumCacheTTL: 7884000, // 3 months in seconds
  },
  allowJs: true,
  reactStrictMode: true,
  webpack: (config) => {
    const configCopy = { ...config };
    configCopy.resolve.alias = {
      ...config.resolve.alias,
      '@blocks': path.resolve(__dirname, './src/blocks/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@icons': path.resolve(__dirname, './src/icons/'),
      '@layout': path.resolve(__dirname, './src/layout/'),
      '@menuBlocks': path.resolve(__dirname, './src/menuBlocks/'),
      '@root': path.resolve(__dirname, './src'),
      '@scss': path.resolve(__dirname, './src/scss/'),
    }
    return configCopy;
  },
  redirects,
  async headers() {
    const headers = [];
    if (process.env.NODE_ENV !== 'development') {
      headers.push({
        source: '/(.*)', // applies to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          }
        ],
      })
    }
    return headers;
  }
}
