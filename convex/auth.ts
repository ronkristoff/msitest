/**
 * Auth module — single source of truth for authentication configuration.
 *
 * Runs in Convex runtime (V8). Sets up Better Auth with the Convex adapter,
 * configures providers and plugins, and exposes the `getCurrentUser` query.
 *
 * Used by:
 * - convex/http.ts     — registers auth HTTP routes
 * - lib/auth-server.ts — Next.js server-side bridge
 * - lib/auth-client.ts — browser-side client
 */
import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { v } from "convex/values";
import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import authConfig from "./auth.config";

const siteUrl = process.env.SITE_URL!;

export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      },
    },
    plugins: [
      convex({ authConfig }),
      organization(),
    ],
  });
};

export const getCurrentUser = query({
  args: {},
  returns: v.union(
    v.object({
      _id: v.id("user"),
      _creationTime: v.number(),
      name: v.string(),
      email: v.string(),
    }),
    v.null(),
  ),
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});
