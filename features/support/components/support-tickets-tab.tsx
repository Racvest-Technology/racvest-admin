"use client";

import * as React from "react";
import Image from "next/image";
import { Search, Filter, Eye, ChevronDown } from "lucide-react";
import { SupportTicket } from "../types";
import { TicketDetailDrawer } from "./ticket-detail-drawer";

import { StatusBadge, TablePagination } from "@/components/shared";

interface SupportTicketsTabProps {
  tickets: SupportTicket[];
}

export function SupportTicketsTab({ tickets }: SupportTicketsTabProps) {
  const [ticketList, setTicketList] = React.useState<SupportTicket[]>(tickets);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [priorityFilter, setPriorityFilter] = React.useState("All");
  const [categoryFilter, setCategoryFilter] = React.useState("All");
  const [selectedTicket, setSelectedTicket] = React.useState<SupportTicket | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredTickets = React.useMemo(() => {
    return ticketList.filter((ticket) => {
      const matchesSearch =
        ticket.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
        (ticket.fullSubject && ticket.fullSubject.toLowerCase().includes(search.toLowerCase())) ||
        ticket.customerName.toLowerCase().includes(search.toLowerCase()) ||
        ticket.assignedToName.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || ticket.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === "All" || ticket.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [ticketList, search, statusFilter, priorityFilter, categoryFilter]);

  const handleOpenTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsDrawerOpen(true);
  };

  const handleUpdateStatus = (ticketId: string, newStatus: SupportTicket["status"]) => {
    setTicketList((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
  };

  const handleUpdatePriority = (
    ticketId: string,
    newPriority: SupportTicket["priority"]
  ) => {
    setTicketList((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, priority: newPriority } : t))
    );
  };

  return (
    <div className="space-y-4 font-body">
      {/* Outer Card containing Filter Toolbar + Table */}
      <div className="bg-white border border-[#E3E3DC] rounded-2xl shadow-2xs overflow-hidden">
        {/* Filter Toolbar matching Image 1 */}
        <div className="p-4 border-b border-[#E3E3DC] flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Dropdown Filters on Left */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none px-3.5 py-2 pr-8 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer focus:outline-none"
              >
                <option value="All">Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Waiting">Waiting</option>
                <option value="Open">Open</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#85857B] pointer-events-none" />
            </div>

            {/* Priorities Dropdown */}
            <div className="relative">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="appearance-none px-3.5 py-2 pr-8 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer focus:outline-none"
              >
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#85857B] pointer-events-none" />
            </div>

            {/* Categories Dropdown */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none px-3.5 py-2 pr-8 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer focus:outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Delivery">Delivery</option>
                <option value="Refund">Refund</option>
                <option value="Verification">Verification</option>
                <option value="Technical">Technical</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#85857B] pointer-events-none" />
            </div>
          </div>

          {/* Search Bar + Filter Action on Right */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Anything"
                className="w-full px-3.5 py-2 pr-9 bg-white border border-[#E3E3DC] rounded-xl text-xs text-[#171713] placeholder-[#85857B] focus:outline-none focus:ring-1 focus:ring-[#0B331E]"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#85857B] pointer-events-none" />
            </div>

            <button
              type="button"
              onClick={() => alert("Advanced filtering panel opened")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shrink-0"
            >
              <Filter className="w-3.5 h-3.5 text-[#85857B]" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Tickets Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FCFCFA] border-b border-[#E3E3DC] text-[#85857B] font-semibold tracking-wider uppercase text-[10px]">
              <tr>
                <th className="px-5 py-3.5">TICKET ID</th>
                <th className="px-5 py-3.5">SUBJECT</th>
                <th className="px-5 py-3.5">CUSTOMER</th>
                <th className="px-5 py-3.5">CATEGORY</th>
                <th className="px-5 py-3.5">PRIORITY</th>
                <th className="px-5 py-3.5">STATUS</th>
                <th className="px-5 py-3.5">ASSIGNED TO</th>
                <th className="px-5 py-3.5">LAST ACTIVITY</th>
                <th className="px-5 py-3.5">CREATED</th>
                <th className="px-5 py-3.5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E3DC]">
              {filteredTickets.map((tkt) => (
                <tr
                  key={tkt.id}
                  onClick={() => handleOpenTicket(tkt)}
                  className="hover:bg-[#F7F7F3]/70 transition-colors cursor-pointer group"
                >
                  {/* Ticket ID */}
                  <td className="px-5 py-4 font-mono font-bold text-[#171713]">
                    {tkt.ticketNumber}
                  </td>

                  {/* Subject */}
                  <td className="px-5 py-4 font-medium text-[#171713] max-w-[150px] truncate">
                    {tkt.subject}
                  </td>

                  {/* Customer */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#E3E3DC]">
                        <Image
                          src={tkt.customerAvatar}
                          alt={tkt.customerName}
                          fill
                          className="object-cover"
                          sizes="28px"
                        />
                      </div>
                      <span className="font-medium text-[#171713] whitespace-nowrap">
                        {tkt.customerName}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4 text-[#66665D]">
                    {tkt.category}
                  </td>

                  {/* Priority */}
                  <td className="px-5 py-4">
                    <StatusBadge status={tkt.priority} />
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={tkt.status} />
                  </td>

                  {/* Assigned To */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#E3E3DC]">
                        <Image
                          src={tkt.assignedToAvatar}
                          alt={tkt.assignedToName}
                          fill
                          className="object-cover"
                          sizes="28px"
                        />
                      </div>
                      <span className="font-medium text-[#171713] whitespace-nowrap">
                        {tkt.assignedToName}
                      </span>
                    </div>
                  </td>

                  {/* Last Activity */}
                  <td className="px-5 py-4 text-[#85857B] whitespace-nowrap">
                    {tkt.lastActivity}
                  </td>

                  {/* Created */}
                  <td className="px-5 py-4 text-[#85857B] whitespace-nowrap">
                    {tkt.createdAtFormatted}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenTicket(tkt);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#171713] hover:text-[#0B331E] transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#85857B] group-hover:text-[#0B331E]" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-5 py-12 text-center text-[#85857B]">
                    No support tickets found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with counts & pagination using shared DRY TablePagination */}
        <TablePagination
          currentPage={currentPage}
          totalPages={3}
          totalItems={2000}
          pageSize={6}
          countLabel="Showing 6 Of 2000 deliveries"
          nextVariant="primary"
          onPageChange={setCurrentPage}
          className="p-4"
        />
      </div>

      {/* Ticket Detail Drawer Slide-over */}
      {selectedTicket && (
        <TicketDetailDrawer
          key={selectedTicket.id}
          ticket={selectedTicket}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onUpdateStatus={handleUpdateStatus}
          onUpdatePriority={handleUpdatePriority}
        />
      )}
    </div>
  );
}
