"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authQueryKeys } from "@/actions/auth/auth.queries";
import { apiRequest } from "@/lib/api-client";
import type {
  LoginData,
  LoginRequest,
  MessageData,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from "@/types/auth.types";

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (body: RegisterRequest) =>
      apiRequest<MessageData>("/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  });
}
export function useVerifyEmailMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: VerifyEmailRequest) =>
      apiRequest<MessageData>("/auth/verify-email", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: authQueryKeys.me }),
  });
}
export function useResendVerificationMutation() {
  return useMutation({
    mutationFn: (body: { email: string }) =>
      apiRequest<MessageData>("/auth/resend-verification", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  });
}
export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (body: { email: string }) =>
      apiRequest<MessageData>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  });
}
export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (body: ResetPasswordRequest) =>
      apiRequest<MessageData>("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  });
}
export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: LoginRequest) =>
      apiRequest<LoginData>("/api/auth", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: ({ user }) => queryClient.setQueryData(authQueryKeys.me, user),
  });
}
export function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      apiRequest<MessageData>("/api/auth/logout", { method: "POST" }),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authQueryKeys.me });
      queryClient.clear();
    },
  });
}
