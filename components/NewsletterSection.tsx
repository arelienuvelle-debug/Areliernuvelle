"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type State = "idle" | "loading" | "success";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || state !== "idle") return;
    setState("loading");
    setTimeout(() => {
      setState("success");
      setEmail("");
    }, 900);
  }

  return (
    <section
      className="py-28 px-6"
      style={{
        backgroundColor: "var(--color-obsidian-soft)",
        borderTop: "1px solid rgba(201,169,110,0.08)",
        borderBottom: "1px solid rgba(201,169,110,0.08)",
      }}
    >
      <div className="max-w-xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65 }}
        >
          <div className="flex items-center gap-4 justify-center mb-8">
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
              The Atelier
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
          </div>

          <h2
            className="font-display font-light mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--color-ivory)" }}
          >
            Be the first to know.
          </h2>
          <p className="text-sm tracking-wider mb-10" style={{ color: "rgba(245,240,232,0.45)" }}>
            New compositions, exclusive launches, and private previews — delivered quietly.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {state === "success" ? (
            <motion.div
              key="success"
              className="flex flex-col items-center gap-4 py-6"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ border: "1px solid rgba(201,169,110,0.4)" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              >
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <path
                    d="M1.5 7L6.5 12L16.5 2"
                    stroke="var(--color-gold)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--color-gold)" }}>
                You&apos;re on the list.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-transparent py-4 px-5 text-sm outline-none transition-colors duration-300 min-w-0"
                style={{
                  border: "1px solid rgba(201,169,110,0.22)",
                  borderRight: "none",
                  color: "var(--color-ivory)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.6)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.22)")}
              />
              <motion.button
                type="submit"
                disabled={state === "loading"}
                className="py-4 px-7 text-xs tracking-[0.28em] uppercase cursor-pointer shrink-0"
                style={{
                  backgroundColor: "var(--color-gold)",
                  color: "var(--color-obsidian)",
                  border: "1px solid var(--color-gold)",
                  opacity: state === "loading" ? 0.7 : 1,
                }}
                whileHover={{ opacity: 0.88 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {state === "loading" ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="inline-block"
                    >
                      …
                    </motion.span>
                  ) : (
                    <motion.span
                      key="subscribe"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="inline-block"
                    >
                      Subscribe
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        <motion.p
          className="text-xs mt-5 tracking-wider"
          style={{ color: "rgba(245,240,232,0.25)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          No noise. Unsubscribe at any time.
        </motion.p>

      </div>
    </section>
  );
}
