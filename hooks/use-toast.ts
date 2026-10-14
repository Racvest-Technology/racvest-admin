"use client";

import { toast } from "sonner";

interface UseToastReturn {
  toast: typeof toast;
  showToast: (msg: string) => void;
  success: (msg: string) => void;
  error: (msg: string) => void;
  dismissToast: () => void;
}

/**
 * Toast notification hook bridging to Sonner.
 */
export function useToast(): UseToastReturn {
  return {
    toast,
    showToast: (msg: string) => toast(msg),
    success: (msg: string) => toast.success(msg),
    error: (msg: string) => toast.error(msg),
    dismissToast: () => toast.dismiss(),
  };
}

export { toast };
