"use client";

import React, { useState } from "react";

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
          className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-white backdrop-blur-md shadow-[0_10px_40px_rgba(30,45,107,0.3)] border border-slate-200 hover:bg-slate-50 hover:scale-110 active:scale-95 transition-all duration-300 group"
          title={
            lang === "ID" ? "Switch to English" : "Ubah ke Bahasa Indonesia"
          }
        >
          {/* Gambar Bendera Asli PNG (Dibungkus lingkaran) */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-100 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <img
              src={
                lang === "ID"
                  ? "https://flagcdn.com/w80/id.png" // Link PNG Bendera Indone sia
                  : "https://flagcdn.com/w80/gb.png" // Link PNG Bendera Inggris
              }
              alt={lang === "ID" ? "Indonesian Flag" : "UK Flag"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Teks ID/EN kecil di pojok sebagai penegas */}
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#1e2d6b] text-[10px] font-black text-white shadow-md border-2 border-white">
            {lang}
          </span>
        </button>
      </div>
    </div>
  );
};

export default FloatingLanguage;
