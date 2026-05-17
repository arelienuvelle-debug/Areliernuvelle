"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { Heart } from "lucide-react";
import { useState, useRef, MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggle, has } = useWishlist();
  const isWishlisted = has(product.id);
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 28 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 28 });

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <motion.div
      ref={cardRef}
      className="flex flex-col"
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      {/* Photo block */}
      <div className="relative overflow-hidden">
        <Link href={`/collection/${product.slug}`} className="block">
          <motion.div
            className="w-full aspect-[3/4] relative overflow-hidden"
            style={{
              background: `linear-gradient(160deg, ${product.colorLight} 0%, ${product.color} 100%)`,
            }}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          >
            {/* Product photo */}
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
              className="object-cover"
              style={{ objectPosition: "center top" }}
            />

            {/* Gradient for text legibility */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 45%, transparent 72%)",
              }}
            />

            {/* Name at bottom of image */}
            <div className="absolute bottom-6 left-0 right-0 text-center z-10 px-3">
              <p
                className="font-display text-3xl tracking-[0.2em]"
                style={{ color: "#F5F0E8" }}
              >
                {product.name}
              </p>
              <p
                className="text-xs tracking-[0.2em] uppercase mt-1"
                style={{ color: "rgba(245,240,232,0.62)" }}
              >
                {product.type}
              </p>
            </div>
          </motion.div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ backgroundColor: "rgba(0,0,0,0.38)" }}
          >
            <span
              className="text-xs tracking-[0.3em] uppercase px-6 py-3 border"
              style={{ color: "var(--color-ivory)", borderColor: "rgba(245,240,232,0.5)" }}
            >
              View Details
            </span>
          </motion.div>
        </Link>

        {/* Discount badge */}
        <div
          className="absolute top-3 left-3 px-2 py-1 text-[10px] tracking-[0.15em] uppercase font-medium pointer-events-none z-30"
          style={{ backgroundColor: "var(--color-gold)", color: "var(--color-obsidian)" }}
        >
          {product.discount}
        </div>

        {/* Wishlist */}
        <motion.button
          className="absolute top-2.5 right-2.5 p-1.5 cursor-pointer z-30"
          onClick={() => toggle(product.id)}
          animate={{ opacity: isWishlisted ? 1 : hovered ? 0.85 : 0.4 }}
          whileHover={{ scale: 1.18 }}
          whileTap={{ scale: 0.88 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            fill={isWishlisted ? "var(--color-gold)" : "none"}
            style={{ color: isWishlisted ? "var(--color-gold)" : "var(--color-ivory)" }}
          />
        </motion.button>
      </div>

      {/* Info */}
      <div
        className="pt-5 pb-6 px-1 flex flex-col gap-3 border-b"
        style={{ borderColor: "rgba(201,169,110,0.12)" }}
      >
        <div>
          <Link href={`/collection/${product.slug}`}>
            <p
              className="font-display text-xl tracking-[0.15em]"
              style={{ color: "var(--color-ivory)" }}
            >
              {product.name}
            </p>
          </Link>
          <p className="text-xs tracking-wider mt-0.5" style={{ color: "rgba(245,240,232,0.45)" }}>
            {product.tagline}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <p className="font-display text-base" style={{ color: "var(--color-gold)" }}>
              {product.priceDisplay}
            </p>
            <p className="text-xs line-through" style={{ color: "rgba(245,240,232,0.3)" }}>
              {product.originalPriceDisplay}
            </p>
          </div>
          <p className="text-xs tracking-wider" style={{ color: "rgba(245,240,232,0.35)" }}>
            {product.size}
          </p>
        </div>

        <motion.button
          onClick={handleAddToCart}
          className="w-full py-3 text-xs tracking-[0.25em] uppercase mt-1 cursor-pointer overflow-hidden"
          style={{
            border: "1px solid rgba(201,169,110,0.35)",
            color: added ? "var(--color-obsidian)" : "var(--color-gold)",
            backgroundColor: added
              ? "var(--color-gold)"
              : hovered
              ? "rgba(201,169,110,0.08)"
              : "transparent",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                className="flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                ✓ Added
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}
