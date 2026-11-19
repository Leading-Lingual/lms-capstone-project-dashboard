"use client";

import { UserRound } from "lucide-react";
import { useCurrentUserQuery } from "@/actions/auth/auth.queries";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";

export function ProfileView() {
  const { data: user } = useCurrentUserQuery();
  return (
    <>
      <div className="mb-7">
        <p className="text-sm font-medium text-muted-foreground">
          Your account
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Profile</h1>
      </div>
      <DashboardPanel title="Account details" icon={UserRound}>
        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Name</dt>
            <dd className="mt-1 font-medium">{user?.name ?? "â€”"}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Email</dt>
            <dd className="mt-1 font-medium">{user?.email ?? "â€”"}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Role</dt>
            <dd className="mt-1 font-medium">{user?.role ?? "â€”"}</dd>
          </div>
        </dl>
      </DashboardPanel>
    </>
  );
}
