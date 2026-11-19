export type CourseStatus = "DRAFT" | "PUBLISHED";
export type CourseMemberKind = "STUDENT" | "LECTURER";
export interface Course {
  id: string; title: string; description: string; status: CourseStatus;
  archivedAt: string | null; ownerId: string; createdAt: string; updatedAt: string;
}
export interface CreateCourseRequest { title: string; description?: string }
export interface UpdateCourseRequest { title?: string; description?: string }
export interface CourseMemberRequest { studentId?: string; lecturerId?: string }
export interface CourseMembership { courseId: string; memberId: string; kind: CourseMemberKind; enrolled: boolean }
