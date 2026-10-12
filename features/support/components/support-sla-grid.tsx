"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { SlaSummaryItem } from "../types";

interface SupportSlaGridProps {
  metrics: SlaSummaryItem[];
}

export function SupportSlaGrid({ metrics }: SupportSlaGridProps) {
  const getCardStyles = (tone: SlaSummaryItem["tone"]) => {
    switch (tone) {
      case "success":
        return {
          container: "bg-[#ECFDF3] border-[#D1FAE0]",
          label: "text-[#166534]",
          value: "text-[#171713]",
        };
      case "warning":
        return {
          container: "bg-[#FFF8E7] border-[#FDECC8]",
          label: "text-[#92400E]",
          value: "text-[#171713]",
        };
      case "info":
        return {
          container: "bg-[#EFF6FA] border-[#DCECF3]",
          label: "text-[#194E63]",
          value: "text-[#171713]",
        };
      case "error":
        return {
          container: "bg-[#FEF2F0] border-[#FDE0DB]",
          label: "text-[#912018]",
          value: "text-[#C83B2B]",
        };
      default:
        return {
          container: "bg-white border-[#E3E3DC]",
          label: "text-[#66665D]",
          value: "text-[#171713]",
        };
    }
  };

  return (
    <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
      {/* Header matching Figma screenshot */}
      <div className="pb-3">
        <h3 className="text-sm font-bold text-[#171713] font-heading">
          Support SLA &amp; Performance Summary
        </h3>
      </div>

      {/* 2x2 Grid of SLA metric boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {metrics.map((item) => {
          const styles = getCardStyles(item.tone);

          return (
            <div
              key={item.id}
              className={cn(
                "border rounded-xl p-4 flex flex-col justify-between transition-all",
                styles.container
              )}
            >
              <span className={cn("text-xs font-medium font-body", styles.label)}>
                {item.label}
              </span>
              <div className="flex items-center gap-1.5 mt-2">
                <span className={cn("text-lg sm:text-xl font-bold font-heading", styles.value)}>
                  {item.value}
                </span>
                {item.starIcon && (
                  <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
