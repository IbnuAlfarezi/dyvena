"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function usePermission(permissions: Record<string, string[]>): boolean {
  const [allowed, setAllowed] = useState(false);
  const permKey = JSON.stringify(permissions);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // 1. Check session exists
      const sessionRes = await authClient.getSession();
      if (cancelled || !sessionRes?.data) {
        setAllowed(false);
        return;
      }

      // 2. Check permission in the active organization
      try {
        const res = await authClient.organization.hasPermission({ permissions });
        if (!cancelled) {
          // Better Auth client returns { data: { success: boolean } } | { error: ... }
          const success =
            res && "data" in res && res.data && "success" in res.data
              ? Boolean(res.data.success)
              : false;
          setAllowed(success);
        }
      } catch {
        if (!cancelled) setAllowed(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permKey]);

  return allowed;
}
