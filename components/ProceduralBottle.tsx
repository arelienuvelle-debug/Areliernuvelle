"use client";

import { useMemo } from "react";
import * as THREE from "three";

// ── Shared materials ──────────────────────────────────────────────────────

function GlassMat({ color }: { color: string }) {
  return (
    <meshPhysicalMaterial
      color={color}
      transparent
      opacity={0.9}
      roughness={0.03}
      metalness={0.0}
      transmission={0.96}
      thickness={1.6}
      ior={1.52}
      clearcoat={1.0}
      clearcoatRoughness={0.03}
      reflectivity={0.9}
      envMapIntensity={2.8}
      side={THREE.DoubleSide}
    />
  );
}

function GoldMat() {
  return (
    <meshPhysicalMaterial
      color="#C9A96E"
      metalness={0.96}
      roughness={0.12}
      clearcoat={1.0}
      clearcoatRoughness={0.08}
      reflectivity={0.9}
      envMapIntensity={2.8}
    />
  );
}

function DarkGoldMat() {
  return (
    <meshPhysicalMaterial
      color="#8B6914"
      metalness={0.96}
      roughness={0.1}
      clearcoat={1.0}
      clearcoatRoughness={0.08}
      reflectivity={0.9}
      envMapIntensity={2.8}
    />
  );
}

// ── Profile helper ────────────────────────────────────────────────────────

function v2(...pairs: [number, number][]): THREE.Vector2[] {
  return pairs.map(([x, y]) => new THREE.Vector2(x, y));
}

// ── VELOURS — Wide baroque flacon, deep crimson ───────────────────────────
export function VeloursBottle({ color }: { color: string }) {
  const body = useMemo(() => v2(
    [0.00, -1.75], [0.62, -1.75], [0.70, -1.60],
    [0.76, -1.20], [0.82, -0.50], [0.84, 0.00],
    [0.81, 0.50],  [0.72, 0.82],  [0.52, 1.05],
    [0.36, 1.18],  [0.30, 1.30],  [0.32, 1.44],
    [0.30, 1.55],
  ), []);

  return (
    <group>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[body, 80]} />
        <GlassMat color={color} />
      </mesh>

      {/* Decorative gold band at shoulder */}
      <mesh position={[0, 0.78, 0]}>
        <torusGeometry args={[0.54, 0.022, 10, 80]} />
        <GoldMat />
      </mesh>

      {/* Thin base ring */}
      <mesh position={[0, -1.75, 0]}>
        <torusGeometry args={[0.48, 0.018, 8, 80]} />
        <DarkGoldMat />
      </mesh>

      {/* Cap cylinder */}
      <mesh position={[0, 1.76, 0]}>
        <cylinderGeometry args={[0.35, 0.33, 0.42, 64, 1]} />
        <GoldMat />
      </mesh>
      {/* Cap dome */}
      <mesh position={[0, 1.98, 0]}>
        <sphereGeometry args={[0.35, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <GoldMat />
      </mesh>
    </group>
  );
}

// ── LUEUR — Tall slim pillar, arctic blue ─────────────────────────────────
export function LueurBottle({ color }: { color: string }) {
  const body = useMemo(() => v2(
    [0.00, -2.05], [0.36, -2.05], [0.41, -1.90],
    [0.43, -1.50], [0.44, -0.50], [0.44, 0.60],
    [0.43, 1.00],  [0.38, 1.22],  [0.26, 1.42],
    [0.22, 1.58],  [0.23, 1.72],
  ), []);

  return (
    <group>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[body, 80]} />
        <GlassMat color={color} />
      </mesh>

      {/* Minimal cap */}
      <mesh position={[0, 1.96, 0]}>
        <cylinderGeometry args={[0.25, 0.24, 0.48, 64, 1]} />
        <GoldMat />
      </mesh>
      {/* Cap flat top */}
      <mesh position={[0, 2.21, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.02, 64, 1]} />
        <GoldMat />
      </mesh>
    </group>
  );
}

