"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  UserPlus,
  Award,
  CheckCircle2,
  Filter,
  Eye,
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
import {
  MetricCard,
  StatusBadge,
  TablePagination,
  TableToolbar,
} from "@/components/shared";

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
      : COURIER_STATS_DATA;

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

  const pageSize = 6;
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice((activePage - 1) * pageSize, activePage * pageSize);

  return (
    <div className="space-y-6">
      {/* 1. Top KPI Metric Cards (DRY MetricCard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Role Card (Dark Green Card) */}
        <MetricCard
          title={role === "courier" ? "Total Couriers" : `Total ${roleLabel}s`}
          value={stats.total.toLocaleString()}
          icon={Users}
          variant="hero"
          trend={stats.totalGrowth}
        />

        {/* Active Role Card */}
        <MetricCard
          title={`Active ${roleLabel}s`}
          value={stats.active.toLocaleString()}
          icon={Users}
          variant="standard"
          trend={stats.activeGrowth}
        />

        {/* Verified Role Card */}
        <MetricCard
          title={`Verified ${roleLabel}s`}
          value={stats.verified.toLocaleString()}
          icon={ShieldCheck}
          variant="standard"
          trend={stats.verifiedGrowth}
        />

        {/* New Role Today */}
        <MetricCard
          title={`New ${roleLabel} Today`}
          value={stats.todayCount}
          icon={UserPlus}
          variant="standard"
        />
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

      {/* 3. Filter Row & Search Input using TableToolbar */}
      <div className="bg-white border border-[#E3E3DC] rounded-2xl p-4 shadow-2xs space-y-4">
        <TableToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search Anything"
          selectFilters={[
            {
              id: "status-filter",
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { label: "Status: All", value: "all" },
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
                { label: "Suspended", value: "suspended" },
                { label: "Banned", value: "banned" },
              ],
            },
          ]}
          buttons={[
            { label: "Verification", hasDropdown: true },
            { label: role === "courier" ? "Date Joined" : "Date", hasDropdown: true },
            { label: "Location", hasDropdown: true },
            { label: "Filter", icon: Filter },
          ]}
        />

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
                    aria-label="Select all rows"
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
              {paginatedData.map((item) => {
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
                        aria-label={`Select ${item.name}`}
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
                      <StatusBadge status={item.verification} />
                    </td>

                    {/* Status Pill */}
                    <td className="py-3 px-4">
                      <StatusBadge status={item.status} />
                    </td>

                    {/* Courier Availability Toggle */}
                    {role === "courier" && (
                      <td className="py-3 px-4">
                        <StatusBadge status={item.availability === "On" ? "On" : "Off"} />
                      </td>
                    )}

                    {/* Risk Badge */}
                    <td className="py-3 px-4">
                      <StatusBadge status={item.risk} />
                    </td>

                    {/* Last Active */}
                    <td className="py-3 px-4 text-[#85857B]">
                      {item.lastActive}
                    </td>

                    {/* Actions View Link */}
                    <td className="py-3 px-4 text-center">
                      <Link
                        href={`/users/${item.id}?role=${role}&verified=${item.verification === "Verified"}`}
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

        {/* 5. Pagination Footer using DRY TablePagination */}
        <TablePagination
          currentPage={activePage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          pageSize={pageSize}
          itemLabel={`${roleLabel}s`}
          onPageChange={setActivePage}
        />
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

// Fallback alias for COURIER_STATS_DATA
const COURIER_STATS_DATA = MOCK_COURIERS;
