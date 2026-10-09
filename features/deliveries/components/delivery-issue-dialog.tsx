"use client";

import * as React from "react";
import { X, AlertTriangle, MessageSquare, CheckCircle2 } from "lucide-react";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";

export interface DeliveryIssueDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trackingId?: string;
  issue?: {
    id: string;
    reporter: string;
    summary: string;
    description: string;
    timestamp: string;
    status: "Open" | "Resolved";
  };
  onResolve?: () => void;
  onOpenMessage?: (party: "sender" | "courier") => void;
}

export function DeliveryIssueDialog({
  isOpen,
  onClose,
  trackingId = "#RCV-29842",
  issue,
  onResolve,
  onOpenMessage,
}: DeliveryIssueDialogProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay onClick={onClose} />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none">
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E3E3DC] p-6 text-[#171713] pointer-events-auto transition-all animate-in fade-in zoom-in-95 duration-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pr-8 border-b border-[#E3E3DC] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FEF2F0] text-[#DC2626] flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#171713] font-heading">
                      Delivery Issue Report
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEECEC] text-[#DC2626]">
                      {issue?.status || "Open"}
                    </span>
                  </div>
                  <p className="text-xs text-[#85857B] mt-0.5">
                    Filed for Tracking ID: <span className="font-semibold text-[#171713]">{trackingId}</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-7 h-7 rounded-full bg-[#171713] text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              aria-label="Close dialog"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Issue Information */}
            <div className="bg-[#FCFCFA] border border-[#E3E3DC] rounded-xl p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E3E3DC]">
                <span className="text-[#85857B]">Reported By</span>
                <span className="font-semibold text-[#171713]">{issue?.reporter || "Sender (Sophia Chen)"}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#E3E3DC]">
                <span className="text-[#85857B]">Reported Time</span>
                <span className="font-semibold text-[#171713]">{issue?.timestamp || "Sep 30, 2:45 pm"}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#85857B] uppercase tracking-wider block mb-1">
                  Issue Summary
                </span>
                <p className="text-xs text-[#171713] leading-relaxed font-medium">
                  {issue?.description ||
                    "Sender reported courier delayed beyond initial estimated arrival window by 15 minutes due to heavy traffic around Third Mainland Bridge."}
                </p>
              </div>
            </div>

            {/* Admin Resolution & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenMessage?.("sender");
                  }}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border border-[#E3E3DC] text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message Sender</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenMessage?.("courier");
                  }}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border border-[#E3E3DC] text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message Courier</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onResolve?.();
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#014D21] hover:bg-[#01451E] text-white text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Resolved</span>
              </button>
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
}
