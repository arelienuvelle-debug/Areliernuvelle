"use client";

import { useCart } from "@/lib/cart-context";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const formatPrice = (pence: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            className="fixed top-0 right-0 h-full z-50 flex flex-col w-full max-w-md"
            style={{
              backgroundColor: "var(--color-obsidian-soft)",
              borderLeft: "1px solid rgba(201,169,110,0.15)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between px-8 py-6 border-b"
              style={{ borderColor: "rgba(201,169,110,0.15)" }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div>
                <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--color-gold)" }}>
                  Your Selection
                </p>
                <p className="font-display text-xl mt-0.5" style={{ color: "var(--color-ivory)" }}>
                  {totalItems} {totalItems === 1 ? "Item" : "Items"}
                </p>
              </div>
              <motion.button
                onClick={closeCart}
                className="p-2 cursor-pointer"
                style={{ color: "var(--color-ivory-soft)" }}
                whileHover={{ color: "var(--color-gold)" }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} strokeWidth={1.5} />
              </motion.button>
            </motion.div>

            {/* Items area */}
            <motion.div
              className="flex-1 overflow-y-auto px-8 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    className="flex flex-col items-center justify-center h-full gap-4 text-center"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ShoppingBag size={40} strokeWidth={1} style={{ color: "rgba(201,169,110,0.3)" }} />
                    <p className="font-display text-lg" style={{ color: "rgba(245,240,232,0.4)" }}>
                      Your selection is empty
                    </p>
                    <button
                      onClick={closeCart}
                      className="text-xs tracking-[0.2em] uppercase mt-2 cursor-pointer"
                      style={{ color: "var(--color-gold)" }}
                    >
                      Explore Collection
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="items"
                    className="flex flex-col gap-6"
                    initial={false}
                  >
                    <AnimatePresence initial={false}>
                      {items.map(({ product, quantity }) => (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                          className="flex gap-4 pb-6 border-b"
                          style={{ borderColor: "rgba(201,169,110,0.1)" }}
                        >
                          {/* Colour swatch */}
                          <div
                            className="w-20 h-24 flex-shrink-0 rounded-sm flex items-center justify-center"
                            style={{ backgroundColor: product.color, opacity: 0.85 }}
                          >
                            <span
                              className="font-display text-xs tracking-widest"
                              style={{ color: product.textColor }}
                            >
                              {product.name}
                            </span>
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <p
                                className="font-display text-lg tracking-widest"
                                style={{ color: "var(--color-ivory)" }}
                              >
                                {product.name}
                              </p>
                              <p className="text-xs tracking-wide mt-0.5" style={{ color: "rgba(245,240,232,0.45)" }}>
                                {product.type} · {product.size}
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              {/* Qty controls */}
                              <div
                                className="flex items-center gap-3 border px-3 py-1.5"
                                style={{ borderColor: "rgba(201,169,110,0.25)" }}
                              >
                                <motion.button
                                  onClick={() => updateQuantity(product.id, quantity - 1)}
                                  className="cursor-pointer"
                                  style={{ color: "var(--color-ivory-soft)" }}
                                  whileHover={{ color: "var(--color-gold)" }}
                                  whileTap={{ scale: 0.85 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <Minus size={12} strokeWidth={1.5} />
                                </motion.button>
                                <span className="text-xs w-4 text-center" style={{ color: "var(--color-ivory)" }}>
                                  {quantity}
                                </span>
                                <motion.button
                                  onClick={() => updateQuantity(product.id, quantity + 1)}
                                  className="cursor-pointer"
                                  style={{ color: "var(--color-ivory-soft)" }}
                                  whileHover={{ color: "var(--color-gold)" }}
                                  whileTap={{ scale: 0.85 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <Plus size={12} strokeWidth={1.5} />
                                </motion.button>
                              </div>
                              <div className="flex items-baseline gap-1.5">
                                <p className="font-display text-base" style={{ color: "var(--color-gold)" }}>
                                  {formatPrice(product.price * quantity)}
                                </p>
                                <p className="text-[10px] line-through" style={{ color: "rgba(245,240,232,0.25)" }}>
                                  {formatPrice(product.originalPrice * quantity)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <motion.button
                            onClick={() => removeFromCart(product.id)}
                            className="self-start mt-0.5 cursor-pointer"
                            style={{ color: "rgba(245,240,232,0.3)" }}
                            whileHover={{ color: "var(--color-ivory-soft)" }}
                            whileTap={{ scale: 0.85 }}
                            transition={{ duration: 0.15 }}
                          >
                            <X size={14} strokeWidth={1.5} />
                          </motion.button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Footer */}
            <AnimatePresence initial={false}>
              {items.length > 0 && (
                <motion.div
                  key="footer"
                  className="px-8 py-6 border-t"
                  style={{ borderColor: "rgba(201,169,110,0.15)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(245,240,232,0.5)" }}>
                      Subtotal
                    </p>
                    <motion.p
                      key={subtotal}
                      className="font-display text-xl"
                      style={{ color: "var(--color-ivory)" }}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {formatPrice(subtotal)}
                    </motion.p>
                  </div>
                  <p className="text-xs text-center mb-4" style={{ color: "rgba(245,240,232,0.35)" }}>
                    Shipping calculated at checkout
                  </p>
                  <motion.div whileHover={{ opacity: 0.88 }} transition={{ duration: 0.2 }}>
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="block w-full py-4 text-center text-xs tracking-[0.3em] uppercase"
                      style={{ backgroundColor: "var(--color-gold)", color: "var(--color-obsidian)" }}
                    >
                      Proceed to Checkout
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
