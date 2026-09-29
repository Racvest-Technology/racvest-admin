"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChevronDown } from "lucide-react";
import {
  revenueChartData,
  deliveryChartData,
  userGrowthData,
  deliveryStatusData,
} from "@/lib/mock-data";

export function ChartsSection() {
  return (
    <div className="space-y-6">
      {/* Row 3: Revenue Analytics & Delivery Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Analytics Card */}
        <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3">
            <h3 className="text-sm font-bold text-[#171713] font-heading">
              Revenue Analytics
            </h3>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#EBEBE4] transition-colors cursor-pointer shadow-2xs font-body"
            >
              <span>7 Days</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueChartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueGreenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#014D21" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#014D21" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#85857B", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#85857B", fontSize: 10 }}
                  ticks={[0, 2500, 5000, 7500]}
                  tickFormatter={(val) => (val === 0 ? "0" : `${val / 1000} 500`.replace(".5", " 5"))}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#01250F] text-white px-2.5 py-1 rounded-lg text-xs font-semibold shadow-md">
                          {`${payload[0].payload.day}: ₦${Number(payload[0].value).toLocaleString()}`}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#014D21"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#revenueGreenGrad)"
                  dot={{ r: 3, fill: "#014D21", strokeWidth: 1, stroke: "#FFFFFF" }}
                  activeDot={{ r: 5, fill: "#014D21" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Delivery Analytics Card */}
        <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3">
            <h3 className="text-sm font-bold text-[#171713] font-heading">
              Delivery Analytics
            </h3>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#EBEBE4] transition-colors cursor-pointer shadow-2xs font-body"
            >
              <span>7 Days</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={deliveryChartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="deliveryOrangeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC851F" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#DC851F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#85857B", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#85857B", fontSize: 10 }}
                  ticks={[0, 2500, 5000, 7500]}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#B46006] text-white px-2.5 py-1 rounded-lg text-xs font-semibold shadow-md">
                          {`${payload[0].payload.day}: ${Number(payload[0].value).toLocaleString()} deliveries`}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="deliveries"
                  stroke="#DC851F"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#deliveryOrangeGrad)"
                  dot={{ r: 3, fill: "#DC851F", strokeWidth: 1, stroke: "#FFFFFF" }}
                  activeDot={{ r: 5, fill: "#DC851F" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 4: User Growth & Delivery Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* User Growth Bar Chart */}
        <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3">
            <h3 className="text-sm font-bold text-[#171713] font-heading">
              User Growth
            </h3>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#EBEBE4] transition-colors cursor-pointer shadow-2xs font-body"
            >
              <span>2025</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>
          </div>

          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userGrowthData}
                margin={{ top: 25, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#85857B", fontSize: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#85857B", fontSize: 10 }}
                  ticks={[0, 500, 1000, 1500]}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#01250F] text-white px-2.5 py-1 rounded-lg text-xs font-semibold shadow-md">
                          {`${payload[0].payload.month}: ${payload[0].value}`}
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={{ fill: "transparent" }}
                />
                <Bar
                  dataKey="users"
                  fill="#014D21"
                  radius={[3, 3, 0, 0]}
                  barSize={10}
                />
              </BarChart>
            </ResponsiveContainer>

            {/* Figma-style Aug Badge on August bar */}
            <div className="absolute top-1 left-[61%] -translate-x-1/2 bg-[#01250F] text-white px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 shadow-xs pointer-events-none">
              <span>Aug - 1100</span>
            </div>
          </div>

          {/* Bottom Total Pill matching Figma */}
          <div className="mt-4 bg-[#01250F] text-white px-4 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold shadow-xs font-body">
            <span>Total</span>
            <div className="flex items-center gap-2">
              <span className="font-bold">80,000</span>
              <span className="text-[#69AA84] font-medium">+12.4%</span>
            </div>
          </div>
        </div>

        {/* Delivery Status Donut Chart */}
        <div className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h3 className="text-sm font-bold text-[#171713] font-heading">
                Delivery Status
              </h3>
              <p className="text-[11px] text-[#85857B] mt-0.5 font-body">
                Current Delivery Breakdown
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#EBEBE4] transition-colors cursor-pointer shadow-2xs font-body"
            >
              <span>7 Days</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center py-2">
            {/* Donut Chart Container */}
            <div className="sm:col-span-5 h-44 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {deliveryStatusData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-[10px] text-[#85857B] font-medium leading-tight">
                  Total deliveries
                </span>
                <span className="text-base font-bold text-[#171713] font-heading">
                  84,267
                </span>
              </div>
            </div>

            {/* Legend Items matching Figma */}
            <div className="sm:col-span-7 space-y-2.5">
              {deliveryStatusData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-xs font-body"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[#5A5A52] font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-[#171713]">
                      {item.value.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-[#014D21] min-w-[42px] text-right font-medium">
                      {item.percentage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
