import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionPrimitives";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Maison",
  description: "The story behind Atelier Nuvellé — a house dedicated to the art of rare perfumery.",
  openGraph: {
    title: "La Maison — Atelier Nuvellé",
    description: "The story behind Atelier Nuvellé — a house dedicated to the art of rare perfumery.",
    url: "https://ateliernuvelle.com/about",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Atelier Nuvellé — La Maison" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Maison — Atelier Nuvellé",
    description: "The story behind Atelier Nuvellé — a house dedicated to the art of rare perfumery.",
  },
};

const STORY_BLOCKS = [
  {
    title: "The Beginning",
    body: "Atelier Nuvellé was born from a simple obsession: to create fragrances that do not merely smell beautiful, but that transport. Founded in London with roots in the perfume traditions of Grasse, the atelier brings together master perfumers and rare raw materials to produce compositions of extraordinary depth.",
  },
  {
    title: "The Philosophy",
    body: "We believe in extrait — the highest concentration of fragrance, the most intimate expression of a scent's character. Every bottle in our collection is a commitment to generosity. Generous in ingredients, generous in longevity, generous in the memories it creates.",
  },
  {
    title: "The Craft",
    body: "Each fragrance begins as a story. A mood. A place. A moment in time. Our perfumers spend months refining every composition until it speaks with a singular voice. We work with only the finest natural and aroma-chemical ingredients, sourced from trusted suppliers across the globe.",
  },
  {
    title: "The Promise",
    body: "Every bottle that leaves our atelier carries with it a promise: that within it lives something extraordinary. Something worthy of your skin, your moments, and your memory.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-28 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <FadeUp className="text-center mb-24">
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
              Our Story
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
          </div>
          <h1
            className="font-display font-light"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--color-ivory)" }}
          >
            La Maison
          </h1>
        </FadeUp>

        {/* Opening quote */}
        <FadeIn delay={0.1} className="text-center mb-24">
          <p
            className="font-display font-light italic"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: "var(--color-gold)", lineHeight: 1.6 }}
          >
            &ldquo;A great perfume is a biography written in scent.&rdquo;
          </p>
        </FadeIn>

        {/* Story blocks */}
        <StaggerContainer className="flex flex-col gap-20">
          {STORY_BLOCKS.map(({ title, body }, i) => (
            <StaggerItem key={title}>
              <div
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 pb-20 border-b"
                style={{ borderColor: "rgba(201,169,110,0.1)" }}
              >
                <div>
                  <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(201,169,110,0.5)" }}>
                    0{i + 1}
                  </span>
                  <h2 className="font-display text-2xl mt-2" style={{ color: "var(--color-gold)" }}>
                    {title}
                  </h2>
                </div>
                <p className="text-base leading-loose" style={{ color: "rgba(245,240,232,0.65)" }}>
                  {body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Closing */}
        <FadeIn delay={0.1} className="text-center mt-24">
          <p className="font-display font-light italic text-xl" style={{ color: "rgba(245,240,232,0.4)" }}>
            London · United Kingdom
          </p>
        </FadeIn>

      </div>
    </div>
  );
}
