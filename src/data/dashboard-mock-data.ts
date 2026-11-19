import type { CourseStatus } from "@/types/course.types";
import type {
  DashboardCourse,
  LecturerDashboardMock,
  StudentDashboardMock,
} from "@/types/dashboard.types";

function createMockCourse(
  id: string,
  title: string,
  description: string,
  status: CourseStatus,
  progress?: number,
  studentCount?: number,
): DashboardCourse {
  return {
    id,
    title,
    description,
    status,
    archivedAt: null,
    ownerId: `lecturer-${id}`,
    createdAt: "2026-09-01T09:00:00.000Z",
    updatedAt: "2026-10-20T09:00:00.000Z",
    progress,
    studentCount,
  };
}

export const studentDashboardMock: StudentDashboardMock = {
  metrics: {
    enrolledCourses: 4,
    completedCourses: 1,
    pendingLiveClasses: 2,
    pendingAssignments: 3,
  },
  courses: [
    createMockCourse(
      "student-1",
      "Product Design Fundamentals",
      "Learn the foundations of user-centered product design.",
      "PUBLISHED",
      68,
    ),
    createMockCourse(
      "student-2",
      "Frontend Development",
      "Build responsive interfaces with modern web technologies.",
      "PUBLISHED",
      42,
    ),
    createMockCourse(
      "student-3",
      "Career Readiness",
      "Prepare for interviews and your next role in tech.",
      "PUBLISHED",
      100,
    ),
    createMockCourse(
      "student-4",
      "Introduction to Data Analytics",
      "Explore data, ask better questions, and share insights.",
      "PUBLISHED",
      15,
    ),
  ],
  assignments: [
    {
      id: "assignment-s1",
      title: "Design a mobile onboarding flow",
      courseTitle: "Product Design Fundamentals",
      dueLabel: "Due Nov 8",
      status: "PENDING",
    },
    {
      id: "assignment-s2",
      title: "Build a responsive profile page",
      courseTitle: "Frontend Development",
      dueLabel: "Due Nov 10",
      status: "PENDING",
    },
    {
      id: "assignment-s3",
      title: "Write your interview introduction",
      courseTitle: "Career Readiness",
      dueLabel: "Due Nov 12",
      status: "PENDING",
    },
  ],
  liveClasses: [
    {
      id: "class-s1",
      title: "Design critique: onboarding",
      courseTitle: "Product Design Fundamentals",
      scheduleLabel: "Today · 2:30 PM",
      instructor: "Amara Okafor",
    },
    {
      id: "class-s2",
      title: "React state and events",
      courseTitle: "Frontend Development",
      scheduleLabel: "Tomorrow · 11:00 AM",
      instructor: "David Mensah",
    },
  ],
};

export const lecturerDashboardMock: LecturerDashboardMock = {
  metrics: {
    createdCourses: 3,
    studentsEnrolled: 84,
    upcomingLiveClasses: 2,
    liveAssignments: 6,
  },
  courses: [
    createMockCourse(
      "lecturer-1",
      "Product Design Fundamentals",
      "A practical introduction to research, prototyping, and design critique.",
      "PUBLISHED",
      undefined,
      36,
    ),
    createMockCourse(
      "lecturer-2",
      "Design Systems in Practice",
      "Build consistent, accessible systems for product teams.",
      "PUBLISHED",
      undefined,
      28,
    ),
    createMockCourse(
      "lecturer-3",
      "Portfolio Studio",
      "A guided studio for polishing and presenting your work.",
      "DRAFT",
      undefined,
      20,
    ),
  ],
  assignments: [
    {
      id: "assignment-l1",
      title: "Mobile onboarding critique",
      courseTitle: "Product Design Fundamentals",
      dueLabel: "Due Nov 8",
      status: "PENDING",
    },
    {
      id: "assignment-l2",
      title: "Create a button component set",
      courseTitle: "Design Systems in Practice",
      dueLabel: "Due Nov 11",
      status: "PENDING",
    },
    {
      id: "assignment-l3",
      title: "Portfolio case study review",
      courseTitle: "Portfolio Studio",
      dueLabel: "Due Nov 14",
      status: "PENDING",
    },
  ],
  liveClasses: [
    {
      id: "class-l1",
      title: "Design critique session",
      courseTitle: "Product Design Fundamentals",
      scheduleLabel: "Today · 2:30 PM",
      instructor: "You",
    },
    {
      id: "class-l2",
      title: "Design tokens workshop",
      courseTitle: "Design Systems in Practice",
      scheduleLabel: "Friday · 10:00 AM",
      instructor: "You",
    },
  ],
};
