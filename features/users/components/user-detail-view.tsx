"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Mail,
  MoreVertical,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Car,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Truck,
  Star,
  RotateCcw,
  Search,
  ChevronDown,
  Check,
  X,
  FileCheck,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MOCK_SENDERS,
  MOCK_TRAVELERS,
  MOCK_COURIERS,
} from "../data/mock-users";

export interface UserDetailViewProps {
  userId?: string;
  initialRole?: "sender" | "traveler" | "courier";
  initialVerified?: boolean;
}

export function UserDetailView({
  userId,
  initialRole = "sender",
  initialVerified,
}: UserDetailViewProps) {
  // Determine role
  const isCourier = initialRole === "courier";
  const isTraveler = initialRole === "traveler";
  const isSender = initialRole === "sender";

  // Match user from mock data or fall back to defaults matching screenshot
  const matchedUser = React.useMemo(() => {
    if (!userId) return null;
    const pool = isCourier
      ? MOCK_COURIERS
      : isTraveler
      ? MOCK_TRAVELERS
      : MOCK_SENDERS;
    return pool.find((u) => u.id === userId) || null;
  }, [userId, isCourier, isTraveler]);

  // Determine initial verification state
  // Default to false (Unverified / "Before verification") if initialVerified is explicitly false
  // or if matched user is Pending, or if initialVerified is not specified default to false as requested.
  const [isVerified, setIsVerified] = React.useState<boolean>(() => {
    if (initialVerified !== undefined) return initialVerified;
    if (matchedUser) {
      return matchedUser.verification === "Verified";
    }
    // Default to unverified so user can immediately view the "Before verification" state
    return false;
  });

  const [vehicleVerifiedOverride, setVehicleVerifiedOverride] = React.useState<boolean | null>(null);
  const vehicleVerified = vehicleVerifiedOverride !== null ? vehicleVerifiedOverride : isVerified;

  const handleToggleVerification = (val: boolean) => {
    setIsVerified(val);
    setVehicleVerifiedOverride(val);
  };

  const [activityFilter, setActivityFilter] = React.useState("all");

  // Interactive document viewer modal state
  const [viewingDocument, setViewingDocument] = React.useState<{
    title: string;
    image: string;
    type: string;
    documentNumber?: string;
    submittedDate?: string;
    isVerified?: boolean;
  } | null>(null);

  // Re-verification modal state
  const [reverificationModalOpen, setReverificationModalOpen] = React.useState(false);
  const [reverificationReason, setReverificationReason] = React.useState("blurry");
  const [reverificationNotes, setReverificationNotes] = React.useState("");

  // Toast feedback
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const backLink = isCourier
    ? "/users?tab=courier"
    : isTraveler
    ? "/users?tab=traveler"
    : "/users?tab=sender";

  const backLabel = isCourier
    ? "Back to Courier"
    : isTraveler
    ? "Back to Traveler"
    : "Back to senders";

  const userName =
    matchedUser?.name ||
    (isCourier
      ? "Samuel Adeyemi"
      : isTraveler
      ? "Lara O. Ibrahim"
      : "Liam Johnson");

  const userEmail =
    matchedUser?.email ||
    (isCourier
      ? "samueladeyemi@gmail.com"
      : isTraveler
      ? "laraoibrahim@gmail.com"
      : "liam.johnson@gmail.com");

  const userPhone = isCourier
    ? "+2348135894306"
    : isTraveler
    ? "+2348195804406"
    : "+2348136804206";

  const userAvatar =
    matchedUser?.avatar ||
    (isCourier
      ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
      : isTraveler
      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
      : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80");

  const livenessPhoto = isCourier
    ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
    : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80";

  const reviewedBy = isCourier ? "Adam Bello" : "Liam Johnson";

  const handleVerifyIdentity = () => {
    setIsVerified(true);
    setVehicleVerifiedOverride(true);
    showToast("User identity verified successfully! Account status updated.");
  };

  const handleVerifyDocuments = () => {
    setVehicleVerifiedOverride(true);
    showToast("Vehicle documents verified successfully!");
  };

  const handleSendReverification = (e: React.FormEvent) => {
    e.preventDefault();
    setReverificationModalOpen(false);
    showToast("Re-verification request dispatched to user.");
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16 font-body">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="bg-[#014D21] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-xs font-semibold border border-white/20">
            <Check className="w-4 h-4 bg-white/20 rounded-full p-0.5 text-white" />
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="ml-2 text-white/70 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 1. Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link
          href={backLink}
          className="flex items-center gap-2.5 text-xs font-bold text-[#171713] hover:text-[#014D21] transition-colors group"
        >
          <div className="w-8 h-8 rounded-full border border-[#E3E3DC] bg-white flex items-center justify-center group-hover:bg-[#F7F7F3] shadow-2xs">
            <ArrowLeft className="w-4 h-4 text-[#171713]" />
          </div>
          <span>{backLabel}</span>
        </Link>

        {/* State Toggle & Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick State Toggle for Admin Testing (Before / After verification) */}
          <div className="flex items-center bg-[#F2F2EC] p-1 rounded-xl border border-[#E3E3DC] text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => handleToggleVerification(false)}
              className={cn(
                "px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5",
                !isVerified
                  ? "bg-white text-[#DC2626] shadow-2xs font-bold"
                  : "text-[#85857B] hover:text-[#171713]"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  !isVerified ? "bg-[#DC2626]" : "bg-[#85857B]"
                )}
              />
              Before verification
            </button>
            <button
              type="button"
              onClick={() => handleToggleVerification(true)}
              className={cn(
                "px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5",
                isVerified
                  ? "bg-[#014D21] text-white shadow-2xs font-bold"
                  : "text-[#85857B] hover:text-[#171713]"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  isVerified ? "bg-white" : "bg-[#85857B]"
                )}
              />
              Verified
            </button>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Send Message</span>
          </button>

          <button
            type="button"
            className="w-9 h-9 rounded-xl border border-[#E3E3DC] bg-white flex items-center justify-center text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs"
            aria-label="More actions"
          >
            <MoreVertical className="w-4 h-4 text-[#85857B]" />
          </button>
        </div>
      </div>

      {/* 2. User Identity & Status Health Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: User Identity Card */}
        <div className="lg:col-span-7 bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs space-y-5">
          <div className="flex items-center gap-4">
            <Image
              src={userAvatar}
              alt={userName}
              width={64}
              height={64}
              unoptimized
              className="w-16 h-16 rounded-full object-cover ring-2 ring-[#014D21]/20 shadow-xs shrink-0"
            />
            <div>
              <h2 className="text-lg font-bold text-[#171713] font-heading">
                {userName}
              </h2>
              <span className="text-xs text-[#85857B] font-medium">
                {isCourier
                  ? "Courier · Lagos, Nigeria"
                  : isTraveler
                  ? "Traveler · Lagos, Nigeria"
                  : "Sender · Lagos, Nigeria"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs">
            <div className="flex items-center gap-2.5 text-[#5A5A52]">
              <Mail className="w-4 h-4 text-[#85857B] shrink-0" />
              <span className="text-[#85857B] w-14">Email</span>
              <span className="font-semibold text-[#171713] truncate">{userEmail}</span>
            </div>

            <div className="flex items-center gap-2.5 text-[#5A5A52]">
              <Phone className="w-4 h-4 text-[#85857B] shrink-0" />
              <span className="text-[#85857B] w-14">Phone</span>
              <span className="font-semibold text-[#171713]">{userPhone}</span>
            </div>

            <div className="flex items-center gap-2.5 text-[#5A5A52]">
              <MapPin className="w-4 h-4 text-[#85857B] shrink-0" />
              <span className="text-[#85857B] w-14">Location</span>
              <span className="font-semibold text-[#171713]">Lagos, Nigeria</span>
            </div>

            <div className="flex items-center gap-2.5 text-[#5A5A52]">
              <Calendar className="w-4 h-4 text-[#85857B] shrink-0" />
              <span className="text-[#85857B] w-14">Joined</span>
              <span className="font-semibold text-[#171713]">Oct 12, 2025</span>
            </div>

            <div className="flex items-center gap-2.5 text-[#5A5A52]">
              <CreditCard className="w-4 h-4 text-[#85857B] shrink-0" />
              <span className="text-[#85857B] w-14">User ID</span>
              <span className="font-semibold text-[#171713]">#RCV-29842</span>
            </div>

            {isCourier && (
              <div className="flex items-center gap-2.5 text-[#5A5A52]">
                <Car className="w-4 h-4 text-[#85857B] shrink-0" />
                <span className="text-[#85857B] w-14">Vehicle</span>
                <span className="font-semibold text-[#171713] truncate">Toyota · ABC-123-XY · Black</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Account Health & Trust Score Deck */}
        <div className="lg:col-span-5 bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="space-y-2.5">
            {/* Box 1: Account Status */}
            <div className="border border-[#E3E3DC] rounded-xl px-4 py-2.5 bg-white flex flex-col justify-center">
              <span className="text-[11px] text-[#85857B] font-medium">Account Status</span>
              <div className="mt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E6F1EB] text-[#014D21]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
                  Active
                </span>
              </div>
            </div>

            {/* Box 2: Verification Status */}
            <div className="border border-[#E3E3DC] rounded-xl px-4 py-2.5 bg-white flex flex-col justify-center">
              <span className="text-[11px] text-[#85857B] font-medium">Verification Status</span>
              <div className="mt-1">
                {isVerified ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E6F1EB] text-[#014D21]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEE2E2] text-[#DC2626]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                    Not Verified
                  </span>
                )}
              </div>
            </div>

            {/* Box 3: Risk Status */}
            <div className="border border-[#E3E3DC] rounded-xl px-4 py-2.5 bg-white flex flex-col justify-center">
              <span className="text-[11px] text-[#85857B] font-medium">Risk Status</span>
              <div className="mt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E6F1EB] text-[#014D21]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
                  Safe
                </span>
              </div>
            </div>
          </div>

          {/* Trust Score Banner */}
          <div className="bg-[#E6F1EB] text-[#014D21] p-3.5 rounded-xl flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#014D21] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-heading">
                {isVerified ? "Trust score 92/100" : "Trust score 100/100"}
              </h4>
              <p className="text-[11px] text-[#014D21]/80 mt-0.5">
                Excellent standing · 0 unresolved reports
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Metric Cards Deck + Wallet Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Metric Cards Grid */}
        <div className="lg:col-span-8">
          {isSender ? (
            /* Sender Metric Layout: 3 cards top, 2 cards bottom (Orange spans 2 columns) */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 h-full">
              {/* Card 1: Item sent */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Item sent</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">
                    {isVerified ? "142" : "0"}
                  </h3>
                </div>
              </div>

              {/* Card 2: Delivery success */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Delivery success</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">
                    {isVerified ? "98.5%" : "0%"}
                  </h3>
                </div>
              </div>

              {/* Card 3: Active Deliveries */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Active Deliveries</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">
                    {isVerified ? "3" : "0"}
                  </h3>
                </div>
              </div>

              {/* Card 4: Average Ratings */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#FFF4E5] text-[#DC851F] flex items-center justify-center">
                  <Star className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Average Ratings</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">
                    {isVerified ? "4.7" : "0.0"}
                  </h3>
                </div>
              </div>

              {/* Card 5: Total spent */}
              <div className="sm:col-span-2 bg-[#DC851F] text-[#11110F] p-4 rounded-2xl flex flex-col justify-between shadow-xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#11110F]" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#11110F]/80 font-medium">Total spent</span>
                  <h3 className="text-2xl font-bold font-heading">
                    {isVerified ? "₦100,000" : "₦0"}
                  </h3>
                </div>
              </div>
            </div>
          ) : (
            /* Traveler & Courier Metric Layout: 6 cards in 3x2 grid */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 h-full">
              {/* Card 1: Total Trips declared */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Total Trips declared</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">
                    {isVerified ? "142" : "0"}
                  </h3>
                </div>
              </div>

              {/* Card 2: Delivery completion rate */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Delivery completion rate</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">
                    {isVerified ? "97.4%" : "0.0%"}
                  </h3>
                </div>
              </div>

              {/* Card 3: Total package delivered */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Total package delivered</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">
                    {isVerified ? "612" : "0"}
                  </h3>
                </div>
              </div>

              {/* Card 4: Active Deliveries */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Active Deliveries</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">
                    {isVerified ? "3" : "0"}
                  </h3>
                </div>
              </div>

              {/* Card 5: Average Ratings */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#FFF4E5] text-[#DC851F] flex items-center justify-center">
                  <Star className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Average Ratings</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">
                    {isVerified ? "4.7" : "0.0"}
                  </h3>
                </div>
              </div>

              {/* Card 6: Total Earned */}
              <div className="bg-[#DC851F] text-[#11110F] p-4 rounded-2xl flex flex-col justify-between shadow-xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#11110F]" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#11110F]/80 font-medium">Total Earned</span>
                  <h3 className="text-2xl font-bold font-heading">
                    {isVerified ? "₦100,000" : "₦0"}
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Wallet Balance Deck */}
        <div className="lg:col-span-4 bg-[#01250F] text-white p-6 rounded-2xl shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full border-[18px] border-white/[0.04] pointer-events-none" />

          <div>
            <span className="text-xs text-white/70 font-medium">Wallet Balance</span>
            <h2 className="text-3xl font-extrabold tracking-tight font-heading mt-1">
              {isVerified ? (isSender ? "₦100,000" : "₦200,000") : "₦0"}
            </h2>

            {/* Sub-balances */}
            {isSender ? (
              <div className="mt-5 pt-3 border-t border-white/10">
                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3">
                  <span className="text-[11px] text-white/60 block">Refunds</span>
                  <p className="text-sm font-bold mt-0.5">₦0</p>
                </div>
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3">
                  <span className="text-[11px] text-white/60 block">Pending Earnings</span>
                  <p className="text-sm font-bold mt-0.5">₦0</p>
                </div>
                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3">
                  <span className="text-[11px] text-white/60 block">Refunded</span>
                  <p className="text-sm font-bold mt-0.5">₦0</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Freeze, Audit, Refresh */}
          <div className="flex items-center gap-2 mt-6">
            <button
              type="button"
              className="flex-1 py-2.5 rounded-xl bg-white text-[#171713] font-bold text-xs hover:bg-gray-100 transition-colors cursor-pointer shadow-xs"
            >
              Freeze
            </button>
            <button
              type="button"
              className="flex-1 py-2.5 rounded-xl border border-white/30 text-white font-semibold text-xs hover:bg-white/10 transition-colors cursor-pointer"
            >
              Audit
            </button>
            <button
              type="button"
              className="w-9 h-9 rounded-xl border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              title="Refresh wallet"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. KYC Documents & Account Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: KYC Verification Card */}
        <div className="lg:col-span-7 bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Government ID Preview Card (Authentic Nigerian National ID Card Layout) */}
            <div className="space-y-2.5">
              <div className="h-44 bg-[#F2F4F3] rounded-xl overflow-hidden border border-[#E3E3DC] relative p-3 flex flex-col justify-between shadow-inner">
                {/* NIN Top header */}
                <div className="flex items-center justify-between border-b border-[#014D21]/20 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-3 bg-[#014D21] rounded-2xs flex">
                      <div className="w-1/3 bg-[#014D21]" />
                      <div className="w-1/3 bg-white" />
                      <div className="w-1/3 bg-[#014D21]" />
                    </div>
                    <span className="text-[8px] font-extrabold text-[#014D21] tracking-tight uppercase">
                      FEDERAL REPUBLIC OF NIGERIA
                    </span>
                  </div>
                  <span className="text-[7px] text-[#85857B] font-semibold">NIMC</span>
                </div>

                {/* NIN Body */}
                <div className="flex items-center gap-2.5 py-1">
                  <div className="relative w-16 h-20 rounded-md overflow-hidden border border-[#014D21]/30 shrink-0 bg-[#E6F1EB]">
                    <Image
                      src={livenessPhoto}
                      alt="ID Photo"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 text-[8px] text-[#484840]">
                    <p className="font-extrabold text-[#014D21] text-[9px] tracking-wider">
                      1234 5678 901
                    </p>
                    <p><span className="text-[#85857B]">Surname:</span> OKORO</p>
                    <p><span className="text-[#85857B]">First Name:</span> AMARA</p>
                    <p><span className="text-[#85857B]">Date of Birth:</span> 01/01/1990</p>
                    <p><span className="text-[#85857B]">Place of Issue:</span> ABUJA</p>
                  </div>
                </div>

                {/* NIN Footer */}
                <div className="flex items-center justify-between text-[7px] text-[#85857B] border-t border-[#014D21]/20 pt-1">
                  <span>NATIONAL IDENTITY CARD</span>
                  <span>EXP: 09/01/2030</span>
                </div>
              </div>

              {/* Status and Action */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h4 className="text-xs font-bold text-[#171713]">Government ID</h4>
                  {isVerified ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#014D21] mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626] mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                      NOT VERIFIED
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setViewingDocument({
                      title: "Government National ID Card (NIN)",
                      image: livenessPhoto,
                      type: "Government Identification",
                      documentNumber: "1234 5678 901",
                      submittedDate: "Jan 14, 2024",
                      isVerified,
                    })
                  }
                  className="text-xs font-semibold text-[#014D21] hover:underline cursor-pointer"
                >
                  View Document
                </button>
              </div>
            </div>

            {/* Liveness Check Preview Card */}
            <div className="space-y-2.5">
              <div className="h-44 bg-[#F7F7F3] rounded-xl overflow-hidden border border-[#E3E3DC] relative">
                <Image
                  src={livenessPhoto}
                  alt="Liveness Check"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Status and Action */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h4 className="text-xs font-bold text-[#171713]">Liveness Check</h4>
                  {isVerified ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#014D21] mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
                      Passed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626] mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                      NOT VERIFIED
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setViewingDocument({
                      title: "Biometric Liveness Selfie Check",
                      image: livenessPhoto,
                      type: "Facial Match & Liveness Telemetry",
                      documentNumber: "LIV-8829-OK",
                      submittedDate: "Jan 14, 2024",
                      isVerified,
                    })
                  }
                  className="text-xs font-semibold text-[#014D21] hover:underline cursor-pointer"
                >
                  View Document
                </button>
              </div>
            </div>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E3E3DC] text-xs">
            <div>
              <span className="text-[#85857B] block text-[11px]">Government ID No</span>
              <span className="font-bold text-[#171713] mt-0.5 block">1234 5678 901</span>
            </div>
            <div>
              <span className="text-[#85857B] block text-[11px]">Reviewed by</span>
              <span className="font-bold text-[#171713] mt-0.5 block">{reviewedBy}</span>
            </div>
            <div>
              <span className="text-[#85857B] block text-[11px]">Verification Date</span>
              <span className="font-bold text-[#171713] mt-0.5 block">Jan 14, 2024</span>
            </div>
            <div>
              <span className="text-[#85857B] block text-[11px]">Last check</span>
              <span className="font-bold text-[#171713] mt-0.5 block">Feb 02, 2026</span>
            </div>
          </div>

          {/* Action Buttons: When Unverified, both buttons are shown */}
          {isVerified ? (
            <button
              type="button"
              onClick={() => setReverificationModalOpen(true)}
              className="w-full py-2.5 rounded-xl border border-[#E3E3DC] text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer text-center"
            >
              Request Re-Verification
            </button>
          ) : (
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => setReverificationModalOpen(true)}
                className="w-full py-2.5 rounded-xl border border-[#E3E3DC] text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer text-center"
              >
                Request Re-Verification
              </button>
              <button
                type="button"
                onClick={handleVerifyIdentity}
                className="w-full py-2.5 rounded-xl bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs text-center flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Verify Identity</span>
              </button>
            </div>
          )}
        </div>

        {/* Right: Account Activity */}
        <div className="lg:col-span-5 bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#171713] font-heading">
                Account Activity
              </h3>
              <button
                type="button"
                className="text-xs font-semibold text-[#014D21] hover:underline cursor-pointer"
              >
                View all
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap mt-3">
              {["all", "Deliveries", "Payment", "Account", "Verification"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActivityFilter(tab.toLowerCase())}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer capitalize",
                    activityFilter === tab.toLowerCase()
                      ? "bg-[#014D21] text-white"
                      : "bg-[#F7F7F3] text-[#66665D] hover:bg-[#EBEBE4]"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Body: Unverified Empty State vs Verified Timeline */}
          {!isVerified ? (
            /* Unverified Empty State */
            <div className="py-10 flex flex-col items-center justify-center text-center my-auto">
              <div className="w-14 h-14 rounded-full bg-[#FFF5EA] text-[#DC851F] border border-[#FDE5CC] flex items-center justify-center shadow-2xs">
                <RotateCcw className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h4 className="text-sm font-bold text-[#171713] mt-3.5 font-heading">
                No Account Activity yet
              </h4>
              <p className="text-xs text-[#85857B] text-center max-w-[280px] mt-1.5 leading-relaxed font-body">
                There is no activity to display for your search. New actions, verification updates, loans, payments and status will appear here
              </p>
            </div>
          ) : (
            /* Verified Timeline */
            <div className="space-y-3 pt-2 text-xs divide-y divide-[#E3E3DC]">
              <div className="pt-2 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-[#E6F1EB] text-[#014D21] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#85857B]">09:42</span>
                      <span className="font-bold text-[#171713]">
                        {isSender ? "Package #RCV-9021 created" : "Package delivered successfully"}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#85857B] mt-0.5">
                      Electronics · Lagos → Abuja · ₦10,000
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F7F7F3] text-[10px] font-semibold text-[#85857B] shrink-0">
                  Delivery <ChevronDown className="w-3 h-3 text-[#85857B]" />
                </span>
              </div>

              <div className="pt-2 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-[#E6F1EB] text-[#014D21] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#85857B]">09:31</span>
                      <span className="font-bold text-[#171713]">
                        Delivery Assigned to Jane Cooper
                      </span>
                    </div>
                    <p className="text-[11px] text-[#85857B] mt-0.5">
                      #RCV-9021 · Courier Accepted bid · ₦10,000
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F7F7F3] text-[10px] font-semibold text-[#85857B] shrink-0">
                  Delivery <ChevronDown className="w-3 h-3 text-[#85857B]" />
                </span>
              </div>

              <div className="pt-2 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-[#E6F1EB] text-[#014D21] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#85857B]">09:12</span>
                      <span className="font-bold text-[#171713]">User logged in</span>
                    </div>
                    <p className="text-[11px] text-[#85857B] mt-0.5">
                      Lagos, NG · iOS app · IP 197.210.x.x
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F7F7F3] text-[10px] font-semibold text-[#85857B] shrink-0">
                  Account <ChevronDown className="w-3 h-3 text-[#85857B]" />
                </span>
              </div>

              <div className="pt-2 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-[#E6F1EB] text-[#014D21] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#85857B]">09:12</span>
                      <span className="font-bold text-[#171713]">
                        {isSender ? "Payment Completed" : "Wallet payout released"}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#85857B] mt-0.5">
                      ₦40,000 · #RCV-9021 · Paystack
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F7F7F3] text-[10px] font-semibold text-[#85857B] shrink-0">
                  Payment <ChevronDown className="w-3 h-3 text-[#85857B]" />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Courier Specific: Vehicle Information Card */}
      {isCourier && (
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
                onClick={() => setReverificationModalOpen(true)}
                className="px-4 py-2 rounded-xl border border-[#E3E3DC] text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer"
              >
                Request Re-Verification
              </button>
              {!vehicleVerified && (
                <button
                  type="button"
                  onClick={handleVerifyDocuments}
                  className="px-4 py-2 rounded-xl bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Verify Documents</span>
                </button>
              )}
            </div>
          </div>

          {/* Grid of Details & Submitted Photo Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-1">
            {/* Box 1: VEHICLE NAME */}
            <div className="bg-[#FCFCFA] border border-[#E3E3DC] rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#85857B] tracking-wider block">
                  VEHICLE NAME
                </span>
                <h4 className="text-sm font-bold text-[#171713] font-heading mt-1">
                  Toyota
                </h4>
              </div>
              <div className="mt-3">
                {vehicleVerified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#014D21]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                    NOT VERIFIED
                  </span>
                )}
              </div>
            </div>

            {/* Box 2: PLATE NUMBER */}
            <div className="bg-[#FCFCFA] border border-[#E3E3DC] rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#85857B] tracking-wider block">
                  PLATE NUMBER
                </span>
                <h4 className="text-sm font-bold text-[#171713] font-mono mt-1">
                  ABC-123-XY
                </h4>
              </div>
              <div className="mt-3">
                <span className="text-[10px] text-[#85857B]">Lagos State Plate</span>
              </div>
            </div>

            {/* Box 3: VEHICLE COLOR */}
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

            {/* Box 4: Exterior Photo */}
            <div className="bg-[#FCFCFA] border border-[#E3E3DC] rounded-xl p-2.5 flex flex-col justify-between space-y-2">
              <div className="relative h-20 w-full rounded-lg overflow-hidden bg-[#E6F1EB]">
                <Image
                  src="https://images.unsplash.com/photo-1590362891991-f776e747a588?w=300&auto=format&fit=crop&q=80"
                  alt="Vehicle Exterior"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setViewingDocument({
                    title: "Vehicle Exterior Photograph",
                    image:
                      "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop&q=80",
                    type: "Vehicle Front & Side Inspection",
                    documentNumber: "Toyota RAV4 (Black)",
                    submittedDate: "Jan 14, 2024",
                    isVerified: vehicleVerified,
                  })
                }
                className="text-[11px] font-semibold text-[#014D21] hover:underline cursor-pointer text-center block w-full py-0.5"
              >
                View photo
              </button>
            </div>

            {/* Box 5: Driver's License */}
            <div className="bg-[#FCFCFA] border border-[#E3E3DC] rounded-xl p-2.5 flex flex-col justify-between space-y-2">
              <div className="relative h-20 w-full rounded-lg overflow-hidden bg-[#E6F1EB] border border-[#014D21]/20 p-2 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-extrabold text-[#014D21]">FRSC DRIVER LICENSE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-8 rounded bg-gray-300 relative overflow-hidden">
                    <Image
                      src={userAvatar}
                      alt="License portrait"
                      fill
                      unoptimized
                      className="object-cover"
                    />
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
                    setViewingDocument({
                      title: "Federal Road Safety Driver's License",
                      image: userAvatar,
                      type: "FRSC Commercial Driver's License",
                      documentNumber: "LAG-2983-DRV",
                      submittedDate: "Jan 14, 2024",
                      isVerified: vehicleVerified,
                    })
                  }
                  className="text-[11px] font-semibold text-[#014D21] hover:underline cursor-pointer text-center block w-full py-0.5"
                >
                  View photo
                </button>
              </div>
            </div>

            {/* Box 6: Vehicle Ownership */}
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
                    setViewingDocument({
                      title: "Certificate of Proof of Ownership (CMR)",
                      image:
                        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
                      type: "Central Motor Registry (CMR) Documentation",
                      documentNumber: "CMR-98214-LAG",
                      submittedDate: "Jan 14, 2024",
                      isVerified: vehicleVerified,
                    })
                  }
                  className="text-[11px] font-semibold text-[#014D21] hover:underline cursor-pointer text-center block w-full py-0.5"
                >
                  View photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Delivery History Table */}
      <div className="bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-sm font-bold text-[#171713] font-heading">
            Delivery History
          </h3>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Input */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search trips or tracking ID"
                className="w-full h-9 pl-3 pr-8 text-xs bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl text-[#171713] placeholder:text-[#85857B] focus:outline-none focus:ring-2 focus:ring-[#014D21]"
              />
              <Search className="w-3.5 h-3.5 text-[#85857B] absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] cursor-pointer"
            >
              <span>Last 90 days</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] cursor-pointer"
            >
              <span>All status</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#E3E3DC]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FCFCFA] border-b border-[#E3E3DC] text-[#85857B] uppercase tracking-wider text-[11px] font-semibold">
                <th className="py-3 px-4">Tracking ID</th>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">
                  {isSender ? "Carried By" : "Send By"}
                </th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">
                  {isSender ? "Amount" : "Earning"}
                </th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E3DC] bg-white">
              {!isVerified ? (
                /* Unverified Empty State matching Figma screenshot */
                <tr>
                  <td colSpan={8} className="py-14 text-center">
                    <div className="max-w-xs mx-auto flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#F7F7F3] border border-[#E3E3DC] flex items-center justify-center text-[#85857B] mb-2">
                        <Truck className="w-5 h-5 text-[#85857B]" />
                      </div>
                      <p className="text-xs font-bold text-[#171713]">
                        No Delivery History Yet
                      </p>
                      <p className="text-[11px] text-[#85857B] mt-0.5">
                        Deliveries and transactions will automatically populate once this account becomes active and completes orders.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                /* Verified Active Delivery Rows */
                <tr className="hover:bg-[#F7F7F3] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#171713]">#RCV-29841</td>
                  <td className="py-3 px-4 text-[#484840]">Electronics</td>
                  <td className="py-3 px-4 text-[#484840]">Abuja, FCT</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                        alt="Ava Carter"
                        width={24}
                        height={24}
                        unoptimized
                        className="w-6 h-6 rounded-full object-cover shrink-0"
                      />
                      <span className="font-medium text-[#171713]">Ava Carter</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E6F1EB] text-[#014D21]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
                      In Transit
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#171713]">
                    {isSender ? "₦100,000" : "₦10,000"}
                  </td>
                  <td className="py-3 px-4 text-[#85857B]">2 mins ago</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      className="text-xs font-semibold text-[#014D21] hover:underline cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Modal: Full Resolution Document Inspector */}
      {viewingDocument && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 border border-[#E3E3DC]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E3DC]">
              <div>
                <h3 className="text-base font-bold text-[#171713] font-heading">
                  {viewingDocument.title}
                </h3>
                <span className="text-xs text-[#85857B] font-medium">
                  {viewingDocument.type}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setViewingDocument(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#85857B] hover:text-[#171713] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document Image Showcase */}
            <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-neutral-900 border border-[#E3E3DC] shadow-inner flex items-center justify-center">
              <Image
                src={viewingDocument.image}
                alt={viewingDocument.title}
                fill
                unoptimized
                className="object-contain"
              />
            </div>

            {/* Document Metadata Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#F7F7F3] p-3.5 rounded-xl text-xs">
              <div>
                <span className="text-[#85857B] block text-[10px] uppercase font-semibold">
                  Reference ID
                </span>
                <span className="font-bold text-[#171713] mt-0.5 block font-mono">
                  {viewingDocument.documentNumber || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-[#85857B] block text-[10px] uppercase font-semibold">
                  Submitted
                </span>
                <span className="font-bold text-[#171713] mt-0.5 block">
                  {viewingDocument.submittedDate || "Recent"}
                </span>
              </div>
              <div>
                <span className="text-[#85857B] block text-[10px] uppercase font-semibold">
                  Status
                </span>
                <span
                  className={cn(
                    "font-bold mt-0.5 inline-block text-[11px]",
                    viewingDocument.isVerified ? "text-[#014D21]" : "text-[#DC2626]"
                  )}
                >
                  {viewingDocument.isVerified ? "● Verified / Passed" : "● Pending Review"}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setViewingDocument(null)}
                className="px-4 py-2 rounded-xl border border-[#E3E3DC] text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] cursor-pointer"
              >
                Close
              </button>
              {!viewingDocument.isVerified && (
                <button
                  type="button"
                  onClick={() => {
                    handleVerifyIdentity();
                    setViewingDocument(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#014D21] hover:bg-[#01451E] text-white text-xs font-semibold cursor-pointer shadow-xs"
                >
                  Approve Document
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 8. Modal: Request Re-Verification Reason Dialog */}
      {reverificationModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-[#E3E3DC]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E3DC]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#171713] font-heading">
                    Request Re-Verification
                  </h3>
                  <p className="text-xs text-[#85857B]">
                    Notify {userName} to resubmit documentation
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setReverificationModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#85857B] hover:text-[#171713] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendReverification} className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="font-bold text-[#171713] block">
                  Select Primary Reason:
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: "blurry", label: "Government ID is blurry or unreadable" },
                    { id: "mismatch", label: "Selfie does not match photo on government ID" },
                    { id: "expired", label: "Uploaded document is expired or invalidated" },
                    { id: "vehicle", label: "Vehicle registration / license plate mismatch" },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={cn(
                        "flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all",
                        reverificationReason === opt.id
                          ? "border-[#014D21] bg-[#E6F1EB]/30 text-[#014D21] font-semibold"
                          : "border-[#E3E3DC] text-[#484840] hover:bg-[#F7F7F3]"
                      )}
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={opt.id}
                        checked={reverificationReason === opt.id}
                        onChange={() => setReverificationReason(opt.id)}
                        className="text-[#014D21] focus:ring-[#014D21]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#171713] block">
                  Additional Notes for User (Optional):
                </label>
                <textarea
                  value={reverificationNotes}
                  onChange={(e) => setReverificationNotes(e.target.value)}
                  placeholder="Please retake your ID in a well-lit environment and ensure all 4 corners are visible."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-[#E3E3DC] bg-[#F7F7F3] text-xs text-[#171713] focus:outline-none focus:ring-2 focus:ring-[#014D21]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setReverificationModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E3E3DC] font-semibold text-[#171713] hover:bg-[#F7F7F3] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold cursor-pointer shadow-xs"
                >
                  Dispatch Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
