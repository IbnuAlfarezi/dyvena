"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  signUpSchema,
  signInSchema,
  parseInput,
  type SignUpInput,
  type SignInInput,
} from "@/server/schemas";


export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export async function signUp(
  input: SignUpInput
): Promise<ActionResult<{ userId: string }>> {
  const parsed = parseInput(signUpSchema, input);
  if (!parsed.success) return { ok: false, error: parsed.error };

  // parsed.data is now narrowed as non-null
  const { name, email, password } = parsed.data;

  const res = await auth.api.signUpEmail({
    body: { name, email, password },
    headers: await headers(),
    asResponse: true,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return {
      ok: false,
      error:
        (body as { message?: string }).message ??
        `Sign-up failed (${res.status})`,
    };
  }

  const data = await res.json();
  return { ok: true, data: { userId: (data as { user?: { id?: string } })?.user?.id ?? "" } };
}

export async function signIn(
  input: SignInInput
): Promise<ActionResult<{ userId: string }>> {
  const parsed = parseInput(signInSchema, input);
  if (!parsed.success) return { ok: false, error: parsed.error };

  const { email, password } = parsed.data;

  const res = await auth.api.signInEmail({
    body: { email, password },
    headers: await headers(),
    asResponse: true,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return {
      ok: false,
      error:
        (body as { message?: string }).message ??
        `Sign-in failed (${res.status})`,
    };
  }

  const data = await res.json();
  return { ok: true, data: { userId: (data as { user?: { id?: string } })?.user?.id ?? "" } };
}

export async function signOut(): Promise<ActionResult> {
  await auth.api.signOut({ headers: await headers() });
  return { ok: true, data: undefined };
}
