import { z } from "zod";

export const DeliveryStatusEnum = z.enum([
  "Delivered",
  "In transit",
  "Pending",
  "Picked Up",
  "Cancelled",
  "Disputed",
]);

export type DeliveryStatus = z.infer<typeof DeliveryStatusEnum>;

export const PackageTypeEnum = z.enum([
  "Clothing",
  "Furniture",
  "Sports Equipment",
  "Beauty Products",
  "Books",
  "Groceries",
  "Electronics",
  "Documents",
]);

export type PackageType = z.infer<typeof PackageTypeEnum>;

export const DeliverySchema = z.object({
  id: z.string(),
  trackNo: z.string().regex(/^RCV-\d{5}$/),
  packageType: PackageTypeEnum,
  sender: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    initials: z.string(),
  }),
  assignedTo: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    initials: z.string(),
  }),
  from: z.string(),
  destination: z.string(),
  status: DeliveryStatusEnum,
  lastUpdated: z.string(),
  amount: z.number().optional(),
});

export type DeliveryItem = z.infer<typeof DeliverySchema>;

export interface DashboardStats {
  totalUsers: number;
  totalUsersTrend: string;
  activeDeliveries: number;
  activeDeliveriesTrend: string;
  pendingVerification: number;
  pendingVerificationTrend: string;
  openDisputes: number;
  sosAlerts: number;
  supportTickets: number;
}
