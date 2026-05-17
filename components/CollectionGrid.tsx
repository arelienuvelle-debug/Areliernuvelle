"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

type FilterId = "all" | "extrait" | "edp";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "extrait", label: "Extrait de Parfum" },
  { id: "edp", label: "Eau de Parfum" },
];

export default function CollectionGrid() {
  const [active, setActive] = useState<FilterId>("all");

  const filtered = products.filter((p) => {
    if (active === "all") return true;
    if (active === "extrait") return p.type === "Extrait de Parfum";
    if (active === "edp") return p.type === "Eau de Parfum";
    return true;
  });

  return (
    <>
      {/* Filter bar */}
      <motion.div
        className="flex justify-center mb-16"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
      >
        <div
          className="flex"
          style={{ border: "1px solid rgba(201,169,110,0.18)" }}
        >
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className="relative px-6 py-3 text-xs tracking-[0.25em] uppercase cursor-pointer transition-colors duration-200"
              style={{ color: active === id ? "var(--color-obsidian)" : "rgba(245,240,232,0.45)" }}
            >
              {active === id && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0"
                  style={{ backgroundColor: "var(--color-gold)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Count */}
      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          className="text-center text-xs tracking-widest uppercase mb-10"
          style={{ color: "rgba(201,169,110,0.4)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {filtered.length} {filtered.length === 1 ? "fragrance" : "fragrances"}
        </motion.p>
      </AnimatePresence>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.36, delay: i * 0.06 } }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.22 } }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
