import { prisma } from "@/lib/prisma";
import Hero from "../components/Hero";
import NewBooks from "@/components/NewBooks";

export default async function Home() {
  // Fetch the 10 latest books from your Hostinger database
  const latestBooks = await prisma.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return (
    <main>
      <Hero />
      {/* Pass the real database books to the NewBooks component */}
      <NewBooks books={latestBooks} />
    </main>
  );
}
