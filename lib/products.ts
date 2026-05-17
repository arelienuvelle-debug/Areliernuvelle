export type Product = {
  id: string;
  name: string;
  tagline: string;
  story: string;
  type: string;
  size: string;
  price: number;               // GBP pence — sale price
  priceDisplay: string;
  originalPrice: number;       // GBP pence — original price
  originalPriceDisplay: string;
  discount: string;            // e.g. "20% OFF"
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  color: string;
  colorLight: string;
  textColor: string;
  images: string[];
  slug: string;
  rating: number;
  reviewCount: number;
  modelUrl: string | null;
};

export const products: Product[] = [
  {
    id: "velours",
    name: "VELOURS",
    tagline: "The warmth of crimson silk.",
    story:
      "Velours wraps you in the opulence of a Parisian evening — deep, sensuous, and unapologetically present. A bold extrait that commands attention without effort.",
    type: "Extrait de Parfum",
    size: "80 ML · 2.7 FL.OZ",
    price: 5600,
    priceDisplay: "£56.00",
    originalPrice: 7000,
    originalPriceDisplay: "£70.00",
    discount: "20% OFF",
    notes: {
      top: ["Saffron", "Black Pepper", "Bergamot"],
      heart: ["Rose Absolute", "Oud", "Velvet Orchid"],
      base: ["Sandalwood", "Amber", "Musk", "Vanilla"],
    },
    color: "#7B1C3A",
    colorLight: "#A02550",
    textColor: "#F5F0E8",
    images: [
      "/products/velours-1.jpg",
      "/products/velours-2.jpg",
      "/products/velours-3.jpg",
    ], // studio + lifestyle + candle/roses
    slug: "velours",
    rating: 4.8,
    reviewCount: 124,
    modelUrl: null,
  },
  {
    id: "lueur",
    name: "LUEUR",
    tagline: "Light breaking through cold air.",
    story:
      "Lueur is the clarity of an alpine morning — crisp, luminous, and electric. A contemplative extrait for those who find beauty in stillness.",
    type: "Extrait de Parfum",
    size: "65 ML · 2.2 FL.OZ",
    price: 5600,
    priceDisplay: "£56.00",
    originalPrice: 7000,
    originalPriceDisplay: "£70.00",
    discount: "20% OFF",
    notes: {
      top: ["Yuzu", "Grapefruit", "Cardamom"],
      heart: ["Neroli", "Iris", "White Tea"],
      base: ["Cedarwood", "Vetiver", "Musk"],
    },
    color: "#1A2E5A",
    colorLight: "#2A4580",
    textColor: "#F5F0E8",
    images: [
      "/products/lueur-1.jpg",
      "/products/lueur-2.jpg",
    ],
    slug: "lueur",
    rating: 4.7,
    reviewCount: 89,
    modelUrl: null,
  },
  {
    id: "epure",
    name: "ÉPURE",
    tagline: "Refined to its purest essence.",
    story:
      "Épure is the art of restraint — a golden composition stripped of excess, leaving only what is essential and beautiful. Understated luxury at its finest.",
    type: "Eau de Parfum",
    size: "80 ML · 2.7 FL.OZ",
    price: 5600,
    priceDisplay: "£56.00",
    originalPrice: 7000,
    originalPriceDisplay: "£70.00",
    discount: "20% OFF",
    notes: {
      top: ["Aldehydes", "Lemon Zest", "Green Fig"],
      heart: ["Jasmine Sambac", "Tuberose", "Ylang Ylang"],
      base: ["Blonde Woods", "White Musk", "Cashmeran"],
    },
    color: "#8B6914",
    colorLight: "#C9A030",
    textColor: "#0a0a0a",
    images: [
      "/products/epure-1.jpg",
      "/products/epure-2.jpg",
    ],
    slug: "epure",
    rating: 4.9,
    reviewCount: 76,
    modelUrl: null,
  },
  {
    id: "noctis",
    name: "NOCTIS",
    tagline: "A night of roses and secrets.",
    story:
      "Noctis is a blush dream — delicate yet unforgettable. Its baroque crown bottle encases a scent born from the quietest hours, tender and eternally feminine.",
    type: "Extrait de Parfum",
    size: "50 ML · 1.7 FL.OZ",
    price: 5600,
    priceDisplay: "£56.00",
    originalPrice: 7000,
    originalPriceDisplay: "£70.00",
    discount: "20% OFF",
    notes: {
      top: ["Peony", "Lychee", "Pink Pepper"],
      heart: ["Bulgarian Rose", "Magnolia", "Peach Blossom"],
      base: ["White Musk", "Benzoin", "Tonka Bean"],
    },
    color: "#C4857A",
    colorLight: "#E8B5AB",
    textColor: "#0a0a0a",
    images: [
      "/products/noctis-1.jpg",
      "/products/noctis-2.jpg",
    ],
    slug: "noctis",
    rating: 4.6,
    reviewCount: 103,
    modelUrl: null,
  },
  {
    id: "sillage",
    name: "SILLAGE",
    tagline: "The invisible trail you leave behind.",
    story:
      "Sillage is the art of presence — the warm, resinous trail that lingers long after you have left the room. A deeply opulent oriental extrait, built for those who move through the world leaving an impression that cannot be forgotten.",
    type: "Extrait de Parfum",
    size: "75 ML · 2.5 FL.OZ",
    price: 5600,
    priceDisplay: "£56.00",
    originalPrice: 7000,
    originalPriceDisplay: "£70.00",
    discount: "20% OFF",
    notes: {
      top: ["Cinnamon", "Cardamom", "Black Saffron"],
      heart: ["Oud", "Labdanum", "Dark Rose"],
      base: ["Sandalwood", "Amber Resin", "Musk", "Benzoin"],
    },
    color: "#4A1F08",
    colorLight: "#8B4513",
    textColor: "#E8D5A3",
    images: [
      "/products/sillage-1.jpg",
      "/products/sillage-2.jpg",
    ],
    slug: "sillage",
    rating: 4.8,
    reviewCount: 58,
    modelUrl: null,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
