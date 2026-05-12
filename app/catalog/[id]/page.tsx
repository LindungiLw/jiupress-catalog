// File: app/catalog/[id]/page.tsx
// TAMBAHKAN INI AGAR HALAMAN SELALU REAL-TIME DAN TIDAK DI-CACHE
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDetailInterface from "@/components/BookDetailInterface";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bookId = parseInt(id);

  if (isNaN(bookId)) return notFound();

  // Tambah views setiap kali halaman dibuka
  await prisma.book.update({
    where: { id: bookId },
    data: { views: { increment: 1 } },
  });

  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: { category: true },
  });

  if (!book) return notFound();

  return (
    <main className="min-h-screen bg-[#f8fafc] font-[Poppins,sans-serif] flex flex-col">
      <Navbar />

      {/* Oper data buku ke komponen Client */}
      <BookDetailInterface book={book} />

      <Footer />
    </main>
  );
}
