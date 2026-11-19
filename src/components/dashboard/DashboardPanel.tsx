import type { LucideIcon } from "lucide-react";

export function DashboardPanel({
  title,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 ${className}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-foreground">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <h2 className="font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}
