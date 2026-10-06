"use client";

import * as React from "react";
import Image from "next/image";
import { X, Info } from "lucide-react";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";

export interface SendMessageRecipient {
  name: string;
  role?: string;
  email?: string;
  avatar: string;
  location?: string;
}

export interface SendMessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: SendMessageRecipient;
  defaultSubject?: string;
  defaultMessage?: string;
  onMessageSent?: (payload: {
    recipient: SendMessageRecipient;
    method: "email" | "push";
    subject: string;
    message: string;
  }) => void;
}

function SendMessageDialogInner({
  isOpen,
  onClose,
  recipient,
  defaultSubject = "",
  defaultMessage = "",
  onMessageSent,
}: SendMessageDialogProps) {
  const [deliveryMethod, setDeliveryMethod] = React.useState<"email" | "push">("email");
  const [subject, setSubject] = React.useState(defaultSubject);
  const [message, setMessage] = React.useState(defaultMessage);
  const [isSentSuccessOpen, setIsSentSuccessOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const isFormValid = subject.trim().length > 0 && message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate sending network latency
    setTimeout(() => {
      setIsSubmitting(false);
      onMessageSent?.({
        recipient,
        method: deliveryMethod,
        subject,
        message,
      });
      // Transition to Screen 3 (Message Sent Success Modal)
      setIsSentSuccessOpen(true);
    }, 400);
  };

  const handleFinish = () => {
    setIsSentSuccessOpen(false);
    onClose();
  };

  return (
    <>
      {/* 1. Main Send Message Dialog (Screens 1 & 2) */}
      <Dialog
        open={isOpen && !isSentSuccessOpen}
        onOpenChange={(open) => !open && onClose()}
      >
        <DialogPortal>
          <DialogOverlay onClick={onClose} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none">
            <div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E3E3DC] p-5 sm:p-6 text-[#171713] pointer-events-auto transition-all animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar: Title, Subtitle, and Dark Circular Close Button */}
              <div className="flex items-start justify-between pr-8">
                <div>
                  <h3 className="text-base font-bold text-[#171713] font-heading">
                    Send Message
                  </h3>
                  <p className="text-xs text-[#85857B] mt-0.5">
                    Send a message directly to this user
                  </p>
                </div>
              </div>

              {/* Dark Circular Close Button matching Figma */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#171713] text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                aria-label="Close dialog"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                {/* Recipient Profile Card */}
                <div className="flex items-center gap-3 p-3 rounded-xl border border-[#E3E3DC] bg-[#FCFCFA]">
                  <Image
                    src={recipient.avatar}
                    alt={recipient.name}
                    width={36}
                    height={36}
                    unoptimized
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-[#014D21]/20 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-[#171713] truncate font-heading">
                      {recipient.name}
                    </h4>
                    <p className="text-[11px] text-[#85857B] truncate">
                      {recipient.role || recipient.email || "User"}
                    </p>
                  </div>
                </div>

                {/* Delivery Method Selector */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#85857B] tracking-wider block mb-2">
                    DELIVERY METHOD
                  </span>
                  <div className="flex items-center gap-5 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-[#171713]">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="email"
                        checked={deliveryMethod === "email"}
                        onChange={() => setDeliveryMethod("email")}
                        className="w-4 h-4 text-[#DC851F] accent-[#DC851F] cursor-pointer"
                      />
                      <span>Email</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer font-medium text-[#171713]">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="push"
                        checked={deliveryMethod === "push"}
                        onChange={() => setDeliveryMethod("push")}
                        className="w-4 h-4 text-[#DC851F] accent-[#DC851F] cursor-pointer"
                      />
                      <span>Push Notification</span>
                    </label>
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="message-subject"
                    className="text-[10px] uppercase font-bold text-[#85857B] tracking-wider block mb-1.5"
                  >
                    SUBJECT
                  </label>
                  <input
                    id="message-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter message subject"
                    className="w-full h-10 px-3.5 rounded-xl border border-[#E3E3DC] bg-[#FCFCFA] text-xs text-[#171713] placeholder:text-[#85857B] focus:outline-none focus:ring-2 focus:ring-[#014D21]"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message-body"
                    className="text-[10px] uppercase font-bold text-[#85857B] tracking-wider block mb-1.5"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="message-body"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full p-3.5 rounded-xl border border-[#E3E3DC] bg-[#FCFCFA] text-xs text-[#171713] placeholder:text-[#85857B] focus:outline-none focus:ring-2 focus:ring-[#014D21] resize-none leading-relaxed"
                  />
                </div>

                {/* Bottom Helper Info */}
                <div className="flex items-center gap-1.5 text-[10px] text-[#85857B] pt-0.5">
                  <Info className="w-3.5 h-3.5 text-[#85857B] shrink-0" />
                  <span>Users receive messages via email and in-app</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-3 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                    isFormValid
                      ? "bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white"
                      : "bg-[#A1C6AF] text-white cursor-not-allowed opacity-80"
                  }`}
                >
                  {isSubmitting ? "Sending message..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </DialogPortal>
      </Dialog>

      {/* 2. Message Sent Confirmation Dialog (Screen 3) */}
      {isSentSuccessOpen && (
        <Dialog open={isSentSuccessOpen} onOpenChange={(open) => !open && handleFinish()}>
          <DialogPortal>
            <DialogOverlay onClick={handleFinish} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none">
              <div
                role="dialog"
                aria-modal="true"
                className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-[#E3E3DC] p-5 text-[#171713] pointer-events-auto transition-all animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <h3 className="text-sm font-bold text-[#171713] font-heading">
                    Message Sent
                  </h3>
                  <p className="text-xs text-[#85857B] mt-1.5 leading-relaxed font-body">
                    Your message has been sent to {recipient.name} via{" "}
                    {deliveryMethod === "email" ? "email" : "push notification"}.
                  </p>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={handleFinish}
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

export function SendMessageDialog(props: SendMessageDialogProps) {
  if (!props.isOpen) return null;
  return (
    <SendMessageDialogInner
      key={props.recipient.name + (props.defaultSubject || "")}
      {...props}
    />
  );
}
