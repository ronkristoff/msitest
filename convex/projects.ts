import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Resolves the authenticated user's scope identifier.
 *
 * Currently uses the user's `tokenIdentifier` from the JWT identity for
 * single-user data isolation. This is intentionally NOT a real team/org ID
 * yet — the Better Auth `organization` plugin is configured but not yet
 * wired into project scoping. When multi-user teams are added, this will be
 * replaced with an org-based team ID from auth.ts.
 */
async function requireUserId(ctx: { auth: { getUserIdentity: () => Promise<{ tokenIdentifier: string } | null> } }) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");
  return identity.tokenIdentifier;
}

export const createProject = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    baseUrl: v.string(),
  },
  returns: v.id("projects"),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);

    return await ctx.db.insert("projects", {
      name: args.name,
      description: args.description,
      baseUrl: args.baseUrl,
      teamId: userId,
    });
  },
});

export const listProjects = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("projects"),
      _creationTime: v.number(),
      name: v.string(),
      description: v.string(),
      baseUrl: v.string(),
      teamId: v.string(),
    }),
  ),
  handler: async (ctx) => {
    const userId = await requireUserId(ctx);

    return await ctx.db
      .query("projects")
      .withIndex("by_team", (q) => q.eq("teamId", userId))
      .order("desc")
      .collect();
  },
});

export const getProject = query({
  args: {
    projectId: v.id("projects"),
  },
  returns: v.union(
    v.object({
      _id: v.id("projects"),
      _creationTime: v.number(),
      name: v.string(),
      description: v.string(),
      baseUrl: v.string(),
      teamId: v.string(),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);

    const project = await ctx.db.get(args.projectId);
    if (!project) return null;
    if (project.teamId !== userId) return null;

    return project;
  },
});

export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    baseUrl: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);

    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");
    if (project.teamId !== userId) throw new Error("Not authorized");

    const patch: Partial<{ name: string; description: string; baseUrl: string }> = {};
    if (args.name !== undefined) patch.name = args.name;
    if (args.description !== undefined) patch.description = args.description;
    if (args.baseUrl !== undefined) patch.baseUrl = args.baseUrl;

    await ctx.db.patch(args.projectId, patch);
    return null;
  },
});

export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);

    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");
    if (project.teamId !== userId) throw new Error("Not authorized");

    await ctx.db.delete(args.projectId);
    return null;
  },
});
