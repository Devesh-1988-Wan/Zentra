
// next.config.js (optional alias fallback)
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '.')
    return config
  },
}

module.exports = nextConfig
