"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserDetailHeaderProps {
  backLink: string;
  backLabel: string;
  isVerified: boolean;
  onToggleVerification: (val: boolean) => void;
  onSendMessage: () => void;
}

/**
 * Top bar with back navigation, verification state toggle, and action buttons.
 */
export function UserDetailHeader({
  backLink,
  backLabel,
  isVerified,
  onToggleVerification,
  onSendMessage,
}: UserDetailHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <Link
        href={backLink}
        className="flex items-center gap-2.5 text-xs font-bold text-[#171713] hover:text-[#014D21] transition-colors group"
      >
        <div className="w-8 h-8 rounded-full border border-[#E3E3DC] bg-white flex items-center justify-center group-hover:bg-[#F7F7F3] shadow-2xs">
          <ArrowLeft className="w-4 h-4 text-[#171713]" />
        </div>
        <span>{backLabel}</span>
      </Link>

      <div className="flex items-center gap-3">
        {/* Quick State Toggle for Admin Testing */}
        <div className="flex items-center bg-[#F2F2EC] p-1 rounded-xl border border-[#E3E3DC] text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => onToggleVerification(false)}
            className={cn(
              "px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5",
              !isVerified
                ? "bg-white text-[#DC2626] shadow-2xs font-bold"
                : "text-[#85857B] hover:text-[#171713]"
            )}
          >
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                !isVerified ? "bg-[#DC2626]" : "bg-[#85857B]"
              )}
            />
            Before verification
          </button>
          <button
            type="button"
            onClick={() => onToggleVerification(true)}
            className={cn(
              "px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5",
              isVerified
                ? "bg-[#014D21] text-white shadow-2xs font-bold"
                : "text-[#85857B] hover:text-[#171713]"
            )}
          >
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                isVerified ? "bg-white" : "bg-[#85857B]"
              )}
            />
            Verified
          </button>
        </div>

        <button
          type="button"
          onClick={onSendMessage}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>Send Message</span>
        </button>

        <button
          type="button"
          className="w-9 h-9 rounded-xl border border-[#E3E3DC] bg-white flex items-center justify-center text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs"
          aria-label="More actions"
        >
          <MoreVertical className="w-4 h-4 text-[#85857B]" />
        </button>
      </div>
    </div>
  );
}
