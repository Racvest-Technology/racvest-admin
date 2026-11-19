import type { StateCreator } from "zustand";
import type { AuthSlice } from "./slices/auth-slice";
import type { UISlice } from "./slices/ui-slice";

/**
 * Combined Root Store State
 */
export type AppStore = AuthSlice & UISlice;

/**
 * Reusable StateCreator helper for slices in the bound store
 */
export type AppSliceCreator<TSlice> = StateCreator<
  AppStore,
  [["zustand/persist", unknown]],
  [],
  TSlice
>;
