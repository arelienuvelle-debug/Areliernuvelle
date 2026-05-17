"use client";

import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionPrimitives";

export default function CheckoutPage() {
  const { items, subtotal, totalItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatPrice = (pence: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError("Unable to initiate checkout. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <ShoppingBag size={48} strokeWidth={1} style={{ color: "rgba(201,169,110,0.3)" }} />
        <p className="font-display text-2xl" style={{ color: "rgba(245,240,232,0.5)" }}>
          Your selection is empty
        </p>
        <Link
          href="/collection"
          className="text-xs tracking-[0.3em] uppercase pb-1"
          style={{ color: "var(--color-gold)", borderBottom: "1px solid rgba(201,169,110,0.4)" }}
        >
          Explore Collection
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-28 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <FadeUp className="text-center mb-16">
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
              Review & Pay
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
          </div>
          <h1
            className="font-display font-light"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--color-ivory)" }}
          >
            Your Selection
          </h1>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">

          {/* Items list */}
          <StaggerContainer className="flex flex-col gap-6">
            {items.map(({ product, quantity }) => (
              <StaggerItem key={product.id}>
                <div
                  className="flex gap-5 pb-6 border-b"
                  style={{ borderColor: "rgba(201,169,110,0.1)" }}
                >
                  <div
                    className="w-24 h-32 flex-shrink-0 flex items-center justify-center"
                    style={{ background: `linear-gradient(160deg, ${product.colorLight} 0%, ${product.color} 100%)` }}
                  >
                    <span
                      className="font-display text-sm tracking-widest"
                      style={{ color: product.textColor, opacity: 0.85 }}
                    >
                      {product.name}
                    </span>
                  </div>
                  <div className="flex flex-col justify-between py-1 flex-1">
                    <div>
                      <p className="font-display text-xl tracking-widest" style={{ color: "var(--color-ivory)" }}>
                        {product.name}
                      </p>
                      <p className="text-xs tracking-wide mt-1" style={{ color: "rgba(245,240,232,0.4)" }}>
                        {product.type} · {product.size}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs tracking-wider" style={{ color: "rgba(245,240,232,0.45)" }}>
                        Qty: {quantity}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="font-display text-base" style={{ color: "var(--color-gold)" }}>
                          {formatPrice(product.price * quantity)}
                        </p>
                        <p className="text-xs line-through" style={{ color: "rgba(245,240,232,0.25)" }}>
                          {formatPrice(product.originalPrice * quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Order summary */}
          <FadeIn delay={0.15}>
            <div
              className="h-fit border p-8 flex flex-col gap-6"
              style={{ borderColor: "rgba(201,169,110,0.15)", backgroundColor: "var(--color-obsidian-soft)" }}
            >
              <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--color-gold)" }}>
                Order Summary
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "rgba(245,240,232,0.5)" }}>
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </span>
                  <span style={{ color: "var(--color-ivory)" }}>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "rgba(245,240,232,0.5)" }}>UK Delivery</span>
                  <span style={{ color: "var(--color-gold)" }}>Free</span>
                </div>
                <div
                  className="flex justify-between pt-4 border-t"
                  style={{ borderColor: "rgba(201,169,110,0.15)" }}
                >
                  <span className="font-display text-lg" style={{ color: "var(--color-ivory)" }}>Total</span>
                  <span className="font-display text-xl" style={{ color: "var(--color-gold)" }}>
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {error && (
                <motion.p
                  className="text-xs text-red-400 tracking-wide"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-4 text-xs tracking-[0.3em] uppercase cursor-pointer disabled:opacity-50 overflow-hidden"
                style={{ backgroundColor: "var(--color-gold)", color: "var(--color-obsidian)" }}
                whileHover={!loading ? { opacity: 0.88 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="block"
                    >
                      Redirecting…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="pay"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="block"
                    >
                      Proceed to Payment
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="flex flex-col gap-2 text-center">
                <p className="text-xs tracking-wider" style={{ color: "rgba(245,240,232,0.3)" }}>
                  Secured by Stripe · SSL encrypted
                </p>
                <p className="text-xs tracking-wider" style={{ color: "rgba(245,240,232,0.3)" }}>
                  30-day returns · Discreet packaging
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
