"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

interface CacheEntry {
  value: boolean;
  timestamp: number;
}

// Global variables, but initialized lazily on the client to avoid SSR leaks
let permissionCache: Map<string, CacheEntry> | null = null;
let pendingRequests: Map<string, Promise<boolean>> | null = null;

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCache() {
  if (typeof window === "undefined") return null;
  if (!permissionCache) permissionCache = new Map();
  return permissionCache;
}

function getPending() {
  if (typeof window === "undefined") return null;
  if (!pendingRequests) pendingRequests = new Map();
  return pendingRequests;
}

export function usePermission(permissions: Record<string, string[]>): boolean {
  const [allowed, setAllowed] = useState(false);
  const permKey = JSON.stringify(permissions);

  const { data: sessionData } = authClient.useSession();

  useEffect(() => {
    let cancelled = false;

    if (!sessionData?.session) {
      setAllowed(false);
      return;
    }

    const activeOrgId = sessionData.session.activeOrganizationId || "no-org";
    const cacheKey = `${activeOrgId}:${permKey}`;

    const cache = getCache();
    const pending = getPending();

    if (!cache || !pending) return;

    const now = Date.now();
    
    // Active cache eviction: sweep expired entries
    for (const [k, v] of cache.entries()) {
      if (now - v.timestamp >= CACHE_TTL) {
        cache.delete(k);
      }
    }

    const cachedEntry = cache.get(cacheKey);

    if (cachedEntry && now - cachedEntry.timestamp < CACHE_TTL) {
      setAllowed(cachedEntry.value);
      return;
    }

    if (pending.has(cacheKey)) {
      pending.get(cacheKey)!.then((success) => {
        if (!cancelled) setAllowed(success);
      });
      return;
    }

    const checkPermission = async () => {
      const permissionPromise = (async () => {
        try {
          const res = await authClient.organization.hasPermission({ permissions });
          const success =
            res && "data" in res && res.data && "success" in res.data
              ? Boolean(res.data.success)
              : false;
          cache.set(cacheKey, { value: success, timestamp: Date.now() });
          return success;
        } catch {
          return false;
        } finally {
          pending.delete(cacheKey);
        }
      })();

      pending.set(cacheKey, permissionPromise);
      const success = await permissionPromise;
      if (!cancelled) {
        setAllowed(success);
      }
    };

    checkPermission();

    return () => {
      cancelled = true;
    };
  }, [permKey, sessionData]);

  return allowed;
}

export function clearPermissionCache() {
  const cache = getCache();
  if (cache) cache.clear();
}
