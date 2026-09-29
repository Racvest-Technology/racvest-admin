"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
      {/* Row 1: Revenue Analytics & Delivery Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Analytics */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 text-base">
              Revenue Analytics
            </h3>
            <button className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
              <span>7 Days</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#014D21" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#014D21" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  stroke="#85857B"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "#E3E3DC" }}
                />
                <YAxis
                  stroke="#85857B"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val}m`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    border: "1px solid #E3E3DC",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                  formatter={(val: number | string | readonly (number | string)[] | undefined) => [
                    `₦${val}M`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#014D21"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Delivery Analytics */}
        <div className="bg-white border border-[#E3E3DC] rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#171713] text-base font-primary">
              Delivery Analytics
            </h3>
            <button className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#66665D] bg-[#F7F7F3] border border-[#E3E3DC] rounded-lg hover:bg-[#F0F0EB] transition-colors">
              <span>7 Days</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={deliveryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="deliveryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC851F" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#DC851F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  stroke="#85857B"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "#E3E3DC" }}
                />
                <YAxis
                  stroke="#85857B"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    border: "1px solid #E3E3DC",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                  formatter={(val: number | string | readonly (number | string)[] | undefined) => [
                    `${val} shipments`,
                    "Volume",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="deliveries"
                  stroke="#DC851F"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#deliveryGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: User Growth & Delivery Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-white border border-[#E3E3DC] rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-[#171713] text-base font-primary">User Growth</h3>
            <button className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#66665D] bg-[#F7F7F3] border border-[#E3E3DC] rounded-lg hover:bg-[#F0F0EB] transition-colors">
              <span>2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>
          </div>

          <div className="h-56 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="month"
                  stroke="#85857B"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#E3E3DC" }}
                />
                <YAxis
                  stroke="#85857B"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    border: "1px solid #E3E3DC",
                    fontSize: "12px",
                  }}
                  formatter={(val: number | string | readonly (number | string)[] | undefined) => [
                    `${val} new users`,
                    "Growth",
                  ]}
                />
                <Bar
                  dataKey="users"
                  fill="#014D21"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100 text-xs text-gray-500">
            <span>Total Signups</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 text-sm">80,000</span>
              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                +12.4%
              </span>
            </div>
          </div>
        </div>

        {/* Delivery Status Donut */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 text-base">
                Delivery Status
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Current Delivery Breakdown
              </p>
            </div>
            <button className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
              <span>7 Days</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 py-2">
            {/* Donut Chart with Centered Total */}
            <div className="h-52 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {deliveryStatusData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "8px",
                      border: "1px solid #E5E7EB",
                      fontSize: "12px",
                    }}
                    formatter={(val: number | string | readonly (number | string)[] | undefined) => [
                      `${Number(val).toLocaleString()}`,
                      "Deliveries",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Centered Total */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-lg font-bold text-gray-900">84,267</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400">
                  Total
                </span>
              </div>
            </div>

            {/* Custom Status Legend List */}
            <div className="space-y-2.5 text-xs">
              {deliveryStatusData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-600 font-medium">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-gray-900">
                      {item.value.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-[11px]">
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
