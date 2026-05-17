function Bone({ className }: { className?: string }) {
  return (
    <div
      className={`skeleton rounded-sm ${className ?? ""}`}
      style={{ backgroundColor: "rgba(201,169,110,0.08)" }}
    />
  );
}

export default function ProductLoading() {
  return (
    <div className="min-h-screen pt-24">

      {/* Hero skeleton */}
      <div
        className="w-full py-32 px-6 flex flex-col items-center gap-5"
        style={{
          background: "rgba(201,169,110,0.02)",
          borderBottom: "1px solid rgba(201,169,110,0.08)",
        }}
      >
        <Bone className="h-3 w-24" />
        <Bone className="h-16 w-56" />
        <Bone className="h-4 w-40" />
      </div>

      {/* Main content skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left — visual */}
        <Bone className="aspect-[3/4] w-full" />

        {/* Right — details */}
        <div className="flex flex-col gap-10 pt-2">

          {/* Story */}
          <div className="flex flex-col gap-3">
            <Bone className="h-3 w-20" />
            <Bone className="h-5 w-full" />
            <Bone className="h-5 w-11/12" />
            <Bone className="h-5 w-4/5" />
            <Bone className="h-5 w-3/4" />
          </div>

          {/* Scent pyramid */}
          <div
            className="border p-8 flex flex-col gap-5"
            style={{ borderColor: "rgba(201,169,110,0.1)", backgroundColor: "var(--color-obsidian-soft)" }}
          >
            <Bone className="h-3 w-28" />
            {["Top Notes", "Heart Notes", "Base Notes"].map((label) => (
              <div key={label} className="flex flex-col gap-2">
                <Bone className="h-2.5 w-20" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Bone key={i} className="h-7 w-16" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border p-4 flex flex-col gap-2" style={{ borderColor: "rgba(201,169,110,0.08)" }}>
                <Bone className="h-2.5 w-16" />
                <Bone className="h-4 w-24" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="border-t pt-8 flex flex-col gap-4" style={{ borderColor: "rgba(201,169,110,0.12)" }}>
            <Bone className="h-8 w-28" />
            <Bone className="h-3 w-40" />
            <Bone className="h-14 w-full" />
          </div>
        </div>
      </div>

    </div>
  );
}
