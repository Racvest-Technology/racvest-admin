"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { SupportTicket } from "../types";
import { cn } from "@/lib/utils";

interface SupportTicketsTabProps {
  tickets: SupportTicket[];
}

export function SupportTicketsTab({ tickets }: SupportTicketsTabProps) {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [priorityFilter, setPriorityFilter] = React.useState("All");
  const [selectedTicket, setSelectedTicket] = React.useState<SupportTicket | null>(null);

  const filteredTickets = React.useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
        ticket.customerName.toLowerCase().includes(search.toLowerCase()) ||
        (ticket.orderCode && ticket.orderCode.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus =
        statusFilter === "All" || ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || ticket.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, search, statusFilter, priorityFilter]);

  const getPriorityBadge = (priority: SupportTicket["priority"]) => {
    switch (priority) {
      case "Urgent":
        return "bg-[#FEF2F0] text-[#C83B2B] border-[#FDE0DB]";
      case "High":
        return "bg-[#FFF8E7] text-[#D97706] border-[#FDECC8]";
      case "Medium":
        return "bg-[#EFF6FA] text-[#0284C7] border-[#DCECF3]";
      case "Low":
        return "bg-[#F7F7F3] text-[#85857B] border-[#E3E3DC]";
      default:
        return "bg-[#F7F7F3] text-[#85857B] border-[#E3E3DC]";
    }
  };

  const getStatusBadge = (status: SupportTicket["status"]) => {
    switch (status) {
      case "New":
        return "bg-[#E0F2FE] text-[#0284C7]";
      case "Open":
        return "bg-[#FEF3C7] text-[#D97706]";
      case "In Progress":
        return "bg-[#DCFCE7] text-[#16A34A]";
      case "Waiting for Customer":
        return "bg-[#F1F5F9] text-[#64748B]";
      case "Escalated":
        return "bg-[#FEE2E2] text-[#DC2626]";
      case "Resolved / Closed":
        return "bg-[#ECFDF5] text-[#059669]";
      default:
        return "bg-[#F1F5F9] text-[#64748B]";
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="bg-white border border-[#E3E3DC] rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#85857B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tickets by ID, subject, customer, or order code..."
            className="w-full pl-9 pr-4 py-2 bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl text-xs text-[#171713] placeholder-[#85857B] focus:outline-none focus:ring-1 focus:ring-[#0B331E]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E3E3DC] rounded-xl text-xs font-medium text-[#171713] cursor-pointer focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Waiting for Customer">Waiting for Customer</option>
            <option value="Escalated">Escalated</option>
            <option value="Resolved / Closed">Resolved</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E3E3DC] rounded-xl text-xs font-medium text-[#171713] cursor-pointer focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white border border-[#E3E3DC] rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body">
            <thead className="bg-[#F7F7F3] border-b border-[#E3E3DC] text-[#85857B] font-semibold">
              <tr>
                <th className="px-5 py-3.5">Ticket ID</th>
                <th className="px-5 py-3.5">Subject &amp; Category</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Priority</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Assignee</th>
                <th className="px-5 py-3.5">Updated</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E3DC]">
              {filteredTickets.map((tkt) => (
                <tr
                  key={tkt.id}
                  className="hover:bg-[#FCFCFA] transition-colors"
                >
                  <td className="px-5 py-4 font-mono font-semibold text-[#171713]">
                    {tkt.ticketNumber}
                  </td>
                  <td className="px-5 py-4 max-w-xs">
                    <p className="font-semibold text-[#171713] truncate">
                      {tkt.subject}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-[#85857B]">
                        {tkt.category}
                      </span>
                      {tkt.orderCode && tkt.orderCode !== "-" && (
                        <span className="text-[10px] bg-[#F7F7F3] border border-[#E3E3DC] px-1.5 py-0.5 rounded font-mono text-[#66665D]">
                          {tkt.orderCode}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-[#171713]">{tkt.customerName}</p>
                    <span className="text-[11px] text-[#85857B]">
                      {tkt.customerRole}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border",
                        getPriorityBadge(tkt.priority)
                      )}
                    >
                      {tkt.priority}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold",
                        getStatusBadge(tkt.status)
                      )}
                    >
                      {tkt.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#66665D]">
                    {tkt.assignee || "Unassigned"}
                  </td>
                  <td className="px-5 py-4 text-[#85857B] whitespace-nowrap">
                    {tkt.lastUpdated}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedTicket(tkt)}
                      className="px-3 py-1.5 bg-[#F7F7F3] hover:bg-[#0B331E] hover:text-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] transition-colors cursor-pointer"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-[#85857B]">
                    No tickets found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-[#E3E3DC] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E3DC]">
              <div>
                <span className="font-mono text-xs font-bold text-[#0B331E]">
                  {selectedTicket.ticketNumber}
                </span>
                <h3 className="text-base font-bold text-[#171713] mt-0.5">
                  {selectedTicket.subject}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="w-8 h-8 rounded-full bg-[#F7F7F3] hover:bg-[#EBEBE4] flex items-center justify-center text-[#85857B] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#F7F7F3] p-3 rounded-xl">
                <span className="text-[#85857B] block">Customer</span>
                <span className="font-semibold text-[#171713]">
                  {selectedTicket.customerName} ({selectedTicket.customerRole})
                </span>
              </div>
              <div className="bg-[#F7F7F3] p-3 rounded-xl">
                <span className="text-[#85857B] block">Category</span>
                <span className="font-semibold text-[#171713]">
                  {selectedTicket.category}
                </span>
              </div>
              <div className="bg-[#F7F7F3] p-3 rounded-xl">
                <span className="text-[#85857B] block">Linked Order</span>
                <span className="font-semibold font-mono text-[#171713]">
                  {selectedTicket.orderCode || "N/A"}
                </span>
              </div>
              <div className="bg-[#F7F7F3] p-3 rounded-xl">
                <span className="text-[#85857B] block">Assigned Specialist</span>
                <span className="font-semibold text-[#171713]">
                  {selectedTicket.assignee || "Unassigned"}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#171713]">
                Quick Agent Response / Resolution Note
              </label>
              <textarea
                rows={3}
                placeholder="Type your response to the customer or internal audit note..."
                className="w-full p-3 bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl text-xs text-[#171713] focus:outline-none focus:ring-1 focus:ring-[#0B331E]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#66665D] hover:bg-[#F7F7F3] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Ticket ${selectedTicket.ticketNumber} updated successfully!`);
                  setSelectedTicket(null);
                }}
                className="px-4 py-2 bg-[#0B331E] hover:bg-[#062414] text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Save &amp; Resolve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
