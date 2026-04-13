"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Sembunyikan Navbar jika sedang berada di halaman /admin atau /login
  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null; // Tidak menampilkan apa-apa (sembunyi)
  }

  // Jika di halaman utama atau halaman publik lainnya, tampilkan Navbar
  return <Navbar />;
}
