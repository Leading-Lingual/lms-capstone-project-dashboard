"use client";
import { useQuery } from "@tanstack/react-query";
import { apiRequest, withPagination } from "@/lib/api-client";
import type { PaginatedData, PaginationParams } from "@/types/api.types";
import type { Course } from "@/types/course.types";

export const courseQueryKeys = {
  all: ["courses"] as const,
  list: (params: PaginationParams) => ["courses", params] as const,
  detail: (id: string) => ["courses", id] as const,
};
export function useCoursesQuery(params: PaginationParams = {}) {
  return useQuery({
    queryKey: courseQueryKeys.list(params),
    queryFn: () =>
      apiRequest<PaginatedData<Course>>(withPagination("/courses", params)),
  });
}

export function useCourseQuery(
  id: string,
  options: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: courseQueryKeys.detail(id),
    queryFn: () => apiRequest<Course>(`/courses/${id}`),
    enabled: Boolean(id) && options.enabled !== false,
  });
}
