"use client";

import React from "react";
import { Plus, Tags, BookMarked } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    { name: "New Arrivals", count: 12, color: "bg-amber-50 text-amber-600" },
    { name: "Best Sellers", count: 8, color: "bg-orange-50 text-orange-600" },
    { name: "Theology", count: 45, color: "bg-blue-50 text-blue-600" },
    {
      name: "Business & Mgt",
      count: 32,
      color: "bg-emerald-50 text-emerald-600",
    }, // Teks disingkat
    {
      name: "Info Technology",
      count: 28,
      color: "bg-purple-50 text-purple-600",
    }, // Teks disingkat
    { name: "Accounting", count: 15, color: "bg-indigo-50 text-indigo-600" },
    {
      name: "English Literature",
      count: 20,
      color: "bg-pink-50 text-pink-600",
    },
    {
      name: "General Education",
      count: 10,
      color: "bg-slate-50 text-slate-600",
    },
    { name: "Leadership", count: 14, color: "bg-cyan-50 text-cyan-600" },
    { name: "JIU Press", count: 22, color: "bg-red-50 text-red-600" },
    { name: "Research", count: 18, color: "bg-teal-50 text-teal-600" },
    { name: "Essentials", count: 25, color: "bg-lime-50 text-lime-600" },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      {/* Header Halaman (Lebih compact) */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-xl font-bold text-[#1e2d6b] leading-tight">
            Kategori Produk
          </h3>
          <p className="text-gray-400 text-xs font-medium mt-0.5">
            Kelola klasifikasi buku di JIU Store
          </p>
        </div>
        <button className="bg-[#1e2d6b] hover:bg-[#2d3f8e] text-white px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-md">
          <Plus size={16} /> Tambah Kategori
        </button>
      </div>

      {/* Grid Area (Jarak gap-4, kartu jadi p-4) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="group bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#FFD32B]/50 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[110px]"
          >
            {/* Ikon diperkecil (w-8 h-8) */}
            <div
              className={`w-8 h-8 rounded-lg ${cat.color} flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}
            >
              <Tags size={16} />
            </div>

            {/* Teks diperkecil */}
            <div className="z-10 relative">
              <h4 className="text-[14px] font-bold text-[#1e2d6b] mb-0.5 group-hover:text-[#FFD32B] transition-colors line-clamp-1">
                {cat.name}
              </h4>
              <p className="text-[11px] font-medium text-gray-400">
                {cat.count} Judul
              </p>
            </div>

            {/* Dekorasi Background tetap ada tapi disesuaikan posisinya */}
            <BookMarked
              size={60}
              className="absolute -right-3 -bottom-3 text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity z-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
