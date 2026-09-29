export type UserTab = "all" | "sender" | "traveler" | "courier";

export interface UserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  codeId: string;
  location: string;
  verification: "Verified" | "Pending";
  status: "Active" | "Inactive" | "Suspended" | "Banned";
  risk: "Safe" | "Flag";
  lastActive: string;
  availability?: "On" | "Off";
}

export interface UserStats {
  total: number;
  totalGrowth: string;
  active: number;
  activeGrowth: string;
  verified: number;
  verifiedGrowth: string;
  todayCount: number;
  totalSenders?: number;
  totalTravelers?: number;
  totalCouriers?: number;
  averageRating?: number;
  availableCouriers?: number;
}
