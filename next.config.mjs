/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "archinner.com",
        pathname: "/api/**",
      },
      {
        protocol: "http",
        hostname: "213.136.67.189",
        port: "3000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
