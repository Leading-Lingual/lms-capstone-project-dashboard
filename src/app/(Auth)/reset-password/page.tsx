import { ResetPasswordAction } from "@/components/auth/auth-token-actions";
import { Suspense, use } from "react";

function ResetPasswordContent({
  searchParams,
}: PageProps<"/reset-password">) {
  const { token } = use(searchParams);
  return (
    <ResetPasswordAction token={typeof token === "string" ? token : undefined} />
  );
}

export default function ResetPasswordPage(props: PageProps<"/reset-password">) {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent {...props} />
    </Suspense>
  );
}
