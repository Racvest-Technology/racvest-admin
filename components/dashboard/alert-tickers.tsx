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
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Open Disputes
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {stats.openDisputes}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      {/* SOS Alerts */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            SOS Alerts
          </p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {stats.sosAlerts}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
          <Flame className="w-5 h-5" />
        </div>
      </div>

      {/* Support Ticket */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Support Ticket
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {stats.supportTickets}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
          <Headphones className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
