"use server";

import { requirePermission } from "@/server/dal";

/**
 * Example server action demonstrating multi-tenant + permission enforcement.
 *
 * Pattern to follow for ALL server actions:
 *   1. Accept organizationId as a parameter (validated from the URL/session,
 *      not blindly from user-supplied form data).
 *   2. Call requirePermission() with the resource + action strings.
 *   3. Scope all DB queries to organizationId — never select without it.
 */

export async function createProject(
  organizationId: string,
  data: { name: string; description?: string }
) {
  // Enforces: (a) user is authenticated, (b) is a member of organizationId,
  // (c) has project:create permission.
  await requirePermission(organizationId, { project: ["create"] });

  // TODO: insert into your projects table with organizationId column:
  // await db.insert(projects).values({ ...data, organizationId });
  console.log("createProject", { organizationId, data });
}

export async function deleteProject(
  organizationId: string,
  projectId: string
) {
  // Requires the most destructive permission — members and admins are denied.
  await requirePermission(organizationId, { project: ["delete"] });

  // TODO: db.delete(projects).where(and(
  //   eq(projects.id, projectId),
  //   eq(projects.organizationId, organizationId)  // always scope to org!
  // ));
  console.log("deleteProject", { organizationId, projectId });
}

export async function updateProject(
  organizationId: string,
  projectId: string,
  data: Partial<{ name: string; description: string }>
) {
  await requirePermission(organizationId, { project: ["update"] });

  // TODO: db.update(projects)
  //   .set(data)
  //   .where(and(eq(projects.id, projectId), eq(projects.organizationId, organizationId)));
  console.log("updateProject", { organizationId, projectId, data });
}
