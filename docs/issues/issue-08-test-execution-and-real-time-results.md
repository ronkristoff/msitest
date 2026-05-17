## Parent

PRD.md — Phase 3 (Test Execution)

## What to build

The run orchestration layer and results UI. A "Run" button on the approved plan page triggers the state machine (pending → running → passed/failed/cancelled). The Workpool enqueues test jobs, the worker executes them, and step-by-step results stream back to the UI in real time. Results page shows per-test-case verdicts with expandable step details, screenshots, console logs, and execution time. Abandoned in-progress runs are detected by a Convex cron.

## Acceptance criteria

- [ ] "Run" button creates a test_run record and enqueues via Workpool
- [ ] Run state transitions: pending → running → passed/failed/cancelled
- [ ] UI shows real-time per-step status updates during execution
- [ ] Each step result shows: status, screenshot, console logs, duration
- [ ] Test case verdict shown in results page (pass/fail with count)
- [ ] Cron detects abandoned in-progress runs (no heartbeat > 5 min)
- [ ] Tests: run state machine transitions, artifact upload flow

## Blocked by

- #7 — Worker/Agent & Playwright Runner
