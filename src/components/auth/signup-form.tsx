"use client";

import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import {
  useRegisterMutation,
  useResendVerificationMutation,
  useVerifyEmailMutation,
} from "@/actions/auth/auth.mutations";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Toaster, toast } from "@/components/ui/toast";
import { ApiRequestError } from "@/lib/api-client";
import {
  signupStepOneSchema,
  signupStepTwoSchema,
  type SignupStepOneValues,
  type SignupStepTwoValues,
} from "@/validation/auth.validation";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const register = useRegisterMutation();
  const verify = useVerifyEmailMutation();
  const resend = useResendVerificationMutation();
  const router = useRouter()
  const form = useForm<SignupStepOneValues>({
    resolver: zodResolver(signupStepOneSchema),
    defaultValues: { email: "", name: "", password: "", role: "STUDENT" },
    mode: "onTouched",
  });

  const verificationForm = useForm<SignupStepTwoValues>({
    resolver: zodResolver(signupStepTwoSchema),
    defaultValues: { email: "", otp: "" },
    mode: "onTouched",
  });

  async function submit(values: SignupStepOneValues) {
    try {
      await register.mutateAsync(values);
      setEmail(values.email);
      verificationForm.setValue("email", values.email)
      setSubmitted(true);
      setStep(2);
    } catch (error) {
      toast.add({
        type: "error",
        title: "Unable to create account",
        description:
          error instanceof ApiRequestError
            ? error.message
            : "Please try again.",
      });
    }
  }

  async function resendEmail() {
    try {
      const result = await resend.mutateAsync({ email });
      toast.add({
        type: "success",
        title: "Verification email sent",
        description: result.message,
      });
    } catch (error) {
      toast.add({
        type: "error",
        title: "Unable to resend email",
        description:
          error instanceof ApiRequestError
            ? error.message
            : "Please try again.",
      });
    }
  }

  async function verifyEmail(values: SignupStepTwoValues) {
    try {
      const result = await verify.mutateAsync({
        email,
        otp: values.otp,
      });

      toast.add({
        type: "success",
        title: "Email verified",
        description: result.message,
      });

      router.push("/dashboard")

    } catch (error) {
      toast.add({
        type: "error",
        title: "Unable to verify email",
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
        aria-labelledby="signup-title"
        className="mx-auto w-full max-w-md"
      >
        <div className="text-card-foreground">
          <div className="mb-7 flex flex-col gap-2 text-left">
            <h1
              id="signup-title"
              className="text-2xl font-semibold tracking-tight heading-general"
            >
              {step === 1 ? "Create your account" : "Verify your email"}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step === 1 ? (
                "Take the first step in your learning journey."
              ) : (
                <>
                  Enter the 6-digit verification code sent to{" "}
                  <span className="break-all font-medium text-foreground">
                    {email}
                  </span>
                  .
                </>
              )}
            </p>
          </div>

          {step === 2 ? (
            <div className="flex flex-col gap-4">
              {submitted ? (
                <form
                  className="flex flex-col gap-5"
                  onSubmit={verificationForm.handleSubmit(verifyEmail)}
                >
                  <Controller
                    name="otp"
                    control={verificationForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="verification-code">
                          Verification code
                        </FieldLabel>
                        <InputOTP
                          {...field}
                          id="verification-code"
                          maxLength={6}
                          pattern="^[0-9]*$"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          aria-invalid={fieldState.invalid}
                          aria-describedby={
                            fieldState.error
                              ? "verification-code-error"
                              : undefined
                          }
                        >
                          <InputOTPGroup>
                            {Array.from({ length: 6 }, (_, index) => (
                              <InputOTPSlot key={index} index={index} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                        {fieldState.error && (
                          <FieldError
                            id="verification-code-error"
                            errors={[fieldState.error]}
                          />
                        )}
                      </Field>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={verify.isPending}
                    className="h-11 w-full"
                  >
                    {verify.isPending ? "Verifying…" : "Verify email"}
                  </Button>
                </form>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Your account has been created. Enter the code sent to your
                  email to verify your address.
                </p>
              )}
              <Button
                type="button"
                variant="outline"
                disabled={resend.isPending}
                onClick={resendEmail}
                className="h-11 w-full"
              >
                {resend.isPending ? "Sending…" : "Resend verification code"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep(1)}
                className="h-11 w-full"
              >
                Back to account details
              </Button>
            </div>
          ) : (
            <form
              noValidate
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(submit)}
            >
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <InputGroup className="h-11">
                      <InputGroupInput
                        {...field}
                        id="name"
                        autoComplete="name"
                        placeholder="Name"
                        required
                        aria-invalid={fieldState.invalid}
                        aria-describedby={
                          fieldState.error ? "name-error" : undefined
                        }
                      />
                      <InputGroupAddon>
                        <User aria-hidden="true" />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.error && (
                      <FieldError id="name-error" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="role">Role</FieldLabel>
                    <select
                      {...field}
                      id="role"
                      required
                      aria-invalid={fieldState.invalid}
                      aria-describedby={
                        fieldState.error ? "role-error" : undefined
                      }
                      className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="" disabled>
                        Select your role
                      </option>
                      <option value="STUDENT">STUDENT</option>
                      <option value="LECTURER">LECTURER</option>
                    </select>
                    {fieldState.error && (
                      <FieldError id="role-error" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <PasswordField
                    label="Password"
                    field={field}
                    error={fieldState.error}
                    hint="Use 12-128 characters."
                  />
                )}
              />
              <Button
                type="submit"
                disabled={register.isPending}
                className="h-11 w-full"
              >
                {register.isPending ? "Creating account…" : "Continue"}
              </Button>
            </form>
          )}

          <p className="mt-7 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </Toaster>
  );
}
