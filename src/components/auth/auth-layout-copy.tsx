"use client";

import { usePathname } from "next/navigation";

const pageCopy = {
  "/login": {
    tagline: "Keep your momentum.",
    title: "Pick up where you left off.",
    description: "Your next lesson is waiting. Keep building your skills and moving toward the goals that matter to you.",
  },
  "/signup": {
    tagline: "Learn. Connect. Thrive.",
    title: "Your next chapter starts here.",
    description: "Build practical skills, learn with a community, and take the next step in your tech journey.",
  },
  "/forgot-password": {
    tagline: "A fresh start.",
    title: "Get back to what inspires you.",
    description: "Reset your password and return to your learning journey. Your progress will be here when you get back.",
  },
};

export function AuthLayoutCopy() {
  const pathname = usePathname();
  const copy = pageCopy[pathname as keyof typeof pageCopy] ?? pageCopy["/login"];

  return (
    <div className="flex max-w-lg flex-col gap-4 pt-12 lg:pb-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/75">{copy.tagline}</p>
      <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">{copy.title}</h2>
      <p className="hidden max-w-md text-base leading-relaxed text-white/80 sm:block">{copy.description}</p>
    </div>
  );
}
