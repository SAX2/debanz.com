/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "debanz.com", "api.debanz.com", "cdn.shopify.com"],
  },
  env: {
    SHIPNOWTOKEN: "uBN7-C25ho93igeBIZoEQruW4PYsRvxqgTpahiy_-uak_z-G0A",
    NEXT_PUBLIC_GOOGLE_ANALYTICS: "G-DKXNCWTL91",
    WEB_PASS: "CollapseByDebanz",
    SHOPIFY_ACCESS_TOKEN: "422757de6c23015e81ceec4d3fa45aaa",
    SHOPIFY_PULIC_API_URL: "https://136bf8-2.myshopify.com/api/2023-07/graphql.json"
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig
