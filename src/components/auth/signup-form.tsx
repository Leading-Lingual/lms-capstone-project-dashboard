"use client";

import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Toaster, toast } from "@/components/ui/toast";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { PasswordField } from "@/components/auth/password-field";
import { signupStepOneSchema, signupStepTwoSchema, type SignupStepOneValues, type SignupStepTwoValues } from "@/validation/auth.validation";

export function SignupForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const account = useForm<SignupStepOneValues>({
    resolver: zodResolver(signupStepOneSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
    mode: "onTouched",
  });
  const verification = useForm<SignupStepTwoValues>({
    resolver: zodResolver(signupStepTwoSchema),
    defaultValues: { code: "" },
    mode: "onTouched",
  });

  function goBack() {
    setStep(1);
    verification.reset();
    requestAnimationFrame(() => account.setFocus("email"));
  }

  return (
    <Toaster>
        <section aria-labelledby="signup-title" className="mx-auto w-full max-w-md">
          <div className="text-card-foreground">
  
            <div className="mb-7 flex flex-col gap-2 text-left">
              <h1 id="signup-title" className="text-2xl font-semibold tracking-tight">{step === 1 ? "Create your account" : "Verify your email"}</h1>
              <p className="text-sm leading-relaxed text-muted-foreground">{step === 1 ? "Take the first step in your learning journey." : <>Enter the 6-digit verification code for <span className="break-all font-medium text-foreground">{email}</span>.</>}</p>
            </div>
  
            {step === 1 ? (
              <form noValidate className="flex flex-col gap-5" onSubmit={account.handleSubmit((values) => {
                setEmail(values.email);
                verification.reset();
                setStep(2);
                requestAnimationFrame(() => verification.setFocus("code"));
              })}>
                <Controller name="email" control={account.control} render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email address</FieldLabel>
                    <InputGroup className="h-11">
                      <InputGroupInput {...field} id="email" type="email" autoComplete="email" placeholder="you@example.com" required
                        aria-invalid={fieldState.invalid} aria-describedby={fieldState.error ? "email-error" : undefined} />
                      <InputGroupAddon><Mail aria-hidden="true" /></InputGroupAddon>
                    </InputGroup>
                    {fieldState.error && <FieldError id="email-error" errors={[fieldState.error]} />}
                  </Field>
                )} />
  
                <Controller name="password" control={account.control} render={({ field, fieldState }) => (
                  <PasswordField label="Password" field={{ ...field, onChange: (event) => {
                    field.onChange(event);
                    if (account.formState.touchedFields.confirmPassword || account.formState.isSubmitted) void account.trigger("confirmPassword");
                  } }} error={fieldState.error}/>
                )} />
                <Controller name="confirmPassword" control={account.control} render={({ field, fieldState }) => (
                  <PasswordField label="Confirm password" field={field} error={fieldState.error} />
                )} />
  
                <Button type="submit" disabled={account.formState.isSubmitting} className="h-11 w-full">Continue </Button>
              </form>
            ) : (
              <form  onSubmit={verification.handleSubmit(() => {
                toast.add({ type: "success", title: "Submitted successfully", description: "Your signup form has been submitted." });
              })}>
                <Controller name="code" control={verification.control} render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="code">Verification code</FieldLabel>
                    <InputOTP {...field} id="code" maxLength={6} pattern="^[0-9]*$" inputMode="numeric" autoComplete="one-time-code" required
                      aria-invalid={fieldState.invalid} aria-describedby={fieldState.error ? "code-error" : undefined}
                      containerClassName="group/otp">
                      <InputOTPGroup>
                        {Array.from({ length: 6 }, (_, index) => <InputOTPSlot key={index} index={index} />)}
                      </InputOTPGroup>
                    </InputOTP>
                    {fieldState.error && <FieldError id="code-error" errors={[fieldState.error]} />}
                  </Field>
                )} />
                <Button type="submit" disabled={verification.formState.isSubmitting} className="h-11 w-full">Verify email</Button>
                <Button type="button" variant="outline" onClick={goBack} className="h-11 w-full">Back to account details</Button>
              </form>
            )}
  
            <p className="mt-7 text-center text-sm text-muted-foreground">Already have an account? <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">Sign in</Link></p>
          </div>
        </section>
    </Toaster>
  );
}
