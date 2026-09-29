export type KycStatus = "pending" | "under_review" | "approved" | "rejected";

export interface CourierProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  kycStatus: KycStatus;
  rating: number;
  completedDeliveries: number;
  joinedAt: string;
}

export interface KycDocument {
  id: string;
  courierId: string;
  documentType: "drivers_license" | "national_id" | "vehicle_insurance" | "road_worthiness";
  fileUrl: string;
  uploadedAt: string;
  status: KycStatus;
  rejectionReason?: string;
}
