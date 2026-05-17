import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isValidToken, ADMIN_COOKIE } from "@/lib/admin-auth";
import { readOrders } from "@/lib/orders";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!isValidToken(token)) {
    redirect("/admin/login");
  }

  const orders = readOrders();
  return <AdminDashboard initialOrders={orders} />;
}
