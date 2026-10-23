"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field" role="group" className={cn("flex flex-col gap-2 data-[invalid=true]:text-destructive", className)} {...props} />;
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return <label data-slot="field-label" className={cn("text-sm font-medium", className)} {...props} />;
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="field-description" className={cn("text-xs leading-relaxed text-muted-foreground", className)} {...props} />;
}

function FieldError({ className, children, errors, ...props }: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const messages = [...new Set(errors?.map((error) => error?.message).filter(Boolean))];
  const content = children ?? (messages.length === 1 ? messages[0] : messages.length > 1 ? <ul className="ml-4 list-disc">{messages.map((message) => <li key={message}>{message}</li>)}</ul> : null);
  if (!content) return null;
  return <div data-slot="field-error" role="alert" className={cn("text-sm text-destructive", className)} {...props}>{content}</div>;
}

export { Field, FieldLabel, FieldDescription, FieldError };
