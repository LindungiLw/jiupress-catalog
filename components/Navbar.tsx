"use client";

import React, { useState, useEffect } from "react";
import { Search, BookOpen, Users, Tags, Globe, UserCircle } from "lucide-react";
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
      {/* ─── 1. TOP HEADER (Tetap Diam di Atas + Efek Kaca) ─── */}
      <header
        className={`fixed top-0 left-0 z-50 w-full px-6 transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? "py-3 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "py-5 bg-transparent"
        }`}
      >
        {/* Kiri: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group active:scale-95 transition-transform"
        >
          <div className="bg-[#1e2d6b] text-white font-black text-xl px-4 py-1 rounded-full rounded-tr-none transition-transform group-hover:scale-105 shadow-sm">
            JIU
          </div>
          <span className="font-bold text-xl text-[#1e2d6b] tracking-tight">
            Library
          </span>
        </Link>

        {/* Kanan: Link Tambahan & Profil */}
        <div className="flex items-center gap-6">
          {/* Link Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-[#1e2d6b]/70">
            <Link
              href="/layanan"
              className="hover:text-[#FFD32B] hover:-translate-y-0.5 transition-all"
            >
              Layanan
            </Link>
            <Link
              href="/tentang"
              className="hover:text-[#FFD32B] hover:-translate-y-0.5 transition-all"
            >
              Tentang Kami
            </Link>
            <Link
              href="/bantuan"
              className="hover:text-[#FFD32B] hover:-translate-y-0.5 transition-all"
            >
              Bantuan?
            </Link>
          </div>

          {/* Ganti Bahasa */}
          <button className="hidden md:flex items-center gap-1.5 text-[#1e2d6b]/70 hover:text-[#1e2d6b] hover:scale-105 active:scale-95 transition-all">
            <Globe size={18} />
            <span className="text-sm font-bold">ID</span>
          </button>

          {/* Tombol Login */}
          <Link
            href="/login"
            className="flex items-center gap-2 text-[#1e2d6b] hover:text-[#FFD32B] hover:scale-110 active:scale-90 transition-all"
          >
            <UserCircle size={32} strokeWidth={1.5} />
          </Link>
        </div>
      </header>

      {/* ─── 2. BOTTOM NAVIGATION BAR (Bawah: Menu & Search) ─── */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] z-50 px-6 py-3 flex items-center justify-between md:justify-center md:gap-20 pb-safe">
        {/* Tombol Search */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(
              () => document.getElementById("search-input")?.focus(),
              500,
            );
          }}
          className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-gray-400 hover:text-[#1e2d6b] hover:-translate-y-1 active:scale-90 transition-all group"
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
              ? "text-[#1e2d6b]"
              : "text-gray-400 hover:text-[#1e2d6b]"
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
              ? "text-[#1e2d6b]"
              : "text-gray-400 hover:text-[#1e2d6b]"
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
              ? "text-[#1e2d6b]"
              : "text-gray-400 hover:text-[#1e2d6b]"
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
