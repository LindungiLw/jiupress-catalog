"use client";

import React from "react";
// 1. IMPORT PUSAT BAHASA
import { useLanguage } from "@/contexts/LanguageContext";

export default function MembersPage() {
  // 2. PANGGIL FUNGSI TERJEMAHAN
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold">{t("libraryMembers")}</h3>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b">
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">
              {t("studentId")}
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">
              {t("fullName")}
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">
              {t("studyProgram")}
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">
              {t("statusLabel")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-semibold">202301045</td>
            <td className="px-6 py-4 text-sm font-bold">Kevin Jonathan</td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {t("infoSystems")}
            </td>
            <td className="px-6 py-4">
              <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-xs font-bold">
                {t("activeStatus")}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
