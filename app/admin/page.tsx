import { prisma } from "@/lib/prisma";
import { BookOpen, Tags } from "lucide-react";

export default async function AdminDashboard() {
  // Mengambil total data langsung dari database secara real-time
  const totalBooks = await prisma.book.count();
  const totalCategories = await prisma.category.count();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Selamat datang kembali! Berikut adalah ringkasan sistem JIU Press hari
          ini.
        </p>
      </div>

      {/* Stats Cards Row (Diubah menjadi grid-cols-2 agar 2 kartu terlihat proporsional) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Total Buku (Real Data) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Total Buku</p>
            <h3 className="text-2xl font-bold text-slate-800">{totalBooks}</h3>
          </div>
        </div>

        {/* Card 2: Total Kategori (Real Data) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Tags size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Total Kategori</p>
            <h3 className="text-2xl font-bold text-slate-800">
              {totalCategories}
            </h3>
          </div>
        </div>
      </div>

      {/* Banner Area / Info Tambahan */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-8 text-white shadow-md relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}
