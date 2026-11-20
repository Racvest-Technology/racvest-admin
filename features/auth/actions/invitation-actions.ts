"use server";

import { cookies } from "next/headers";
import { apiClient, parseApiError } from "@/lib/api-client";
import { API_ENDPOINTS, AUTH_COOKIES } from "@/config/constants";
import {
  acceptInvitationInputSchema,
  createInvitationInputSchema,
  type AcceptInvitationActionResult,
  type AcceptInvitationInput,
  type AcceptInvitationResponse,
  type AdminInvitation,
  type AdminInvitationStatus,
  type CreateInvitationInput,
  type InvitationMutationResult,
  type PagedAdminInvitations,
} from "../types";

/**
 * Helper to retrieve the authenticated admin's Bearer token from HttpOnly cookies
 */
async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIES.accessToken)?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Server Action: Accept an admin invitation and complete registration
 * Endpoint: `POST /invitations/accept`
 * Payload (`AcceptInvitationDto`): `{ token, password, phoneNumber }`
 */
export async function acceptInvitationAction(
  input: AcceptInvitationInput
): Promise<AcceptInvitationActionResult> {
  const parsed = acceptInvitationInputSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof AcceptInvitationInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof AcceptInvitationInput | undefined;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Please check your registration details.",
      fieldErrors,
    };
  }

  try {
    const response = await apiClient.post<AcceptInvitationResponse>(
      API_ENDPOINTS.invitations.accept,
      {
        token: parsed.data.token,
        password: parsed.data.password,
        phoneNumber: parsed.data.phoneNumber,
      }
    );

    const data = response.data ?? {};
    return {
      success: true,
      message: "Invitation accepted! Your admin account is ready.",
      data,
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
 * Server Action: Retrieve a paginated list of all admin invitations
 * Endpoint: `GET /invitations`
 */
export async function getInvitationsAction(params?: {
  status?: AdminInvitationStatus;
  page?: number;
  size?: number;
}): Promise<{
  success: boolean;
  data?: PagedAdminInvitations;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaders();
    const response = await apiClient.get<PagedAdminInvitations>(
      API_ENDPOINTS.invitations.list,
      {
        params: {
          status: params?.status,
          page: params?.page ?? 0,
          size: params?.size ?? 20,
        },
        headers,
      }
    );

    return {
      success: true,
      data: response.data,
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
 * Server Action: Retrieve all invitations sent by the authenticated admin
 * Endpoint: `GET /invitations/me`
 */
export async function getMyInvitationsAction(params?: {
  status?: AdminInvitationStatus;
  page?: number;
  size?: number;
}): Promise<{
  success: boolean;
  data?: PagedAdminInvitations;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaders();
    const response = await apiClient.get<PagedAdminInvitations>(
      API_ENDPOINTS.invitations.mine,
      {
        params: {
          status: params?.status,
          page: params?.page ?? 0,
          size: params?.size ?? 10,
        },
        headers,
      }
    );

    return {
      success: true,
      data: response.data,
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
 * Server Action: Invite a new admin
 * Endpoint: `POST /invitations`
 */
export async function createInvitationAction(
  input: CreateInvitationInput
): Promise<InvitationMutationResult> {
  const parsed = createInvitationInputSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof CreateInvitationInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof CreateInvitationInput | undefined;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid invitation details.",
      fieldErrors,
    };
  }

  try {
    const headers = await getAuthHeaders();
    const response = await apiClient.post<AdminInvitation>(
      API_ENDPOINTS.invitations.create,
      parsed.data,
      { headers }
    );

    return {
      success: true,
      message: `Invitation sent to ${parsed.data.email}`,
      invitation: response.data,
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
 * Server Action: Revoke an admin invitation
 * Endpoint: `POST /invitations/{id}/revoke`
 */
export async function revokeInvitationAction(
  id: string
): Promise<InvitationMutationResult> {
  if (!id.trim()) {
    return {
      success: false,
      error: "Invitation ID is required",
    };
  }

  try {
    const headers = await getAuthHeaders();
    const response = await apiClient.post<AdminInvitation>(
      API_ENDPOINTS.invitations.revoke(id),
      {},
      { headers }
    );

    return {
      success: true,
      message: "Invitation revoked successfully",
      invitation: response.data,
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
 * Server Action: Resend an active admin invitation
 * Endpoint: `POST /invitations/{id}/resend`
 */
export async function resendInvitationAction(
  id: string
): Promise<InvitationMutationResult> {
  if (!id.trim()) {
    return {
      success: false,
      error: "Invitation ID is required",
    };
  }

  try {
    const headers = await getAuthHeaders();
    const response = await apiClient.post<AdminInvitation>(
      API_ENDPOINTS.invitations.resend(id),
      {},
      { headers }
    );

    return {
      success: true,
      message: "Invitation resent successfully",
      invitation: response.data,
    };
  } catch (err: unknown) {
    const apiError = parseApiError(err);
    return {
      success: false,
      error: apiError.message,
    };
  }
}
