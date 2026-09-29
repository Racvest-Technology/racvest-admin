"use client";

import * as React from "react";
import { AlertTriangle, Siren, Headphones } from "lucide-react";
import { DashboardStats } from "@/types/delivery";
import { MetricCard } from "@/components/shared";

interface AlertTickersProps {
  stats: DashboardStats;
}

export function AlertTickers({ stats }: AlertTickersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 1. Open Disputes */}
      <MetricCard
        title="Open Disputes"
        value={stats.openDisputes}
        icon={AlertTriangle}
        variant="compact"
        iconBgClassName="bg-[#FFF4E5]"
        iconColorClassName="text-[#DC851F]"
      />

      {/* 2. SOS Alerts */}
      <MetricCard
        title="SOS Alerts"
        value={stats.sosAlerts}
        icon={Siren}
        variant="compact"
        iconBgClassName="bg-[#FEF2F0]"
        iconColorClassName="text-[#C83B2B]"
      />

      {/* 3. Support Ticket */}
      <MetricCard
        title="Support Ticket"
        value={stats.supportTickets}
        icon={Headphones}
        variant="compact"
        iconBgClassName="bg-[#EFF6FA]"
        iconColorClassName="text-[#277A9E]"
      />
    </div>
  );
}
