"use client";

import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForgotPasswordMutation } from "@/actions/auth/auth.mutations";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Toaster, toast } from "@/components/ui/toast";
import { ApiRequestError } from "@/lib/api-client";
import {
  forgotPasswordStepOneSchema,
  type ForgotPasswordStepOneValues,
} from "@/validation/auth.validation";

export function ForgotPasswordForm() {
  const [submittedEmail, setSubmittedEmail] = useState("");
  const request = useForgotPasswordMutation();
  const form = useForm<ForgotPasswordStepOneValues>({
    resolver: zodResolver(forgotPasswordStepOneSchema),
    defaultValues: { email: "" },
    mode: "onTouched",
  });

  async function submit(values: ForgotPasswordStepOneValues) {
    try {
      await request.mutateAsync(values);
      setSubmittedEmail(values.email);
    } catch (error) {
      toast.add({
        type: "error",
        title: "Unable to request password reset",
        description:
          error instanceof ApiRequestError
            ? error.message
            : "Please try again.",
      });
    }
  }

  return (
    <Toaster>
      <section
        aria-labelledby="reset-title"
        className="mx-auto w-full max-w-md"
      >
        <div className="flex flex-col gap-7 text-card-foreground">
          <div className="flex flex-col gap-2 text-left">
            <h1
              id="reset-title"
              className="text-2xl font-semibold tracking-tight heading-general"
            >
              {submittedEmail ? "Check your email" : "Forgot your password?"}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {submittedEmail ? (
                <>
                  If an account exists for{" "}
                  <span className="break-all font-medium text-foreground">
                    {submittedEmail}
                  </span>
                  , we sent a password reset link.
                </>
              ) : (
                "Enter your email address to receive a password reset link."
              )}
            </p>
          </div>
          {!submittedEmail ? (
            <form
              noValidate
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(submit)}
            >
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email address</FieldLabel>
                    <InputGroup className="h-11">
                      <InputGroupInput
                        {...field}
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                        aria-invalid={fieldState.invalid}
                        aria-describedby={
                          fieldState.error ? "email-error" : undefined
                        }
                      />
                      <InputGroupAddon>
                        <Mail aria-hidden="true" />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.error && (
                      <FieldError
                        id="email-error"
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />
              <Button
                type="submit"
                disabled={request.isPending}
                className="h-11 w-full"
              >
                {request.isPending ? "Sending…" : "Send reset link"}
              </Button>
            </form>
          ) : (
            <p className="text-sm text-muted-foreground">
              Use the link in the email to choose a new password. You can close
              this page after opening your inbox.
            </p>
          )}
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
          >
            Back to sign in
          </Link>
        </div>
      </section>
    </Toaster>
  );
}
