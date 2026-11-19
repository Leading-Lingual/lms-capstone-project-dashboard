"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api-client";
import type { SafeUser } from "@/types/auth.types";
import type {
  UpdateProfileRequest,
} from "@/types/user.types";
import { authQueryKeys } from "@/actions/auth/auth.queries";

import { PaginationParams } from "@/types/api.types";

export const userQueryKeys = {
  all: ["admin", "users"] as const,
  list: (params: PaginationParams) => ["admin", "users", params] as const,
  auditLogs: (params: PaginationParams) =>
    ["admin", "audit-logs", params] as const,
};

export function useUpdateProfileMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateProfileRequest) =>
      apiRequest<SafeUser>("/users/me", {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    onSuccess: (user) => client.setQueryData(authQueryKeys.me, user),
  });
}