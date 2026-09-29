"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { Eye, Filter } from "lucide-react";
import { DeliveryItem } from "@/types/delivery";
import { mockDeliveries } from "@/lib/mock-data";
import {
  StatusBadge,
  TablePagination,
  TableToolbar,
} from "@/components/shared";

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
        item.from.toLowerCase().includes(locationFilter.toLowerCase()) ||
        item.destination.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesPackageType && matchesLocation;
    });
  }, [searchQuery, statusFilter, packageTypeFilter, locationFilter]);

  const columns = React.useMemo<ColumnDef<DeliveryItem>[]>(
    () => [
      {
        accessorKey: "trackNo",
        header: "TRACK NO",
        cell: (info) => (
          <span className="font-bold text-[#171713] text-xs">
            {info.getValue() as string}
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
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#F0F0EB] text-[#484840] text-[10px] font-bold flex items-center justify-center border border-[#E3E3DC]">
                {sender.initials}
              </div>
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
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#E6F1EB] text-[#014D21] text-[10px] font-bold flex items-center justify-center border border-[#9BC7AD]">
                {rider.initials}
              </div>
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#484840] hover:text-[#014D21] hover:bg-[#E6F1EB] transition-colors cursor-pointer"
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

  const totalPages = table.getPageCount();

  return (
    <div className="bg-white border border-[#E3E3DC] rounded-2xl p-4 shadow-2xs space-y-4 font-body">
      {/* Table Header Details */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-1">
        <div>
          <h3 className="text-sm font-bold text-[#171713] font-heading">
            Live Deliveries
          </h3>
          <p className="text-xs text-[#85857B] mt-0.5 font-body">
            Real-time active delivery and parcel tracking ledger
          </p>
        </div>
      </div>

      {/* DRY TableToolbar Component */}
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
              { label: "Delivered", value: "delivered" },
              { label: "In transit", value: "in transit" },
              { label: "Pending", value: "pending" },
              { label: "Picked Up", value: "picked up" },
              { label: "Cancelled", value: "cancelled" },
            ],
          },
          {
            id: "package-type-filter",
            value: packageTypeFilter,
            onChange: setPackageTypeFilter,
            options: [
              { label: "Package Type: All", value: "all" },
              { label: "Clothing", value: "clothing" },
              { label: "Furniture", value: "furniture" },
              { label: "Sports Equipment", value: "sports equipment" },
              { label: "Beauty Products", value: "beauty products" },
              { label: "Books", value: "books" },
              { label: "Groceries", value: "groceries" },
              { label: "Electronics", value: "electronics" },
            ],
          },
          {
            id: "location-filter",
            value: locationFilter,
            onChange: setLocationFilter,
            options: [
              { label: "Location: All", value: "all" },
              { label: "Lagos", value: "lagos" },
              { label: "Abuja", value: "abuja" },
              { label: "Kano", value: "kano" },
              { label: "Osun", value: "osun" },
              { label: "Ekiti", value: "ekiti" },
            ],
          },
        ]}
        buttons={[
          {
            label: "Date",
            hasDropdown: true,
          },
          {
            label: "Filter",
            icon: Filter,
          },
        ]}
      />

      {/* Styled Table matching User Management */}
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

      {/* DRY TablePagination Component */}
      <TablePagination
        currentPage={pageIndex}
        totalPages={Math.max(1, totalPages)}
        totalItems={data.length}
        pageSize={6}
        itemLabel="Deliveries"
        onPageChange={(page) => setPageIndex(page)}
      />
    </div>
  );
}
