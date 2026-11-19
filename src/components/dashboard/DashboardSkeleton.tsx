export function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 h-8 w-56 rounded bg-muted" />
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-muted" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-96 rounded-2xl bg-muted" />
        <div className="grid gap-4">
          <div className="h-44 rounded-2xl bg-muted" />
          <div className="h-44 rounded-2xl bg-muted" />
        </div>
      </div>
    </div>
  );
}
