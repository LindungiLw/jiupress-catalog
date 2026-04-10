import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// WAJIB bernama "proxy" untuk Next.js terbaru
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("admin_token")?.value;

  // 1. Kalau mau masuk area /admin tapi NGGAK PUNYA token -> Usir ke /login
  if (path.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 2. Kalau SUDAH LOGIN tapi menekan tombol BACK ke halaman /login -> HANCURKAN TOKENNYA!
  if (path === "/login") {
    if (token) {
      // Biarkan dia di halaman login, tapi tokennya kita hapus paksa
      const response = NextResponse.next();
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
