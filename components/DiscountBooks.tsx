"use client";

import React from "react";
import { Tag } from "lucide-react";

interface BookProps {
  books: any[];
}

const DiscountBooks = ({ books }: BookProps) => {
  // JIKA DATA KOSONG, JANGAN TAMPILKAN APAPUN (KOMPONEN HILANG)
  if (!books || books.length === 0) return null;

  return (
    <section className="w-full bg-white px-[5%] pt-0 pb-20 font-[Poppins,sans-serif]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2 text-red-500 font-bold text-xs uppercase tracking-widest">
            <Tag size={14} /> Penawaran Terbatas
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-[#1e2d6b] tracking-tight">
            Buku Diskon
          </h3>
          <div className="w-12 h-1.5 bg-red-500 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => {
            const price = book.price || 0;
            const dPrice = book.discountPrice || 0;
            const percentage =
              price > 0 ? Math.round(((price - dPrice) / price) * 100) : 0;

            return (
              <div
                key={book.id}
                className="group bg-[#fcfcfc] rounded-[24px] p-4 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[3/4] rounded-[18px] overflow-hidden mb-4 shadow-sm bg-gray-100">
                  {book.image && (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg">
                    -{percentage}%
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {book.author}
                  </p>
                  <h4 className="text-sm font-bold text-[#1e2d6b] line-clamp-1 mb-2">
                    {book.title}
                  </h4>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[11px] text-gray-400 line-through">
                      Rp {new Intl.NumberFormat("id-ID").format(price)}
                    </span>
                    <span className="text-base font-black text-red-600">
                      Rp {new Intl.NumberFormat("id-ID").format(dPrice)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DiscountBooks;
