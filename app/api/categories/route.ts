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
      { error: "Gagal mengambil kategori" },
      { status: 500 },
    );
  }
}

// Tambah kategori baru
export async function POST(req: Request) {
  try {
    const { name, icon } = await req.json();
    const newCategory = await prisma.category.create({
      data: { name, icon },
    });
    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menambah kategori" },
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
        { error: "ID tidak ditemukan" },
        { status: 400 },
      );

    await prisma.category.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Kategori dihapus" });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus kategori" },
      { status: 500 },
    );
  }
}
