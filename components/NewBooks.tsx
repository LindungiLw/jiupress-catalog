"use client";

import React, { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";

interface BookProps {
  books: any[];
}

const NewBooks = ({ books }: BookProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    // ── Padding atas (pt-0) agar mepet ke atas dan tetap menggunakan Poppins ──
    <section className="w-full bg-[#f8fafc] px-[5%] pt-0 pb-20 font-[Poppins,sans-serif]">
      <div className="mx-auto max-w-7xl">
        {/* ── Header: "New Books" di Tengah ── */}
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-black text-[#1e2d6b] tracking-tight">
            New Books
          </h3>
          <div className="w-12 h-1.5 bg-[#FFD32B] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* ── Slider Area ── */}
        <div className="relative group/slider">
          {/* Tombol Geser Kiri */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-[40%] z-20 -translate-y-1/2 rounded-full bg-white p-3 shadow-[0_10px_30px_rgba(30,45,107,0.12)] text-[#1e2d6b] opacity-0 transition-all duration-300 hover:bg-[#1e2d6b] hover:text-white group-hover/slider:opacity-100 hidden md:block border border-gray-50"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Container Scroll */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory py-4 px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>

            {books.map((book) => (
              // ── Kartu Minimalis ──
              <div
                key={book.id}
                className="min-w-[240px] max-w-[240px] md:min-w-[280px] md:max-w-[280px] snap-start flex-shrink-0 bg-white rounded-[24px] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 group flex flex-col"
              >
                {/* ── Area Gambar & Hover Effect ── */}
                <div className="w-full aspect-[4/5] rounded-[18px] overflow-hidden mb-4 bg-gray-50 relative">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Badge Harga (Kanan Atas) */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-full text-[11px] font-black text-[#1e2d6b] shadow-sm z-10">
                    Rp {new Intl.NumberFormat("id-ID").format(book.price)}
                  </div>

                  {/* ── OVERLAY HOVER: Tombol Shopee & WA ── */}
                  <div className="absolute inset-0 bg-[#1e2d6b]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 z-0">
                    <button
                      onClick={() => window.open("#", "_blank")}
                      className="flex items-center gap-2 bg-[#EE4D2D] text-white px-5 py-2.5 rounded-xl font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-[#d74226] active:scale-95 w-3/4 justify-center"
                    >
                      <ShoppingBag size={18} /> Shopee
                    </button>

                    <button
                      onClick={() => window.open("+62 812-6017-3697", "_blank")}
                      className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 shadow-lg hover:bg-[#20b858] active:scale-95 w-3/4 justify-center"
                    >
                      <MessageCircle size={18} /> WhatsApp
                    </button>
                  </div>
                </div>

                {/* ── Area Teks (Minimalis) ── */}
                <div className="px-2 pb-2 text-center flex flex-col justify-center flex-grow">
                  <p className="text-[#FFD32B] text-[10px] font-bold uppercase tracking-widest mb-1">
                    {book.author}
                  </p>
                  <h4 className="text-lg font-black text-[#1e2d6b] leading-snug line-clamp-2">
                    {book.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Geser Kanan */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-[40%] z-20 -translate-y-1/2 rounded-full bg-white p-3 shadow-[0_10px_30px_rgba(30,45,107,0.12)] text-[#1e2d6b] opacity-0 transition-all duration-300 hover:bg-[#1e2d6b] hover:text-white group-hover/slider:opacity-100 hidden md:block border border-gray-50"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewBooks;
