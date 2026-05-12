// File: components/BookDetailInterface.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  BookOpen,
  ChevronRight,
  Calendar,
  Barcode,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BookDetailInterfaceProps {
  book: any;
}

export default function BookDetailInterface({
  book,
}: BookDetailInterfaceProps) {
  const { t, language } = useLanguage();

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 w-full pt-32 pb-24 grow">
      {/* Breadcrumb */}
      <Link
        href="/catalog"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-semibold text-sm mb-8 w-max"
      >
        <ArrowLeft size={18} />
        {t("backToCatalog")}
      </Link>

      {/* SATU KANVAS PUTIH UTAMA */}
      <div className="bg-white rounded-[2rem] p-6 md:p-10 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* KOLOM KIRI (TEKS & SINOPSIS) */}
          <div className="lg:col-span-8 flex flex-col text-left order-2 lg:order-1">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-blue-100">
                {book.category?.name || t("generalCategory")}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.2] mb-4 tracking-tight">
                {book.title}
              </h1>
              {book.subtitle && (
                <h2 className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
                  {book.subtitle}
                </h2>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-6 py-6 border-y border-slate-100 mb-8">
              <div>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                  {t("authorLabel")}
                </p>
                <p className="font-bold text-slate-800 text-base">
                  {book.author}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                  {t("isbnLabel")}
                </p>
                <p className="font-bold text-slate-800 flex items-center gap-2">
                  <Barcode size={16} className="text-slate-400" />
                  {book.isbn || "-"}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                  {t("publishedDate")}
                </p>
                <p className="font-bold text-slate-800 flex items-center gap-2">
                  <Calendar size={16} className="text-slate-400" />
                  {book.publishedDate
                    ? new Date(book.publishedDate).toLocaleDateString(
                        // Format tanggal menyesuaikan bahasa otomatis!
                        language === "EN" ? "en-US" : "id-ID",
                        { day: "numeric", month: "long", year: "numeric" },
                      )
                    : "-"}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
                <BookOpen size={20} className="text-blue-600" /> {t("synopsis")}
              </h3>
              <div className="text-slate-600 leading-loose text-sm md:text-base whitespace-pre-wrap text-justify">
                {book.description || t("noDescription")}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN (GAMBAR & KARTU) */}
          <div className="lg:col-span-4 flex flex-col items-center w-full order-1 lg:order-2 lg:sticky lg:top-32">
            <div className="w-full max-w-[260px] aspect-[3/4] rounded-[1.5rem] overflow-hidden shadow-lg border border-slate-100 bg-slate-50 mb-8">
              <img
                src={
                  book.image ||
                  "https://via.placeholder.com/400x600?text=No+Cover"
                }
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white">
              <div className="p-6 bg-slate-50/50 border-b border-slate-100 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  {t("officialPrice")}
                </p>
                {book.discountPrice ? (
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-slate-900">
                      {formatRupiah(book.discountPrice)}
                    </span>
                    <span className="text-sm text-red-500 line-through font-bold mt-0.5">
                      {formatRupiah(book.price)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-black text-slate-900">
                    {formatRupiah(book.price)}
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col gap-3">
                <p className="text-sm font-bold text-slate-800 mb-1 px-1">
                  {t("choosePurchaseMethod")}
                </p>

                {/* Tombol Shopee */}
                <a
                  href={book.shopeeLink || "#"}
                  target={book.shopeeLink ? "_blank" : "_self"}
                  rel="noreferrer"
                  className={`flex items-center justify-between p-4 rounded-xl transition-all group ${
                    book.shopeeLink
                      ? "border border-orange-200 bg-orange-50 hover:bg-orange-100 hover:border-orange-300"
                      : "border border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        book.shopeeLink
                          ? "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white"
                          : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      <ShoppingBag size={16} />
                    </div>
                    <span
                      className={`font-bold text-sm ${book.shopeeLink ? "text-orange-800" : "text-slate-400"}`}
                    >
                      {book.shopeeLink ? t("buyAtShopee") : t("notAvailable")}
                    </span>
                  </div>
                  {book.shopeeLink && (
                    <ChevronRight
                      size={18}
                      className="text-orange-400 group-hover:translate-x-1 group-hover:text-orange-600 transition-all"
                    />
                  )}
                </a>

                {/* Tombol WhatsApp */}
                <a
                  href="https://wa.me/6281260173697"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <MessageCircle size={16} />
                    </div>
                    <span className="font-bold text-emerald-800 text-sm">
                      {t("orderViaWa")}
                    </span>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-emerald-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
