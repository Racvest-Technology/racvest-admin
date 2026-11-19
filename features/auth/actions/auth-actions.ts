"use server";

import { cookies } from "next/headers";
import { apiClient, parseApiError } from "@/lib/api-client";
import { API_ENDPOINTS, AUTH_COOKIES } from "@/config/constants";
import {
  loginInputSchema,
  type AuthActionResult,
  type AuthSession,
  type AuthUser,
  type LoginInput,
} from "../types";

/**
 * Helper to safely read string fields from dynamic backend response payloads
 */
function pickString(obj: Record<string, unknown> | undefined, keys: string[]): string | undefined {
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
 * Normalizes flexible backend response structures from `POST https://api.racvest.xyz/auth/login`
 */
function normalizeLoginResponse(raw: unknown, fallbackEmail: string): AuthSession {
  const root = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;
  const nestedData = (
    typeof root.data === "object" && root.data !== null ? root.data : root
  ) as Record<string, unknown>;

  const tokensObj = (
    typeof nestedData.tokens === "object" && nestedData.tokens !== null
      ? nestedData.tokens
      : nestedData
  ) as Record<string, unknown>;

  const accessToken =
    pickString(tokensObj, ["accessToken", "access_token", "token", "jwt"]) ??
    pickString(nestedData, ["accessToken", "access_token", "token", "jwt"]) ??
    pickString(root, ["accessToken", "access_token", "token", "jwt"]) ??
    "";

  const refreshToken =
    pickString(tokensObj, ["refreshToken", "refresh_token"]) ??
    pickString(nestedData, ["refreshToken", "refresh_token"]) ??
    pickString(root, ["refreshToken", "refresh_token"]);

  const rawUser = (
    (typeof nestedData.user === "object" && nestedData.user !== null && nestedData.user) ||
    (typeof nestedData.admin === "object" && nestedData.admin !== null && nestedData.admin) ||
    (typeof root.user === "object" && root.user !== null && root.user) ||
    (typeof root.admin === "object" && root.admin !== null && root.admin) ||
    nestedData
  ) as Record<string, unknown>;

  const email = pickString(rawUser, ["email"]) ?? fallbackEmail;
  const firstName = pickString(rawUser, ["firstName", "first_name"]);
  const lastName = pickString(rawUser, ["lastName", "last_name"]);
  const fullNameFromParts = [firstName, lastName].filter(Boolean).join(" ");
  const emailPrefix = email.split("@")[0] || "Admin";

  const name =
    pickString(rawUser, ["name", "fullName", "full_name", "username"]) ||
    fullNameFromParts ||
    emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);

  const user: AuthUser = {
    id: pickString(rawUser, ["id", "_id", "userId", "adminId"]) ?? email,
    email,
    name,
    firstName,
    lastName,
    role: pickString(rawUser, ["role", "userType", "accountType"]) ?? "ADMIN",
    avatar: pickString(rawUser, ["avatar", "avatarUrl", "profilePicture"]),
  };

  return {
    accessToken,
    refreshToken,
    user,
  };
}

/**
 * Server Action: Authenticates an admin against `POST https://api.racvest.xyz/auth/login`
 * using the shared Axios client and persists HttpOnly session cookies.
 */
export async function loginAction(input: LoginInput): Promise<AuthActionResult> {
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
    const response = await apiClient.post(API_ENDPOINTS.auth.login, {
      email: parsed.data.email,
      password: parsed.data.password,
    });

    const session = normalizeLoginResponse(response.data, parsed.data.email);
    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === "production";

    if (session.accessToken) {
      cookieStore.set(AUTH_COOKIES.accessToken, session.accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });
    }

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
      maxAge: 60 * 60 * 24,
    });

    const responseObj =
      typeof response.data === "object" && response.data !== null
        ? (response.data as Record<string, unknown>)
        : {};
    const apiMessage =
      typeof responseObj.message === "string"
        ? responseObj.message
        : "Welcome back! Redirecting to operations portal...";

    return {
      success: true,
      message: apiMessage,
      user: session.user,
      accessToken: session.accessToken,
    };
  } catch (err: unknown) {
    const apiError = parseApiError(err);
    return {
      success: false,
      error: apiError.message,
    };
  }
}

/**
 * Server Action: Clears authentication cookies on logout
 */
export async function logoutAction(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIES.accessToken);
  cookieStore.delete(AUTH_COOKIES.refreshToken);
  cookieStore.delete(AUTH_COOKIES.userSession);
  return { success: true };
}
