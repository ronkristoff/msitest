/**
 * Auth server bridge — Next.js server-side utilities for Convex + Better Auth.
 *
 * Runs in Next.js server runtime (Node.js). Bridges Convex auth to Next.js
 * route handlers, server components, and server actions.
 *
 * Currently used:
 * - handler              → app/api/auth/[...all]/route.ts (auth API)
 * - isAuthenticated      → proxy.ts (route guard)
 *
 * Available for SSR / server actions:
 * - preloadAuthQuery     → preload authenticated queries in server components
 * - getToken             → manual access to auth token
 * - fetchAuthQuery       → call Convex queries from server actions
 * - fetchAuthMutation    → call Convex mutations from server actions
 * - fetchAuthAction      → call Convex actions from server actions
 */
import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";

export const {
  handler,
  preloadAuthQuery,
  isAuthenticated,
  getToken,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction,
} = convexBetterAuthNextJs({
  convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL!,
  convexSiteUrl: process.env.NEXT_PUBLIC_CONVEX_SITE_URL!,
});
