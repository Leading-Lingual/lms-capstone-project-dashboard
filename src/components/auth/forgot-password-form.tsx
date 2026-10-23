"use client";

import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Toaster, toast } from "@/components/ui/toast";
import {
  forgotPasswordStepOneSchema, forgotPasswordStepTwoSchema, forgotPasswordStepThreeSchema,
  type ForgotPasswordStepOneValues, type ForgotPasswordStepTwoValues, type ForgotPasswordStepThreeValues,
} from "@/validation/auth.validation";

export function ForgotPasswordForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const emailForm = useForm<ForgotPasswordStepOneValues>({
    resolver: zodResolver(forgotPasswordStepOneSchema), defaultValues: { email: "" }, mode: "onTouched",
  });
  const codeForm = useForm<ForgotPasswordStepTwoValues>({
    resolver: zodResolver(forgotPasswordStepTwoSchema), defaultValues: { code: "" }, mode: "onTouched",
  });
  const passwordForm = useForm<ForgotPasswordStepThreeValues>({
    resolver: zodResolver(forgotPasswordStepThreeSchema), defaultValues: { password: "", confirmPassword: "" }, mode: "onTouched",
  });

  function goBack() {
    passwordForm.reset();
    codeForm.reset();
    if (step === 3) {
      setStep(2);
      requestAnimationFrame(() => codeForm.setFocus("code"));
    } else {
      setStep(1);
      requestAnimationFrame(() => emailForm.setFocus("email"));
    }
  }

  return (
    <Toaster>
        <section aria-labelledby="reset-title" className="mx-auto w-full max-w-md">
          <div className="flex flex-col gap-7 text-card-foreground">

            <div className="flex flex-col gap-2 text-left">
              <h1 id="reset-title" className="text-2xl font-semibold tracking-tight">{step === 1 ? "Forgot your password?" : step === 2 ? "Verify your email" : "Set a new password"}</h1>
              <p className="text-sm leading-relaxed text-muted-foreground">{step === 1 ? "Enter your email address to start resetting your password." : step === 2 ? <>Enter the 6-digit verification code for <span className="break-all font-medium text-foreground">{email}</span>.</> : "Choose a strong password to secure your account."}</p>
            </div>

            {step === 1 && (
              <form noValidate className="flex flex-col gap-5" onSubmit={emailForm.handleSubmit((values) => {
                setEmail(values.email);
                codeForm.reset();
                passwordForm.reset();
                setStep(2);
                requestAnimationFrame(() => codeForm.setFocus("code"));
              })}>
                <Controller name="email" control={emailForm.control} render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email address</FieldLabel>
                    <InputGroup className="h-11">
                      <InputGroupInput {...field} id="email" type="email" autoComplete="email" placeholder="you@example.com" required aria-invalid={fieldState.invalid} aria-describedby={fieldState.error ? "email-error" : undefined} />
                      <InputGroupAddon><Mail aria-hidden="true" /></InputGroupAddon>
                    </InputGroup>
                    {fieldState.error && <FieldError id="email-error" errors={[fieldState.error]} />}
                  </Field>
                )} />
                <Button type="submit" disabled={emailForm.formState.isSubmitting} className="h-11 w-full">Continue </Button>
              </form>
            )}

            {step === 2 && (
              <form noValidate className="flex flex-col gap-5" onSubmit={codeForm.handleSubmit(() => {
                setStep(3);
                requestAnimationFrame(() => passwordForm.setFocus("password"));
              })}>
                <Controller name="code" control={codeForm.control} render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="code">Verification code</FieldLabel>
                    <InputOTP {...field} id="code" maxLength={6} pattern="^[0-9]*$" inputMode="numeric" autoComplete="one-time-code" required aria-invalid={fieldState.invalid} aria-describedby={fieldState.error ? "code-error" : undefined} containerClassName="group/otp">
                      <InputOTPGroup>{Array.from({ length: 6 }, (_, index) => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup>
                    </InputOTP>
                    {fieldState.error && <FieldError id="code-error" errors={[fieldState.error]} />}
                  </Field>
                )} />
                <Button type="submit" disabled={codeForm.formState.isSubmitting} className="h-11 w-full">Continue</Button>
              </form>
            )}

            {step === 3 && (
              <form noValidate className="flex flex-col gap-5" onSubmit={passwordForm.handleSubmit(() => {
                toast.add({ type: "success", title: "Submitted successfully", description: "Your password reset form has been submitted." });
                passwordForm.reset();
              })}>
                <Controller name="password" control={passwordForm.control} render={({ field, fieldState }) => (
                  <PasswordField label="New password" field={{ ...field, onChange: (event) => {
                    field.onChange(event);
                    if (passwordForm.formState.touchedFields.confirmPassword || passwordForm.formState.isSubmitted) void passwordForm.trigger("confirmPassword");
                  } }} error={fieldState.error} hint="Use 8-128 characters with uppercase and lowercase letters and a number." />
                )} />
                <Controller name="confirmPassword" control={passwordForm.control} render={({ field, fieldState }) => (
                  <PasswordField label="Confirm password" field={field} error={fieldState.error} />
                )} />
                <Button type="submit" disabled={passwordForm.formState.isSubmitting} className="h-11 w-full">Reset password</Button>
              </form>
            )}

            {step > 1 && <Button type="button" variant="outline" onClick={goBack} className="h-11 w-full">{step === 2 ? "Change email address" : "Back to verification"}</Button>}
            <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-medium underline-offset-4 hover:underline"> Back to sign in</Link>
          </div>
        </section>
    </Toaster>
  );
}
