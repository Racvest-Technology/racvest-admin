"use client";

import * as React from "react";
import { TicketStatusItem } from "../types";

interface TicketStatusBreakdownProps {
  statuses: TicketStatusItem[];
}

export function TicketStatusBreakdown({ statuses }: TicketStatusBreakdownProps) {
  return (
    <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div className="pb-3">
        <h3 className="text-sm font-bold text-[#171713] font-heading">
          Ticket Status Breakdown
        </h3>
      </div>

      {/* Status List with Progress Bars */}
      <div className="space-y-3.5 py-1">
        {statuses.map((item) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#66665D] font-medium font-body">
                {item.name}
              </span>
              <span className="text-[#171713] font-semibold font-body">
                {item.count} tickets ({item.percentage}%)
              </span>
            </div>

            {/* Progress track */}
            <div className="h-1.5 w-full bg-[#F0F0EB] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, item.percentage)}%`,
                  backgroundColor: item.barColor,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
