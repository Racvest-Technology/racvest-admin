"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Filter,
  Eye,
  ChevronDown,
  Package,
  Truck,
  Clock,
  AlertTriangle,
  XCircle,
  Ban,
  Box,
} from "lucide-react";
import { mockDeliveries } from "@/lib/mock-data";
import { PageHeader, StatusBadge, TablePagination } from "@/components/shared";

export function DeliveryManagementView() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("all");
  const [selectedPackageType, setSelectedPackageType] = React.useState("all");
  const [selectedDate, setSelectedDate] = React.useState("7d");

  const handleRefresh = () => {
    // Refresh deliveries state
  };

  const filteredDeliveries = React.useMemo(() => {
    return mockDeliveries.filter((d) => {
      const matchSearch =
        !searchQuery ||
        d.trackNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.assignedTo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.packageType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        selectedStatus === "all" ||
        d.status.toLowerCase().replace(/\s+/g, "-") === selectedStatus.toLowerCase();

      const matchPackage =
        selectedPackageType === "all" ||
        d.packageType.toLowerCase() === selectedPackageType.toLowerCase();

      return matchSearch && matchStatus && matchPackage;
    });
  }, [searchQuery, selectedStatus, selectedPackageType]);



  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16 font-body">
      {/* 1. DRY Page Header with Title and Global Actions */}
      <PageHeader
        title="Delivery Management"
        subtitle="Monitor and manage all deliveries across the platform."
        dateFilterLabel={selectedDate === "7d" ? "Last 7days" : "Last 30days"}
        onDateFilterClick={() => setSelectedDate(selectedDate === "7d" ? "30d" : "7d")}
        onRefresh={handleRefresh}
        downloadLabel="Download report"
      />

      {/* 2. 8 KPI Metric Cards (2 rows of 4 matching Figma) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Deliveries (Dark green background card) */}
        <div className="bg-[#062413] text-white p-5 rounded-2xl shadow-sm border border-[#0A3D20] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#DC851F]">
              <Package className="w-4 h-4 text-[#DC851F]" />
            </div>
            <span className="text-[11px] font-bold text-[#4ADE80] font-heading">+8.4%</span>
          </div>
          <div className="mt-4">
            <span className="text-xs text-[#A1C6AF] font-medium">Total Deliveries</span>
            <h3 className="text-2xl font-bold text-white mt-0.5 font-heading">32,480</h3>
          </div>
        </div>

        {/* Card 2: Active Deliveries */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
              <Box className="w-4 h-4 text-[#014D21]" />
            </div>
            <span className="text-[11px] font-bold text-[#16A34A] font-heading">+6.4%</span>
          </div>
          <div className="mt-4">
            <span className="text-xs text-[#85857B] font-medium">Active Deliveries</span>
            <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">4,215</h3>
          </div>
        </div>

        {/* Card 3: Awaiting Pickup */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#FDF4E9] text-[#DC851F] flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#DC851F]" />
            </div>
            <span className="text-[11px] font-bold text-[#DC851F] font-heading">+5.7%</span>
          </div>
          <div className="mt-4">
            <span className="text-xs text-[#85857B] font-medium">Awaiting Pickup</span>
            <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">612</h3>
          </div>
        </div>

        {/* Card 4: In Transit */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#EDF5FD] text-[#2563EB] flex items-center justify-center">
              <Truck className="w-4 h-4 text-[#2563EB]" />
            </div>
            <span className="text-[11px] font-bold text-[#16A34A] font-heading">+8.4%</span>
          </div>
          <div className="mt-4">
            <span className="text-xs text-[#85857B] font-medium">In Transit</span>
            <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">1,340</h3>
          </div>
        </div>

        {/* Card 5: Completed Deliveries */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
              <Box className="w-4 h-4 text-[#014D21]" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-[#85857B] font-medium">Completed Deliveries</span>
            <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">24,908</h3>
          </div>
        </div>

        {/* Card 6: Disputed */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#FEECEC] text-[#DC2626] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-[#85857B] font-medium">Disputed</span>
            <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">67</h3>
          </div>
        </div>

        {/* Card 7: Canceled */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#FEECEC] text-[#DC2626] flex items-center justify-center">
              <XCircle className="w-4 h-4 text-[#DC2626]" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-[#85857B] font-medium">Canceled</span>
            <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">318</h3>
          </div>
        </div>

        {/* Card 8: Failed Deliveries */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#F3F4F6] text-[#6B7280] flex items-center justify-center">
              <Ban className="w-4 h-4 text-[#6B7280]" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-[#85857B] font-medium">Failed Deliveries</span>
            <h3 className="text-2xl font-bold text-[#171713] mt-0.5 font-heading">41</h3>
          </div>
        </div>
      </div>

      {/* 3. All Deliveries Table Container */}
      <div className="bg-white border border-[#E3E3DC] rounded-2xl shadow-2xs overflow-hidden">
        {/* Table Top Header: Title + Search */}
        <div className="p-5 border-b border-[#E3E3DC] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-[#171713] font-heading">
              All Deliveries
            </h2>
            <p className="text-xs text-[#85857B] mt-0.5 font-medium">
              Real-time active delivery tracking
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Anything"
              className="w-full h-9.5 pl-3.5 pr-9 text-xs bg-[#F7F7F3] border border-transparent rounded-xl text-[#171713] placeholder:text-[#85857B] focus:outline-none focus:ring-2 focus:ring-[#014D21] focus:bg-white transition-all"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#85857B] pointer-events-none" />
          </div>
        </div>

        {/* Filter Toolbar matching Figma */}
        <div className="px-5 py-3 border-b border-[#E3E3DC] bg-[#FCFCFA] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-8 px-2.5 rounded-lg border border-[#E3E3DC] bg-white text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] focus:outline-none focus:ring-1 focus:ring-[#014D21] cursor-pointer"
            >
              <option value="all">Status</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="picked-up">Picked Up</option>
              <option value="pending">Pending</option>
              <option value="disputed">Disputed</option>
            </select>

            {/* Package Type Filter */}
            <select
              value={selectedPackageType}
              onChange={(e) => setSelectedPackageType(e.target.value)}
              className="h-8 px-2.5 rounded-lg border border-[#E3E3DC] bg-white text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] focus:outline-none focus:ring-1 focus:ring-[#014D21] cursor-pointer"
            >
              <option value="all">Package Type</option>
              <option value="clothing">Clothing</option>
              <option value="furniture">Furniture</option>
              <option value="sports equipment">Sports Equipment</option>
              <option value="beauty products">Beauty Products</option>
              <option value="books">Books</option>
              <option value="groceries">Grocery</option>
            </select>

            {/* Date Filter */}
            <div className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-[#E3E3DC] bg-white font-semibold text-[#171713] cursor-pointer">
              <span>Date</span>
              <ChevronDown className="w-3 h-3 text-[#85857B]" />
            </div>

            {/* Pickup Filter */}
            <div className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-[#E3E3DC] bg-white font-semibold text-[#171713] cursor-pointer">
              <span>Pickup</span>
              <ChevronDown className="w-3 h-3 text-[#85857B]" />
            </div>

            {/* Destination Filter */}
            <div className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-[#E3E3DC] bg-white font-semibold text-[#171713] cursor-pointer">
              <span>Destination</span>
              <ChevronDown className="w-3 h-3 text-[#85857B]" />
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E3E3DC] bg-white hover:bg-[#F7F7F3] text-xs font-semibold text-[#171713] cursor-pointer transition-colors"
          >
            <Filter className="w-3.5 h-3.5 text-[#85857B]" />
            <span>Filter</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#171713] font-body">
            <thead className="bg-[#F7F7F3] text-[10.5px] uppercase font-bold text-[#85857B] tracking-wider border-b border-[#E3E3DC]">
              <tr>
                <th className="px-5 py-3.5 font-bold">TRACKING ID</th>
                <th className="px-4 py-3.5 font-bold">PACKAGE TYPE</th>
                <th className="px-4 py-3.5 font-bold">SENDER</th>
                <th className="px-4 py-3.5 font-bold">ASSIGNED TO</th>
                <th className="px-4 py-3.5 font-bold">FROM</th>
                <th className="px-4 py-3.5 font-bold">DESTINATION</th>
                <th className="px-4 py-3.5 font-bold">STATUS</th>
                <th className="px-4 py-3.5 font-bold">LAST UPDATED</th>
                <th className="px-5 py-3.5 font-bold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E3DC]">
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-[#FDFDFB] transition-colors">
                  {/* Tracking ID */}
                  <td className="px-5 py-3.5 font-semibold text-[#171713] whitespace-nowrap">
                    #{delivery.trackNo}
                  </td>

                  {/* Package Type */}
                  <td className="px-4 py-3.5 font-medium text-[#484840] whitespace-nowrap">
                    {delivery.packageType}
                  </td>

                  {/* Sender */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-[#E3E3DC]">
                        {delivery.sender.avatar ? (
                          <Image
                            src={delivery.sender.avatar}
                            alt={delivery.sender.name}
                            fill
                            sizes="24px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#E6F1EB] text-[#014D21] font-bold text-[9px] flex items-center justify-center">
                            {delivery.sender.initials}
                          </div>
                        )}
                      </div>
                      <span className="font-semibold text-[#171713]">{delivery.sender.name}</span>
                    </div>
                  </td>

                  {/* Assigned To */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-[#E3E3DC]">
                        {delivery.assignedTo.avatar ? (
                          <Image
                            src={delivery.assignedTo.avatar}
                            alt={delivery.assignedTo.name}
                            fill
                            sizes="24px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#EDF5FD] text-[#2563EB] font-bold text-[9px] flex items-center justify-center">
                            {delivery.assignedTo.initials}
                          </div>
                        )}
                      </div>
                      <span className="font-semibold text-[#171713]">{delivery.assignedTo.name}</span>
                    </div>
                  </td>

                  {/* From */}
                  <td className="px-4 py-3.5 font-medium text-[#484840] whitespace-nowrap">
                    {delivery.from}
                  </td>

                  {/* Destination */}
                  <td className="px-4 py-3.5 font-medium text-[#484840] whitespace-nowrap">
                    {delivery.destination}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <StatusBadge status={delivery.status} />
                  </td>

                  {/* Last Updated */}
                  <td className="px-4 py-3.5 text-[#85857B] font-medium whitespace-nowrap">
                    {delivery.lastUpdated}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5 text-center whitespace-nowrap">
                    <Link
                      href={`/deliveries/${delivery.trackNo}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E3E3DC] hover:bg-[#014D21] hover:text-white hover:border-[#014D21] text-xs font-semibold text-[#171713] transition-all cursor-pointer group/btn"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#85857B] group-hover/btn:text-white" />
                      <span>View</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DRY Table Pagination */}
        <TablePagination
          currentPage={1}
          totalPages={3}
          totalItems={2000}
          pageSize={6}
          countLabel="Showing 6 Of 2000 result"
          nextVariant="primary"
          onPageChange={() => {}}
          className="px-5 py-4 border-t border-[#E3E3DC]"
        />
      </div>
    </div>
  );
}
