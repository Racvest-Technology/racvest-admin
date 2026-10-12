"use client";

import * as React from "react";
import { SupportCategoryItem } from "../types";

interface SupportCategoryGridProps {
  categories: SupportCategoryItem[];
}

export function SupportCategoryGrid({ categories }: SupportCategoryGridProps) {
  return (
    <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
      {/* Header matching Figma screenshot */}
      <div className="pb-3">
        <h3 className="text-sm font-bold text-[#171713] font-heading">
          Support SLA &amp; Performance Summary
        </h3>
      </div>

      {/* 2x3 Grid of categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-[#F9FAF8] border border-[#EAEAE5] rounded-xl px-4 py-3.5 flex items-center justify-between hover:bg-[#F2F2EC] transition-colors"
          >
            <span className="text-xs font-medium text-[#171713] font-body truncate pr-2">
              {cat.name}
            </span>
            <span className="text-sm font-bold text-[#16A34A] font-heading shrink-0">
              {cat.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
