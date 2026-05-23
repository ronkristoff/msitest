# 001: Convex + Better Auth Race Condition

**Date:** 2026-05-23
**Severity:** Critical (blocks all authenticated users at login)
**Status:** Resolved

## Symptom

After logging in, authenticated Convex queries throw `Not authenticated` even though Better Auth session cookies are valid. The Next.js auth route (`/api/auth/get-session`) returns 200, and cookies (`__Secure-better-auth.session_token`, `better-auth.convex_jwt`) are present in the browser.

## Root Cause

Better Auth sets session cookies immediately after login, but `ConvexBetterAuthProvider` needs a separate step to validate the token with Convex. During this gap, `useQuery` calls fire without an auth token.

The Convex + Better Auth docs explicitly warn:
> *"Better Auth will reflect an authenticated user before Convex does, as the Convex client must subsequently validate the token provided by Better Auth. Convex functions that require authentication can throw if called before Convex has validated the token."*

## Fix

1. **Wrap authenticated content in `<Authenticated>` from `convex/react`** — not `useSession()` from Better Auth.

```tsx
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";

<Unauthenticated>Redirecting to sign in...</Unauthenticated>
<AuthLoading>Loading...</AuthLoading>
<Authenticated>
  {/* useQuery with auth-required functions is safe here */}
</Authenticated>
```

2. **Use `"better-auth/minimal"` import in Convex files** — the full `better-auth` import includes client-side code that bloats the Convex V8 isolate bundle and can cause memory issues.

```ts
// Correct — in convex/ files
import { betterAuth } from "better-auth/minimal";
import { organization } from "better-auth/plugins/organization";
```

3. **Don't silently swallow auth errors** — `requireUserId` had a try/catch around `authComponent.getAuthUser(ctx)` that hid failures.

```ts
export async function requireUserId(ctx) {
  const user = await authComponent.getAuthUser(ctx);
  if (!user) throw new Error("Not authenticated");
  return user._id;
}
```

## Files Changed

- `convex/auth.ts` — fixed import path, simplified `requireUserId`
- `app/(dashboard)/layout.tsx` — added `<Authenticated>`/`<Unauthenticated>`/`<AuthLoading>` guards

## Reference

- Docs: https://labs.convex.dev/better-auth/framework-guides/next
- Auth guards: https://labs.convex.dev/better-auth/basic-usage/authorization
- Debugging: https://labs.convex.dev/better-auth/debugging

## Rules to Remember

1. **Convex auth state != Better Auth session state.** Always use Convex's `<Authenticated>` guard for components that call auth-required Convex queries.
2. **Never fire `useQuery` against auth-required Convex functions outside `<Authenticated>`.**
3. **Convex env vars** (`SITE_URL`, `BETTER_AUTH_SECRET`) are set via `npx convex env set`, not `.env.local`.
4. **Import from subpaths** in Convex runtime: `"better-auth/minimal"`, `"better-auth/plugins/organization"`.
