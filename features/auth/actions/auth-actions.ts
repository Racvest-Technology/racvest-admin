"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { apiClient, parseApiError } from "@/lib/api-client";
import { API_ENDPOINTS, AUTH_COOKIES } from "@/config/constants";
import {
  loginInputSchema,
  type AuthActionResult,
  type AuthSession,
  type AuthUser,
  type LoginInput,
  type LoginResponse,
  type LoginStatus,
} from "../types";

/**
 * Helper to safely read string fields from dynamic backend response payloads
 */
function pickString(
  obj: Record<string, unknown> | undefined,
  keys: string[]
): string | undefined {
  if (!obj) return undefined;
  for (const key of keys) {
    const val = obj[key];
    if (typeof val === "string" && val.trim().length > 0) {
      return val.trim();
    }
  }
  return undefined;
}

/**
 * Normalizes `LoginResponse` from `POST https://api.racvest.xyz/auth/login`
 * Example response:
 * {
 *   "status": "AUTHENTICATED",
 *   "accessToken": "string",
 *   "refreshToken": "string",
 *   "sessionId": "string",
 *   "sessionExpiresInSeconds": 0,
 *   "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 * }
 */
function normalizeLoginResponse(
  raw: unknown,
  fallbackIdentifier: string
): AuthSession {
  const root = (
    typeof raw === "object" && raw !== null ? raw : {}
  ) as Record<string, unknown>;
  const nestedData = (
    typeof root.data === "object" && root.data !== null ? root.data : root
  ) as Record<string, unknown>;

  const status = (pickString(nestedData, ["status"]) ??
    pickString(root, ["status"]) ??
    "AUTHENTICATED") as LoginStatus;

  const accessToken =
    pickString(nestedData, ["accessToken", "access_token", "token", "jwt"]) ??
    pickString(root, ["accessToken", "access_token", "token", "jwt"]) ??
    "";

  const refreshToken =
    pickString(nestedData, ["refreshToken", "refresh_token"]) ??
    pickString(root, ["refreshToken", "refresh_token"]);

  const sessionId =
    pickString(nestedData, ["sessionId", "session_id"]) ??
    pickString(root, ["sessionId", "session_id"]);

  const rawExpires =
    nestedData.sessionExpiresInSeconds ?? root.sessionExpiresInSeconds;
  const sessionExpiresInSeconds =
    typeof rawExpires === "number" && rawExpires > 0 ? rawExpires : undefined;

  const userId =
    pickString(nestedData, ["userId", "id", "_id", "adminId"]) ??
    pickString(root, ["userId", "id", "_id", "adminId"]);

  const rawUser = (
    (typeof nestedData.user === "object" &&
      nestedData.user !== null &&
      nestedData.user) ||
    (typeof nestedData.admin === "object" &&
      nestedData.admin !== null &&
      nestedData.admin) ||
    (typeof root.user === "object" && root.user !== null && root.user) ||
    (typeof root.admin === "object" && root.admin !== null && root.admin) ||
    nestedData
  ) as Record<string, unknown>;

  const email = pickString(rawUser, ["email"]) ?? fallbackIdentifier;
  const firstName = pickString(rawUser, ["firstName", "first_name"]);
  const lastName = pickString(rawUser, ["lastName", "last_name"]);
  const fullNameFromParts = [firstName, lastName].filter(Boolean).join(" ");
  const emailPrefix = email.includes("@")
    ? email.split("@")[0] || "Admin"
    : "Admin";

  const name =
    pickString(rawUser, ["name", "fullName", "full_name", "username"]) ||
    fullNameFromParts ||
    emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);

  const user: AuthUser = {
    id: userId ?? email,
    email,
    name,
    firstName,
    lastName,
    role: pickString(rawUser, ["role", "userType", "accountType"]) ?? "ADMIN",
    avatar: pickString(rawUser, ["avatar", "avatarUrl", "profilePicture"]),
  };

  return {
    status,
    accessToken,
    refreshToken,
    sessionId,
    sessionExpiresInSeconds,
    userId,
    user,
  };
}

