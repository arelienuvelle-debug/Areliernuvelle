import { NextRequest, NextResponse } from "next/server";
import { makeToken, getAdminPassword, ADMIN_COOKIE } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as { password: string };

  if (password !== getAdminPassword()) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeToken(password), {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  return res;
}
