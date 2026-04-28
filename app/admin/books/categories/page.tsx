import { prisma } from "@/lib/prisma";
import CategoryClient from "./CategoryClient";

export default async function CategoriesPage() {
  // Mengambil data kategori asli dari database Hostinger
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return <CategoryClient initialCategories={categories} />;
}
