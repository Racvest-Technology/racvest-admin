"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UIState {
  sidebarOpen: boolean;
  activeModal: string | null;
  selectedDispatchCourierId: string | null;
  setSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setSelectedDispatchCourier: (courierId: string | null) => void;
}

/**
 * Global UI Store powered by Zustand
 */
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "racvest-ui-storage",
      partialize: (state) => ({ sidebarOpen: state.sidebarOpen }),
    }
  )
);

/**
 * Imperative store actions for event listeners / outside-component usage
 */
export const uiStore = {
  getSnapshot: () => useUIStore.getState(),
  subscribe: useUIStore.subscribe,
  setSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) =>
    useUIStore.getState().setSidebarOpen(open),
  toggleSidebar: () => useUIStore.getState().toggleSidebar(),
  openModal: (modalId: string) => useUIStore.getState().openModal(modalId),
  closeModal: () => useUIStore.getState().closeModal(),
  setSelectedDispatchCourier: (courierId: string | null) =>
    useUIStore.getState().setSelectedDispatchCourier(courierId),
};
