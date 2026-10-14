"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize?: number;
  itemLabel?: string;
  countLabel?: string;
  nextVariant?: "default" | "primary";
  onPageChange: (page: number) => void;
  className?: string;
}

export function TablePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 10,
  itemLabel = "items",
  countLabel,
  nextVariant = "default",
  onPageChange,
  className,
}: TablePaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers to display (e.g. 1, 2, 3...)
  const pages: number[] = [];
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#85857B] pt-4 border-t border-[#E3E3DC] font-body",
        className
      )}
    >
      <div>
        {countLabel ? (
          <span>{countLabel}</span>
        ) : (
          <>
            Showing{" "}
            <span className="font-semibold text-[#171713]">
              {startItem}-{endItem}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#171713]">
              {totalItems.toLocaleString()}
            </span>{" "}
            {itemLabel}
          </>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E3E3DC] bg-white text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer shadow-2xs"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Prev</span>
        </button>

        {/* Page Number Buttons */}
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer",
                isActive
                  ? "bg-[#014D21] text-white shadow-xs font-bold"
                  : "bg-white border border-[#E3E3DC] text-[#171713] hover:bg-[#F7F7F3] shadow-2xs"
              )}
            >
              {p}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className={cn(
            "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer shadow-2xs",
            nextVariant === "primary"
              ? "bg-[#014D21] text-white border border-[#014D21] hover:bg-[#013A19]"
              : "border border-[#E3E3DC] bg-white text-[#171713] hover:bg-[#F7F7F3]"
          )}
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
