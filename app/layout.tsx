import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { SearchProvider } from "@/lib/search-context";
import SearchOverlay from "@/components/SearchOverlay";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import IntroOverlay from "@/components/IntroOverlay";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const SITE_URL = "https://ateliernuvelle.com";
const OG_DESCRIPTION = "A curated collection of rare Extrait de Parfum compositions. Crafted for those who live beautifully.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Atelier Nuvellé — Luxury Perfumes",
    template: "%s — Atelier Nuvellé",
  },
  description: OG_DESCRIPTION,
  keywords: ["luxury perfume", "extrait de parfum", "niche fragrance", "Atelier Nuvellé", "niche perfume UK", "luxury fragrance London"],
  authors: [{ name: "Atelier Nuvellé" }],
  creator: "Atelier Nuvellé",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Atelier Nuvellé",
    title: "Atelier Nuvellé — Luxury Perfumes",
    description: OG_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Atelier Nuvellé — Luxury Perfumes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atelier Nuvellé — Luxury Perfumes",
    description: OG_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const BUILD_ID = "wlMU-UZ1Cz_fuV0fl13Kp";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        {/* Auto-detect stale browser cache and reload once to get fresh JS */}
        <script dangerouslySetInnerHTML={{ __html: `
(function(){
  try {
    var k = 'an_bid', v = '${BUILD_ID}';
    var s = localStorage.getItem(k);
    if (s && s !== v) { localStorage.setItem(k, v); window.location.reload(true); return; }
    localStorage.setItem(k, v);
  } catch(e) {}
})();
        `.trim() }} />
      </head>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-obsidian)", color: "var(--color-ivory)" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Atelier Nuvellé",
              url: "https://ateliernuvelle.com",
              email: "contact@ateliernuvelle.com",
              logo: "https://ateliernuvelle.com/og-image.jpg",
              address: { "@type": "PostalAddress", addressCountry: "GB" },
              sameAs: [],
            }),
          }}
        />
        <SearchProvider>
        <WishlistProvider>
        <CartProvider>
          <CustomCursor />
          <IntroOverlay />
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
        </CartProvider>
        </WishlistProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
