import * as React from "react";
import { AlertTriangle, Flame, Headphones } from "lucide-react";
import { DashboardStats } from "@/types/delivery";

interface AlertTickersProps {
  stats: DashboardStats;
}

export function AlertTickers({ stats }: AlertTickersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Open Disputes */}
      <div className="bg-white border border-[#E3E3DC] rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-[#66665D] uppercase tracking-wider">
            Open Disputes
          </p>
          <p className="text-2xl font-bold text-[#171713] mt-1 font-primary">
            {stats.openDisputes}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#FFF4E5] text-[#DC851F] flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      {/* SOS Alerts */}
      <div className="bg-white border border-[#E3E3DC] rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-[#66665D] uppercase tracking-wider">
            SOS Alerts
          </p>
          <p className="text-2xl font-bold text-[#C83B2B] mt-1 font-primary">
            {stats.sosAlerts}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#FEF2F0] text-[#C83B2B] flex items-center justify-center">
          <Flame className="w-5 h-5" />
        </div>
      </div>

      {/* Support Ticket */}
      <div className="bg-white border border-[#E3E3DC] rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-[#66665D] uppercase tracking-wider">
            Support Ticket
          </p>
          <p className="text-2xl font-bold text-[#171713] mt-1 font-primary">
            {stats.supportTickets}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#EFF6FA] text-[#277A9E] flex items-center justify-center">
          <Headphones className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
