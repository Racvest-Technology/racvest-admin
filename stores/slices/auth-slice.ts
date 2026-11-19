import type { AuthUser } from "@/features/auth/types";
import { setClientAccessToken } from "@/lib/api-client";
import type { AppSliceCreator } from "../types";

export interface AuthSlice {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setSession: (user: AuthUser, accessToken?: string | null) => void;
  clearSession: () => void;
}

export const createAuthSlice: AppSliceCreator<AuthSlice> = (set) => ({
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
