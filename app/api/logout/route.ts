import { NextResponse } from "next/server";

export async function POST() {
  // Bikin pesan sukses
  const response = NextResponse.json(
    { message: "Logout Berhasil!" },
    { status: 200 },
  );

  // HANCURKAN Kartu ID (Cookie) dari browser!
  response.cookies.delete("admin_token");

  return response;
}
