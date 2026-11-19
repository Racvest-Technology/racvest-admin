"use client";

import type { AuthUser } from "@/features/auth/types";
import { useAppStore } from "./app-store";
import { type AuthSlice, type AuthState } from "./slices/auth-slice";

export type { AuthSlice, AuthState };

/**
 * Auth store hook backed by the combined Zustand slice store
 */
export const useAuthStore = useAppStore;

/**
 * Imperative store handle for non-component callers
 */
export const authStore = {
  getSnapshot: () => useAppStore.getState(),
  subscribe: useAppStore.subscribe,
  setSession: (user: AuthUser, accessToken?: string | null) =>
    useAppStore.getState().setSession(user, accessToken),
  clearSession: () => useAppStore.getState().clearSession(),
};
