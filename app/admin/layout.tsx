"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Tags, LogOut } from "lucide-react";
// 1. IMPORT PUSAT BAHASA
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // 2. PANGGIL FUNGSI TERJEMAHAN
  const { t } = useLanguage();

  // 3. DAFTAR MENU DIPINDAHKAN KE SINI AGAR BISA BACA TERJEMAHAN
  const menuItems = [
    {
      name: t("menuDashboard"),
      href: "/admin",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: t("menuCatalog"),
      href: "/admin/books",
      icon: <BookOpen size={20} />,
    },
    {
      name: t("menuCategories"),
      href: "/admin/books/categories",
      icon: <Tags size={20} />,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 font-[Plus_Jakarta_Sans,sans-serif] overflow-hidden text-slate-800">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex z-20">
        <div>
          {/* Logo Area */}
          <div className="flex items-center h-16 px-6 border-b border-slate-100">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
              JIU <span className="text-blue-600">Press</span>
            </h1>
          </div>

          {/* Menu Items */}
          <nav className="mt-6 px-4 flex flex-col gap-2">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              {/* 4. TERJEMAHAN MENU UTAMA */}
              {t("mainMenu")}
            </p>

            {menuItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <div
                    className={`${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"} transition-colors`}
                  >
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Area */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={async () => {
              await fetch("/api/logout", { method: "POST" });
              window.location.href = "/login";
            }}
            className="flex w-full items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-100 border border-transparent transition-all group"
          >
            <LogOut
              size={20}
              className="text-slate-400 group-hover:text-red-500 transition-colors"
            />
            {/* 5. TERJEMAHAN LOGOUT */}
            {t("logout")}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative">
        {/* HEADER */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            {/* 6. TERJEMAHAN ADMIN PANEL */}
            {t("adminPanel")}
          </h2>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-slate-700 leading-none">
                  Admin
                </p>
                <p className="text-[11px] text-slate-400 font-medium mt-1">
                  {/* 7. TERJEMAHAN ROLE */}
                  {t("managerRole")}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-white ring-2 ring-slate-100">
                A
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT CONTAINER */}
        <div className="p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
