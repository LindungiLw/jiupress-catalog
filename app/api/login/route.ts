import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const admin = await prisma.admin.findUnique({
      where: { username: username },
    });

    // Keamanan 1: Anti-Enumeration (Pesan error harus sama agar hacker bingung)
    if (!admin) {
      return NextResponse.json(
        { error: "Username atau Password salah!" },
        { status: 401 },
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Username atau Password salah!" },
        { status: 401 },
      );
    }

    // Keamanan 2: Buat Token JWT yang di-Tandatangani Kriptografi
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "fallback_secret",
    );
    const token = await new SignJWT({
      username: admin.username,
      role: "superadmin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h") // Expired dalam 8 jam
      .sign(secret);

    const response = NextResponse.json(
      { message: "Login Berhasil!" },
      { status: 200 },
    );

    // Keamanan 3: Set Cookie dengan HttpOnly & Strict (Mencegah XSS & CSRF)
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 jam
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
