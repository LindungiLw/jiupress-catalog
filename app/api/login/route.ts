import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const rateLimitMap = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000;

function recordFailedAttempt(ip: string) {
  const record = rateLimitMap.get(ip) || { count: 0, lockUntil: 0 };
  record.count += 1;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockUntil = Date.now() + LOCKOUT_TIME;
  }

  rateLimitMap.set(ip, record);

  // 1. UBAH JADI KODE ERROR
  return NextResponse.json({ error: "INVALID_CREDENTIALS" }, { status: 401 });
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown_ip";

    const record = rateLimitMap.get(ip);
    if (record && record.count >= MAX_ATTEMPTS) {
      const timeRemaining = record.lockUntil - Date.now();

      if (timeRemaining > 0) {
        const minutes = Math.ceil(timeRemaining / 60000);
        // 2. KIRIM KODE ERROR + DATA MENIT TAMBAHAN
        return NextResponse.json(
          {
            error: "RATE_LIMIT_EXCEEDED",
            minutes: minutes,
          },
          { status: 429 },
        );
      } else {
        rateLimitMap.delete(ip);
      }
    }

    const body = await request.json();
    const { username, password } = body;

    const admin = await prisma.admin.findUnique({
      where: { username: username },
    });

    if (!admin) {
      return recordFailedAttempt(ip);
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return recordFailedAttempt(ip);
    }

    rateLimitMap.delete(ip);

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "fallback_secret",
    );
    const token = await new SignJWT({
      username: admin.username,
      role: "superadmin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(secret);

    return NextResponse.json(
      { message: "SUCCESS" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `admin_token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 8}; SameSite=Strict${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
        },
      },
    );
  } catch (error) {
    // 3. UBAH JADI KODE ERROR
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
