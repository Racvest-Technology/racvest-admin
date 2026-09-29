/**
 * Global Platform Constants for Racvest Admin
 */
export const APP_CONFIG = {
  name: "Racvest Admin",
  description: "On-Demand Courier Logistics & Package Delivery Admin Portal",
  version: "1.0.0",
  company: "Racvest Technology",
} as const;

export const PAGINATION_DEFAULTS = {
  pageIndex: 0,
  pageSize: 10,
  pageSizeOptions: [10, 20, 50, 100],
} as const;

export const TELEMETRY_CONFIG = {
  pollingIntervalMs: 5000,
  reconnectDelayMs: 2000,
  maxHistoricalPoints: 50,
} as const;

export const CURRENCY = {
  code: "NGN",
  symbol: "₦",
  locale: "en-NG",
} as const;
