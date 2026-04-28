"use client";

import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, FileBox, X, Save } from "lucide-react";

export default function BookClient({
  books: initialBooks,
  categories,
}: {
  books: any[];
  categories: any[];
}) {
  const [bookList, setBookList] = useState(initialBooks);
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null); // State untuk mendeteksi mode Edit

  const defaultForm = {
    title: "",
    subtitle: "",
    isbn: "",
    author: "",
    categoryId: "",
    price: "",
    discountPrice: "",
    image: "",
    description: "",
    publishedDate: "",
    releaseAt: "",
  };
  const [formData, setFormData] = useState(defaultForm);

  const filteredBooks = bookList.filter((book) => {
    const categoryName = book.category?.name || "Tanpa Kategori";
    const matchCategory = activeTab === "Semua" || categoryName === activeTab;
    const matchSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // ── Fungsi Buka Modal Tambah ──
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(defaultForm);
    setIsModalOpen(true);
  };

  // ── Fungsi Buka Modal Edit ──
  const handleOpenEdit = (book: any) => {
    setEditingId(book.id);

    // Format tanggal dari database (ISO) agar bisa masuk ke input type="date" & "datetime-local"
    const formatForDateInput = (isoString: string | null) =>
      isoString ? new Date(isoString).toISOString().split("T")[0] : "";
    const formatForDatetimeInput = (isoString: string | null) =>
      isoString ? new Date(isoString).toISOString().slice(0, 16) : "";

    setFormData({
      title: book.title,
      subtitle: book.subtitle || "",
      isbn: book.isbn || "",
      author: book.author,
      categoryId: book.categoryId ? String(book.categoryId) : "",
      price: String(book.price),
      discountPrice: book.discountPrice ? String(book.discountPrice) : "",
      image: book.image || "",
      description: book.description || "",
      publishedDate: formatForDateInput(book.publishedDate),
      releaseAt: formatForDatetimeInput(book.releaseAt),
    });
    setIsModalOpen(true);
  };

  // ── Fungsi Simpan (Menangani POST & PUT) ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = editingId ? "PUT" : "POST";
      const payload = editingId ? { id: editingId, ...formData } : formData;

      const res = await fetch("/api/books", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal menyimpan buku");
      const savedBook = await res.json();

      if (editingId) {
        // Update data di tabel (Replace buku lama dengan hasil edit baru)
        setBookList(bookList.map((b) => (b.id === editingId ? savedBook : b)));
        alert("Buku berhasil diperbarui!");
      } else {
        // Tambah buku baru ke urutan atas tabel
        setBookList([savedBook, ...bookList]);
        alert("Buku baru berhasil ditambahkan!");
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsLoading(false);
    }
  };

  // ── Fungsi Hapus ──
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus buku ini dari katalog?")) return;
    try {
      const res = await fetch(`/api/books?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus");
      setBookList(bookList.filter((b) => b.id !== id));
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus buku.");
    }
  };

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300 p-2">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 rounded-xl border border-gray-100 shadow-sm gap-4">
        <div>
          <h3 className="text-xl font-bold text-[#1e2d6b]">
            Manajemen Katalog
          </h3>
          <p className="text-gray-400 text-xs font-medium">
            Total: {bookList.length} Buku Tersedia
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
          <button
            onClick={handleOpenAdd}
            className="bg-[#1e2d6b] text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#2d3f8e] transition-all"
          >
            <Plus size={16} /> Tambah Produk
          </button>
        </div>
      </div>

      {/* ── TABS KATEGORI ── */}
      <div
        className="w-full overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-2 whitespace-nowrap">
          <button
            onClick={() => setActiveTab("Semua")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${activeTab === "Semua" ? "bg-[#1e2d6b] text-white" : "bg-white text-gray-500 border-gray-200"}`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.name)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1 ${activeTab === cat.name ? "bg-[#1e2d6b] text-white" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── TABEL BUKU ── */}
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
                      {book.image ? (
                        <img
                          src={book.image}
                          className="w-full h-full object-cover"
                          alt="cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                          No Img
                        </div>
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
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1 w-max">
                      {book.category?.icon}{" "}
                      {book.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-emerald-600">
                    {formatRupiah(book.price)}
                    {book.discountPrice && (
                      <span className="ml-2 text-[10px] text-red-500 line-through">
                        {formatRupiah(book.discountPrice)}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Tombol Edit Aktif */}
                      <button
                        onClick={() => handleOpenEdit(book)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit Buku"
                      >
                        <Edit size={16} />
                      </button>
                      {/* Tombol Hapus Aktif */}
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Hapus Buku"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBooks.length === 0 && (
            <div className="p-8 text-center text-gray-400 text-sm font-medium">
              Tidak ada buku yang ditemukan.
            </div>
          )}
        </div>
      </div>

      {/* ── MODAL POP-UP TAMBAH/EDIT BUKU ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e2d6b]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="text-xl font-black text-[#1e2d6b]">
                  {editingId ? "Edit Data Buku" : "Tambah Buku Baru"}
                </h3>
                <p className="text-xs text-gray-500">
                  {editingId
                    ? "Ubah detail informasi katalog buku ini"
                    : "Masukkan metadata buku untuk katalog JIU Press"}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Kolom Kiri */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                    Judul Buku *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#1e2d6b]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                    Sub Judul
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#1e2d6b]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                      Penulis *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#1e2d6b]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                      ISBN
                    </label>
                    <input
                      type="text"
                      value={formData.isbn}
                      onChange={(e) =>
                        setFormData({ ...formData, isbn: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#1e2d6b]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                    Kategori *
                  </label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#1e2d6b] appearance-none"
                  >
                    <option value="" disabled>
                      -- Pilih Kategori --
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                    Link Gambar Cover (URL)
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#1e2d6b]"
                  />
                </div>
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                      Harga (Rp) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#1e2d6b]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                      Harga Diskon (Rp)
                    </label>
                    <input
                      type="number"
                      value={formData.discountPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discountPrice: e.target.value,
                        })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#1e2d6b]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                      Tgl Terbit Fisik
                    </label>
                    <input
                      type="date"
                      value={formData.publishedDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          publishedDate: e.target.value,
                        })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#1e2d6b]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1 block">
                      Jadwal Rilis Web *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.releaseAt}
                      onChange={(e) =>
                        setFormData({ ...formData, releaseAt: e.target.value })
                      }
                      className="w-full bg-emerald-50 border border-emerald-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-emerald-500 text-emerald-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                    Deskripsi / Sinopsis
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#1e2d6b] resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="col-span-1 md:col-span-2 pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#1e2d6b] text-white px-8 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#2d3f8e] active:scale-95 transition-all shadow-md disabled:opacity-50"
                >
                  {isLoading ? (
                    "Menyimpan..."
                  ) : (
                    <>
                      <Save size={18} />{" "}
                      {editingId ? "Update Data" : "Simpan Buku"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
