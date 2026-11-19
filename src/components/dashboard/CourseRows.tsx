import { BookOpen } from "lucide-react";
import type { DashboardCourse } from "@/types/dashboard.types";

export function CourseRows({
  courses,
  loading = false,
}: {
  courses: DashboardCourse[];
  loading?: boolean;
}) {
  if (loading)
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        Loading courses...
      </p>
    );
  if (courses.length === 0)
    return (
      <div className="rounded-xl border border-dashed border-border px-4 py-10 text-center">
        <BookOpen
          className="mx-auto mb-3 size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="font-medium text-foreground">No courses yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Your courses will appear here.
        </p>
      </div>
    );
  return (
    <ul className="divide-y divide-border">
      {courses.slice(0, 4).map((course) => (
        <li
          key={course.id}
          className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
        >
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">
              {course.title}
            </p>
            <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
              {course.description || "Course workspace"}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {course.progress === 100
              ? "Completed"
              : course.status === "PUBLISHED"
                ? "In progress"
                : "Draft"}
          </span>
        </li>
      ))}
    </ul>
  );
}
