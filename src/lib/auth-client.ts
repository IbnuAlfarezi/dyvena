import { createAuthClient } from "better-auth/client";
import { organizationClient } from "better-auth/client/plugins";

/**
 * Client-side Better Auth instance.
 *
 * Use `authClient.useSession()` in React components to get the current session.
 * Use `authClient.organization.hasPermission({ permission })` for UX-only
 * visibility toggling — never rely on this for security; enforcement is in
 * src/server/dal.ts.
 */
export const authClient = createAuthClient({
  plugins: [organizationClient()],
});
