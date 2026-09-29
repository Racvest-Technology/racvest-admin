import type { DashboardStats, DeliveryItem } from "@/types/delivery";

export type { DashboardStats, DeliveryItem };

export type DashboardDateRange = "today" | "last-7-days" | "last-30-days" | "custom";

export interface DashboardFilterState {
  searchQuery: string;
  statusFilter: string;
  dateRange: DashboardDateRange;
}
