import { z } from "zod";

/**
 * Zod schema for Admin Login credentials (`POST /auth/login`)
 */
export const loginInputSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

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
  accessToken: string;
  refreshToken?: string;
  user: AuthUser;
}

/**
 * Standardized Server Action response envelope
 */
export interface AuthActionResult {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof LoginInput, string>>;
  user?: AuthUser;
  accessToken?: string;
}
