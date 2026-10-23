import Image from "next/image";
import Link from "next/link";
import { AuthLayoutCopy } from "@/components/auth/auth-layout-copy";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col bg-background lg:flex-row">
      <aside className="relative isolate flex min-h-64 flex-col justify-between overflow-hidden bg-stone-900 px-6 py-8 text-white sm:px-10 lg:sticky lg:top-0 lg:h-dvh lg:w-1/2 lg:shrink-0 lg:p-12 xl:p-16">
        <Image
          src="/auth_image.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="-z-20 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-black/65 via-black/25 to-black/85" />
        <Link href="/" className="w-fit text-lg font-semibold tracking-tight">Thriving in Tech</Link>
        <AuthLayoutCopy />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col justify-center px-6 py-10 sm:px-12 lg:px-10 lg:py-16 xl:px-20">
        {children}
      </div>
    </main>
  );
}
