import type { DeliveryItem } from "@/types/delivery";

export type ShipmentStatus = DeliveryItem["status"];

export interface ProofOfDelivery {
  id: string;
  shipmentId: string;
  recipientName: string;
  signatureUrl?: string;
  photoUrl?: string;
  deliveredAt: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface ShipmentDispute {
  id: string;
  shipmentId: string;
  reporterType: "sender" | "recipient" | "courier";
  reason: "damaged_goods" | "missing_item" | "undelivered" | "pricing_dispute" | "other";
  status: "open" | "investigating" | "resolved" | "rejected";
  description: string;
  createdAt: string;
  resolvedAt?: string;
}
