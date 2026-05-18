import { internalQuery, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireUserId } from "./auth";

export const uploadPrdText = mutation({
  args: {
    projectId: v.id("projects"),
    fileName: v.string(),
    content: v.string(),
  },
  returns: v.id("prd_documents"),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);

    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");
    if (project.teamId !== userId) throw new Error("Not authorized");

    return await ctx.db.insert("prd_documents", {
      projectId: args.projectId,
      fileName: args.fileName,
      fileType: args.fileName.endsWith(".pdf") ? "pdf" : "markdown",
      content: args.content,
    });
  },
});

export const _getById = internalQuery({
  args: {
    prdDocumentId: v.id("prd_documents"),
  },
  returns: v.union(
    v.object({
      _id: v.id("prd_documents"),
      content: v.string(),
      fileName: v.string(),
      fileType: v.string(),
      projectId: v.id("projects"),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.prdDocumentId);
  },
});
