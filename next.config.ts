import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // permite imagem de QUALQUER domínio
      },
    ],
  },  
};

export default nextConfig;
