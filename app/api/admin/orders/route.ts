import { NextRequest, NextResponse } from "next/server";
import { readOrders } from "@/lib/orders";
import { isValidToken, ADMIN_COOKIE } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(readOrders());
}
