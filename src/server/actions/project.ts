"use server";

import { requirePermission } from "@/server/dal";
import {
  orgIdSchema,
  projectIdSchema,
  createProjectSchema,
  updateProjectSchema,
  parseInput,
} from "@/server/schemas";
import type { ActionResult } from "@/server/actions/auth";

export async function createProject(
  organizationId: string,
  input: { name: string; description?: string }
): Promise<ActionResult<{ projectId: string }>> {
  const orgParsed = parseInput(orgIdSchema, { organizationId });
  if (!orgParsed.success) return { ok: false, error: orgParsed.error };

  const inputParsed = parseInput(createProjectSchema, input);
  if (!inputParsed.success) return { ok: false, error: inputParsed.error };

  await requirePermission(orgParsed.data.organizationId, {
    project: ["create"],
  });

  console.log("createProject", {
    organizationId: orgParsed.data.organizationId,
    ...inputParsed.data,
  });
  return { ok: true, data: { projectId: "stub" } };
}

export async function updateProject(
  organizationId: string,
  projectId: string,
  input: { name?: string; description?: string }
): Promise<ActionResult> {
  const orgParsed = parseInput(orgIdSchema, { organizationId });
  if (!orgParsed.success) return { ok: false, error: orgParsed.error };

  const idParsed = parseInput(projectIdSchema, { projectId });
  if (!idParsed.success) return { ok: false, error: idParsed.error };

  const inputParsed = parseInput(updateProjectSchema, input);
  if (!inputParsed.success) return { ok: false, error: inputParsed.error };

  await requirePermission(orgParsed.data.organizationId, {
    project: ["update"],
  });

  console.log("updateProject", {
    organizationId: orgParsed.data.organizationId,
    projectId: idParsed.data.projectId,
    ...inputParsed.data,
  });
  return { ok: true, data: undefined };
}

export async function deleteProject(
  organizationId: string,
  projectId: string
): Promise<ActionResult> {
  const orgParsed = parseInput(orgIdSchema, { organizationId });
  if (!orgParsed.success) return { ok: false, error: orgParsed.error };

  const idParsed = parseInput(projectIdSchema, { projectId });
  if (!idParsed.success) return { ok: false, error: idParsed.error };

  await requirePermission(orgParsed.data.organizationId, {
    project: ["delete"],
  });

  console.log("deleteProject", {
    organizationId: orgParsed.data.organizationId,
    projectId: idParsed.data.projectId,
  });
  return { ok: true, data: undefined };
}
