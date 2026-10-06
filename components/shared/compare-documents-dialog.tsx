"use client";

import * as React from "react";
import Image from "next/image";
import { X, Check } from "lucide-react";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";

export interface CompareDocumentsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  livenessImage: string;
  idCardImage?: string;
  userName?: string;
  onApprove?: () => void;
  onRequestReverification?: () => void;
}

export function CompareDocumentsDialog({
  isOpen,
  onClose,
  livenessImage,
  idCardImage,
  userName = "User",
  onApprove,
  onRequestReverification,
}: CompareDocumentsDialogProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay onClick={onClose} />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none">
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#E3E3DC] p-5 sm:p-6 text-[#171713] pointer-events-auto transition-all animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Circular Close Button at top right matching Figma */}
            <button
              type="button"
              onClick={onClose}
              className="absolute z-20 top-3 right-3 w-7 h-7 rounded-full bg-white/95 hover:bg-white text-[#85857B] hover:text-[#171713] border border-[#E3E3DC] shadow-xs flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Side-by-Side Comparison Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Left Panel: Liveness Check Photo */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#E3E3DC] bg-neutral-900 shadow-xs flex items-center justify-center">
                <Image
                  src={livenessImage}
                  alt={`${userName} Liveness Check`}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Right Panel: Government ID Card (Authentic Nigerian National ID Layout) */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#E3E3DC] bg-[#F2F4F3] shadow-xs p-4 flex flex-col justify-between">
                {/* Top NIN header */}
                <div className="flex items-center justify-between border-b border-[#014D21]/20 pb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-3 bg-[#014D21] rounded-2xs flex overflow-hidden">
                      <div className="w-1/3 bg-[#014D21]" />
                      <div className="w-1/3 bg-white" />
                      <div className="w-1/3 bg-[#014D21]" />
                    </div>
                    <span className="text-[9px] font-black text-[#014D21] tracking-tight uppercase">
                      FEDERAL REPUBLIC OF NIGERIA
                    </span>
                  </div>
                  <span className="text-[8px] text-[#85857B] font-bold">NIMC</span>
                </div>

                {/* Body Details */}
                <div className="flex items-center gap-3.5 py-2">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden border-2 border-[#014D21]/40 shrink-0 bg-[#E6F1EB] shadow-xs">
                    <Image
                      src={idCardImage || livenessImage}
                      alt="NIN Photo"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 text-[10px] text-[#2C2C28] font-body">
                    <p className="font-mono font-extrabold text-[#014D21] text-xs tracking-wider">
                      1234 5678 901
                    </p>
                    <p><span className="text-[#85857B] font-medium">Surname:</span> <strong>OKORO</strong></p>
                    <p><span className="text-[#85857B] font-medium">First Name:</span> <strong>AMARA</strong></p>
                    <p><span className="text-[#85857B] font-medium">Date of Birth:</span> 01/01/1990</p>
                    <p><span className="text-[#85857B] font-medium">Place of Issue:</span> ABUJA, FCT</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-[8px] text-[#85857B] font-medium border-t border-[#014D21]/20 pt-1.5">
                  <span>NATIONAL IDENTITY CARD</span>
                  <span>EXP: 09/01/2030</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 flex flex-col items-center justify-center space-y-3">
              {/* Optional approval action if provided */}
              {onApprove && (
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {onRequestReverification && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onRequestReverification();
                      }}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-[#E3E3DC] text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer"
                    >
                      Request Re-Verification
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      onApprove();
                      onClose();
                    }}
                    className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-[#014D21] hover:bg-[#01451E] text-white text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve Verification</span>
                  </button>
                </div>
              )}

              {/* Centered Cancel Button matching Figma screenshot */}
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-[#171713] hover:text-[#85857B] transition-colors cursor-pointer py-1.5 px-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
}
