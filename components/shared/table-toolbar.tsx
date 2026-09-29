"use client";

import * as React from "react";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterSelectConfig {
  id: string;
  value: string;
  options: FilterOption[];
  onChange: (val: string) => void;
  ariaLabel?: string;
}

export interface TableToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  selectFilters?: FilterSelectConfig[];
  buttons?: Array<{
    label: string;
    onClick?: () => void;
    icon?: React.ComponentType<{ className?: string }>;
    hasDropdown?: boolean;
    active?: boolean;
  }>;
  rightActions?: React.ReactNode;
  className?: string;
}

export function TableToolbar({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search Anything",
  selectFilters = [],
  buttons = [],
  rightActions,
  className,
}: TableToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 font-body",
        className
      )}
    >
      {/* Left: Filter Controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Dynamic Select Dropdowns */}
        {selectFilters.map((filter) => (
          <div key={filter.id} className="relative">
            <select
              value={filter.value}
              aria-label={filter.ariaLabel || filter.id}
              onChange={(e) => filter.onChange(e.target.value)}
              className="appearance-none flex items-center gap-2 pl-3.5 pr-8 py-2 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#014D21]"
            >
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        ))}

        {/* Action/Dropdown Buttons */}
        {buttons.map((btn, idx) => {
          const Icon = btn.icon;
          return (
            <button
              key={`${btn.label}-${idx}`}
              type="button"
              onClick={btn.onClick}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-2xs",
                btn.active
                  ? "bg-[#014D21] text-white border border-[#014D21]"
                  : "bg-white border border-[#E3E3DC] text-[#171713] hover:bg-[#F7F7F3]"
              )}
            >
              {Icon && <Icon className="w-3.5 h-3.5 text-[#85857B]" />}
              <span>{btn.label}</span>
              {btn.hasDropdown && (
                <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Search Input + Optional Action Buttons */}
      <div className="flex items-center gap-3">
        <div className="relative w-full lg:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full h-10 pl-4 pr-10 text-xs bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl text-[#171713] placeholder:text-[#85857B] focus:outline-none focus:ring-2 focus:ring-[#014D21] focus:bg-white transition-all font-body"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#85857B] pointer-events-none" />
        </div>
        {rightActions}
      </div>
    </div>
  );
}
