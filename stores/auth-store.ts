"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/features/auth/types";
import { setClientAccessToken } from "@/lib/api-client";

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setSession: (user: AuthUser, accessToken?: string | null) => void;
  clearSession: () => void;
}

/**
 * Global Authentication Store powered by Zustand with persistence
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "racvest-auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

/**
 * Imperative store handle for non-component callers
 */
export const authStore = {
  getSnapshot: () => useAuthStore.getState(),
  subscribe: useAuthStore.subscribe,
  setSession: (user: AuthUser, accessToken?: string | null) =>
    useAuthStore.getState().setSession(user, accessToken),
  clearSession: () => useAuthStore.getState().clearSession(),
};
