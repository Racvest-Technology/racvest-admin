"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  UserPlus,
  Award,
  CheckCircle2,
  ChevronDown,
  Filter,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { UserItem } from "../types";
import {
  SENDER_STATS,
  TRAVELER_STATS,
  COURIER_STATS,
  MOCK_SENDERS,
  MOCK_TRAVELERS,
  MOCK_COURIERS,
} from "../data/mock-users";
import { cn } from "@/lib/utils";

interface RoleUsersViewProps {
  role: "sender" | "traveler" | "courier";
}

export function RoleUsersView({ role }: RoleUsersViewProps) {
  const stats =
    role === "sender"
      ? SENDER_STATS
      : role === "traveler"
      ? TRAVELER_STATS
      : COURIER_STATS;

  const initialData =
    role === "sender"
      ? MOCK_SENDERS
      : role === "traveler"
      ? MOCK_TRAVELERS
      : MOCK_COURIERS;

  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [activePage, setActivePage] = React.useState(1);
  const [selectedUserModal, setSelectedUserModal] = React.useState<UserItem | null>(null);

  const filteredData = React.useMemo(() => {
    return initialData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.codeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [initialData, searchQuery, statusFilter]);

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredData.map((d) => d.id)));
    }
  };

  const toggleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const roleLabel =
    role === "sender" ? "Sender" : role === "traveler" ? "Traveler" : "Courier";

  return (
    <div className="space-y-6">
      {/* 1. Top KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Role Card (Dark Green Card) */}
        <div className="bg-[#01250F] text-white p-5 rounded-2xl flex flex-col justify-between shadow-xs">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">
            <Users className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="text-xs text-white/70 font-medium font-body">
              {role === "courier" ? "Total Couriers" : `Total ${roleLabel}s`}
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold font-heading">
                {stats.total.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-[#69AA84] font-body">
                {stats.totalGrowth}
              </span>
            </div>
          </div>
        </div>

        {/* Active Role Card */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl flex flex-col justify-between shadow-2xs">
          <div className="w-9 h-9 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="text-xs text-[#85857B] font-medium font-body">
              {`Active ${roleLabel}s`}
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-[#171713] font-heading">
                {stats.active.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-[#014D21] font-body">
                {stats.activeGrowth}
              </span>
            </div>
          </div>
        </div>

        {/* Verified Role Card */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl flex flex-col justify-between shadow-2xs">
          <div className="w-9 h-9 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="text-xs text-[#85857B] font-medium font-body">
              {`Verified ${roleLabel}s`}
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-[#171713] font-heading">
                {stats.verified.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-[#014D21] font-body">
                {stats.verifiedGrowth}
              </span>
            </div>
          </div>
        </div>

        {/* New Role Today */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl flex flex-col justify-between shadow-2xs">
          <div className="w-9 h-9 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
            <UserPlus className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="text-xs text-[#85857B] font-medium font-body">
              {`New ${roleLabel} Today`}
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-[#171713] font-heading">
                {stats.todayCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Rating & Availability Banners matching Figma */}
      <div className={cn("grid gap-4", role === "courier" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
        {/* Rating Banner (Orange Accent) */}
        <div className="bg-[#DC851F] text-[#11110F] px-6 py-4 rounded-2xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center text-[#11110F]">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold font-heading">
              {`Average ${roleLabel} rating`}
            </span>
          </div>
          <span className="text-xl font-bold font-heading">
            {stats.averageRating ? `${stats.averageRating.toFixed(2)}/5.0` : "4.8/5.0"}
          </span>
        </div>

        {/* Courier-Only: Available Courier Banner (Dark Green) */}
        {role === "courier" && (
          <div className="bg-[#014D21] text-white px-6 py-4 rounded-2xl flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#29CC6A]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold font-heading">
                Available Courier
              </span>
            </div>
            <span className="text-xl font-bold font-heading">
              {stats.availableCouriers?.toLocaleString() || "20,400"}
            </span>
          </div>
        )}
      </div>

      {/* 3. Filter Row & Search Input */}
      <div className="bg-white border border-[#E3E3DC] rounded-2xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left: Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Status Dropdown Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none flex items-center gap-2 pl-3.5 pr-8 py-2 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs font-body focus:outline-none"
              >
                <option value="all">Status: All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="banned">Banned</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs font-body"
            >
              <span>Verification</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs font-body"
            >
              <span>{role === "courier" ? "Date Joined" : "Date"}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs font-body"
            >
              <span>Location</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#EBEBE4] transition-colors cursor-pointer shadow-2xs font-body"
            >
              <Filter className="w-3.5 h-3.5 text-[#85857B]" />
              <span>Filter</span>
            </button>
          </div>

          {/* Right: Search Input */}
          <div className="relative w-full lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Anything"
              className="w-full h-10 pl-4 pr-10 text-xs bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl text-[#171713] placeholder:text-[#85857B] focus:outline-none focus:ring-2 focus:ring-[#014D21] focus:bg-white transition-all font-body"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#85857B] pointer-events-none" />
          </div>
        </div>

        {/* 4. Table */}
        <div className="overflow-x-auto rounded-xl border border-[#E3E3DC]">
          <table className="w-full text-left border-collapse text-xs font-body">
            <thead>
              <tr className="bg-[#FCFCFA] border-b border-[#E3E3DC] text-[#85857B] uppercase tracking-wider text-[11px] font-semibold">
                <th className="py-3.5 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === filteredData.length && filteredData.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-[#014D21] focus:ring-[#014D21] cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-4 font-medium">User/Contact</th>
                <th className="py-3.5 px-4 font-medium">
                  {role === "courier" ? "Courier ID" : `${roleLabel.toUpperCase()} ID`}
                </th>
                <th className="py-3.5 px-4 font-medium">Location</th>
                <th className="py-3.5 px-4 font-medium">Verification</th>
                <th className="py-3.5 px-4 font-medium">Status</th>
                {role === "courier" && (
                  <th className="py-3.5 px-4 font-medium">Availability</th>
                )}
                <th className="py-3.5 px-4 font-medium">Risk</th>
                <th className="py-3.5 px-4 font-medium">Last Active</th>
                <th className="py-3.5 px-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E3DC] bg-white">
              {filteredData.map((item) => {
                const isSelected = selectedIds.has(item.id);

                return (
                  <tr
                    key={item.id}
                    className={cn(
                      "hover:bg-[#F7F7F3] transition-colors group",
                      isSelected && "bg-[#E6F1EB]/30"
                    )}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(item.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#014D21] focus:ring-[#014D21] cursor-pointer"
                      />
                    </td>

                    {/* User / Contact */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          width={32}
                          height={32}
                          unoptimized
                          className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-[#E3E3DC]"
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-[#171713] text-xs">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-[#85857B]">
                            {item.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Code ID */}
                    <td className="py-3 px-4 font-medium text-[#171713]">
                      {item.codeId}
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4 text-[#484840]">
                      {item.location}
                    </td>

                    {/* Verification Badge */}
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold",
                          item.verification === "Verified"
                            ? "bg-[#E6F1EB] text-[#014D21]"
                            : "bg-[#FFF8E7] text-[#D97706]"
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            item.verification === "Verified" ? "bg-[#014D21]" : "bg-[#D97706]"
                          )}
                        />
                        {item.verification}
                      </span>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold",
                          item.status === "Active" && "bg-[#E6F1EB] text-[#014D21]",
                          item.status === "Inactive" && "bg-[#F3E8FF] text-[#7E22CE]",
                          item.status === "Suspended" && "bg-[#FFF4E5] text-[#DC851F]",
                          item.status === "Banned" && "bg-[#FEF2F0] text-[#C83B2B]"
                        )}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Courier Availability Toggle */}
                    {role === "courier" && (
                      <td className="py-3 px-4">
                        <span
                          className={cn(
                            "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold",
                            item.availability === "On"
                              ? "bg-[#E6F1EB] text-[#014D21]"
                              : "bg-[#FFF4E5] text-[#DC851F]"
                          )}
                        >
                          {item.availability === "On" ? "● On" : "● Off"}
                        </span>
                      </td>
                    )}

                    {/* Risk Badge */}
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold",
                          item.risk === "Safe"
                            ? "bg-[#E6F1EB] text-[#014D21]"
                            : "bg-[#FEF2F0] text-[#C83B2B]"
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            item.risk === "Safe" ? "bg-[#014D21]" : "bg-[#C83B2B]"
                          )}
                        />
                        {item.risk}
                      </span>
                    </td>

                    {/* Last Active */}
                    <td className="py-3 px-4 text-[#85857B]">
                      {item.lastActive}
                    </td>

                    {/* Actions View Link */}
                    <td className="py-3 px-4 text-center">
                      <Link
                        href={`/users/${item.id}?role=${role}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#014D21] hover:bg-[#E6F1EB] transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#014D21]" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 5. Pagination Footer matching Figma */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2 text-xs font-body text-[#85857B]">
          <span>Showing 6 Of 2000 deliveries</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={activePage === 1}
              onClick={() => setActivePage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E3E3DC] text-[#171713] hover:bg-[#F7F7F3] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setActivePage(page)}
                className={cn(
                  "w-8 h-8 rounded-lg font-semibold text-xs transition-colors cursor-pointer",
                  activePage === page
                    ? "bg-[#014D21] text-white"
                    : "text-[#171713] hover:bg-[#F7F7F3]"
                )}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setActivePage((p) => p + 1)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E3E3DC] bg-[#014D21] text-white hover:bg-[#01451E] cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* User Details Modal (when View is clicked) */}
      {selectedUserModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 border border-[#E3E3DC]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E3DC]">
              <h3 className="text-base font-bold text-[#171713] font-heading">
                {`${roleLabel} Details`}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedUserModal(null)}
                className="text-[#85857B] hover:text-[#171713] cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4">
              <Image
                src={selectedUserModal.avatar}
                alt={selectedUserModal.name}
                width={56}
                height={56}
                unoptimized
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[#014D21]/20"
              />
              <div>
                <h4 className="text-sm font-bold text-[#171713] font-heading">
                  {selectedUserModal.name}
                </h4>
                <p className="text-xs text-[#85857B] font-body">
                  {selectedUserModal.email}
                </p>
                <span className="text-[11px] font-semibold text-[#014D21] font-mono mt-0.5 inline-block">
                  {selectedUserModal.codeId}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2 text-xs font-body">
              <div className="bg-[#F7F7F3] p-2.5 rounded-xl">
                <span className="text-[#85857B] block text-[11px]">Location</span>
                <span className="font-semibold text-[#171713]">
                  {selectedUserModal.location}
                </span>
              </div>
              <div className="bg-[#F7F7F3] p-2.5 rounded-xl">
                <span className="text-[#85857B] block text-[11px]">Verification</span>
                <span className="font-semibold text-[#171713]">
                  {selectedUserModal.verification}
                </span>
              </div>
              <div className="bg-[#F7F7F3] p-2.5 rounded-xl">
                <span className="text-[#85857B] block text-[11px]">Status</span>
                <span className="font-semibold text-[#171713]">
                  {selectedUserModal.status}
                </span>
              </div>
              <div className="bg-[#F7F7F3] p-2.5 rounded-xl">
                <span className="text-[#85857B] block text-[11px]">Risk Level</span>
                <span className="font-semibold text-[#171713]">
                  {selectedUserModal.risk}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedUserModal(null)}
                className="px-4 py-2 rounded-xl border border-[#E3E3DC] text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setSelectedUserModal(null)}
                className="px-4 py-2 rounded-xl bg-[#014D21] hover:bg-[#01451E] text-white text-xs font-semibold cursor-pointer"
              >
                Manage Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
