import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

// Kita pakai font Poppins biar sesuai desain UI modern-nya
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
        {/* Navbar akan selalu ada di atas */}
        <Navbar />

        {/* Ini adalah isi halamannya (Home, dsb) yang akan berubah-ubah */}
        {children}
      </body>
    </html>
  );
}
