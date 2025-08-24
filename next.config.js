/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       
  distDir: 'build',       
  reactStrictMode: true,
  images: {
    unoptimized: true,    // statik export için gerekli
  },
  basePath: '/yeni-site2',       // repo adı
  assetPrefix: '/yeni-site2/',   // CSS ve JS için prefix
  trailingSlash: true,           // /index.html ile export
}

module.exports = nextConfig
