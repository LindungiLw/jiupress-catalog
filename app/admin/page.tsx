import React from "react";
import { Book, Users, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  return (
    <>
      <h3 className="text-2xl font-bold mb-6">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Book size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase">
              Total Koleksi
            </p>
            <h3 className="text-3xl font-black">12,450</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase">
              Member Aktif
            </p>
            <h3 className="text-3xl font-black">1,890</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <AlertCircle size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase">
              Jatuh Tempo
            </p>
            <h3 className="text-3xl font-black">12</h3>
          </div>
        </div>
      </div>
    </>
  );
}
