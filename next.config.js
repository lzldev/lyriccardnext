const {
  withHydrationOverlay,
} = require('@builder.io/react-hydration-overlay/next')
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net',
        port: '',
        pathname: '/i/u/*/**',
      },
    ],
  },
}

module.exports = withHydrationOverlay({
  appRootSelector: 'main',
})(nextConfig)
