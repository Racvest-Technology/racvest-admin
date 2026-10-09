"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  MessageSquare,
  MoreVertical,
  MapPin,
  Phone,
  Clock,
  AlertTriangle,
  Receipt,
  Package,
  Check,
  CheckCircle2,
  ChevronRight,
  ImageIcon,
} from "lucide-react";
import { DeliveryMap } from "./delivery-map";
import { DeliveryIssueDialog } from "./delivery-issue-dialog";
import { SendMessageDialog } from "@/components/shared/send-message-dialog";
import { DocumentPreviewDialog } from "@/components/shared/document-preview-dialog";
import { MOCK_DELIVERY_DETAIL, DeliveryDetailData } from "../data/mock-deliveries";

export interface DeliveryDetailViewProps {
  deliveryId?: string;
}

export function DeliveryDetailView({
  deliveryId = "RCV-29842",
}: DeliveryDetailViewProps) {
  const delivery: DeliveryDetailData = React.useMemo(() => {
    const formattedId = deliveryId.replace(/^#/, "");
    return {
      ...MOCK_DELIVERY_DETAIL,
      trackingId: formattedId,
    };
  }, [deliveryId]);

  // Dialog states
  const [isMessageOpen, setIsMessageOpen] = React.useState(false);
  const [messageRecipient, setMessageRecipient] = React.useState<{
    name: string;
    role: string;
    avatar: string;
  }>({
    name: "Sophia Chen & Ava Carter",
    role: "Parties involved in #RCV-29842",
    avatar: delivery.sender.avatar,
  });

  const [isIssueOpen, setIsIssueOpen] = React.useState(false);
  const [issueResolved, setIssueResolved] = React.useState(false);
  const [previewPhoto, setPreviewPhoto] = React.useState<{
    url: string;
    title: string;
  } | null>(null);

  // Toast message
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenPartyMessage = (party: "sender" | "courier") => {
    if (party === "sender") {
      setMessageRecipient({
        name: delivery.sender.name,
        role: "Sender · Lagos, Nigeria",
        avatar: delivery.sender.avatar,
      });
    } else {
      setMessageRecipient({
        name: delivery.courier.name,
        role: "Courier · Lagos, Nigeria",
        avatar: delivery.courier.avatar,
      });
    }
    setIsMessageOpen(true);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16 font-body">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="bg-[#014D21] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-xs font-semibold border border-white/20">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link
          href="/deliveries"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#171713] hover:text-[#014D21] transition-colors group"
        >
          <div className="w-8 h-8 rounded-full border border-[#E3E3DC] bg-white flex items-center justify-center group-hover:bg-[#F7F7F3] shadow-2xs">
            <ArrowLeft className="w-4 h-4 text-[#171713]" />
          </div>
          <span className="text-sm font-bold font-heading">Back to Delivery Management</span>
        </Link>

        {/* Top Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setMessageRecipient({
                name: `${delivery.sender.name} & ${delivery.courier.name}`,
                role: `Parties in #${delivery.trackingId}`,
                avatar: delivery.sender.avatar,
              });
              setIsMessageOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send Message to parties</span>
          </button>

          <button
            type="button"
            className="w-9 h-9 rounded-xl border border-[#E3E3DC] bg-white hover:bg-[#F7F7F3] text-[#171713] flex items-center justify-center shadow-2xs cursor-pointer transition-colors"
            aria-label="More actions"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2-Column Responsive Layout matching Figma */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Progress, Parties, Location, Map, Timelines */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Delivery Progress Card */}
          <div className="bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs">
            <h3 className="text-sm font-bold text-[#171713] font-heading mb-6">
              Delivery Progress
            </h3>

            {/* Horizontal Stepper matching Figma */}
            <div className="relative">
              {/* Connecting progress track line */}
              <div className="absolute top-3.5 left-6 right-6 h-0.5 bg-[#E3E3DC] z-0">
                <div className="h-full bg-[#DC851F] w-[75%]" />
              </div>

              <div className="relative z-10 grid grid-cols-5 gap-2 text-center">
                {delivery.progressSteps.map((step) => {
                  const isDone = step.status === "completed";
                  const isCurrent = step.status === "current";

                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      {/* Step Indicator Pin */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isDone
                            ? "bg-[#DC851F] text-white shadow-xs"
                            : isCurrent
                            ? "bg-white border-2 border-[#014D21] text-[#014D21]"
                            : "bg-white border-2 border-[#D5DBD6] text-[#85857B]"
                        }`}
                      >
                        {isDone ? (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        ) : isCurrent ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#014D21]" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[#D5DBD6]" />
                        )}
                      </div>

                      {/* Step Labels */}
                      <div className="mt-2.5">
                        <p
                          className={`text-xs font-bold font-heading ${
                            isDone || isCurrent ? "text-[#171713]" : "text-[#85857B]"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-[10px] text-[#85857B] mt-0.5 leading-tight">
                          {step.timestamp}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. Parties Information: Sender & Courier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sender Card */}
            <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#E3E3DC]">
                  <Image
                    src={delivery.sender.avatar}
                    alt={delivery.sender.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#171713] font-heading">
                    {delivery.sender.name}
                  </h4>
                  <p className="text-[11px] text-[#85857B] mt-0.5">
                    Sender ID #{delivery.sender.id}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#5A5A52] pt-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#85857B] shrink-0" />
                  <span>{delivery.sender.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#85857B] shrink-0" />
                  <span>{delivery.sender.phone}</span>
                </div>
              </div>

              <Link
                href="/users"
                className="w-full py-2 rounded-xl border border-[#E3E3DC] hover:bg-[#F7F7F3] text-xs font-semibold text-[#171713] text-center block transition-colors"
              >
                View Profile
              </Link>
            </div>

            {/* Courier Card */}
            <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#E3E3DC]">
                  <Image
                    src={delivery.courier.avatar}
                    alt={delivery.courier.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#171713] font-heading">
                    {delivery.courier.name}
                  </h4>
                  <p className="text-[11px] text-[#85857B] mt-0.5">
                    Courier ID #{delivery.courier.id}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#5A5A52] pt-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#85857B] shrink-0" />
                  <span>{delivery.courier.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#85857B] shrink-0" />
                  <span>{delivery.courier.phone}</span>
                </div>
              </div>

              <Link
                href="/users"
                className="w-full py-2 rounded-xl border border-[#E3E3DC] hover:bg-[#F7F7F3] text-xs font-semibold text-[#171713] text-center block transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>

          {/* 3. Location & Recipient Details */}
          <div className="bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs divide-y md:divide-y-0 md:divide-x divide-[#E3E3DC]">
              {/* Pickup Location */}
              <div className="md:pr-4">
                <span className="text-[11px] font-bold text-[#85857B] uppercase tracking-wider block mb-1">
                  Pickup Location
                </span>
                <p className="text-xs text-[#171713] font-medium leading-relaxed">
                  {delivery.pickupLocation.address}.
                  <span className="block text-[11px] text-[#85857B] font-semibold mt-0.5">
                    {delivery.pickupLocation.landmark}
                  </span>
                </p>
              </div>

              {/* Destination */}
              <div className="pt-4 md:pt-0 md:px-4">
                <span className="text-[11px] font-bold text-[#85857B] uppercase tracking-wider block mb-1">
                  Destination
                </span>
                <p className="text-xs text-[#171713] font-medium leading-relaxed">
                  {delivery.destination.address}.
                  <span className="block text-[11px] text-[#85857B] font-semibold mt-0.5">
                    {delivery.destination.landmark}
                  </span>
                </p>
              </div>

              {/* Recipient */}
              <div className="pt-4 md:pt-0 md:pl-4">
                <span className="text-[11px] font-bold text-[#85857B] uppercase tracking-wider block mb-1">
                  Recipient
                </span>
                <p className="text-xs font-bold text-[#171713] font-heading">
                  {delivery.recipient.name}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#5A5A52] mt-1">
                  <Phone className="w-3.5 h-3.5 text-[#85857B]" />
                  <span>{delivery.recipient.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Live Tracking Card (Interactive Map) */}
          <div className="bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#171713] font-heading">
                Live Tracking
              </h3>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E6F1EB] text-[#014D21] text-[10px] font-bold tracking-tight">
                <span className="w-1.5 h-1.5 rounded-full bg-[#014D21] animate-pulse" />
                <span>{delivery.liveTracking.lastUpdated}</span>
              </div>
            </div>

            <DeliveryMap
              courierName={delivery.courier.name}
              courierAvatar={delivery.courier.avatar}
              distanceLeft={delivery.liveTracking.courierDistanceText}
              currentLocation={delivery.liveTracking.currentLocation}
              estimatedArrival={delivery.liveTracking.estimatedArrival}
              distanceRemaining={delivery.liveTracking.distanceRemaining}
            />
          </div>

          {/* 5. Activity Timeline & Proof of Delivery Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Activity Timeline */}
            <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#85857B]" />
                <h3 className="text-sm font-bold text-[#171713] font-heading">
                  Activity Timeline
                </h3>
              </div>

              {/* Vertical Step Trail */}
              <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E3E3DC]">
                {delivery.timeline.map((event, idx) => (
                  <div key={idx} className="relative flex items-start gap-3">
                    {/* Dot */}
                    <div
                      className={`absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center border-2 bg-white ${
                        event.status === "completed"
                          ? "border-[#DC851F] bg-[#DC851F]"
                          : event.status === "current"
                          ? "border-[#014D21] bg-[#014D21]"
                          : "border-[#D5DBD6] bg-white"
                      }`}
                    >
                      {event.status === "completed" && (
                        <Check className="w-2 h-2 text-white stroke-[3]" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[11px] font-bold text-[#171713] leading-tight">
                          {event.title}
                        </span>
                        <span className="text-[10px] text-[#85857B] shrink-0 font-medium">
                          {event.time}
                        </span>
                      </div>
                      {event.description && (
                        <p className="text-[10.5px] text-[#85857B] mt-0.5 leading-snug">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Proof of Delivery Card */}
            <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#85857B]" />
                <h3 className="text-sm font-bold text-[#171713] font-heading">
                  Proof of Delivery
                </h3>
              </div>

              {/* Empty / In-Transit State */}
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#E3E3DC] rounded-xl bg-[#FCFCFA] min-h-[200px]">
                <div className="w-14 h-14 rounded-2xl bg-[#F7F7F3] border border-[#E3E3DC] flex items-center justify-center text-[#85857B] mb-3">
                  <ImageIcon className="w-7 h-7 text-[#A3A39A]" />
                </div>
                <h4 className="text-xs font-bold text-[#171713] font-heading">
                  Not yet delivered
                </h4>
                <p className="text-[11px] text-[#85857B] mt-1 max-w-[220px] leading-relaxed">
                  Proof of delivery will appear here once the delivery is completed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (4 cols): Summary, Issue, Payment, Package Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Delivery Summary Card */}
          <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E3E3DC]">
              <Receipt className="w-4 h-4 text-[#85857B]" />
              <h3 className="text-sm font-bold text-[#171713] font-heading">
                Delivery Summary
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Status</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#E6F1EB] text-[#014D21] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
                  {delivery.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Tracking ID</span>
                <span className="font-bold text-[#171713]">#{delivery.trackingId}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Courier</span>
                <div className="flex items-center gap-1.5 font-semibold text-[#171713]">
                  <div className="relative w-4 h-4 rounded-full overflow-hidden">
                    <Image
                      src={delivery.courier.avatar}
                      alt={delivery.courier.name}
                      fill
                      sizes="16px"
                      className="object-cover"
                    />
                  </div>
                  <span>{delivery.courier.name}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Sender</span>
                <div className="flex items-center gap-1.5 font-semibold text-[#171713]">
                  <div className="relative w-4 h-4 rounded-full overflow-hidden">
                    <Image
                      src={delivery.sender.avatar}
                      alt={delivery.sender.name}
                      fill
                      sizes="16px"
                      className="object-cover"
                    />
                  </div>
                  <span>{delivery.sender.name}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Created</span>
                <span className="font-semibold text-[#171713]">{delivery.createdDate}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Last Updated</span>
                <span className="font-semibold text-[#171713]">{delivery.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* 2. Delivery Issue Card */}
          {delivery.issue && !issueResolved && (
            <div className="bg-[#FEF2F0] border border-[#FCA5A5] rounded-2xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#FEECEC] text-[#DC2626] flex items-center justify-center">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-[#991B1B] font-heading">
                    Delivery Issue
                  </h4>
                </div>
                <span className="w-5 h-5 rounded-full bg-[#DC2626] text-white text-[10px] font-bold flex items-center justify-center">
                  {delivery.issue.count}
                </span>
              </div>

              <p className="text-xs text-[#7F1D1D] font-medium leading-relaxed">
                {delivery.issue.summary}
              </p>

              <button
                type="button"
                onClick={() => setIsIssueOpen(true)}
                className="w-full py-2 px-3 rounded-xl border border-[#F87171] bg-white hover:bg-[#FEF2F0] text-xs font-bold text-[#DC2626] flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>View Issue Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* 3. Payment Information Card */}
          <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E3E3DC]">
              <Receipt className="w-4 h-4 text-[#85857B]" />
              <h3 className="text-sm font-bold text-[#171713] font-heading">
                Payment Information
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Delivery Fee</span>
                <span className="font-bold text-[#171713]">{delivery.payment.fee}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Payment Status</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F1EB] text-[#014D21] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
                  {delivery.payment.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Payment Method</span>
                <span className="font-semibold text-[#171713]">{delivery.payment.method}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Transaction ID</span>
                <span className="font-mono text-[11px] font-semibold text-[#171713]">
                  {delivery.payment.transactionId}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Last Updated</span>
                <span className="font-semibold text-[#171713]">{delivery.payment.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* 4. Package Details Card */}
          <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E3E3DC]">
              <Package className="w-4 h-4 text-[#85857B]" />
              <h3 className="text-sm font-bold text-[#171713] font-heading">
                Package Details
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Tracking ID</span>
                <span className="font-bold text-[#171713]">#{delivery.packageDetails.type ? delivery.trackingId : ""}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Package Type</span>
                <span className="font-semibold text-[#171713]">{delivery.packageDetails.type}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Weight</span>
                <span className="font-semibold text-[#171713]">{delivery.packageDetails.weight}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Quantity</span>
                <span className="font-semibold text-[#171713]">{delivery.packageDetails.quantity}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Fragile</span>
                <span className="font-semibold text-[#171713]">{delivery.packageDetails.fragile ? "Yes" : "No"}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#85857B]">Perishable</span>
                <span className="font-semibold text-[#171713]">{delivery.packageDetails.perishable ? "Yes" : "No"}</span>
              </div>

              {/* Photos Gallery */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#85857B]">Photos</span>
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewPhoto({
                        url: delivery.packageDetails.photos[0],
                        title: "Package Item Photographs",
                      })
                    }
                    className="text-[11px] font-bold text-[#014D21] hover:underline cursor-pointer"
                  >
                    View all
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {delivery.packageDetails.photos.map((photo, i) => (
                    <div
                      key={i}
                      onClick={() =>
                        setPreviewPhoto({
                          url: photo,
                          title: `Package Item Photo ${i + 1}`,
                        })
                      }
                      className="relative h-14 rounded-xl overflow-hidden border border-[#E3E3DC] cursor-pointer group"
                    >
                      <Image
                        src={photo}
                        alt={`Package item ${i + 1}`}
                        fill
                        sizes="60px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reusable Send Message Dialog */}
      <SendMessageDialog
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        recipient={messageRecipient}
        defaultSubject={`Update on Delivery #${delivery.trackingId}`}
        defaultMessage={`Hello,\n\nRegarding delivery #${delivery.trackingId}, our operations team has noted your updates. Please let us know if you need assistance.`}
        onMessageSent={({ method }) => {
          showToast(`Message sent via ${method === "email" ? "email" : "push notification"}!`);
        }}
      />

      {/* Delivery Issue Resolution Dialog */}
      <DeliveryIssueDialog
        isOpen={isIssueOpen}
        onClose={() => setIsIssueOpen(false)}
        trackingId={`#${delivery.trackingId}`}
        issue={delivery.issue}
        onResolve={() => {
          setIssueResolved(true);
          showToast("Issue report marked as resolved.");
        }}
        onOpenMessage={handleOpenPartyMessage}
      />

      {/* Document/Photo Preview Modal */}
      {previewPhoto && (
        <DocumentPreviewDialog
          isOpen={!!previewPhoto}
          onClose={() => setPreviewPhoto(null)}
          image={previewPhoto.url}
          title={previewPhoto.title}
          showCompareButton={false}
        />
      )}
    </div>
  );
}
