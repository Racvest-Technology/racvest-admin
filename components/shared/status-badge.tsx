"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  status: string;
  dot?: boolean;
  className?: string;
}

export function StatusBadge({ status, dot = true, className }: StatusBadgeProps) {
  const normalized = status.toLowerCase().trim();

  // Delivered: In Figma, it has a distinct solid dark green pill or high-contrast green
  const isDelivered = normalized === "delivered";

  // Active / Verified / Safe / Completed
  const isGreen =
    normalized === "active" ||
    normalized === "verified" ||
    normalized === "safe" ||
    normalized === "completed" ||
    normalized === "passed" ||
    normalized === "on";

  // Blue/Teal: In Transit, Picked Up
  const isTeal =
    normalized === "in transit" ||
    normalized === "picked up" ||
    normalized === "pickedup";

  // Amber / Warning / Pending / Suspended
  const isAmber =
    normalized === "pending" ||
    normalized === "suspended" ||
    normalized === "review" ||
    normalized === "in progress" ||
    normalized === "flagged" ||
    normalized === "off";

  // Red / Error / Banned / Cancelled / Disputed / Rejected
  const isRed =
    normalized === "banned" ||
    normalized === "cancelled" ||
    normalized === "disputed" ||
    normalized === "rejected" ||
    normalized === "high risk" ||
    normalized === "failed";

  // Purple / Inactive
  const isPurple = normalized === "inactive";

  const colorStyles = isDelivered
    ? "bg-[#01250F] text-white"
    : isGreen
    ? "bg-[#E6F1EB] text-[#014D21]"
    : normalized === "in transit"
    ? "bg-[#E6F1EB] text-[#014D21] border border-[#9BC7AD]"
    : isTeal
    ? "bg-[#EFF6FA] text-[#277A9E]"
    : isAmber
    ? "bg-[#FFF4E5] text-[#DC851F]"
    : isRed
    ? "bg-[#FEF2F0] text-[#C83B2B]"
    : isPurple
    ? "bg-[#F3E8FF] text-[#7E22CE]"
    : "bg-[#F7F7F3] text-[#85857B]";

  const dotColor = isDelivered
    ? "bg-[#29CC6A]"
    : isGreen || normalized === "in transit"
    ? "bg-[#014D21]"
    : isTeal
    ? "bg-[#277A9E]"
    : isAmber
    ? "bg-[#DC851F]"
    : isRed
    ? "bg-[#C83B2B]"
    : isPurple
    ? "bg-[#7E22CE]"
    : "bg-[#85857B]";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold font-body shrink-0",
        colorStyles,
        className
      )}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColor)} />}
      <span className="capitalize">{status}</span>
    </span>
  );
}
