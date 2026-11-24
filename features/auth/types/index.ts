import { z } from "zod";

/**
 * Zod schema for Admin Login credentials (`POST /auth/login`)
 * Backend `LoginRequest`: `{ identifier, password }`
 */
export const loginInputSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Email address or phone number is required"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

/**
 * Login status returned by `POST /auth/login` (`LoginResponse`)
 */
export const loginStatusSchema = z.enum([
  "AUTHENTICATED",
  "MFA_REQUIRED",
  "MFA_ENROLLMENT_REQUIRED",
  "PHONE_VERIFICATION_REQUIRED",
]);

export type LoginStatus = z.infer<typeof loginStatusSchema>;

/**
 * Raw response schema from `POST /auth/login` (`LoginResponse`)
 */
export interface LoginResponse {
  status?: LoginStatus;
  accessToken?: string;
  refreshToken?: string;
  sessionId?: string;
  sessionExpiresInSeconds?: number;
  userId?: string;
}

/**
 * Admin Invitation Role values matching backend OpenAPI spec
 */
export const adminInvitationRoleSchema = z.enum([
  "SUPER_ADMIN",
  "FINANCE",
  "SUPPORT",
  "OPERATIONS",
  "COMPLIANCE",
]);

export type AdminInvitationRole = z.infer<typeof adminInvitationRoleSchema>;

/**
 * Admin Invitation Status values matching backend OpenAPI spec
 */
export const adminInvitationStatusSchema = z.enum([
  "PENDING",
  "ACCEPTED",
  "EXPIRED",
  "REVOKED",
]);

export type AdminInvitationStatus = z.infer<typeof adminInvitationStatusSchema>;

/**
 * Zod schema for Accepting an Admin Invitation (`POST /invitations/accept`)
 * Matches backend `AcceptInvitationDto`: `{ token, password, phoneNumber }`
 */
export const acceptInvitationInputSchema = z
  .object({
    token: z
      .string()
      .trim()
      .min(1, "Invitation token is missing or invalid"),
    phoneNumber: z
      .string()
      .trim()
      .min(7, "Please enter a valid phone number")
      .max(20, "Phone number is too long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type AcceptInvitationInput = z.infer<typeof acceptInvitationInputSchema>;

/**
 * Zod schema for Inviting a New Admin (`POST /invitations`)
 * Matches backend `InvitationRequestDto`
 */
export const createInvitationInputSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  role: adminInvitationRoleSchema,
  department: z.string().trim().optional(),
});

export type CreateInvitationInput = z.infer<typeof createInvitationInputSchema>;

/**
 * Admin Invitation record returned by `GET /invitations` & `GET /invitations/me`
 */
export interface AdminInvitation {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  adminRole?: AdminInvitationRole;
  role?: AdminInvitationRole;
  department?: string;
  status: AdminInvitationStatus;
  invitedBy: string;
  invitedByName?: string;
  expiresAt: string;
  createdAt: string;
  acceptedAt?: string;
}

/**
 * Paginated response for Admin Invitations (`PagedResponseAdminInvitationDto`)
 */
export interface PagedAdminInvitations {
  content: AdminInvitation[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

/**
 * Registration response returned by `POST /invitations/accept` (`RegisterResponse`)
 */
export interface AcceptInvitationResponse {
  userId?: string;
  email?: string;
  phoneNumber?: string;
  phoneVerified?: boolean;
  ninVerified?: boolean;
  registeredAt?: string;
}

/**
 * Standardized Server Action response for `acceptInvitationAction`
 */
export interface AcceptInvitationActionResult {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof AcceptInvitationInput, string>>;
  data?: AcceptInvitationResponse;
}

/**
 * Standardized Server Action response for admin invitation mutations
 */
export interface InvitationMutationResult {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof CreateInvitationInput, string>>;
  invitation?: AdminInvitation;
}

/**
 * Authenticated Admin User Profile
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  avatar?: string;
}

/**
 * Normalized Authentication Session returned after parsing `POST /auth/login`
 */
export interface AuthSession {
  status: LoginStatus;
  accessToken: string;
  refreshToken?: string;
  sessionId?: string;
  sessionExpiresInSeconds?: number;
  userId?: string;
  user: AuthUser;
}

/**
 * Standardized Server Action response envelope
 */
export interface AuthActionResult {
  success: boolean;
  status?: LoginStatus;
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof LoginInput, string>>;
  user?: AuthUser;
  accessToken?: string;
  sessionId?: string;
  sessionExpiresInSeconds?: number;
  userId?: string;
  /** Client-side redirect path returned when MFA is required. */
  redirectTo?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MFA Enrollment — POST /auth/login/mfa/enroll/begin
// ─────────────────────────────────────────────────────────────────────────────

/** Response from POST /auth/login/mfa/enroll/begin */
export interface MfaEnrollBeginResponse {
  secret: string;
  otpauthUri: string;
}

/** Server Action result for mfa enroll begin */
export interface MfaEnrollBeginActionResult {
  success: boolean;
  secret?: string;
  otpauthUri?: string;
  error?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MFA Enrollment Confirm — POST /auth/login/mfa/enroll/confirm
// ─────────────────────────────────────────────────────────────────────────────

/** Request body for POST /auth/login/mfa/enroll/confirm */
export interface MfaEnrollConfirmInput {
  sessionId: string;
  code: string;
}

/** Response from POST /auth/login/mfa/enroll/confirm */
export interface MfaEnrollConfirmResponse {
  accessToken: string;
  refreshToken: string;
  recoveryCodes: string[];
}

/** Server Action result for mfa enroll confirm */
export interface MfaEnrollConfirmActionResult {
  success: boolean;
  recoveryCodes?: string[];
  error?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MFA Verify (subsequent logins) — POST /auth/login/mfa
// ─────────────────────────────────────────────────────────────────────────────

/** Request body for POST /auth/login/mfa */
export interface MfaVerifyInput {
  sessionId: string;
  code: string;
}

/** Response from POST /auth/login/mfa — same shape as AUTHENTICATED login */
export interface MfaVerifyResponse {
  status: LoginStatus;
  accessToken: string;
  refreshToken: string;
  sessionId?: string;
  sessionExpiresInSeconds?: number;
  userId?: string;
}

/** Server Action result for mfa verify */
export interface MfaVerifyActionResult {
  success: boolean;
  error?: string;
}
