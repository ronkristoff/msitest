# PRD: AI-Powered E2E Test Platform

## Problem Statement

QA teams spend significant time writing and maintaining end-to-end test scripts. Each UI change breaks selectors. Each new feature requires manually scripting Playwright journeys. The feedback loop between writing tests, running them, and debugging failures is slow and manual.

The team needs a platform where QA describes what to test in plain language, the AI generates the test plan and Playwright code automatically, and results are presented with per-step screenshots and intelligent failure analysis.

## Solution

An AI-powered end-to-end testing web application. QA teams provide a URL and a PRD, the AI explores the live app to build a feature map, generates structured test plans in natural language, compiles them to Playwright TypeScript code, and executes them against the target app. Results are displayed with per-step screenshots, pass/fail verdicts, and AI-authored failure analysis with root cause classification.

The platform supports two execution modes: a cloud worker running on the team's Coolify server for public QA URLs, and a local agent running on QA machines for localhost/internal apps. Tests can be triggered manually from the dashboard, on a recurring schedule, or via a CI/CD webhook.

## User Stories

1. As a QA engineer, I want to create a project by providing a URL and uploading a PRD, so that the AI understands what my app does and generates accurate tests.
2. As a QA engineer, I want the AI to extract features and use cases from my PRD and display them as a visual flow graph, so that I can verify it understood my requirements before generating tests.
3. As a QA engineer, I want the AI to autonomously explore my live app, navigating from the root URL to each feature mentioned in the PRD, so that tests are grounded in real observed behavior.
4. As a QA engineer, I want to see which features were successfully explored and which were blocked during exploration, so that I can provide missing URLs or credentials.
5. As a QA engineer, I want the AI to generate a structured test plan with natural-language steps, organized by functional/security/error-handling categories, so that I can review and edit tests without writing code.
6. As a QA engineer, I want to edit test case descriptions in plain English and have the AI regenerate the steps, so that I can refine tests without technical knowledge.
7. As a QA engineer, I want to select and deselect individual test cases from the generated plan, so that I control exactly what runs.
8. As a QA engineer, I want to click "Run" and see tests execute against my app in real time, with step-by-step status updates, so that I can monitor progress.
9. As a QA engineer, I want to see per-step screenshots of the app during test execution, so that I can visually inspect what happened at each step.
10. As a QA engineer, I want the AI to analyze test failures and classify the root cause as a real bug, flaky selector, timeout, or environment issue, so that I know where to focus.
11. As a QA engineer, I want AI-authored explanations and suggested fixes for every failure, so that I can quickly address issues.
12. As a QA engineer, I want to group test cases into test suites (e.g., "Smoke Tests", "Full Regression"), so that I can organize and trigger batches of related tests.
13. As a QA engineer, I want to schedule test suites to run automatically on a recurring basis (daily, weekly, etc.), so that regressions are caught without manual effort.
14. As a QA engineer, I want to view run history with pass/fail trends over time, so that I can track the stability of my app.
15. As a QA engineer, I want to compare test runs over time to see which tests changed status, so that I can identify new regressions.
16. As a developer, I want CI/CD pipelines to trigger test suites via a webhook and poll for results, so that deployments are validated automatically.
17. As a developer, I want to review AI failure analysis reports linked from CI checks, so that I can fix bugs before they reach production.
18. As a QA engineer, I want to store test account credentials per project (encrypted), so that the AI can use them during exploration and test execution.
19. As a QA engineer, I want to run tests against localhost apps via a local agent installed on my machine, so that I can test before deploying to staging.
20. As a QA engineer, I want to see the status of cloud and local workers in the dashboard (online/offline/busy), so that I know tests can be executed.
21. As a team lead, I want team members to authenticate via email/password or SSO (GitHub, Google), so that access is controlled.
22. As a team lead, I want projects and workers scoped to my team, so that data is isolated between teams.
23. As a team lead, I want each team to configure their own LLM API key (BYOK), so that the team controls which provider to use and pays for their own inference.
24. As a QA engineer, I want the AI to generate synthetic test data (usernames, emails, passwords) when credentials are not provided, so that I can still test form flows.
25. As a QA engineer, I want to edit a test case description and regenerate it, so that I can iterate without recreating the entire plan.

## Implementation Decisions

### Architecture
- **Frontend:** Next.js App Router with React and Tailwind CSS, deployed on Coolify
- **Backend:** Convex (functions, database, file storage, crons) — self-hosted on Coolify
- **Auth:** Better Auth component (email/password + GitHub/Google OAuth + organizations)
- **Job Queue:** Convex Workpool component (parallelism limits, retries, reactive status)
- **LLM:** BYOK — user provides their own API key. OpenAI-compatible first (Z.AI, OpenAI), Anthropic later
- **Deployment:** Self-hosted on Coolify (Next.js + Convex backend + cloud test agent)

