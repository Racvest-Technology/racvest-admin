import * as React from "react";
import { cn } from "@/lib/utils";

export type MetricCardVariant = "hero" | "standard" | "accent" | "compact";

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  variant?: MetricCardVariant;
  trend?: string;
  trendPositive?: boolean;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  variant = "standard",
  trend,
  trendPositive = true,
  className,
}: MetricCardProps) {
  // 1. Hero Variant (Solid Dark Green #01250F matching User Management Figma)
  if (variant === "hero") {
    return (
      <div
        className={cn(
          "bg-[#01250F] text-white p-5 rounded-2xl flex flex-col justify-between shadow-xs font-body",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">
            <Icon className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-xs text-white/70 font-medium">
            {title}
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold font-heading">
              {value}
            </span>
            {trend && (
              <span className="text-xs font-semibold text-[#69AA84]">
                {trend}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Accent Variant (Solid Orange #DC851F matching Figma)
  if (variant === "accent") {
    return (
      <div
        className={cn(
          "bg-[#DC851F] text-[#11110F] p-5 rounded-2xl flex items-center justify-between shadow-xs font-body",
          className
        )}
      >
        <div>
          <span className="text-xs text-[#11110F]/80 font-medium">
            {title}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl font-bold font-heading text-[#11110F]">
              {value}
            </h3>
            {trend && (
              <span className="text-xs font-semibold text-[#11110F]/80">
                {trend}
              </span>
            )}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-black/10 text-[#11110F] flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      </div>
    );
  }

  // 3. Compact Horizontal Variant (White card with icon on right)
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "bg-white border border-[#E3E3DC] p-5 rounded-2xl flex items-center justify-between shadow-2xs font-body",
          className
        )}
      >
        <div>
          <span className="text-xs text-[#85857B] font-medium">
            {title}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl font-bold text-[#171713] font-heading">
              {value}
            </h3>
            {trend && (
              <span
                className={cn(
                  "text-xs font-semibold",
                  trendPositive ? "text-[#014D21]" : "text-[#C83B2B]"
                )}
              >
                {trend}
              </span>
            )}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      </div>
    );
  }

  // 4. Standard Variant (White bordered card, icon on top left, stat on bottom)
  return (
    <div
      className={cn(
        "bg-white border border-[#E3E3DC] p-5 rounded-2xl flex flex-col justify-between shadow-2xs font-body",
        className
      )}
    >
      <div className="w-9 h-9 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </div>
      <div className="mt-4">
        <span className="text-xs text-[#85857B] font-medium">
          {title}
        </span>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-2xl font-bold text-[#171713] font-heading">
            {value}
          </span>
          {trend && (
            <span
              className={cn(
                "text-xs font-semibold",
                trendPositive ? "text-[#014D21]" : "text-[#C83B2B]"
              )}
            >
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