/**
 * Server Action: Authenticates an admin against `POST https://api.racvest.xyz/auth/login`
 * Request Body: `{ identifier, password }`
 * On success, commits auth cookies then performs a server-side redirect to `redirectTo`.
 */
export async function loginAction(
  input: LoginInput,
  redirectTo = "/"
): Promise<AuthActionResult> {
  const parsed = loginInputSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof LoginInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof LoginInput | undefined;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid login credentials.",
      fieldErrors,
    };
  }

  try {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.auth.login,
      {
        identifier: parsed.data.identifier,
        password: parsed.data.password,
      }
    );

    const session = normalizeLoginResponse(
      response.data,
      parsed.data.identifier
    );

    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === "production";
    const mfaSessionMaxAge = session.sessionExpiresInSeconds ?? 300;

    // ── Intermediate MFA / verification states ──────────────────────────────
    // The backend issues a sessionId but no accessToken until the second factor
    // is verified. Store the sessionId in a short-lived cookie and redirect.
    if (
      session.status === "MFA_ENROLLMENT_REQUIRED" ||
      session.status === "MFA_REQUIRED" ||
      session.status === "PHONE_VERIFICATION_REQUIRED"
    ) {
      if (session.sessionId) {
        cookieStore.set(AUTH_COOKIES.mfaSession, session.sessionId, {
          httpOnly: true,
          secure: isProduction,
          sameSite: "lax",
          path: "/",
          maxAge: mfaSessionMaxAge,
        });
      }

      const mfaRedirect =
        session.status === "MFA_ENROLLMENT_REQUIRED"
          ? "/mfa/enroll"
          : session.status === "MFA_REQUIRED"
            ? "/mfa/verify"
            : "/verify-phone";

      redirect(mfaRedirect);
    }

    // ── Fully authenticated ─────────────────────────────────────────────────
    if (!session.accessToken) {
      return {
        success: false,
        error: "Login failed: no session token was issued. Please try again.",
      };
    }

    const accessTokenMaxAge = session.sessionExpiresInSeconds ?? 60 * 60 * 24;

    cookieStore.set(AUTH_COOKIES.accessToken, session.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: accessTokenMaxAge,
    });

    if (session.refreshToken) {
      cookieStore.set(AUTH_COOKIES.refreshToken, session.refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    cookieStore.set(AUTH_COOKIES.userSession, JSON.stringify(session.user), {
      httpOnly: false,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: accessTokenMaxAge,
    });

    // All cookies committed — redirect to dashboard.
    redirect(redirectTo);
  } catch (err: unknown) {
    // Re-throw Next.js redirect signals — they must not be swallowed.
    if (isRedirectError(err)) throw err;

    const apiError = parseApiError(err);
    return {
      success: false,
      error: apiError.message,
    };
  }
}

/**
 * Server Action: Clears authentication cookies and invalidates backend session on logout
 */
export async function logoutAction(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_COOKIES.accessToken)?.value;

  if (accessToken) {
    try {
      await apiClient.post(
        API_ENDPOINTS.auth.logout,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch {
      // Proceed with clearing cookies even if backend logout fails or token expired
    }
  }

  cookieStore.delete(AUTH_COOKIES.accessToken);
  cookieStore.delete(AUTH_COOKIES.refreshToken);
  cookieStore.delete(AUTH_COOKIES.userSession);
  return { success: true };
}

/**
 * Server helper: Reads the current authenticated admin session from cookies
 */
export async function getServerAuthSession(): Promise<{
  accessToken: string | null;
  user: AuthUser | null;
}> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_COOKIES.accessToken)?.value ?? null;
  const rawUser = cookieStore.get(AUTH_COOKIES.userSession)?.value;

  if (!accessToken) {
    return { accessToken: null, user: null };
  }

  if (rawUser) {
    try {
      const parsed = JSON.parse(rawUser) as AuthUser;
      if (parsed && typeof parsed.email === "string") {
        return { accessToken, user: parsed };
      }
    } catch {
      // Fallback to default admin user object below
    }
  }

  return {
    accessToken,
    user: {
      id: "admin",
      email: "admin@racvest.com",
      name: "Admin",
      role: "ADMIN",
    },
  };
}
