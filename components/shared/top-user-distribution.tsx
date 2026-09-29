"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CountryDistributionItem {
  code: string;
  name: string;
  count: string;
  pct: number;
}

export interface TopUserDistributionProps {
  title?: string;
  subtitle?: string;
  dropdownLabel?: string;
  data?: CountryDistributionItem[];
  className?: string;
}

const DEFAULT_DISTRIBUTION: CountryDistributionItem[] = [
  { code: "NG", name: "Nigeria", count: "24,820", pct: 90 },
  { code: "US", name: "United States", count: "12,430", pct: 52 },
  { code: "UK", name: "United Kingdom", count: "8,920", pct: 36 },
  { code: "CA", name: "Canada", count: "6,240", pct: 26 },
  { code: "+", name: "Other", count: "31,857", pct: 95 },
];

export function TopUserDistribution({
  title = "Top User Distribution",
  subtitle = "Where Racvest users are located",
  dropdownLabel = "All Users",
  data = DEFAULT_DISTRIBUTION,
  className,
}: TopUserDistributionProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs font-body",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div>
          <h3 className="text-base font-bold text-[#171713] font-heading">
            {title}
          </h3>
          <p className="text-xs text-[#85857B] mt-0.5 font-body">
            {subtitle}
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#EBEBE4] transition-colors cursor-pointer shadow-2xs font-body"
        >
          <span>{dropdownLabel}</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
        {/* World Map Container: Uses the exact Figma export asset with dark slate ocean & glowing telemetry */}
        <div className="lg:col-span-8 relative w-full aspect-[898/320] min-h-[240px] max-h-[340px] bg-[#16202A] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border border-[#1E2D3D]/50">
          <Image
            src="/images/world-distribution-map.png"
            alt="Racvest Global User Distribution Map"
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover rounded-2xl"
            priority
          />
        </div>

        {/* Right Column: Country Breakdown matching Figma exactly */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4 py-1">
          {data.map((item) => (
            <div key={item.name} className="space-y-1.5 font-body">
              {/* Row Header: Code, Name, Value */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#F0F0EB] text-[#484840] font-bold text-[10px] flex items-center justify-center shrink-0">
                    {item.code}
                  </span>
                  <span className="font-semibold text-[#171713] text-sm">
                    {item.name}
                  </span>
                </div>
                <span className="font-bold text-[#171713] text-sm">
                  {item.count}
                </span>
              </div>

              {/* Solid Green Progress Line matching Figma */}
              <div className="w-full h-1 bg-[#F0F0EB] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#014D21] rounded-full transition-all duration-500"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
