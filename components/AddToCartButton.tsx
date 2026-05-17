"use client";

import { useCart } from "@/lib/cart-context";
import { Product } from "@/lib/products";
import { useState } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.button
      onClick={handleAdd}
      className="w-full py-4 text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-3 cursor-pointer overflow-hidden"
      animate={{
        backgroundColor: added ? "rgba(201,169,110,0.15)" : "var(--color-gold)",
        color: added ? "var(--color-gold)" : "var(--color-obsidian)",
      }}
      style={{
        border: added ? "1px solid rgba(201,169,110,0.4)" : "1px solid var(--color-gold)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="added"
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Check size={14} strokeWidth={2} />
            Added to Cart
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            Add to Cart
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
