/**
 * Auth client — browser-side Better Auth utilities.
 *
 * Runs in browser. Provides sign-in/sign-up/sign-out methods and session
 * hooks for client components.
 *
 * Currently used:
 * - signIn, signUp  → components/auth-form.tsx
 * - useSession      → available for components needing current user
 * - signOut         → available for user menu
 */
import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [convexClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
