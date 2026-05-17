import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductBySlug } from "@/lib/products";
import ProductPageClient from "@/components/ProductPageClient";

const BASE = "https://ateliernuvelle.com";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const ogImage = product.images[0]
    ? { url: product.images[0], width: 800, height: 1066, alt: `${product.name} — Atelier Nuvellé` }
    : { url: "/og-image.jpg", width: 1200, height: 630, alt: `${product.name} — Atelier Nuvellé` };
  return {
    title: product.name,
    description: product.story,
    openGraph: {
      title: `${product.name} — Atelier Nuvellé`,
      description: product.story,
      url: `${BASE}/collection/${product.slug}`,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Atelier Nuvellé`,
      description: product.story,
      images: [ogImage.url],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.story,
    image: product.images.map((img) => `${BASE}${img}`),
    brand: { "@type": "Brand", name: "Atelier Nuvellé" },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: (product.price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${BASE}/collection/${product.slug}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Collection", item: `${BASE}/collection` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${BASE}/collection/${product.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ProductPageClient product={product} />
    </>
  );
}
