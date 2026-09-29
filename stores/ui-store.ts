"use client";

import * as React from "react";

export interface UIState {
  sidebarOpen: boolean;
  activeModal: string | null;
  selectedDispatchCourierId: string | null;
}

const defaultUIState: UIState = {
  sidebarOpen: true,
  activeModal: null,
  selectedDispatchCourierId: null,
};

let state: UIState = defaultUIState;
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export const uiStore = {
  getSnapshot(): UIState {
    return state;
  },
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  setSidebarOpen(open: boolean | ((prev: boolean) => boolean)) {
    const nextVal = typeof open === "function" ? open(state.sidebarOpen) : open;
    state = { ...state, sidebarOpen: nextVal };
    emitChange();
  },
  toggleSidebar() {
    this.setSidebarOpen((prev) => !prev);
  },
  openModal(modalId: string) {
    state = { ...state, activeModal: modalId };
    emitChange();
  },
  closeModal() {
    state = { ...state, activeModal: null };
    emitChange();
  },
  setSelectedDispatchCourier(courierId: string | null) {
    state = { ...state, selectedDispatchCourierId: courierId };
    emitChange();
  },
};

/**
 * Hook to consume global UI state with React useSyncExternalStore
 */
export function useUIStore(): UIState {
  return React.useSyncExternalStore(
    uiStore.subscribe,
    uiStore.getSnapshot,
    () => defaultUIState
  );
}
