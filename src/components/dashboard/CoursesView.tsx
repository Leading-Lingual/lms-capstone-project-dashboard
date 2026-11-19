"use client";

import Link from "next/link";
import { BookOpen, ChevronLeft } from "lucide-react";
import { useCurrentUserQuery } from "@/actions/auth/auth.queries";
import { useCoursesQuery } from "@/actions/courses/courses.queries";

export function CoursesView() {
  const user = useCurrentUserQuery().data;
  const courses = useCoursesQuery();

  return (
    <>
      <Link
        href="/dashboard"
        className="mb-5 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Dashboard
      </Link>
      <div className="mb-7">
        <p className="text-sm font-medium text-muted-foreground">
          {user?.role === "LECTURER" ? "Teaching" : "Learning"}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          {user?.role === "LECTURER" ? "Created courses" : "My courses"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse your course list and check your progress.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {(courses.data?.items ?? []).map((course) => (
          <article
            key={course.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <BookOpen className="size-5" aria-hidden="true" />
              </span>
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                {course.status === "PUBLISHED" ? "In progress" : "Draft"}
              </span>
            </div>
            <h2 className="font-semibold text-foreground">{course.title}</h2>
            <p className="mt-2 line-clamp-3 min-h-15 text-sm text-muted-foreground">
              {course.description}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}
