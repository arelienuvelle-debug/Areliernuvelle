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
          ${order.items.map((item) =>
            `<tr><td>${item.name}</td><td>${item.quantity}</td><td style="text-align:right">${pence(item.unitAmount * item.quantity)}</td></tr>`
          ).join("")}
        </tbody>
      </table>
      <div class="totals">
        <div class="row"><span>Subtotal</span><span>${pence(order.subtotal)}</span></div>
        <div class="row"><span>Shipping</span><span>${order.shippingAmount === 0 ? "Free" : pence(order.shippingAmount)}</span></div>
        <div class="row bold"><span>Total</span><span>${pence(order.total)}</span></div>
      </div>
      <div class="footer">Thank you for your order.</div>
    </div>`
    ).join("");

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

function StatCard({ label, value, sub, accent = false }: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className="p-6 border flex flex-col gap-2"
      style={{
        borderColor: accent ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.06)",
        backgroundColor: accent ? "rgba(201,169,110,0.06)" : "#111111",
      }}
    >
      <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(245,240,232,0.35)" }}>
        {label}
      </p>
      <p className="font-display text-3xl font-light" style={{ color: accent ? "#C9A96E" : "#F5F0E8" }}>
        {value}
      </p>
      {sub && (
        <p className="text-xs" style={{ color: "#C9A96E" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export default function AdminDashboard({ initialOrders }: { initialOrders: Order[] }) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");

  const today = new Date().toDateString();
  const todayOrders = orders.filter((o) => new Date(o.createdAt).toDateString() === today);
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
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0A", color: "#F5F0E8" }}>

      {/* Header */}
      <div
        className="border-b px-6 lg:px-10 py-4 flex items-center justify-between"
        style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "#0F0F0F" }}
      >
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: "#C9A96E" }}>
              Atelier Nuvellé
            </p>
            <h1 className="font-display font-light text-lg tracking-wider" style={{ color: "#F5F0E8" }}>
              Admin Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {orders.length > 0 && (
            <button
              onClick={() => printSlips(orders)}
              className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-colors cursor-pointer hover:border-[rgba(201,169,110,0.6)]"
              style={{ borderColor: "rgba(201,169,110,0.3)", color: "#C9A96E" }}
            >
              Print All Slips
            </button>
          )}
          <button
            onClick={handleSync}
            disabled={syncing}
            className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-colors cursor-pointer"
            style={{
              borderColor: "rgba(201,169,110,0.3)",
              color: syncing ? "rgba(201,169,110,0.35)" : "#C9A96E",
            }}
          >
            {syncing ? "Syncing…" : "Sync Stripe"}
          </button>
          <button
            onClick={handleLogout}
            className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-colors cursor-pointer hover:border-white/20"
            style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(245,240,232,0.4)" }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-8 max-w-screen-xl mx-auto">

        {/* Sync message */}
        {syncMsg && (
          <div
            className="mb-6 px-4 py-3 border text-xs tracking-wide"
            style={{ borderColor: "rgba(201,169,110,0.3)", color: "#C9A96E", backgroundColor: "rgba(201,169,110,0.05)" }}
          >
            {syncMsg}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Revenue" value={pence(totalRevenue)} accent />
          <StatCard label="Total Orders" value={orders.length.toString()} />
          <StatCard
            label="Today's Orders"
            value={todayOrders.length.toString()}
            sub={todayOrders.length > 0 ? pence(todayOrders.reduce((s, o) => s + o.total, 0)) + " today" : undefined}
          />
          <StatCard label="Avg Order Value" value={orders.length ? pence(avgOrder) : "—"} />
        </div>

        {/* Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(245,240,232,0.3)" }}>
              Orders — {orders.length} total
            </p>
          </div>

          {orders.length === 0 ? (
            <div
              className="border py-20 text-center"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <p className="text-sm mb-2" style={{ color: "rgba(245,240,232,0.3)" }}>
                No orders yet.
              </p>
              <p className="text-xs" style={{ color: "rgba(245,240,232,0.15)" }}>
                Click &ldquo;Sync Stripe&rdquo; to import existing payments, or wait for the next purchase.
              </p>
            </div>
          ) : (
            <div className="border" style={{ borderColor: "rgba(255,255,255,0.06)" }}>

              {/* Table header */}
              <div
                className="hidden lg:grid grid-cols-12 px-5 py-3 text-[10px] tracking-[0.2em] uppercase border-b"
                style={{ borderColor: "rgba(255,255,255,0.05)", color: "rgba(245,240,232,0.25)", backgroundColor: "#0F0F0F" }}
              >
                <div className="col-span-3">Customer</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-1 text-center">Items</div>
                <div className="col-span-1">Shipping</div>
                <div className="col-span-1 text-right">Total</div>
                <div className="col-span-1 text-center">Status</div>
              </div>

              {orders.map((order, idx) => (
                <div key={order.id}>
                  {/* Row */}
                  <div
                    className="grid grid-cols-2 lg:grid-cols-12 px-5 py-4 border-b cursor-pointer transition-colors"
                    style={{
                      borderColor: "rgba(255,255,255,0.04)",
                      backgroundColor: expanded === order.id ? "rgba(201,169,110,0.04)" : "transparent",
                    }}
                    onMouseEnter={(e) => { if (expanded !== order.id) (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.02)"; }}
                    onMouseLeave={(e) => { if (expanded !== order.id) (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent"; }}
                    onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                  >
                    {/* Mobile: name + total */}
                    <div className="lg:hidden">
                      <p className="text-sm" style={{ color: "#F5F0E8" }}>{order.customerName || "—"}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(245,240,232,0.4)" }}>{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="lg:hidden text-right">
                      <p className="text-sm font-medium" style={{ color: "#C9A96E" }}>{pence(order.total)}</p>
                      <span
                        className="text-[10px] px-2 py-0.5 mt-1 inline-block"
                        style={{
                          backgroundColor: order.status === "paid" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
                          color: order.status === "paid" ? "#4ade80" : "#f87171",
                        }}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Desktop: full grid */}
                    <div className="hidden lg:block col-span-3 text-sm truncate" style={{ color: "#F5F0E8" }}>
                      {order.customerName || "—"}
                    </div>
                    <div className="hidden lg:block col-span-3 text-sm truncate" style={{ color: "rgba(245,240,232,0.5)" }}>
                      {order.customerEmail || "—"}
                    </div>
                    <div className="hidden lg:block col-span-2 text-xs self-center" style={{ color: "rgba(245,240,232,0.35)" }}>
                      {formatDate(order.createdAt)}
                    </div>
                    <div className="hidden lg:flex col-span-1 justify-center items-center text-sm" style={{ color: "#F5F0E8" }}>
                      {order.items.reduce((s, i) => s + i.quantity, 0)}
                    </div>
                    <div className="hidden lg:block col-span-1 text-xs self-center truncate" style={{ color: "rgba(245,240,232,0.35)" }}>
                      {order.shippingMethod}
                    </div>
                    <div className="hidden lg:block col-span-1 text-sm text-right self-center font-medium" style={{ color: "#C9A96E" }}>
                      {pence(order.total)}
                    </div>
                    <div className="hidden lg:flex col-span-1 justify-center items-center">
                      <span
                        className="text-[10px] px-2 py-0.5 tracking-wide"
                        style={{
                          backgroundColor: order.status === "paid" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
                          color: order.status === "paid" ? "#4ade80" : "#f87171",
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Expanded */}
                  {expanded === order.id && (
                    <div
                      className="px-5 py-6 border-b"
                      style={{ borderColor: "rgba(255,255,255,0.04)", backgroundColor: "rgba(201,169,110,0.03)" }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Items */}
                        <div>
                          <p className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: "rgba(245,240,232,0.3)" }}>
                            Cart Items
                          </p>
                          <div className="space-y-3">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex justify-between items-center text-sm">
                                <span style={{ color: "#F5F0E8" }}>
                                  {item.name}
                                  {item.quantity > 1 && (
                                    <span className="ml-2 text-xs" style={{ color: "rgba(245,240,232,0.35)" }}>
                                      × {item.quantity}
                                    </span>
                                  )}
                                </span>
                                <span style={{ color: "#C9A96E" }}>{pence(item.unitAmount * item.quantity)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t mt-4 pt-4 space-y-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                            <div className="flex justify-between text-xs">
                              <span style={{ color: "rgba(245,240,232,0.35)" }}>Subtotal</span>
                              <span style={{ color: "rgba(245,240,232,0.6)" }}>{pence(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span style={{ color: "rgba(245,240,232,0.35)" }}>Shipping ({order.shippingMethod})</span>
                              <span style={{ color: "rgba(245,240,232,0.6)" }}>
                                {order.shippingAmount === 0 ? "Free" : pence(order.shippingAmount)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm font-medium pt-1 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                              <span style={{ color: "#F5F0E8" }}>Total</span>
                              <span style={{ color: "#C9A96E" }}>{pence(order.total)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Shipping + actions */}
                        <div>
                          <p className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: "rgba(245,240,232,0.3)" }}>
                            Ship To
                          </p>
                          <div className="text-sm space-y-1 mb-6">
                            <p style={{ color: "#F5F0E8" }}>{order.customerName}</p>
                            <p style={{ color: "rgba(245,240,232,0.55)" }}>{order.address}</p>
                            <p style={{ color: "rgba(245,240,232,0.55)" }}>{order.city} {order.postalCode}</p>
                            <p style={{ color: "rgba(245,240,232,0.55)" }}>{order.country}</p>
                            <p className="pt-1" style={{ color: "rgba(245,240,232,0.4)" }}>{order.customerEmail}</p>
                          </div>
                          <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(245,240,232,0.25)" }}>
                            Stripe Ref
                          </p>
                          <p className="text-xs font-mono mb-6" style={{ color: "rgba(245,240,232,0.2)" }}>
                            {order.id.slice(-16).toUpperCase()}
                          </p>
                          <button
                            onClick={() => printSlips([order])}
                            className="text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 border transition-colors cursor-pointer hover:border-[rgba(201,169,110,0.6)]"
                            style={{ borderColor: "rgba(201,169,110,0.3)", color: "#C9A96E" }}
                          >
                            Print Packing Slip
                          </button>
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
