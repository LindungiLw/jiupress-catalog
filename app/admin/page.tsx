"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  // Fungsi untuk Logout (Membuang Kartu ID)
  const handleLogout = async () => {
    // Kita panggil API logout (nanti kita buat, sementara arahkan ke /login dulu)
    await fetch("/api/logout", { method: "POST" });
    router.push("/login"); // Kembali ke halaman login
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          Selamat Datang di Dashboard Admin! 🚀
        </h1>
        <p className="text-gray-600 mb-8">
          Hanya orang yang sudah login (punya akses) yang bisa melihat halaman
          ini. Dari sini nanti kamu bisa mengatur data Buku, Member, dan
          Sirkulasi.
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
