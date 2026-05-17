import Stripe from "stripe";
import type { Order } from "./orders";

export async function fetchOrdersFromStripe(): Promise<Order[]> {
  if (!process.env.STRIPE_SECRET_KEY) return [];

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sessions = await stripe.checkout.sessions.list({
    limit: 100,
    expand: ["data.line_items"],
  });

  return sessions.data
    .filter((s) => s.payment_status === "paid")
    .map((session) => {
      const lineItems = session.line_items?.data ?? [];
      const shipping = session.collected_information?.shipping_details;

      return {
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
        shippingMethod:
          (session.shipping_cost?.amount_total ?? 0) > 0
            ? "Express delivery"
            : "Free UK delivery",
        status: "paid" as const,
      };
    });
}
