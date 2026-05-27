"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { useSearch } from "@/lib/search-context";
import { products } from "@/lib/products";

export default function SearchOverlay() {
  const { isOpen, close } = useSearch();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length > 0
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.story.toLowerCase().includes(q) ||
          p.notes.top.some((n) => n.toLowerCase().includes(q)) ||
          p.notes.heart.some((n) => n.toLowerCase().includes(q)) ||
          p.notes.base.some((n) => n.toLowerCase().includes(q))
        );
      })
    : products;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[90]"
            style={{ backgroundColor: "rgba(44,44,44,0.45)", backdropFilter: "blur(10px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-x-0 top-0 z-[95] max-h-screen overflow-y-auto"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ backgroundColor: "var(--color-cream)" }}
          >
            <div
              className="max-w-3xl mx-auto px-6 pt-8 pb-12"
              style={{ minHeight: "100dvh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header row */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 flex items-center gap-3 border-b pb-3" style={{ borderColor: "rgba(201,169,110,0.25)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "rgba(201,169,110,0.5)", flexShrink: 0 }}>
                    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, note, or mood…"
                    className="flex-1 bg-transparent text-base outline-none tracking-wide"
                    style={{ color: "var(--color-text-primary)" }}
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="text-xs tracking-wider cursor-pointer"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <motion.button
                  onClick={close}
                  className="p-1.5 cursor-pointer"
                  style={{ color: "var(--color-charcoal-soft)" }}
                  whileHover={{ color: "var(--color-gold)" }}
                  transition={{ duration: 0.15 }}
                  aria-label="Close search"
                >
                  <X size={20} strokeWidth={1.5} />
                </motion.button>
              </div>

              {/* Label */}
              <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "rgba(201,169,110,0.45)" }}>
                {query.trim() ? `${results.length} result${results.length !== 1 ? "s" : ""}` : "All Fragrances"}
              </p>

              {/* Results */}
              <AnimatePresence mode="popLayout">
                {results.length > 0 ? (
                  <motion.div className="flex flex-col gap-px" layout>
                    {results.map((product, i) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }}
                        exit={{ opacity: 0, x: 16, transition: { duration: 0.18 } }}
                      >
                        <Link
                          href={`/collection/${product.slug}`}
                          onClick={close}
                          className="group flex items-center gap-5 py-4 border-b transition-colors duration-200"
                          style={{ borderColor: "rgba(201,169,110,0.08)" }}
                        >
                          {/* Colour swatch */}
                          <div
                            className="w-10 h-12 shrink-0 transition-transform duration-300 group-hover:scale-105"
                            style={{ background: `linear-gradient(160deg, ${product.colorLight} 0%, ${product.color} 100%)` }}
                          />

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p
                              className="font-display text-lg tracking-[0.15em] transition-colors duration-200 group-hover:text-[var(--color-gold)]"
                              style={{ color: "var(--color-text-primary)" }}
                            >
                              {product.name}
                            </p>
                            <p className="text-xs tracking-wider mt-0.5 truncate" style={{ color: "var(--color-text-secondary)" }}>
                              {product.tagline}
                            </p>
                            {/* Matching notes */}
                            {query.trim() && (
                              <p className="text-[11px] tracking-wider mt-1 truncate" style={{ color: "rgba(201,169,110,0.55)" }}>
                                {[...product.notes.top, ...product.notes.heart, ...product.notes.base]
                                  .filter((n) => n.toLowerCase().includes(query.toLowerCase()))
                                  .slice(0, 3)
                                  .join(" · ")}
                              </p>
                            )}
                          </div>

                          {/* Price */}
                          <div className="text-right shrink-0">
                            <p className="font-display text-base" style={{ color: "var(--color-gold)" }}>
                              {product.priceDisplay}
                            </p>
                            <p className="text-[10px] tracking-wider mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
                              {product.type}
                            </p>
                          </div>

                          {/* Arrow */}
                          <motion.span
                            className="text-xs shrink-0"
                            style={{ color: "rgba(201,169,110,0.4)" }}
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                          >
                            →
                          </motion.span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-results"
                    className="py-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="font-display italic text-xl mb-2" style={{ color: "rgba(201,169,110,0.4)" }}>
                      No fragrances found.
                    </p>
                    <p className="text-xs tracking-wider" style={{ color: "rgba(26,26,26,0.4)" }}>
                      Try searching by a note — rose, oud, sandalwood…
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hint */}
              <p className="text-xs tracking-wider mt-10 text-center" style={{ color: "rgba(26,26,26,0.3)" }}>
                Press <span style={{ color: "var(--color-text-secondary)" }}>ESC</span> to close
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
