"use client";

import React from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
// 1. IMPORT PUSAT BAHASA
import { useLanguage } from "@/contexts/LanguageContext";

export default function CirculationPage() {
  // 2. PANGGIL FUNGSI TERJEMAHAN
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">{t("bookCirculation")}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* KARTU PINJAM BUKU */}
        <div className="bg-white p-6 rounded-2xl border-2 border-emerald-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6 text-emerald-600">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <ArrowUpRight size={24} />
            </div>
            <h4 className="text-xl font-bold">{t("borrowing")}</h4>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-bold text-gray-500 mb-1 block">
                {t("studentIdLabel")}
              </label>
              <input
                type="text"
                placeholder={t("scanCardPlaceholder")}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-500 mb-1 block">
                {t("bookIdLabel")}
              </label>
              <input
                type="text"
                placeholder={t("scanBarcodePlaceholder")}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 outline-none focus:border-emerald-500"
              />
            </div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg mt-2 transition-colors">
              {t("processBorrow")}
            </button>
          </div>
        </div>

        {/* KARTU PENGEMBALIAN BUKU */}
        <div className="bg-white p-6 rounded-2xl border-2 border-blue-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6 text-blue-600">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ArrowDownLeft size={24} />
            </div>
            <h4 className="text-xl font-bold">{t("returning")}</h4>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-bold text-gray-500 mb-1 block">
                {t("bookIdLabel")}
              </label>
              <input
                type="text"
                placeholder={t("scanBarcodePlaceholder")}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 outline-none focus:border-blue-500"
              />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 mt-2">
              <p className="text-xs text-gray-400 font-bold mb-1">
                {t("fineStatus")}
              </p>
              <p className="text-sm font-medium text-gray-600">
                {t("autoCalculateFine")}
              </p>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-2 transition-colors">
              {t("processReturn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
