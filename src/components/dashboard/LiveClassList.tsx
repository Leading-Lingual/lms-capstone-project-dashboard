import { CalendarDays } from "lucide-react";
import type { DashboardLiveClass } from "@/types/dashboard.types";

export function LiveClassList({ classes }: { classes: DashboardLiveClass[] }) {
  if (!classes.length)
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        No upcoming classes.
      </p>
    );
  return (
    <ul className="divide-y divide-border">
      {classes.map((liveClass) => (
        <li
          key={liveClass.id}
          className="flex items-start gap-3 py-4 first:pt-0 last:pb-0"
        >
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <CalendarDays className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground">{liveClass.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {liveClass.courseTitle} · {liveClass.instructor}
            </p>
          </div>
          <span className="shrink-0 text-xs font-medium text-muted-foreground">
            {liveClass.scheduleLabel}
          </span>
        </li>
      ))}
    </ul>
  );
}
