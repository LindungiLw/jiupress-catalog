import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// NAMA FUNGSI WAJIB "proxy" UNTUK NEXT.JS 16+
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("admin_token")?.value;

  // 1. Logika untuk halaman Login
  if (path === "/login") {
    if (token) {
      // Hapus token lama jika maksa buka halaman login lagi
      const response = NextResponse.next();
      response.cookies.delete("admin_token");
      return response;
    }
    return NextResponse.next();
  }

  // 2. Identifikasi Area Sensitif (UI Admin & Modifikasi API)
  const isUIAdmin = path.startsWith("/admin");
  const isApiRoute = path.startsWith("/api");
  const isPublicApi =
    isApiRoute && path.startsWith("/api/books") && request.method === "GET";
  const isAuthApi =
    isApiRoute && (path === "/api/login" || path === "/api/logout");

  // Jika mencoba mengakses area sensitif (UI atau mengubah database)
  if (isUIAdmin || (isApiRoute && !isPublicApi && !isAuthApi)) {
    if (!token) {
      return isApiRoute
        ? NextResponse.json(
            { error: "Akses Ditolak: Token Tidak Ada" },
            { status: 401 },
          )
        : NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Keamanan 4: Verifikasi Tanda Tangan Kriptografi (Bukan cuma cek isi string)
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "fallback_secret",
      );
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      // Jika token dipalsukan atau expired
      const response = isApiRoute
        ? NextResponse.json(
            { error: "Akses Ditolak: Token Tidak Valid" },
            { status: 401 },
          )
        : NextResponse.redirect(new URL("/login", request.url));

      response.cookies.delete("admin_token"); // Bersihkan sisa kotoran token
      return response;
    }
  }

  return NextResponse.next();
}

// Jalankan proxy ini di semua rute
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
