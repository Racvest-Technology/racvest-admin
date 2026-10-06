"use client";

import * as React from "react";
import { X, Check } from "lucide-react";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";

export interface VerificationItem {
  id: string;
  label: string;
  defaultChecked?: boolean;
}

export interface VerifyIdentityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  title?: string;
  submitButtonLabel?: string;
  successTitle?: string;
  successDescription?: string;
  items?: VerificationItem[];
  onVerified?: () => void;
}

export const DEFAULT_IDENTITY_VERIFICATION_ITEMS: VerificationItem[] = [
  { id: "liveness", label: "Liveness Check" },
  { id: "governmentId", label: "Government ID" },
];

export const DEFAULT_VEHICLE_VERIFICATION_ITEMS: VerificationItem[] = [
  { id: "plateNumber", label: "Plate Number" },
  { id: "vehicleMake", label: "Vehicle Make" },
  { id: "vehiclePhoto", label: "Vehicle Photo" },
  { id: "driverLicense", label: "Valid Driver's License" },
  { id: "vehicleOwnership", label: "Vehicle Ownership" },
];

function VerifyIdentityDialogInner({
  isOpen,
  onClose,
  userName,
  title = "Verify Identity",
  submitButtonLabel = "Verify Identity",
  successTitle = "Identity Verified",
  successDescription,
  items = DEFAULT_IDENTITY_VERIFICATION_ITEMS,
  onVerified,
}: VerifyIdentityDialogProps) {
  const [selectedIds, setSelectedIds] = React.useState<string[]>(() =>
    items.filter((i) => i.defaultChecked).map((i) => i.id)
  );
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllChecked = items.length > 0 && selectedIds.length === items.length;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAllChecked || isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessOpen(true);
    }, 350);
  };

  const handleDone = () => {
    setIsSuccessOpen(false);
    onClose();
    onVerified?.();
  };

  const resolvedSuccessDescription =
    successDescription ||
    `${userName} has been verified. A confirmation email and notification have been sent.`;

  return (
    <>
      {/* 1. Main Verify Checklist Dialog (Screens 2 & 3) */}
      <Dialog
        open={isOpen && !isSuccessOpen}
        onOpenChange={(open) => !open && onClose()}
      >
        <DialogPortal>
          <DialogOverlay onClick={onClose} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none">
            <div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-[#E3E3DC] p-5 sm:p-6 text-[#171713] pointer-events-auto transition-all animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Title and Dark Circular Close Button */}
              <div className="flex items-center justify-between pb-3">
                <h3 className="text-base font-bold text-[#171713] font-heading">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-7 h-7 rounded-full bg-[#171713] text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  aria-label="Close dialog"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <form onSubmit={handleVerify} className="mt-3 space-y-4">
                {/* Verification Items Checklist */}
                <div className="space-y-2.5">
                  {items.map((item) => {
                    const isChecked = selectedIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className="flex items-center justify-between p-3 rounded-xl border border-[#E3E3DC] bg-[#FCFCFA] hover:bg-[#F7F7F3] transition-colors cursor-pointer select-none"
                      >
                        <span className="text-xs font-semibold text-[#171713]">
                          {item.label}
                        </span>

                        {/* Orange Checkbox matching Figma screenshot */}
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center transition-all ${
                            isChecked
                              ? "bg-[#DC851F] border-2 border-[#DC851F] text-white"
                              : "border-2 border-[#DC851F] bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Submit Action: Transitions from sage-green disabled to dark green active */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isAllChecked || isSubmitting}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                      isAllChecked
                        ? "bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white"
                        : "bg-[#A1C6AF] text-white cursor-not-allowed opacity-85"
                    }`}
                  >
                    <span>
                      {isSubmitting
                        ? "Verifying..."
                        : submitButtonLabel}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DialogPortal>
      </Dialog>

      {/* 2. Verification Success Confirmation Dialog (Screen 4) */}
      {isSuccessOpen && (
        <Dialog open={isSuccessOpen} onOpenChange={(open) => !open && handleDone()}>
          <DialogPortal>
            <DialogOverlay onClick={handleDone} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none">
              <div
                role="dialog"
                aria-modal="true"
                className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-[#E3E3DC] p-5 text-[#171713] pointer-events-auto transition-all animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <h3 className="text-sm font-bold text-[#171713] font-heading">
                    {successTitle}
                  </h3>
                  <p className="text-xs text-[#85857B] mt-1.5 leading-relaxed font-body">
                    {resolvedSuccessDescription}
                  </p>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={handleDone}
                    className="px-5 py-2 rounded-xl bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </DialogPortal>
        </Dialog>
      )}
    </>
  );
}

export function VerifyIdentityDialog(props: VerifyIdentityDialogProps) {
  if (!props.isOpen) return null;
  return (
    <VerifyIdentityDialogInner
      key={props.userName + (props.title || "verify") + (props.isOpen ? "-open" : "-closed")}
      {...props}
    />
  );
}

export function VerifyVehicleDialog(
  props: Omit<VerifyIdentityDialogProps, "items"> & {
    items?: VerificationItem[];
  }
) {
  return (
    <VerifyIdentityDialog
      title="Verify Vehicle"
      submitButtonLabel="Verify Vehicle"
      successTitle="Vehicle Verified"
      successDescription={
        props.successDescription ||
        `Vehicle details and documents for ${props.userName} have been verified. A confirmation email and notification have been sent.`
      }
      items={props.items || DEFAULT_VEHICLE_VERIFICATION_ITEMS}
      {...props}
    />
  );
}
