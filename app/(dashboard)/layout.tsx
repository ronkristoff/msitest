"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { IconFolder, IconPlayerPlay, IconServer, IconSettings } from "@tabler/icons-react";

function RedirectToSignIn() {
  const router = useRouter();
  useEffect(() => {
    router.push("/sign-in");
  }, [router]);
  return (
    <div className="flex items-center justify-center h-full text-secondary text-sm">
      Redirecting to sign in...
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Unauthenticated>
        <RedirectToSignIn />
      </Unauthenticated>
      <AuthLoading>
        <div className="flex items-center justify-center h-full text-secondary text-sm">
          Loading...
        </div>
      </AuthLoading>
      <Authenticated>
        <div className="flex h-full">
          <aside className="w-60 shrink-0 border-r border-sidebar-border bg-sidebar-background flex flex-col">
            <Link href="/" className="h-14 flex items-center gap-2 px-4 hover:bg-sidebar-accent/50 transition-colors">
              <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0" />
              <span className="text-sm font-semibold text-sidebar-foreground">MSI Test</span>
            </Link>
            <nav className="flex-1 p-3 flex flex-col gap-1">
              <SidebarItem icon={IconFolder} label="Projects" href="/" active={pathname === "/" || pathname.startsWith("/projects")} />
              <SidebarItem icon={IconPlayerPlay} label="Test Runs" href="/runs" active={pathname.startsWith("/runs")} />
              <SidebarItem icon={IconServer} label="Workers" href="/workers" active={pathname.startsWith("/workers")} />
              <SidebarItem icon={IconSettings} label="Settings" href="/settings" active={pathname.startsWith("/settings")} />
            </nav>
            <div className="p-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-default text-sidebar-foreground/80 text-sm">
                <div className="w-5 h-5 rounded-full bg-sidebar-foreground/10" />
                <span className="truncate">User</span>
              </div>
            </div>
          </aside>

          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </Authenticated>
    </>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  href,
  active,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-2.5 text-left h-9 px-3 rounded-default text-sm transition-colors ${
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
      }`}
    >
      <Icon size={18} stroke={1.5} />
      {label}
    </Link>
  );
}
