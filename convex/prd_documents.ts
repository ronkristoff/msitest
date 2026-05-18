"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

/**
 * Parses a PDF from Convex file storage and returns the extracted text.
 */
export const parsePdf = action({
  args: {
    storageId: v.id("_storage"),
    projectId: v.id("projects"),
    fileName: v.string(),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity().then((id) => id?.tokenIdentifier);
    if (!userId) throw new Error("Not authenticated");

    const project = await ctx.runQuery(api.projects.getProject, {
      projectId: args.projectId,
    });
    if (!project) throw new Error("Project not found or not authorized");

    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) throw new Error("File not found in storage");

    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require("pdf-parse") as (buffer: Buffer) => Promise<{ text: string }>;
    const data = await pdfParse(buffer);
    return data.text;
  },
});
