import { betterAuth } from "better-auth";
import { organization, createAccessControl } from "better-auth/plugins";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/db";

// ---------------------------------------------------------------------------
// Permission statement — define ALL resources and their possible actions here.
// Never check authorization against a role name directly; always use these
// permission strings so that roles can be changed without touching app logic.
// ---------------------------------------------------------------------------
const statement = {
  project: ["create", "read", "update", "delete"] as const,
  billing: ["read", "manage"] as const,
  member: ["invite", "remove", "update-role"] as const,
  settings: ["read", "update"] as const,
} as const;

const ac = createAccessControl(statement);

// ---------------------------------------------------------------------------
// Roles — permission sets only, no role-name checks in business logic.
// ---------------------------------------------------------------------------

/** Read-only access to org projects and settings. */
const member = ac.newRole({
  project: ["read"],
  settings: ["read"],
});

/** Can create/update projects, invite members, read billing. */
const admin = ac.newRole({
  project: ["create", "read", "update"],
  billing: ["read"],
  member: ["invite", "update-role"],
  settings: ["read", "update"],
});

/** Full access including destructive actions. */
const owner = ac.newRole({
  project: ["create", "read", "update", "delete"],
  billing: ["read", "manage"],
  member: ["invite", "remove", "update-role"],
  settings: ["read", "update"],
});

// ---------------------------------------------------------------------------
// Better Auth instance
// ---------------------------------------------------------------------------
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),

  emailAndPassword: { enabled: true },

  /**
   * Rate limiting — uses the database by default (valid for single-server
   * deployments). Switch storage to "secondary-storage" + add Redis when
   * running multiple instances or on serverless (see plan §12).
   */
  rateLimit: {
    enabled: true,
    storage: "database",
  },

  plugins: [
    organization({
      ac,
      roles: { member, admin, owner },
      teams: { enabled: true },
    }),
  ],
});

// Re-export the AC instance so DAL and server actions can use
// `ac.check(...)` without importing the whole auth object.
export { ac };
