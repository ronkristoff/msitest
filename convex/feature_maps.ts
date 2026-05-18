"use node";

import type { Id } from "./_generated/dataModel";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { api } from "./_generated/api";

type Feature = {
  name: string;
  useCases: string[];
  category: "functional" | "security" | "error_handling";
};

/**
 * Pure function — parses and validates raw LLM output into structured features.
 * Testable in isolation with string inputs.
 */
export function parseFeatureMapResponse(raw: string): Feature[] {
  let parsed: { features?: Array<{ name?: string; useCases?: unknown; category?: string }> };
  try {
    const cleaned = raw.replace(/```(?:json)?\s*([\s\S]*?)```/g, "$1").trim();
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("LLM returned invalid JSON. Please try again.");
  }

  if (!parsed.features || !Array.isArray(parsed.features) || parsed.features.length === 0) {
    throw new Error("LLM did not return any features. The PRD may be too short or unclear.");
  }

  const validCategories = ["functional", "security", "error_handling"] as const;
  return parsed.features.map((f): Feature => ({
    name: f.name || "Unnamed Feature",
    useCases: Array.isArray(f.useCases) ? f.useCases as string[] : [],
    category: (validCategories.includes(f.category as typeof validCategories[number]) ? f.category : "functional") as Feature["category"],
  }));
}

/**
 * Extracts a structured feature map from PRD text using the LLM.
 * Stores the result in the feature_maps table and returns the feature map ID.
 */
export const extractFeatureMap = action({
  args: {
    prdDocumentId: v.id("prd_documents"),
    projectId: v.id("projects"),
    scopeId: v.string(),
  },
  returns: v.id("feature_maps"),
  handler: async (ctx, args) => {
    // Verify the PRD document exists
    const prdDoc = await ctx.runQuery(internal.prd_documents_mutations._getById, {
      prdDocumentId: args.prdDocumentId,
    });
    if (!prdDoc) throw new Error("PRD document not found");

    const systemPrompt = `You are a QA test architect. Analyze the following PRD document and extract structured features.
Return ONLY valid JSON matching this schema:
{
  "features": [
    {
      "name": "Feature name",
      "useCases": ["Use case 1", "Use case 2"],
      "category": "functional" | "security" | "error_handling"
    }
  ]
}
- category: "functional" for core features, "security" for auth/security concerns, "error_handling" for error/edge-case testing
- Include at least 3-5 features covering different categories
- Be specific with use cases — each should be testable`;

    const prompt = `${systemPrompt}\n\nPRD Content:\n${String(prdDoc.content)}`;

    const result: string = await ctx.runAction(api.llm.generateText, {
      prompt,
      scopeId: args.scopeId,
      temperature: 0.2,
      maxTokens: 4000,
    });

    const validated = parseFeatureMapResponse(result);

    // Store the feature map via a mutation (runMutation from action)
    const featureMapId: string = await ctx.runMutation(internal.feature_maps_mutations._storeFeatureMap, {
      prdDocumentId: args.prdDocumentId,
      projectId: args.projectId,
      features: validated,
    });

    return featureMapId as Id<"feature_maps">;
  },
});

