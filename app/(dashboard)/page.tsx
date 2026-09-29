import * as React from "react";
import {
  KpiHeroCards,
  AlertTickers,
  ChartsSection,
  LiveDeliveriesTable,
} from "@/features/dashboard";
import { PageHeader } from "@/components/shared";
import { initialDashboardStats } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* DRY Page Header matching Figma */}
      <PageHeader
        title="Welcome Back, Emmanuel"
        subtitle="Here's what's happening across the Racvest platform today."
        dateFilterLabel="Last 7days"
        downloadLabel="Download report"
      />

      {/* KPI Hero Cards: 3 Cards matching Figma Row 1 */}
      <KpiHeroCards stats={initialDashboardStats} />

      {/* Operational Alert Cards: 3 Cards matching Figma Row 2 */}
      <AlertTickers stats={initialDashboardStats} />

      {/* Visual Analytics Grid: Row 3 (Revenue & Delivery) + Row 4 (User Growth & Delivery Status) */}
      <ChartsSection />

      {/* Live Deliveries Ledger Table matching Figma */}
      <React.Suspense
        fallback={
          <div className="bg-white border border-[#E3E3DC] rounded-2xl p-8 text-center text-xs text-[#85857B]">
            Loading deliveries ledger...
          </div>
        }
      >
        <LiveDeliveriesTable />
      </React.Suspense>
    </div>
  );
}
