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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome Back, Emmanuel
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Here&apos;s what&apos;s happening across the Racvest platform today.
          </p>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-xs transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>Last 7 days</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {/* Refresh Action */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
            <span>Refresh</span>
          </button>

          {/* Download Report CTA */}
          <Button
            size="sm"
            className="gap-2 bg-[#0A3323] hover:bg-[#0E4430] text-white shadow-xs text-xs h-9 px-4 rounded-lg"
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
