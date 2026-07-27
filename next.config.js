/** @type {import('next').NextConfig} */
// STATIC_EXPORT=1 npm run build -> static site in out/ for Cloudflare Pages previews.
// Unset (normal dev / webflow library work) this config is a no-op.
const nextConfig = process.env.STATIC_EXPORT
  ? { output: "export", images: { unoptimized: true } }
  : {};

module.exports = nextConfig;
