import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
import NewBooks from "@/components/NewBooks";
import PopularBooks from "@/components/PopularBooks";
import DiscountBooks from "@/components/DiscountBooks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function Home() {
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
        not: null, // Filter hanya yang kolom discountPrice-nya tidak kosong
      },
    },
    take: 4,
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* 1. New Books (Selalu Tampil) */}
      <NewBooks books={latestBooks} />

      {/* 2. Popular Books (Selalu Tampil) */}
      <PopularBooks books={popularBooks} />

      {/* 3. Discount Books (Hanya akan muncul jika ada datanya di database) */}
      {discountBooks.length > 0 && <DiscountBooks books={discountBooks} />}

      {/* 4. Footer (Selalu Tampil) */}
      <Footer />
    </main>
  );
}
