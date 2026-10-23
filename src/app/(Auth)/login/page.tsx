import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in | Thriving in Tech",
};

export default function LoginPage() {
  return <LoginForm />;
}
