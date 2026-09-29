"use client";

import * as React from "react";
import { UserTab } from "../types";
import { cn } from "@/lib/utils";

interface UserTabNavProps {
  currentTab: UserTab;
  onTabChange: (tab: UserTab) => void;
}

const TABS: { id: UserTab; label: string }[] = [
  { id: "all", label: "All Users" },
  { id: "sender", label: "Sender" },
  { id: "traveler", label: "Traveler" },
  { id: "courier", label: "Courier" },
];

export function UserTabNav({ currentTab, onTabChange }: UserTabNavProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E3E3DC] p-2 flex items-center gap-1.5 w-full shadow-2xs">
      {TABS.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer font-body",
              isActive
                ? "bg-[#014D21] text-white shadow-xs"
                : "text-[#66665D] hover:text-[#171713] hover:bg-[#F7F7F3]"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
