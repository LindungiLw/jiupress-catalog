"use client";

import React, { useState } from "react";
import { Globe } from "lucide-react";

const FloatingLanguage = () => {
  const [lang, setLang] = useState("ID");

  const toggleLanguage = () => {
    setLang(lang === "ID" ? "EN" : "ID");
  };

  return (
    <button
      onClick={toggleLanguage}
      // z-[9999] memastikan dia ada di lapisan teratas!
      className="fixed bottom-28 right-6 md:bottom-12 md:right-12 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-white backdrop-blur-md shadow-[0_10px_40px_rgba(30,45,107,0.3)] border border-slate-200 text-[#1e2d6b] hover:bg-[#1e2d6b] hover:text-[#FFD32B] hover:scale-110 active:scale-95 transition-all duration-300 group"
      title="Ubah Bahasa"
    >
      <Globe size={24} className="group-hover:animate-spin-slow" />

      {/* Teks ID/EN */}
      <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD32B] text-[11px] font-black text-[#1e2d6b] shadow-md border border-white">
        {lang}
      </span>
    </button>
  );
};

export default FloatingLanguage;
