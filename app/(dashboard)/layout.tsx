import * as React from "react";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { AuthSessionSync, getServerAuthSession } from "@/features/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, user } = await getServerAuthSession();

  if (!accessToken) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#F7F7F3]">
      <AuthSessionSync serverUser={user} accessToken={accessToken} />

      {/* Sidebar */}
      <React.Suspense
        fallback={
          <aside className="shrink-0 bg-[#03170A] border-r border-[#0D2915] w-[260px] h-screen sticky top-0" />
        }
      >
        <Sidebar />
      </React.Suspense>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
