"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

interface LlmOptions {
  maxTokens?: number;
  temperature?: number;
  model?: string;
}

const DEFAULT_MODEL = "gpt-4o";
const MAX_RETRIES = 3;

async function getApiKey(ctx: { runQuery: <T>(...args: unknown[]) => Promise<T> }, scopeId: string): Promise<string> {
  const credential = await ctx.runQuery<string | null>(internal.credentials._getDecrypted, { scopeId, name: "llm_api_key" });
  if (!credential) throw new Error("No LLM API key configured. Visit Settings to add one.");
  return credential;
}

async function callProvider(
  apiKey: string,
  prompt: string,
  options: LlmOptions,
): Promise<string> {
  const baseUrl = process.env.LLM_BASE_URL || "https://api.openai.com/v1";
  const model = options.model || DEFAULT_MODEL;

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: options.maxTokens ?? 2000,
      temperature: options.temperature ?? 0.3,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`LLM provider error (${response.status}): ${body.slice(0, 200)}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? "";
}

export const generateText = action({
  args: {
    prompt: v.string(),
    scopeId: v.string(),
    maxTokens: v.optional(v.number()),
    temperature: v.optional(v.number()),
    model: v.optional(v.string()),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    const apiKey = await getApiKey(ctx as unknown as { runQuery: <T>(...args: unknown[]) => Promise<T> }, args.scopeId);

    const options: LlmOptions = {
      maxTokens: args.maxTokens,
      temperature: args.temperature,
      model: args.model,
    };

    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await callProvider(apiKey, args.prompt, options);
      } catch (e) {
        lastError = e instanceof Error ? e : new Error(String(e));
        if (attempt < MAX_RETRIES) {
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    throw new Error(`LLM call failed after ${MAX_RETRIES} attempts: ${lastError?.message}`);
  },
});
