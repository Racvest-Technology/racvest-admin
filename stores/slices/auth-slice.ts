import type { StateCreator } from "zustand";
import type { AuthUser } from "@/features/auth/types";
import { setClientAccessToken } from "@/lib/api-client";
import type { UISlice } from "./ui-slice";

export interface AuthSlice {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setSession: (user: AuthUser, accessToken?: string | null) => void;
  clearSession: () => void;
}

export type AuthState = AuthSlice;

/**
 * Auth slice creator following the Zustand slice pattern
 */
export const createAuthSlice: StateCreator<
  AuthSlice & UISlice,
  [["zustand/persist", unknown]],
  [],
  AuthSlice
> = (set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setSession: (user, accessToken) => {
    const token = accessToken ?? null;
    setClientAccessToken(token);
    set({
      user,
      accessToken: token,
      isAuthenticated: true,
    });
  },
  clearSession: () => {
    setClientAccessToken(null);
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },
});
