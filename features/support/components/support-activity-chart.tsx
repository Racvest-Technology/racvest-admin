"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { ActivityStreamDataPoint } from "../types";

interface SupportActivityChartProps {
  data: ActivityStreamDataPoint[];
}

export function SupportActivityChart({ data }: SupportActivityChartProps) {
  const [channel, setChannel] = React.useState<"tickets" | "chats" | "calls">("tickets");
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const channelLabel = {
    tickets: "Tickets",
    chats: "Live Chat",
    calls: "Phone Calls",
  }[channel];

  return (
    <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between pb-4">
        <div>
          <h3 className="text-sm font-bold text-[#171713] font-heading">
            Support Activity Stream
          </h3>
          <p className="text-xs text-[#85857B] mt-0.5 font-body">
            Real-time volume distribution across channels
          </p>
        </div>

        {/* Dropdown channel filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shadow-2xs"
          >
            <span>{channelLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-[#E3E3DC] rounded-xl shadow-lg z-20 py-1">
              {(["tickets", "chats", "calls"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setChannel(key);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                    channel === key
                      ? "bg-[#0B331E] text-white"
                      : "text-[#171713] hover:bg-[#F7F7F3]"
                  }`}
                >
                  {key === "tickets" && "Tickets"}
                  {key === "chats" && "Live Chat"}
                  {key === "calls" && "Phone Calls"}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart container */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="supportStreamGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0B4D26" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0B4D26" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#85857B" }}
              dy={6}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#85857B" }}
              ticks={[0, 2500, 5000, 7500]}
              domain={[0, 7500]}
              dx={-4}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#11110F] text-white px-3 py-2 rounded-xl text-xs shadow-md border border-white/10 font-body">
                      <p className="text-white/60">{payload[0].payload.day}</p>
                      <p className="font-bold text-white text-sm">
                        {Number(payload[0].value).toLocaleString()} {channelLabel.toLowerCase()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey={channel}
              stroke="#0B4D26"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#supportStreamGrad)"
              dot={{ r: 2.5, fill: "#0B4D26", strokeWidth: 1, stroke: "#FFFFFF" }}
              activeDot={{ r: 5, fill: "#0B4D26", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
