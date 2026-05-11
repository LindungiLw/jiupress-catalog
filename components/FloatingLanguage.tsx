"use client";

import React, { useState } from "react";
import { Globe } from "lucide-react";

const FloatingLanguage = () => {
  const [lang, setLang] = useState("ID");

  const toggleLanguage = () => {
    setLang(lang === "ID" ? "EN" : "ID");
  };

  return (
    // Wrapper transparan yang membentang penuh di bawah layar
    <div className="fixed inset-x-0 bottom-0 z-[9999] pointer-events-none pb-28 md:pb-12">
      {/* Pengunci lebar agar sejajar dengan konten utama */}
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 flex justify-end">
        {/* Tombol aslinya (pointer-events-auto agar bisa diklik) */}
        <button
          onClick={toggleLanguage}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-white backdrop-blur-md shadow-[0_10px_40px_rgba(30,45,107,0.3)] border border-slate-200 text-[#1e2d6b] hover:bg-[#1e2d6b] hover:text-[#FFD32B] hover:scale-110 active:scale-95 transition-all duration-300 group"
          title="Ubah Bahasa"
        >
          <Globe size={24} className="group-hover:animate-spin-slow" />

          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD32B] text-[11px] font-black text-[#1e2d6b] shadow-md border border-white">
            {lang}
          </span>
        </button>
      </div>
    </div>
  );
};

export default FloatingLanguage;
