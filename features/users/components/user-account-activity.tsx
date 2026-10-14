"use client";

import * as React from "react";
import { Check, ChevronDown, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityEntry {
  time: string;
  title: string;
  subtitle: string;
  category: string;
}

interface UserAccountActivityProps {
  isVerified: boolean;
  isSender: boolean;
}

const VERIFIED_ACTIVITIES = (isSender: boolean): ActivityEntry[] => [
  {
    time: "09:42",
    title: isSender ? "Package #RCV-9021 created" : "Package delivered successfully",
    subtitle: "Electronics · Lagos → Abuja · ₦10,000",
    category: "Delivery",
  },
  {
    time: "09:31",
    title: "Delivery Assigned to Jane Cooper",
    subtitle: "#RCV-9021 · Courier Accepted bid · ₦10,000",
    category: "Delivery",
  },
  {
    time: "09:12",
    title: "User logged in",
    subtitle: "Lagos, NG · iOS app · IP 197.210.x.x",
    category: "Account",
  },
  {
    time: "09:12",
    title: isSender ? "Payment Completed" : "Wallet payout released",
    subtitle: "₦40,000 · #RCV-9021 · Paystack",
    category: "Payment",
  },
];

const FILTER_TABS = ["all", "Deliveries", "Payment", "Account", "Verification"];

/**
 * Account activity timeline with filter pills.
 */
export function UserAccountActivity({
  isVerified,
  isSender,
}: UserAccountActivityProps) {
  const [activityFilter, setActivityFilter] = React.useState("all");
  const activities = VERIFIED_ACTIVITIES(isSender);

  return (
    <div className="lg:col-span-5 bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs space-y-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#171713] font-heading">
            Account Activity
          </h3>
          <button
            type="button"
            className="text-xs font-semibold text-[#014D21] hover:underline cursor-pointer"
          >
            View all
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap mt-3">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActivityFilter(tab.toLowerCase())}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer capitalize",
                activityFilter === tab.toLowerCase()
                  ? "bg-[#014D21] text-white"
                  : "bg-[#F7F7F3] text-[#66665D] hover:bg-[#EBEBE4]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Body */}
      {!isVerified ? (
        <div className="py-10 flex flex-col items-center justify-center text-center my-auto">
          <div className="w-14 h-14 rounded-full bg-[#FFF5EA] text-[#DC851F] border border-[#FDE5CC] flex items-center justify-center shadow-2xs">
            <RotateCcw className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h4 className="text-sm font-bold text-[#171713] mt-3.5 font-heading">
            No Account Activity yet
          </h4>
          <p className="text-xs text-[#85857B] text-center max-w-[280px] mt-1.5 leading-relaxed font-body">
            There is no activity to display for your search. New actions,
            verification updates, loans, payments and status will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-3 pt-2 text-xs divide-y divide-[#E3E3DC]">
          {activities.map((entry, i) => (
            <div key={i} className="pt-2 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-md bg-[#E6F1EB] text-[#014D21] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#85857B]">{entry.time}</span>
                    <span className="font-bold text-[#171713]">{entry.title}</span>
                  </div>
                  <p className="text-[11px] text-[#85857B] mt-0.5">
                    {entry.subtitle}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F7F7F3] text-[10px] font-semibold text-[#85857B] shrink-0">
                {entry.category} <ChevronDown className="w-3 h-3 text-[#85857B]" />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
