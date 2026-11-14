import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Las imágenes subidas tienen nombre UUID y nunca cambian: cachear las versiones optimizadas 1 año.
    minimumCacheTTL: 31536000,
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
