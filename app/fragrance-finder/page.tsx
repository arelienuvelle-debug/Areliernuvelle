"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { products, type Product } from "@/lib/products";

// ── Quiz data ──────────────────────────────────────────────────────────────

type Scores = Partial<Record<string, number>>;

const QUESTIONS = [
  {
    id: "mood",
    number: "01",
    prompt: "What draws you in?",
    options: [
      { label: "Warmth", sublabel: "Rich, enveloping, deeply sensuous", scores: { velours: 3, sillage: 1 } },
      { label: "Freshness", sublabel: "Crisp, luminous, electric", scores: { lueur: 3, epure: 1 } },
      { label: "Intimacy", sublabel: "Tender, soft, close to the skin", scores: { noctis: 3, epure: 1 } },
      { label: "Mystery", sublabel: "Dark, resinous, magnetic", scores: { sillage: 3, velours: 1 } },
    ],
  },
  {
    id: "setting",
    number: "02",
    prompt: "Your ideal setting.",
    options: [
      { label: "A Parisian Evening", sublabel: "Candlelight, crimson velvet, desire", scores: { velours: 3, noctis: 1 } },
      { label: "Alpine Dawn", sublabel: "Frost, silence, pure mountain air", scores: { lueur: 3, epure: 1 } },
      { label: "A Private Garden", sublabel: "Dew on petals, stillness, bloom", scores: { noctis: 3, epure: 1 } },
      { label: "An Ancient Library", sublabel: "Leather, wood, accumulated time", scores: { sillage: 3, velours: 1 } },
    ],
  },
  {
    id: "legacy",
    prompt: "How do you wish to be remembered?",
    number: "03",
    options: [
      { label: "Unforgettable", sublabel: "A presence felt long after you leave", scores: { velours: 3, sillage: 1 } },
      { label: "Serene", sublabel: "Calm, clear, quietly powerful", scores: { lueur: 3, epure: 1 } },
      { label: "Refined", sublabel: "Elegant restraint, impeccable taste", scores: { epure: 3, lueur: 1 } },
      { label: "Magnetic", sublabel: "Irresistible, impossible to ignore", scores: { sillage: 3, noctis: 1 } },
    ],
  },
  {
    id: "note",
    prompt: "Your signature note.",
    number: "04",
    options: [
      { label: "Rose & Velvet Musk", sublabel: "Opulent florals, warm skin, desire", scores: { velours: 3, noctis: 1 } },
      { label: "Oud & Dark Resin", sublabel: "Ancient woods, amber, smoke", scores: { sillage: 3, velours: 1 } },
      { label: "Citrus & Clean Wood", sublabel: "Bright, airy, crystalline", scores: { lueur: 3, epure: 1 } },
      { label: "Soft Florals & Powder", sublabel: "Delicate petals, white musk, silk", scores: { noctis: 3, epure: 1 } },
    ],
  },
] as const;

function computeResult(answers: Scores[]): Product {
  const totals: Record<string, number> = {};
  for (const answer of answers) {
    for (const [id, pts] of Object.entries(answer)) {
      totals[id] = (totals[id] ?? 0) + (pts ?? 0);
    }
  }
  const topId = Object.entries(totals).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "velours";
  return products.find((p) => p.id === topId) ?? products[0];
}

// ── Subcomponents ──────────────────────────────────────────────────────────

