"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Package,
  ArrowLeftRight,
  Users,
  Receipt,
  Activity,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { BidMatchItem } from "../data/mock-matches";

interface BidDetailDrawerProps {
  bid: BidMatchItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BidDetailDrawer({ bid, isOpen, onClose }: BidDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "audit">("overview");

  if (!isOpen || !bid) return null;

  const formatNaira = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Awaiting Decision":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-amber-300 text-amber-700 bg-amber-50">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Awaiting Decision
          </span>
        );
      case "Matched":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-300 text-emerald-700 bg-emerald-50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Matched
          </span>
        );
      case "Accepted":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#062413] text-white border border-[#062413]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Accepted
          </span>
        );
      case "Withdrawn":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-neutral-300 text-neutral-600 bg-neutral-100">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            Withdrawn
          </span>
        );
      case "Unmatched Request":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-rose-300 text-rose-600 bg-rose-50">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Unmatched Request
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-neutral-200 text-neutral-700 bg-neutral-50">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300 ease-out border-l border-neutral-200">
          {/* Drawer Header */}
          <div className="px-6 pt-6 pb-4 border-b border-neutral-100">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
                  {bid.id}
                </h2>
                <div className="flex items-center gap-2 mt-1.5">
                  {getStatusBadge(bid.status)}
                  <span className="text-xs text-neutral-500 font-medium">
                    {bid.type}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-8 mt-6 border-b border-neutral-200">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-3 text-sm transition-colors relative ${
                  activeTab === "overview"
                    ? "font-semibold text-neutral-900 border-b-2 border-[#0A4D2E]"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`pb-3 text-sm transition-colors relative ${
                  activeTab === "activity"
                    ? "font-semibold text-neutral-900 border-b-2 border-[#0A4D2E]"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab("audit")}
                className={`pb-3 text-sm transition-colors relative flex items-center gap-1.5 ${
                  activeTab === "audit"
                    ? "font-semibold text-neutral-900 border-b-2 border-[#0A4D2E]"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                <span>Audit log</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* 1. Delivery Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4 text-neutral-700" />
                    <h3 className="text-sm font-semibold text-neutral-900">Delivery</h3>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1">
                      <span className="text-neutral-500">Delivery ID</span>
                      <span className="font-semibold text-neutral-900">{bid.deliveryIdRaw}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-neutral-500">Route</span>
                      <span className="font-semibold text-neutral-900">{bid.route}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-neutral-500">Package</span>
                      <span className="font-semibold text-neutral-900">{bid.packageDetails}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-neutral-500">Delivery date</span>
                      <span className="font-semibold text-neutral-900">{bid.deliveryDate}</span>
                    </div>
                  </div>
                </div>

                <hr className="border-neutral-100" />

                {/* 2. Matching Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowLeftRight className="w-4 h-4 text-neutral-700" />
                    <h3 className="text-sm font-semibold text-neutral-900">Matching</h3>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1">
                      <span className="text-neutral-500">Matching type</span>
                      <span className="font-semibold text-neutral-900">{bid.type}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-neutral-500">Current status</span>
                      <span className="font-semibold text-neutral-900">{bid.status}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-neutral-500">Created time</span>
                      <span className="font-semibold text-neutral-900">{bid.createdTime}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-neutral-500">Time waiting</span>
                      <span className="font-semibold text-neutral-900">{bid.timeWaiting}</span>
                    </div>
                  </div>
                </div>

                <hr className="border-neutral-100" />

                {/* 3. Participants Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-neutral-700" />
                    <h3 className="text-sm font-semibold text-neutral-900">Participants</h3>
                  </div>
                  <div className="space-y-3">
                    {/* Sender */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200">
                          <Image
                            src={bid.sender.avatar}
                            alt={bid.sender.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-neutral-900">
                            {bid.sender.name}
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            {bid.sender.role}
                          </div>
                        </div>
                      </div>
                      {bid.sender.isVerified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Courier */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200">
                          <Image
                            src={bid.courier.avatar}
                            alt={bid.courier.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-neutral-900">
                            {bid.courier.name}
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            {bid.courier.role}
                          </div>
                        </div>
                      </div>
                      {bid.courier.isVerified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="border-neutral-100" />

                {/* 4. Offer Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Receipt className="w-4 h-4 text-neutral-700" />
                    <h3 className="text-sm font-semibold text-neutral-900">Offer</h3>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1">
                      <span className="text-neutral-500">Original amount</span>
                      <span className="font-semibold text-neutral-900">
                        {formatNaira(bid.originalAmount ?? bid.senderBudget)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-neutral-500">Current negotiated amount</span>
                      <span className="text-sm font-bold text-[#065F46]">
                        {formatNaira(bid.negotiatedAmount ?? bid.bidAmount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-neutral-500">Sender budget</span>
                      <span className="font-semibold text-neutral-900">
                        {formatNaira(bid.senderBudget)}
                      </span>
                    </div>
                  </div>
                </div>

                <hr className="border-neutral-100" />

                {/* 5. Latest Activity Section */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-neutral-700" />
                    <h3 className="text-sm font-semibold text-neutral-900">Latest activity</h3>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-2">
                    {bid.latestActivity}
                  </p>
                  <button
                    onClick={() => setActiveTab("activity")}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    View full activity &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: ACTIVITY */}
            {activeTab === "activity" && (
              <div className="space-y-5">
                <div className="flex items-start gap-2">
                  <Activity className="w-4 h-4 text-neutral-700 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">Matching Activity</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      A chronological record of this matching request.
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative pl-6 mt-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-400">
                  {bid.activityTimeline.length > 0 ? (
                    bid.activityTimeline.map((item) => (
                      <div key={item.id} className="relative group">
                        {/* Bullet */}
                        <div className="absolute -left-[19px] top-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-white ring-4 ring-amber-100">
                          <svg
                            className="w-2.5 h-2.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {/* Time & Content */}
                        <div>
                          <div className="text-[11px] font-medium text-neutral-400 mb-0.5">
                            {item.time}
                          </div>
                          <div className="text-xs font-bold text-neutral-900">
                            {item.title}
                          </div>
                          <div className="text-xs text-neutral-500 mt-0.5">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-neutral-500 py-4">
                      No activity recorded yet for this bid.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: AUDIT LOG */}
            {activeTab === "audit" && (
              <div className="space-y-6">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-neutral-700 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">Admin audit log</h3>
                    <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                      Every intervention is recorded with an actor, reason, and timestamp. Demo records are stored on this device.
                    </p>
                  </div>
                </div>

                {/* Empty State */}
                <div className="rounded-2xl border border-dashed border-neutral-200 p-8 flex flex-col items-center justify-center text-center bg-neutral-50/50">
                  <div className="w-12 h-12 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-400 mb-3 shadow-xs">
                    <ShieldCheck className="w-6 h-6 stroke-1 text-neutral-500" />
                  </div>
                  <h4 className="text-xs font-semibold text-neutral-900">
                    No admin interventions
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-1 max-w-[220px]">
                    This match has not been changed by an administrator.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
