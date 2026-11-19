"use client";

import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { SafeUser } from "@/types/auth.types";

export const authQueryKeys = { me: ["auth", "me"] as const };

export function useCurrentUserQuery(options: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: authQueryKeys.me,
    queryFn: () => apiRequest<ApiResponse<SafeUser>["data"]>("/auth/me"),
    retry: false,
    ...options,
  });
}
