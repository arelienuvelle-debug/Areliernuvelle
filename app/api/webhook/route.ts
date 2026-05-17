import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { appendOrder, Order } from "@/lib/orders";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;
  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch {
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = await stripe.checkout.sessions.retrieve(
      (event.data.object as Stripe.Checkout.Session).id,
      { expand: ["line_items", "shipping_cost.shipping_rate"] }
    );

    const lineItems = session.line_items?.data ?? [];
    const shipping = session.collected_information?.shipping_details;
    const shippingRate = session.shipping_cost?.shipping_rate as
      | Stripe.ShippingRate
      | null
      | undefined;

    const order: Order = {
      id: session.id,
      createdAt: new Date(session.created * 1000).toISOString(),
      customerName:
        shipping?.name ?? session.customer_details?.name ?? "Unknown",
      customerEmail: session.customer_details?.email ?? "",
      address: shipping?.address?.line1 ?? "",
      city: shipping?.address?.city ?? "",
      postalCode: shipping?.address?.postal_code ?? "",
      country: shipping?.address?.country ?? "",
      items: lineItems.map((item) => ({
        name: item.description ?? "",
        quantity: item.quantity ?? 1,
        unitAmount: item.price?.unit_amount ?? 0,
      })),
      subtotal: session.amount_subtotal ?? 0,
      shippingAmount: session.shipping_cost?.amount_total ?? 0,
      total: session.amount_total ?? 0,
      shippingMethod: shippingRate?.display_name ?? "Standard",
      status: "paid",
    };

    appendOrder(order);
  }

  return NextResponse.json({ received: true });
}
