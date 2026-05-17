function Bone({ className }: { className?: string }) {
  return (
    <div
      className={`skeleton rounded-sm ${className ?? ""}`}
      style={{ backgroundColor: "rgba(201,169,110,0.08)" }}
    />
  );
}

export default function CollectionLoading() {
  return (
    <div className="min-h-screen pt-32 pb-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header skeleton */}
        <div className="flex flex-col items-center gap-4 mb-20">
          <Bone className="h-2.5 w-28" />
          <Bone className="h-12 w-52" />
          <Bone className="h-3 w-64" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Bone className="aspect-[3/4] w-full" />
              <Bone className="h-4 w-3/4" />
              <Bone className="h-3 w-1/2" />
              <Bone className="h-10 w-full" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
