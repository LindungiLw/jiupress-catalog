"use client";

import React, { useState, useEffect } from "react";
import { Search, BookOpen, Users, Tags, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek untuk mendeteksi apakah layar sedang di-scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ─── 1. TOP HEADER ─── */}
      <header
        className={`fixed top-0 left-0 z-50 w-full px-6 transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? "py-3 bg-[#1e2d6b]/95 backdrop-blur-md shadow-lg border-b border-white/10"
            : "py-5 bg-transparent"
        }`}
      >
        {/* Kiri: Logo JIU & Teks Press */}
        <Link
          href="/"
          className="flex items-center gap-2 group active:scale-95 transition-transform"
        >
          {/* Logo Gambar JIU */}
          <div className="w-9 h-9 relative rounded-full overflow-hidden flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:scale-105 transition-transform">
            <img
              src="/assets/jiu-library.png"
              alt="JIU Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.parentElement!.innerHTML =
                  '<div class="bg-white text-[#1e2d6b] font-black text-xl w-full h-full flex items-center justify-center rounded-full">J</div>';
              }}
            />
          </div>

          {/* Teks Press (Warna Putih) */}
          <span className="font-bold text-xl text-white tracking-tight drop-shadow-sm">
            Press
          </span>
        </Link>

        {/* Kanan: Link Tambahan */}
        <div className="flex items-center gap-6">
          {/* Link Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-white/80">
            <Link
              href="/services"
              className="hover:text-[#FFD32B] hover:-translate-y-0.5 transition-all drop-shadow-sm"
            >
              Layanan
            </Link>
            <Link
              href="/about"
              className="hover:text-[#FFD32B] hover:-translate-y-0.5 transition-all drop-shadow-sm"
            >
              Tentang Kami
            </Link>
            <Link
              href="/help"
              className="hover:text-[#FFD32B] hover:-translate-y-0.5 transition-all drop-shadow-sm"
            >
              Bantuan?
            </Link>
          </div>

          {/* Ganti Bahasa */}
          <button className="hidden md:flex items-center gap-1.5 text-white/80 hover:text-[#FFD32B] hover:scale-105 active:scale-95 transition-all drop-shadow-sm">
            <Globe size={18} />
            <span className="text-sm font-bold">ID</span>
          </button>
        </div>
      </header>

      {/* ─── 2. BOTTOM NAVIGATION BAR ─── */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#1e2d6b] border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.2)] z-50 px-6 py-3 flex items-center justify-between md:justify-center md:gap-20 pb-safe">
        {/* Tombol Search */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(
              () => document.getElementById("search-input")?.focus(),
              500,
            );
          }}
          className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-white/50 hover:text-[#FFD32B] hover:-translate-y-1 active:scale-90 transition-all group"
        >
          <Search
            size={22}
            className="group-hover:stroke-[2.5px] transition-all"
          />
          <span className="text-[10px] md:text-sm font-bold uppercase md:capitalize tracking-wider md:tracking-normal">
            Search
          </span>
        </button>

        {/* Menu Utama: Books */}
        <Link
          href="/"
          className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 hover:-translate-y-1 active:scale-90 transition-all ${
            pathname === "/"
              ? "text-[#FFD32B]" // Menyala Kuning JIU saat aktif
              : "text-white/50 hover:text-[#FFD32B]"
          }`}
        >
          <BookOpen
            size={22}
            className={pathname === "/" ? "stroke-[2.5px]" : ""}
          />
          <span className="text-[10px] md:text-sm font-bold uppercase md:capitalize tracking-wider md:tracking-normal">
            Books
          </span>
        </Link>

        {/* Menu Utama: Authors */}
        <Link
          href="/penulis"
          className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 hover:-translate-y-1 active:scale-90 transition-all ${
            pathname === "/penulis"
              ? "text-[#FFD32B]"
              : "text-white/50 hover:text-[#FFD32B]"
          }`}
        >
          <Users
            size={22}
            className={pathname === "/penulis" ? "stroke-[2.5px]" : ""}
          />
          <span className="text-[10px] md:text-sm font-bold uppercase md:capitalize tracking-wider md:tracking-normal">
            Authors
          </span>
        </Link>

        {/* Menu Utama: Genres */}
        <Link
          href="/kategori"
          className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 hover:-translate-y-1 active:scale-90 transition-all ${
            pathname === "/kategori"
              ? "text-[#FFD32B]"
              : "text-white/50 hover:text-[#FFD32B]"
          }`}
        >
          <Tags
            size={22}
            className={pathname === "/kategori" ? "stroke-[2.5px]" : ""}
          />
          <span className="text-[10px] md:text-sm font-bold uppercase md:capitalize tracking-wider md:tracking-normal">
            Genres
          </span>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
