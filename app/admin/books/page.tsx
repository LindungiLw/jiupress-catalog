import { prisma } from "@/lib/prisma";
import BookClient from "./BookClient";

export default async function BooksPage() {
  // Ambil data asli dari database MySQL Hostinger
  const allBooks = await prisma.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Kirim datanya ke tampilan Client
  return <BookClient books={allBooks} />;
}
