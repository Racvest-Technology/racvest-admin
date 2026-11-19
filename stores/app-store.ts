"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAuthSlice, type AuthSlice } from "./slices/auth-slice";
import { createUISlice, type UISlice } from "./slices/ui-slice";

export type AppStore = AuthSlice & UISlice;

/**
 * Bound global Zustand store combining all domain slices
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
