import { NextRequest, NextResponse } from "next/server";
import { readOrders } from "@/lib/orders";
import { fetchOrdersFromStripe } from "@/lib/stripe-orders";
import { isValidToken, ADMIN_COOKIE } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = process.env.STRIPE_SECRET_KEY
    ? await fetchOrdersFromStripe()
    : readOrders();

  return NextResponse.json(orders);
}
