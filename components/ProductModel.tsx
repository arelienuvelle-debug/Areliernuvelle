"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  ContactShadows,
  Center,
} from "@react-three/drei";
import type { Group } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import ProceduralBottle from "@/components/ProceduralBottle";

// ── GLB bottle ─────────────────────────────────────────────────────────────

function GlbBottle({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<Group>(null);
  return <primitive ref={ref} object={scene} dispose={null} />;
}

// ── Scene ──────────────────────────────────────────────────────────────────

interface SceneProps {
  url?: string | null;
  slug?: string;
  color?: string;
  colorLight?: string;
}

function Scene({ url, slug = "velours", color = "#7B1C3A", colorLight = "#A02550" }: SceneProps) {
  const controls = useRef<OrbitControlsImpl>(null);

  return (
    <>
      {/* High-grade Studio Lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Key Light (Front Right) */}
      <directionalLight
        position={[5, 6, 5]}
        intensity={2.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Fill Light (Soft Warm Front Left) */}
      <directionalLight
        position={[-5, 3, 2]}
        intensity={1.5}
        color="#FDF6E2"
      />
      
      {/* Rim/Back Light (Behind Bottle to make the glass silhouette glow) */}
      <directionalLight
        position={[0, 4, -8]}
        intensity={5.0}
        color="#FFFFFF"
      />
      
      {/* Bottom Accent (Warm gold bounce light) */}
      <spotLight
        position={[0, -6, 2]}
        angle={0.6}
        penumbra={1}
        intensity={1.2}
        color="#C9A96E"
      />

      {/* Environment for reflections (glass/metal) */}
      <Environment preset="studio" />

      {/* Model */}
      <Suspense fallback={null}>
        <Center>
          {url ? (
            <GlbBottle url={url} />
          ) : (
            <ProceduralBottle slug={slug} color={color} colorLight={colorLight} />
          )}
        </Center>
        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.4}
          scale={6}
          blur={2.5}
          far={4}
          resolution={256}
          color="#000000"
        />
      </Suspense>

      {/* Controls */}
      <OrbitControls
        ref={controls}
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.9}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI * 0.72}
        dampingFactor={0.08}
        enableDamping
      />
    </>
  );
}

// ── Loading shimmer ────────────────────────────────────────────────────────

function ModelSkeleton() {
  return (
    <div
      className="w-full h-full skeleton rounded-sm"
      style={{ backgroundColor: "rgba(201,169,110,0.06)" }}
    />
  );
}

// ── Public component ───────────────────────────────────────────────────────

interface ProductModelProps {
  url?: string | null;
  slug?: string;
  color?: string;
  colorLight?: string;
}

export default function ProductModel({ url, slug, color, colorLight }: ProductModelProps) {
  const [ready, setReady] = useState(false);

  return (
    <div className="w-full h-full relative">
      {!ready && <ModelSkeleton />}
      <div
        className="w-full h-full"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}
      >
        <Canvas
          camera={{ position: [0, 0.3, 4.2], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          shadows
          onCreated={() => setReady(true)}
          style={{ background: "transparent" }}
        >
          <Scene url={url} slug={slug} color={color} colorLight={colorLight} />
        </Canvas>
      </div>
    </div>
  );
}
