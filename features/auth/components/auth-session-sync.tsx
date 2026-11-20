"use client";

import * as React from "react";
import type { AuthUser } from "../types";
import { useAuthStore } from "@/stores";

interface AuthSessionSyncProps {
  serverUser: AuthUser | null;
  accessToken: string | null;
}

/**
 * Synchronizes the verified server cookie session with the client Zustand store
 * and in-memory Axios bearer token on initial mount or page reload.
 */
export function AuthSessionSync({
  serverUser,
  accessToken,
}: AuthSessionSyncProps) {
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);

  React.useEffect(() => {
    if (accessToken && serverUser) {
      setSession(serverUser, accessToken);
    } else if (!accessToken) {
      clearSession();
    }
  }, [accessToken, serverUser, setSession, clearSession]);

  return null;
}
