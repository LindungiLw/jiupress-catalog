import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; // Alat pengacak yang baru kita install

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 1. Cari username di database
    const admin = await prisma.admin.findUnique({
      where: { username: username },
    });

    // 2. Kalau usernamenya nggak ketemu
    if (!admin) {
      return NextResponse.json(
        { error: "Username tidak ditemukan!" },
        { status: 401 },
      );
    }

    // 3. Bandingkan password yang diketik dengan password acak di database
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    // 4. Kalau passwordnya nggak cocok
    if (!isPasswordMatch) {
      return NextResponse.json({ error: "Password salah!" }, { status: 401 });
    }

    // --- Kalau Cocok, Berikan "Kartu ID" (Cookie) ---
    const response = NextResponse.json(
      { message: "Login Berhasil!" },
      { status: 200 },
    );

    // UPDATE: maxAge dihapus. Sekarang ini adalah Session Cookie!
    // Kalau browser ditutup, token ini akan otomatis hancur.
    response.cookies.set("admin_token", "logged_in", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
