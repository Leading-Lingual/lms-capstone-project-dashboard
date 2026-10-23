"use client";

import { useState } from "react";
import type { ControllerRenderProps, FieldError as FormFieldError, FieldPath, FieldValues } from "react-hook-form";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

type PasswordFieldProps<TValues extends FieldValues, TName extends FieldPath<TValues>> = {
  label: string;
  field: ControllerRenderProps<TValues, TName>;
  error?: FormFieldError;
  hint?: string;
  autoComplete?: "new-password" | "current-password";
};

export function PasswordField<TValues extends FieldValues, TName extends FieldPath<TValues>>({ label, field, error, hint, autoComplete = "new-password" }: PasswordFieldProps<TValues, TName>) {
  const [visible, setVisible] = useState(false);
  const id = field.name;

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <InputGroup className="h-11">
        <InputGroupInput {...field} placeholder="*****" id={id} type={visible ? "text" : "password"} autoComplete={autoComplete} required
          aria-invalid={!!error} aria-describedby={[hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined} />
        <InputGroupAddon><LockKeyhole aria-hidden="true" /></InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-sm" onClick={() => setVisible(!visible)}
            aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`} aria-pressed={visible}>
            {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {hint && <FieldDescription id={`${id}-hint`}>{hint}</FieldDescription>}
      {error && <FieldError id={`${id}-error`} errors={[error]} />}
    </Field>
  );
}
