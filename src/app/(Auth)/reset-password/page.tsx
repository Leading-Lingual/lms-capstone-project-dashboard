import { ResetPasswordAction } from "@/components/auth/auth-token-actions";
import { Suspense } from "react";

export default async function ResetPasswordPage({
  searchParams,
}: PageProps<"/reset-password">) {
  const { token } = await searchParams;
  return (
    <Suspense fallback={null}>
      <ResetPasswordAction
        token={typeof token === "string" ? token : undefined}
      />
    </Suspense>
  );
}
