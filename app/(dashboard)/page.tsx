import * as React from "react";
import { Calendar, RefreshCw, Download, ChevronDown } from "lucide-react";
import {
  KpiHeroCards,
  AlertTickers,
  ChartsSection,
  LiveDeliveriesTable,
} from "@/features/dashboard";
import { Button } from "@/components/ui/button";
import { initialDashboardStats } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header / Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#171713] font-primary">
            Welcome Back, Emmanuel
          </h1>
          <p className="text-sm text-[#85857B] mt-1 font-body">
            Here&apos;s what&apos;s happening across the Racvest platform today.
          </p>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#484840] bg-white border border-[#E3E3DC] rounded-lg hover:bg-[#F7F7F3] shadow-xs transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#85857B]" />
            <span>Last 7 days</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
          </button>

          {/* Refresh Action */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#484840] bg-white border border-[#E3E3DC] rounded-lg hover:bg-[#F7F7F3] shadow-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#85857B]" />
            <span>Refresh</span>
          </button>

          {/* Download Report CTA */}
          <Button
            size="sm"
            className="gap-2 bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white shadow-xs text-xs h-9 px-4 rounded-lg font-semibold"
          >
            <Download className="w-3.5 h-3.5 text-white/90" />
            <span>Download report</span>
          </Button>
        </div>
      </div>

      {/* KPI Hero Cards (Total Users, Active Deliveries, Pending Verification) */}
      <KpiHeroCards stats={initialDashboardStats} />

      {/* Real-Time Operational Alert Tickers (Open Disputes, SOS Alerts, Support Tickets) */}
      <AlertTickers stats={initialDashboardStats} />

      {/* Visual Analytics Grid (Revenue, Delivery, User Growth, Status Donut) */}
      <ChartsSection />

      {/* Live Deliveries Data Table (TanStack Table + Nuqs, wrapped in Suspense) */}
      <React.Suspense
        fallback={
          <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-sm text-gray-400">
            Loading deliveries ledger...
          </div>
        }
      >
        <LiveDeliveriesTable />
      </React.Suspense>
    </div>
  );
}
