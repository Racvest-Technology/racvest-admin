"use client";

import * as React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/stores";

export function Header() {
  const user = useAuthStore((state) => state.user);

  const displayName = user?.name || "Emmanuel";
  const displayEmail = user?.email || "emmanuel.lewis@example.com";
  const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <header className="h-16 px-8 bg-white border-b border-[#E3E3DC] flex items-center justify-between sticky top-0 z-30">
      {/* Search Input matching Figma */}
      <div className="relative w-80">
        <input
          type="text"
          placeholder="Search Anything"
          className="w-full h-10 pl-4 pr-10 text-sm bg-[#F7F7F3] border border-transparent rounded-xl text-[#171713] placeholder:text-[#85857B] focus:outline-none focus:ring-2 focus:ring-[#014D21] focus:bg-white focus:border-[#014D21] transition-all font-body"
        />
        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#85857B] pointer-events-none" />
      </div>

      {/* Admin Profile & Actions matching Figma */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          type="button"
          className="w-9 h-9 rounded-full bg-[#F7F7F3] flex items-center justify-center text-[#484840] hover:text-[#171713] hover:bg-[#EBEBE4] transition-colors relative cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C83B2B] ring-2 ring-white"></span>
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 pl-2 py-1 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-[#014D21] text-white font-semibold text-xs flex items-center justify-center shrink-0 shadow-xs">
            {avatarInitial}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-[#171713] leading-tight font-body">
              {displayName}
            </span>
            <span className="text-[10px] text-[#85857B] leading-tight font-body">
              {displayEmail}
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#85857B] group-hover:text-[#171713] transition-transform ml-0.5" />
        </div>
      </div>
    </header>
  );
}
