"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Incorrect password.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Subtle gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(201,169,110,0.05) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative w-full max-w-sm border px-8 py-10"
        style={{ borderColor: "rgba(201,169,110,0.2)", backgroundColor: "#111111" }}
      >
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
            <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#C9A96E" }}>
              Atelier Nuvellé
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
          </div>
          <h1
            className="font-display font-light text-2xl tracking-widest"
            style={{ color: "#F5F0E8" }}
          >
            Admin Portal
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-[10px] tracking-[0.25em] uppercase mb-2"
              style={{ color: "rgba(245,240,232,0.4)" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-transparent border text-sm outline-none transition-colors"
              style={{
                borderColor: "rgba(201,169,110,0.25)",
                color: "#F5F0E8",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.7)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.25)")}
              placeholder="••••••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-xs tracking-wide" style={{ color: "#f87171" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-xs tracking-[0.3em] uppercase transition-opacity cursor-pointer"
            style={{
              backgroundColor: "#C9A96E",
              color: "#0A0A0A",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Verifying…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
