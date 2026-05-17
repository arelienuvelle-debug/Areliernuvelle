"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "linear-gradient(160deg, #0a0a0a 0%, #0f0f0f 50%, #111008 100%)" }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,169,110,0.05) 0%, transparent 70%)",
        }}
      />

      {/* 404 */}
      <div className="overflow-hidden mb-6">
        <motion.p
          className="font-display font-light leading-none"
          style={{ fontSize: "clamp(6rem, 20vw, 16rem)", color: "rgba(201,169,110,0.12)", letterSpacing: "-0.04em" }}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          404
        </motion.p>
      </div>

      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="w-10 h-px" style={{ backgroundColor: "rgba(201,169,110,0.35)" }} />
        <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
          Lost in the ether
        </span>
        <div className="w-10 h-px" style={{ backgroundColor: "rgba(201,169,110,0.35)" }} />
      </motion.div>

      <div className="overflow-hidden mb-4">
        <motion.h1
          className="font-display font-light"
          style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", color: "var(--color-ivory)" }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          This fragrance does not exist.
        </motion.h1>
      </div>

      <motion.p
        className="text-sm tracking-wider max-w-sm mb-12"
        style={{ color: "rgba(245,240,232,0.4)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
      >
        The page you are seeking has dissolved — like top notes on a warm afternoon.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Link
          href="/collection"
          className="inline-flex items-center gap-3 px-8 py-3.5 text-xs tracking-[0.3em] uppercase transition-all duration-400 hover:bg-[var(--color-gold)] hover:text-[var(--color-obsidian)]"
          style={{ border: "1px solid rgba(201,169,110,0.45)", color: "var(--color-gold)" }}
        >
          Explore the Collection
        </Link>
        <Link
          href="/"
          className="text-xs tracking-[0.25em] uppercase pb-px"
          style={{ color: "rgba(245,240,232,0.4)", borderBottom: "1px solid rgba(245,240,232,0.15)" }}
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}
