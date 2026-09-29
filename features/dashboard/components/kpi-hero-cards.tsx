import * as React from "react";
import { Users, Package, FileCheck2, ArrowUpRight } from "lucide-react";
import { DashboardStats } from "@/types/delivery";

interface KpiHeroCardsProps {
  stats: DashboardStats;
}

export function KpiHeroCards({ stats }: KpiHeroCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Total Users - High-contrast Forest Green Hero Card */}
      <div className="bg-[#014D21] text-white rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/90">
            <Users className="w-5 h-5" />
          </div>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <ArrowUpRight className="w-3 h-3" />
            {stats.totalUsersTrend}
          </span>
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-emerald-100/70">Total User</p>
          <p className="text-3xl font-bold tracking-tight text-white mt-1 font-primary">
            {stats.totalUsers.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Active Deliveries */}
      <div className="bg-white border border-[#E3E3DC] rounded-xl p-6 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-lg bg-[#E6F1EB] flex items-center justify-center text-[#014D21]">
            <Package className="w-5 h-5" />
          </div>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#ECFDF3] text-[#15803D]">
            <ArrowUpRight className="w-3 h-3" />
            {stats.activeDeliveriesTrend}
          </span>
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-[#66665D]">Active Deliveries</p>
          <p className="text-3xl font-bold tracking-tight text-[#171713] mt-1 font-primary">
            {stats.activeDeliveries.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Pending Verification */}
      <div className="bg-white border border-[#E3E3DC] rounded-xl p-6 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-lg bg-[#FFF4E5] flex items-center justify-center text-[#DC851F]">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FFF4E5] text-[#DC851F]">
            <ArrowUpRight className="w-3 h-3" />
            {stats.pendingVerificationTrend}
          </span>
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-[#66665D]">Pending Verification</p>
          <p className="text-3xl font-bold tracking-tight text-[#171713] mt-1 font-primary">
            {stats.pendingVerification.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
