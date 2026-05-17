"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionPrimitives";
import NewsletterSection from "@/components/NewsletterSection";

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.65], ["0%", "8%"]);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0a0a0a 0%, #0f0f0f 50%, #111008 100%)" }}
      >
        {/* Parallax glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,169,110,0.07) 0%, transparent 70%)",
            y: glowY,
          }}
        />

        {/* Hero content — fades + drifts up on scroll */}
        <motion.div
          className="flex flex-col items-center"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="flex items-center gap-4 mb-10">
            <motion.div
              className="h-px"
              style={{ backgroundColor: "rgba(201,169,110,0.4)" }}
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
            <motion.span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "var(--color-gold)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Extrait de Parfum
            </motion.span>
            <motion.div
              className="h-px"
              style={{ backgroundColor: "rgba(201,169,110,0.4)" }}
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-display font-light leading-none"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                color: "var(--color-ivory)",
                letterSpacing: "-0.02em",
              }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Atelier
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-10">
            <motion.span
              className="font-display font-light italic block leading-none"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                color: "var(--color-gold)",
                letterSpacing: "-0.02em",
              }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.68, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Nuvellé
            </motion.span>
          </div>

          <motion.p
            className="max-w-md text-sm leading-relaxed tracking-wider mb-12"
            style={{ color: "rgba(245,240,232,0.55)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.9 }}
          >
            Rare compositions for rare individuals.
            <br />
            Each fragrance, a world unto itself.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 1.05 }}
          >
            <Link
              href="/collection"
              className="inline-flex items-center gap-4 px-10 py-4 text-xs tracking-[0.35em] uppercase transition-all duration-500 hover:bg-[var(--color-gold)] hover:text-[var(--color-obsidian)]"
              style={{ border: "1px solid rgba(201,169,110,0.5)", color: "var(--color-gold)" }}
            >
              Discover the Collection
              <span>→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)" }}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      {/* ── Featured products ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <FadeUp className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "var(--color-gold)" }}>
            The Collection
          </p>
          <h2
            className="font-display font-light"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--color-ivory)" }}
          >
            Five Worlds of Scent
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.2} className="text-center mt-14">
          <Link
            href="/collection"
            className="text-xs tracking-[0.3em] uppercase pb-1"
            style={{ color: "var(--color-gold)", borderBottom: "1px solid rgba(201,169,110,0.4)" }}
          >
            View Full Collection
          </Link>
        </FadeIn>
      </section>

      {/* ── Fragrance Finder CTA ─────────────────────────────────── */}
      <FadeIn className="py-24 px-6 text-center">
        <div
          className="max-w-2xl mx-auto py-16 px-10 border relative overflow-hidden"
          style={{ borderColor: "rgba(201,169,110,0.15)", backgroundColor: "var(--color-obsidian-soft)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)",
            }}
          />
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--color-gold)" }}>
            Personalised Discovery
          </p>
          <h2
            className="font-display font-light mb-5"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--color-ivory)" }}
          >
            Not sure where to begin?
          </h2>
          <p className="text-sm tracking-wider mb-8 max-w-sm mx-auto" style={{ color: "rgba(245,240,232,0.45)" }}>
            Answer four questions and we will find the fragrance that was made for you.
          </p>
          <Link
            href="/fragrance-finder"
            className="inline-flex items-center gap-4 px-10 py-4 text-xs tracking-[0.3em] uppercase transition-all duration-400 hover:bg-[var(--color-gold)] hover:text-[var(--color-obsidian)]"
            style={{ border: "1px solid rgba(201,169,110,0.4)", color: "var(--color-gold)" }}
          >
            Find Your Scent
            <span>→</span>
          </Link>
        </div>
      </FadeIn>

      {/* ── Brand story teaser ───────────────────────────────────── */}
      <section
        className="py-28 px-6"
        style={{
          backgroundColor: "var(--color-obsidian-soft)",
          borderTop: "1px solid rgba(201,169,110,0.08)",
          borderBottom: "1px solid rgba(201,169,110,0.08)",
        }}
      >
        <FadeUp className="max-w-3xl mx-auto text-center">
          <div className="flex items-center gap-4 justify-center mb-10">
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
              La Maison
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
          </div>

          <h2
            className="font-display font-light mb-8 leading-snug"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-ivory)" }}
          >
            Born from a love of
            <br />
            <em style={{ color: "var(--color-gold)" }}>the extraordinary</em>
          </h2>

          <p
            className="text-sm leading-loose tracking-wide mb-10"
            style={{ color: "rgba(245,240,232,0.55)" }}
          >
            Atelier Nuvellé was founded on a singular belief — that perfume is not merely worn,
            it is inhabited. Each composition in our collection is an invitation to step into
            a world crafted with rare ingredients, artisan expertise, and an uncompromising
            pursuit of beauty.
          </p>

          <Link
            href="/about"
            className="text-xs tracking-[0.3em] uppercase pb-1"
            style={{ color: "var(--color-gold)", borderBottom: "1px solid rgba(201,169,110,0.4)" }}
          >
            Our Story
          </Link>
        </FadeUp>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────── */}
      <NewsletterSection />

      {/* ── Signature quote ──────────────────────────────────────── */}
      <FadeIn className="py-28 px-6 text-center">
        <p
          className="font-display font-light italic"
          style={{
            fontSize: "clamp(1.2rem, 3vw, 2rem)",
            color: "rgba(201,169,110,0.6)",
            letterSpacing: "0.05em",
          }}
        >
          &ldquo;Wear it like a second soul.&rdquo;
        </p>
      </FadeIn>
    </>
  );
}
