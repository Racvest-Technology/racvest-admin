"use client";

import * as React from "react";
import { X, Check, ArrowLeft } from "lucide-react";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";

export interface ReverificationItem {
  id: string;
  label: string;
  defaultChecked?: boolean;
}

export interface RequestReverificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  items?: ReverificationItem[];
  defaultReason?: string;
  onRequestSent?: (payload: {
    selectedItems: string[];
    reason: string;
  }) => void;
}

export const DEFAULT_IDENTITY_REVERIFY_ITEMS: ReverificationItem[] = [
  { id: "governmentId", label: "Government ID" },
  { id: "liveness", label: "Liveness Check" },
];

export const DEFAULT_VEHICLE_REVERIFY_ITEMS: ReverificationItem[] = [
  { id: "plateNumber", label: "Plate Number" },
  { id: "vehicleMake", label: "Vehicle Make" },
  { id: "vehiclePhoto", label: "Vehicle Photo" },
  { id: "driverLicense", label: "Valid Driver's License" },
  { id: "vehicleOwnership", label: "Vehicle Ownership" },
];

function RequestReverificationDialogInner({
  isOpen,
  onClose,
  userName = "User",
  items = DEFAULT_VEHICLE_REVERIFY_ITEMS,
  defaultReason = "",
  onRequestSent,
}: RequestReverificationDialogProps) {
  // Step 1: "select", Step 2: "reason", Step 3: "sent"
  const [step, setStep] = React.useState<"select" | "reason" | "sent">("select");
  const [selectedIds, setSelectedIds] = React.useState<string[]>(() =>
    items.filter((i) => i.defaultChecked).map((i) => i.id)
  );
  const [reason, setReason] = React.useState(defaultReason);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const hasSelected = selectedIds.length > 0;

  // Generate suggested reason if empty
  const handleProceedToReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSelected) return;

    if (!reason.trim()) {
      if (selectedIds.includes("plateNumber") || selectedIds.includes("vehicleMake")) {
        setReason(
          "The vehicle plate number in your submitted document does not match the vehicle information on your account. Please update and resubmit the correct document."
        );
      } else if (selectedIds.includes("governmentId") || selectedIds.includes("liveness")) {
        setReason(
          "Your government ID photo appears blurry or could not be verified against the liveness selfie check. Please capture a clear, well-lit photograph of your identification card and resubmit."
        );
      } else {
        setReason(
          "The submitted documentation requires clarification or updated files. Please review the highlighted items and resubmit your documents."
        );
      }
    }
    setStep("reason");
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onRequestSent?.({
        selectedItems: selectedIds,
        reason,
      });
      setStep("sent");
    }, 350);
  };

  const handleDone = () => {
    onClose();
  };

  return (
    <>
      {/* Step 1 & 2 Modal: Select Items & Enter Reason */}
      {step !== "sent" && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogPortal>
            <DialogOverlay onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none">
              <div
                role="dialog"
                aria-modal="true"
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E3E3DC] p-5 sm:p-6 text-[#171713] pointer-events-auto transition-all animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header: Title, Subtitle, and Dark Circular Close Button */}
                <div className="flex items-start justify-between pr-8">
                  <div>
                    <h3 className="text-base font-bold text-[#171713] font-heading">
                      Request Re-verification
                    </h3>
                    <p className="text-xs text-[#85857B] mt-0.5 leading-relaxed">
                      Select the information or documents the user needs to review and resubmit
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#171713] text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  aria-label="Close dialog"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Step 1 Content: Document Checklist */}
                {step === "select" && (
                  <form onSubmit={handleProceedToReason} className="mt-4 space-y-4">
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

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={!hasSelected}
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center cursor-pointer ${
                          hasSelected
                            ? "bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white"
                            : "bg-[#A1C6AF] text-white cursor-not-allowed opacity-85"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 2 Content: Reason Input */}
                {step === "reason" && (
                  <form onSubmit={handleSend} className="mt-4 space-y-4">
                    <div>
                      <label
                        htmlFor="reverification-reason"
                        className="text-[10px] uppercase font-bold text-[#85857B] tracking-wider block mb-1.5"
                      >
                        REASON
                      </label>
                      <textarea
                        id="reverification-reason"
                        rows={4}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter the reason for re-verification..."
                        className="w-full p-3.5 rounded-xl border border-[#E3E3DC] bg-[#FCFCFA] text-xs text-[#171713] placeholder:text-[#85857B] focus:outline-none focus:ring-2 focus:ring-[#014D21] resize-none leading-relaxed"
                        autoFocus
                      />
                    </div>

                    {/* Bottom Actions: Back and Send Request */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => setStep("select")}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#171713] hover:text-[#85857B] transition-colors cursor-pointer py-2 px-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        disabled={!reason.trim() || isSubmitting}
                        className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center cursor-pointer ${
                          reason.trim()
                            ? "bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white"
                            : "bg-[#A1C6AF] text-white cursor-not-allowed opacity-85"
                        }`}
                      >
                        {isSubmitting ? "Sending..." : "Send Request"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </DialogPortal>
        </Dialog>
      )}

      {/* Step 3 Modal: Re-verification request sent confirmation */}
      {step === "sent" && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleDone()}>
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
                    Re-verification request sent
                  </h3>
                  <p className="text-xs text-[#85857B] mt-1.5 leading-relaxed font-body">
                    {userName && userName !== "User"
                      ? `${userName} has been notified to review and resubmit the requested information.`
                      : "The user has been notified to review and resubmit the requested information."}
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

export function RequestReverificationDialog(props: RequestReverificationDialogProps) {
  if (!props.isOpen) return null;
  return (
    <RequestReverificationDialogInner
      key={props.userName + (props.isOpen ? "-open" : "-closed")}
      {...props}
    />
  );
}
