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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserDetailViewProps {
  userId?: string;
  initialRole?: "sender" | "traveler" | "courier";
}

export function UserDetailView({
  initialRole = "sender",
}: UserDetailViewProps) {
  const [activityFilter, setActivityFilter] = React.useState("all");

  const isCourier = initialRole === "courier";
  const isTraveler = initialRole === "traveler";
  const isSender = initialRole === "sender";

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

  const userName = isCourier
    ? "Samuel Adeyemi"
    : isTraveler
    ? "Lara O. Ibrahim"
    : "Liam Johnson";

  const userEmail = isCourier
    ? "samueladeyemi@gmail.com"
    : isTraveler
    ? "laraoibrahim@gmail.com"
    : "liam.johnson@gmail.com";

  const userPhone = isCourier
    ? "+2348135894306"
    : isTraveler
    ? "+2348195804406"
    : "+2348136804206";

  const userAvatar = isCourier
    ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
    : isTraveler
    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
    : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80";

  const reviewedBy = isSender ? "Liam Johnson" : "Adam Bello";

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16 font-body">
      {/* 1. Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          href={backLink}
          className="flex items-center gap-2.5 text-xs font-bold text-[#171713] hover:text-[#014D21] transition-colors group"
        >
          <div className="w-8 h-8 rounded-full border border-[#E3E3DC] bg-white flex items-center justify-center group-hover:bg-[#F7F7F3] shadow-2xs">
            <ArrowLeft className="w-4 h-4 text-[#171713]" />
          </div>
          <span>{backLabel}</span>
        </Link>

        {/* Right Actions: Send Message & More */}
        <div className="flex items-center gap-3">
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
              <span className="font-semibold text-[#171713]">Oct. 12, 2025</span>
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

        {/* Right: Account Health & Trust Score Deck (3 Bordered Boxes + Trust Banner) */}
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
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E6F1EB] text-[#014D21]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
                  Verified
                </span>
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
                Trust score 92/100
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
        {/* Metric Cards Grid: Sender has 5 cards (2 cols for orange card), Traveler/Courier have 6 cards */}
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
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">142</h3>
                </div>
              </div>

              {/* Card 2: Delivery success */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Delivery success</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">98.5%</h3>
                </div>
              </div>

              {/* Card 3: Active Deliveries */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Active Deliveries</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">3</h3>
                </div>
              </div>

              {/* Card 4: Average Ratings */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#FFF4E5] text-[#DC851F] flex items-center justify-center">
                  <Star className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Average Ratings</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">4.7</h3>
                </div>
              </div>

              {/* Card 5: Total spent (Spans 2 columns, Solid Orange #DC851F) */}
              <div className="sm:col-span-2 bg-[#DC851F] text-[#11110F] p-4 rounded-2xl flex flex-col justify-between shadow-xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#11110F]" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#11110F]/80 font-medium">Total spent</span>
                  <h3 className="text-2xl font-bold font-heading">₦100,000</h3>
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
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">142</h3>
                </div>
              </div>

              {/* Card 2: Delivery completion rate */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Delivery completion rate</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">97.4%</h3>
                </div>
              </div>

              {/* Card 3: Total package delivered */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Total package delivered</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">612</h3>
                </div>
              </div>

              {/* Card 4: Active Deliveries */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Active Deliveries</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">3</h3>
                </div>
              </div>

              {/* Card 5: Average Ratings */}
              <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl flex flex-col justify-between shadow-2xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-[#FFF4E5] text-[#DC851F] flex items-center justify-center">
                  <Star className="w-4 h-4" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#85857B] font-medium">Average Ratings</span>
                  <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">4.7</h3>
                </div>
              </div>

              {/* Card 6: Total Earned (Solid Orange #DC851F) */}
              <div className="bg-[#DC851F] text-[#11110F] p-4 rounded-2xl flex flex-col justify-between shadow-xs min-h-[110px]">
                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#11110F]" />
                </div>
                <div className="mt-3">
                  <span className="text-xs text-[#11110F]/80 font-medium">Total Earned</span>
                  <h3 className="text-2xl font-bold font-heading">₦100,000</h3>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Wallet Balance Deck (Dark Green Container #01250F) */}
        <div className="lg:col-span-4 bg-[#01250F] text-white p-6 rounded-2xl shadow-xs flex flex-col justify-between relative overflow-hidden">
          {/* Subtle decorative curved background element matching Figma */}
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full border-[18px] border-white/[0.04] pointer-events-none" />

          <div>
            <span className="text-xs text-white/70 font-medium">Wallet Balance</span>
            <h2 className="text-3xl font-extrabold tracking-tight font-heading mt-1">
              {isSender ? "₦100,000" : "₦200,000"}
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
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80"
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
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#014D21] mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
                    Verified
                  </span>
                </div>
                <button
                  type="button"
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
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80"
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
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#014D21] mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#014D21]" />
                    Passed
                  </span>
                </div>
                <button
                  type="button"
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

          <button
            type="button"
            className="w-full py-2.5 rounded-xl border border-[#E3E3DC] text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer text-center"
          >
            Request Re-Verification
          </button>
        </div>

        {/* Right: Account Activity Timeline */}
        <div className="lg:col-span-5 bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs space-y-4">
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

          {/* Filter Pills matching Figma */}
          <div className="flex items-center gap-1.5 flex-wrap">
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

          {/* Timeline List matching Figma */}
          <div className="space-y-3 pt-2 text-xs divide-y divide-[#E3E3DC]">
            {/* Activity 1 */}
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

            {/* Activity 2 */}
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

            {/* Activity 3 */}
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

            {/* Activity 4 */}
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

            {/* Activity 5 */}
            <div className="pt-2 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-md bg-[#E6F1EB] text-[#014D21] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#85857B]">09:12</span>
                    <span className="font-bold text-[#171713]">Verification approved</span>
                  </div>
                  <p className="text-[11px] text-[#85857B] mt-0.5">
                    Government Id · #RCV-9021 · Paystack
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F7F7F3] text-[10px] font-semibold text-[#85857B] shrink-0">
                Verification <ChevronDown className="w-3 h-3 text-[#85857B]" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Delivery History Table matching Figma */}
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
