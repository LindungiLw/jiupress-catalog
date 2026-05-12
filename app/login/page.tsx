"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// 1. IMPORT PUSAT BAHASA
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdminLogin() {
  // 2. PANGGIL FUNGSI TERJEMAHAN DAN STATUS BAHASA
  const { t, language } = useLanguage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        const data = await response.json();

        // ─── 3. LOGIKA PENERJEMAH KODE ERROR CANGGIH ───
        if (data.error === "RATE_LIMIT_EXCEEDED") {
          // Gabungkan teks terjemahan dengan data menit dari server
          setErrorMsg(
            `${t("RATE_LIMIT_EXCEEDED")} ${data.minutes} ${language === "EN" ? "minutes." : "menit."}`,
          );
        } else if (
          data.error === "INVALID_CREDENTIALS" ||
          data.error === "SERVER_ERROR"
        ) {
          // Terjemahkan langsung pakai kamus
          // Gunakan 'as any' agar TypeScript tidak protes karena kuncinya berasal dari variabel
          setErrorMsg(t(data.error as any));
        } else {
          // Fallback jika ada error aneh yang tidak dikenali
          setErrorMsg(data.error || t("SERVER_ERROR" as any));
        }

        setIsLoading(false);
      }
    } catch (error) {
      // Tangkap error jaringan (misal server mati)
      setErrorMsg(t("SERVER_ERROR" as any));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Admin Panel
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            {/* 4. TERAPKAN TERJEMAHAN DI DESKRIPSI */}
            {t("adminPanelDesc")}
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md animate-pulse">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{errorMsg}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Input Username */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              // 5. TERAPKAN TERJEMAHAN DI PLACEHOLDER
              placeholder={t("usernamePlaceholder")}
              required
            />
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit Button with Loading State */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all mt-2 
              ${isLoading ? "opacity-80 cursor-wait" : "hover:-translate-y-0.5"}`}
          >
            {isLoading ? (
              <>
                {/* SVG Spinner Animasi */}
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {/* 6. TERAPKAN TERJEMAHAN SAAT LOADING */}
                {t("verifying")}
              </>
            ) : (
              // 7. TERAPKAN TERJEMAHAN DI TOMBOL
              t("loginToDashboard")
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
