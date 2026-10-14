"use client";

import * as React from "react";
import Image from "next/image";
import { Search, ChevronDown, Truck } from "lucide-react";

interface UserDeliveryHistoryProps {
  isSender: boolean;
  isVerified: boolean;
}

/**
 * Delivery history table with search, filters, and empty/populated states.
 */
export function UserDeliveryHistory({
  isSender,
  isVerified,
}: UserDeliveryHistoryProps) {
  return (
    <div className="bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-sm font-bold text-[#171713] font-heading">
          Delivery History
        </h3>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search trips or tracking ID"
              className="w-full h-9 pl-3 pr-8 text-xs bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl text-[#171713] placeholder:text-[#85857B] focus:outline-none focus:ring-2 focus:ring-[#014D21]"
            />
            <Search className="w-3.5 h-3.5 text-[#85857B] absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>

          <FilterButton label="Last 90 days" />
          <FilterButton label="All status" />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#E3E3DC]">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#FCFCFA] border-b border-[#E3E3DC] text-[#85857B] uppercase tracking-wider text-[11px] font-semibold">
              <th className="py-3 px-4">Tracking ID</th>
              <th className="py-3 px-4">Package</th>
              <th className="py-3 px-4">Destination</th>
              <th className="py-3 px-4">
                {isSender ? "Carried By" : "Send By"}
              </th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">
                {isSender ? "Amount" : "Earning"}
              </th>
              <th className="py-3 px-4">Last Updated</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3E3DC] bg-white">
            {!isVerified ? (
              <tr>
                <td colSpan={8} className="py-14 text-center">
                  <div className="max-w-xs mx-auto flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#F7F7F3] border border-[#E3E3DC] flex items-center justify-center text-[#85857B] mb-2">
                      <Truck className="w-5 h-5 text-[#85857B]" />
                    </div>
                    <p className="text-xs font-bold text-[#171713]">
                      No Delivery History Yet
                    </p>
                    <p className="text-[11px] text-[#85857B] mt-0.5">
                      Deliveries and transactions will automatically populate
                      once this account becomes active and completes orders.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              <tr className="hover:bg-[#F7F7F3] transition-colors">
                <td className="py-3 px-4 font-bold text-[#171713]">#RCV-29841</td>
                <td className="py-3 px-4 text-[#484840]">Electronics</td>
                <td className="py-3 px-4 text-[#484840]">Abuja, FCT</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                      alt="Ava Carter"
                      width={24}
                      height={24}
                      unoptimized
                      className="w-6 h-6 rounded-full object-cover shrink-0"
                    />
                    <span className="font-medium text-[#171713]">Ava Carter</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E6F1EB] text-[#014D21]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
                    In Transit
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-[#171713]">
                  {isSender ? "₦100,000" : "₦10,000"}
                </td>
                <td className="py-3 px-4 text-[#85857B]">2 mins ago</td>
                <td className="py-3 px-4 text-center">
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#014D21] hover:underline cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Internal ─────────────────────────────── */

function FilterButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] cursor-pointer"
    >
      <span>{label}</span>
      <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
    </button>
  );
}
