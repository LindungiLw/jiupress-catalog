"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  LayoutGrid,
  X,
  Save,
  Image as ImageIcon,
  Link as LinkIcon,
  ShoppingBag,
} from "lucide-react";

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
  const [editingId, setEditingId] = useState<number | null>(null);

  const [imageInputType, setImageInputType] = useState<"url" | "upload">("url");

  const defaultForm = {
    title: "",
    subtitle: "",
    isbn: "",
    author: "",
    categoryId: "",
    price: "",
    discountPrice: "",
    image: "",
    shopeeLink: "",
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

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(defaultForm);
    setImageInputType("url");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (book: any) => {
    setEditingId(book.id);
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
      shopeeLink: book.shopeeLink || "",
      description: book.description || "",
      publishedDate: formatForDateInput(book.publishedDate),
      releaseAt: formatForDatetimeInput(book.releaseAt),
    });

    if (book.image && book.image.startsWith("data:image")) {
      setImageInputType("upload");
    } else {
      setImageInputType("url");
    }

    setIsModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

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
        setBookList(bookList.map((b) => (b.id === editingId ? savedBook : b)));
      } else {
        setBookList([savedBook, ...bookList]);
      }
      setIsModalOpen(false);
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">
            Katalog Produk
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            Kelola daftar buku yang tampil di halaman utama.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative w-full sm:w-64">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Cari judul / penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-2 transition-all"
            />
          </div>
          <button
            onClick={handleOpenAdd}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
          >
            <Plus size={18} /> Tambah Buku
          </button>
        </div>
      </div>

      {/* TABS KATEGORI */}
      <div
        className="w-full overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-2 whitespace-nowrap">
          <button
            onClick={() => setActiveTab("Semua")}
            className={`px-5 py-2 rounded-xl text-sm font-semibold border transition-all ${activeTab === "Semua" ? "bg-slate-800 text-white border-slate-800 shadow-md" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"}`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.name)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold border transition-all ${activeTab === cat.name ? "bg-slate-800 text-white border-slate-800 shadow-md" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* TABEL BUKU */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <LayoutGrid size={16} className="text-blue-600" />
          <p className="text-sm font-semibold text-slate-700">
            Menampilkan{" "}
            <span className="text-blue-600 font-bold">
              {filteredBooks.length}
            </span>{" "}
            produk
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-white">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Judul & Penulis
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBooks.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="w-12 h-16 bg-slate-100 rounded-lg border border-slate-200 overflow-hidden flex-shrink-0 shadow-sm">
                      {book.image ? (
                        <img
                          src={book.image}
                          className="w-full h-full object-cover"
                          alt="cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px] font-bold">
                          NO IMG
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 line-clamp-1">
                        {book.title}
                      </p>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">
                        {book.author}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold w-max border border-blue-100/50">
                      {book.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">
                      {formatRupiah(book.price)}
                    </p>
                    {book.discountPrice && (
                      <p className="text-xs text-red-500 line-through mt-0.5">
                        {formatRupiah(book.discountPrice)}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenEdit(book)}
                        className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                        title="Edit Buku"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
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
            <div className="p-12 text-center text-slate-500 text-sm font-medium">
              Tidak ada data buku yang sesuai.
            </div>
          )}
        </div>
      </div>

      {/* MODAL POP-UP TAMBAH/EDIT BUKU */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 px-8 py-5 flex items-center justify-between z-20">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {editingId ? "Edit Data Buku" : "Tambah Buku Baru"}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {editingId
                    ? "Perbarui informasi metadata buku."
                    : "Lengkapi form untuk menambah katalog."}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/30"
            >
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                    Judul Buku *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                    Sub Judul
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                      Penulis *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                      ISBN
                    </label>
                    <input
                      type="text"
                      value={formData.isbn}
                      onChange={(e) =>
                        setFormData({ ...formData, isbn: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                    Kategori *
                  </label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-700"
                  >
                    <option value="" disabled>
                      -- Pilih Kategori --
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* === INPUT LINK SHOPEE === */}
                <div>
                  <label className="text-xs font-bold text-orange-600 uppercase mb-2 flex items-center gap-1">
                    <ShoppingBag size={14} /> Link Shopee
                  </label>
                  <input
                    type="url"
                    value={formData.shopeeLink}
                    onChange={(e) =>
                      setFormData({ ...formData, shopeeLink: e.target.value })
                    }
                    className="w-full bg-orange-50/50 border border-orange-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder:text-orange-300 text-orange-800"
                    placeholder="https://shopee.co.id/..."
                  />
                </div>

                <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
                  <label className="text-xs font-bold text-slate-500 uppercase mb-3 block">
                    Gambar / Cover Buku
                  </label>
                  <div className="flex gap-4 mb-4">
                    <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-blue-600">
                      <input
                        type="radio"
                        checked={imageInputType === "url"}
                        onChange={() => setImageInputType("url")}
                        className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <LinkIcon size={16} /> Link URL
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-blue-600">
                      <input
                        type="radio"
                        checked={imageInputType === "upload"}
                        onChange={() => setImageInputType("upload")}
                        className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <ImageIcon size={16} /> Upload Lokal
                    </label>
                  </div>
                  {imageInputType === "url" ? (
                    <input
                      key="input-url"
                      type="url"
                      value={formData.image || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="https://contoh.com/gambar.jpg"
                    />
                  ) : (
                    <input
                      key="input-file"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-2 text-sm outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    />
                  )}
                  {formData.image && (
                    <div className="mt-4 flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-20 w-14 object-cover rounded shadow-sm border border-slate-200"
                      />
                      <div className="text-xs text-slate-500">
                        <p className="font-bold text-slate-700 mb-0.5">
                          Preview Cover
                        </p>
                        <p className="line-clamp-2 break-all text-[10px]">
                          {formData.image.substring(0, 60)}...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                      Harga (Rp) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                      Harga Diskon
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
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                      Tgl Rilis Fisik
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
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-emerald-600 uppercase mb-2 block">
                      Jadwal Tampil Web *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.releaseAt}
                      onChange={(e) =>
                        setFormData({ ...formData, releaseAt: e.target.value })
                      }
                      className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-emerald-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                    Deskripsi Sinopsis
                  </label>
                  <textarea
                    rows={6}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 pt-6 mt-2 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-all text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all shadow-md disabled:opacity-50"
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
