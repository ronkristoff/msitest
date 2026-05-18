import { mutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { decrypt, encrypt } from "./encryption";

export const setApiKey = mutation({
  args: {
    scopeId: v.string(),
    apiKey: v.string(),
    provider: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const encrypted = await encrypt(args.apiKey);

    const existing = await ctx.db
      .query("credentials")
      .withIndex("by_scope_and_name", (q) =>
        q.eq("scopeId", args.scopeId).eq("name", "llm_api_key"))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { value: encrypted });
    } else {
      await ctx.db.insert("credentials", {
        scopeId: args.scopeId,
        name: "llm_api_key",
        type: args.provider || "openai",
        value: encrypted,
      });
    }
    return null;
  },
});

export const _getDecrypted = internalQuery({
  args: {
    scopeId: v.string(),
    name: v.string(),
  },
  returns: v.union(v.string(), v.null()),
  handler: async (ctx, args) => {
    const credential = await ctx.db
      .query("credentials")
      .withIndex("by_scope_and_name", (q) =>
        q.eq("scopeId", args.scopeId).eq("name", args.name))
      .first();

    if (!credential) return null;
    return await decrypt(credential.value);
  },
});
