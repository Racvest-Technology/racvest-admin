import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";

/**
 * Standard API Error payload structure returned by Racvest Backend
 */
export interface ApiErrorPayload {
  message?: string | string[];
  error?: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

/**
 * Normalized API Error for consistent handling across Server Actions & Client Components
 */
export class ApiClientError extends Error {
  public readonly statusCode: number;
  public readonly errors?: Record<string, string[]>;

  constructor(message: string, statusCode = 500, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

let clientAccessToken: string | null = null;

/**
 * Allows setting an in-memory access token for direct browser requests
 */
export function setClientAccessToken(token: string | null) {
  clientAccessToken = token;
}

export function getClientAccessToken(): string | null {
  return clientAccessToken;
}

/**
 * Shared Axios Client configured with Racvest Core API base URL (https://api.racvest.xyz)
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: Automatically attach Bearer token if available in memory
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (clientAccessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${clientAccessToken}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

/**
 * Extracts a clean, user-facing error message from an AxiosError or unknown exception
 */
export function parseApiError(error: unknown): ApiClientError {
  if (error instanceof ApiClientError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError<ApiErrorPayload>;
    const status = axiosErr.response?.status ?? 500;
    const data = axiosErr.response?.data;

    if (data) {
      if (Array.isArray(data.message) && data.message.length > 0) {
        return new ApiClientError(data.message[0], status, data.errors);
      }
      if (typeof data.message === "string" && data.message.trim().length > 0) {
        return new ApiClientError(data.message, status, data.errors);
      }
      if (typeof data.error === "string" && data.error.trim().length > 0) {
        return new ApiClientError(data.error, status, data.errors);
      }
    }

    if (axiosErr.code === "ECONNABORTED") {
      return new ApiClientError("Request timed out. Please check your connection and try again.", 408);
    }

    if (!axiosErr.response) {
      return new ApiClientError(
        "Unable to reach the Racvest server. Please check your internet connection.",
        503
      );
    }

    return new ApiClientError(
      axiosErr.message || "An unexpected server error occurred.",
      status
    );
  }

  if (error instanceof Error) {
    return new ApiClientError(error.message, 500);
  }

  return new ApiClientError("An unexpected error occurred.", 500);
}
