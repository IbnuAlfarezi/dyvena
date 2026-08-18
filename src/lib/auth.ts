import { betterAuth } from "better-auth";
import { organization, createAccessControl } from "better-auth/plugins";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { sendEmail } from "@/lib/mailer";

const statement = {
  project: ["create", "read", "update", "delete"] as const,
  billing: ["read", "manage"] as const,
  member: ["invite", "remove", "update-role"] as const,
  settings: ["read", "update"] as const,
} as const;

const ac = createAccessControl(statement);

const member = ac.newRole({
  project: ["read"],
  settings: ["read"],
});

const admin = ac.newRole({
  project: ["create", "read", "update"],
  billing: ["read"],
  member: ["invite", "update-role"],
  settings: ["read", "update"],
});

const owner = ac.newRole({
  project: ["create", "read", "update", "delete"],
  billing: ["read", "manage"],
  member: ["invite", "remove", "update-role"],
  settings: ["read", "update"],
});
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),

  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your Dyvena password",
        html: `
          <p>Hi ${user.name ?? user.email},</p>
          <p>Click the link below to reset your password. This link expires in 1 hour.</p>
          <p><a href="${url}" style="background:#4f46e5;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Reset Password</a></p>
          <p>If you didn't request this, you can safely ignore this email.</p>
        `,
      });
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your Dyvena email address",
        html: `
          <p>Hi ${user.name ?? user.email},</p>
          <p>Click the link below to verify your email address.</p>
          <p><a href="${url}" style="background:#4f46e5;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Verify Email</a></p>
        `,
      });
    },
  },

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

export { ac };
