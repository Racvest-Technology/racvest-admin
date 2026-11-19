import type { StateCreator } from "zustand";
import type { AuthSlice } from "./auth-slice";

export interface UISlice {
  sidebarOpen: boolean;
  activeModal: string | null;
  selectedDispatchCourierId: string | null;
  setSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setSelectedDispatchCourier: (courierId: string | null) => void;
}

export type UIState = UISlice;

/**
 * UI slice creator following the Zustand slice pattern
 */
export const createUISlice: StateCreator<
  AuthSlice & UISlice,
  [["zustand/persist", unknown]],
  [],
  UISlice
> = (set) => ({
  sidebarOpen: true,
  activeModal: null,
  selectedDispatchCourierId: null,
  setSidebarOpen: (open) =>
    set((state) => ({
      sidebarOpen:
        typeof open === "function" ? open(state.sidebarOpen) : open,
    })),
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
  setSelectedDispatchCourier: (courierId) =>
    set({ selectedDispatchCourierId: courierId }),
});
