import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Habilitar output standalone para Docker
  output: 'standalone',

  // Comprimir las respuestas
  compress: true,

  // Optimizaciones de producción
  poweredByHeader: false,

  // Configuración de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
