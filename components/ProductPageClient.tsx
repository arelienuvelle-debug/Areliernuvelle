"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, MouseEvent } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { products, type Product } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/MotionPrimitives";

/* ── Star rating ─────────────────────────────────────────────────────────── */
function StarRating({ rating, reviewCount, slug }: { rating: number; reviewCount: number; slug: string }) {
  const stars = Array.from({ length: 5 }, (_, i) => Math.min(1, Math.max(0, rating - i)));
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {stars.map((fill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.05 + i * 0.07 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" style={{ display: "block" }}>
              <defs>
                <linearGradient id={`${slug}-s${i}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset={`${fill * 100}%`} stopColor="var(--color-gold)" />
                  <stop offset={`${fill * 100}%`} stopColor="rgba(201,169,110,0.15)" />
                </linearGradient>
              </defs>
              <path
                d="M7 1L8.76 5.18L13.26 5.57L9.96 8.45L10.99 12.86L7 10.57L3.01 12.86L4.04 8.45L0.74 5.57L5.24 5.18Z"
                fill={`url(#${slug}-s${i})`}
              />
            </svg>
          </motion.div>
        ))}
      </div>
      <span className="font-display text-base" style={{ color: "var(--color-gold)" }}>
        {rating.toFixed(1)}
      </span>
      <span className="text-xs tracking-wider" style={{ color: "rgba(245,240,232,0.35)" }}>
        ({reviewCount} reviews)
      </span>
    </div>
  );
}

/* ── Interactive product photo viewer ────────────────────────────────────── */
function ProductVisual({ product }: { product: Product }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D tilt on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const springRotX = useSpring(rotateX, { stiffness: 200, damping: 30 });
  const springRotY = useSpring(rotateY, { stiffness: 200, damping: 30 });

  // Shine highlight position
  const shineX = useTransform(mouseX, [-0.5, 0.5], ["20%", "80%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["20%", "80%"]);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main interactive photo */}
      <motion.div
        ref={containerRef}
        className="w-full aspect-[3/4] relative overflow-hidden cursor-grab active:cursor-grabbing"
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          transformStyle: "preserve-3d",
          perspective: 1000,
          background: `linear-gradient(160deg, ${product.colorLight}22 0%, ${product.color}44 100%)`,
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Product photo with crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={product.images[activeIdx]}
              alt={`${product.name} — view ${activeIdx + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: "center top" }}
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Moving specular shine overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: useTransform(
              [shineX, shineY],
              ([sx, sy]) =>
                `radial-gradient(ellipse 55% 45% at ${sx} ${sy}, rgba(255,255,255,0.09) 0%, transparent 65%)`
            ),
          }}
        />

        {/* Subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.28) 100%)",
          }}
        />

        {/* Image counter — bottom right */}
        {product.images.length > 1 && (
          <div
            className="absolute bottom-4 right-4 text-[10px] tracking-[0.2em] px-2 py-1"
            style={{
              color: "rgba(245,240,232,0.5)",
              backgroundColor: "rgba(0,0,0,0.38)",
              backdropFilter: "blur(4px)",
            }}
          >
            {activeIdx + 1} / {product.images.length}
          </div>
        )}
      </motion.div>

      {/* Thumbnails */}
      {product.images.length > 1 && (
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          {product.images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="relative overflow-hidden flex-shrink-0 cursor-pointer"
              style={{
                width: 64,
                height: 80,
                border: `1px solid ${
                  i === activeIdx ? "var(--color-gold)" : "rgba(201,169,110,0.18)"
                }`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
            >
              <Image
                src={img}
                alt={`${product.name} view ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
                style={{ objectPosition: "center top" }}
              />
              {i === activeIdx && (
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: "rgba(201,169,110,0.14)" }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Hint */}
      <motion.p
        className="text-[10px] tracking-[0.18em] uppercase text-center"
        style={{ color: "rgba(245,240,232,0.22)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        Move cursor over image to explore
      </motion.p>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function ProductPageClient({ product }: { product: Product }) {
  const related = products.filter((p) => p.id !== product.id);

  return (
    <div className="min-h-screen pt-24">

      {/* ── Hero band ──────────────────────────────────────────── */}
      <div
        className="w-full py-32 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${product.colorLight}33 0%, ${product.color}55 100%)`,
          borderBottom: "1px solid rgba(201,169,110,0.1)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse 60% 70% at 50% 50%, ${product.color}30 0%, transparent 70%)`,
          }}
        />

        <motion.p
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "var(--color-gold)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {product.type}
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display font-light"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "var(--color-ivory)", letterSpacing: "0.1em" }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {product.name}
          </motion.h1>
        </div>

        <motion.p
          className="font-display italic text-lg"
          style={{ color: "rgba(245,240,232,0.55)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42 }}
        >
          {product.tagline}
        </motion.p>
      </div>

      {/* ── Main content ────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left — interactive photo */}
        <div className="sticky top-28">
          <ProductVisual product={product} />
        </div>

        {/* Right — details */}
        <div className="flex flex-col gap-10">

          {/* Story */}
          <FadeUp>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-gold)" }}>
              The Story
            </p>
            <p className="font-display text-xl font-light leading-relaxed mb-6" style={{ color: "var(--color-ivory-soft)" }}>
              {product.story}
            </p>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} slug={product.slug} />
          </FadeUp>

          {/* Scent Pyramid */}
          <FadeUp delay={0.08}>
            <div
              className="border p-8 flex flex-col gap-6"
              style={{ borderColor: "rgba(201,169,110,0.15)", backgroundColor: "var(--color-obsidian-soft)" }}
            >
              <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--color-gold)" }}>
                Scent Pyramid
              </p>
              {[
                { label: "Top Notes", notes: product.notes.top },
                { label: "Heart Notes", notes: product.notes.heart },
                { label: "Base Notes", notes: product.notes.base },
              ].map(({ label, notes }) => (
                <div key={label}>
                  <p className="text-xs tracking-wider uppercase mb-2" style={{ color: "rgba(245,240,232,0.4)" }}>
                    {label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {notes.map((note, i) => (
                      <motion.span
                        key={note}
                        className="text-xs tracking-wider px-3 py-1.5 border inline-block"
                        style={{ borderColor: "rgba(201,169,110,0.2)", color: "var(--color-ivory-soft)" }}
                        initial={{ opacity: 0, scale: 0.88 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.1 + i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        {note}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Specs */}
          <FadeUp delay={0.12}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Type", value: product.type },
                { label: "Volume", value: product.size },
                { label: "Origin", value: "France" },
                { label: "Application", value: "Natural Spray" },
              ].map(({ label, value }) => (
                <div key={label} className="border p-4" style={{ borderColor: "rgba(201,169,110,0.1)" }}>
                  <p className="text-xs tracking-wider uppercase mb-1" style={{ color: "rgba(245,240,232,0.35)" }}>
                    {label}
                  </p>
                  <p className="text-sm tracking-wider" style={{ color: "var(--color-ivory-soft)" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Price + CTA */}
          <FadeUp delay={0.16}>
            <div className="border-t pt-8 flex flex-col gap-4" style={{ borderColor: "rgba(201,169,110,0.15)" }}>
              <div className="flex flex-wrap items-baseline gap-3">
                <p className="font-display text-3xl" style={{ color: "var(--color-gold)" }}>
                  {product.priceDisplay}
                </p>
                <p className="font-display text-lg line-through" style={{ color: "rgba(245,240,232,0.3)" }}>
                  {product.originalPriceDisplay}
                </p>
                <span
                  className="text-[10px] tracking-[0.15em] uppercase px-2 py-1 font-medium"
                  style={{ backgroundColor: "var(--color-gold)", color: "var(--color-obsidian)" }}
                >
                  {product.discount}
                </span>
              </div>
              <p className="text-xs tracking-wider" style={{ color: "rgba(245,240,232,0.35)" }}>
                incl. VAT · free UK delivery
              </p>
              <AddToCartButton product={product} />
              <p className="text-xs tracking-wider text-center" style={{ color: "rgba(245,240,232,0.3)" }}>
                Secure checkout · 30-day returns · Discreet packaging
              </p>
            </div>
          </FadeUp>

        </div>
      </div>

      {/* ── Explore More ────────────────────────────────────────── */}
      <div className="border-t px-6 py-20" style={{ borderColor: "rgba(201,169,110,0.1)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-10">
            <p className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
              Explore More
            </p>
          </FadeUp>

          <StaggerContainer className="flex flex-wrap justify-center gap-8">
            {related.map((p) => (
              <StaggerItem key={p.id}>
                <Link href={`/collection/${p.slug}`} className="flex flex-col items-center gap-3 group">
                  <motion.div
                    className="relative overflow-hidden"
                    style={{ width: 90, height: 112 }}
                    whileHover={{ scale: 1.07 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="90px"
                      className="object-cover"
                      style={{ objectPosition: "center top" }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, ${p.color}99 0%, transparent 60%)`,
                      }}
                    />
                  </motion.div>
                  <span
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{ color: "rgba(245,240,232,0.45)" }}
                  >
                    {p.name}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

    </div>
  );
}