function OptionCard({
  label,
  sublabel,
  onSelect,
  index,
}: {
  label: string;
  sublabel: string;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onSelect}
      className="text-left p-6 border cursor-pointer w-full"
      style={{ borderColor: "rgba(201,169,110,0.18)", backgroundColor: "var(--color-cream-soft)" }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: 0.1 + index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{
        borderColor: "rgba(201,169,110,0.65)",
        backgroundColor: "rgba(201,169,110,0.05)",
        scale: 1.015,
      }}
      whileTap={{ scale: 0.985 }}
    >
      <p className="font-display text-xl tracking-wide mb-1.5" style={{ color: "var(--color-text-primary)" }}>
        {label}
      </p>
      <p className="text-xs tracking-wide leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
        {sublabel}
      </p>
    </motion.button>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

type Phase = "intro" | "quiz" | "result";

export default function FragranceFinderPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Scores[]>([]);
  const { addToCart } = useCart();

  const question = QUESTIONS[step];
  const result = phase === "result" ? computeResult(answers) : null;

  function choose(scores: Scores) {
    const next = [...answers, scores];
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setPhase("result");
    }
  }

  function restart() {
    setAnswers([]);
    setStep(0);
    setPhase("intro");
  }

  return (
    <div
      className="min-h-screen pt-24 pb-28 px-6"
      style={{ background: "linear-gradient(160deg, #FAF7F2 0%, #F5F0E8 60%, #FAF7F2 100%)" }}
    >
      <div className="max-w-2xl mx-auto">

        <AnimatePresence mode="wait">

          {/* ── Intro ───────────────────────────────────────────── */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              className="flex flex-col items-center text-center pt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
                <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
                  Atelier Nuvellé
                </span>
                <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
              </div>

              <h1
                className="font-display font-light mb-6"
                style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}
              >
                Find Your<br />
                <em style={{ color: "var(--color-gold)" }}>Fragrance</em>
              </h1>

              <p className="text-sm leading-loose tracking-wider max-w-sm mb-12" style={{ color: "var(--color-text-secondary)" }}>
                Four questions. One fragrance made for you.
                Answer instinctively — the right scent already knows you.
              </p>

              <motion.button
                onClick={() => setPhase("quiz")}
                className="px-12 py-4 text-xs tracking-[0.35em] uppercase cursor-pointer"
                style={{ backgroundColor: "var(--color-gold)", color: "var(--color-charcoal)" }}
                whileHover={{ opacity: 0.88 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                Begin
              </motion.button>

              <p className="text-xs tracking-wider mt-6" style={{ color: "var(--color-text-secondary)", opacity: 0.6 }}>
                4 questions · takes under a minute
              </p>
            </motion.div>
          )}

          {/* ── Quiz ────────────────────────────────────────────── */}
          {phase === "quiz" && (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Progress */}
              <div className="flex items-center gap-3 mb-12 mt-6">
                {QUESTIONS.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-px flex-1"
                    animate={{
                      backgroundColor: i <= step ? "var(--color-gold)" : "rgba(201,169,110,0.18)",
                    }}
                    transition={{ duration: 0.35 }}
                  />
                ))}
                <span className="text-xs tracking-widest shrink-0" style={{ color: "rgba(201,169,110,0.5)" }}>
                  {step + 1} / {QUESTIONS.length}
                </span>
              </div>

              {/* Question */}
              <div className="mb-10">
                <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "rgba(201,169,110,0.5)" }}>
                  {question.number}
                </p>
                <h2
                  className="font-display font-light"
                  style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "var(--color-text-primary)" }}
                >
                  {question.prompt}
                </h2>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {question.options.map((opt, i) => (
                  <OptionCard
                    key={opt.label}
                    label={opt.label}
                    sublabel={opt.sublabel}
                    index={i}
                    onSelect={() => choose(opt.scores as Scores)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Result ──────────────────────────────────────────── */}
          {phase === "result" && result && (
            <motion.div
              key="result"
              className="flex flex-col items-center text-center pt-10"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
                <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
                  Your Fragrance
                </span>
                <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
              </motion.div>

              {/* Product visual */}
              <motion.div
                className="w-48 h-64 flex flex-col items-center justify-end pb-8 mb-8 relative overflow-hidden"
                style={{ background: `linear-gradient(160deg, ${result.colorLight} 0%, ${result.color} 100%)` }}
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.15 }}
              >
                <div
                  className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full opacity-10"
                  style={{ backgroundColor: result.textColor, border: `1px solid ${result.textColor}` }}
                />
                <p
                  className="font-display text-2xl tracking-[0.2em] z-10"
                  style={{ color: result.textColor, opacity: 0.9 }}
                >
                  {result.name}
                </p>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase mt-1 z-10"
                  style={{ color: result.textColor, opacity: 0.55 }}
                >
                  {result.type}
                </p>
              </motion.div>

              {/* Name + tagline */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2
                  className="font-display font-light mb-2"
                  style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "var(--color-text-primary)" }}
                >
                  {result.name}
                </h2>
                <p className="font-display italic text-lg mb-2" style={{ color: "var(--color-text-secondary)" }}>
                  {result.tagline}
                </p>
                <p className="text-xs tracking-widest mb-1" style={{ color: "var(--color-gold)" }}>
                  {result.priceDisplay}
                  <span className="ml-3 line-through" style={{ color: "rgba(26,26,26,0.35)" }}>
                    {result.originalPriceDisplay}
                  </span>
                </p>
              </motion.div>

              {/* Top notes preview */}
              <motion.div
                className="flex items-center gap-2 my-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                {result.notes.top.map((note) => (
                  <span
                    key={note}
                    className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 border"
                    style={{ borderColor: "rgba(201,169,110,0.2)", color: "var(--color-text-secondary)" }}
                  >
                    {note}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 mt-2 w-full max-w-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <motion.button
                  onClick={() => addToCart(result)}
                  className="flex-1 py-4 text-xs tracking-[0.3em] uppercase cursor-pointer"
                  style={{ backgroundColor: "var(--color-gold)", color: "var(--color-charcoal)" }}
                  whileHover={{ opacity: 0.88 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  Add to Cart
                </motion.button>
                <Link
                  href={`/collection/${result.slug}`}
                  className="flex-1 py-4 text-xs tracking-[0.3em] uppercase text-center border transition-colors duration-300 hover:border-[rgba(201,169,110,0.6)]"
                  style={{ borderColor: "rgba(201,169,110,0.3)", color: "var(--color-gold)" }}
                >
                  View Details
                </Link>
              </motion.div>

              {/* Retake */}
              <motion.button
                onClick={restart}
                className="mt-10 text-xs tracking-[0.25em] uppercase cursor-pointer"
                style={{ color: "var(--color-text-secondary)", opacity: 0.65 }}
                whileHover={{ color: "var(--color-text-primary)" }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ← Retake the quiz
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
