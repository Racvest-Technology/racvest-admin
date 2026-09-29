import * as React from "react";
import { LiveDeliveriesTable } from "@/features/dashboard/components/live-deliveries-table";
import { Package, Truck, CheckCircle2, AlertTriangle } from "lucide-react";

export default function DeliveriesPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12 font-body">
      {/* Deliveries Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#171713] font-heading">
            Deliveries
          </h1>
          <p className="text-xs text-[#85857B] mt-0.5 font-medium">
            Real-time package dispatch, active in-transit tracking, and PoD audit logs.
          </p>
        </div>
      </div>

      {/* KPI Metric Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
            <Package className="w-4 h-4" />
          </div>
          <div className="mt-3">
            <span className="text-xs text-[#85857B] font-medium">Total Shipments</span>
            <h3 className="text-xl font-bold text-[#171713] mt-0.5 font-heading">1,482</h3>
          </div>
        </div>

        <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
            <Truck className="w-4 h-4" />
          </div>
          <div className="mt-3">
            <span className="text-xs text-[#85857B] font-medium">In-Transit</span>
            <h3 className="text-xl font-bold text-[#171713] mt-0.5 font-heading">328</h3>
          </div>
        </div>

        <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-[#E6F1EB] text-[#014D21] flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="mt-3">
            <span className="text-xs text-[#85857B] font-medium">Delivered Today</span>
            <h3 className="text-xl font-bold text-[#171713] mt-0.5 font-heading">184</h3>
          </div>
        </div>

        <div className="bg-white border border-[#E3E3DC] p-4 rounded-2xl shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-[#FEF2F0] text-[#C83B2B] flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="mt-3">
            <span className="text-xs text-[#85857B] font-medium">Exceptions & Disputed</span>
            <h3 className="text-xl font-bold text-[#171713] mt-0.5 font-heading">12</h3>
          </div>
        </div>
      </div>

      {/* Live Table */}
      <React.Suspense fallback={<div className="h-96 rounded-2xl bg-white border border-[#E3E3DC] animate-pulse" />}>
        <LiveDeliveriesTable />
      </React.Suspense>
    </div>
  );
}
