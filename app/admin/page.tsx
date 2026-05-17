import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isValidToken, ADMIN_COOKIE } from "@/lib/admin-auth";
import { readOrders } from "@/lib/orders";
import { fetchOrdersFromStripe } from "@/lib/stripe-orders";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!isValidToken(token)) redirect("/admin/login");

  // Prefer live Stripe data when key is available (works on Vercel + Hostinger).
  // Fall back to local orders.json on Hostinger when Stripe isn't configured yet.
  const orders = process.env.STRIPE_SECRET_KEY
    ? await fetchOrdersFromStripe()
    : readOrders();

  return <AdminDashboard initialOrders={orders} />;
}