// ── ÉPURE — Pure geometric cylinder, golden ───────────────────────────────
export function EpureBottle({ color }: { color: string }) {
  const body = useMemo(() => v2(
    [0.00, -1.65], [0.56, -1.65], [0.60, -1.55],
    [0.60, -1.00], [0.60, 0.55],  [0.58, 0.85],
    [0.40, 1.08],  [0.28, 1.22],  [0.26, 1.38],
  ), []);

  return (
    <group>
      {/* Body — 8-sided for geometric feel */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[body, 8]} />
        <GlassMat color={color} />
      </mesh>

      {/* Geometric cap — 8 sides matching body */}
      <mesh position={[0, 1.62, 0]}>
        <cylinderGeometry args={[0.32, 0.28, 0.48, 8, 1]} />
        <GoldMat />
      </mesh>
      {/* Cap lid */}
      <mesh position={[0, 1.88, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.04, 8, 1]} />
        <GoldMat />
      </mesh>
    </group>
  );
}

// ── NOCTIS — Soft feminine oval, blush rose ───────────────────────────────
export function NoctisBottle({ color }: { color: string }) {
  const body = useMemo(() => v2(
    [0.00, -1.45], [0.50, -1.45], [0.58, -1.28],
    [0.68, -0.80], [0.72, -0.20], [0.70, 0.30],
    [0.64, 0.70],  [0.52, 0.95],  [0.34, 1.12],
    [0.27, 1.24],  [0.29, 1.37],  [0.27, 1.46],
  ), []);

  return (
    <group>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[body, 80]} />
        <GlassMat color={color} />
      </mesh>

      {/* Delicate gold ring at waist */}
      <mesh position={[0, 0.28, 0]}>
        <torusGeometry args={[0.42, 0.016, 8, 80]} />
        <GoldMat />
      </mesh>

      {/* Round feminine cap */}
      <mesh position={[0, 1.62, 0]}>
        <sphereGeometry args={[0.30, 40, 20]} />
        <GoldMat />
      </mesh>
    </group>
  );
}

// ── SILLAGE — Grand commanding flacon, dark oriental ─────────────────────
export function SillageBottle({ color }: { color: string }) {
  const body = useMemo(() => v2(
    [0.00, -2.25], [0.70, -2.25], [0.78, -2.05],
    [0.76, -1.70], [0.72, -1.00], [0.66, -0.10],
    [0.60, 0.60],  [0.52, 1.10],  [0.38, 1.38],
    [0.30, 1.58],  [0.32, 1.72],  [0.30, 1.85],
  ), []);

  return (
    <group>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[body, 80]} />
        <GlassMat color={color} />
      </mesh>

      {/* Heavy base ring */}
      <mesh position={[0, -2.25, 0]}>
        <torusGeometry args={[0.55, 0.03, 10, 80]} />
        <DarkGoldMat />
      </mesh>

      {/* Gold band mid-body */}
      <mesh position={[0, -0.12, 0]}>
        <torusGeometry args={[0.48, 0.024, 10, 80]} />
        <GoldMat />
      </mesh>

      {/* Grand wide cap */}
      <mesh position={[0, 2.07, 0]}>
        <cylinderGeometry args={[0.38, 0.33, 0.44, 64, 1]} />
        <GoldMat />
      </mesh>
      {/* Cap dome */}
      <mesh position={[0, 2.30, 0]}>
        <sphereGeometry args={[0.38, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <GoldMat />
      </mesh>
    </group>
  );
}

// ── Main selector ─────────────────────────────────────────────────────────

export default function ProceduralBottle({
  slug,
  color,
  colorLight,
}: {
  slug: string;
  color: string;
  colorLight: string;
}) {
  switch (slug) {
    case "velours": return <VeloursBottle color={colorLight} />;
    case "lueur":   return <LueurBottle   color={colorLight} />;
    case "epure":   return <EpureBottle   color={colorLight} />;
    case "noctis":  return <NoctisBottle  color={colorLight} />;
    case "sillage": return <SillageBottle color={colorLight} />;
    default:        return <VeloursBottle color={colorLight} />;
  }
}
