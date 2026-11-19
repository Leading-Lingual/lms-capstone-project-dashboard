import { ResetPasswordAction } from "@/components/auth/auth-token-actions";

export default async function ResetPasswordPage({
  searchParams,
}: PageProps<"/reset-password">) {
  const { token } = await searchParams;
  return (
    <ResetPasswordAction
      token={typeof token === "string" ? token : undefined}
    />
  );
}
