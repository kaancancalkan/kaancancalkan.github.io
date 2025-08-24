/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       
  distDir: 'build',       
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '',        // boş string, root repo için
  assetPrefix: '',     // boş string, root repo için
  trailingSlash: true,
}

module.exports = nextConfig
