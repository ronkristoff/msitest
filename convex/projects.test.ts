/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { describe, expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

function makeAuthed(userId: string) {
  return convexTest(schema, modules).withIdentity({
    tokenIdentifier: userId,
    subject: userId,
  });
}

function makeUnauthed() {
  return convexTest(schema, modules);
}

describe("Projects CRUD", () => {
  test("createProject stores data and returns an ID", async () => {
    const t = makeAuthed("test-user-1");
    const id = await t.mutation(api.projects.createProject, {
      name: "My Project",
      description: "A test project",
      baseUrl: "https://example.com",
    });
    expect(id).toBeDefined();
  });

  test("listProjects returns projects after creation", async () => {
    const t = makeAuthed("test-user-2");
    await t.mutation(api.projects.createProject, {
      name: "List Test",
      description: "For listing",
      baseUrl: "https://list.example.com",
    });

    const projects = await t.query(api.projects.listProjects);
    expect(projects.length).toBe(1);
    expect(projects[0].name).toBe("List Test");
  });

  test("getProject returns a project by ID", async () => {
    const t = makeAuthed("test-user-3");
    const projectId = await t.mutation(api.projects.createProject, {
      name: "Get Test",
      description: "For getting",
      baseUrl: "https://get.example.com",
    });

    const project = await t.query(api.projects.getProject, { projectId });
    expect(project).not.toBeNull();
    expect(project!.name).toBe("Get Test");
    expect(project!.description).toBe("For getting");
    expect(project!.baseUrl).toBe("https://get.example.com");
  });

  test("updateProject modifies fields", async () => {
    const t = makeAuthed("test-user-4");
    const projectId = await t.mutation(api.projects.createProject, {
      name: "Old Name",
      description: "Old desc",
      baseUrl: "https://old.example.com",
    });

    await t.mutation(api.projects.updateProject, {
      projectId,
      name: "New Name",
      description: "New desc",
    });

    const updated = await t.query(api.projects.getProject, { projectId });
    expect(updated!.name).toBe("New Name");
    expect(updated!.description).toBe("New desc");
    expect(updated!.baseUrl).toBe("https://old.example.com");
  });

  test("deleteProject removes a project", async () => {
    const t = makeAuthed("test-user-5");
    const projectId = await t.mutation(api.projects.createProject, {
      name: "Delete Me",
      description: "To be deleted",
      baseUrl: "https://delete.example.com",
    });

    await t.mutation(api.projects.deleteProject, { projectId });

    const gone = await t.query(api.projects.getProject, { projectId });
    expect(gone).toBeNull();
  });

  test("createProject requires authentication", async () => {
    const t = makeUnauthed();
    await expect(
      t.mutation(api.projects.createProject, {
        name: "No Auth",
        description: "Should fail",
        baseUrl: "https://no-auth.example.com",
      }),
    ).rejects.toThrow("Not authenticated");
  });

  test("tenant isolation — user A cannot read user B's projects", async () => {
    const t = convexTest(schema, modules);
    const userA = t.withIdentity({ tokenIdentifier: "user-a", subject: "user-a" });
    const userB = t.withIdentity({ tokenIdentifier: "user-b", subject: "user-b" });

    await userA.mutation(api.projects.createProject, {
      name: "A's Project",
      description: "Only A can see this",
      baseUrl: "https://a.example.com",
    });

    const bList = await userB.query(api.projects.listProjects);
    expect(bList.length).toBe(0);
  });

  test("tenant isolation — user A cannot update user B's project", async () => {
    const t = convexTest(schema, modules);
    const userA = t.withIdentity({ tokenIdentifier: "user-a-update", subject: "user-a-update" });
    const userB = t.withIdentity({ tokenIdentifier: "user-b-update", subject: "user-b-update" });

    const projectId = await userA.mutation(api.projects.createProject, {
      name: "A's Update Test",
      description: "Only A owns this",
      baseUrl: "https://a-update.example.com",
    });

    await expect(
      userB.mutation(api.projects.updateProject, {
        projectId,
        name: "Hacked Name",
      }),
    ).rejects.toThrow("Not authorized");
  });

  test("tenant isolation — user A cannot delete user B's project", async () => {
    const t = convexTest(schema, modules);
    const userA = t.withIdentity({ tokenIdentifier: "user-a-delete", subject: "user-a-delete" });
    const userB = t.withIdentity({ tokenIdentifier: "user-b-delete", subject: "user-b-delete" });

    const projectId = await userA.mutation(api.projects.createProject, {
      name: "A's Delete Test",
      description: "Only A owns this",
      baseUrl: "https://a-delete.example.com",
    });

    await expect(
      userB.mutation(api.projects.deleteProject, { projectId }),
    ).rejects.toThrow("Not authorized");
  });
});
