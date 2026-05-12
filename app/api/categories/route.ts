import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Ambil semua kategori
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      // 1. UBAH JADI KODE ERROR
      { error: "FETCH_CATEGORY_FAILED" },
      { status: 500 },
    );
  }
}

// Tambah kategori baru
export async function POST(req: Request) {
  try {
    const { name, icon } = await req.json(); // Note: icon bisa dihapus jika di Prisma schema tidak ada
    const newCategory = await prisma.category.create({
      data: { name },
    });
    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.json(
      // 2. UBAH JADI KODE ERROR
      { error: "CREATE_CATEGORY_FAILED" },
      { status: 500 },
    );
  }
}

// Hapus kategori (lewat search params ?id=...)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json(
        // 3. UBAH JADI KODE ERROR
        { error: "MISSING_CATEGORY_ID" },
        { status: 400 },
      );

    await prisma.category.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({
      // 4. UBAH JADI KODE SUKSES
      message: "DELETE_CATEGORY_SUCCESS",
    });
  } catch (error) {
    return NextResponse.json(
      // 5. UBAH JADI KODE ERROR
      { error: "DELETE_CATEGORY_FAILED" },
      { status: 500 },
    );
  }
}
