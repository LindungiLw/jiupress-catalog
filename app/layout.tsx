import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// 1. IMPORT PROVIDER BAHASA DARI CONTEXT YANG KITA BUAT
import { LanguageProvider } from "@/contexts/LanguageContext";

import ConditionalNavbar from "../components/ConditionalNavbar";
import FloatingLanguage from "@/components/FloatingLanguage";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JiuPress Catalog",
  description: "Official Bookstore of Jakarta International University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-[#F8FAFC] antialiased`}>
        {/* 2. BUNGKUS SEMUA KOMPONEN DENGAN LANGUAGE PROVIDER */}
        <LanguageProvider>
          <ConditionalNavbar />

          <FloatingLanguage />

          {/* Ini adalah isi halamannya (Home, dsb) yang akan berubah-ubah */}
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
