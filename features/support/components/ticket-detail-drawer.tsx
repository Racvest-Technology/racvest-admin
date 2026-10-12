"use client";

import * as React from "react";
import Image from "next/image";
import {
  X,
  MoreVertical,
  Package,
  Wallet,
  Lock,
  Paperclip,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { SupportTicket, SupportTicketMessage } from "../types";
import { cn } from "@/lib/utils";

interface TicketDetailDrawerProps {
  ticket: SupportTicket | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (ticketId: string, newStatus: SupportTicket["status"]) => void;
  onUpdatePriority?: (ticketId: string, newPriority: SupportTicket["priority"]) => void;
}

export function TicketDetailDrawer({
  ticket,
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdatePriority,
}: TicketDetailDrawerProps) {
  const [activeTab, setActiveTab] = React.useState<
    "conversation" | "context" | "timeline" | "resolution"
  >("conversation");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isInternalNote, setIsInternalNote] = React.useState(false);
  const [replyText, setReplyText] = React.useState("");
  const [messages, setMessages] = React.useState<SupportTicketMessage[]>(
    ticket?.messages || []
  );
  const [currentPriority, setCurrentPriority] = React.useState<SupportTicket["priority"]>(
    ticket?.priority || "High"
  );
  const [currentStatus, setCurrentStatus] = React.useState<SupportTicket["status"]>(
    ticket?.status || "In Progress"
  );

  if (!isOpen || !ticket) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg: SupportTicketMessage = {
      id: `m-${Date.now()}`,
      sender: isInternalNote
        ? "Amara Okafor(Internal Note - Support Only)"
        : "Amara Okafor",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: replyText.trim(),
      isInternal: isInternalNote,
    };

    setMessages((prev) => [...prev, newMsg]);
    setReplyText("");
    setIsInternalNote(false);
  };

  const handlePriorityChange = (p: SupportTicket["priority"]) => {
    setCurrentPriority(p);
    if (onUpdatePriority) onUpdatePriority(ticket.id, p);
  };

  const handleStatusChange = (s: SupportTicket["status"]) => {
    setCurrentStatus(s);
    if (onUpdateStatus) onUpdateStatus(ticket.id, s);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl lg:max-w-3xl bg-white shadow-2xl border-l border-[#E3E3DC] flex flex-col justify-between overflow-hidden">
          {/* Top Header */}
          <div className="p-6 border-b border-[#E3E3DC] space-y-4 bg-white shrink-0">
            {/* Top row: Ticket ID, Badges, More actions, Close */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-base font-bold font-heading text-[#171713]">
                  {ticket.ticketNumber}
                </span>

                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                    currentStatus === "In Progress"
                      ? "bg-[#ECFDF3] text-[#16A34A] border-[#D1FAE0]"
                      : currentStatus === "Resolved"
                      ? "bg-[#F7F7F3] text-[#85857B] border-[#E3E3DC]"
                      : currentStatus === "Waiting"
                      ? "bg-[#EFF6FA] text-[#0284C7] border-[#DCECF3]"
                      : "bg-[#FFF8E7] text-[#D97706] border-[#FDECC8]"
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {currentStatus}
                </span>

                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                    currentPriority === "High"
                      ? "bg-[#FEF2F0] text-[#EF4444] border-[#FDE0DB]"
                      : currentPriority === "Medium"
                      ? "bg-[#ECFDF3] text-[#10B981] border-[#D1FAE0]"
                      : "bg-[#F7F7F3] text-[#85857B] border-[#E3E3DC]"
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {currentPriority}
                </span>
              </div>

              <div className="flex items-center gap-2 relative">
                {/* 3-dots more menu */}
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="w-8 h-8 rounded-lg hover:bg-[#F7F7F3] flex items-center justify-center text-[#85857B] hover:text-[#171713] transition-colors cursor-pointer"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-8 top-0 w-44 bg-white border border-[#E3E3DC] rounded-xl shadow-lg z-30 py-1 font-body text-xs text-[#171713]">
                    <button
                      type="button"
                      onClick={() => {
                        alert("Assign Agent dialog triggered");
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#F7F7F3] cursor-pointer"
                    >
                      Assign Agent
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        alert("Information request sent to user");
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#F7F7F3] cursor-pointer"
                    >
                      Request Info
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        alert("Ticket escalated to Dispatch Supervisor");
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#F7F7F3] text-[#C83B2B] cursor-pointer"
                    >
                      Escalate
                    </button>
                    <div className="h-px bg-[#E3E3DC] my-1" />
                    <button
                      type="button"
                      onClick={() => {
                        handleStatusChange("Resolved");
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#F7F7F3] font-semibold text-[#16A34A] cursor-pointer"
                    >
                      Resolve Case
                    </button>
                  </div>
                )}

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg hover:bg-[#F7F7F3] flex items-center justify-center text-[#85857B] hover:text-[#171713] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Row 2: Title and Priority / Status dropdowns */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#171713] font-heading">
                  {ticket.fullSubject || ticket.subject}
                </h2>
                <div className="flex items-center gap-3 text-xs text-[#85857B] mt-1 font-body">
                  <span>
                    Category: <strong className="text-[#171713] font-semibold">{ticket.category}</strong>
                  </span>
                  <span>•</span>
                  <span>Created: {ticket.fullCreatedAt || ticket.createdAtFormatted}</span>
                </div>
              </div>

              {/* Priority & Status Controls */}
              <div className="flex items-center gap-3 shrink-0">
                <div>
                  <span className="text-[11px] text-[#85857B] block font-body mb-0.5">
                    Priority
                  </span>
                  <select
                    value={currentPriority}
                    onChange={(e) =>
                      handlePriorityChange(e.target.value as SupportTicket["priority"])
                    }
                    className="px-2.5 py-1.5 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] cursor-pointer focus:outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <span className="text-[11px] text-[#85857B] block font-body mb-0.5">
                    Status
                  </span>
                  <select
                    value={currentStatus}
                    onChange={(e) =>
                      handleStatusChange(e.target.value as SupportTicket["status"])
                    }
                    className="px-2.5 py-1.5 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] cursor-pointer focus:outline-none"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Waiting">Waiting</option>
                    <option value="Open">Open</option>
                  </select>
                </div>
              </div>
            </div>

            {/* User & Delivery Summary Box (2 cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Left Box: Customer profile */}
              <div className="border border-[#E3E3DC] rounded-xl p-3.5 bg-white flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#E3E3DC]">
                    <Image
                      src={ticket.customerAvatar}
                      alt={ticket.customerName}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#171713] font-heading">
                        {ticket.customerName}
                      </span>
                      {ticket.isVerified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#16A34A] bg-[#DCFCE7] px-1.5 py-0.2 rounded-full">
                          ● Verified
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#85857B] font-mono block mt-0.5">
                      {ticket.customerId || "#RCV-29842"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Opening profile for ${ticket.customerName}`)}
                  className="mt-3 w-full py-1.5 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer text-center"
                >
                  View profile
                </button>
              </div>

              {/* Right Box: Delivery & Escrow context */}
              <div className="border border-[#E3E3DC] rounded-xl p-3.5 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#171713]">
                    <Package className="w-3.5 h-3.5 text-[#0B331E]" />
                    <span>Delivery: {ticket.linkedDelivery?.orderCode || "RCV-92831"}</span>
                  </div>
                  <p className="text-[11px] text-[#66665D] mt-1 line-clamp-1 font-body">
                    {ticket.linkedDelivery?.description ||
                      "MacBook Pro M3 Max & Electronics • Victoria Island → Maitama"}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#F0F0EB] flex items-center gap-1.5 text-xs font-semibold text-[#D97706]">
                  <Wallet className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    Escrow: {ticket.linkedDelivery?.escrowAmount || "₦ 12,000.00"} ({ticket.linkedDelivery?.escrowStatus || "Pending Escrow"})
                  </span>
                </div>
              </div>
            </div>

            {/* Drawer Sub-tabs */}
            <div className="flex items-center gap-6 border-b border-[#E3E3DC] pt-1 -mb-6 text-xs font-medium text-[#66665D]">
              {(
                [
                  { id: "conversation", label: "Conversation" },
                  { id: "context", label: "Context" },
                  { id: "timeline", label: "Timeline" },
                  { id: "resolution", label: "Resolution" },
                ] as const
              ).map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "pb-2.5 transition-colors cursor-pointer border-b-2 font-medium",
                      isActive
                        ? "border-[#0B331E] text-[#0B331E] font-bold"
                        : "border-transparent hover:text-[#171713]"
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 bg-white space-y-4">
            {/* 1. Conversation Tab */}
            {activeTab === "conversation" && (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "rounded-xl p-4 text-xs font-body space-y-1.5 border",
                      msg.isInternal
                        ? "bg-[#FFF8E7] border-[#FDECC8] text-amber-950"
                        : "bg-white border-[#E3E3DC] text-[#171713]"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        {msg.isInternal && <Lock className="w-3.5 h-3.5 text-[#D97706]" />}
                        <span className={msg.isInternal ? "text-[#92400E]" : "text-[#171713]"}>
                          {msg.sender}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#85857B]">{msg.time}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Context Tab */}
            {activeTab === "context" && (
              <div className="space-y-4">
                {/* Customer Message */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#171713]">
                    <MessageSquare className="w-4 h-4 text-[#16A34A]" />
                    <span>Customer message</span>
                  </div>
                  <div className="bg-[#FCFCFA] border border-[#E3E3DC] rounded-xl p-4 text-xs text-[#484840] leading-relaxed italic font-body">
                    &ldquo;{ticket.customerMessage ||
                      "My package was supposed to arrive today, but the recipient has not received it. The delivery is overdue, and I haven't received a clear update from the traveller. The package contains valuable items, and I'm concerned about its safety. Please investigate and let me know what is happening."}&rdquo;
                  </div>
                </div>

                {/* Linked Delivery Context */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#171713]">
                    <Package className="w-4 h-4 text-[#16A34A]" />
                    <span>Linked Delivery Context</span>
                  </div>
                  <div className="bg-[#FCFCFA] border border-[#E3E3DC] rounded-xl p-4 text-xs space-y-2 font-body text-[#171713]">
                    <div className="flex justify-between border-b border-[#F0F0EB] pb-2">
                      <span className="text-[#85857B]">Package:</span>
                      <span className="font-semibold">{ticket.linkedDelivery?.description || "MacBook Pro M3 Max & Electronics"}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#F0F0EB] pb-2">
                      <span className="text-[#85857B]">Tracking #:</span>
                      <span className="font-mono font-semibold">{ticket.linkedDelivery?.trackingCode || "TRK-902941-89D"}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#F0F0EB] pb-2">
                      <span className="text-[#85857B]">Courier / Traveler:</span>
                      <span className="font-semibold">{ticket.linkedDelivery?.courierName || "John Okafor"} ({ticket.linkedDelivery?.courierPhone || "+234 812 345 6789"})</span>
                    </div>
                    <div className="flex justify-between border-b border-[#F0F0EB] pb-2">
                      <span className="text-[#85857B]">Pickup:</span>
                      <span className="font-semibold">{ticket.linkedDelivery?.pickup || "Victoria Island, Lagos, Nigeria"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#85857B]">Destination:</span>
                      <span className="font-semibold">{ticket.linkedDelivery?.destination || "Maitama, Abuja, Nigeria"}</span>
                    </div>
                  </div>
                </div>

                {/* Linked Payment Escrow Context */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#171713]">
                    <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                    <span>Linked Payment Escrow Context</span>
                  </div>
                  <div className="bg-[#FCFCFA] border border-[#E3E3DC] rounded-xl p-4 text-xs space-y-2 font-body text-[#171713]">
                    <div className="flex justify-between border-b border-[#F0F0EB] pb-2">
                      <span className="text-[#85857B]">Transaction ID:</span>
                      <span className="font-mono font-semibold">{ticket.linkedDelivery?.transactionId || "TXN-38192"}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#F0F0EB] pb-2">
                      <span className="text-[#85857B]">Amount:</span>
                      <span className="font-semibold text-[#16A34A]">{ticket.linkedDelivery?.escrowAmount || "₦ 12,000.00"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#85857B]">Status:</span>
                      <span className="font-semibold text-[#D97706]">{ticket.linkedDelivery?.escrowStatus || "Pending Escrow"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Timeline Tab */}
            {activeTab === "timeline" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#171713] font-heading">Activity</h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E3E3DC]">
                  {ticket.timeline && ticket.timeline.length > 0 ? (
                    ticket.timeline.map((item) => (
                      <div key={item.id} className="relative">
                        <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center text-white">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                        </div>
                        <div className="text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#171713]">{item.title}</span>
                            <span className="text-[#85857B] text-[11px]">{item.time}</span>
                          </div>
                          <p className="text-[#66665D] mt-0.5">{item.subtitle}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#85857B]">No timeline events recorded yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* 4. Resolution Tab */}
            {activeTab === "resolution" && (
              <div className="space-y-4 bg-[#FCFCFA] p-5 rounded-2xl border border-[#E3E3DC]">
                <h3 className="text-sm font-bold text-[#171713] font-heading">
                  Resolve and Finalize Case
                </h3>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#171713]">
                    Resolution Outcome
                  </label>
                  <select className="w-full p-2.5 bg-white border border-[#E3E3DC] rounded-xl text-xs font-medium text-[#171713] focus:outline-none">
                    <option>Transit Delay Explained &amp; Confirmed with Receiver</option>
                    <option>Escrow Payment Released to Traveler</option>
                    <option>Partial Courier Surcharge Waiver Granted</option>
                    <option>Insurance Claim Approved &amp; Refunded</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#171713]">
                    Resolution Summary / Customer Communication
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter resolution notes and confirmation details sent to the user..."
                    className="w-full p-3 bg-white border border-[#E3E3DC] rounded-xl text-xs text-[#171713] focus:outline-none focus:ring-1 focus:ring-[#0B331E]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-xs text-[#66665D] cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded accent-[#0B331E]" />
                    <span>Send confirmation email &amp; in-app notification to customer</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      handleStatusChange("Resolved");
                      alert("Case resolved and customer notified.");
                      onClose();
                    }}
                    className="px-4 py-2 bg-[#0B331E] hover:bg-[#062414] text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Resolve &amp; Close Ticket
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Fixed Footer: Reply input for Conversation */}
          {activeTab === "conversation" && (
            <div className="p-4 border-t border-[#E3E3DC] bg-white space-y-2 shrink-0">
              <div className="flex items-center justify-between text-xs text-[#66665D]">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isInternalNote}
                    onChange={(e) => setIsInternalNote(e.target.checked)}
                    className="rounded accent-[#0B331E]"
                  />
                  <Lock className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Post as internal Note (private to support Team)</span>
                </label>

                <button
                  type="button"
                  onClick={() => alert("Attach evidence dialog triggered")}
                  className="flex items-center gap-1 text-[#66665D] hover:text-[#171713] cursor-pointer"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Attach Evidence</span>
                </button>
              </div>

              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={
                    isInternalNote
                      ? "Type internal note (only visible to support agents)..."
                      : "Type response to customer..."
                  }
                  className={cn(
                    "flex-1 px-4 py-2.5 rounded-xl text-xs focus:outline-none border transition-colors",
                    isInternalNote
                      ? "bg-[#FFF8E7] border-[#FDECC8] text-[#92400E] placeholder-[#B45309]"
                      : "bg-[#F7F7F3] border-[#E3E3DC] text-[#171713] placeholder-[#85857B] focus:ring-1 focus:ring-[#0B331E]"
                  )}
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#0B331E] hover:bg-[#062414] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
