"use client";

import { useAppStore } from "./app-store";
import { type UISlice, type UIState } from "./slices/ui-slice";

export type { UISlice, UIState };

/**
 * UI store hook backed by the combined Zustand slice store
 */
export const useUIStore = useAppStore;

/**
 * Imperative store actions for event listeners / outside-component usage
 */
export const uiStore = {
  getSnapshot: () => useAppStore.getState(),
  subscribe: useAppStore.subscribe,
  setSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) =>
    useAppStore.getState().setSidebarOpen(open),
  toggleSidebar: () => useAppStore.getState().toggleSidebar(),
  openModal: (modalId: string) => useAppStore.getState().openModal(modalId),
  closeModal: () => useAppStore.getState().closeModal(),
  setSelectedDispatchCourier: (courierId: string | null) =>
    useAppStore.getState().setSelectedDispatchCourier(courierId),
};
