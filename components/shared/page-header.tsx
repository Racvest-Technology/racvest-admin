"use client";

import * as React from "react";
import { Calendar, RefreshCw, Download, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  dateFilterLabel?: string;
  showDateFilter?: boolean;
  onDateFilterClick?: () => void;
  showRefresh?: boolean;
  onRefresh?: () => void;
  showDownloadReport?: boolean;
  onDownloadReport?: () => void;
  downloadLabel?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  className,
  dateFilterLabel = "Last 7days",
  showDateFilter = true,
  onDateFilterClick,
  showRefresh = true,
  onRefresh,
  showDownloadReport = true,
  onDownloadReport,
  downloadLabel = "Download report",
  children,
}: PageHeaderProps) {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (onRefresh) onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 font-body",
        className
      )}
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#171713] font-heading">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-[#85857B] mt-0.5 font-body">
            {subtitle}
          </p>
        )}
      </div>

      {/* Global Actions Cluster */}
      <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
        {children}

        {/* Date Filter Dropdown */}
        {showDateFilter && (
          <button
            type="button"
            onClick={onDateFilterClick}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs font-body"
          >
            <Calendar className="w-4 h-4 text-[#85857B]" />
            <span>{dateFilterLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
          </button>
        )}

        {/* Refresh Action Button */}
        {showRefresh && (
          <button
            type="button"
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs font-body"
          >
            <RefreshCw
              className={cn(
                "w-4 h-4 text-[#85857B] transition-transform",
                isRefreshing && "animate-spin text-[#014D21]"
              )}
            />
            <span>Refresh</span>
          </button>
        )}

        {/* Download Report Button */}
        {showDownloadReport && (
          <button
            type="button"
            onClick={onDownloadReport}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer font-body"
          >
            <Download className="w-4 h-4" />
            <span>{downloadLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}
