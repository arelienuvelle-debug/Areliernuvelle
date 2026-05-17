"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--color-obsidian)" }}
    >
      <div
        className="w-full max-w-sm px-8 py-10 border"
        style={{
          borderColor: "rgba(201,169,110,0.2)",
          backgroundColor: "var(--color-obsidian-soft)",
        }}
      >
        <div className="text-center mb-8">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-2"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-body)" }}
          >
            Atelier Nuvellé
          </p>
          <h1
            className="text-2xl font-light"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-ivory)" }}
          >
            Admin Portal
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-xs tracking-widest uppercase mb-2"
              style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-body)" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-transparent border text-sm outline-none"
              style={{
                borderColor: "rgba(201,169,110,0.3)",
                color: "var(--color-ivory)",
                fontFamily: "var(--font-body)",
              }}
              placeholder="Enter admin password"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-xs" style={{ color: "#e57373", fontFamily: "var(--font-body)" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-xs tracking-[0.2em] uppercase transition-opacity"
            style={{
              backgroundColor: "var(--color-gold)",
              color: "var(--color-obsidian)",
              fontFamily: "var(--font-body)",
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
