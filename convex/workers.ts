import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireUserId } from "./auth";

export const registerWorker = mutation({
  args: {
    name: v.string(),
    type: v.union(v.literal("cloud"), v.literal("local")),
  },
  returns: v.id("workers"),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    // Note: `teamId` currently stores the authenticated user's scope identifier
    // (identity.tokenIdentifier). This will become a real org-based team ID
    // when multi-user teams are wired.
    return await ctx.db.insert("workers", {
      name: args.name,
      type: args.type,
      status: "online",
      lastHeartbeat: Date.now(),
      teamId: userId,
    });
  },
});

export const heartbeat = mutation({
  args: {
    workerId: v.id("workers"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.workerId, { lastHeartbeat: Date.now(), status: "online" });
    return null;
  },
});

export const unregisterWorker = mutation({
  args: {
    workerId: v.id("workers"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.workerId, { status: "offline" });
    return null;
  },
});

export const listWorkers = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("workers"),
    _creationTime: v.number(),
    name: v.string(),
    type: v.union(v.literal("cloud"), v.literal("local")),
    status: v.union(v.literal("online"), v.literal("offline"), v.literal("busy")),
    lastHeartbeat: v.optional(v.number()),
    teamId: v.string(),
  })),
  handler: async (ctx) => {
    const userId = await requireUserId(ctx);
    return await ctx.db
      .query("workers")
      .withIndex("by_team", (q) => q.eq("teamId", userId))
      .order("desc")
      .collect();
  },
});
