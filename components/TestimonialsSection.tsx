"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "I've worn niche perfumes for fifteen years. Velours is unlike anything I've encountered — it's intimate, opulent, and completely unforgettable.",
    name: "Sophia R.",
    location: "London",
    product: "VELOURS",
    rating: 5,
  },
  {
    quote: "Épure is the most refined scent in my collection. Clean without being cold. I receive compliments every single time.",
    name: "James M.",
    location: "Edinburgh",
    product: "ÉPURE",
    rating: 5,
  },
  {
    quote: "Noctis is a dream in a bottle. Soft, powdery, and utterly feminine. The longevity is extraordinary for the price.",
    name: "Isabelle T.",
    location: "Manchester",
    product: "NOCTIS",
    rating: 5,
  },
  {
    quote: "Sillage is exactly what the name promises — a trail that commands a room. Rich, dark, and completely magnetic.",
    name: "Daniel K.",
    location: "Birmingham",
    product: "SILLAGE",
    rating: 5,
  },
];

function Stars() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12">
          <path
            d="M6 1L7.51 4.26L11.09 4.76L8.54 7.24L9.17 10.8L6 9.1L2.83 10.8L3.46 7.24L0.91 4.76L4.49 4.26Z"
            fill="var(--color-gold)"
          />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-28 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
              Reviews
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
          </div>
          <h2
            className="font-display font-light mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--color-text-primary)" }}
          >
            Worn and loved
          </h2>
          {/* Aggregate score */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 12 12">
                  <path
                    d="M6 1L7.51 4.26L11.09 4.76L8.54 7.24L9.17 10.8L6 9.1L2.83 10.8L3.46 7.24L0.91 4.76L4.49 4.26Z"
                    fill="var(--color-gold)"
                  />
                </svg>
              ))}
            </div>
            <span className="font-display text-xl" style={{ color: "var(--color-gold)" }}>4.8</span>
            <span className="text-xs tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
              · 450 verified reviews
            </span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="flex flex-col gap-5 p-7 border"
              style={{
                borderColor: "rgba(201,169,110,0.15)",
                backgroundColor: "var(--color-cream-soft)",
              }}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
            >
              <Stars />
              <p
                className="text-sm leading-loose tracking-wide flex-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t pt-4" style={{ borderColor: "rgba(201,169,110,0.12)" }}>
                <p className="text-xs tracking-[0.15em] font-medium" style={{ color: "var(--color-text-primary)" }}>
                  {t.name}
                </p>
                <p className="text-[10px] tracking-wider mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
                  {t.location} · {t.product}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
