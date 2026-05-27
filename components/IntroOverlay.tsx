"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ATELIER = "Atelier".split("");
const NUVELLE = "Nuvellé".split("");

export default function IntroOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("an_intro");
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem("an_intro", "1");
      const t = setTimeout(() => setVisible(false), 2800);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center select-none"
          style={{ backgroundColor: "var(--color-obsidian)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* "Atelier" — ivory, letter by letter */}
          <div className="flex overflow-hidden" style={{ letterSpacing: "0.35em" }}>
            {ATELIER.map((char, i) => (
              <motion.span
                key={i}
                className="font-display font-light"
                style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)", color: "var(--color-text-primary)" }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.055, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Gold divider line */}
          <motion.div
            style={{ backgroundColor: "var(--color-gold)", height: "1px" }}
            className="my-3"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "6rem", opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.72, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* "Nuvellé" — gold italic, letter by letter */}
          <div className="flex overflow-hidden" style={{ letterSpacing: "0.3em" }}>
            {NUVELLE.map((char, i) => (
              <motion.span
                key={i}
                className="font-display font-light italic"
                style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)", color: "var(--color-gold)" }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.88 + i * 0.055, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            className="text-xs tracking-[0.55em] uppercase mt-8"
            style={{ color: "rgba(201,169,110,0.45)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.6, ease: "easeOut" }}
          >
            Extrait de Parfum
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
