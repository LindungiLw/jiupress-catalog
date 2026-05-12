"use client";

import React from "react";
import Link from "next/link";
// 1. IMPORT PUSAT BAHASA
import { useLanguage } from "@/contexts/LanguageContext";

interface BookProps {
  books: any[];
}

const PopularBooks = ({ books }: BookProps) => {
  // 2. PANGGIL FUNGSI TERJEMAHAN
  const { t } = useLanguage();

  // Ambil 6 buku teratas
  const topBooks = books.slice(0, 6);

  return (
    <section className="w-full bg-[#f8fafc] px-[5%] pt-0 pb-20 font-[Poppins,sans-serif]">
      <div className="mx-auto max-w-7xl">
        {/* ── Header: Judul di Tengah ── */}
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-black text-[#1e2d6b] tracking-tight">
            {/* 3. TERAPKAN TERJEMAHAN DI SINI */}
            {t("popularBooks")}
          </h3>
          <div className="w-12 h-1.5 bg-[#FFD32B] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* ── Grid: Diadaptasi dari gaya NewBooks ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
          {topBooks.map((book) => (
            // ── Kartu Minimalis ──
            <div
              key={book.id}
              className="bg-white rounded-[24px] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 group flex flex-col h-full hover:-translate-y-1"
            >
              {/* ── Area Gambar (Klik mengarah ke Halaman Detail) ── */}
              <Link
                href={`/catalog/${book.id}`}
                className="w-full aspect-[4/5] rounded-[18px] overflow-hidden mb-4 bg-gray-50 relative cursor-pointer block group/img"
              >
                <img
                  src={book.image || "/assets/placeholder-book.png"}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                />

                {/* Badge Harga (Kanan Atas) */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-full text-[11px] font-black text-[#1e2d6b] shadow-sm z-10">
                  Rp {new Intl.NumberFormat("id-ID").format(book.price)}
                </div>
              </Link>

              {/* ── Area Teks (Minimalis) ── */}
              <div className="px-2 pb-2 text-center flex flex-col justify-center flex-grow">
                <p className="text-[#FFD32B] text-[10px] font-bold uppercase tracking-widest mb-1 line-clamp-1">
                  {book.author}
                </p>
                <Link
                  href={`/catalog/${book.id}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  <h4 className="text-lg font-black text-[#1e2d6b] leading-snug line-clamp-2">
                    {book.title}
                  </h4>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Semua */}
        <div className="flex justify-center">
          <Link
            href="/catalog"
            className="px-8 py-3.5 rounded-full bg-white border border-[#1e2d6b]/10 text-[#1e2d6b] font-bold text-sm transition-all hover:bg-[#1e2d6b] hover:text-white hover:border-[#1e2d6b] active:scale-95 shadow-sm hover:shadow-lg"
          >
            {/* 4. TERAPKAN TERJEMAHAN DI SINI */}
            {t("exploreAllBooks")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularBooks;
