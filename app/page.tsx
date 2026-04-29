// 1. Tambahkan baris ini di paling atas untuk mematikan cache
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
import NewBooks from "@/components/NewBooks";
import PopularBooks from "@/components/PopularBooks";
import DiscountBooks from "@/components/DiscountBooks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function Home() {
  // 0. ambil data kategori
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  // 1. Ambil data buku terbaru
  const latestBooks = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  // 2. Ambil data buku populer
  const popularBooks = await prisma.book.findMany({
    orderBy: { views: "desc" },
    take: 6,
  });

  // 3. Ambil data buku diskon (Hanya yang memiliki harga diskon)
  const discountBooks = await prisma.book.findMany({
    where: {
      discountPrice: {
        not: null,
      },
    },
    take: 4,
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <Hero categories={categories} />

      <NewBooks books={latestBooks} />

      <PopularBooks books={popularBooks} />

      {discountBooks.length > 0 && <DiscountBooks books={discountBooks} />}

      <Footer />
    </main>
  );
}
