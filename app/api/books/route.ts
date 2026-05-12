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
      // 1. UBAH JADI KODE ERROR
      { error: "FETCH_BOOKS_FAILED" },
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
      shopeeLink,
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
        shopeeLink: shopeeLink || null,
        description: description || null,
        publishedDate: publishedDate ? new Date(publishedDate) : null,
        releaseAt: releaseAt ? new Date(releaseAt) : new Date(),
      },
      include: { category: true },
    });
    return NextResponse.json(newBook);
  } catch (error) {
    return NextResponse.json(
      // 2. UBAH JADI KODE ERROR
      { error: "CREATE_BOOK_FAILED" },
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
      shopeeLink,
      description,
      publishedDate,
      releaseAt,
    } = body;

    if (!id)
      return NextResponse.json(
        // 3. UBAH JADI KODE ERROR
        { error: "MISSING_BOOK_ID" },
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
        shopeeLink: shopeeLink || null,
        description: description || null,
        publishedDate: publishedDate ? new Date(publishedDate) : null,
        releaseAt: releaseAt ? new Date(releaseAt) : new Date(),
      },
      include: { category: true },
    });
    return NextResponse.json(updatedBook);
  } catch (error) {
    return NextResponse.json(
      // 4. UBAH JADI KODE ERROR
      { error: "UPDATE_BOOK_FAILED" },
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
        // 5. UBAH JADI KODE ERROR
        { error: "MISSING_BOOK_ID" },
        { status: 400 },
      );

    await prisma.book.delete({ where: { id: Number(id) } });
    return NextResponse.json({
      // 6. UBAH JADI KODE SUKSES
      message: "DELETE_BOOK_SUCCESS",
    });
  } catch (error) {
    return NextResponse.json(
      // 7. UBAH JADI KODE ERROR
      { error: "DELETE_BOOK_FAILED" },
      { status: 500 },
    );
  }
}
