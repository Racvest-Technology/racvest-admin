export interface TariffRule {
  id: string;
  vehicleType: "bike" | "car" | "van" | "truck";
  baseFareNgn: number;
  perKmRateNgn: number;
  perMinuteRateNgn: number;
  minimumFareNgn: number;
  updatedAt: string;
}

export interface SurgeZone {
  id: string;
  name: string;
  polygonCoordinates: [number, number][];
  multiplier: number; // e.g. 1.25 for 1.25x
  isActive: boolean;
  reason?: string;
  updatedAt: string;
}
