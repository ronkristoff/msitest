import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

export const _storeFeatureMap = internalMutation({
  args: {
    prdDocumentId: v.id("prd_documents"),
    projectId: v.id("projects"),
    features: v.array(
      v.object({
        name: v.string(),
        useCases: v.array(v.string()),
        category: v.union(
          v.literal("functional"),
          v.literal("security"),
          v.literal("error_handling"),
        ),
      }),
    ),
  },
  returns: v.id("feature_maps"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("feature_maps", {
      prdId: args.prdDocumentId,
      projectId: args.projectId,
      features: args.features,
    });
  },
});

export const listByProject = query({
  args: {
    projectId: v.id("projects"),
  },
  returns: v.array(
    v.object({
      _id: v.id("feature_maps"),
      _creationTime: v.number(),
      prdId: v.id("prd_documents"),
      projectId: v.id("projects"),
      features: v.array(
        v.object({
          name: v.string(),
          useCases: v.array(v.string()),
          category: v.union(
            v.literal("functional"),
            v.literal("security"),
            v.literal("error_handling"),
          ),
        }),
      ),
      explorationStatus: v.optional(
        v.record(v.string(), v.union(
          v.literal("pending"),
          v.literal("explored"),
          v.literal("blocked"),
          v.literal("failed"),
        )),
      ),
    }),
  ),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const project = await ctx.db.get(args.projectId);
    if (!project) return [];
    if (project.teamId !== identity.tokenIdentifier) return [];

    return await ctx.db
      .query("feature_maps")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();
  },
});
