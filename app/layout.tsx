import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
// 1. UBAH IMPORT-NYA MENJADI INI:
import ConditionalNavbar from "../components/ConditionalNavbar";

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
        {/* 2. PAKAI NAVBAR PINTAR DI SINI */}
        <ConditionalNavbar />

        {/* Ini adalah isi halamannya (Home, dsb) yang akan berubah-ubah */}
        {children}
      </body>
    </html>
  );
}
