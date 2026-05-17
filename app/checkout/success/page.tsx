"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-8">

      {/* Decorative ring — springs in */}
      <motion.div
        className="w-20 h-20 rounded-full border flex items-center justify-center"
        style={{ borderColor: "rgba(201,169,110,0.4)" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
      >
        <motion.span
          style={{ color: "var(--color-gold)", fontSize: "1.8rem" }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.42 }}
        >
          ✓
        </motion.span>
      </motion.div>

      {/* "Confirmed" label */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.6 }}
      >
        <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
        <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
          Confirmed
        </span>
        <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
      </motion.div>

      {/* "Thank You" heading */}
      <div className="overflow-hidden">
        <motion.h1
          className="font-display font-light"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--color-ivory)" }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.75, delay: 0.72, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Thank You
        </motion.h1>
      </div>

      {/* Body */}
      <motion.p
        className="text-sm leading-loose tracking-wider max-w-sm"
        style={{ color: "rgba(245,240,232,0.55)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.92 }}
      >
        Your order has been received. A confirmation has been sent to your email.
        Your fragrance will be carefully packaged and dispatched within 1–2 business days.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay: 1.1 }}
      >
        <Link
          href="/collection"
          className="text-xs tracking-[0.3em] uppercase pb-1 mt-4"
          style={{ color: "var(--color-gold)", borderBottom: "1px solid rgba(201,169,110,0.4)" }}
        >
          Continue Exploring
        </Link>
      </motion.div>

    </div>
  );
}
