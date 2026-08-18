/**
 * Data Access Layer — the ONLY security boundary for authorization.
 *
 * Every Server Action and Route Handler that touches protected data MUST call
 * through this file. Never assume a user has access based on their role name —
 * always use requirePermission() with explicit permission strings.
 *
 * Multi-tenant isolation:
 *   - requireSession() returns the session (includes user.id).
 *   - requireOrgAccess() verifies the user is an active member of the
 *     requested organization by checking their membership role. Pass the
 *     resolved organizationId into every DB query as a WHERE clause —
 *     never trust a client-supplied ID alone.
 *   - requirePermission() combines membership check with permission check.
 */

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Session = Awaited<ReturnType<typeof requireSession>>;
export type OrgSession = Awaited<ReturnType<typeof requireOrgAccess>>;

// ---------------------------------------------------------------------------
// Authentication
// ---------------------------------------------------------------------------

/**
 * Asserts the request has a valid session.
 * Redirects unauthenticated requests to the sign-in page.
 */
export async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/card/sign-in");
  return session;
}

// ---------------------------------------------------------------------------
// Multi-tenant isolation
// ---------------------------------------------------------------------------

/**
 * Asserts the current user is an active member of `organizationId`.
 *
 * Uses getActiveMemberRole to verify membership server-side.
 * Throws if the user is not a member — this is an authorization failure (403),
 * not an authentication failure (401), so we throw rather than redirect.
 *
 * @param organizationId  The organization ID from your route/param, NOT
 *                        from the client request body (validate at the edge).
 */
export async function requireOrgAccess(organizationId: string) {
  const session = await requireSession();

  // getActiveMemberRole resolves the member's role for the given org.
  // Returns null/throws if the user is not a member.
  const memberRole = await auth.api.getActiveMemberRole({
    headers: await headers(),
    query: { organizationId },
  });

  if (!memberRole) {
    throw new Error(
      `Forbidden: user ${session.user.id} is not a member of organization ${organizationId}`
    );
  }

  return { session, memberRole, organizationId };
}

// ---------------------------------------------------------------------------
// Permission-based authorization
// ---------------------------------------------------------------------------

/**
 * Asserts the current user has the given permission within `organizationId`.
 *
 * Never check authorization against a role name — always use this function
 * with explicit permission strings (e.g. { project: ["delete"] }).
 *
 * Usage:
 *   const { session, organizationId } = await requirePermission(
 *     orgId,
 *     { project: ["delete"] }
 *   );
 *
 * @param organizationId  Server-resolved organization ID (not from user input).
 * @param permissions     Permission object, e.g. { project: ["delete"] }.
 */
export async function requirePermission(
  organizationId: string,
  permissions: Record<string, string[]>
) {
  // First confirm org membership (multi-tenant isolation).
  const orgSession = await requireOrgAccess(organizationId);

  // Then check the specific permission for the user's role in this org.
  const result = await auth.api.hasPermission({
    headers: await headers(),
    body: { permissions },
  });

  if (!result.success) {
    throw new Error(
      `Forbidden: missing permission ${JSON.stringify(permissions)}`
    );
  }

  return orgSession;
}
