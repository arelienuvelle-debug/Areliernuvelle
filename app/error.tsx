"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--color-obsidian)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(ellipse 50% 40% at 50% 40%, rgba(201,169,110,0.04) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-10 h-px" style={{ backgroundColor: "rgba(201,169,110,0.35)" }} />
        <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
          An Unexpected Stillness
        </span>
        <div className="w-10 h-px" style={{ backgroundColor: "rgba(201,169,110,0.35)" }} />
      </motion.div>

      <div className="overflow-hidden mb-5">
        <motion.h1
          className="font-display font-light"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--color-ivory)" }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Something went wrong.
        </motion.h1>
      </div>

      <motion.p
        className="text-sm tracking-wider max-w-sm mb-12"
        style={{ color: "rgba(245,240,232,0.4)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3 }}
      >
        An unexpected error occurred. Please try again, or contact us if the issue persists.
      </motion.p>

      <motion.button
        onClick={reset}
        className="px-8 py-3.5 text-xs tracking-[0.3em] uppercase cursor-pointer"
        style={{ backgroundColor: "var(--color-gold)", color: "var(--color-obsidian)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        whileHover={{ opacity: 0.88 }}
        whileTap={{ scale: 0.97 }}
      >
        Try Again
      </motion.button>
    </div>
  );
}
