"use client";

import * as React from "react";
import {
  TrendingUp,
  Package,
  CheckCircle2,
  Truck,
  Users,
  Plane,
} from "lucide-react";
import { DashboardStats } from "@/types/delivery";
import { MetricCard } from "@/components/shared";

interface KpiHeroCardsProps {
  stats: DashboardStats;
}

export function KpiHeroCards({ stats }: KpiHeroCardsProps) {
  return (
    <div className="space-y-4">
      {/* Row 1: Primary KPI Hero Cards (4 Columns matching User Management) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Revenue (Dark Green Hero) */}
        <MetricCard
          title="Total Revenue"
          value="₦48,250,000"
          icon={TrendingUp}
          variant="hero"
          trend="+14.8%"
        />

        {/* Card 2: Active Deliveries */}
        <MetricCard
          title="Active Deliveries"
          value={stats.activeDeliveries.toLocaleString()}
          icon={Package}
          variant="standard"
          trend={stats.activeDeliveriesTrend}
        />

        {/* Card 3: Delivered Today */}
        <MetricCard
          title="Delivered Today"
          value="184"
          icon={CheckCircle2}
          variant="standard"
          trend="+8.2%"
        />

        {/* Card 4: Active Couriers */}
        <MetricCard
          title="Active Couriers"
          value="1,420"
          icon={Truck}
          variant="standard"
          trend="+5.1%"
        />
      </div>

      {/* Row 2: Secondary Role KPI Cards (3 Columns matching User Management) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Senders"
          value="12,430"
          icon={Users}
          variant="compact"
          trend="+11.2%"
        />
        <MetricCard
          title="Total Travelers"
          value="6,240"
          icon={Plane}
          variant="compact"
          trend="+4.8%"
        />
        <MetricCard
          title="Total Couriers"
          value="3,820"
          icon={Users}
          variant="accent"
        />
      </div>
    </div>
  );
}
