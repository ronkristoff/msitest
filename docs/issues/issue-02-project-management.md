## Parent

PRD.md — Phase 1 (Foundation)

## What to build

Full project CRUD within a team context. Mutations: `createProject`, `updateProject`, `deleteProject`. Queries: `listProjects`, `getProject`. UI: project list page with team-scoped filtering, create project form (name, description, baseUrl), project detail page. Every query/mutation validates `teamId === currentUser.teamId`.

## Acceptance criteria

- [ ] User can create a project with name, description, and baseUrl
- [ ] Projects are scoped to the user's team (cross-team isolation verified by test)
- [ ] Project list shows only projects from the user's team
- [ ] Project detail page shows name, description, baseUrl
- [ ] User can update and delete their own projects
- [ ] Unit tests verify CRUD operations and tenant isolation

## Blocked by

- #1 — Foundation Scaffold
