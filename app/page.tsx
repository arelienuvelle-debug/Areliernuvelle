"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionPrimitives";
import NewsletterSection from "@/components/NewsletterSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.65], ["0%", "8%"]);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero-bg.png"
            alt="Atelier Nuvellé Luxury Perfume"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-80"
          />
          {/* Subtle gold and soft cream overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(250,247,242,0.45) 0%, rgba(250,247,242,0.1) 50%, rgba(250,247,242,0.75) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(201,169,110,0.06) 0%, transparent 75%)",
            }}
          />
        </div>

        {/* Hero content */}
        <motion.div
          className="flex flex-col items-center"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="flex items-center gap-4 mb-10">
            <motion.div
              className="h-px"
              style={{ backgroundColor: "rgba(201,169,110,0.5)" }}
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
              style={{ backgroundColor: "rgba(201,169,110,0.5)" }}
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
                color: "var(--color-text-primary)",
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
            style={{ color: "var(--color-text-secondary)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.9 }}
          >
            The art of fragrance. Rare compositions for rare individuals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 1.05 }}
          >
            <Link
              href="/collection"
              className="inline-flex items-center gap-4 px-10 py-4 text-xs tracking-[0.35em] uppercase transition-all duration-500 hover:bg-[var(--color-gold)] hover:text-white"
              style={{ border: "1px solid rgba(201,169,110,0.6)", color: "var(--color-gold-dark)" }}
            >
              Discover the Collection
              <span>→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, rgba(201,169,110,0.7), transparent)" }}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      {/* ── Bestsellers ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <FadeUp className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "var(--color-gold)" }}>
            Bestsellers
          </p>
          <h2
            className="font-display font-light"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--color-text-primary)" }}
          >
            Timeless favourites
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

      {/* ── 20% Off Campaign Banner ───────────────────────────────── */}
      <FadeIn>
        <section
          className="py-24 px-6 text-center relative overflow-hidden"
          style={{ backgroundColor: "var(--color-charcoal)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--color-gold)" }}>
              Launch Offer
            </p>
            <h2
              className="font-display font-light mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--color-ivory)" }}
            >
              20% Off — The Collection
            </h2>
            <p className="text-sm tracking-wider mb-10" style={{ color: "rgba(245,240,232,0.55)" }}>
              Every fragrance. Every bottle. Limited time.
            </p>
            <Link
              href="/collection"
              className="inline-flex items-center gap-4 px-10 py-4 text-xs tracking-[0.35em] uppercase transition-all duration-500 hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)]"
              style={{ border: "1px solid rgba(201,169,110,0.5)", color: "var(--color-gold)" }}
            >
              Shop Now
              <span>→</span>
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── Brand story ──────────────────────────────────────────── */}
      <section
        className="py-28 px-6"
        style={{
          backgroundColor: "var(--color-cream-soft)",
          borderTop: "1px solid rgba(201,169,110,0.1)",
          borderBottom: "1px solid rgba(201,169,110,0.1)",
        }}
      >
        <FadeUp className="max-w-2xl mx-auto text-center">
          <div className="flex items-center gap-4 justify-center mb-10">
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
              La Maison
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
          </div>

          <h2
            className="font-display font-light mb-6 leading-snug"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--color-text-primary)" }}
          >
            Born from a love of
            <br />
            <em style={{ color: "var(--color-gold)" }}>the extraordinary</em>
          </h2>

          <p
            className="text-sm leading-loose tracking-wide mb-10"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Perfume is not merely worn — it is inhabited. Each composition is crafted with
            rare ingredients and an uncompromising pursuit of beauty.
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
    </>
  );
}
