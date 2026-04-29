import { BookOpen, Tags, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
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

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Total Buku</p>
            <h3 className="text-2xl font-bold text-slate-800">120</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Tags size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Kategori</p>
            <h3 className="text-2xl font-bold text-slate-800">15</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">
              Total Kunjungan
            </p>
            <h3 className="text-2xl font-bold text-slate-800">1,204</h3>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Admin Aktif</p>
            <h3 className="text-2xl font-bold text-slate-800">2</h3>
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
