// File: app/admin/page.tsx
// TAMBAHKAN INI JIKA INGIN DATANYA REAL-TIME DAN TIDAK DI-CACHE OLEH NEXT.JS
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import AdminDashboardInterface from "@/components/AdminDashboardInterface";

export default async function AdminDashboard() {
  // Mengambil total data langsung dari database secara real-time
  const totalBooks = await prisma.book.count();
  const totalCategories = await prisma.category.count();

  return (
    // Oper data dari server ke komponen Client UI
    <AdminDashboardInterface
      totalBooks={totalBooks}
      totalCategories={totalCategories}
    />
  );
}
