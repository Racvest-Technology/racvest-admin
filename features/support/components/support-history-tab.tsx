"use client";

import * as React from "react";
import { Star } from "lucide-react";

interface ResolvedRecord {
  id: string;
  ticketId: string;
  issue: string;
  customer: string;
  resolvedBy: string;
  resolutionTime: string;
  csatScore: number;
  date: string;
}

const MOCK_HISTORY: ResolvedRecord[] = [
  {
    id: "hist-01",
    ticketId: "TKT-8922",
    issue: "Incorrect dropoff PIN re-issued to receiver via SMS",
    customer: "Tunde Bakare",
    resolvedBy: "Emmanuel A.",
    resolutionTime: "12m",
    csatScore: 5,
    date: "2026-10-12 14:15",
  },
  {
    id: "hist-02",
    ticketId: "TKT-8918",
    issue: "Escrow funds released after recipient confirmed parcel arrival",
    customer: "Ngozi Eze",
    resolvedBy: "Sarah K.",
    resolutionTime: "24m",
    csatScore: 5,
    date: "2026-10-12 12:40",
  },
  {
    id: "hist-03",
    ticketId: "TKT-8905",
    issue: "Traveler rerouted around flooded highway corridor",
    customer: "Aliyu Mohammed",
    resolvedBy: "Ibrahim D.",
    resolutionTime: "48m",
    csatScore: 4,
    date: "2026-10-12 10:20",
  },
  {
    id: "hist-04",
    ticketId: "TKT-8890",
    issue: "Overweight parcel surcharge waiver applied per policy",
    customer: "Zainab Bello",
    resolvedBy: "Dev Ops Support",
    resolutionTime: "1h 10m",
    csatScore: 5,
    date: "2026-10-11 16:30",
  },
];

export function SupportHistoryTab() {
  return (
    <div className="bg-white border border-[#E3E3DC] rounded-2xl shadow-2xs overflow-hidden">
      <div className="p-4 border-b border-[#E3E3DC] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#171713] font-heading">
            Resolution &amp; Quality Audit History
          </h3>
          <p className="text-xs text-[#85857B] mt-0.5 font-body">
            Audited resolutions, agent performance metrics, and CSAT ratings
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-body">
          <thead className="bg-[#F7F7F3] border-b border-[#E3E3DC] text-[#85857B] font-semibold">
            <tr>
              <th className="px-5 py-3.5">Ticket</th>
              <th className="px-5 py-3.5">Issue Summary</th>
              <th className="px-5 py-3.5">Customer</th>
              <th className="px-5 py-3.5">Audited Specialist</th>
              <th className="px-5 py-3.5">Resolution Time</th>
              <th className="px-5 py-3.5">Customer Rating</th>
              <th className="px-5 py-3.5">Resolved At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3E3DC]">
            {MOCK_HISTORY.map((row) => (
              <tr key={row.id} className="hover:bg-[#FCFCFA] transition-colors">
                <td className="px-5 py-4 font-mono font-semibold text-[#171713]">
                  {row.ticketId}
                </td>
                <td className="px-5 py-4 font-medium text-[#171713] max-w-sm">
                  {row.issue}
                </td>
                <td className="px-5 py-4 text-[#66665D]">
                  {row.customer}
                </td>
                <td className="px-5 py-4 text-[#171713] font-medium">
                  {row.resolvedBy}
                </td>
                <td className="px-5 py-4 text-[#16A34A] font-semibold">
                  {row.resolutionTime}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    {Array.from({ length: row.csatScore }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B]" />
                    ))}
                    <span className="text-xs text-[#171713] font-bold ml-1">
                      {row.csatScore}.0
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-[#85857B] whitespace-nowrap">
                  {row.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
