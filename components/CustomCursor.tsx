"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorState = "default" | "product" | "link";

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Ring lags behind with spring — gives it weight
  const ringX = useSpring(mouseX, { stiffness: 160, damping: 20, mass: 0.4 });
  const ringY = useSpring(mouseY, { stiffness: 160, damping: 20, mass: 0.4 });

  useEffect(() => {
    // Only activate on fine-pointer (desktop) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a[href*='/collection/']")) {
        setState("product");
      } else if (target.closest("button") || target.closest("a")) {
        setState("link");
      } else {
        setState("default");
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY, visible]);

  const ringSize = state === "product" ? 72 : state === "link" ? 38 : 32;
  const ringOpacity = state === "product" ? 1 : 0.55;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Outer ring — lags */}
          <motion.div
            className="fixed top-0 left-0 z-[300] pointer-events-none rounded-full border flex items-center justify-center"
            style={{
              x: ringX,
              y: ringY,
              translateX: "-50%",
              translateY: "-50%",
              borderColor: "var(--color-gold)",
            }}
            animate={{ width: ringSize, height: ringSize, opacity: ringOpacity }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <AnimatePresence>
              {state === "product" && (
                <motion.span
                  key="view-label"
                  className="text-[8px] tracking-[0.25em] uppercase"
                  style={{ color: "var(--color-gold)" }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                >
                  View
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Inner dot — follows instantly */}
          <motion.div
            className="fixed top-0 left-0 z-[301] pointer-events-none w-1.5 h-1.5 rounded-full"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: "-50%",
              translateY: "-50%",
              backgroundColor: "var(--color-gold)",
            }}
            animate={{ scale: state === "product" ? 0 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
