"use client";

import * as React from "react";
import { ShieldCheck, Play } from "lucide-react";

interface CallLogItem {
  id: string;
  callerName: string;
  role: "Traveler" | "Sender" | "Courier";
  phoneMasked: string;
  orderCode: string;
  duration: string;
  outcome: "Completed" | "Missed" | "Voicemail";
  timestamp: string;
}

const MOCK_CALL_LOGS: CallLogItem[] = [
  {
    id: "call-01",
    callerName: "Ronald Richards",
    role: "Sender",
    phoneMasked: "+234 803 ••• 1928",
    orderCode: "RCV-92831",
    duration: "4m 12s",
    outcome: "Completed",
    timestamp: "Today, 10:15 AM",
  },
  {
    id: "call-02",
    callerName: "John Okafor",
    role: "Traveler",
    phoneMasked: "+234 812 ••• 6789",
    orderCode: "RCV-92831",
    duration: "2m 45s",
    outcome: "Completed",
    timestamp: "Today, 10:22 AM",
  },
  {
    id: "call-03",
    callerName: "Cameron Williamson",
    role: "Sender",
    phoneMasked: "+234 805 ••• 3311",
    orderCode: "RCV-88120",
    duration: "1m 18s",
    outcome: "Completed",
    timestamp: "Today, 09:35 AM",
  },
  {
    id: "call-04",
    callerName: "Folake Adebayo",
    role: "Courier",
    phoneMasked: "+234 818 ••• 9942",
    orderCode: "RCV-5512-VI",
    duration: "0m 00s",
    outcome: "Missed",
    timestamp: "Yesterday, 16:40 PM",
  },
];

export function SupportCallLogsTab() {
  return (
    <div className="bg-white border border-[#E3E3DC] rounded-2xl shadow-2xs overflow-hidden font-body">
      <div className="p-4 border-b border-[#E3E3DC] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#171713] font-heading">
            Masked Carrier &amp; Customer Voice Relays
          </h3>
          <p className="text-xs text-[#85857B] mt-0.5 font-body">
            Encrypted audio communications between support agents, couriers, and travelers
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-body">
          <thead className="bg-[#FCFCFA] border-b border-[#E3E3DC] text-[#85857B] font-semibold text-[10px] uppercase">
            <tr>
              <th className="px-5 py-3.5">CALLER</th>
              <th className="px-5 py-3.5">MASKED NUMBER</th>
              <th className="px-5 py-3.5">LINKED ORDER</th>
              <th className="px-5 py-3.5">DURATION</th>
              <th className="px-5 py-3.5">STATUS</th>
              <th className="px-5 py-3.5">TIME</th>
              <th className="px-5 py-3.5 text-right">AUDIO RECORDING</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3E3DC]">
            {MOCK_CALL_LOGS.map((call) => (
              <tr key={call.id} className="hover:bg-[#F7F7F3] transition-colors">
                <td className="px-5 py-4 font-semibold text-[#171713]">
                  {call.callerName} ({call.role})
                </td>
                <td className="px-5 py-4 font-mono text-[#66665D]">
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#16A34A]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{call.phoneMasked}</span>
                  </span>
                </td>
                <td className="px-5 py-4 font-mono font-semibold text-[#171713]">
                  {call.orderCode}
                </td>
                <td className="px-5 py-4 text-[#171713]">{call.duration}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      call.outcome === "Completed"
                        ? "bg-[#ECFDF3] text-[#16A34A]"
                        : "bg-[#FEF2F0] text-[#EF4444]"
                    }`}
                  >
                    {call.outcome}
                  </span>
                </td>
                <td className="px-5 py-4 text-[#85857B] whitespace-nowrap">
                  {call.timestamp}
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => alert(`Playing encrypted recording for call ${call.id}`)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F7F7F3] hover:bg-[#EBEBE4] border border-[#E3E3DC] rounded-lg text-xs font-semibold text-[#171713] cursor-pointer"
                  >
                    <Play className="w-3 h-3 text-[#0B331E]" />
                    <span>Play</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
