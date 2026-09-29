"use client";

import * as React from "react";
import {
  Users,
  ShieldCheck,
  UserPlus,
  Clock,
  Ban,
  Flag,
  XCircle,
  ChevronDown,
} from "lucide-react";
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
import { ALL_USERS_STATS } from "../data/mock-users";
import { MetricCard, NeedsAttentionBar } from "@/components/shared";

const MONTHLY_GROWTH_DATA = [
  { month: "Jan", users: 550 },
  { month: "Feb", users: 400 },
  { month: "Mar", users: 1100 },
  { month: "Apr", users: 750 },
  { month: "May", users: 500 },
  { month: "Jun", users: 800 },
  { month: "Jul", users: 600 },
  { month: "Aug", users: 1200 },
  { month: "Sept", users: 700 },
  { month: "Oct", users: 1100 },
  { month: "Nov", users: 950 },
  { month: "Dec", users: 1050 },
];

const VERIFICATION_DONUT_DATA = [
  { name: "Verified", value: 81000, color: "#014D21", pct: "26.27%" },
  { name: "Pending", value: 2922, color: "#DC851F", pct: "13.20%" },
  { name: "Rejected", value: 345, color: "#C83B2B", pct: "6.72%" },
];

const COUNTRY_DISTRIBUTION = [
  { code: "NG", name: "Nigeria", count: "24,820", pct: 78 },
  { code: "US", name: "United States", count: "12,430", pct: 45 },
  { code: "UK", name: "United Kingdom", count: "8,920", pct: 32 },
  { code: "CA", name: "Canada", count: "6,240", pct: 22 },
  { code: "+", name: "Other", count: "31,857", pct: 85 },
];

