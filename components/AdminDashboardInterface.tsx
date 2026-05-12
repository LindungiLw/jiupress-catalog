// File: components/AdminDashboardInterface.tsx
"use client";

import React from "react";
import { BookOpen, Tags } from "lucide-react";
// 1. IMPORT PUSAT BAHASA
import { useLanguage } from "@/contexts/LanguageContext";

interface AdminDashboardInterfaceProps {
  totalBooks: number;
  totalCategories: number;
}

export default function AdminDashboardInterface({
  totalBooks,
  totalCategories,
}: AdminDashboardInterfaceProps) {
  // 2. PANGGIL FUNGSI TERJEMAHAN
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          {/* 3. TERAPKAN TERJEMAHAN */}
          {t("dashboardOverview")}
        </h1>
        <p className="text-slate-500 text-sm mt-1">{t("welcomeBackAdmin")}</p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Total Buku */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">
              {t("totalBooksLabel")}
            </p>
            <h3 className="text-2xl font-bold text-slate-800">{totalBooks}</h3>
          </div>
        </div>

        {/* Card 2: Total Kategori */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Tags size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">
              {t("totalCategoriesLabel")}
            </p>
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
        {/* Kamu bisa menambahkan teks tambahan di sini nanti jika perlu */}
      </div>
    </div>
  );
}
