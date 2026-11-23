"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { apiClient, parseApiError } from "@/lib/api-client";
import { API_ENDPOINTS, AUTH_COOKIES } from "@/config/constants";
import type {
  MfaEnrollBeginActionResult,
  MfaEnrollBeginResponse,
  MfaEnrollConfirmActionResult,
  MfaEnrollConfirmResponse,
  MfaVerifyActionResult,
  MfaVerifyResponse,
  AuthUser,
} from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Reads the MFA sessionId from the httpOnly cookie. Redirects to /login if missing. */
async function requireMfaSession(): Promise<string> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(AUTH_COOKIES.mfaSession)?.value;
  if (!sessionId) redirect("/login");
  return sessionId;
}

/** Commits the full auth session into cookies after successful MFA. */
async function commitAuthSession(
  accessToken: string,
  refreshToken: string,
  userId?: string
) {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";
  const maxAge = 60 * 60 * 24; // 24h

  cookieStore.set(AUTH_COOKIES.accessToken, accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  cookieStore.set(AUTH_COOKIES.refreshToken, refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Build a minimal user record from what we have — AuthSessionSync in the
  // dashboard layout will re-hydrate the full profile from the cookie.
  const minimalUser: AuthUser = {
    id: userId ?? "admin",
    email: "",
    name: "Admin",
    role: "ADMIN",
  };

  cookieStore.set(AUTH_COOKIES.userSession, JSON.stringify(minimalUser), {
    httpOnly: false,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  // Clear the short-lived MFA session cookie.
  cookieStore.delete(AUTH_COOKIES.mfaSession);
}

// ─────────────────────────────────────────────────────────────────────────────
// Server Actions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Step 1 of MFA enrollment.
 * Calls POST /auth/login/mfa/enroll/begin with the sessionId cookie.
 * Returns { secret, otpauthUri } to render the QR code.
 */
export async function mfaEnrollBeginAction(): Promise<MfaEnrollBeginActionResult> {
  try {
    const sessionId = await requireMfaSession();

    const response = await apiClient.post<MfaEnrollBeginResponse>(
      API_ENDPOINTS.auth.mfaEnrollBegin,
      { sessionId }
    );

    const { secret, otpauthUri } = response.data;

    if (!secret || !otpauthUri) {
      return {
        success: false,
        error: "MFA enrollment setup failed: missing QR data from server.",
      };
    }

    return { success: true, secret, otpauthUri };
  } catch (err: unknown) {
    if (isRedirectError(err)) throw err;
    return { success: false, error: parseApiError(err).message };
  }
}

/**
 * Step 2 of MFA enrollment.
 * Calls POST /auth/login/mfa/enroll/confirm with the TOTP code.
 * On success, commits auth cookies and returns recovery codes.
 * The caller (page) redirects to / after the user saves recovery codes.
 */
export async function mfaEnrollConfirmAction(
  code: string
): Promise<MfaEnrollConfirmActionResult> {
  try {
    const sessionId = await requireMfaSession();

    const response = await apiClient.post<MfaEnrollConfirmResponse>(
      API_ENDPOINTS.auth.mfaEnrollConfirm,
      { sessionId, code }
    );

    const { accessToken, refreshToken, recoveryCodes } = response.data;

    if (!accessToken || !refreshToken) {
      return {
        success: false,
        error: "MFA enrollment confirmation failed: no tokens returned.",
      };
    }

    await commitAuthSession(accessToken, refreshToken);

    return { success: true, recoveryCodes: recoveryCodes ?? [] };
  } catch (err: unknown) {
    if (isRedirectError(err)) throw err;
    return { success: false, error: parseApiError(err).message };
  }
}

/**
 * Subsequent logins — MFA code verification.
 * Calls POST /auth/login/mfa with the TOTP code.
 * On success, commits auth cookies and redirects to /.
 */
export async function mfaVerifyAction(
  code: string
): Promise<MfaVerifyActionResult> {
  try {
    const sessionId = await requireMfaSession();

    const response = await apiClient.post<MfaVerifyResponse>(
      API_ENDPOINTS.auth.mfaVerify,
      { sessionId, code }
    );

    const { accessToken, refreshToken, userId } = response.data;

    if (!accessToken || !refreshToken) {
      return {
        success: false,
        error: "MFA verification failed: no tokens returned.",
      };
    }

    await commitAuthSession(accessToken, refreshToken, userId);

    redirect("/");
  } catch (err: unknown) {
    if (isRedirectError(err)) throw err;
    return { success: false, error: parseApiError(err).message };
  }
}