### Key Modules

#### LLM Abstraction (Deep Module)
- Interface: `generateText(prompt, options)` and `generateWithImages(prompt, images, options)`
- Handles: provider selection, API key decryption, retry logic, error normalization
- Testable in isolation by mocking the API key store and providing test prompts

#### PRD Processor
- Handles: markdown text extraction, PDF text extraction (via pdf-parse library), plain text
- Output: cleaned text passed to LLM for feature map extraction
- Tests: unit tests for PDF parsing, feature map JSON schema validation

#### Explore Engine (Deep Module)
- Interface: `exploreApp(baseUrl, features, credentials) → featureStatus[]`
- Handles: browser launch, page navigation, link/button extraction, LLM-guided feature matching, DOM capture, screenshot capture
- Tests: mock browser interactions, verify feature matching logic with known page structures

#### Plan Generator
- Consumes: feature map + exploration results + user description + available credentials
- Calls LLM with structured prompt to produce test case array
- Output: validated JSON matching the test case schema

#### Code Generator (Action Sequence Generator)
- Translates: natural language steps → JSON action sequence DSL
- Supports 28 actions: navigate, click, fill, select, check/uncheck, hover, press, upload, drag, assert*, wait*, iframe, dialog, scroll, and more
- Follows: selector priority (data-testid → text → role), error handling per step
- Output: structured JSON array executed step-by-step by the worker
- Tests: verify generated JSON matches action schema, round-trip parseable

#### Playwright Runner (Deep Module)
- Interface: `runTest(actionSequence, url, credentials) → { steps: [{ status, screenshotUrl, consoleLogs }] }`
- Handles: browser launch, isolated context per test, step-by-step execution of JSON action DSL, screenshot capture between steps, error recovery
- Tests: run against a simple test HTML page, verify screenshots are captured, errors are caught

#### Run Orchestrator
- Manages: Workpool integration, test_run state machine, step result aggregation, artifact upload
- State machine: pending → running → passed/failed/cancelled
- Convex cron monitors for abandoned in-progress runs

#### Worker/Agent (Deep Module)
- CLI daemon that: registers with Convex, polls for jobs, launches Runner/Analyzer/Explorer, sends heartbeat, uploads results
- Two modes: cloud (on Coolify server) and local (on QA machine)
- Tests: mock Convex client, verify job claiming and result submission flow

#### Failure Analyzer
- After run completes: fetches failed step data, screenshots, console logs
- Calls LLM to classify: real_bug / flaky_selector / timeout / environment
- Stores classification, explanation, and suggested fix per failed test case

### Schema (Convex Tables)
- `teams` — Better Auth orgs, scopes all data
- `projects` — name, description, baseUrl, teamId
- `prd_documents` — projectId, fileName, fileType, content
- `feature_maps` — prdId, projectId, features (JSON), explorationStatus
- `test_suites` — projectId, name, description, schedule, isActive
- `test_cases` — suiteId, title, description, category, steps, expectedOutcomes, actionSequence, targetUrl, status, order
- `test_runs` — suiteId, trigger, status, workerId, startedAt, completedAt
- `test_run_results` — runId, testCaseId, status, errorMessage, duration, stepsSnapshot (JSON snapshot of steps + actionSequence at execution time)
- `test_run_step_results` — resultId, stepIndex, description, status, screenshotId, consoleLogs, errorMessage
- `failure_analyses` — resultId, classification, explanation, suggestedFix
- `credentials` — scopeId, name, type, value (encrypted LLM BYOK key), targetUrl
- `test_account_credentials` — projectId, name, username, password (encrypted), targetUrl
- `workers` — name, type, status, lastHeartbeat, teamId

### API Contracts
All Convex functions use the new function syntax with `v.*` validators. Key mutations include: `createProject`, `uploadPRD`, `extractFeatureMap`, `startExploration`, `generatePlan`, `saveApprovedPlan`, `createTestRun`, `addStepResult`, `completeRun`, `registerWorker`, `heartbeat`, `claimWork`. Key queries include: `listProjects`, `getTestCasesBySuite`, `getRunResults`, `getRunHistory`, `listWorkers`, `isThereWork`, `getFeatureMap`.

### Execution Flow

**Guided mode (PRD provided):**
1. User creates project with URL + PRD + description
2. AI extracts feature map from PRD
3. Worker visits root URL, follows links matching PRD features, captures DOM + screenshots
4. AI generates test plan from feature map + exploration + user description
5. User reviews/edits/approves plan
6. AI generates JSON action sequence per test case
7. User clicks Run → Workpool enqueues → Worker executes → screenshots captured between steps
8. AI analyzes failures with classification + fix suggestions
9. Results displayed with step-by-step screenshots

