"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Calendar,
  Search,
  Filter,
  X,
  ChevronDown,
  Eye,
  ArrowLeftRight,
  RotateCw,
  Package,
  Clock,
  MessageSquare,
  CheckCircle2,
  Ban,
  XCircle,
  Check,
} from "lucide-react";
import {
  MOCK_BIDS,
  MATCHES_STATS,
  BidMatchItem,
  MatchStatus,
  MatchType,
} from "../data/mock-matches";
import { BidDetailDrawer } from "./bid-detail-drawer";
import { PageHeader, StatusBadge, TablePagination } from "@/components/shared";

export function BidsMatchesView() {
  const [selectedBid, setSelectedBid] = useState<BidMatchItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [routeFilter, setRouteFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState<"type" | "status" | "route" | "date" | null>(null);

  // Available routes for filter
  const routes = useMemo(() => {
    const list = Array.from(new Set(MOCK_BIDS.map((b) => b.route)));
    return ["All", ...list];
  }, []);

  const types: (string | MatchType)[] = ["All", "Traveler offer", "Trip Request", "Courier offer"];
  const statuses: (string | MatchStatus)[] = [
    "All",
    "Awaiting Decision",
    "Matched",
    "Withdrawn",
    "Accepted",
    "Unmatched Request",
  ];

  // Filtered bids
  const filteredBids = useMemo(() => {
    return MOCK_BIDS.filter((bid) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchId = bid.id.toLowerCase().includes(query) || bid.displayId.toLowerCase().includes(query);
        const matchDelivery =
          bid.deliveryId.toLowerCase().includes(query) ||
          bid.deliveryIdRaw.toLowerCase().includes(query);
        const matchSender = bid.sender.name.toLowerCase().includes(query);
        const matchCourier = bid.courier.name.toLowerCase().includes(query);
        if (!matchId && !matchDelivery && !matchSender && !matchCourier) {
          return false;
        }
      }

      // Type filter
      if (typeFilter !== "All" && bid.type !== typeFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== "All" && bid.status !== statusFilter) {
        return false;
      }

      // Route filter
      if (routeFilter !== "All" && bid.route !== routeFilter) {
        return false;
      }

      // Date filter
      if (dateFilter && !bid.deliveryDate.includes(dateFilter)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, typeFilter, statusFilter, routeFilter, dateFilter]);

  const totalPages = Math.ceil(filteredBids.length / pageSize) || 1;
  const paginatedBids = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredBids.slice(start, start + pageSize);
  }, [filteredBids, currentPage]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    typeFilter !== "All" ||
    statusFilter !== "All" ||
    routeFilter !== "All" ||
    dateFilter !== "";

  const handleResetFilters = () => {
    setSearchQuery("");
    setTypeFilter("All");
    setStatusFilter("All");
    setRouteFilter("All");
    setDateFilter("");
    setCurrentPage(1);
    setOpenDropdown(null);
  };

  const handleOpenBid = (bid: BidMatchItem) => {
    setSelectedBid(bid);
    setIsDrawerOpen(true);
  };

  const formatNaira = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };



  const renderTypeIcon = (type: MatchType) => {
    switch (type) {
      case "Traveler offer":
        return (
          <div className="flex items-center gap-1.5 text-xs text-neutral-700">
            <ArrowLeftRight className="w-3.5 h-3.5 text-neutral-500" />
            <span>Traveler offer</span>
          </div>
        );
      case "Trip Request":
        return (
          <div className="flex items-center gap-1.5 text-xs text-neutral-700">
            <RotateCw className="w-3.5 h-3.5 text-neutral-500" />
            <span>Trip Request</span>
          </div>
        );
      case "Courier offer":
        return (
          <div className="flex items-center gap-1.5 text-xs text-neutral-700">
            <Package className="w-3.5 h-3.5 text-neutral-500" />
            <span>Courier offer</span>
          </div>
        );
      default:
        return <span>{type}</span>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* DRY Page Header */}
      <PageHeader
        title="Bids & Matches"
        subtitle="Track bid activity and traveler matching across every open delivery."
        dateFilterLabel="Last 7days"
        onDateFilterClick={() => setOpenDropdown(openDropdown === "date" ? null : "date")}
        onRefresh={handleResetFilters}
        showDownloadReport={false}
      />

      {/* KPI Metric Cards */}
      {/* Row 1: 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Matching (Featured Dark Green Card) */}
        <div className="bg-[#062413] rounded-2xl p-5 text-white flex flex-col justify-between shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#0F351D] flex items-center justify-center text-amber-500">
              <ArrowLeftRight className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-300 font-medium">
              Active Matching
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-3xl font-bold tracking-tight">
                {MATCHES_STATS.activeMatching.count}
              </div>
              <span className="text-xs font-semibold text-emerald-400">
                {MATCHES_STATS.activeMatching.trend}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Successful Matches */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 font-medium">
              Successful Matches
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-3xl font-bold text-neutral-900 tracking-tight">
                {MATCHES_STATS.successfulMatches.count}
              </div>
              <span className="text-xs font-semibold text-emerald-600">
                {MATCHES_STATS.successfulMatches.trend}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Awaiting Decision */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 font-medium">
              Awaiting Decision
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-3xl font-bold text-neutral-900 tracking-tight">
                {MATCHES_STATS.awaitingDecision.count}
              </div>
              <span className="text-xs font-semibold text-emerald-600">
                {MATCHES_STATS.awaitingDecision.trend}
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Negotiating */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 font-medium">
              Negotiating
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-3xl font-bold text-neutral-900 tracking-tight">
                {MATCHES_STATS.negotiating.count}
              </div>
              <span className="text-xs font-semibold text-emerald-600">
                {MATCHES_STATS.negotiating.trend}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 5: Withdrawn */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-neutral-500 font-medium">
              Withdrawn
            </div>
            <div className="text-2xl font-bold text-neutral-900 mt-1">
              {MATCHES_STATS.withdrawn}
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
            <Ban className="w-4 h-4" />
          </div>
        </div>

        {/* Card 6: Avg Time to Match */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-neutral-500 font-medium">
              Avg Time to Match
            </div>
            <div className="text-2xl font-bold text-neutral-900 mt-1">
              {MATCHES_STATS.avgTimeToMatch}
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        {/* Card 7: Unmatched Requests */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-neutral-500 font-medium">
              Unmatched Requests
            </div>
            <div className="text-2xl font-bold text-neutral-900 mt-1">
              {MATCHES_STATS.unmatchedRequests}
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <XCircle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Matching Activity Table Container */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
        {/* Table Header Section */}
        <div className="p-5 border-b border-neutral-100 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-neutral-900">
                Matching Activity
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Every bid submitted across open delivery requests
              </p>
            </div>

            {/* Search Input matching Screenshot */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search delivery ID, user, bid ID..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-neutral-50/70 border border-neutral-200 rounded-xl pl-9 pr-9 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0A4D2E]/20 focus:border-[#0A4D2E] transition-all"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Bar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              {/* Type Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "type" ? null : "type")}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                    typeFilter !== "All"
                      ? "border-[#0A4D2E] bg-emerald-50 text-[#0A4D2E]"
                      : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  <span>{typeFilter === "All" ? "Type" : typeFilter}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {openDropdown === "type" && (
                  <div className="absolute left-0 mt-1.5 w-44 rounded-xl bg-white border border-neutral-200 shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                    {types.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setTypeFilter(t);
                          setOpenDropdown(null);
                          setCurrentPage(1);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center justify-between"
                      >
                        <span>{t === "All" ? "All Types" : t}</span>
                        {typeFilter === t && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "status" ? null : "status")}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                    statusFilter !== "All"
                      ? "border-[#0A4D2E] bg-emerald-50 text-[#0A4D2E]"
                      : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  <span>{statusFilter === "All" ? "Status" : statusFilter}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {openDropdown === "status" && (
                  <div className="absolute left-0 mt-1.5 w-48 rounded-xl bg-white border border-neutral-200 shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                    {statuses.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setStatusFilter(s);
                          setOpenDropdown(null);
                          setCurrentPage(1);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center justify-between"
                      >
                        <span>{s === "All" ? "All Statuses" : s}</span>
                        {statusFilter === s && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Route Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "route" ? null : "route")}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                    routeFilter !== "All"
                      ? "border-[#0A4D2E] bg-emerald-50 text-[#0A4D2E]"
                      : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  <span>{routeFilter === "All" ? "Route" : routeFilter}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {openDropdown === "route" && (
                  <div className="absolute left-0 mt-1.5 w-52 rounded-xl bg-white border border-neutral-200 shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                    {routes.map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          setRouteFilter(r);
                          setOpenDropdown(null);
                          setCurrentPage(1);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center justify-between"
                      >
                        <span>{r === "All" ? "All Routes" : r}</span>
                        {routeFilter === r && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Input Dropdown */}
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-neutral-700">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-transparent text-xs text-neutral-700 focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Reset Filter Button */}
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors ml-1"
                >
                  <span>Reset Filter</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter icon button on far right */}
            <div className="flex items-center">
              <button
                onClick={() => {
                  if (statusFilter === "All") {
                    setStatusFilter("Unmatched Request");
                  } else {
                    setStatusFilter("All");
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors"
              >
                <Filter className="w-3.5 h-3.5 text-neutral-500" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">BID ID</th>
                <th className="py-3.5 px-4 font-semibold">DELIVERY ID</th>
                <th className="py-3.5 px-4 font-semibold">SENDER</th>
                <th className="py-3.5 px-4 font-semibold">Carried by</th>
                <th className="py-3.5 px-4 font-semibold">BID AMOUNT</th>
                <th className="py-3.5 px-4 font-semibold">SENDER BUDGET</th>
                <th className="py-3.5 px-4 font-semibold">STATUS</th>
                <th className="py-3.5 px-4 font-semibold">TYPE</th>
                <th className="py-3.5 px-4 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {paginatedBids.length > 0 ? (
                paginatedBids.map((bid) => (
                  <tr
                    key={bid.id}
                    className="hover:bg-neutral-50/80 transition-colors group cursor-pointer"
                    onClick={() => handleOpenBid(bid)}
                  >
                    {/* BID ID */}
                    <td className="py-3.5 px-4 font-semibold text-neutral-900 whitespace-nowrap">
                      {bid.displayId}
                    </td>

                    {/* DELIVERY ID */}
                    <td className="py-3.5 px-4 text-neutral-600 font-medium whitespace-nowrap">
                      {bid.deliveryId}
                    </td>

                    {/* SENDER */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-7 h-7 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                          <Image
                            src={bid.sender.avatar}
                            alt={bid.sender.name}
                            fill
                            sizes="28px"
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium text-neutral-900">
                          {bid.sender.name}
                        </span>
                      </div>
                    </td>

                    {/* Carried by */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-7 h-7 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                          <Image
                            src={bid.courier.avatar}
                            alt={bid.courier.name}
                            fill
                            sizes="28px"
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium text-neutral-900">
                          {bid.courier.name}
                        </span>
                      </div>
                    </td>

                    {/* BID AMOUNT */}
                    <td className="py-3.5 px-4 font-medium text-neutral-900 whitespace-nowrap">
                      {formatNaira(bid.bidAmount)}
                    </td>

                    {/* SENDER BUDGET */}
                    <td className="py-3.5 px-4 font-medium text-neutral-600 whitespace-nowrap">
                      {formatNaira(bid.senderBudget)}
                    </td>

                    {/* STATUS */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={bid.status} />
                    </td>

                    {/* TYPE */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {renderTypeIcon(bid.type)}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenBid(bid);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-2 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-emerald-700" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-neutral-500">
                    <div className="max-w-xs mx-auto">
                      <p className="text-sm font-medium text-neutral-800">
                        No bids match your filters
                      </p>
                      <p className="text-xs text-neutral-400 mt-1">
                        Try modifying search keywords or resetting filters.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="mt-3 text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        Reset all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* DRY Table Pagination */}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredBids.length}
          pageSize={pageSize}
          countLabel={`Showing ${paginatedBids.length} Of ${filteredBids.length} result`}
          nextVariant="primary"
          onPageChange={setCurrentPage}
          className="p-4 border-t border-neutral-100"
        />
      </div>

      {/* Slide-over Drawer */}
      <BidDetailDrawer
        bid={selectedBid}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
