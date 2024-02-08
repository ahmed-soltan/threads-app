/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponents: true, // Assuming this is the correct option instead of serverActions
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: [
      "img.clerk.com",
      "images.clerk.dev",
      "uploadthing.com",
      "placehold.co",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
