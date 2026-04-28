import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ── GET: Ambil Semua Buku ──
export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data buku" },
      { status: 500 },
    );
  }
}

// ── POST: Tambah Buku Baru ──
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      subtitle,
      isbn,
      author,
      categoryId,
      price,
      discountPrice,
      image,
      description,
      publishedDate,
      releaseAt,
    } = body;

    const newBook = await prisma.book.create({
      data: {
        title,
        subtitle: subtitle || null,
        isbn: isbn || null,
        author,
        categoryId: categoryId ? Number(categoryId) : null,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : null,
        image: image || null,
        description: description || null,
        publishedDate: publishedDate ? new Date(publishedDate) : null,
        releaseAt: releaseAt ? new Date(releaseAt) : new Date(),
      },
      include: { category: true },
    });
    return NextResponse.json(newBook);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menyimpan buku" },
      { status: 500 },
    );
  }
}

// ── PUT: Update Data Buku (FITUR EDIT) ──
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      subtitle,
      isbn,
      author,
      categoryId,
      price,
      discountPrice,
      image,
      description,
      publishedDate,
      releaseAt,
    } = body;

    if (!id)
      return NextResponse.json(
        { error: "ID Buku diperlukan" },
        { status: 400 },
      );

    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title,
        subtitle: subtitle || null,
        isbn: isbn || null,
        author,
        categoryId: categoryId ? Number(categoryId) : null,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : null,
        image: image || null,
        description: description || null,
        publishedDate: publishedDate ? new Date(publishedDate) : null,
        releaseAt: releaseAt ? new Date(releaseAt) : new Date(),
      },
      include: { category: true },
    });
    return NextResponse.json(updatedBook);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengupdate buku" },
      { status: 500 },
    );
  }
}

// ── DELETE: Hapus Buku ──
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { error: "ID Buku tidak ditemukan" },
        { status: 400 },
      );

    await prisma.book.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Buku berhasil dihapus" });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus buku" },
      { status: 500 },
    );
  }
}
