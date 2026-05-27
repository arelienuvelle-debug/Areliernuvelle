"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/MotionPrimitives";

const NAV_LINKS = [
  { href: "/collection", label: "Collection" },
  { href: "/fragrance-finder", label: "Fragrance Finder" },
  { href: "/about", label: "La Maison" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer
      className="mt-32 border-t"
      style={{ borderColor: "rgba(201,169,110,0.2)", backgroundColor: "var(--color-charcoal)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

            {/* Brand */}
            <div>
              <p className="font-display text-2xl tracking-[0.2em] mb-4" style={{ color: "var(--color-gold)" }}>
                Atelier Nuvellé
              </p>
              <p className="text-xs leading-relaxed tracking-wide" style={{ color: "rgba(245,240,232,0.5)" }}>
                A house of rare extraits, crafted for those<br />
                who understand the language of scent.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--color-gold)" }}>
                Navigation
              </p>
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map(({ href, label }) => (
                  <motion.div key={href} initial="rest" whileHover="hover" animate="rest">
                    <Link href={href} className="relative inline-block">
                      <motion.span
                        className="text-xs tracking-widest uppercase"
                        variants={{
                          rest: { color: "rgba(245,240,232,0.5)" },
                          hover: { color: "var(--color-ivory)", transition: { duration: 0.2 } },
                        }}
                      >
                        {label}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--color-gold)" }}>
                Get in Touch
              </p>
              <div className="flex flex-col gap-3">
                <motion.a
                  href="mailto:contact@ateliernuvelle.com"
                  className="text-xs tracking-wide"
                  style={{ color: "rgba(245,240,232,0.5)" }}
                  whileHover={{ color: "var(--color-gold)" }}
                  transition={{ duration: 0.2 }}
                >
                  contact@ateliernuvelle.com
                </motion.a>
                <p className="text-xs tracking-wide" style={{ color: "rgba(245,240,232,0.35)" }}>
                  United Kingdom
                </p>
              </div>
            </div>

          </div>
        </FadeUp>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "rgba(201,169,110,0.1)" }}
        >
          <p className="text-xs tracking-wider" style={{ color: "rgba(245,240,232,0.3)" }}>
            © {new Date().getFullYear()} Atelier Nuvellé. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms & Conditions"].map((label) => (
              <motion.a
                key={label}
                href="#"
                className="text-xs tracking-wide"
                style={{ color: "rgba(245,240,232,0.3)" }}
                whileHover={{ color: "var(--color-ivory-soft)" }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
