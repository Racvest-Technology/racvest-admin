"use client";

import * as React from "react";
import { Calendar, RefreshCw, Download, ChevronDown } from "lucide-react";
import { UserTab } from "../types";

interface UserManagementHeaderProps {
  currentTab: UserTab;
  onRefresh?: () => void;
}

const titles: Record<UserTab, { title: string; subtitle: string }> = {
  all: {
    title: "User Management",
    subtitle: "Manage user accounts, monitor activity, verify identities, and oversee them.",
  },
  sender: {
    title: "Sender",
    subtitle: "Manage sender accounts, monitor activity, verify identities, and oversee Senders.",
  },
  traveler: {
    title: "Traveler",
    subtitle: "Manage traveler accounts, monitor activity, verify identities, and oversee travelers.",
  },
  courier: {
    title: "Courier",
    subtitle: "Manage user accounts, monitor activity, verify identities, and oversee Couriers.",
  },
};

export function UserManagementHeader({
  currentTab,
  onRefresh,
}: UserManagementHeaderProps) {
  const { title, subtitle } = titles[currentTab];
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (onRefresh) onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#171713] font-heading">
          {title}
        </h1>
        <p className="text-sm text-[#85857B] mt-0.5 font-body">
          {subtitle}
        </p>
      </div>

      {/* Action Buttons matching Figma */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Date Filter Dropdown */}
        <button
          type="button"
          className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs font-body"
        >
          <Calendar className="w-4 h-4 text-[#85857B]" />
          <span>Last 7days</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
        </button>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs font-body"
        >
          <RefreshCw
            className={`w-4 h-4 text-[#85857B] transition-transform ${
              isRefreshing ? "animate-spin text-[#014D21]" : ""
            }`}
          />
          <span>Refresh</span>
        </button>

        {/* Download Report Button */}
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer font-body"
        >
          <Download className="w-4 h-4" />
          <span>Download report</span>
        </button>
      </div>
    </div>
  );
}
