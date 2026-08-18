"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

/**
 * UX-only permission hook — use this to show/hide UI elements.
 *
 * IMPORTANT: This is NOT a security boundary. The same permission check MUST
 * also be enforced server-side in src/server/dal.ts via requirePermission().
 *
 * Returns `false` while the check is pending or if there is no session.
 * Returns `true` once Better Auth confirms the active org membership has
 * the requested permission.
 *
 * @example
 *   const canDelete = usePermission({ project: ["delete"] });
 *   return canDelete ? <DeleteButton /> : null;
 */
export function usePermission(
  permissions: Record<string, string[]>
): boolean {
  const [allowed, setAllowed] = useState(false);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session) {
      setAllowed(false);
      return;
    }

    authClient.organization
      .hasPermission({ permissions })
      .then((res) => {
        if (res && typeof res === "object" && "data" in res) {
          setAllowed((res as { data: { success: boolean } }).data?.success ?? false);
        } else {
          setAllowed(false);
        }
      })
      .catch(() => setAllowed(false));
  }, [session, JSON.stringify(permissions)]);

  return allowed;
}
