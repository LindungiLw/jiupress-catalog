// File: components/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Search, BookOpen, Users, Tags } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Panggil fungsi t dari pusat bahasa
  const { t } = useLanguage();

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

  const isHomePage = pathname === "/";
  const isSolid = isScrolled || !isHomePage;

  return (
    <>
      {/* ─── 1. TOP HEADER ─── */}
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          isSolid
            ? "py-3 bg-[#1e2d6b]/95 backdrop-blur-md shadow-lg border-b border-white/10"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center group active:scale-95 transition-transform"
          >
            <div className="flex items-baseline group-hover:scale-105 transition-transform duration-300 origin-left">
              <span className="font-black text-2xl text-[#FFD32B] tracking-tighter drop-shadow-md">
                JIU
              </span>
              <span className="font-semibold text-2xl text-white tracking-tight drop-shadow-sm ml-1">
                Press
              </span>
              <span className="w-1.5 h-1.5 bg-[#FFD32B] rounded-full ml-1 mb-1 shadow-[0_0_8px_#FFD32B]"></span>
            </div>
          </Link>

          <div className="flex items-center">
            <div className="hidden md:flex items-center gap-8 lg:gap-12 text-sm font-bold text-white/90">
              <Link
                href="/services"
                className="hover:text-[#FFD32B] hover:-translate-y-0.5 transition-all drop-shadow-sm"
              >
                {t("services")}
              </Link>
              <Link
                href="/about"
                className="hover:text-[#FFD32B] hover:-translate-y-0.5 transition-all drop-shadow-sm"
              >
                {t("about")}
              </Link>
              <Link
                href="/help"
                className="hover:text-[#FFD32B] hover:-translate-y-0.5 transition-all drop-shadow-sm"
              >
                {t("help")}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ─── 2. BOTTOM NAVIGATION BAR (HANYA MUNCUL DI MOBILE / LAYAR KECIL) ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#1e2d6b] border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.2)] z-50 px-6 py-3 flex items-center justify-between pb-safe">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(
              () => document.getElementById("search-input")?.focus(),
              500,
            );
          }}
          className="flex flex-col items-center gap-1 text-white/50 hover:text-[#FFD32B] hover:-translate-y-1 active:scale-90 transition-all group"
        >
          <Search
            size={22}
            className="group-hover:stroke-[2.5px] transition-all"
          />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {t("search")}
          </span>
        </button>

        <Link
          href="/"
          className={`flex flex-col items-center gap-1 hover:-translate-y-1 active:scale-90 transition-all ${
            pathname === "/"
              ? "text-[#FFD32B]"
              : "text-white/50 hover:text-[#FFD32B]"
          }`}
        >
          <BookOpen
            size={22}
            className={pathname === "/" ? "stroke-[2.5px]" : ""}
          />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {t("books")}
          </span>
        </Link>

        <Link
          href="/penulis"
          className={`flex flex-col items-center gap-1 hover:-translate-y-1 active:scale-90 transition-all ${
            pathname === "/penulis"
              ? "text-[#FFD32B]"
              : "text-white/50 hover:text-[#FFD32B]"
          }`}
        >
          <Users
            size={22}
            className={pathname === "/penulis" ? "stroke-[2.5px]" : ""}
          />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {t("authors")}
          </span>
        </Link>

        <Link
          href="/kategori"
          className={`flex flex-col items-center gap-1 hover:-translate-y-1 active:scale-90 transition-all ${
            pathname === "/kategori"
              ? "text-[#FFD32B]"
              : "text-white/50 hover:text-[#FFD32B]"
          }`}
        >
          <Tags
            size={22}
            className={pathname === "/kategori" ? "stroke-[2.5px]" : ""}
          />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {t("genres")}
          </span>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
