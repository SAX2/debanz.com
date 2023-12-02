/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "debanz.com", "api.debanz.com", "cdn.shopify.com"],
  },
  env: {
    SHIPNOWTOKEN: null,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: null,
    WEB_PASS: null,
    SHOPIFY_ACCESS_TOKEN: null,
    SHOPIFY_PULIC_API_URL: null
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig
