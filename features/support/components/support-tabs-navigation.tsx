"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SupportTabType } from "../types";

interface SupportTabsNavigationProps {
  activeTab: SupportTabType;
  onTabChange: (tab: SupportTabType) => void;
  ticketBadgeCount?: number;
  liveChatBadgeCount?: number;
  sosBadgeCount?: number;
}

export function SupportTabsNavigation({
  activeTab,
  onTabChange,
  ticketBadgeCount = 2,
  liveChatBadgeCount = 2,
  sosBadgeCount = 2,
}: SupportTabsNavigationProps) {
  const tabs: Array<{
    id: SupportTabType;
    label: string;
    badge?: number;
    badgeStyle?: string;
  }> = [
    { id: "overview", label: "Overview" },
    {
      id: "ticket",
      label: "Ticket",
      badge: ticketBadgeCount,
      badgeStyle: "bg-[#E0F2FE] text-[#0284C7]",
    },
    {
      id: "live_chat",
      label: "Live Chat",
      badge: liveChatBadgeCount,
      badgeStyle: "bg-[#DCFCE7] text-[#16A34A]",
    },
    {
      id: "sos_requests",
      label: "SOS Requests",
      badge: sosBadgeCount,
      badgeStyle: "bg-[#FEE2E2] text-[#DC2626]",
    },
    { id: "call_logs", label: "Call logs" },
    { id: "resolution_history", label: "Resolution History" },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap",
              isActive
                ? "bg-[#0B331E] text-white shadow-2xs font-semibold"
                : "text-[#66665D] hover:text-[#171713] hover:bg-black/5"
            )}
          >
            <span>{tab.label}</span>
            {typeof tab.badge === "number" && (
              <span
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold transition-colors",
                  isActive ? "bg-white/20 text-white" : tab.badgeStyle
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