export function AllUsersView() {
  return (
    <div className="space-y-6">
      {/* Row 1: KPI Hero Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total User"
          value={ALL_USERS_STATS.total.toLocaleString()}
          icon={Users}
          variant="hero"
          trend={ALL_USERS_STATS.totalGrowth}
        />
        <MetricCard
          title="Active Users"
          value={ALL_USERS_STATS.active.toLocaleString()}
          icon={Users}
          variant="standard"
          trend={ALL_USERS_STATS.activeGrowth}
        />
        <MetricCard
          title="Verified Users"
          value={ALL_USERS_STATS.verified.toLocaleString()}
          icon={ShieldCheck}
          variant="standard"
          trend={ALL_USERS_STATS.verifiedGrowth}
        />
        <MetricCard
          title="New users Today"
          value={ALL_USERS_STATS.todayCount}
          icon={UserPlus}
          variant="standard"
        />
      </div>

      {/* Row 2: Secondary Role KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Sender"
          value={ALL_USERS_STATS.totalSenders?.toLocaleString() || "12,430"}
          icon={Users}
          variant="compact"
        />
        <MetricCard
          title="Total Traveler"
          value={ALL_USERS_STATS.totalTravelers?.toLocaleString() || "6,240"}
          icon={Users}
          variant="compact"
        />
        <MetricCard
          title="Total Couriers"
          value={ALL_USERS_STATS.totalCouriers?.toLocaleString() || "3,820"}
          icon={Users}
          variant="accent"
        />
      </div>

      {/* Row 3: Needs Attention Action Bar */}
      <NeedsAttentionBar
        title="Needs Attention"
        subtitle="553 need review"
        actionLabel="Review queue"
        items={[
          { label: "Pending Verification", count: 345, icon: Clock, color: "amber" },
          { label: "Suspended", count: 128, icon: Ban, color: "red" },
          { label: "Flagged Accounts", count: 45, icon: Flag, color: "amber" },
          { label: "Rejected", count: 35, icon: XCircle, color: "red" },
        ]}
      />

      {/* Row 4: User Growth & Verification Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* User Growth Bar Chart */}
        <div className="lg:col-span-7 bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-bold text-[#171713] font-heading">
              User Growth
            </h3>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F3] rounded-lg text-xs font-medium text-[#171713] hover:bg-[#EBEBE4] transition-colors cursor-pointer"
            >
              <span>2025</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_GROWTH_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
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
                  radius={[4, 4, 0, 0]}
                  barSize={10}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom Total Pill */}
          <div className="mt-4 bg-[#014D21] text-white px-4 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold shadow-xs">
            <span>Total</span>
            <div className="flex items-center gap-2">
              <span className="font-bold">80,000</span>
              <span className="text-[#69AA84] font-medium">+12.4%</span>
            </div>
          </div>
        </div>

        {/* Verification Analytics Donut Chart */}
        <div className="lg:col-span-5 bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-bold text-[#171713] font-heading">
              Verification Analytics
            </h3>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F3] rounded-lg text-xs font-medium text-[#171713] hover:bg-[#EBEBE4] transition-colors cursor-pointer"
            >
              <span>All Users</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
            </button>
          </div>

          {/* Donut Chart Container */}
          <div className="h-44 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={VERIFICATION_DONUT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={68}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {VERIFICATION_DONUT_DATA.map((entry) => (
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

          {/* Legend Items matching Figma */}
          <div className="space-y-2 mt-2 pt-2 border-t border-[#E3E3DC]">
            {VERIFICATION_DONUT_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs font-body">
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

      {/* Row 5: Top User Distribution World Map */}
      <div className="bg-white border border-[#E3E3DC] rounded-2xl p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h3 className="text-sm font-bold text-[#171713] font-heading">
              Top User Distribution
            </h3>
            <p className="text-xs text-[#85857B] mt-0.5 font-body">
              Where Racvest users are located
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F3] rounded-lg text-xs font-medium text-[#171713] hover:bg-[#EBEBE4] transition-colors cursor-pointer"
          >
            <span>All Users</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#85857B]" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
          {/* Stylized World Map Graphic */}
          <div className="lg:col-span-8 relative h-72 bg-[#0B1E19] rounded-2xl overflow-hidden flex items-center justify-center p-4">
            <svg
              viewBox="0 0 800 400"
              className="w-full h-full opacity-90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified Continents Outline */}
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

              {/* Glowing Routing Arcs */}
              <path
                d="M 430 220 Q 300 120 200 140"
                stroke="#29CC6A"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.7"
              />
              <path
                d="M 430 220 Q 520 140 640 160"
                stroke="#29CC6A"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.7"
              />
              <path
                d="M 430 220 Q 420 150 450 120"
                stroke="#29CC6A"
                strokeWidth="1.5"
                opacity="0.8"
              />

              {/* Glowing Hub Nodes */}
              {/* Lagos, Nigeria */}
              <circle cx="430" cy="220" r="10" fill="#29CC6A" fillOpacity="0.3" />
              <circle cx="430" cy="220" r="4" fill="#29CC6A" />

              {/* US */}
              <circle cx="200" cy="140" r="8" fill="#29CC6A" fillOpacity="0.3" />
              <circle cx="200" cy="140" r="3.5" fill="#29CC6A" />

              {/* UK / Europe */}
              <circle cx="450" cy="120" r="8" fill="#29CC6A" fillOpacity="0.3" />
              <circle cx="450" cy="120" r="3.5" fill="#29CC6A" />

              {/* Asia / Dubai */}
              <circle cx="560" cy="160" r="7" fill="#29CC6A" fillOpacity="0.3" />
              <circle cx="560" cy="160" r="3" fill="#29CC6A" />
            </svg>
          </div>

          {/* Country Bars List */}
          <div className="lg:col-span-4 space-y-4">
            {COUNTRY_DISTRIBUTION.map((item) => (
              <div key={item.name} className="space-y-1.5 font-body">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#F0F0EB] text-[#484840] font-semibold text-[10px] flex items-center justify-center">
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
