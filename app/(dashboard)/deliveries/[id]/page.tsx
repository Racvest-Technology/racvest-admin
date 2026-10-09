import * as React from "react";
import { DeliveryDetailView } from "@/features/deliveries";

export const metadata = {
  title: "Delivery Details | Racvest Admin",
  description: "View live tracking, progress, parties, and package information for this delivery.",
};

export default async function DeliveryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DeliveryDetailView deliveryId={id} />;
}
