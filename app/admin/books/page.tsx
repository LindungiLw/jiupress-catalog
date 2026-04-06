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

// ── 1. MOCK DATA KATEGORI & TAB ──
const CATEGORIES = [
  "Semua",
  "New Arrivals",
  "Best Sellers",
  "Theology",
  "Business & Mgt",
  "Info Technology",
  "Accounting",
  "English Literature",
  "General Education",
  "Leadership",
  "JIU Press",
];

// ── 2. MOCK DATA BUKU (Campuran berbagai kategori) ──
const ALL_BOOKS = [
  {
    id: "B-001",
    title: "Systematic Theology",
    author: "Wayne Grudem",
    price: "Rp 150.000",
    category: "Theology",
    shopee: true,
    wa: true,
  },
  {
    id: "B-002",
    title: "Clean Code",
    author: "Robert C. Martin",
    price: "Rp 210.000",
    category: "Info Technology",
    shopee: true,
    wa: false,
  },
  {
    id: "B-003",
    title: "Atomic Habits",
    author: "James Clear",
    price: "Rp 120.000",
    category: "Best Sellers",
    shopee: true,
    wa: true,
  },
  {
    id: "B-004",
    title: "The JIU Vision 2026",
    author: "JIU Faculty",
    price: "Rp 85.000",
    category: "JIU Press",
    shopee: false,
    wa: true,
  },
  {
    id: "B-005",
    title: "Financial Accounting",
    author: "Weygandt",
    price: "Rp 300.000",
    category: "Accounting",
    shopee: true,
    wa: true,
  },
  {
    id: "B-006",
    title: "Leadership 101",
    author: "John C. Maxwell",
    price: "Rp 95.000",
    category: "Leadership",
    shopee: true,
    wa: false,
  },
  {
    id: "B-007",
    title: "New Testament Exegesis",
    author: "Gordon Fee",
    price: "Rp 175.000",
    category: "New Arrivals",
    shopee: true,
    wa: true,
  },
  {
    id: "B-008",
    title: "Marketing Management",
    author: "Philip Kotler",
    price: "Rp 250.000",
    category: "Business & Mgt",
    shopee: true,
    wa: true,
  },
];

export default function BooksPage() {
  // State untuk menyimpan tab yang sedang aktif
  const [activeTab, setActiveTab] = useState("Semua");
  // State untuk fitur pencarian
  const [searchQuery, setSearchQuery] = useState("");

  // ── 3. LOGIKA FILTERING OTOMATIS ──
  const filteredBooks = ALL_BOOKS.filter((book) => {
    // Filter berdasarkan Tab
    const matchCategory = activeTab === "Semua" || book.category === activeTab;
    // Filter berdasarkan Search Input
    const matchSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      {/* ── HEADER HALAMAN ── */}
      <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h3 className="text-xl font-bold text-[#1e2d6b] leading-tight">
            Manajemen Katalog
          </h3>
          <p className="text-gray-400 text-xs font-medium mt-0.5">
            Total: {ALL_BOOKS.length} Buku Tersedia
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari judul atau penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-[13px] outline-none focus:border-[#1e2d6b] transition-all"
            />
          </div>
          <button className="bg-[#1e2d6b] hover:bg-[#2d3f8e] text-white px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md">
            <Plus size={16} /> Tambah Produk
          </button>
        </div>
      </div>

      {/* ── TAB NAVIGATION (FILTER PILLS) ── */}
      <div
        className="w-full overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-2 whitespace-nowrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                activeTab === cat
                  ? "bg-[#1e2d6b] text-white border-[#1e2d6b] shadow-md"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#1e2d6b]/30 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── INFO FILTER & TABEL BUKU ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        {/* Info Jumlah Hasil */}
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
          <FileBox size={14} className="text-[#1e2d6b]" />
          <p className="text-xs font-bold text-[#1e2d6b]">
            Menampilkan{" "}
            <span className="text-[#FFD32B] px-1 bg-[#1e2d6b] rounded">
              {filteredBooks.length}
            </span>{" "}
            produk dalam kategori "{activeTab}"
          </p>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Judul & Penulis
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Link Sales
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {/* Jika data kosong (karena filter) */}
              {filteredBooks.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-sm text-gray-400 font-medium"
                  >
                    Tidak ada buku di kategori ini.
                  </td>
                </tr>
              )}

              {/* Looping Data Buku */}
              {filteredBooks.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-gray-50/80 transition-colors group"
                >
                  <td className="px-5 py-3 flex items-center gap-3">
                    <div className="w-9 h-12 bg-gray-200 rounded object-cover flex-shrink-0 border border-gray-100"></div>
                    <div>
                      <p className="text-[13px] font-bold text-[#1e2d6b] line-clamp-1">
                        {book.title}
                      </p>
                      <p className="text-[11px] font-medium text-gray-400">
                        {book.author}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded text-[10px] font-bold">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[13px] font-bold text-emerald-600">
                    {book.price}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      {book.shopee && (
                        <span
                          className="flex items-center justify-center w-6 h-6 bg-[#ee4d2d]/10 text-[#ee4d2d] rounded"
                          title="Link Shopee Aktif"
                        >
                          <ShoppingBag size={12} />
                        </span>
                      )}
                      {book.wa && (
                        <span
                          className="flex items-center justify-center w-6 h-6 bg-green-100 text-green-700 rounded"
                          title="Link WA Aktif"
                        >
                          <MessageCircle size={12} />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Edit size={14} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={14} />
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
