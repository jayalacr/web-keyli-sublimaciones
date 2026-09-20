import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Fotos de celular sin comprimir (ej. HEIC que el navegador no pudo procesar) pueden pesar varios MB.
    serverActions: { bodySizeLimit: "15mb" },
  },
  images: {
    remotePatterns: [
      // ponytail: placeholders de Stitch mientras no hay fotos reales del cliente
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "kpxjivwwwabhbitbqqhm.supabase.co" },
      // prueba: miniaturas de video vía oEmbed de TikTok (dominios de su CDN varían)
      { protocol: "https", hostname: "*.tiktokcdn.com" },
      { protocol: "https", hostname: "*.tiktokcdn-us.com" },
    ],
  },
};

export default nextConfig;
