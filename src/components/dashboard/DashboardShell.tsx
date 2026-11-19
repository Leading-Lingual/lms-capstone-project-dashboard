"use client";

import { useCurrentUserQuery } from "@/actions/auth/auth.queries";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { data: user } = useCurrentUserQuery();
  return (
    <div className=" bg-muted/40 md:flex overflow-hidden">
      <DashboardSidebar user={user} />
      <main className="mx-auto w-full  max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
