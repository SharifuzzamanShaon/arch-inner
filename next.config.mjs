/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/assets/**", // allow all images under /assets
      },
    ],
  },
};

export default nextConfig;
