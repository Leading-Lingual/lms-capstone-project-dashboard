import { ClipboardList } from "lucide-react";
import type { DashboardAssignment } from "@/types/dashboard.types";

export function AssignmentList({
  assignments,
}: {
  assignments: DashboardAssignment[];
}) {
  if (!assignments.length)
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        No assignments to show.
      </p>
    );
  return (
    <ul className="divide-y divide-border">
      {assignments.map((assignment) => (
        <li
          key={assignment.id}
          className="flex items-start gap-3 py-4 first:pt-0 last:pb-0"
        >
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <ClipboardList className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground">{assignment.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {assignment.courseTitle}
            </p>
          </div>
          <span className="shrink-0 text-xs font-medium text-muted-foreground">
            {assignment.dueLabel}
          </span>
        </li>
      ))}
    </ul>
  );
}
