import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot password | Thriving in Tech",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
