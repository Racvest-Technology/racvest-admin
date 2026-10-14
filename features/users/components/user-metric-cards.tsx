"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import {
  SlidersHorizontal,
  CheckCircle2,
  Truck,
  Star,
  Mail,
} from "lucide-react";

interface MetricItem {
  icon: LucideIcon;
  label: string;
  verifiedValue: string;
  unverifiedValue: string;
  /** If true, uses the accent orange card style */
  accent?: boolean;
  /** Grid column span override (e.g. "sm:col-span-2") */
  colSpan?: string;
}

const SENDER_METRICS: MetricItem[] = [
  { icon: SlidersHorizontal, label: "Item sent", verifiedValue: "142", unverifiedValue: "0" },
  { icon: CheckCircle2, label: "Delivery success", verifiedValue: "98.5%", unverifiedValue: "0%" },
  { icon: Truck, label: "Active Deliveries", verifiedValue: "3", unverifiedValue: "0" },
  { icon: Star, label: "Average Ratings", verifiedValue: "4.7", unverifiedValue: "0.0" },
  { icon: Mail, label: "Total spent", verifiedValue: "₦100,000", unverifiedValue: "₦0", accent: true, colSpan: "sm:col-span-2" },
];

const TRAVELER_COURIER_METRICS: MetricItem[] = [
  { icon: SlidersHorizontal, label: "Total Trips declared", verifiedValue: "142", unverifiedValue: "0" },
  { icon: CheckCircle2, label: "Delivery completion rate", verifiedValue: "97.4%", unverifiedValue: "0.0%" },
  { icon: SlidersHorizontal, label: "Total package delivered", verifiedValue: "612", unverifiedValue: "0" },
  { icon: Truck, label: "Active Deliveries", verifiedValue: "3", unverifiedValue: "0" },
  { icon: Star, label: "Average Ratings", verifiedValue: "4.7", unverifiedValue: "0.0" },
  { icon: Mail, label: "Total Earned", verifiedValue: "₦100,000", unverifiedValue: "₦0", accent: true },
];

interface UserMetricCardsProps {
  isSender: boolean;
  isVerified: boolean;
}

/**
 * Metric cards grid: 5 cards for senders, 6 cards for travelers/couriers.
 */
export function UserMetricCards({ isSender, isVerified }: UserMetricCardsProps) {
  const metrics = isSender ? SENDER_METRICS : TRAVELER_COURIER_METRICS;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 h-full">
      {metrics.map((m) => (
        <MetricCard
          key={m.label}
          icon={m.icon}
          label={m.label}
          value={isVerified ? m.verifiedValue : m.unverifiedValue}
          accent={m.accent}
          className={m.colSpan}
        />
      ))}
    </div>
  );
}

/* ─── Internal ─────────────────────────────── */

function MetricCard({
  icon: Icon,
  label,
  value,
  accent,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: boolean;
  className?: string;
}) {
  if (accent) {
    return (
      <div
        className={`bg-[#DC851F] text-[#11110F] p-4 rounded-2xl flex flex-col justify-between shadow-xs min-h-[110px] ${className ?? ""}`}
      >
        <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#11110F]" />
        </div>
        <div className="mt-3">
          <span className="text-xs text-[#11110F]/80 font-medium">{label}</span>
          <h3 className="text-2xl font-bold font-heading">{value}</h3>
        </div>
      </div>
    );
  }

  const isRating = label === "Average Ratings";
  return (
    <div
      className={`bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px] ${className ?? ""}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isRating
            ? "bg-[#FFF4E5] text-[#DC851F]"
            : "bg-[#E6F1EB] text-[#014D21]"
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="mt-3">
        <span className="text-xs text-[#85857B] font-medium">{label}</span>
        <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">
          {value}
        </h3>
      </div>
    </div>
  );
}
