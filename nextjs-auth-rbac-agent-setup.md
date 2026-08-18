# Setup instructions for AI coding agent
## Next.js 16 — Better Auth + Drizzle + PostgreSQL + multi-tenant RBAC

Execute the sections below in order. Each is a discrete task. If a command fails or an API
shape doesn't match what's shown here (library APIs shift between releases), stop and check
the current docs at better-auth.com and orm.drizzle.team before improvising — don't guess at
field/import names for auth-critical code.

This version matches a project using `src/` as the source directory (app, assets, components,
config, context, hooks, layouts, types, utils already exist under `src/`).

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.6+ (App Router, `src/` layout) |
| Auth | Better Auth (open source, self-hosted, no per-user pricing) |
| Database | PostgreSQL 16 |
| ORM | Drizzle ORM + drizzle-kit |
| Multi-tenant / RBAC | Better Auth `organization` plugin (orgs, teams, custom roles & permissions) |
| Rate-limit / session cache | Database storage by default; Redis optional (see section 12) |
| Local infra | Docker Compose |

No CASL, no OpenFGA, no Permit.io in this baseline. Better Auth's organization plugin already
provides server-side (`auth.api.hasPermission`) and client-side
(`authClient.organization.hasPermission`) permission checks. Only add a dedicated
authorization engine like OpenFGA later if you need relationship-based permissions that go
beyond "role within an organization".

## Target folder structure

```
src/
├─ app/
│  └─ api/auth/[...all]/route.ts   ← Better Auth route handler
├─ assets/
├─ components/
├─ config/
├─ context/
├─ db/                             ← new
│  ├─ index.ts                     ← drizzle client
│  └─ schema.ts                    ← auto-generated, don't hand-edit
├─ hooks/
│  └─ usePermission.ts             ← new, optional
├─ layouts/
├─ lib/                            ← new
│  ├─ auth.ts                      ← Better Auth server instance
│  └─ auth-client.ts               ← Better Auth client instance
├─ server/                         ← new
│  ├─ dal.ts                       ← requireSession / requirePermission
│  └─ actions/
│     └─ project.ts                ← example server action
├─ types/
├─ utils/
└─ proxy.ts                        ← lives inside src/ because app/ is inside src/

# project root
drizzle.config.ts
docker-compose.yml
.env.local
```

---

## 1. Install dependencies

```bash
npm install better-auth drizzle-orm postgres @better-auth/drizzle-adapter
npm install -D drizzle-kit
```

## 2. Local infrastructure

Create `docker-compose.yml` at the project root:

```yaml
services:
  db:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: app_db
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

Run:

```bash
docker compose up -d
```

(A Redis service is added later in section 12 — skip it for now.)

## 3. Environment variables

Create `.env.local`:

```
DATABASE_URL=postgres://app:app@localhost:5432/app_db
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
```

Generate the secret and paste it into `BETTER_AUTH_SECRET`:

```bash
openssl rand -base64 32
```

## 4. Drizzle client

Create `src/db/index.ts`:

```typescript
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);
```

Create `drizzle.config.ts` at the project root:

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

## 5. Auth config with multi-tenant RBAC

Create `src/lib/auth.ts`. Adjust `statement` to match your app's actual resources — `project`
and `billing` below are placeholders. Rate limiting defaults to database storage; see
section 12 to switch to Redis later without changing anything else in this file except the
`storage` value and the `secondaryStorage` block.

```typescript
import { betterAuth } from "better-auth";
import { organization, createAccessControl } from "better-auth/plugins";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/db";

// Verify this import path against current Better Auth docs — access-control
// helpers have moved between plugin subpaths across releases.
const statement = {
  project: ["create", "read", "update", "delete"],
  billing: ["read", "manage"],
} as const;

const ac = createAccessControl(statement);

const member = ac.newRole({ project: ["read"] });
const admin = ac.newRole({ project: ["create", "read", "update"], billing: ["read"] });
const owner = ac.newRole({
  project: ["create", "read", "update", "delete"],
  billing: ["read", "manage"],
});

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true },
  rateLimit: {
    enabled: true,
    storage: "database", // switch to "secondary-storage" once Redis is added (section 12)
  },
  plugins: [
    organization({
      ac,
      roles: { member, admin, owner },
      teams: { enabled: true },
    }),
  ],
});
```

## 6. Generate and apply the database schema

Better Auth's CLI reads `src/lib/auth.ts` and generates the matching Drizzle schema at
`src/db/schema.ts` — don't hand-write this file, let the CLI keep it in sync with the plugins
you enable:

```bash
npx @better-auth/cli generate
npx drizzle-kit generate
npx drizzle-kit migrate
```

Re-run all three whenever `auth.ts` config changes (new plugin, new fields).

## 7. Route handler

Create `src/app/api/auth/[...all]/route.ts`:

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

## 8. Client-side auth instance

Create `src/lib/auth-client.ts`:

```typescript
import { createAuthClient } from "better-auth/client";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [organizationClient()],
});
```

## 9. Optional: a small hook for UI toggling

Create `src/hooks/usePermission.ts`. This is UX only — never treat it as enforcement:

```typescript
import { authClient } from "@/lib/auth-client";

