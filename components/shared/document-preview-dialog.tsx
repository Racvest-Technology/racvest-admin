"use client";

import * as React from "react";
import Image from "next/image";
import { X, ArrowLeftRight } from "lucide-react";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";

export interface DocumentPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title?: string;
  alt?: string;
  onCompare?: () => void;
  compareButtonLabel?: string;
  showCompareButton?: boolean;
  isNationalIdCard?: boolean;
}

export function DocumentPreviewDialog({
  isOpen,
  onClose,
  image,
  title = "Document Preview",
  alt = "Document",
  onCompare,
  compareButtonLabel = "Compare Documents",
  showCompareButton = true,
  isNationalIdCard = false,
}: DocumentPreviewDialogProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay onClick={onClose} />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none">
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E3E3DC] p-4 sm:p-5 text-[#171713] pointer-events-auto transition-all animate-in fade-in zoom-in-95 duration-200"
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

            {/* Document Image Body */}
            <div className="w-full rounded-xl overflow-hidden border border-[#E3E3DC] bg-[#F7F7F3] shadow-xs">
              {isNationalIdCard ? (
                /* Authentic Nigerian National ID Card Layout */
                <div className="bg-[#F2F4F3] p-4 flex flex-col justify-between aspect-[1.58/1] relative shadow-inner">
                  {/* Top NIN header */}
                  <div className="flex items-center justify-between border-b border-[#014D21]/20 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-3.5 bg-[#014D21] rounded-2xs flex overflow-hidden">
                        <div className="w-1/3 bg-[#014D21]" />
                        <div className="w-1/3 bg-white" />
                        <div className="w-1/3 bg-[#014D21]" />
                      </div>
                      <span className="text-[10px] font-black text-[#014D21] tracking-tight uppercase">
                        FEDERAL REPUBLIC OF NIGERIA
                      </span>
                    </div>
                    <span className="text-[9px] text-[#85857B] font-bold">NIMC</span>
                  </div>

                  {/* Body with Photo and NIN details */}
                  <div className="flex items-center gap-4 py-3">
                    <div className="relative w-24 h-28 rounded-lg overflow-hidden border-2 border-[#014D21]/40 shrink-0 bg-[#E6F1EB] shadow-xs">
                      <Image
                        src={image}
                        alt="NIN Portrait"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1 text-[11px] text-[#2C2C28] font-body">
                      <p className="font-mono font-extrabold text-[#014D21] text-sm tracking-wider">
                        1234 5678 901
                      </p>
                      <p><span className="text-[#85857B] font-medium">Surname:</span> <strong>OKORO</strong></p>
                      <p><span className="text-[#85857B] font-medium">First Name:</span> <strong>AMARA</strong></p>
                      <p><span className="text-[#85857B] font-medium">Date of Birth:</span> 01/01/1990</p>
                      <p><span className="text-[#85857B] font-medium">Place of Issue:</span> ABUJA, FCT</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-[9px] text-[#85857B] font-medium border-t border-[#014D21]/20 pt-1.5">
                    <span>NATIONAL IDENTITY CARD</span>
                    <span>EXPIRY: 09/01/2030</span>
                  </div>
                </div>
              ) : (
                /* High-Res Photo / Selfie / Inspection Preview */
                <div className="relative w-full aspect-[4/3] bg-neutral-900 flex items-center justify-center">
                  <Image
                    src={image}
                    alt={alt || title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Bottom Full-Width Action Button: Compare Documents */}
            {showCompareButton && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    if (onCompare) {
                      onCompare();
                    } else {
                      onClose();
                    }
                  }}
                  className="w-full py-3 bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <span>{compareButtonLabel}</span>
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
}
