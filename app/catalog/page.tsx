import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  SearchX,
  ShoppingBag,
  Library,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  // Tunggu searchParams (Wajib di Next.js versi terbaru)
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const category = resolvedParams.category || "";

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

  // Tarik data dari database berdasarkan filter di atas
  const books = await prisma.book.findMany({
    where: whereClause,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] font-[Poppins,sans-serif] flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full pt-32 pb-24 grow">
        {/* Tombol Kembali */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-semibold text-sm mb-6 w-max"
        >
          <ArrowLeft size={18} />
          Kembali ke Beranda
        </Link>

        {/* =========================================
            HEADER HASIL PENCARIAN (BANNER MODERN)
            ========================================= */}
        <div className="mb-10 bg-slate-900 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-xl border border-slate-800">
          {/* Dekorasi Cahaya Latar */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-[#FFD32B]/10 blur-3xl rounded-full pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex-1">
              <p className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-3 flex items-center gap-2">
                <Sparkles size={16} /> Daftar Koleksi
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                {category ? (
                  <>
                    Kategori{" "}
                    <span className="text-[#FFD32B] underline decoration-4 underline-offset-4 decoration-blue-500/50">
                      {category}
                    </span>
                  </>
                ) : query ? (
                  <>
                    Pencarian: <span className="text-blue-400">"{query}"</span>
                  </>
                ) : (
                  "Semua Koleksi Buku"
                )}
              </h1>
              <p className="text-slate-400 font-medium max-w-xl text-sm md:text-base leading-relaxed">
                {books.length > 0
                  ? `Jelajahi ${books.length} buku terbaik yang kami temukan khusus untuk Anda. Temukan inspirasi dan wawasan baru dari koleksi JIU Press.`
                  : "Sayang sekali, koleksi yang Anda cari belum tersedia di sistem kami saat ini."}
              </p>
            </div>

            {/* Kotak Info Total Buku */}
            {books.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-4 shrink-0 shadow-inner">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-300">
                  <Library size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Total Ditemukan
                  </p>
                  <p className="text-3xl font-black text-white leading-none">
                    {books.length}{" "}
                    <span className="text-base text-slate-500 font-medium tracking-normal">
                      buku
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================
            AREA KONTEN (GRID BUKU / EMPTY STATE)
            ========================================= */}
        {books.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
            {books.map((book) => (
              <Link
                href={`/catalog/${book.id}`}
                key={book.id}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
              >
                {/* Gambar Cover */}
                <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 mb-4 relative border border-slate-100 shadow-inner">
                  <img
                    src={
                      book.image ||
                      "https://via.placeholder.com/400x600?text=No+Cover"
                    }
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {book.discountPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black tracking-wider px-2 py-1 rounded shadow-sm">
                      PROMO
                    </div>
                  )}
                </div>

                {/* Info Buku */}
                <div className="flex flex-col flex-grow">
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1.5 line-clamp-1">
                    {book.category?.name || "Kategori Umum"}
                  </p>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-1 font-medium">
                    {book.author}
                  </p>

                  {/* Harga */}
                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-end justify-between">
                    <div>
                      {book.discountPrice ? (
                        <div className="flex flex-col">
                          <span className="text-[10px] text-red-400 line-through font-bold">
                            {formatRupiah(book.price)}
                          </span>
                          <span className="text-sm md:text-base font-black text-slate-900">
                            {formatRupiah(book.discountPrice)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm md:text-base font-black text-slate-900">
                          {formatRupiah(book.price)}
                        </span>
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#FFD32B] group-hover:text-slate-900 transition-colors shadow-sm">
                      <ShoppingBag size={14} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* =========================================
             EMPTY STATE (Desain Premium)
             ========================================= */
          <div className="w-full bg-white rounded-[2rem] border border-slate-100 p-12 md:p-24 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
            {/* Ornamen Latar Tipis */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-slate-50 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400 shadow-inner border border-white">
                <SearchX size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">
                Oops! Buku Tidak Ditemukan
              </h3>
              <p className="text-slate-500 max-w-md mx-auto leading-relaxed mb-8">
                Maaf, kami sudah mencari ke seluruh rak digital kami tapi belum
                menemukan buku dengan kategori atau kata kunci tersebut.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-blue-600 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
