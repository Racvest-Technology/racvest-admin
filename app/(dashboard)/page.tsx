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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* DRY Page Header matching User Management lead example */}
      <PageHeader
        title="Dashboard"
        subtitle="Real-time dispatch telemetry, active deliveries, and platform operations overview."
        dateFilterLabel="Last 7days"
        downloadLabel="Download report"
      />

      {/* KPI Hero Cards: 4 Hero cards in Row 1 + 3 Role cards in Row 2 */}
      <KpiHeroCards stats={initialDashboardStats} />

      {/* Operational Alerts Ticker Bar (DRY NeedsAttentionBar) */}
      <AlertTickers stats={initialDashboardStats} />

      {/* Visual Analytics Grid (Delivery Volume Bar Chart + Status Donut + Corridors Map) */}
      <ChartsSection />

      {/* Live Deliveries Ledger Table (TanStack Table + Nuqs, wrapped in Suspense) */}
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
