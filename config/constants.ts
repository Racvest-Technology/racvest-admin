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

export const AUTH_COOKIES = {
  accessToken: "racvest_access_token",
  refreshToken: "racvest_refresh_token",
  userSession: "racvest_admin_user",
  mfaSession: "racvest_mfa_session",
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    mfaEnrollBegin: "/auth/login/mfa/enroll/begin",
    mfaEnrollConfirm: "/auth/login/mfa/enroll/confirm",
    mfaVerify: "/auth/login/mfa",
  },
  invitations: {
    list: "/invitations",
    create: "/invitations",
    accept: "/invitations/accept",
    mine: "/invitations/me",
    revoke: (id: string) => `/invitations/${id}/revoke`,
    resend: (id: string) => `/invitations/${id}/resend`,
  },
} as const;
