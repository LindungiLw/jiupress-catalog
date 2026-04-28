import { prisma } from "@/lib/prisma";
import BookClient from "./BookClient";

export default async function BooksPage() {
  // 1. Ambil data buku BESERTA data kategorinya (Join Table)
  const allBooks = await prisma.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true, // WAJIB: Agar book.category.name bisa terbaca
    },
  });

  // 2. Ambil master data kategori untuk Tab Menu
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  // Kirim kedua datanya ke tampilan Client
  return <BookClient books={allBooks} categories={categories} />;
}
