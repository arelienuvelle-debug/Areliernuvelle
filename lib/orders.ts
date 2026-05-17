import * as fs from "fs";
import * as path from "path";

// In production process.cwd() is public_html — writable and consistent.
// DATA_DIR can be overridden via env to store outside web root.
const DATA_DIR = process.env.DATA_DIR ?? process.cwd();
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

export type OrderItem = {
  name: string;
  quantity: number;
  unitAmount: number; // pence
};

export type Order = {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  items: OrderItem[];
  subtotal: number;       // pence
  shippingAmount: number; // pence
  total: number;          // pence
  shippingMethod: string;
  status: "paid" | "refunded";
};

export function readOrders(): Order[] {
  try {
    if (!fs.existsSync(ORDERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf-8")) as Order[];
  } catch {
    return [];
  }
}

// Returns true if order was newly added, false if it already existed or write failed.
export function appendOrder(order: Order): boolean {
  const orders = readOrders();
  if (orders.some((o) => o.id === order.id)) return false;
  orders.unshift(order);
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    // Write to a tmp file then rename for atomic replace — prevents partial writes.
    const tmp = ORDERS_FILE + ".tmp";
    fs.writeFileSync(tmp, JSON.stringify(orders, null, 2), "utf-8");
    fs.renameSync(tmp, ORDERS_FILE);
    return true;
  } catch {
    // Read-only filesystem (Vercel serverless) — Stripe is source of truth.
    return false;
  }
}
