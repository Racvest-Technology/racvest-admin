"use client";

import * as React from "react";
import { AlertTriangle, Flame, Clock, Headphones } from "lucide-react";
import { DashboardStats } from "@/types/delivery";
import { NeedsAttentionBar } from "@/components/shared";

interface AlertTickersProps {
  stats: DashboardStats;
}

export function AlertTickers({ stats }: AlertTickersProps) {
  const totalAlerts =
    stats.openDisputes +
    stats.sosAlerts +
    stats.pendingVerification +
    stats.supportTickets;

  return (
    <NeedsAttentionBar
      title="Operational Alerts"
      subtitle={`${totalAlerts} need attention`}
      actionLabel="Dispatch queue"
      items={[
        {
          label: "Open Disputes",
          count: stats.openDisputes,
          icon: AlertTriangle,
          color: "red",
        },
        {
          label: "SOS Alerts",
          count: stats.sosAlerts,
          icon: Flame,
          color: "red",
        },
        {
          label: "Pending Verification",
          count: stats.pendingVerification,
          icon: Clock,
          color: "amber",
        },
        {
          label: "Support Tickets",
          count: stats.supportTickets,
          icon: Headphones,
          color: "amber",
        },
      ]}
    />
  );
}
