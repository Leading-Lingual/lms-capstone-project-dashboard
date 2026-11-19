"use client";

import { CalendarDays } from "lucide-react";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { LiveClassList } from "@/components/dashboard/LiveClassList";

export function LiveClassesView() {
  return (
    <>
      <div className="mb-7">
        <p className="text-sm font-medium text-muted-foreground">
          Your schedule
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Live classes
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          See upcoming sessions for your courses.
        </p>
      </div>
      <DashboardPanel title="Upcoming classes" icon={CalendarDays}>
        <LiveClassList classes={[]} />
      </DashboardPanel>
    </>
  );
}
