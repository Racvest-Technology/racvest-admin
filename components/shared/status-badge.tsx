"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  status: string;
  label?: string;
  dot?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  label,
  dot = true,
  className,
}: StatusBadgeProps) {
  const normalized = status.toLowerCase().trim();

  // Solid dark green pill (Delivered, Accepted)
  const isSolidDarkGreen =
    normalized === "delivered" || normalized === "accepted";

  // Light green / Success (Active, Verified, Completed, Passed, Matched, In Progress, Medium)
  const isGreen =
    normalized === "active" ||
    normalized === "verified" ||
    normalized === "safe" ||
    normalized === "completed" ||
    normalized === "passed" ||
    normalized === "on" ||
    normalized === "matched" ||
    normalized === "in progress" ||
    normalized === "medium";

  // Blue / Info / Teal (In Transit, Picked Up, Waiting, New)
  const isBlue =
    normalized === "in transit" ||
    normalized === "picked up" ||
    normalized === "pickedup" ||
    normalized === "waiting" ||
    normalized === "waiting for customer" ||
    normalized === "new";

  // Amber / Warning (Pending, Review, Suspended, Open, Awaiting Decision)
  const isAmber =
    normalized === "pending" ||
    normalized === "suspended" ||
    normalized === "review" ||
    normalized === "flagged" ||
    normalized === "off" ||
    normalized === "open" ||
    normalized === "awaiting decision";

  // Red / Danger (High, Urgent, Banned, Cancelled, Disputed, Rejected, Escalated, Unmatched Request)
  const isRed =
    normalized === "high" ||
    normalized === "urgent" ||
    normalized === "banned" ||
    normalized === "cancelled" ||
    normalized === "disputed" ||
    normalized === "rejected" ||
    normalized === "high risk" ||
    normalized === "failed" ||
    normalized === "escalated" ||
    normalized === "unmatched request";

  // Neutral / Gray / Muted (Low, Resolved, Withdrawn, Inactive)
  const isNeutral =
    normalized === "low" ||
    normalized === "resolved" ||
    normalized === "resolved / closed" ||
    normalized === "withdrawn" ||
    normalized === "inactive";

  const colorStyles = isSolidDarkGreen
    ? "bg-[#062413] text-white border border-[#062413]"
    : isGreen
    ? "bg-[#ECFDF3] text-[#10B981] border border-[#D1FAE0]"
    : isBlue
    ? "bg-[#EFF6FA] text-[#0284C7] border border-[#DCECF3]"
    : isAmber
    ? "bg-[#FFF8E7] text-[#D97706] border border-[#FDECC8]"
    : isRed
    ? "bg-[#FEF2F0] text-[#EF4444] border-[#FDE0DB]"
    : isNeutral
    ? "bg-[#F7F7F3] text-[#85857B] border-[#E3E3DC]"
    : "bg-[#F7F7F3] text-[#85857B] border-[#E3E3DC]";

  const dotColor = isSolidDarkGreen
    ? "bg-[#29CC6A]"
    : isGreen
    ? "bg-[#10B981]"
    : isBlue
    ? "bg-[#0284C7]"
    : isAmber
    ? "bg-[#D97706]"
    : isRed
    ? "bg-[#EF4444]"
    : "bg-[#85857B]";

  const displayText = label || status;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold font-body shrink-0 border",
        colorStyles,
        className
      )}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColor)} />}
      <span>{displayText}</span>
    </span>
  );
}
