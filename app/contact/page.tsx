"use client";

import { motion } from "framer-motion";
import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionPrimitives";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-28 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <FadeUp className="text-center mb-16">
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-gold)" }}>
              Atelier Nuvellé
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
          </div>
          <h1
            className="font-display font-light"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "var(--color-text-primary)" }}
          >
            Contact
          </h1>
          <p className="text-sm mt-4 tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
            We respond to all enquiries within 48 hours.
          </p>
        </FadeUp>

        {/* Form */}
        <StaggerContainer>
          <form className="flex flex-col gap-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StaggerItem>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--color-text-secondary)" }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    className="bg-transparent py-3 px-4 text-sm outline-none transition-colors duration-300"
                    style={{ border: "1px solid rgba(201,169,110,0.2)", color: "var(--color-text-primary)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.6)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)")}
                  />
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--color-text-secondary)" }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="bg-transparent py-3 px-4 text-sm outline-none transition-colors duration-300"
                    style={{ border: "1px solid rgba(201,169,110,0.2)", color: "var(--color-text-primary)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.6)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)")}
                  />
                </div>
              </StaggerItem>
            </div>

            <StaggerItem>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--color-text-secondary)" }}>
                  Email
                </label>
                <input
                  type="email"
                  className="bg-transparent py-3 px-4 text-sm outline-none transition-colors duration-300"
                  style={{ border: "1px solid rgba(201,169,110,0.2)", color: "var(--color-text-primary)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.6)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)")}
                />
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--color-text-secondary)" }}>
                  Subject
                </label>
                <select
                  className="bg-transparent py-3 px-4 text-sm outline-none transition-colors duration-300 cursor-pointer"
                  style={{
                    border: "1px solid rgba(201,169,110,0.2)",
                    color: "var(--color-text-primary)",
                    backgroundColor: "var(--color-cream-soft)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.6)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)")}
                >
                  <option value="">Select a subject</option>
                  <option value="order">Order Enquiry</option>
                  <option value="product">Product Information</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="press">Press & Media</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--color-text-secondary)" }}>
                  Message
                </label>
                <textarea
                  rows={6}
                  className="bg-transparent py-3 px-4 text-sm outline-none resize-none transition-colors duration-300"
                  style={{ border: "1px solid rgba(201,169,110,0.2)", color: "var(--color-text-primary)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.6)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)")}
                />
              </div>
            </StaggerItem>

            <StaggerItem>
              <motion.button
                type="submit"
                className="w-full py-4 text-xs tracking-[0.3em] uppercase mt-2 cursor-pointer"
                style={{ backgroundColor: "var(--color-gold)", color: "var(--color-obsidian)" }}
                whileHover={{ opacity: 0.88 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                Send Message
              </motion.button>
            </StaggerItem>

          </form>
        </StaggerContainer>

        {/* Alt contact */}
        <FadeIn delay={0.1}>
          <div
            className="mt-16 pt-12 border-t text-center"
            style={{ borderColor: "rgba(201,169,110,0.1)" }}
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--color-gold)" }}>
              Email Directly
            </p>
            <motion.a
              href="mailto:contact@ateliernuvelle.com"
              className="text-sm tracking-wider"
              style={{ color: "var(--color-text-secondary)" }}
              whileHover={{ color: "var(--color-text-primary)" }}
              transition={{ duration: 0.2 }}
            >
              contact@ateliernuvelle.com
            </motion.a>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
