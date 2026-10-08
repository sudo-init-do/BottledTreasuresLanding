/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // payment proofs and product photos are uploaded through server actions
    serverActions: { bodySizeLimit: "8mb" },
  },
};

export default nextConfig;
