"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Order } from "@/lib/orders";

function pence(n: number) {
  return "£" + (n / 100).toFixed(2);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildSlipHTML(orders: Order[]): string {
  const slips = orders
    .map(
      (order, i) => `
    <div class="slip${i < orders.length - 1 ? " break" : ""}">
      <div class="header">
        <div class="brand">ATELIER NUVELLÉ</div>
        <div class="sub">Packing Slip</div>
      </div>
      <div class="meta">
        <div><div class="lbl">Order ref</div><div class="val">${order.id.slice(-10).toUpperCase()}</div></div>
        <div><div class="lbl">Date</div><div class="val">${formatDate(order.createdAt)}</div></div>
        <div><div class="lbl">Shipping</div><div class="val">${order.shippingMethod}</div></div>
      </div>
      <div class="section">
        <div class="lbl">Ship to</div>
        <div class="val bold">${order.customerName}</div>
        <div class="val">${order.address}</div>
        <div class="val">${order.city}${order.postalCode ? ", " + order.postalCode : ""}</div>
        <div class="val">${order.country}</div>
        <div class="val muted">${order.customerEmail}</div>
      </div>
      <table>
        <thead><tr><th>Item</th><th>Qty</th><th style="text-align:right">Price</th></tr></thead>
        <tbody>
          ${order.items
            .map(
              (item) =>
                `<tr><td>${item.name}</td><td>${item.quantity}</td><td style="text-align:right">${pence(item.unitAmount * item.quantity)}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>
      <div class="totals">
        <div class="row"><span>Subtotal</span><span>${pence(order.subtotal)}</span></div>
        <div class="row"><span>Shipping</span><span>${order.shippingAmount === 0 ? "Free" : pence(order.shippingAmount)}</span></div>
        <div class="row bold"><span>Total</span><span>${pence(order.total)}</span></div>
      </div>
      <div class="footer">Thank you for your order.</div>
    </div>`
    )
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Packing Slips — Atelier Nuvellé</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Georgia,serif;font-size:12px;color:#1a1a1a;background:#fff}
.slip{padding:48px;max-width:640px;margin:0 auto}
.break{page-break-after:always}
.header{text-align:center;border-bottom:2px solid #1a1a1a;padding-bottom:18px;margin-bottom:22px}
.brand{font-size:20px;letter-spacing:.35em;font-weight:normal}
.sub{font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:#888;margin-top:5px}
.meta{display:flex;gap:32px;margin-bottom:22px}
.lbl{font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:#999;margin-bottom:3px}
.val{font-size:12px;line-height:1.5}
.bold{font-weight:bold}
.muted{color:#777}
.section{border-top:1px solid #e8e8e8;padding-top:18px;margin-bottom:18px}
table{width:100%;border-collapse:collapse;margin-bottom:16px}
th{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#999;padding:5px 0;border-bottom:1px solid #e0e0e0;text-align:left}
td{padding:7px 0;border-bottom:1px solid #f0f0f0}
.totals{border-top:1px solid #1a1a1a;padding-top:12px}
.row{display:flex;justify-content:space-between;margin-bottom:5px;font-size:12px}
.row.bold{font-weight:bold;font-size:13px;border-top:1px solid #ddd;padding-top:8px;margin-top:4px}
.footer{text-align:center;font-size:10px;color:#aaa;letter-spacing:.1em;margin-top:32px;padding-top:18px;border-top:1px solid #f0f0f0}
@media print{body{padding:0}.slip{padding:32px}}
</style>
</head><body>${slips}</body></html>`;
}

function printSlips(orders: Order[]) {
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(buildSlipHTML(orders));
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 400);
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div
      className="p-6 border"
      style={{
        borderColor: "rgba(201,169,110,0.15)",
        backgroundColor: "var(--color-obsidian-soft)",
      }}
    >
      <p
        className="text-xs tracking-widest uppercase mb-2"
        style={{ color: "rgba(245,240,232,0.45)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </p>
      <p
        className="text-3xl font-light"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ivory)" }}
      >
        {value}
      </p>
      {sub && (
        <p
          className="text-xs mt-1"
          style={{ color: "var(--color-gold)", fontFamily: "var(--font-body)" }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export default function AdminDashboard({
  initialOrders,
}: {
  initialOrders: Order[];
}) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");

  const today = new Date().toDateString();
  const todayOrders = orders.filter(
    (o) => new Date(o.createdAt).toDateString() === today
  );
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const avgOrder = orders.length ? totalRevenue / orders.length : 0;

  async function handleSync() {
    setSyncing(true);
    setSyncMsg("");
    try {
      const res = await fetch("/api/admin/sync", { method: "POST" });
      const data = await res.json();
      setSyncMsg(`Synced ${data.synced} new order${data.synced !== 1 ? "s" : ""} from Stripe`);
      const updated = await fetch("/api/admin/orders");
      setOrders(await updated.json());
    } catch {
      setSyncMsg("Sync failed — check Stripe API key");
    } finally {
      setSyncing(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-obsidian)", fontFamily: "var(--font-body)" }}
    >
      {/* Header */}
      <div
        className="border-b px-8 py-5 flex items-center justify-between"
        style={{ borderColor: "rgba(201,169,110,0.15)" }}
      >
        <div>
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--color-gold)" }}
          >
            Atelier Nuvellé
          </p>
          <h1
            className="text-xl font-light mt-0.5"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-ivory)" }}
          >
            Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {orders.length > 0 && (
            <button
              onClick={() => printSlips(orders)}
              className="text-xs tracking-widest uppercase px-4 py-2 border transition-colors"
              style={{
                borderColor: "rgba(201,169,110,0.4)",
                color: "var(--color-gold)",
              }}
            >
              Print All Slips
            </button>
          )}
          <button
            onClick={handleSync}
            disabled={syncing}
            className="text-xs tracking-widest uppercase px-4 py-2 border transition-colors"
            style={{
              borderColor: "rgba(201,169,110,0.4)",
              color: syncing ? "rgba(245,240,232,0.4)" : "var(--color-gold)",
            }}
          >
            {syncing ? "Syncing…" : "Sync Stripe"}
          </button>
          <button
            onClick={handleLogout}
            className="text-xs tracking-widest uppercase px-4 py-2 border transition-colors"
            style={{
              borderColor: "rgba(245,240,232,0.15)",
              color: "rgba(245,240,232,0.5)",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="px-8 py-8 max-w-7xl mx-auto">
        {syncMsg && (
          <p
            className="text-xs mb-6 px-4 py-2 border"
            style={{
              borderColor: "rgba(201,169,110,0.3)",
              color: "var(--color-gold)",
              backgroundColor: "rgba(201,169,110,0.06)",
            }}
          >
            {syncMsg}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Revenue" value={pence(totalRevenue)} />
          <StatCard label="Total Orders" value={orders.length.toString()} />
          <StatCard
            label="Today's Orders"
            value={todayOrders.length.toString()}
            sub={todayOrders.length > 0 ? pence(todayOrders.reduce((s, o) => s + o.total, 0)) : undefined}
          />
          <StatCard
            label="Avg Order Value"
            value={orders.length ? pence(avgOrder) : "—"}
          />
        </div>

        {/* Orders table */}
        <div>
          <h2
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "rgba(245,240,232,0.45)" }}
          >
            Orders ({orders.length})
          </h2>

          {orders.length === 0 ? (
            <div
              className="border py-16 text-center"
              style={{ borderColor: "rgba(201,169,110,0.1)" }}
            >
              <p
                className="text-sm"
                style={{ color: "rgba(245,240,232,0.35)" }}
              >
                No orders yet. Use "Sync Stripe" to import existing payments.
              </p>
              <p
                className="text-xs mt-2"
                style={{ color: "rgba(245,240,232,0.2)" }}
              >
                New orders will appear automatically once the Stripe webhook is configured.
              </p>
            </div>
          ) : (
            <div
              className="border"
              style={{ borderColor: "rgba(201,169,110,0.15)" }}
            >
              {/* Table header */}
              <div
                className="grid grid-cols-12 px-5 py-3 text-xs tracking-widest uppercase border-b"
                style={{
                  borderColor: "rgba(201,169,110,0.1)",
                  color: "rgba(245,240,232,0.35)",
                  backgroundColor: "rgba(255,255,255,0.02)",
                }}
              >
                <div className="col-span-3">Customer</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-1 text-center">Items</div>
                <div className="col-span-1">Shipping</div>
                <div className="col-span-1 text-right">Total</div>
                <div className="col-span-1 text-center">Status</div>
              </div>

              {orders.map((order) => (
                <div key={order.id}>
                  {/* Row */}
                  <div
                    className="grid grid-cols-12 px-5 py-4 border-b cursor-pointer transition-colors hover:bg-white/[0.02]"
                    style={{ borderColor: "rgba(201,169,110,0.08)" }}
                    onClick={() =>
                      setExpanded(expanded === order.id ? null : order.id)
                    }
                  >
                    <div
                      className="col-span-3 text-sm truncate"
                      style={{ color: "var(--color-ivory)" }}
                    >
                      {order.customerName || "—"}
                    </div>
                    <div
                      className="col-span-3 text-sm truncate"
                      style={{ color: "rgba(245,240,232,0.6)" }}
                    >
                      {order.customerEmail || "—"}
                    </div>
                    <div
                      className="col-span-2 text-xs"
                      style={{ color: "rgba(245,240,232,0.45)" }}
                    >
                      {formatDate(order.createdAt)}
                    </div>
                    <div
                      className="col-span-1 text-sm text-center"
                      style={{ color: "var(--color-ivory)" }}
                    >
                      {order.items.reduce((s, i) => s + i.quantity, 0)}
                    </div>
                    <div
                      className="col-span-1 text-xs truncate"
                      style={{ color: "rgba(245,240,232,0.45)" }}
                    >
                      {order.shippingMethod}
                    </div>
                    <div
                      className="col-span-1 text-sm text-right font-medium"
                      style={{ color: "var(--color-gold)" }}
                    >
                      {pence(order.total)}
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <span
                        className="text-xs px-2 py-0.5"
                        style={{
                          backgroundColor:
                            order.status === "paid"
                              ? "rgba(74,222,128,0.1)"
                              : "rgba(248,113,113,0.1)",
                          color:
                            order.status === "paid" ? "#4ade80" : "#f87171",
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Expanded row */}
                  {expanded === order.id && (
                    <div
                      className="px-5 py-5 border-b"
                      style={{
                        borderColor: "rgba(201,169,110,0.08)",
                        backgroundColor: "rgba(201,169,110,0.03)",
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Cart items */}
                        <div>
                          <p
                            className="text-xs tracking-widest uppercase mb-3"
                            style={{ color: "rgba(245,240,232,0.35)" }}
                          >
                            Cart Items
                          </p>
                          <div className="space-y-2">
                            {order.items.map((item, i) => (
                              <div
                                key={i}
                                className="flex justify-between text-sm"
                              >
                                <span style={{ color: "var(--color-ivory)" }}>
                                  {item.name}
                                  {item.quantity > 1 && (
                                    <span
                                      className="ml-2 text-xs"
                                      style={{ color: "rgba(245,240,232,0.45)" }}
                                    >
                                      × {item.quantity}
                                    </span>
                                  )}
                                </span>
                                <span style={{ color: "var(--color-gold)" }}>
                                  {pence(item.unitAmount * item.quantity)}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div
                            className="border-t mt-3 pt-3 space-y-1"
                            style={{ borderColor: "rgba(201,169,110,0.1)" }}
                          >
                            <div className="flex justify-between text-xs">
                              <span style={{ color: "rgba(245,240,232,0.45)" }}>
                                Subtotal
                              </span>
                              <span style={{ color: "rgba(245,240,232,0.7)" }}>
                                {pence(order.subtotal)}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span style={{ color: "rgba(245,240,232,0.45)" }}>
                                Shipping ({order.shippingMethod})
                              </span>
                              <span style={{ color: "rgba(245,240,232,0.7)" }}>
                                {order.shippingAmount === 0
                                  ? "Free"
                                  : pence(order.shippingAmount)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm font-medium">
                              <span style={{ color: "var(--color-ivory)" }}>
                                Total
                              </span>
                              <span style={{ color: "var(--color-gold)" }}>
                                {pence(order.total)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Customer / shipping */}
                        <div>
                          <p
                            className="text-xs tracking-widest uppercase mb-3"
                            style={{ color: "rgba(245,240,232,0.35)" }}
                          >
                            Shipping Address
                          </p>
                          <div
                            className="text-sm space-y-1"
                            style={{ color: "rgba(245,240,232,0.7)" }}
                          >
                            <p style={{ color: "var(--color-ivory)" }}>
                              {order.customerName}
                            </p>
                            <p>{order.address}</p>
                            <p>
                              {order.city} {order.postalCode}
                            </p>
                            <p>{order.country}</p>
                          </div>
                          <div className="mt-4">
                            <p
                              className="text-xs tracking-widest uppercase mb-1"
                              style={{ color: "rgba(245,240,232,0.35)" }}
                            >
                              Contact
                            </p>
                            <p
                              className="text-sm"
                              style={{ color: "rgba(245,240,232,0.7)" }}
                            >
                              {order.customerEmail}
                            </p>
                          </div>
                          <div className="mt-4">
                            <p
                              className="text-xs tracking-widest uppercase mb-1"
                              style={{ color: "rgba(245,240,232,0.35)" }}
                            >
                              Stripe Session
                            </p>
                            <p
                              className="text-xs font-mono break-all"
                              style={{ color: "rgba(245,240,232,0.3)" }}
                            >
                              {order.id}
                            </p>
                          </div>
                          <div className="mt-6">
                            <button
                              onClick={() => printSlips([order])}
                              className="text-xs tracking-widest uppercase px-4 py-2 border transition-colors"
                              style={{
                                borderColor: "rgba(201,169,110,0.4)",
                                color: "var(--color-gold)",
                              }}
                            >
                              Print Packing Slip
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
