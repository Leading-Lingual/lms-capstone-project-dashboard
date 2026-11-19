import type { LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  icon: Icon,
  note,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  note?: string;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      {note && <p className="mt-2 text-xs text-muted-foreground">{note}</p>}
    </article>
  );
}
