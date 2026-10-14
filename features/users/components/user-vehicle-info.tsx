"use client";

import * as React from "react";
import Image from "next/image";
import { FileCheck } from "lucide-react";

interface UserVehicleInfoProps {
  isVerified: boolean;
  userAvatar: string;
  onPreviewDocument: (doc: {
    title: string;
    image: string;
    isNationalIdCard?: boolean;
    showCompare?: boolean;
  }) => void;
  onRequestReverification: () => void;
  onVerifyDocuments: () => void;
}

/**
 * Vehicle information card (courier-only).
 * Shows vehicle details, submitted photos, and document verification actions.
 */
export function UserVehicleInfo({
  isVerified,
  userAvatar,
  onPreviewDocument,
  onRequestReverification,
  onVerifyDocuments,
}: UserVehicleInfoProps) {
  return (
    <div className="bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-[#171713] font-heading">
            Vehicle Information
          </h3>
          <p className="text-xs text-[#85857B] mt-0.5">
            Review vehicle details and submitted documents
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onRequestReverification}
            className="px-4 py-2 rounded-xl border border-[#E3E3DC] text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer"
          >
            Request Re-Verification
          </button>
          {!isVerified && (
            <button
              type="button"
              onClick={onVerifyDocuments}
              className="px-4 py-2 rounded-xl bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Verify Documents</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Details & Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-1">
        <VehicleDetailBox
          label="VEHICLE NAME"
          value="Toyota"
          isVerified={isVerified}
        />
        <VehicleDetailBox
          label="PLATE NUMBER"
          value="ABC-123-XY"
          subtitle="Lagos State Plate"
          mono
        />
        <VehicleColorBox />
        <VehiclePhotoBox
          title="Vehicle Exterior"
          src="https://images.unsplash.com/photo-1590362891991-f776e747a588?w=300&auto=format&fit=crop&q=80"
          onView={() =>
            onPreviewDocument({
              title: "Vehicle Exterior Photograph",
              image:
                "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop&q=80",
              isNationalIdCard: false,
              showCompare: false,
            })
          }
        />
        <DriverLicenseBox userAvatar={userAvatar} onView={onPreviewDocument} />
        <OwnershipBox onView={onPreviewDocument} />
      </div>
    </div>
  );
}

/* ─── Internal helpers ─────────────────────────────── */

function VerificationBadge({ verified }: { verified: boolean }) {
  return verified ? (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#014D21]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
      Verified
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
      NOT VERIFIED
    </span>
  );
}

function VehicleDetailBox({
  label,
  value,
  subtitle,
  mono,
  isVerified,
}: {
  label: string;
  value: string;
  subtitle?: string;
  mono?: boolean;
  isVerified?: boolean;
}) {
  return (
    <div className="bg-[#FCFCFA] border border-[#E3E3DC] rounded-xl p-3.5 flex flex-col justify-between">
      <div>
        <span className="text-[10px] uppercase font-bold text-[#85857B] tracking-wider block">
          {label}
        </span>
        <h4
          className={`text-sm font-bold text-[#171713] mt-1 ${mono ? "font-mono" : "font-heading"}`}
        >
          {value}
        </h4>
      </div>
      <div className="mt-3">
        {isVerified !== undefined ? (
          <VerificationBadge verified={isVerified} />
        ) : subtitle ? (
          <span className="text-[10px] text-[#85857B]">{subtitle}</span>
        ) : null}
      </div>
    </div>
  );
}

function VehicleColorBox() {
  return (
    <div className="bg-[#FCFCFA] border border-[#E3E3DC] rounded-xl p-3.5 flex flex-col justify-between">
      <div>
        <span className="text-[10px] uppercase font-bold text-[#85857B] tracking-wider block">
          VEHICLE COLOR
        </span>
        <h4 className="text-sm font-bold text-[#171713] mt-1 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-black inline-block border border-gray-400" />
          Black
        </h4>
      </div>
      <div className="mt-3">
        <span className="text-[10px] text-[#85857B]">Metallic Finish</span>
      </div>
    </div>
  );
}

function VehiclePhotoBox({
  title,
  src,
  onView,
}: {
  title: string;
  src: string;
  onView: () => void;
}) {
  return (
    <div className="bg-[#FCFCFA] border border-[#E3E3DC] rounded-xl p-2.5 flex flex-col justify-between space-y-2">
      <div className="relative h-20 w-full rounded-lg overflow-hidden bg-[#E6F1EB]">
        <Image src={src} alt={title} fill unoptimized className="object-cover" />
      </div>
      <button
        type="button"
        onClick={onView}
        className="text-[11px] font-semibold text-[#014D21] hover:underline cursor-pointer text-center block w-full py-0.5"
      >
        View photo
      </button>
    </div>
  );
}

function DriverLicenseBox({
  userAvatar,
  onView,
}: {
  userAvatar: string;
  onView: (doc: { title: string; image: string; isNationalIdCard?: boolean; showCompare?: boolean }) => void;
}) {
  return (
    <div className="bg-[#FCFCFA] border border-[#E3E3DC] rounded-xl p-2.5 flex flex-col justify-between space-y-2">
      <div className="relative h-20 w-full rounded-lg overflow-hidden bg-[#E6F1EB] border border-[#014D21]/20 p-2 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[7px] font-extrabold text-[#014D21]">FRSC DRIVER LICENSE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-8 rounded bg-gray-300 relative overflow-hidden">
            <Image src={userAvatar} alt="License portrait" fill unoptimized className="object-cover" />
          </div>
          <div className="text-[6px] text-gray-700">
            <p className="font-bold">ADEYEMI, S.</p>
            <p>CLASS: E (Commercial)</p>
          </div>
        </div>
        <span className="text-[6px] text-gray-500">EXP: 2028</span>
      </div>
      <div>
        <span className="text-[10px] text-[#85857B] text-center block">
          Driver&apos;s License
        </span>
        <button
          type="button"
          onClick={() =>
            onView({
              title: "Federal Road Safety Driver's License",
              image: userAvatar,
              isNationalIdCard: false,
              showCompare: false,
            })
          }
          className="text-[11px] font-semibold text-[#014D21] hover:underline cursor-pointer text-center block w-full py-0.5"
        >
          View photo
        </button>
      </div>
    </div>
  );
}

function OwnershipBox({
  onView,
}: {
  onView: (doc: { title: string; image: string; isNationalIdCard?: boolean; showCompare?: boolean }) => void;
}) {
  return (
    <div className="bg-[#FCFCFA] border border-[#E3E3DC] rounded-xl p-2.5 flex flex-col justify-between space-y-2">
      <div className="relative h-20 w-full rounded-lg overflow-hidden bg-[#FAF9F5] border border-[#DC851F]/30 p-2 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[7px] font-extrabold text-[#DC851F]">CMR PROOF OF OWNERSHIP</span>
          <FileCheck className="w-2.5 h-2.5 text-[#014D21]" />
        </div>
        <div className="space-y-0.5 text-[6px] text-gray-600">
          <p>CERTIFICATE NO: CMR-98214</p>
          <p>CHASSIS: JT3HP10V6R0... </p>
          <p>ENGINE: 2AZ-FE-9821</p>
        </div>
        <span className="text-[6px] text-gray-400">STATUS: ACTIVE</span>
      </div>
      <div>
        <span className="text-[10px] text-[#85857B] text-center block">
          Vehicle Ownership
        </span>
        <button
          type="button"
          onClick={() =>
            onView({
              title: "Certificate of Proof of Ownership (CMR)",
              image:
                "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
              isNationalIdCard: false,
              showCompare: false,
            })
          }
          className="text-[11px] font-semibold text-[#014D21] hover:underline cursor-pointer text-center block w-full py-0.5"
        >
          View photo
        </button>
      </div>
    </div>
  );
}
