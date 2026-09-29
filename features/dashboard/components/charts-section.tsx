"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChevronDown } from "lucide-react";

const MONTHLY_DELIVERY_DATA = [
  { month: "Jan", deliveries: 650 },
  { month: "Feb", deliveries: 520 },
  { month: "Mar", deliveries: 1180 },
  { month: "Apr", deliveries: 890 },
  { month: "May", deliveries: 720 },
  { month: "Jun", deliveries: 980 },
  { month: "Jul", deliveries: 780 },
  { month: "Aug", deliveries: 1320 },
  { month: "Sept", deliveries: 840 },
  { month: "Oct", deliveries: 1240 },
  { month: "Nov", deliveries: 1150 },
  { month: "Dec", deliveries: 1390 },
];

const DELIVERY_STATUS_DATA = [
  { name: "Delivered", value: 44584, color: "#014D21", pct: "52.84%" },
  { name: "In Transit", value: 22187, color: "#DC851F", pct: "26.27%" },
  { name: "Picked Up", value: 11191, color: "#277A9E", pct: "13.26%" },
  { name: "Cancelled", value: 1449, color: "#C83B2B", pct: "1.72%" },
];

const ROUTE_DISTRIBUTION = [
  { code: "LOS", name: "Lagos Hub", count: "34,820", pct: 82 },
  { code: "ABJ", name: "Abuja Corridor", count: "18,430", pct: 54 },
  { code: "PHC", name: "Port Harcourt", count: "12,920", pct: 38 },
  { code: "KAN", name: "Kano Dispatch", count: "8,240", pct: 26 },
  { code: "INT", name: "Cross-Border / Other", count: "9,857", pct: 30 },
];

