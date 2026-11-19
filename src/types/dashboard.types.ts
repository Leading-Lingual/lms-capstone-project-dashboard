import type { Course } from "@/types/course.types";

export interface DashboardCourse extends Course {
  progress?: number;
  studentCount?: number;
}

export interface DashboardAssignment {
  id: string;
  title: string;
  courseTitle: string;
  dueLabel: string;
  status: "PENDING" | "SUBMITTED";
}

export interface DashboardLiveClass {
  id: string;
  title: string;
  courseTitle: string;
  scheduleLabel: string;
  instructor: string;
}

export interface StudentDashboardMock {
  metrics: {
    enrolledCourses: number;
    completedCourses: number;
    pendingLiveClasses: number;
    pendingAssignments: number;
  };
  courses: DashboardCourse[];
  assignments: DashboardAssignment[];
  liveClasses: DashboardLiveClass[];
}

export interface LecturerDashboardMock {
  metrics: {
    createdCourses: number;
    studentsEnrolled: number;
    upcomingLiveClasses: number;
    liveAssignments: number;
  };
  courses: DashboardCourse[];
  assignments: DashboardAssignment[];
  liveClasses: DashboardLiveClass[];
}
