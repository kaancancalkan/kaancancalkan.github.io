/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // ✅ statik export için doğru
  distDir: 'build',        // build çıktısı 'build/' klasörüne alınacak
  reactStrictMode: true,   // ✅ best practice
  images: {
    unoptimized: true,     // ✅ GitHub Pages için gerekli (Image Optimization yok)
  },
  basePath: '',            // ✅ root repo için boş bırakılmalı
  assetPrefix: '',         // ✅ root repo için boş bırakılmalı
  trailingSlash: true,     // ✅ GitHub Pages ile uyumlu (her dosya /index.html olarak çıkacak)
}
module.exports = nextConfig;
