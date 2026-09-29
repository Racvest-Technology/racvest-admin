import * as React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F7F7F3]">
      {/* Sidebar */}
      <React.Suspense
        fallback={
          <aside className="shrink-0 bg-white border-r border-[#E3E3DC] w-[264px] h-screen sticky top-0" />
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
