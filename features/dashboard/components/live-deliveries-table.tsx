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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockDeliveries } from "@/lib/mock-data";

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

      return matchesSearch && matchesStatus && matchesPackageType;
    });
  }, [searchQuery, statusFilter, packageTypeFilter]);

  const columns = React.useMemo<ColumnDef<DeliveryItem>[]>(
    () => [
      {
        accessorKey: "trackNo",
        header: "TRACK NO",
        cell: (info) => (
          <span className="font-semibold text-gray-900 text-xs">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "packageType",
        header: "PACKAGE TYPE",
        cell: (info) => (
          <span className="text-gray-600 text-xs">
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
              <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold flex items-center justify-center border border-gray-200">
                {sender.initials}
              </div>
              <span className="text-xs font-medium text-gray-900">
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
              <div className="w-6 h-6 rounded-full bg-[#E6F1EB] text-[#014D21] text-[10px] font-bold flex items-center justify-center border border-[#9BC7AD]">
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
          switch (status) {
            case "Delivered":
              return <Badge variant="delivered">Delivered</Badge>;
            case "In transit":
              return <Badge variant="inTransit">In transit</Badge>;
            case "Pending":
              return <Badge variant="pending">Pending</Badge>;
            case "Picked Up":
              return <Badge variant="pickedUp">Picked Up</Badge>;
            case "Cancelled":
              return <Badge variant="cancelled">Cancelled</Badge>;
            default:
              return <Badge variant="secondary">{status}</Badge>;
          }
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
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-[#484840] hover:text-[#014D21] hover:bg-[#E6F1EB] transition-colors"
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
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-xs overflow-hidden">
      {/* Table Header & Controls */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-base">
              Live Deliveries
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Real-time active delivery tracking
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Table Search Input */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Anything"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 text-xs bg-gray-50 border border-[#E3E3DC] rounded-lg text-[#171713] placeholder:text-[#A7A79D] focus:outline-none focus:ring-1 focus:ring-[#014D21]"
              />
            </div>

            {/* Export Button */}
            <Button variant="outline" size="sm" className="gap-1.5 text-xs h-9">
              <Download className="w-3.5 h-3.5 text-[#85857B]" />
              <span>Export</span>
            </Button>

            {/* Filter Button */}
            <Button variant="outline" size="sm" className="gap-1.5 text-xs h-9">
              <Filter className="w-3.5 h-3.5 text-[#85857B]" />
              <span>Filter</span>
            </Button>
          </div>
        </div>

        {/* Filter Pills Row */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#E3E3DC]">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              aria-label="Filter deliveries by status"
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-gray-50 hover:bg-gray-100 text-[#484840] text-xs font-medium pl-3 pr-7 py-1.5 rounded-lg border border-[#E3E3DC] focus:outline-none focus:ring-1 focus:ring-[#014D21] cursor-pointer"
            >
              <option value="all">Status: All</option>
              <option value="delivered">Delivered</option>
              <option value="in transit">In transit</option>
              <option value="pending">Pending</option>
              <option value="picked up">Picked Up</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Package Type Filter */}
          <div className="relative">
            <select
              value={packageTypeFilter}
              aria-label="Filter deliveries by package type"
              onChange={(e) => setPackageTypeFilter(e.target.value)}
              className="appearance-none bg-gray-50 hover:bg-gray-100 text-[#484840] text-xs font-medium pl-3 pr-7 py-1.5 rounded-lg border border-[#E3E3DC] focus:outline-none focus:ring-1 focus:ring-[#014D21] cursor-pointer"
            >
              <option value="all">Package Type: All</option>
              <option value="clothing">Clothing</option>
              <option value="furniture">Furniture</option>
              <option value="sports equipment">Sports Equipment</option>
              <option value="beauty products">Beauty Products</option>
              <option value="books">Books</option>
              <option value="groceries">Groceries</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Date Range Pill */}
          <div className="relative">
            <select
              aria-label="Filter deliveries by date range"
              className="appearance-none bg-gray-50 hover:bg-gray-100 text-[#484840] text-xs font-medium pl-3 pr-7 py-1.5 rounded-lg border border-[#E3E3DC] focus:outline-none focus:ring-1 focus:ring-[#014D21] cursor-pointer"
              defaultValue="today"
            >
              <option value="today">Date: Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Location Origin Pill */}
          <div className="relative">
            <select
              aria-label="Filter deliveries by origin location"
              className="appearance-none bg-gray-50 hover:bg-gray-100 text-[#484840] text-xs font-medium pl-3 pr-7 py-1.5 rounded-lg border border-[#E3E3DC] focus:outline-none focus:ring-1 focus:ring-[#014D21] cursor-pointer"
              defaultValue="all"
            >
              <option value="all">Location: All</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="kano">Kano</option>
              <option value="osun">Osun</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Destination Pill */}
          <div className="relative">
            <select
              aria-label="Filter deliveries by destination"
              className="appearance-none bg-gray-50 hover:bg-gray-100 text-[#484840] text-xs font-medium pl-3 pr-7 py-1.5 rounded-lg border border-[#E3E3DC] focus:outline-none focus:ring-1 focus:ring-[#014D21] cursor-pointer"
              defaultValue="all"
            >
              <option value="all">Destination: All</option>
              <option value="lagos">Lagos</option>
              <option value="ekiti">Ekiti</option>
              <option value="abuja">Abuja</option>
              <option value="benin">Benin</option>
              <option value="calabar">Calabar</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* TanStack Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-100 bg-gray-50/50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-3 px-4 text-[11px] font-semibold tracking-wider text-gray-400 uppercase"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-50">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50/70 transition-colors"
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
                  className="py-10 text-center text-sm text-gray-400"
                >
                  No deliveries found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <div>
          Showing <span className="font-semibold text-gray-900">{table.getRowModel().rows.length}</span> of{" "}
          <span className="font-semibold text-gray-900">2,000</span> Deliveries
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
              setPageIndex(Math.max(1, pageIndex - 1));
            }}
            disabled={!table.getCanPreviousPage()}
            className="h-8 px-2.5 text-xs text-gray-600"
          >
            <ChevronLeft className="w-3.5 h-3.5 mr-1" />
            Prev
          </Button>

          <Button
            variant={pageIndex === 1 ? "default" : "outline"}
            size="sm"
            onClick={() => setPageIndex(1)}
            className="h-8 w-8 p-0 text-xs"
          >
            1
          </Button>
          <Button
            variant={pageIndex === 2 ? "default" : "outline"}
            size="sm"
            onClick={() => setPageIndex(2)}
            className="h-8 w-8 p-0 text-xs"
          >
            2
          </Button>
          <Button
            variant={pageIndex === 3 ? "default" : "outline"}
            size="sm"
            onClick={() => setPageIndex(3)}
            className="h-8 w-8 p-0 text-xs"
          >
            3
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
              setPageIndex(pageIndex + 1);
            }}
            disabled={!table.getCanNextPage()}
            className="h-8 px-2.5 text-xs text-gray-600"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
