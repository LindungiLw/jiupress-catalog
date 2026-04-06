"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";

// ── Mock Data Buku (Nanti bisa diganti ambil dari database/API Koha) ──
const NEW_BOOKS = [
  {
    id: 1,
    title: "Theology of the New Testament",
    author: "Leon Morris",
    category: "Teologi",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Strategic Management: A Competitive Edge",
    author: "Thomas L. Wheelen",
    category: "Bisnis",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell",
    category: "Teknologi",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Principles of Corporate Finance",
    author: "Richard A. Brealey",
    category: "Akuntansi",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "The Art of Public Speaking",
    author: "Stephen Lucas",
    category: "Komunikasi",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?q=80&w=600&auto=format&fit=crop",
  },
];

const NewBooks = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk menggeser slider ke kiri/kanan
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Jarak geser (seukuran 1 kartu + gap)
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white px-[5%] py-20 font-[Plus_Jakarta_Sans,sans-serif]">
      <div className="mx-auto max-w-7xl">
        {/* ── Header Section ── */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-[#FFD32B] uppercase mb-2">
              Koleksi Terbaru
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#1e2d6b] font-poppins">
              Buku Baru Bulan Ini
            </h3>
          </div>

          <button className="group flex items-center gap-2 text-sm font-bold text-[#1e2d6b] transition-all hover:text-[#FFD32B]">
            Lihat Semua Katalog
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* ── Slider Area ── */}
        <div className="relative group/slider">
          {/* Tombol Geser Kiri (Muncul saat hover) */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-[0_4px_20px_rgba(30,45,107,0.15)] text-[#1e2d6b] opacity-0 transition-all hover:bg-[#1e2d6b] hover:text-white group-hover/slider:opacity-100 hidden md:block border border-gray-100"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Container Scroll */}
          {/* class 'scrollbar-hide' memerlukan custom css atau biarkan saja karena overflow-x-auto */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Sembunyikan scrollbar di Firefox/IE
          >
            {/* Supaya scrollbar hilang di Chrome/Safari, kita akali dengan inline style di atas, dan struktur rapi */}
            <style>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>

            {NEW_BOOKS.map((book) => (
              <div
                key={book.id}
                className="min-w-[260px] max-w-[260px] snap-start flex-shrink-0 group cursor-pointer"
              >
                {/* Cover Buku */}
                <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-md transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_12px_30px_rgba(30,45,107,0.2)]">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Label Kategori */}
                  <div className="absolute left-4 top-4 rounded-md bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-[#1e2d6b] shadow-sm">
                    {book.category}
                  </div>
                  {/* Overlay Hitam Halus saat Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e2d6b]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
                    <button className="w-full bg-[#FFD32B] text-[#1e2d6b] font-bold py-2.5 rounded-lg transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      Pinjam Buku
                    </button>
                  </div>
                </div>

                {/* Info Buku */}
                <div className="mt-5">
                  <div className="flex items-center gap-1 mb-1.5">
                    <Star size={14} fill="#FFD32B" className="text-[#FFD32B]" />
                    <span className="text-xs font-bold text-gray-600">
                      {book.rating}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold leading-tight text-[#1e2d6b] line-clamp-2 transition-colors group-hover:text-[#FFD32B]">
                    {book.title}
                  </h4>
                  <p className="mt-1 text-sm font-medium text-gray-500 line-clamp-1">
                    {book.author}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Geser Kanan (Muncul saat hover) */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-[0_4px_20px_rgba(30,45,107,0.15)] text-[#1e2d6b] opacity-0 transition-all hover:bg-[#1e2d6b] hover:text-white group-hover/slider:opacity-100 hidden md:block border border-gray-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewBooks;
