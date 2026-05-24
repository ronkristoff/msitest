import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  teams: defineTable({
    name: v.string(),
    slug: v.string(),
  }).index("by_slug", ["slug"]),

  projects: defineTable({
    name: v.string(),
    description: v.string(),
    baseUrl: v.string(),
    teamId: v.string(),
  }).index("by_team", ["teamId"]),

  prd_documents: defineTable({
    projectId: v.id("projects"),
    fileName: v.string(),
    fileType: v.string(),
    content: v.string(),
    storageId: v.optional(v.id("_storage")),
  }).index("by_project", ["projectId"]),

  feature_maps: defineTable({
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
  }).index("by_project", ["projectId"]),

  test_suites: defineTable({
    projectId: v.id("projects"),
    name: v.string(),
    description: v.optional(v.string()),
    schedule: v.optional(v.string()),
    isActive: v.boolean(),
  }).index("by_project", ["projectId"]),

  test_cases: defineTable({
    suiteId: v.id("test_suites"),
    title: v.string(),
    description: v.string(),
    category: v.union(
      v.literal("functional"),
      v.literal("security"),
      v.literal("error_handling"),
    ),
    steps: v.array(v.string()),
    expectedOutcomes: v.array(v.string()),
    actionSequence: v.optional(
      v.array(
        v.object({
          action: v.string(),
          selector: v.optional(v.string()),
          value: v.optional(v.string()),
          url: v.optional(v.string()),
          type: v.optional(v.string()),
          expectedText: v.optional(v.string()),
          expectedValue: v.optional(v.string()),
          expectedCount: v.optional(v.number()),
          expectedAttribute: v.optional(v.string()),
          timeout: v.optional(v.number()),
          frameSelector: v.optional(v.string()),
          accept: v.optional(v.boolean()),
          position: v.optional(v.object({ x: v.number(), y: v.number() })),
          cookieName: v.optional(v.string()),
          cookieValue: v.optional(v.string()),
          key: v.optional(v.string()),
        }),
      ),
    ),
    targetUrl: v.optional(v.string()),
    status: v.union(
      v.literal("drafting"),
      v.literal("reviewing"),
      v.literal("approved"),
    ),
    order: v.number(),
  }).index("by_suite", ["suiteId"]),

  test_runs: defineTable({
    suiteId: v.id("test_suites"),
    projectId: v.id("projects"),
    trigger: v.union(
      v.literal("manual"),
      v.literal("scheduled"),
      v.literal("webhook"),
    ),
    status: v.union(
      v.literal("pending"),
      v.literal("running"),
      v.literal("passed"),
      v.literal("failed"),
      v.literal("cancelled"),
    ),
    workerId: v.optional(v.id("workers")),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
  }).index("by_suite", ["suiteId"])
    .index("by_project", ["projectId"])
    .index("by_status", ["status"]),

  test_run_results: defineTable({
    runId: v.id("test_runs"),
    testCaseId: v.id("test_cases"),
    status: v.union(
      v.literal("pending"),
      v.literal("running"),
      v.literal("passed"),
      v.literal("failed"),
      v.literal("skipped"),
    ),
    errorMessage: v.optional(v.string()),
    duration: v.optional(v.number()),
    stepsSnapshot: v.optional(v.any()),
  }).index("by_run", ["runId"])
    .index("by_test_case", ["testCaseId"]),

  test_run_step_results: defineTable({
    resultId: v.id("test_run_results"),
    stepIndex: v.number(),
    description: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("running"),
      v.literal("passed"),
      v.literal("failed"),
    ),
    screenshotId: v.optional(v.id("_storage")),
    consoleLogs: v.optional(v.array(v.string())),
    errorMessage: v.optional(v.string()),
  }).index("by_result", ["resultId"]),

  failure_analyses: defineTable({
    resultId: v.id("test_run_results"),
    classification: v.union(
      v.literal("real_bug"),
      v.literal("flaky_selector"),
      v.literal("timeout"),
      v.literal("environment"),
    ),
    explanation: v.string(),
    suggestedFix: v.string(),
  }).index("by_result", ["resultId"]),

  credentials: defineTable({
    scopeId: v.string(),
    name: v.string(),
    type: v.string(),
    value: v.string(),
    targetUrl: v.optional(v.string()),
  }).index("by_scope", ["scopeId"])
    .index("by_scope_and_name", ["scopeId", "name"]),

  test_account_credentials: defineTable({
    projectId: v.id("projects"),
    name: v.string(),
    username: v.string(),
    password: v.string(),
    targetUrl: v.optional(v.string()),
  }).index("by_project", ["projectId"]),

  workers: defineTable({
    name: v.string(),
    type: v.union(
      v.literal("cloud"),
      v.literal("local"),
    ),
    status: v.union(
      v.literal("online"),
      v.literal("offline"),
      v.literal("busy"),
    ),
    lastHeartbeat: v.optional(v.number()),
    teamId: v.string(),
  }).index("by_team", ["teamId"])
    .index("by_status", ["status"]),
});
