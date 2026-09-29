export type VehicleType = "bike" | "car" | "van" | "truck";

export type CourierStatus = "idle" | "assigned" | "en-route-pickup" | "en-route-dropoff" | "offline";

export interface TelemetryLocation {
  latitude: number;
  longitude: number;
  heading: number;
  speedKmh: number;
  timestamp: string;
}

export interface DispatchCourier {
  id: string;
  name: string;
  phone: string;
  status: CourierStatus;
  vehicleType: VehicleType;
  location: TelemetryLocation;
  activeShipmentId?: string;
}

export interface ReassignCourierPayload {
  shipmentId: string;
  previousCourierId: string;
  newCourierId: string;
  reason: string;
}
