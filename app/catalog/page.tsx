// File: app/catalog/page.tsx
// (TIDAK ADA "use client" di sini)

import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatalogInterface from "@/components/CatalogInterface";

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const category = resolvedParams.category || "";
  const sort = resolvedParams.sort || "newest";

  const whereClause: any = {};

  if (category) {
    whereClause.category = {
      name: category,
    };
  }

  if (query) {
    whereClause.OR = [
      { title: { contains: query } },
      { author: { contains: query } },
    ];
  }

  let orderByClause: any = { createdAt: "desc" };
  if (sort === "az") orderByClause = { title: "asc" };
  if (sort === "za") orderByClause = { title: "desc" };

  const books = await prisma.book.findMany({
    where: whereClause,
    include: { category: true },
    orderBy: orderByClause,
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[Poppins,sans-serif] flex flex-col selection:bg-blue-200">
      <Navbar />

      {/* Oper data dari server ke komponen Client */}
      <CatalogInterface
        books={books}
        query={query}
        category={category}
        sort={sort}
      />

      <Footer />
    </main>
  );
}
