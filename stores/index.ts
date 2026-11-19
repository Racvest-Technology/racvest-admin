"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAuthSlice } from "./slices/auth-slice";
import { createUISlice } from "./slices/ui-slice";
import type { AppStore } from "./types";

export type { AppStore, AppSliceCreator } from "./types";
export type { AuthSlice } from "./slices/auth-slice";
export type { UISlice } from "./slices/ui-slice";

/**
 * Bound global Zustand store combining all slices
 */
export const useAppStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createUISlice(...a),
    }),
    {
      name: "racvest-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);

/**
 * Domain store aliases for ergonomic consumption
 */
export const useAuthStore = useAppStore;
export const useUIStore = useAppStore;
