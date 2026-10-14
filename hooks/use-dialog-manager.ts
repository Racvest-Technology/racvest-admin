"use client";

import * as React from "react";

/**
 * Manages open/close state for multiple named dialogs.
 * Eliminates repetitive useState pairs for each dialog.
 *
 * @example
 * const dialogs = useDialogManager([
 *   "sendMessage", "verifyIdentity", "compareDocuments"
 * ] as const);
 *
 * dialogs.open("sendMessage");
 * dialogs.isOpen("sendMessage"); // true
 * dialogs.close("sendMessage");
 */
export function useDialogManager<T extends string>(initialOpen: readonly T[] = []) {
  const [openSet, setOpenSet] = React.useState<Set<T>>(() => new Set(initialOpen));

  const open = React.useCallback((name: T) => {
    setOpenSet((prev) => new Set(prev).add(name));
  }, []);

  const close = React.useCallback((name: T) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  }, []);

  const isOpen = React.useCallback(
    (name: T) => openSet.has(name),
    [openSet]
  );

  const toggle = React.useCallback((name: T) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  return { open, close, isOpen, toggle } as const;
}
