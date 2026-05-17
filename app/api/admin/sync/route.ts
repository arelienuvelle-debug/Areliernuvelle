import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { appendOrder, Order } from "@/lib/orders";
import { isValidToken, ADMIN_COOKIE } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ synced: 0, error: "Stripe not configured" });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const sessions = await stripe.checkout.sessions.list({
    limit: 100,
    expand: ["data.line_items"],
  });

  let added = 0;
  for (const session of sessions.data) {
    if (session.payment_status !== "paid") continue;

    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items", "shipping_cost.shipping_rate"],
    });

    const lineItems = fullSession.line_items?.data ?? [];
    const shipping = fullSession.collected_information?.shipping_details;
    const shippingRate = fullSession.shipping_cost?.shipping_rate as
      | Stripe.ShippingRate
      | null
      | undefined;

    const order: Order = {
      id: fullSession.id,
      createdAt: new Date(fullSession.created * 1000).toISOString(),
      customerName:
        shipping?.name ?? fullSession.customer_details?.name ?? "Unknown",
      customerEmail: fullSession.customer_details?.email ?? "",
      address: shipping?.address?.line1 ?? "",
      city: shipping?.address?.city ?? "",
      postalCode: shipping?.address?.postal_code ?? "",
      country: shipping?.address?.country ?? "",
      items: lineItems.map((item) => ({
        name: item.description ?? "",
        quantity: item.quantity ?? 1,
        unitAmount: item.price?.unit_amount ?? 0,
      })),
      subtotal: fullSession.amount_subtotal ?? 0,
      shippingAmount: fullSession.shipping_cost?.amount_total ?? 0,
      total: fullSession.amount_total ?? 0,
      shippingMethod: shippingRate?.display_name ?? "Standard",
      status: "paid",
    };

    try {
      if (appendOrder(order)) added++;
    } catch {
      // skip if write fails
    }
  }

  return NextResponse.json({ synced: added });
}
