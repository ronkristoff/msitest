## Parent

PRD.md — Phase 3 (Test Execution)

## What to build

The full Worker/Agent CLI daemon with cloud and local modes. The agent registers with Convex, polls for jobs via Workpool, sends heartbeats, and submits results. The Playwright runner executes generated `.spec.ts` code step-by-step, captures screenshots after each step, handles errors (timeout, missing element), and returns structured results. Three Workpool queues configured: test execution, exploration, AI generation. Worker status shown in dashboard (online/offline/busy).

## Acceptance criteria

- [ ] Worker CLI starts in cloud mode, registers with Convex, polls for work
- [ ] Worker CLI starts in local mode, connects to same Convex backend
- [ ] Worker sends periodic heartbeats (updates lastHeartbeat in DB)
- [ ] Playwright runner executes a test case step-by-step
- [ ] Screenshots captured after each step and uploaded to Convex storage
- [ ] Runner handles errors (timeout, missing element) gracefully
- [ ] Runner isolates browser context per test case
- [ ] Three Workpool queues operational with configurable parallelism
- [ ] Dashboard shows worker list with online/offline/busy status
- [ ] Tests: job claiming loop, browser execution against known HTML fixture

## Blocked by

- #6 — Playwright Code Generation
