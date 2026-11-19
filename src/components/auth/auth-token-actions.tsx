"use client";

import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  useResetPasswordMutation,
} from "@/actions/auth/auth.mutations";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "@/components/ui/toast";
import { ApiRequestError } from "@/lib/api-client";
import {
  forgotPasswordStepThreeSchema,
  type ForgotPasswordStepThreeValues,
} from "@/validation/auth.validation";


export function ResetPasswordAction({ token }: { token?: string }) {
  const router = useRouter();
  const reset = useResetPasswordMutation();
  const [complete, setComplete] = useState(false);
  const form = useForm<ForgotPasswordStepThreeValues>({
    resolver: zodResolver(forgotPasswordStepThreeSchema),
    defaultValues: { token: token, password: "", confirmPassword: "" },
    mode: "onTouched",
  });
  async function submit(values: ForgotPasswordStepThreeValues) {
    if (!token)
      return toast.add({
        type: "error",
        title: "Invalid reset link",
        description: "The link does not contain a reset token.",
      });
    try {
      const result = await reset.mutateAsync({
        token,
        password: values.password,
      });
      setComplete(true);
      toast.add({
        type: "success",
        title: "Password reset",
        description: result.message,
      });
      window.setTimeout(() => router.push("/login"), 1500);
    } catch (error) {
      toast.add({
        type: "error",
        title: "Unable to reset password",
        description:
          error instanceof ApiRequestError
            ? error.message
            : "Please try again.",
      });
    }
  }
  return (
    <Toaster>
      <section className="mx-auto w-full max-w-md">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            {complete ? "Password updated" : "Set a new password"}
          </h1>
          {complete ? (
            <Link href="/login" className="text-sm font-medium underline">
              Continue to sign in
            </Link>
          ) : (
            <form
              noValidate
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(submit)}
            >
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <PasswordField
                    label="New password"
                    field={field}
                    error={fieldState.error}
                    hint="Use 12-128 characters."
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <PasswordField
                    label="Confirm password"
                    field={field}
                    error={fieldState.error}
                  />
                )}
              />
              <Button type="submit" disabled={reset.isPending || !token}>
                {reset.isPending ? "Updating…" : "Reset password"}
              </Button>
            </form>
          )}
        </div>
      </section>
    </Toaster>
  );
}
