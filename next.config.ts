import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Berlaku untuk semua rute
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Mencegah browser menebak tipe file (Anti MIME-Sniffing)
          },
          {
            key: "X-Frame-Options",
            value: "DENY", // Mencegah Clickjacking (Web tidak bisa di-embed di Iframe orang jahat)
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block", // Mengaktifkan filter XSS bawaan browser
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // Menjaga privasi URL saat navigasi ke web luar
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload", // Memaksa HTTPS selama 1 tahun
          },
        ],
      },
    ];
  },
};

export default nextConfig;
