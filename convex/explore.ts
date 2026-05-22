import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { requireUserId } from "./auth";
import { internal } from "./_generated/api";

/**
 * Sets all features in a feature map to "pending" for the first time.
 * Idempotent — preserves existing "explored"/"blocked"/"failed" statuses.
 * The actual exploration is handled by the Worker CLI.
 */
export const startExploration = mutation({
  args: {
    projectId: v.id("projects"),
    featureMapId: v.id("feature_maps"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);

    const project = await ctx.db.get(args.projectId);
    if (!project || project.teamId !== userId) {
      throw new Error("Project not found or not authorized");
    }

    const featureMap = await ctx.db.get(args.featureMapId);
    if (!featureMap) throw new Error("Feature map not found");

    // Only set "pending" for features that haven't been explored yet.
    // Preserves existing "explored"/"blocked"/"failed" statuses.
    const currentStatus = featureMap.explorationStatus || {};
    for (const feature of featureMap.features) {
      if (!currentStatus[feature.name]) {
        currentStatus[feature.name] = "pending";
      }
    }

    await ctx.db.patch(args.featureMapId, {
      explorationStatus: currentStatus,
    });

    return null;
  },
});

/**
 * Updates the exploration status for a single feature.
 * Internal — called by reportFeatureStatus and the Worker CLI.
 */
export const _updateExplorationStatus = internalMutation({
  args: {
    featureMapId: v.id("feature_maps"),
    featureName: v.string(),
    status: v.union(
      v.literal("explored"),
      v.literal("blocked"),
      v.literal("failed"),
    ),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const featureMap = await ctx.db.get(args.featureMapId);
    if (!featureMap) return null;

    const currentStatus = featureMap.explorationStatus || {};
    currentStatus[args.featureName] = args.status;

    await ctx.db.patch(args.featureMapId, { explorationStatus: currentStatus });
    return null;
  },
});

/**
 * Lists pending features for exploration.
 * Called by the Worker CLI to find work.
 */
export const getPendingFeatures = query({
  args: {
    featureMapId: v.id("feature_maps"),
  },
  returns: v.array(v.string()),
  handler: async (ctx, args) => {
    const featureMap = await ctx.db.get(args.featureMapId);
    if (!featureMap) return [];

    const status = featureMap.explorationStatus || {};
    return featureMap.features
      .filter((f) => !status[f.name] || status[f.name] === "pending")
      .map((f) => f.name);
  },
});

/**
 * Public mutation — called by the Worker CLI to report exploration result for a feature.
 * Delegates to the internal mutation for the actual logic.
 */
export const reportFeatureStatus = mutation({
  args: {
    featureMapId: v.id("feature_maps"),
    featureName: v.string(),
    status: v.union(
      v.literal("explored"),
      v.literal("blocked"),
      v.literal("failed"),
    ),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.explore._updateExplorationStatus, args);
    return null;
  },
});
