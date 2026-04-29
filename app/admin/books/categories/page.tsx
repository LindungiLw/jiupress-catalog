export const dynamic = "force-dynamic"; // Tambahkan ini!

import { prisma } from "@/lib/prisma";
import CategoryClient from "./CategoryClient";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return <CategoryClient initialCategories={categories} />;
}
