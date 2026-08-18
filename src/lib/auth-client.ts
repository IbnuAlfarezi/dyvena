import { createAuthClient } from "better-auth/react";
import {
  organizationClient,
  emailOTPClient,
  adminClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [organizationClient(), emailOTPClient(), adminClient()],
});
