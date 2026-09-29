import * as React from "react";
import Link from "next/link";
import { LiveDeliveriesTable } from "@/features/dashboard/components/live-deliveries-table";
import { ArrowLeft } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  active: "Active Deliveries",
  "in-transit": "In-Transit Deliveries",
  pending: "Pending Deliveries",
  delivered: "Delivered Packages",
  cancelled: "Cancelled Orders",
  disputed: "Disputed Deliveries",
};

export default async function DeliveryStatusPage({
  params,
}: {
  params: Promise<{ status: string }>;
}) {
  const { status } = await params;
  const title = STATUS_LABELS[status.toLowerCase()] || `${status.toUpperCase()} Deliveries`;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12 font-body">
      <div className="flex items-center justify-between">
        <Link
          href="/deliveries"
          className="flex items-center gap-2 text-xs font-bold text-[#171713] hover:text-[#014D21] transition-colors group"
        >
          <div className="w-8 h-8 rounded-full border border-[#E3E3DC] bg-white flex items-center justify-center group-hover:bg-[#F7F7F3] shadow-2xs">
            <ArrowLeft className="w-4 h-4 text-[#171713]" />
          </div>
          <span>Back to Deliveries</span>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#171713] font-heading capitalize">
          {title}
        </h1>
        <p className="text-xs text-[#85857B] mt-0.5 font-medium">
          Filter and monitor {title.toLowerCase()} across all active couriers and regions.
        </p>
      </div>

      <React.Suspense fallback={<div className="h-96 rounded-2xl bg-white border border-[#E3E3DC] animate-pulse" />}>
        <LiveDeliveriesTable />
      </React.Suspense>
    </div>
  );
}
