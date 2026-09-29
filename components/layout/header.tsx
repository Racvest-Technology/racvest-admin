"use client";

import * as React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 px-8 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-30">
      {/* Search Input */}
      <div className="relative w-96">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search Anything"
          className="w-full h-10 pl-10 pr-4 text-sm bg-gray-50 border border-[#E3E3DC] rounded-lg text-[#171713] placeholder:text-[#A7A79D] focus:outline-none focus:ring-2 focus:ring-[#014D21] focus:bg-white transition-all"
        />
      </div>

      {/* Admin Profile & Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          type="button"
          className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C83B2B] ring-2 ring-white"></span>
        </button>

        {/* User Badge */}
        <div className="flex items-center gap-3 pl-3 border-l border-[#E3E3DC] cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] font-semibold text-xs flex items-center justify-center border border-[#9BC7AD]">
            EM
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900">
              Emmanuel
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-transform" />
          </div>
        </div>
      </div>
    </header>
  );
}
