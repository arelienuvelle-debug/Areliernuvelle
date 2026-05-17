"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useSearch } from "@/lib/search-context";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

const NAV_LINKS = [
  { href: "/collection", label: "Collection" },
  { href: "/about", label: "La Maison" },
  { href: "/contact", label: "Contact" },
];

const textVariants: Variants = {
  rest: { color: "var(--color-ivory-soft)" },
  hover: { color: "var(--color-gold)", transition: { duration: 0.2 } },
};

const underlineVariants: Variants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] } },
};

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.div
      className="relative"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Link href={href} className="block">
        <motion.span
          variants={textVariants}
          className="text-xs tracking-[0.2em] uppercase"
        >
          {label}
        </motion.span>
      </Link>
      <motion.span
        variants={underlineVariants}
        className="absolute -bottom-0.5 left-0 right-0 h-px block"
        style={{ backgroundColor: "var(--color-gold)", originX: 0 }}
      />
    </motion.div>
  );
}

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { open: openSearch } = useSearch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(201,169,110,0.15)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center leading-none">
          <span
            className="font-display text-lg tracking-[0.25em] uppercase"
            style={{ color: "var(--color-gold)" }}
          >
            Atelier
          </span>
          <span
            className="font-display text-xs tracking-[0.5em] uppercase"
            style={{ color: "var(--color-ivory-soft)" }}
          >
            Nuvellé
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ href, label }) => (
            <NavLink key={href} href={href} label={label} />
          ))}
        </nav>

        {/* Cart + Wishlist + Search + Mobile toggle */}
        <div className="flex items-center gap-4">
          {/* Search button */}
          <motion.button
            onClick={openSearch}
            className="p-2 cursor-pointer"
            style={{ color: "var(--color-ivory-soft)" }}
            whileHover={{ color: "var(--color-gold)" }}
            transition={{ duration: 0.2 }}
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.5} />
          </motion.button>
          {/* Wishlist button */}
          <motion.div
            className="relative p-2"
            whileHover={{ color: "var(--color-gold)" }}
            transition={{ duration: 0.2 }}
            style={{ color: "var(--color-ivory-soft)" }}
          >
            <Link href="/wishlist" aria-label="Wishlist">
              <Heart size={20} strokeWidth={1.5} />
            </Link>
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.span
                  key="wbadge"
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-medium pointer-events-none"
                  style={{ backgroundColor: "var(--color-gold)", color: "var(--color-obsidian)" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 450, damping: 20 }}
                >
                  {wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Cart button */}
          <motion.button
            onClick={openCart}
            className="relative p-2 cursor-pointer"
            style={{ color: "var(--color-ivory-soft)" }}
            whileHover={{ color: "var(--color-gold)" }}
            transition={{ duration: 0.2 }}
            aria-label="Open cart"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key="badge"
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-medium"
                  style={{ backgroundColor: "var(--color-gold)", color: "var(--color-obsidian)" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 450, damping: 20 }}
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden p-2 cursor-pointer"
            style={{ color: "var(--color-ivory-soft)" }}
            onClick={() => setMenuOpen((v) => !v)}
            whileHover={{ color: "var(--color-gold)" }}
            transition={{ duration: 0.2 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu — spring open/close */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden md:hidden"
            style={{
              backgroundColor: "rgba(10,10,10,0.97)",
              borderTop: "1px solid rgba(201,169,110,0.15)",
            }}
          >
            <div className="px-6 pb-8 pt-4 flex flex-col gap-6">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link
                    href={href}
                    className="font-display text-xl tracking-[0.15em]"
                    style={{ color: "var(--color-ivory)" }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
