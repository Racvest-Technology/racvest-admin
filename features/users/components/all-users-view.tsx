"use client";

import * as React from "react";
import {
  Users,
  ShieldCheck,
  UserPlus,
  AlertTriangle,
  Clock,
  Ban,
  Flag,
  XCircle,
  ArrowRight,
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
      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total User (Dark Green Hero Card) */}
        <div className="bg-[#01250F] text-white p-5 rounded-2xl flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-white/70 font-medium font-body">
              Total User
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold font-heading">
                {ALL_USERS_STATS.total.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-[#69AA84] font-body">
                {ALL_USERS_STATS.totalGrowth}
              </span>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl flex flex-col justify-between shadow-2xs">
          <div className="w-9 h-9 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="text-xs text-[#85857B] font-medium font-body">
              Active Users
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-[#171713] font-heading">
                {ALL_USERS_STATS.active.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-[#014D21] font-body">
                {ALL_USERS_STATS.activeGrowth}
              </span>
            </div>
          </div>
        </div>

        {/* Verified Users */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl flex flex-col justify-between shadow-2xs">
          <div className="w-9 h-9 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="text-xs text-[#85857B] font-medium font-body">
              Verified Users
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-[#171713] font-heading">
                {ALL_USERS_STATS.verified.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-[#014D21] font-body">
                {ALL_USERS_STATS.verifiedGrowth}
              </span>
            </div>
          </div>
        </div>

        {/* New Users Today */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl flex flex-col justify-between shadow-2xs">
          <div className="w-9 h-9 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
            <UserPlus className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="text-xs text-[#85857B] font-medium font-body">
              New users Today
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-[#171713] font-heading">
                {ALL_USERS_STATS.todayCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Secondary Role KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Sender */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-xs text-[#85857B] font-medium font-body">
              Total Sender
            </span>
            <h3 className="text-xl font-bold text-[#171713] mt-1 font-heading">
              {ALL_USERS_STATS.totalSenders?.toLocaleString()}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Total Traveler */}
        <div className="bg-white border border-[#E3E3DC] p-5 rounded-2xl flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-xs text-[#85857B] font-medium font-body">
              Total Traveler
            </span>
            <h3 className="text-xl font-bold text-[#171713] mt-1 font-heading">
              {ALL_USERS_STATS.totalTravelers?.toLocaleString()}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Total Couriers (Orange Accent Card) */}
        <div className="bg-[#DC851F] text-[#11110F] p-5 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#11110F]/80 font-medium font-body">
              Total Couriers
            </span>
            <h3 className="text-xl font-bold text-[#11110F] mt-1 font-heading">
              {ALL_USERS_STATS.totalCouriers?.toLocaleString()}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-black/10 text-[#11110F] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Row 3: Needs Attention Action Bar */}
      <div className="bg-white border border-[#E3E3DC] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="flex flex-wrap items-center gap-6">
          {/* Main Needs Attention badge */}
          <div className="flex items-center gap-3 pr-4 border-r border-[#E3E3DC]">
            <div className="w-9 h-9 rounded-full bg-[#FFF8E7] text-[#DC851F] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#171713] font-heading">
                Needs Attention
              </h4>
              <p className="text-[11px] text-[#85857B] font-body">553 need review</p>
            </div>
          </div>

          {/* Pending Verification */}
          <button
            type="button"
            className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-full bg-[#FFF8E7] text-[#DC851F] flex items-center justify-center">
              <Clock className="w-3 h-3" />
            </div>
            <span className="text-[#85857B] font-medium font-body">Pending Verification</span>
            <span className="font-bold text-[#171713]">345</span>
            <ArrowRight className="w-3 h-3 text-[#85857B] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Suspended */}
          <button
            type="button"
            className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-full bg-[#FEF2F0] text-[#C83B2B] flex items-center justify-center">
              <Ban className="w-3 h-3" />
            </div>
            <span className="text-[#85857B] font-medium font-body">Suspended</span>
            <span className="font-bold text-[#171713]">128</span>
            <ArrowRight className="w-3 h-3 text-[#85857B] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Flagged Accounts */}
          <button
            type="button"
            className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-full bg-[#FFF8E7] text-[#DC851F] flex items-center justify-center">
              <Flag className="w-3 h-3" />
            </div>
            <span className="text-[#85857B] font-medium font-body">Flagged Accounts</span>
            <span className="font-bold text-[#171713]">45</span>
            <ArrowRight className="w-3 h-3 text-[#85857B] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Rejected */}
          <button
            type="button"
            className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-full bg-[#FEF2F0] text-[#C83B2B] flex items-center justify-center">
              <XCircle className="w-3 h-3" />
            </div>
            <span className="text-[#85857B] font-medium font-body">Rejected</span>
            <span className="font-bold text-[#171713]">35</span>
            <ArrowRight className="w-3 h-3 text-[#85857B] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Review Queue Button */}
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] hover:bg-[#F7F7F3] transition-colors cursor-pointer shrink-0 font-body shadow-2xs"
        >
          <span>Review queue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

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
