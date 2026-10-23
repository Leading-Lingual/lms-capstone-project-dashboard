"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "@/lib/utils";

function InputOTP({ className, containerClassName, ...props }: React.ComponentProps<typeof OTPInput>) {
  return <OTPInput data-slot="input-otp" containerClassName={cn("flex w-full items-center has-disabled:opacity-50", containerClassName)} className={cn("disabled:cursor-not-allowed", className)} {...props} />;
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="input-otp-group" className={cn("grid w-full grid-cols-6 gap-1.5 sm:gap-3", className)} {...props} />;
}

function InputOTPSlot({ index, className, ...props }: React.ComponentProps<"div"> & { index: number }) {
  const context = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = context.slots[index];

  return (
    <div data-slot="input-otp-slot" data-active={isActive} aria-hidden="true"
      className={cn("relative flex aspect-square min-w-0 items-center justify-center rounded-lg border border-input bg-background text-lg font-medium shadow-xs transition-all group-has-[[aria-invalid=true]]/otp:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-3 data-[active=true]:ring-ring/50 sm:text-xl", className)} {...props}>
      {char}
      {hasFakeCaret && <div className="pointer-events-none absolute inset-0 flex items-center justify-center"><div className="h-5 w-px animate-pulse bg-foreground" /></div>}
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot };
