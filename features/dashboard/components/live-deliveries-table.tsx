"use client";

import * as React from "react";
import Image from "next/image";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import {
  Search,
  Download,
  Filter,
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { DeliveryItem } from "@/types/delivery";
import { mockDeliveries } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared";

export function LiveDeliveriesTable() {
  // Nuqs URL query state for search query and pagination
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault("")
  );
  const [statusFilter, setStatusFilter] = useQueryState(
    "status",
    parseAsString.withDefault("all")
  );
  const [pageIndex, setPageIndex] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );

  const [packageTypeFilter, setPackageTypeFilter] = React.useState<string>("all");
  const [locationFilter, setLocationFilter] = React.useState<string>("all");
  const [destinationFilter, setDestinationFilter] = React.useState<string>("all");

  // Filtered dataset based on search and filters
  const data = React.useMemo(() => {
    return mockDeliveries.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.trackNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.assignedTo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.destination.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        item.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesPackageType =
        packageTypeFilter === "all" ||
        item.packageType.toLowerCase() === packageTypeFilter.toLowerCase();

      const matchesLocation =
        locationFilter === "all" ||
        item.from.toLowerCase().includes(locationFilter.toLowerCase());

      const matchesDestination =
        destinationFilter === "all" ||
        item.destination.toLowerCase().includes(destinationFilter.toLowerCase());

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPackageType &&
        matchesLocation &&
        matchesDestination
      );
    });
  }, [
    searchQuery,
    statusFilter,
    packageTypeFilter,
    locationFilter,
    destinationFilter,
  ]);

  const columns = React.useMemo<ColumnDef<DeliveryItem>[]>(
    () => [
      {
        accessorKey: "trackNo",
        header: "TRACKING ID",
        cell: (info) => (
          <span className="font-semibold text-[#171713] text-xs">
            #{info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "packageType",
        header: "PACKAGE TYPE",
        cell: (info) => (
          <span className="text-[#5A5A52] text-xs font-medium">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "sender",
        header: "SENDER",
        cell: ({ row }) => {
          const sender = row.original.sender;
          return (
            <div className="flex items-center gap-2.5">
              {sender.avatar ? (
                <Image
                  src={sender.avatar}
                  alt={sender.name}
                  width={24}
                  height={24}
                  unoptimized
                  className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-[#E3E3DC]"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#F0F0EB] text-[#484840] text-[10px] font-bold flex items-center justify-center border border-[#E3E3DC]">
                  {sender.initials}
                </div>
              )}
              <span className="text-xs font-medium text-[#171713]">
                {sender.name}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "assignedTo",
        header: "ASSIGNED TO",
        cell: ({ row }) => {
          const rider = row.original.assignedTo;
          return (
            <div className="flex items-center gap-2.5">
              {rider.avatar ? (
                <Image
                  src={rider.avatar}
                  alt={rider.name}
                  width={24}
                  height={24}
                  unoptimized
                  className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-[#E3E3DC]"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#E6F1EB] text-[#014D21] text-[10px] font-bold flex items-center justify-center border border-[#9BC7AD]">
                  {rider.initials}
                </div>
              )}
              <span className="text-xs font-medium text-[#171713]">
                {rider.name}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "from",
        header: "FROM",
        cell: (info) => (
          <span className="text-[#484840] text-xs font-medium">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "destination",
        header: "DESTINATION",
        cell: (info) => (
          <span className="text-[#484840] text-xs font-medium">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "STATUS",
        cell: (info) => {
          const status = info.getValue() as string;
          return <StatusBadge status={status} />;
        },
      },
      {
        accessorKey: "lastUpdated",
        header: "LAST UPDATED",
        cell: (info) => (
          <span className="text-[#85857B] text-xs">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        id: "actions",
        header: "ACTIONS",
        cell: () => (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-[#484840] hover:text-[#014D21] hover:bg-[#E6F1EB] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#85857B]" />
            <span>View</span>
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: Math.max(0, pageIndex - 1),
        pageSize: 6,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const next = updater({
          pageIndex: Math.max(0, pageIndex - 1),
          pageSize: 6,
        });
        setPageIndex(next.pageIndex + 1);
      }
    },
  });

  return (
    <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs space-y-4 font-body">
      {/* 1. Header: Title + Search & Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#171713] font-heading">
            Live Deliveries
          </h3>
          <p className="text-xs text-[#85857B] mt-0.5 font-body">
            Real-time active delivery tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Anything"
              className="w-full h-9 pl-4 pr-9 text-xs bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl text-[#171713] placeholder:text-[#85857B] focus:outline-none focus:ring-1 focus:ring-[#014D21] font-body"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#85857B] pointer-events-none" />
          </div>

          {/* Export Button matching Figma Dark Green */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#01250F] hover:bg-[#013515] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0 font-body"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Row matching Figma */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none flex items-center gap-2 pl-3.5 pr-8 py-2 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs font-body focus:outline-none"
            >
              <option value="all">Status</option>
              <option value="delivered">Delivered</option>
              <option value="in transit">In transit</option>
              <option value="pending">Pending</option>
              <option value="picked up">Picked Up</option>
              <option value="disputed">Disputed</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Package Type Filter */}
          <div className="relative">
            <select
              value={packageTypeFilter}
              onChange={(e) => setPackageTypeFilter(e.target.value)}
              className="appearance-none flex items-center gap-2 pl-3.5 pr-8 py-2 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs font-body focus:outline-none"
            >
              <option value="all">Package Type</option>
              <option value="clothing">Clothing</option>
              <option value="furniture">Furniture</option>
              <option value="sports equipment">Sports Equipment</option>
              <option value="beauty products">Beauty Products</option>
              <option value="books">Books</option>
              <option value="groceries">Grocery</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Date Filter */}
          <button
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs font-body"
          >
            <span>Date</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
          </button>

          {/* Location 1 Filter */}
          <div className="relative">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="appearance-none flex items-center gap-2 pl-3.5 pr-8 py-2 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs font-body focus:outline-none"
            >
              <option value="all">Location1</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="akure">Akure</option>
              <option value="osun">Osun</option>
              <option value="abia">Abia</option>
              <option value="ebonyi">Ebonyi</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Destination Filter */}
          <div className="relative">
            <select
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              className="appearance-none flex items-center gap-2 pl-3.5 pr-8 py-2 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs font-body focus:outline-none"
            >
              <option value="all">Destination</option>
              <option value="lagos">Lagos</option>
              <option value="ekiti">Ekiti</option>
              <option value="abuja">Abuja</option>
              <option value="kano">Kano</option>
              <option value="benin">Benin</option>
              <option value="calabar">Calabar</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Right: Filter Action Button */}
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs font-body"
        >
          <Filter className="w-3.5 h-3.5 text-[#85857B]" />
          <span>Filter</span>
        </button>
      </div>

      {/* 3. Table */}
      <div className="overflow-x-auto rounded-xl border border-[#E3E3DC]">
        <table className="w-full text-left border-collapse text-xs font-body">
          <thead>
            <tr className="bg-[#FCFCFA] border-b border-[#E3E3DC] text-[#85857B] uppercase tracking-wider text-[11px] font-semibold">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-3.5 px-4 font-medium">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3E3DC] bg-white">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#F7F7F3] transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-3.5 px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-xs text-[#85857B]"
                >
                  No deliveries found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Pagination Footer matching Figma */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#85857B] pt-2 font-body">
        <span>Showing 6 Of 2000 deliveries</span>

        <div className="flex items-center gap-1.5">
          {/* Prev Button */}
          <button
            type="button"
            onClick={() => setPageIndex(Math.max(1, pageIndex - 1))}
            disabled={pageIndex <= 1}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E3E3DC] text-xs font-medium text-[#171713] hover:bg-[#F7F7F3] disabled:opacity-40 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          {/* Number 1 (Active Solid Dark Green) */}
          <button
            type="button"
            onClick={() => setPageIndex(1)}
            className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
              pageIndex === 1
                ? "bg-[#01250F] text-white font-bold"
                : "text-[#171713] hover:bg-[#F7F7F3]"
            }`}
          >
            1
          </button>

          {/* Number 2 */}
          <button
            type="button"
            onClick={() => setPageIndex(2)}
            className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
              pageIndex === 2
                ? "bg-[#01250F] text-white font-bold"
                : "text-[#171713] hover:bg-[#F7F7F3]"
            }`}
          >
            2
          </button>

          {/* Number 3 */}
          <button
            type="button"
            onClick={() => setPageIndex(3)}
            className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
              pageIndex === 3
                ? "bg-[#01250F] text-white font-bold"
                : "text-[#171713] hover:bg-[#F7F7F3]"
            }`}
          >
            3
          </button>

          {/* Next Button (Solid Dark Green with right arrow) */}
          <button
            type="button"
            onClick={() => setPageIndex(pageIndex + 1)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#01250F] text-white hover:bg-[#013515] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
