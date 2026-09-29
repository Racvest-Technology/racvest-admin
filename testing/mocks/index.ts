import type { DeliveryItem, DashboardStats } from "@/types/delivery";

/**
 * Factory to generate mock DeliveryItem for unit/integration tests
 */
export function createMockDelivery(overrides?: Partial<DeliveryItem>): DeliveryItem {
  return {
    id: "RCV-001",
    trackNo: "RCV-10293",
    packageType: "Electronics",
    sender: {
      name: "Chioma Adeleke",
      initials: "CA",
    },
    assignedTo: {
      name: "Babajide Sanwo",
      initials: "BS",
    },
    from: "Victoria Island, Lagos",
    destination: "Lekki Phase 1, Lagos",
    status: "In transit",
    lastUpdated: "10 mins ago",
    amount: 4500,
    ...overrides,
  };
}

/**
 * Factory to generate mock DashboardStats for tests
 */
export function createMockDashboardStats(overrides?: Partial<DashboardStats>): DashboardStats {
  return {
    totalUsers: 24500,
    totalUsersTrend: "+12.5%",
    activeDeliveries: 42,
    activeDeliveriesTrend: "+8.1%",
    pendingVerification: 18,
    pendingVerificationTrend: "-2.4%",
    openDisputes: 5,
    sosAlerts: 0,
    supportTickets: 12,
    ...overrides,
  };
}