export function usePermission(permission: Record<string, string[]>) {
  const { data } = authClient.useSession();
  if (!data) return false;
  // hasPermission is async; for instant UI toggling prefer checkRolePermission
  // with the role from the active member — check current docs for the exact shape.
  return authClient.organization.hasPermission({ permission });
}
```

## 10. Data access layer — the actual enforcement point

Create `src/server/dal.ts`. Every Server Action and Route Handler that touches protected data
must call through this, not just rely on the proxy below:

```typescript
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  return session;
}

export async function requirePermission(permission: Record<string, string[]>) {
  const session = await requireSession();
  const { success } = await auth.api.hasPermission({
    headers: await headers(),
    body: { permission },
  });
  if (!success) throw new Error("Forbidden");
  return session;
}
```

Create `src/server/actions/project.ts` as an example:

```typescript
"use server";
import { requirePermission } from "@/server/dal";

export async function deleteProject(projectId: string) {
  await requirePermission({ project: ["delete"] });
  // ... proceed with deletion
}
```

## 11. Proxy (redirect-only — verify the session cookie name against current docs)

Create `src/proxy.ts` — it must live inside `src/` because `app/` is inside `src/`. This is a
UX convenience for fast redirects — it is NOT the security boundary. The real check is
section 10's `requirePermission`/`requireSession` inside every Server Action and Route
Handler.

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get("better-auth.session_token");
  if (!sessionCookie && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

## 12. Optional: switch rate limiting / sessions to Redis

Skip this until you're deploying to more than one instance or to serverless — the
`storage: "database"` config from section 5 is a valid production setting for a single
long-running server. Flip to Redis when either becomes true: the app runs on more than one
instance/pod, or it runs on a serverless platform where in-memory/per-instance state doesn't
persist or isn't shared.

Add a Redis service to `docker-compose.yml`:

```yaml
services:
  db:
    # ...unchanged from section 2...

  redis:
    image: redis:7-alpine
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  db_data:
  redis_data:
```

Install the client:

```bash
npm install ioredis
```

Add `REDIS_URL=redis://localhost:6379` to `.env.local`.

Update `src/lib/auth.ts`: add a Redis client and a `secondaryStorage` block, and change
`rateLimit.storage` to `"secondary-storage"`:

```typescript
import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

export const auth = betterAuth({
  // ...existing options from section 5...
  secondaryStorage: {
    get: (key) => redis.get(key),
    set: (key, value, ttl) => redis.set(key, value, "EX", ttl ?? 3600),
    delete: (key) => redis.del(key),
  },
  rateLimit: {
    enabled: true,
    storage: "secondary-storage",
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
      "/sign-up/email": { window: 60, max: 5 },
      "/forget-password": { window: 60, max: 3 },
    },
  },
});
```

## 13. Verification checklist

- [ ] `docker compose up -d` runs without error, Postgres reachable on 5432
- [ ] `npx @better-auth/cli generate` + `drizzle-kit generate` + `drizzle-kit migrate` apply cleanly
- [ ] Can register a user and create an organization
- [ ] A `member`-role user is denied `project:delete` via `requirePermission`
- [ ] An `owner`-role user succeeds at the same action
- [ ] UI hides the delete button for a member, but the same denial is *also* enforced
      server-side — test this by calling the Server Action directly, not just by clicking
      through the UI
- [ ] If Redis was added: restarting the `redis` container clears sessions/rate-limit
      counters as expected, and the app still starts cleanly if Redis is briefly unreachable

## When to add more (don't build this upfront)

- **Per-resource sharing/delegation** (e.g. "user X can edit project Y specifically, not
  because of their org role") → add OpenFGA (self-hosted, open source, Zanzibar-style)
  alongside this, keep Better Auth for identity.
- **SSO/SAML/SCIM for enterprise customers** → Better Auth has enterprise plugins for this;
  check current docs before reaching for a paid provider.
- **CASL** is only worth adding if you need one unified permission-checking API shared across
  many different backends (not just Better Auth) — for this stack alone it's redundant with
  `hasPermission`.
