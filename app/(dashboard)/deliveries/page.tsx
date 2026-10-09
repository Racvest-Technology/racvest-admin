import * as React from "react";
import { DeliveryManagementView } from "@/features/deliveries";

export const metadata = {
  title: "Delivery Management | Racvest Admin",
  description: "Monitor and manage all deliveries across the platform in real-time.",
};

export default function DeliveriesPage() {
  return <DeliveryManagementView />;
}
