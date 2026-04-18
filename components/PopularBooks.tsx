"use client";

import React from "react";

interface BookProps {
  books: any[];
}

const PopularBooks = ({ books }: BookProps) => {
  // Kita ambil 4-6 buku saja untuk bagian populer
  const topBooks = books.slice(0, 6);

  return (
    // Padding atas dan bawah 0 (pt-0 pb-0)
    <section className="w-full bg-white px-[5%] pt-0 pb-0 font-[Poppins,sans-serif]">
      <div className="mx-auto max-w-7xl">
        {/* ── Header: Judul di Tengah ── */}
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-black text-[#1e2d6b] tracking-tight">
            Buku yang Populer
          </h3>
          <div className="w-12 h-1.5 bg-[#FFD32B] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* ── Grid: UI Disamakan dengan gaya BookClient ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
          {topBooks.map((book) => (
            <div
              key={book.id}
              className="group flex items-center bg-white rounded-[18px] p-4 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_15px_30px_rgb(30,45,107,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Gambar Buku (Sesuai gaya BookClient) */}
              <div className="w-[70px] h-[95px] min-w-[70px] bg-gray-50 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Informasi Buku (Sesuai gaya BookClient) */}
              <div className="ml-4 flex flex-col justify-center overflow-hidden">
                {/* Kategori Badge */}
                <div className="mb-1.5">
                  <span className="bg-gray-100 text-gray-500 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {book.category || "Umum"}
                  </span>
                </div>

                {/* Judul Buku */}
                <h4 className="text-[15px] font-bold text-[#1e2d6b] leading-tight mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {book.title}
                </h4>

                {/* Penulis */}
                <p className="text-gray-400 text-[11px] font-medium mb-2">
                  {book.author}
                </p>

                {/* Harga */}
                <p className="text-[13px] font-black text-emerald-600">
                  Rp {new Intl.NumberFormat("id-ID").format(book.price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Semua jika perlu */}
        <div className="flex justify-center pb-20">
          <button className="px-6 py-2.5 rounded-xl border border-gray-200 text-[#1e2d6b] font-bold text-xs transition-all hover:bg-[#1e2d6b] hover:text-white active:scale-95 shadow-sm">
            Lihat Semua Koleksi
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularBooks;
