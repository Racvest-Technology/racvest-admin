"use client";

import * as React from "react";
import { Users, Package, MessageSquareDashed } from "lucide-react";
import { DashboardStats } from "@/types/delivery";
import { MetricCard } from "@/components/shared";

interface KpiHeroCardsProps {
  stats: DashboardStats;
}

export function KpiHeroCards({ stats }: KpiHeroCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 1. Total User (Hero Dark Green #01250F) */}
      <MetricCard
        title="Total User"
        value={stats.totalUsers.toLocaleString()}
        icon={Users}
        variant="hero"
        trend={stats.totalUsersTrend}
      />

      {/* 2. Active Deliveries (Standard Card) */}
      <MetricCard
        title="Active Deliveries"
        value={stats.activeDeliveries.toLocaleString()}
        icon={Package}
        variant="standard"
        trend={stats.activeDeliveriesTrend}
        iconBgClassName="bg-[#E6F1EB]"
        iconColorClassName="text-[#014D21]"
      />

      {/* 3. Pending Verification (Standard Card with Orange Icon Circle) */}
      <MetricCard
        title="Pending Verification"
        value={stats.pendingVerification.toLocaleString()}
        icon={MessageSquareDashed}
        variant="standard"
        trend={stats.pendingVerificationTrend}
        iconBgClassName="bg-[#FFF4E5]"
        iconColorClassName="text-[#DC851F]"
      />
    </div>
  );
}
