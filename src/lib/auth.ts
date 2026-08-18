import { betterAuth } from "better-auth";
import { organization, createAccessControl } from "better-auth/plugins";
import { emailOTP } from "better-auth/plugins/email-otp";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { sendEmail } from "@/lib/mailer";
import argon2 from "argon2";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { resolveMx } from "node:dns/promises";
import disposableDomains from "disposable-email-blocklist";
import { Redis } from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";

const redisClient = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  enableOfflineQueue: false,
});

const signUpRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rl:signup",
  points: 5,
  duration: 60 * 60,
});

const otpRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rl:otp",
  points: 3,
  duration: 60 * 60,
});

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

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      const isSignUp = ctx.path.startsWith("/sign-up/email");
      const isForgetPassword = ctx.path.startsWith("/forget-password/email-otp");

      if (isSignUp || isForgetPassword) {
        // 0. Rate Limiting (Bypass in Development)
        const isDev = process.env.NODE_ENV === "development";
        const ip = ctx.request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
        const body = ctx.body as Record<string, any> | undefined;

        if (isSignUp && !isDev) {
          try {
            await signUpRateLimiter.consume(ip);
          } catch (e) {
            throw new APIError("TOO_MANY_REQUESTS", { message: "Too many sign up requests from this IP. Please try again later." });
          }
        }

        if (isForgetPassword && !isDev) {
          const email = typeof body?.email === "string" ? body.email : "unknown";
          const identifier = `${ip}:${email}`;
          try {
            await otpRateLimiter.consume(identifier);
          } catch (e) {
            throw new APIError("TOO_MANY_REQUESTS", { message: "Too many reset requests for this email/IP. Please try again later." });
          }
        }

        // 1. Turnstile Validation
        const token = ctx.request?.headers.get("x-turnstile-token");
        if (!token) {
          throw new APIError("BAD_REQUEST", { message: "CAPTCHA token missing. Please refresh and try again." });
        }

        const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
        if (turnstileSecret) {
          const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${turnstileSecret}&response=${token}`,
          });
          const data = await res.json();
          if (!data.success) {
            throw new APIError("BAD_REQUEST", { message: "CAPTCHA validation failed. Please try again." });
          }
        }

        // 2. Email Checks
        const email = body?.email;
        if (typeof email === "string") {
          const domain = email.split("@")[1]?.toLowerCase();
          if (!domain) {
            throw new APIError("BAD_REQUEST", { message: "Invalid email format." });
          }

          // Disposable check
          if (disposableDomains.includes(domain)) {
            throw new APIError("BAD_REQUEST", { message: "Disposable or temporary emails are not allowed." });
          }

          // MX Record check (soft fail)
          try {
            const mxRecords = await resolveMx(domain);
            if (!mxRecords || mxRecords.length === 0) {
              throw new APIError("BAD_REQUEST", { message: "Email domain cannot receive messages." });
            }
          } catch (e: any) {
            if (e.code === 'ENOTFOUND' || e.code === 'ENODATA') {
              throw new APIError("BAD_REQUEST", { message: "Email domain does not exist." });
            }
            // Other errors (like timeouts) are soft-failed
          }
        }
      }
    }),
  },

  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => {
        return await argon2.hash(password, { type: argon2.argon2id });
      },
      verify: async ({ hash, password }) => {
        return await argon2.verify(hash, password);
      },
    },
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
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        let subject = "Your Dyvena Verification Code";
        let message = "Your verification code is:";
        
        if (type === "forget-password") {
          subject = "Reset your Dyvena password";
          message = "Your password reset code is:";
        } else if (type === "sign-in") {
          subject = "Sign in to Dyvena";
          message = "Your sign-in code is:";
        }

        await sendEmail({
          to: email,
          subject,
          html: `
            <p>${message} <strong>${otp}</strong></p>
            <p>This code is valid for 10 minutes. If you didn't request this, you can safely ignore this email.</p>
          `,
        });
      },
      sendVerificationOnSignUp: true,
    }),
  ],
});

export { ac };
