"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useWishlist } from "@/lib/wishlist-context";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/MotionPrimitives";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const wishlisted = products.filter((p) => ids.includes(p.id));

  return (
    <div className="min-h-screen pt-32 pb-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <FadeUp className="text-center mb-20">
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
              Your Selection
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
          </div>
          <h1
            className="font-display font-light"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--color-ivory)" }}
          >
            Wishlist
          </h1>
          {wishlisted.length > 0 && (
            <p className="text-xs tracking-widest mt-3" style={{ color: "rgba(201,169,110,0.5)" }}>
              {wishlisted.length} {wishlisted.length === 1 ? "fragrance" : "fragrances"} saved
            </p>
          )}
        </FadeUp>

        {wishlisted.length === 0 ? (
          <motion.div
            className="flex flex-col items-center gap-8 py-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ border: "1px solid rgba(201,169,110,0.2)" }}
            >
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" style={{ color: "rgba(201,169,110,0.4)" }}>
                <path
                  d="M11 18.5C11 18.5 2 13 2 6.5C2 4.015 4.015 2 6.5 2C8.09 2 9.5 2.85 10.5 4.1C10.72 4.38 11 4.38 11.23 4.1C12.23 2.85 13.91 2 15.5 2C17.985 2 20 4.015 20 6.5C20 13 11 18.5 11 18.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-sm tracking-widest" style={{ color: "rgba(245,240,232,0.35)" }}>
              Your wishlist is empty.
            </p>
            <motion.div whileHover={{ opacity: 0.8 }} transition={{ duration: 0.2 }}>
              <Link
                href="/collection"
                className="text-xs tracking-[0.3em] uppercase px-8 py-3 border inline-block"
                style={{ borderColor: "rgba(201,169,110,0.3)", color: "var(--color-gold)" }}
              >
                Explore the Collection
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlisted.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

      </div>
    </div>
  );
}
