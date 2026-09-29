import * as React from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AttentionItem {
  label: string;
  count: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color?: "amber" | "red" | "green";
  onClick?: () => void;
}

export interface NeedsAttentionBarProps {
  title?: string;
  subtitle?: string;
  items: AttentionItem[];
  actionLabel?: string;
  onActionClick?: () => void;
  className?: string;
}

export function NeedsAttentionBar({
  title = "Needs Attention",
  subtitle = "Items needing review",
  items,
  actionLabel = "Review queue",
  onActionClick,
  className,
}: NeedsAttentionBarProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E3E3DC] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs font-body",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-6">
        {/* Main Badge */}
        <div className="flex items-center gap-3 pr-4 border-r border-[#E3E3DC]">
          <div className="w-9 h-9 rounded-full bg-[#FFF8E7] text-[#DC851F] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#171713] font-heading">
              {title}
            </h4>
            <p className="text-[11px] text-[#85857B] font-body">{subtitle}</p>
          </div>
        </div>

        {/* Attention Items Ticker */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isRed = item.color === "red";
          const isGreen = item.color === "green";

          return (
            <button
              key={`${item.label}-${idx}`}
              type="button"
              onClick={item.onClick}
              className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity cursor-pointer group"
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                  isRed
                    ? "bg-[#FEF2F0] text-[#C83B2B]"
                    : isGreen
                    ? "bg-[#E6F1EB] text-[#014D21]"
                    : "bg-[#FFF8E7] text-[#DC851F]"
                )}
              >
                <Icon className="w-3 h-3" />
              </div>
              <span className="text-[#85857B] font-medium font-body">
                {item.label}
              </span>
              <span className="font-bold text-[#171713]">{item.count}</span>
              <ArrowRight className="w-3 h-3 text-[#85857B] group-hover:translate-x-0.5 transition-transform" />
            </button>
          );
        })}
      </div>

      {/* Review CTA Button */}
      {actionLabel && (
        <button
          type="button"
          onClick={onActionClick}
          className="flex items-center gap-2 px-4 py-2 border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shrink-0 font-body shadow-2xs"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
