import { VerifyEmailAction } from "@/components/auth/auth-token-actions";

export default async function VerifyEmailPage({
  searchParams,
}: PageProps<"/verify-email">) {
  const { token } = await searchParams;
  return (
    <VerifyEmailAction token={typeof token === "string" ? token : undefined} />
  );
}
