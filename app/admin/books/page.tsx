export const dynamic = "force-dynamic"; // Tambahkan ini!

import { prisma } from "@/lib/prisma";
import BookClient from "./BookClient";

export default async function BooksPage() {
  const allBooks = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return <BookClient books={allBooks} categories={categories} />;
}
