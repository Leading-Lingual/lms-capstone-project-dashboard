"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  UserRound,
  ClipboardList,
} from "lucide-react";
import { useLogoutMutation } from "@/actions/auth/auth.mutations";
import { Button } from "@/components/ui/button";
import type { SafeUser } from "@/types/auth.types";

const navigation = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/assignments", label: "Assignments", icon: ClipboardList },
  { href: "/live-classes", label: "Live classes", icon: CalendarDays },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export function DashboardSidebar({ user }: { user?: SafeUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useLogoutMutation();

  async function signOut() {
    try {
      await logout.mutateAsync();
    } finally {
      router.push("/login");
    }
  }

  return (
    <aside className="border-b border-border bg-card h-fit md:h-dvh md:flex md:w-64 md:flex-col md:border-r md:border-b-0">
      <Link
        href="/dashboard"
        className="flex items-center gap-3 px-5 py-5 font-semibold tracking-tight text-foreground"
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <GraduationCap className="size-5" aria-hidden="true" />
        </span>
        <span>Thriving in Tech</span>
      </Link>

      <nav
        aria-label="Main navigation"
        className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:gap-1 md:px-3 md:py-5"
      >
        {navigation.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(`${href}/`));
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="hidden border-t border-border p-4 md:block">
        <p className="truncate text-sm font-medium text-foreground">
          {user?.name ?? "Your account"}
        </p>
        <p className="mb-3 truncate text-xs text-muted-foreground">
          {user?.email ?? ""}
        </p>
        <Button
          type="button"
          variant="ghost"
          className="w-full justify-start"
          onClick={signOut}
          disabled={logout.isPending}
        >
          <LogOut aria-hidden="true" /> Sign out
        </Button>
      </div>
      <div className="flex items-center justify-between border-t border-border px-4 py-2 md:hidden">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {user?.name ?? "Your account"}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {user?.email ?? ""}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Sign out"
          onClick={signOut}
          disabled={logout.isPending}
        >
          <LogOut aria-hidden="true" />
        </Button>
      </div>
    </aside>
  );
}
