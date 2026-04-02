/** @type {import('next').NextConfig} */

const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "./src",
      "@components": "./src/components",
      "@lib": "./src/lib",
      "@utils": "./src/utils",
      "@types": "./src/types",
      "@app": "./src/app",
      "@assets": "./src/assets",
      public: "../../public",
    };
    return config;
  },
  turbopack: {},
};

module.exports = config;
