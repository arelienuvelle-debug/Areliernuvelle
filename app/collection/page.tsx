import { FadeUp, FadeIn } from "@/components/MotionPrimitives";
import CollectionGrid from "@/components/CollectionGrid";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Collection",
  description: "Explore the full Atelier Nuvellé collection of rare Extrait de Parfum compositions.",
  openGraph: {
    title: "The Collection — Atelier Nuvellé",
    description: "Explore the full Atelier Nuvellé collection of rare Extrait de Parfum compositions.",
    url: "https://ateliernuvelle.com/collection",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Atelier Nuvellé Collection" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Collection — Atelier Nuvellé",
    description: "Explore the full Atelier Nuvellé collection of rare Extrait de Parfum compositions.",
  },
};

export default function CollectionPage() {
  return (
    <div className="min-h-screen pt-32 pb-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <FadeUp className="text-center mb-20">
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
              Atelier Nuvellé
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
          </div>
          <h1
            className="font-display font-light mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--color-text-primary)" }}
          >
            The Collection
          </h1>
          <p className="text-sm tracking-wider max-w-md mx-auto" style={{ color: "var(--color-text-secondary)" }}>
            Five extraordinary compositions. Each one a singular world of scent, crafted without compromise.
          </p>
        </FadeUp>

        {/* Filterable grid */}
        <CollectionGrid />

        {/* Note */}
        <FadeIn delay={0.2} className="mt-20 text-center">
          <p className="text-xs tracking-wider" style={{ color: "rgba(26,26,26,0.4)" }}>
            All fragrances are Extrait de Parfum concentration unless stated · Natural spray · Made in France
          </p>
        </FadeIn>

      </div>
    </div>
  );
}
