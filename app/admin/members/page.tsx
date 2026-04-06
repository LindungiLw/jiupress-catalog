import React from "react";

export default function MembersPage() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold">Anggota Perpustakaan</h3>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b">
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">
              NIM / NIDN
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">
              Nama Lengkap
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">
              Program Studi
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-semibold">202301045</td>
            <td className="px-6 py-4 text-sm font-bold">Kevin Jonathan</td>
            <td className="px-6 py-4 text-sm text-gray-500">
              Sistem Informasi
            </td>
            <td className="px-6 py-4">
              <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-xs font-bold">
                Aktif
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
