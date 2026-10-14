"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";

interface UserWalletCardProps {
  isSender: boolean;
  isVerified: boolean;
}

/**
 * Dark wallet balance card with sub-balances and action buttons.
 */
export function UserWalletCard({ isSender, isVerified }: UserWalletCardProps) {
  const balance = isVerified
    ? isSender
      ? "₦100,000"
      : "₦200,000"
    : "₦0";

  return (
    <div className="lg:col-span-4 bg-[#01250F] text-white p-6 rounded-2xl shadow-xs flex flex-col justify-between relative overflow-hidden">
      <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full border-[18px] border-white/[0.04] pointer-events-none" />

      <div>
        <span className="text-xs text-white/70 font-medium">Wallet Balance</span>
        <h2 className="text-3xl font-extrabold tracking-tight font-heading mt-1">
          {balance}
        </h2>

        {/* Sub-balances */}
        {isSender ? (
          <div className="mt-5 pt-3 border-t border-white/10">
            <SubBalanceBox label="Refunds" value="₦0" />
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
            <SubBalanceBox label="Pending Earnings" value="₦0" />
            <SubBalanceBox label="Refunded" value="₦0" />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-6">
        <button
          type="button"
          className="flex-1 py-2.5 rounded-xl bg-white text-[#171713] font-bold text-xs hover:bg-gray-100 transition-colors cursor-pointer shadow-xs"
        >
          Freeze
        </button>
        <button
          type="button"
          className="flex-1 py-2.5 rounded-xl border border-white/30 text-white font-semibold text-xs hover:bg-white/10 transition-colors cursor-pointer"
        >
          Audit
        </button>
        <button
          type="button"
          className="w-9 h-9 rounded-xl border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          title="Refresh wallet"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ─── Internal ─────────────────────────────── */

function SubBalanceBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3">
      <span className="text-[11px] text-white/60 block">{label}</span>
      <p className="text-sm font-bold mt-0.5">{value}</p>
    </div>
  );
}
