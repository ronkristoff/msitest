## Parent

PRD.md — Phase 4 (Polish)

## What to build

Test suite CRUD (name, description, schedule, isActive, projectId). Organize test cases into suites. Scheduled runs via Convex crons (daily, weekly, custom cron expression). HTTP webhook endpoint (`POST /api/webhook/run`) that triggers a suite run by ID and returns a run token. Poll endpoint (`GET /api/webhook/run/:token`) for results. UI for suite management and schedule configuration.

## Acceptance criteria

- [ ] Test suite CRUD (create, list, get, update, delete)
- [ ] Assign/detach test cases to/from a suite
- [ ] Schedule configuration UI (daily, weekly, custom cron)
- [ ] Convex cron triggers suite run on schedule
- [ ] `POST /api/webhook/run` accepts suiteId, returns run token
- [ ] `GET /api/webhook/run/:token` returns run status and results
- [ ] Tests: webhook endpoint integration, cron scheduling

## Blocked by

- #8 — Test Execution & Real-time Results
- #10 — Run History & Trends
