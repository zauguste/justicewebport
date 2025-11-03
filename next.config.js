/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",       // 👈 replaces `next export`
  trailingSlash: true,    // optional, for clean URLs
};

module.exports = nextConfig;
