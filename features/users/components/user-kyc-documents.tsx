"use client";

import * as React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

interface UserKycDocumentsProps {
  isVerified: boolean;
  livenessPhoto: string;
  reviewedBy: string;
  onPreviewDocument: (doc: {
    title: string;
    image: string;
    isNationalIdCard?: boolean;
    showCompare?: boolean;
  }) => void;
  onRequestReverification: () => void;
  onVerifyIdentity: () => void;
}

/**
 * KYC verification card with Government ID and Liveness Check previews.
 */
export function UserKycDocuments({
  isVerified,
  livenessPhoto,
  reviewedBy,
  onPreviewDocument,
  onRequestReverification,
  onVerifyIdentity,
}: UserKycDocumentsProps) {
  return (
    <div className="lg:col-span-7 bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Government ID Preview Card */}
        <div className="space-y-2.5">
          <NigerianIdCard livenessPhoto={livenessPhoto} />

          <DocStatusAction
            title="Government ID"
            isVerified={isVerified}
            verifiedLabel="Verified"
            unverifiedLabel="NOT VERIFIED"
            onView={() =>
              onPreviewDocument({
                title: "Federal Republic of Nigeria National Identity Card",
                image: livenessPhoto,
                isNationalIdCard: true,
                showCompare: true,
              })
            }
          />
        </div>

        {/* Liveness Check Preview Card */}
        <div className="space-y-2.5">
          <div className="h-44 bg-[#F7F7F3] rounded-xl overflow-hidden border border-[#E3E3DC] relative">
            <Image
              src={livenessPhoto}
              alt="Liveness Check"
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          <DocStatusAction
            title="Liveness Check"
            isVerified={isVerified}
            verifiedLabel="Passed"
            unverifiedLabel="NOT VERIFIED"
            onView={() =>
              onPreviewDocument({
                title: "Biometric Liveness Selfie Check",
                image: livenessPhoto,
                isNationalIdCard: false,
                showCompare: true,
              })
            }
          />
        </div>
      </div>

      {/* Details Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E3E3DC] text-xs">
        <DetailCell label="Government ID No" value="1234 5678 901" />
        <DetailCell label="Reviewed by" value={reviewedBy} />
        <DetailCell label="Verification Date" value="Jan 14, 2024" />
        <DetailCell label="Last check" value="Feb 02, 2026" />
      </div>

      {/* Action Buttons */}
      {isVerified ? (
        <button
          type="button"
          onClick={onRequestReverification}
          className="w-full py-2.5 rounded-xl border border-[#E3E3DC] text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer text-center"
        >
          Request Re-Verification
        </button>
      ) : (
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={onRequestReverification}
            className="w-full py-2.5 rounded-xl border border-[#E3E3DC] text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer text-center"
          >
            Request Re-Verification
          </button>
          <button
            type="button"
            onClick={onVerifyIdentity}
            className="w-full py-2.5 rounded-xl bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs text-center flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Verify Identity</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Internal helpers ─────────────────────────────── */

function NigerianIdCard({ livenessPhoto }: { livenessPhoto: string }) {
  return (
    <div className="h-44 bg-[#F2F4F3] rounded-xl overflow-hidden border border-[#E3E3DC] relative p-3 flex flex-col justify-between shadow-inner">
      <div className="flex items-center justify-between border-b border-[#014D21]/20 pb-1.5">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 bg-[#014D21] rounded-2xs flex">
            <div className="w-1/3 bg-[#014D21]" />
            <div className="w-1/3 bg-white" />
            <div className="w-1/3 bg-[#014D21]" />
          </div>
          <span className="text-[8px] font-extrabold text-[#014D21] tracking-tight uppercase">
            FEDERAL REPUBLIC OF NIGERIA
          </span>
        </div>
        <span className="text-[7px] text-[#85857B] font-semibold">NIMC</span>
      </div>

      <div className="flex items-center gap-2.5 py-1">
        <div className="relative w-16 h-20 rounded-md overflow-hidden border border-[#014D21]/30 shrink-0 bg-[#E6F1EB]">
          <Image
            src={livenessPhoto}
            alt="ID Photo"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="space-y-0.5 text-[8px] text-[#484840]">
          <p className="font-extrabold text-[#014D21] text-[9px] tracking-wider">
            1234 5678 901
          </p>
          <p><span className="text-[#85857B]">Surname:</span> OKORO</p>
          <p><span className="text-[#85857B]">First Name:</span> AMARA</p>
          <p><span className="text-[#85857B]">Date of Birth:</span> 01/01/1990</p>
          <p><span className="text-[#85857B]">Place of Issue:</span> ABUJA</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[7px] text-[#85857B] border-t border-[#014D21]/20 pt-1">
        <span>NATIONAL IDENTITY CARD</span>
        <span>EXP: 09/01/2030</span>
      </div>
    </div>
  );
}

function DocStatusAction({
  title,
  isVerified,
  verifiedLabel,
  unverifiedLabel,
  onView,
}: {
  title: string;
  isVerified: boolean;
  verifiedLabel: string;
  unverifiedLabel: string;
  onView: () => void;
}) {
  return (
    <div className="flex items-center justify-between pt-1">
      <div>
        <h4 className="text-xs font-bold text-[#171713]">{title}</h4>
        {isVerified ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#014D21] mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
            {verifiedLabel}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626] mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            {unverifiedLabel}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={onView}
        className="text-xs font-semibold text-[#014D21] hover:underline cursor-pointer"
      >
        View Document
      </button>
    </div>
  );
}

function DetailCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[#85857B] block text-[11px]">{label}</span>
      <span className="font-bold text-[#171713] mt-0.5 block">{value}</span>
    </div>
  );
}
