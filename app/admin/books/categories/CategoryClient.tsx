"use client";

import React, { useState } from "react";
import { Plus, Trash2, Tag, SmilePlus } from "lucide-react";

export default function CategoryClient({
  initialCategories,
}: {
  initialCategories: any[];
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi Tambah Kategori ke Database
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newIcon) return alert("Isi nama dan ikon dulu ya!");

    setIsLoading(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({ name: newName, icon: newIcon }),
      });
      const data = await res.json();
      setCategories([...categories, data]);
      setNewName("");
      setNewIcon("");
    } catch (err) {
      alert("Gagal menambah kategori");
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi Hapus Kategori dari Database
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin mau hapus kategori ini?")) return;

    try {
      await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err) {
      alert("Gagal menghapus");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-2 animate-in fade-in duration-500">
      {/* HEADER & FORM */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-[#1e2d6b] mb-5 flex items-center gap-2">
          <Tag className="text-[#FFD32B]" size={20} /> Category Management
        </h3>

        <form onSubmit={handleAddCategory} className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Category Name (e.g. Technology)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#1e2d6b] transition-all"
            />
          </div>
          <div className="w-24">
            <input
              type="text"
              placeholder="Icon 💻"
              value={newIcon}
              onChange={(e) => setNewIcon(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-center outline-none focus:border-[#1e2d6b] transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#1e2d6b] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#2d3f8e] active:scale-95 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              "Adding..."
            ) : (
              <>
                <Plus size={18} /> Add Category
              </>
            )}
          </button>
        </form>
      </div>

      {/* GRID LIST KATEGORI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-[#1e2d6b]/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
                {cat.icon}
              </div>
              <div>
                <h4 className="font-bold text-[#1e2d6b]">{cat.name}</h4>
                <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                  ID: {cat.id}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(cat.id)}
              className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <SmilePlus size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-400 font-medium">
            No categories found. Let's create one!
          </p>
        </div>
      )}
    </div>
  );
}
