/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "debanz.com", "api.debanz.com", "cdn.shopify.com"],
  },
  env: {
    SHIPNOWTOKEN: "uBN7-C25ho93igeBIZoEQruW4PYsRvxqgTpahiy_-uak_z-G0A",
    NEXT_PUBLIC_GOOGLE_ANALYTICS: "G-DKXNCWTL91",
    WEB_PASS: "CollapseByDebanz",
    SHOPIFY_ACCESS_TOKEN: "e36b41dfa468feba15b6c40f57cdf663",
    SHOPIFY_PULIC_API_URL: "https://d4eea9.myshopify.com/api/2023-10/graphql.json"
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig
