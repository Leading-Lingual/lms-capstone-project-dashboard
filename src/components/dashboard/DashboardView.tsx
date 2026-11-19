"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Users,
} from "lucide-react";
import { useCurrentUserQuery } from "@/actions/auth/auth.queries";
import { useCoursesQuery } from "@/actions/courses/courses.queries";
import { AssignmentList } from "@/components/dashboard/AssignmentList";
import { CourseRows } from "@/components/dashboard/CourseRows";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { LiveClassList } from "@/components/dashboard/LiveClassList";
import { MetricCard } from "@/components/dashboard/MetricCard";

export function DashboardView() {
  const currentUser = useCurrentUserQuery();
  const courses = useCoursesQuery({ limit: 4 });
  const isLecturer = currentUser.data?.role === "LECTURER";
  const courseData = courses.data?.items ?? [];

  return (
    <>
      {currentUser.isPending ? (
        <DashboardSkeleton />
      ) : (
        <>
          <div className="mb-7">
            <p className="text-sm font-medium text-muted-foreground">
              {isLecturer ? "Lecturer workspace" : "Student workspace"}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Welcome
              {currentUser.data?.name
                ? `, ${currentUser.data.name.split(" ")[0]}`
                : ""}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isLecturer
                ? "A quick overview of your teaching activity."
                : "A quick overview of your learning activity."}
            </p>
          </div>

          <section
            aria-label="Overview"
            className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          >
            {isLecturer ? (
              <>
                <MetricCard
                  label="Created courses"
                  value={courseData.length}
                  icon={BookOpen}
                />
                <MetricCard
                  label="Students enrolled"
                  value="—"
                  icon={Users}
                />
                <MetricCard
                  label="Upcoming live classes"
                  value="—"
                  icon={CalendarDays}
                />
                <MetricCard
                  label="Live assignments"
                  value="—"
                  icon={ClipboardList}
                />
              </>
            ) : (
              <>
                <MetricCard
                  label="Enrolled courses"
                  value={courseData.length}
                  icon={BookOpen}
                />
                <MetricCard
                  label="Completed courses"
                  value="—"
                  icon={GraduationCap}
                />
                <MetricCard
                  label="Pending live classes"
                  value="—"
                  icon={CalendarDays}
                />
                <MetricCard
                  label="Pending assignments"
                  value="—"
                  icon={ClipboardList}
                />
              </>
            )}
          </section>

          <div className="grid gap-4 lg:grid-cols-2">
            <DashboardPanel
              title={isLecturer ? "Created courses" : "Enrolled courses"}
              icon={BookOpen}
              className="lg:row-span-2"
            >
              <CourseRows courses={courseData} loading={courses.isPending} />
              <Link
                href="/courses"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
              >
                View all courses{" "}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </DashboardPanel>
            <DashboardPanel
              title={
                isLecturer ? "Upcoming live classes" : "Pending assignments"
              }
              icon={isLecturer ? CalendarDays : ClipboardList}
            >
              {isLecturer ? (
                <LiveClassList classes={[]} />
              ) : (
                <AssignmentList assignments={[]} />
              )}
            </DashboardPanel>
            <DashboardPanel
              title={isLecturer ? "Assignments" : "Live classes"}
              icon={isLecturer ? ClipboardList : CalendarDays}
            >
              {isLecturer ? (
                <AssignmentList assignments={[]} />
              ) : (
                <LiveClassList classes={[]} />
              )}
            </DashboardPanel>
          </div>
        </>
      )}
    </>
  );
}
