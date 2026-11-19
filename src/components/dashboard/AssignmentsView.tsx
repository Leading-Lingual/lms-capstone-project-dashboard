"use client";

import { ClipboardList } from "lucide-react";
import { AssignmentList } from "@/components/dashboard/AssignmentList";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";

export function AssignmentsView() {
  return (
    <>
      <div className="mb-7">
        <p className="text-sm font-medium text-muted-foreground">
          Your learning
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Assignments
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Keep track of work from your courses.
        </p>
      </div>
      <DashboardPanel
        title={
          "Your assignments"
        }
        icon={ClipboardList}
      >
        <AssignmentList assignments={[]} />
      </DashboardPanel>
    </>
  );
}
