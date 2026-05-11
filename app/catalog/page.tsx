import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  SearchX,
  ShoppingBag,
  Search,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}) {
  // Tunggu searchParams
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const category = resolvedParams.category || "";
  const sort = resolvedParams.sort || "newest";

  // ─── LOGIKA PENCARIAN PRISMA ───
  const whereClause: any = {};

  if (category) {
    whereClause.category = {
      name: category,
    };
  }

  if (query) {
    whereClause.OR = [
      { title: { contains: query } },
      { author: { contains: query } },
    ];
  }

  // ─── LOGIKA SORTING (URUTAN) ───
  let orderByClause: any = { createdAt: "desc" }; // Default: Terbaru
  if (sort === "az") orderByClause = { title: "asc" }; // A sampai Z
  if (sort === "za") orderByClause = { title: "desc" }; // Z sampai A

  // Tarik data dari database
  const books = await prisma.book.findMany({
    where: whereClause,
    include: { category: true },
    orderBy: orderByClause,
  });

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[Poppins,sans-serif] flex flex-col selection:bg-blue-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full pt-32 pb-24 grow flex flex-col">
        {/* Tombol Kembali */}
        <div className="animate-in fade-in slide-in-from-left-4 duration-500 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all font-semibold text-sm w-max group px-4 py-2 rounded-full hover:bg-white hover:shadow-sm"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Kembali ke Beranda
          </Link>
        </div>

        {/* =========================================
            HEADER JUDUL HALAMAN
            ========================================= */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-8 duration-700">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2d6b] tracking-tight leading-tight">
            {category ? (
              <>
                Kategori: <span className="text-[#FFD32B]">{category}</span>
              </>
            ) : query ? (
              <>
                Pencarian: <span className="text-blue-500">"{query}"</span>
              </>
            ) : (
              "Semua Koleksi Buku"
            )}
          </h1>
          <div className="w-16 h-1.5 bg-[#FFD32B] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* =========================================
            TOOLBAR: PENCARIAN & SORTING (DIPERBAIKI)
            ========================================= */}
        <div className="bg-white rounded-2xl p-3 md:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-200 mb-10 flex flex-col xl:flex-row justify-between items-center gap-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Form Pencarian & Sorting */}
          <form
            action="/catalog"
            method="GET"
            className="flex flex-col sm:flex-row w-full xl:w-auto gap-3 items-center flex-1"
          >
            {category && (
              <input type="hidden" name="category" value={category} />
            )}

            {/* Input Search Pintar */}
            <div className="relative w-full sm:max-w-md lg:max-w-lg flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Cari judul buku atau penulis..."
                // pl-12 digunakan agar teks tidak menabrak icon kaca pembesar
                className="w-full bg-slate-50 border border-slate-200 text-[#1e2d6b] font-semibold text-sm rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[#1e2d6b] focus:ring-2 focus:ring-[#1e2d6b]/10 transition-all placeholder:font-medium placeholder:text-slate-400"
              />
            </div>

            <div className="flex w-full sm:w-auto gap-3 shrink-0">
              {/* Dropdown Sorting */}
              <div className="relative w-full sm:w-48">
                <SlidersHorizontal
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <select
                  name="sort"
                  defaultValue={sort}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-600 font-bold text-sm rounded-xl py-3 pl-12 pr-8 outline-none focus:border-[#1e2d6b] focus:ring-2 focus:ring-[#1e2d6b]/10 transition-all appearance-none cursor-pointer"
                >
                  <option value="newest">Terbaru</option>
                  <option value="az">Abjad A - Z</option>
                  <option value="za">Abjad Z - A</option>
                </select>
                {/* Panah Dropdown Custom */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Tombol Terapkan */}
              <button
                type="submit"
                className="bg-[#1e2d6b] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-800 transition-colors active:scale-95 shadow-sm whitespace-nowrap"
              >
                Cari
              </button>
            </div>
          </form>

          {/* Indikator Total Buku (Di Kanan) */}
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center xl:text-right w-full xl:w-auto border-t xl:border-t-0 border-slate-100 pt-4 xl:pt-0 shrink-0">
            Ditemukan{" "}
            <span className="text-[#1e2d6b] text-xl font-black mx-1">
              {books.length}
            </span>{" "}
            buku
          </div>
        </div>

        {/* =========================================
            AREA KONTEN (GRID BUKU / EMPTY STATE)
            ========================================= */}
        {books.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {books.map((book, index) => (
              <Link
                href={`/catalog/${book.id}`}
                key={book.id}
                className="bg-white rounded-[2rem] p-4 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 hover:border-blue-100 transition-all duration-500 group flex flex-col h-full animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50 mb-5 relative shadow-inner">
                  <img
                    src={
                      book.image ||
                      "https://via.placeholder.com/400x600?text=No+Cover"
                    }
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <span className="text-white text-xs font-bold flex items-center gap-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Lihat Detail <ArrowRight size={14} />
                    </span>
                  </div>
                  {book.discountPrice && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-red-500/30">
                      PROMO
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-grow px-2 pb-2">
                  <p className="text-[#FFD32B] text-[10px] font-bold uppercase tracking-widest mb-2 line-clamp-1">
                    {book.category?.name || "Umum"}
                  </p>
                  <h3 className="text-[15px] font-black text-[#1e2d6b] leading-[1.3] line-clamp-2 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-5 line-clamp-1 font-medium">
                    {book.author}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between">
                    <div>
                      {book.discountPrice ? (
                        <div className="flex flex-col">
                          <span className="text-[11px] text-red-400 line-through font-bold mb-0.5">
                            {formatRupiah(book.price)}
                          </span>
                          <span className="text-base font-black text-slate-900 tracking-tight">
                            {formatRupiah(book.discountPrice)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-base font-black text-slate-900 tracking-tight">
                          {formatRupiah(book.price)}
                        </span>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#FFD32B] group-hover:text-[#1e2d6b] group-hover:shadow-lg transition-all duration-300">
                      <ShoppingBag size={16} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="w-full bg-white rounded-[2.5rem] border border-slate-100 p-12 md:p-24 flex flex-col items-center justify-center text-center shadow-xl shadow-slate-200/20 relative overflow-hidden animate-in zoom-in-95 duration-700">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="relative z-10">
              <div
                className="w-28 h-28 bg-gradient-to-tr from-slate-100 to-white rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300 shadow-inner border border-white animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <SearchX size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">
                Buku Tidak Ditemukan
              </h3>
              <p className="text-slate-500 max-w-md mx-auto leading-relaxed mb-10 text-lg">
                Buku yang Anda cari sedang bersembunyi. Mari coba kata kunci
                atau urutan lain.
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
