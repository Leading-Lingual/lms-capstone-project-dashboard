"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Toaster, toast } from "@/components/ui/toast";
import { loginSchema, type LoginValues } from "@/validation/auth.validation";

export function LoginForm() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  return (
    <Toaster>
        <section aria-labelledby="login-title" className="mx-auto w-full max-w-md">
          <div className="flex flex-col gap-7 text-card-foreground">
            <div className="flex flex-col gap-2 text-left">
              <h1 id="login-title" className="text-2xl font-semibold tracking-tight">Welcome back</h1>
              <p className="text-sm leading-relaxed text-muted-foreground">Sign in to continue your learning journey.</p>
            </div>

            <form noValidate className="flex flex-col gap-5" aria-busy={form.formState.isSubmitting} onSubmit={form.handleSubmit(() => {
              toast.add({ type: "success", title: "Submitted successfully", description: "Your sign-in form has been submitted." });
            })}>
              <Controller name="email" control={form.control} render={({ field, fieldState }) => (
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

              <Controller name="password" control={form.control} render={({ field, fieldState }) => (
                <PasswordField label="Password" field={field} error={fieldState.error} autoComplete="current-password" />
              )} />

              <Link href="/forgot-password" className="self-end text-sm font-medium underline-offset-4 hover:underline">Forgot password?</Link>
              <Button type="submit" disabled={form.formState.isSubmitting} className="h-11 w-full">
                {form.formState.isSubmitting ? "Signing in…" : "Sign in"}</Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">Don&apos;t have an account? <Link href="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">Create an account</Link></p>
          </div>
        </section>
    </Toaster>
  );
}
