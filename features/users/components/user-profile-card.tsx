"use client";

import * as React from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Car,
  ShieldCheck,
} from "lucide-react";

interface UserProfileCardProps {
  userName: string;
  userEmail: string;
  userPhone: string;
  userAvatar: string;
  roleLabel: string;
  isCourier: boolean;
  isVerified: boolean;
}

/**
 * User identity card with avatar, contact info, and account health/trust deck.
 */
export function UserProfileCard({
  userName,
  userEmail,
  userPhone,
  userAvatar,
  roleLabel,
  isCourier,
  isVerified,
}: UserProfileCardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Left: User Identity Card */}
      <div className="lg:col-span-7 bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs space-y-5">
        <div className="flex items-center gap-4">
          <Image
            src={userAvatar}
            alt={userName}
            width={64}
            height={64}
            unoptimized
            className="w-16 h-16 rounded-full object-cover ring-2 ring-[#014D21]/20 shadow-xs shrink-0"
          />
          <div>
            <h2 className="text-lg font-bold text-[#171713] font-heading">
              {userName}
            </h2>
            <span className="text-xs text-[#85857B] font-medium">
              {roleLabel}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs">
          <InfoRow icon={Mail} label="Email" value={userEmail} truncate />
          <InfoRow icon={Phone} label="Phone" value={userPhone} />
          <InfoRow icon={MapPin} label="Location" value="Lagos, Nigeria" />
          <InfoRow icon={Calendar} label="Joined" value="Oct 12, 2025" />
          <InfoRow icon={CreditCard} label="User ID" value="#RCV-29842" />
          {isCourier && (
            <InfoRow
              icon={Car}
              label="Vehicle"
              value="Toyota · ABC-123-XY · Black"
              truncate
            />
          )}
        </div>
      </div>

      {/* Right: Account Health & Trust Score Deck */}
      <div className="lg:col-span-5 bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between space-y-3">
        <div className="space-y-2.5">
          <StatusBox label="Account Status" status="Active" variant="success" />
          <StatusBox
            label="Verification Status"
            status={isVerified ? "Verified" : "Not Verified"}
            variant={isVerified ? "success" : "error"}
          />
          <StatusBox label="Risk Status" status="Safe" variant="success" />
        </div>

        {/* Trust Score Banner */}
        <div className="bg-[#E6F1EB] text-[#014D21] p-3.5 rounded-xl flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#014D21] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-heading">
              {isVerified ? "Trust score 92/100" : "Trust score 100/100"}
            </h4>
            <p className="text-[11px] text-[#014D21]/80 mt-0.5">
              Excellent standing · 0 unresolved reports
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Internal helpers ─────────────────────────────── */

function InfoRow({
  icon: Icon,
  label,
  value,
  truncate,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  truncate?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 text-[#5A5A52]">
      <Icon className="w-4 h-4 text-[#85857B] shrink-0" />
      <span className="text-[#85857B] w-14">{label}</span>
      <span
        className={`font-semibold text-[#171713] ${truncate ? "truncate" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function StatusBox({
  label,
  status,
  variant,
}: {
  label: string;
  status: string;
  variant: "success" | "error";
}) {
  const isSuccess = variant === "success";
  return (
    <div className="border border-[#E3E3DC] rounded-xl px-4 py-2.5 bg-white flex flex-col justify-center">
      <span className="text-[11px] text-[#85857B] font-medium">{label}</span>
      <div className="mt-1">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            isSuccess
              ? "bg-[#E6F1EB] text-[#014D21]"
              : "bg-[#FEE2E2] text-[#DC2626]"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isSuccess ? "bg-[#014D21]" : "bg-[#DC2626]"
            }`}
          />
          {status}
        </span>
      </div>
    </div>
  );
}
