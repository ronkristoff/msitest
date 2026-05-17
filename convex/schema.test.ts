/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { describe, expect, test } from "vitest";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

describe("Convex schema", () => {
  test("schema registers without errors", async () => {
    const t = convexTest(schema, modules);
    expect(t).toBeDefined();
  });

  test("schema contains all required tables", () => {
    const tableNames = Object.keys(schema.tables);
    expect(tableNames).toContain("teams");
    expect(tableNames).toContain("projects");
    expect(tableNames).toContain("prd_documents");
    expect(tableNames).toContain("feature_maps");
    expect(tableNames).toContain("test_suites");
    expect(tableNames).toContain("test_cases");
    expect(tableNames).toContain("test_runs");
    expect(tableNames).toContain("test_run_results");
    expect(tableNames).toContain("test_run_step_results");
    expect(tableNames).toContain("failure_analyses");
    expect(tableNames).toContain("credentials");
    expect(tableNames).toContain("workers");
  });

  test("feature_maps.features is a structured validator (not v.any)", () => {
    const tableDef = schema.tables.feature_maps;
    expect(tableDef).toBeDefined();

    // The serialized validator should contain the field names, not just "any"
    const serialized = JSON.stringify(tableDef);
    expect(serialized).toContain("name");
    expect(serialized).toContain("useCases");
    expect(serialized).toContain("category");
    expect(serialized).toContain("functional");
    expect(serialized).toContain("security");
    expect(serialized).toContain("error_handling");

    // v.any() serializes differently — it would not contain these structured keys
    expect(serialized).not.toContain('"type":"any"');
  });
});