export function ChartsSection() {
  return (
    <div className="space-y-6">
      {/* Row 1: 12-Column Analytics Grid matching User Management Lead Design */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Delivery Volume Trends Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h3 className="text-sm font-bold text-[#171713] font-heading">
                Delivery Volume Trends
              </h3>
              <p className="text-xs text-[#85857B] mt-0.5 font-body">
                Monthly parcel dispatch volume
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F3] rounded-lg text-xs font-medium text-[#171713] hover:bg-[#EBEBE4] transition-colors cursor-pointer"
            >
              <span>2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MONTHLY_DELIVERY_DATA}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#85857B", fontSize: 11 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#013014] text-white px-2.5 py-1 rounded-lg text-xs font-semibold shadow-md">
                          {`${payload[0].payload.month}: ${payload[0].value} deliveries`}
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={{ fill: "transparent" }}
                />
                <Bar
                  dataKey="deliveries"
                  fill="#014D21"
                  radius={[4, 4, 0, 0]}
                  barSize={10}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom Total Pill matching User Management Lead */}
          <div className="mt-4 bg-[#014D21] text-white px-4 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold shadow-xs">
            <span>Total Volume</span>
            <div className="flex items-center gap-2">
              <span className="font-bold">84,260 parcels</span>
              <span className="text-[#69AA84] font-medium">+14.8%</span>
            </div>
          </div>
        </div>

        {/* Delivery Status Donut Chart (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="text-sm font-bold text-[#171713] font-heading">
                Delivery Status
              </h3>
              <p className="text-xs text-[#85857B] mt-0.5 font-body">
                Current dispatch status breakdown
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F3] rounded-lg text-xs font-medium text-[#171713] hover:bg-[#EBEBE4] transition-colors cursor-pointer"
            >
              <span>All Shipments</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>
          </div>

          {/* Donut Chart Container */}
          <div className="h-44 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DELIVERY_STATUS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={68}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {DELIVERY_STATUS_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] text-[#85857B] font-medium uppercase tracking-wider">
                Total
              </span>
              <span className="text-base font-bold text-[#171713] font-heading">
                84,267
              </span>
            </div>
          </div>

          {/* Legend Items matching User Management Lead */}
          <div className="space-y-2 mt-2 pt-2 border-t border-[#E3E3DC]">
            {DELIVERY_STATUS_DATA.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-xs font-body"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#5A5A52] font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#171713]">
                    {item.value.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#85857B] min-w-[45px] text-right">
                    {item.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Top Dispatch Route Distribution Map matching User Management */}
      <div className="bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h3 className="text-sm font-bold text-[#171713] font-heading">
              Top Dispatch Corridors
            </h3>
            <p className="text-xs text-[#85857B] mt-0.5 font-body">
              Active courier routing hubs and inter-state logistics corridors
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F3] rounded-lg text-xs font-medium text-[#171713] hover:bg-[#EBEBE4] transition-colors cursor-pointer"
          >
            <span>Live Routes</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
          {/* Stylized Route Telemetry Graphic */}
          <div className="lg:col-span-8 relative h-72 bg-[#0B1E19] rounded-2xl overflow-hidden flex items-center justify-center p-4">
            <svg
              viewBox="0 0 800 400"
              className="w-full h-full opacity-90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Land outlines */}
              <path
                d="M150 120 Q180 110 220 130 T240 180 T200 230 T160 210 Z"
                fill="#163A2D"
              />
              <path
                d="M200 240 Q230 260 250 310 T220 370 T180 340 T190 280 Z"
                fill="#163A2D"
              />
              <path
                d="M400 120 Q440 90 480 110 T520 160 T480 200 T430 180 Z"
                fill="#163A2D"
              />
              <path
                d="M420 190 Q470 210 490 270 T450 340 T400 300 T410 230 Z"
                fill="#163A2D"
              />
              <path
                d="M550 110 Q620 90 680 130 T720 200 T660 220 T580 170 Z"
                fill="#163A2D"
              />
              <path
                d="M620 260 Q670 250 710 280 T680 340 T620 320 Z"
                fill="#163A2D"
              />

              {/* Courier Active Transit Arcs */}
              <path
                d="M 430 220 Q 300 120 200 140"
                stroke="#29CC6A"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.8"
              />
              <path
                d="M 430 220 Q 520 140 640 160"
                stroke="#29CC6A"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.8"
              />
              <path
                d="M 430 220 Q 420 150 450 120"
                stroke="#DC851F"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <path
                d="M 430 220 Q 440 250 460 270"
                stroke="#29CC6A"
                strokeWidth="2"
                opacity="0.9"
              />

              {/* Dispatch Hub Nodes */}
              {/* Lagos Core Hub */}
              <circle cx="430" cy="220" r="12" fill="#29CC6A" fillOpacity="0.25" />
              <circle cx="430" cy="220" r="5" fill="#29CC6A" />

              {/* Abuja Central */}
              <circle cx="450" cy="190" r="9" fill="#DC851F" fillOpacity="0.25" />
              <circle cx="450" cy="190" r="4" fill="#DC851F" />

              {/* Port Harcourt Coastal */}
              <circle cx="460" cy="270" r="8" fill="#29CC6A" fillOpacity="0.25" />
              <circle cx="460" cy="270" r="3.5" fill="#29CC6A" />

              {/* London Airport Connection */}
              <circle cx="450" cy="120" r="8" fill="#29CC6A" fillOpacity="0.25" />
              <circle cx="450" cy="120" r="3.5" fill="#29CC6A" />

              {/* North America Gateway */}
              <circle cx="200" cy="140" r="8" fill="#29CC6A" fillOpacity="0.25" />
              <circle cx="200" cy="140" r="3.5" fill="#29CC6A" />
            </svg>
          </div>

          {/* Corridor Progress Bars */}
          <div className="lg:col-span-4 space-y-4">
            {ROUTE_DISTRIBUTION.map((item) => (
              <div key={item.name} className="space-y-1.5 font-body">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-5 rounded-md bg-[#F0F0EB] text-[#484840] font-semibold text-[10px] flex items-center justify-center">
                      {item.code}
                    </span>
                    <span className="font-medium text-[#171713]">{item.name}</span>
                  </div>
                  <span className="font-bold text-[#171713]">{item.count}</span>
                </div>
                {/* Custom Progress Bar */}
                <div className="w-full h-1.5 bg-[#F0F0EB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#014D21] rounded-full transition-all duration-500"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
