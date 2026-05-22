/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as credentials from "../credentials.js";
import type * as encryption from "../encryption.js";
import type * as explore from "../explore.js";
import type * as feature_maps from "../feature_maps.js";
import type * as feature_maps_mutations from "../feature_maps_mutations.js";
import type * as http from "../http.js";
import type * as llm from "../llm.js";
import type * as prd_documents from "../prd_documents.js";
import type * as prd_documents_mutations from "../prd_documents_mutations.js";
import type * as projects from "../projects.js";
import type * as workers from "../workers.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  credentials: typeof credentials;
  encryption: typeof encryption;
  explore: typeof explore;
  feature_maps: typeof feature_maps;
  feature_maps_mutations: typeof feature_maps_mutations;
  http: typeof http;
  llm: typeof llm;
  prd_documents: typeof prd_documents;
  prd_documents_mutations: typeof prd_documents_mutations;
  projects: typeof projects;
  workers: typeof workers;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  betterAuth: import("@convex-dev/better-auth/_generated/component.js").ComponentApi<"betterAuth">;
  exploration: import("@convex-dev/workpool/_generated/component.js").ComponentApi<"exploration">;
};