**Discovery mode (URL only, no PRD):**
1. User creates project with URL + optional description (no PRD)
2. Worker crawls app from root URL, discovers pages and interactive elements
3. AI infers features from crawl results and generates a feature map
4. AI generates test plan from discovered features
5. User reviews/edits/approves plan (same as guided mode from step 5 onwards)

## Testing Decisions

### Testing Philosophy
- Test external behavior, not implementation details
- A good test sets up inputs, exercises the module through its public interface, and asserts on outputs
- Mock external dependencies (Convex, LLM APIs, Playwright browser) at module boundaries
- Integration tests verify the actual browser automation with a known test page

### Modules to Test

**LLM Abstraction:**
- Verify provider selection logic (Z.AI vs OpenAI by model string)
- Verify API key decryption and caching
- Verify retry behavior on transient errors
- Verify `generateWithImages` correctly formats multimodal requests

**Playwright Runner:**
- Unit test: verify step-by-step execution against a controlled HTML fixture
- Unit test: verify screenshot capture at each step
- Unit test: verify error handling when a step fails (timeout, missing element)
- Unit test: verify browser context isolation between test cases

**PRD Processor:**
- Unit test: PDF text extraction from a known PDF fixture
- Unit test: markdown text extraction
- Unit test: feature map JSON schema validation (all required fields, no extra fields)

**Explore Engine:**
- Unit test: link/button extraction from known HTML
- Unit test: feature matching logic with mock LLM responses
- Unit test: status reporting per feature (found/blocked/failed)

**Worker/Agent:**
- Unit test: job claiming loop (mock Convex responses)
- Unit test: heartbeat timing
- Unit test: result submission with mock step results

**Convex Functions:**
- Unit test: project CRUD scoped to teamId
- Unit test: test run state transitions (pending → running → passed/failed)
- Unit test: tenant isolation (team A cannot read team B's data)
- Unit test: credential encryption/decryption round trip

### Prior Art
Tests for Convex functions should follow the patterns in the `@convex-dev/component-tests` package. Tests for the test agent should use `vitest` with `node` environment. The Playwright runner tests should use a local HTML server fixture to run against, following patterns from Playwright's own test suite.

## Out of Scope

- Video recording of test runs (V2)
- Auto-healing of failed selectors (V2)
- API endpoint testing (V2)
- Image/OCR support for PRD documents (V2)
- GitHub App integration for PR-based test triggers (V2)
- Slack/email notifications (V2)
- MCP server for IDE integration (V2)
- Docker containerization of Playwright (V2, if needed)
- Load/performance testing
- Mobile app testing (iOS/Android)
- Parallel test execution across multiple workers (V2)

## Further Notes

### Phased Delivery

**Phase 1 — Foundation:** Next.js scaffold, Convex schema, Better Auth, dashboard layout, project CRUD, Workpool setup.

**Phase 2 — AI Engine:** PRD upload/parsing, LLM abstraction with BYOK + onboarding, feature map extraction, explore engine (guided + discovery modes), plan generation, plan review UI, action sequence generation.

**Phase 3 — Test Execution:** Worker/Agent CLI, cloud worker on Coolify, local agent mode, Workpool job queue integration, Playwright runner with step-by-step screenshots, run orchestration, failure analysis, reporting UI.

**Phase 4 — Polish:** CRUD for test suites, edit/iterate flow, scheduled runs via Convex crons, CI webhook endpoint, credentials management UI, run history and trend visualization, project settings.

### BYOK Model
Each team configures their own LLM API key. On first signup, users are prompted to configure their AI provider (Z.AI / OpenAI) and API key before accessing AI features. The key is encrypted in the Convex database and decrypted only within Convex actions at runtime. This means the platform itself never pays for inference. Anthropic Claude is supported as a future provider.

### Tenant Isolation
Better Auth organizations scope all data by team. On signup, a personal organization is auto-created for each user. `teamId` references the organization, not the user identity. Every Convex query and mutation validates `teamId === currentUser.teamId`. Workers are also scoped per team. This makes adding multi-user teams and paid plans later straightforward.

### Why No Docker for Playwright
Playwright + Chromium is installed directly on the Coolify server and on QA machines. Browser contexts provide sufficient isolation for internal use. No Docker-in-Docker complexity. Containerization can be added later if concurrent runs become a bottleneck.

### Concurrency Model
V1 limits test execution to one run at a time per team. The Workpool component enforces this. If a run is in progress, subsequent runs are queued. Multiple workers can exist per team (cloud + local agents), but only one executes at a time. Parallel execution across workers is V2.
