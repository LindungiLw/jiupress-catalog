"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface BookProps {
  books: any[];
}

const NewBooks = ({ books }: BookProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-[#f8fafc] px-[5%] py-20 font-[Plus_Jakarta_Sans,sans-serif] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* ── Header Section ── */}
        <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end px-4 md:px-0">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-[#FFD32B] uppercase mb-2">
              Latest Collection
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#1e2d6b] font-poppins">
              New Arrivals This Month
            </h3>
          </div>

          <button className="group flex items-center gap-2 text-sm font-bold text-[#1e2d6b] transition-all hover:text-[#FFD32B]">
            View All Catalog
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* ── Slider Area (Aesthetic Floating Design) ── */}
        <div className="relative mt-8 group/slider">
          {/* Tombol Geser Kiri */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 md:-left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm p-4 shadow-[0_10px_30px_rgba(30,45,107,0.2)] text-[#1e2d6b] opacity-0 transition-all duration-300 hover:bg-[#1e2d6b] hover:text-white group-hover/slider:opacity-100 hidden md:block border border-white"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>

          {/* Container Scroll */}
          <div
            ref={scrollRef}
            className="flex items-center gap-6 md:gap-12 overflow-x-auto snap-x snap-mandatory py-16 px-4 md:px-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>

            {books.map((book, index) => {
              // 🪄 RAHASIA DESAIN "RANDOM BERATURAN":
              // Kalau urutan bukunya Genap (0,2,4) posisinya naik ke atas
              // Kalau urutan bukunya Ganjil (1,3,5) posisinya turun ke bawah
              const isEven = index % 2 === 0;
              const staggerClass = isEven
                ? "md:-translate-y-8"
                : "md:translate-y-8";

              return (
                <div
                  key={book.id}
                  className={`relative flex-shrink-0 snap-center group cursor-pointer w-[160px] sm:w-[180px] md:w-[240px] transition-all duration-700 ease-out hover:z-20 ${staggerClass}`}
                >
                  {/* Naked Book Cover (Tanpa Kartu Putih) */}
                  <div className="relative w-full aspect-[2/3] rounded-md md:rounded-xl overflow-hidden shadow-[0_15px_35px_rgba(30,45,107,0.15)] group-hover:shadow-[0_25px_50px_rgba(30,45,107,0.35)] transition-all duration-500 transform group-hover:scale-[1.08] group-hover:-translate-y-4">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay Gradient Halus (Muncul saat di-hover) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e2d6b]/90 via-[#1e2d6b]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                      <button className="w-full bg-[#FFD32B] text-[#1e2d6b] font-bold text-sm py-2.5 rounded-lg transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 shadow-md">
                        Pinjam Buku
                      </button>
                    </div>
                  </div>

                  {/* Info Buku Mengambang Halus di Bawah */}
                  <div className="mt-5 text-center px-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-base md:text-lg font-bold leading-tight text-[#1e2d6b] line-clamp-1 group-hover:text-[#FFD32B] transition-colors">
                      {book.title}
                    </h4>
                    <p className="mt-1 text-xs md:text-sm font-medium text-gray-500 line-clamp-1">
                      {book.author}
                    </p>
                    <p className="mt-2 text-xs font-bold text-indigo-600 uppercase tracking-widest">
                      Rp {new Intl.NumberFormat("id-ID").format(book.price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tombol Geser Kanan */} 
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 md:-right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm p-4 shadow-[0_10px_30px_rgba(30,45,107,0.2)] text-[#1e2d6b] opacity-0 transition-all duration-300 hover:bg-[#1e2d6b] hover:text-white group-hover/slider:opacity-100 hidden md:block border border-white"
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewBooks;
