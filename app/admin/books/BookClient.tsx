"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ShoppingBag,
  MessageCircle,
  FileBox,
} from "lucide-react";

export default function BookClient({ books }: { books: any[] }) {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // ── 1. KATEGORI DINAMIS ──
  // Mengambil kategori unik langsung dari database + kategori wajib
  const dbCategories = Array.from(new Set(books.map((b) => b.category)));
  const CATEGORIES = [
    "Semua",
    "Teknologi",
    "Bisnis",
    "Theology",
    "JIU Press",
    ...dbCategories.filter(
      (c) => !["Teknologi", "Bisnis", "Theology", "JIU Press"].includes(c),
    ),
  ];

  // ── 2. LOGIKA FILTERING ──
  const filteredBooks = books.filter((book) => {
    const matchCategory = activeTab === "Semua" || book.category === activeTab;
    const matchSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Fungsi format Rupiah
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300 p-2">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 rounded-xl border border-gray-100 shadow-sm gap-4">
        <div>
          <h3 className="text-xl font-bold text-[#1e2d6b]">
            Manajemen Katalog
          </h3>
          <p className="text-gray-400 text-xs font-medium">
            Total: {books.length} Buku Tersedia
          </p>
        </div>
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative w-full md:w-64">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari buku..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-[13px] outline-none focus:border-[#1e2d6b]"
            />
          </div>
          <button className="bg-[#1e2d6b] text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#2d3f8e] transition-all">
            <Plus size={16} /> Tambah Produk
          </button>
        </div>
      </div>

      {/* TABS */}
      <div
        className="w-full overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-2 whitespace-nowrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                activeTab === cat
                  ? "bg-[#1e2d6b] text-white"
                  : "bg-white text-gray-500 border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
          <FileBox size={14} className="text-[#1e2d6b]" />
          <p className="text-xs font-bold text-[#1e2d6b]">
            Menampilkan{" "}
            <span className="text-[#FFD32B] px-1 bg-[#1e2d6b] rounded">
              {filteredBooks.length}
            </span>{" "}
            produk
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-white">
                <th className="px-5 py-4 text-[11px] font-bold text-gray-400 uppercase">
                  Judul & Penulis
                </th>
                <th className="px-5 py-4 text-[11px] font-bold text-gray-400 uppercase">
                  Kategori
                </th>
                <th className="px-5 py-4 text-[11px] font-bold text-gray-400 uppercase">
                  Harga
                </th>
                <th className="px-5 py-4 text-[11px] font-bold text-gray-400 uppercase text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBooks.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-5 py-4 flex items-center gap-3">
                    <div className="w-10 h-14 bg-gray-100 rounded border border-gray-200 overflow-hidden flex-shrink-0">
                      {book.image && (
                        <img
                          src={book.image}
                          className="w-full h-full object-cover"
                          alt="cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1e2d6b] line-clamp-1">
                        {book.title}
                      </p>
                      <p className="text-[11px] font-medium text-gray-400">
                        {book.author}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-emerald-600">
                    {formatRupiah(book.price)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
