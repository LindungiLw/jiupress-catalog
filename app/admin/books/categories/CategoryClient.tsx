"use client";

import React, { useState } from "react";
import { Plus, Trash2, Tag, LayoutGrid } from "lucide-react";

export default function CategoryClient({
  initialCategories,
}: {
  initialCategories: any[];
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [newName, setNewName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi Tambah Kategori ke Database
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return alert("Isi nama kategori terlebih dahulu!");

    setIsLoading(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        // HANYA MENGIRIM NAMA SAJA
        body: JSON.stringify({ name: newName }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan ke server");

      const data = await res.json();
      setCategories([...categories, data]);
      setNewName("");
    } catch (err) {
      alert("Gagal menambah kategori. Cek file API kamu.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi Hapus Kategori dari Database
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus kategori ini?")) return;

    try {
      await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err) {
      alert("Gagal menghapus");
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* HEADER & FORM - Gaya SaaS Bersih */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Tag className="text-blue-600" size={20} /> Manajemen Kategori
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Tambahkan atau hapus pengelompokan jenis buku di katalog.
          </p>
        </div>

        <form
          onSubmit={handleAddCategory}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1">
            <input
              type="text"
              placeholder="Nama Kategori (Contoh: Teknologi, Bisnis...)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-700 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 active:scale-95 transition-all disabled:opacity-50 sm:w-auto w-full"
          >
            {isLoading ? (
              "Menyimpan..."
            ) : (
              <>
                <Plus size={18} /> Tambah Kategori
              </>
            )}
          </button>
        </form>
      </div>

      {/* GRID LIST KATEGORI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:shadow-md hover:border-blue-200 transition-all"
          >
            <div>
              <h4 className="font-bold text-slate-800 truncate">{cat.name}</h4>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide mt-0.5">
                ID KATEGORI: {cat.id}
              </p>
            </div>
            <button
              onClick={() => handleDelete(cat.id)}
              className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              title="Hapus Kategori"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {categories.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center">
          <LayoutGrid size={48} className="text-slate-200 mb-4" />
          <p className="text-slate-500 font-medium text-sm">
            Belum ada kategori yang dibuat.
          </p>
        </div>
      )}
    </div>
  );
}
