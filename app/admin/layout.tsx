"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Tags, LogOut, Bell } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
    {
      name: "Product Catalog",
      href: "/admin/books",
      icon: <BookOpen size={18} />,
    },
    {
      name: "Categories",
      href: "/admin/books/categories",
      icon: <Tags size={18} />,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] font-[Plus_Jakarta_Sans,sans-serif] overflow-hidden text-[#1e2d6b]">
      {/* SIDEBAR */}
      <aside className="w-56 bg-[#1e2d6b] text-white flex flex-col justify-between hidden md:flex shadow-xl z-20">
        <div>
          {/* Logo Area */}
          <div className="flex items-center justify-center h-14 border-b border-white/10">
            <h1 className="text-xl font-black tracking-tight font-poppins">
              JIU <span className="text-[#FFD32B]">Store</span>
            </h1>
          </div>

          {/* Menu Items */}
          <nav className="mt-4 px-3 flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#FFD32B] text-[#1e2d6b] shadow-sm"
                      : "hover:bg-white/10 text-white/70 hover:text-white"
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Area */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={async () => {
              await fetch("/api/logout", { method: "POST" });
              window.location.href = "/login"; // Force refresh and redirect to login
            }}
            className="flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* HEADER */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-10 sticky top-0 shadow-sm">
          <h2 className="text-sm font-bold text-[#1e2d6b] uppercase tracking-wider">
            Admin Panel
          </h2>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 border-l pl-5">
              <div className="w-8 h-8 rounded-full bg-[#1e2d6b] flex items-center justify-center text-white font-bold text-xs">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold leading-tight">JIU Admin</p>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                  Store Manager
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT CONTAINER */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
