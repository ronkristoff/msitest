# E2E Test Web App — Implementation Plan

## Overview

An AI-powered end-to-end testing platform inspired by TestSprite. QA teams provide a URL + PRD, the AI explores the live app, generates test plans in natural language, compiles them to Playwright code, and executes them — all from a web dashboard.

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     Next.js App (Coolify)                        │
│  ┌─────────────────────┐   ┌─────────────────────────────────┐  │
│  │   Web Dashboard     │   │   API Routes                     │  │
│  │   (Projects, Tests, │   │   - /api/webhooks/run-tests      │  │
│  │    Runs, Reports)   │   │   - /api/auth/* (Better Auth)    │  │
│  └─────────┬───────────┘   └────────────────┬────────────────┘  │
│            │                                │                    │
└────────────┼────────────────────────────────┼────────────────────┘
             │                                │
             ▼                                ▼
      ┌──────────────────────────────────────────────┐
       │              Convex (Self-Hosted)                │
      │                                              │
      │  Tables:                                     │
      │  - projects, test_suites, test_cases         │
      │  - test_runs, test_run_steps, run_artifacts  │
      │  - workers, credentials, prd_documents       │
      │                                              │
      │  Components:                                 │
      │  - Workpool (job queue + parallelism)        │
      │  - Better Auth (auth + orgs)                 │
      │                                              │
      │  AI: BYOK (Z.AI/OpenAI/Anthropic)            │
      │  via Convex actions                          │
      └──────────────────┬───────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
   ┌──────────┐   ┌──────────┐   ┌──────────────┐
   │ Cloud    │   │ Local    │   │ CI/CD        │
   │ Worker   │   │ Agent    │   │ Webhook      │
   │ (Coolify)│   │ (QA dev  │   │ (GitHub etc) │
   │          │   │  machine)│   │              │
   │ Playwright│   │ Playwright│  │ POST /api/   │
   │ + Chrom. │   │ + Chrom. │   │ webhooks/... │
   └──────────┘   └──────────┘   └──────────────┘
```

## Key Decisions

| Decision | Choice | Reasoning |
|---|---|---|
| **Deployment** | Next.js + Convex + Coolify (fully self-hosted) | Full control, SaaS-ready later |
| **Auth** | Better Auth (email/password + OAuth + orgs) | Scales to multi-tenant |
| **LLM** | BYOK — user provides API key (Z.AI / OpenAI / Claude) | Zero inference cost, no lock-in |
| **Test Execution** | Dual: cloud worker (Coolify) + local agent (dev machine) | Public URLs → cloud, localhost → agent |
| **Browser** | Direct Playwright + Chromium (no Docker) | Simpler Coolify deployment |
| **Test Format** | Abstract natural-language plan → LLM generates JSON action sequence | QA team edits plans, not code |
| **Test Input** | URL + natural language + PRD (from V1) | Richer context = better tests |
| **PRD Parsing** | Markdown + PDF + plain text (no images/OCR V1) | Covers 90%+ of real PRDs |
| **Explore Phase** | Yes — AI navigates from root URL guided by PRD feature map | Bridges what PRD says to what app does |
| **Page Analysis** | DOM + screenshots (both captured by worker) | Best quality for AI plan gen |
| **Test Data** | Synthetic + user-provided credentials per project | Covers both open and auth-gated flows |
| **Job Queue** | Convex Workpool component | Parallelism limits, retries, reactive status |
| **Reporting** | Screenshots + logs per step (no video V1) | Good enough for debugging failures |
| **Self-Healing** | Notify + manual regenerate (auto-heal V2) | Auto-heal is the hardest feature |
| **Triggers** | Manual + scheduled (Convex crons) + CI webhook | Covers all common workflows |
| **Organization** | Projects → Test Suites → Test Cases | Maps to how QA teams think |
| **Concurrency** | 1 run at a time per team (V1), parallel via Workpool (V2) | Simple, predictable execution |

## Testing Lifecycle (UI Tests)

**Guided mode (with PRD):**
1. **Project Setup** — Name + PRD upload + description
2. **Feature Map** — AI extracts features + use cases from PRD
3. **Configure** — Provide URL, test account credentials, natural language hints
4. **Explore** — AI walks live app feature by feature, capturing DOM + screenshots; identifies what's reachable and what's blocked
5. **Plan & Review** — AI drafts structured test plan; user edits descriptions in natural language, selects/deselects cases
6. **Generate Actions** — AI generates JSON action sequence per test case
7. **Run** — Workpool enqueues → worker executes → captures screenshots + logs
8. **Review** — Per-step screenshots, pass/fail verdict, AI-authored failure analysis
9. **Iterate** — Edit test descriptions in natural language → AI regenerates steps → regenerate actions

**Discovery mode (URL only, no PRD):**
1. **Project Setup** — URL + optional description (skip PRD)
2. **Discover** — Worker crawls app from root URL, catalogs pages and interactive elements
3. **Infer Features** — AI infers features from crawl results
4. **Plan & Review** — Same as guided mode from step 5 onwards

## Project Structure

```
msitest/
├── app/                          # Next.js App Router
│   ├── (dashboard)/              # Dashboard layout (auth-protected)
│   │   ├── projects/             # Project list / CRUD
│   │   ├── projects/[id]/        # Project detail
│   │   │   ├── tests/            # Test cases
│   │   │   ├── suites/           # Test suites
│   │   │   ├── runs/             # Run history
│   │   │   └── settings/         # Credentials, config
│   │   └── settings/             # API keys, team settings
│   ├── api/
│   │   ├── webhooks/run-tests/   # CI webhook
│   │   └── auth/                 # Better Auth handlers
│   └── layout.tsx
├── convex/                       # Convex backend
│   ├── schema.ts                 # Database schema
│   ├── convex.config.ts          # Component config (Workpool, Better Auth)
│   ├── projects.ts               # Project mutations/queries
│   ├── testSuites.ts             # Test suite mutations/queries
│   ├── testCases.ts              # Test case mutations/queries
│   ├── testRuns.ts               # Test run mutations/queries
│   ├── prd.ts                    # PRD parsing + feature extraction
│   ├── explore.ts                # Explore phase orchestration
│   ├── plan.ts                   # AI test plan generation
│   ├── generate.ts               # AI Playwright code generation
│   ├── analyze.ts                # AI failure analysis
│   ├── workers.ts                # Worker registration/heartbeat
│   ├── credentials.ts            # Encrypted credential management
│   ├── scheduling.ts             # Scheduled run logic
│   ├── crons.ts                  # Convex cron definitions
│   └── llm.ts                    # BYOK LLM abstraction layer
├── packages/
│   └── test-agent/               # npm package for cloud + local runner
│       ├── src/
│       │   ├── index.ts          # CLI entry point
│       │   ├── runner.ts         # Playwright test execution
│       │   ├── analyzer.ts       # Page DOM + screenshot capture
│       │   ├── explorer.ts       # Autonomous page exploration
│       │   └── convex-client.ts  # Convex client for job polling
│       └── package.json
├── components/                   # Shared React components
│   ├── ui/                       # Base UI primitives
│   ├── projects/                 # Project-related components
│   ├── tests/                    # Test case components
│   ├── runs/                     # Run/report components
│   └── explore/                  # Explore phase components
├── lib/                          # Shared utilities
│   ├── convex-client.ts          # Convex client init
│   └── utils.ts                  # General utilities
└── package.json
```

## Database Schema (Convex)

### projects
| Field | Type | Description |
|---|---|---|
| name | string | Project name |
| description | string | Optional description |
| baseUrl | string | Root URL of the app under test |
| ownerId | id("users") | Project owner |
| teamId | id("teams") | Better Auth team |

### prd_documents
| Field | Type | Description |
|---|---|---|
| projectId | id("projects") | Parent project |
| fileName | string | Original filename |
| fileType | string | "markdown" / "pdf" / "text" |
| content | string | Extracted text content |

### feature_maps
| Field | Type | Description |
|---|---|---|
| prdId | id("prd_documents") | Parent PRD |
| projectId | id("projects") | Parent project |
| features | json | Structured feature + use case list |
| explorationStatus | json | Per-feature status (pending/explored/blocked/failed) |

### test_suites
| Field | Type | Description |
|---|---|---|
| projectId | id("projects") | Parent project |
| name | string | Suite name (e.g. "Smoke Tests") |
| description | string | Optional |
| schedule | string | Cron expression (optional) |
| isActive | boolean | Whether to run on schedule |

### test_cases
| Field | Type | Description |
|---|---|---|
| suiteId | id("test_suites") | Parent suite |
| title | string | Test case title |
| description | string | Natural language description |
| category | string | "functional" / "security" / "error handling" / etc. |
| steps | array | Array of natural language step objects |
| expectedOutcomes | array | Array of expected outcomes |
| actionSequence | json | Generated JSON action sequence (nullable) |
| targetUrl | string | URL this test targets |
| order | number | Display order within suite |
| status | string | "drafting" / "reviewing" / "approved" |

### test_runs
| Field | Type | Description |
|---|---|---|
| projectId | id("projects") | Parent project |
| suiteId | id("test_suites") | Suite being run |
| trigger | string | "manual" / "scheduled" / "webhook" |
| status | string | "pending" / "running" / "passed" / "failed" / "cancelled" |
| workerId | string | ID of worker that executed the run |
| startedAt | number | Timestamp |
| completedAt | number | Timestamp |

### test_run_results
| Field | Type | Description |
|---|---|---|
| runId | id("test_runs") | Parent run |
| testCaseId | id("test_cases") | Test case executed |
| status | string | "passed" / "failed" / "blocked" / "skipped" |
| errorMessage | string | Error message if failed |
| duration | number | Execution time in ms |
| stepsSnapshot | json | Snapshot of steps + actionSequence at execution time |

### test_run_step_results
| Field | Type | Description |
|---|---|---|
| resultId | id("test_run_results") | Parent result |
| stepIndex | number | Step number |
| description | string | Step description |
| status | string | "passed" / "failed" / "skipped" |
| screenshotId | id("_storage") | Screenshot file (nullable) |
| consoleLogs | string | Console output at this step |
| errorMessage | string | Error if step failed |

### credentials
| Field | Type | Description |
|---|---|---|
| projectId | id("projects") | Parent project |
| name | string | Credential name (e.g. "Staging Login") |
| type | string | "basic_auth" / "bearer_token" / "api_key" |
| value | string | Encrypted credential value |
| targetUrl | string | URL this credential applies to |

### test_account_credentials
| Field | Type | Description |
|---|---|---|
| projectId | id("projects") | Parent project |
| name | string | Credential name (e.g. "Staging Login") |
| username | string | Username or email |
| password | string | Encrypted password |
| targetUrl | string | URL this credential applies to |

### workers
| Field | Type | Description |
|---|---|---|
| name | string | Worker display name |
| type | string | "cloud" / "local" |
| status | string | "online" / "offline" / "busy" |
| lastHeartbeat | number | Timestamp |
| teamId | id("teams") | Better Auth team |

## Convex Components

### Workpool
- Manages test execution queue
- Limits parallelism (configurable per project/team)
- Retry failed test runs with backoff
- Reactive status for dashboard realtime updates
- onComplete callback for post-run notification

### Better Auth
- Email/password + OAuth (GitHub, Google)
- Organization/team support (multi-tenant ready)
- Session management
- API key authentication for CI webhook

## AI Pipeline

### LLM Abstraction (BYOK)

```typescript
interface LLMProvider {
  generate(prompt: string, options?: LLMOptions): Promise<string>;
  generateWithImages(prompt: string, images: string[], options?: LLMOptions): Promise<string>;
}

// Providers:
// - OpenAI-compatible (Z.AI GLM, OpenAI GPT-4o, etc.)
// - Anthropic Claude (future)
```

### PRD → Feature Map
1. User uploads PRD (markdown/PDF/text)
2. Convex action extracts text content
3. LLM call: "Extract all features and their use cases from this document"
4. Result: structured feature map JSON
5. Displayed as flow graph in dashboard

### Explore Phase
1. Worker receives exploration job
2. Launches Playwright, navigates to root URL
3. Extracts all links + buttons + interactive elements
4. For each matching a PRD feature: navigates, captures DOM + screenshot
5. Reports back what's reachable and what's blocked
6. Convex stores exploration results per feature

### Plan Generation
1. Inputs: feature map + exploration results + user description + test credentials
2. LLM call with full context (feature map, DOM summaries, screenshots)
3. Output: structured array of test cases with natural-language steps
4. User reviews in dashboard, edits descriptions, selects/deselects

### Code Generation
1. For each approved test case: LLM generates a JSON action sequence (not TypeScript code)
2. Action sequence uses a 28-action DSL: navigate, click, fill, select, check/uncheck, hover, press, upload, waitFor, assert*, etc.
3. Selector priority: data-testid → text → role
4. Worker executes the action sequence step by step, capturing screenshots between each step

### Failure Analysis
1. After test run: LLM receives test steps + screenshots + error logs
2. LLM classifies failure: "real bug" vs "selector changed" vs "timeout" vs "environment"
3. Returns explanation + suggested fix in natural language

## Implementation Phases

### Phase 1: Foundation
- [ ] Scaffold Next.js project with TypeScript
- [ ] Set up Convex + schema
- [ ] Install and configure Better Auth (email/password + OAuth)
- [ ] Install Workpool component
- [ ] Build basic dashboard layout (sidebar, project list, project detail)
- [ ] Project CRUD (create, list, edit, delete)
- [ ] Team/org setup via Better Auth

### Phase 2: AI Engine
- [ ] PRD upload (markdown + PDF + text)
- [ ] PRD text extraction and storage
- [ ] LLM abstraction layer (BYOK — OpenAI-compatible, Convex actions only)
- [ ] LLM API key onboarding flow (after signup)
- [ ] Feature map extraction from PRD
- [ ] Test agent package scaffolding (CLI + Convex client)
- [ ] Cloud worker registration/healthcheck
- [ ] Explore phase — guided mode (PRD feature matching)
- [ ] Explore phase — discovery mode (URL-only crawl + feature inference)
- [ ] Test plan generation from PRD + exploration
- [ ] Plan review UI (display, edit, select/deselect)
- [ ] Action sequence generation from approved plan (JSON DSL, 28 actions)

### Phase 3: Test Execution
- [ ] Workpool integration — enqueue test runs
- [ ] Cloud worker — job polling and execution
- [ ] Local agent mode — same codebase, different config
- [ ] Playwright runner — execute generated code
- [ ] Screenshot capture at each step
- [ ] Test run status tracking and storage
- [ ] Dashboard run detail page (step-by-step results)
- [ ] Failure analysis LLM call
- [ ] Report visualization (pass/fail, screenshots, logs)

### Phase 4: Polish & Scale
- [ ] Test suites (group test cases)
- [ ] Edit/iterate flow — edit description → regenerate
- [ ] Convex crons for scheduled test runs
- [ ] CI webhook endpoint with API key auth
- [ ] Credentials management UI (encrypted storage)
- [ ] Multi-project dashboard
- [ ] Run history and trend visualization
- [ ] Compare runs over time
- [ ] Project settings page

### Phase 5: Advanced (V2)
- [ ] Auto-heal selectors on failure
- [ ] Video recording of test runs
- [ ] PRD image/OCR support
- [ ] API endpoint testing
- [ ] GitHub App integration (PR-based test triggers)
- [ ] Slack/email notifications
- [ ] MCP server for IDE integration

## Technical Notes

### Why No Docker for Playwright
Playwright + Chromium installed directly on the Coolify server (and on local dev machines). No Docker-in-Docker complexity. Browser contexts provide sufficient isolation for internal use. Add containerization later if concurrent runs become an issue.

### Why Workpool Instead of Custom Queue
Workpool provides parallelism limits, retry with backoff, reactive status queries, and onComplete callbacks — all within Convex. Building equivalent from scratch would take weeks.

### Concurrency Model (V1)
V1 limits to 1 test run at a time per team. The Workpool component enforces this. If a run is in progress, subsequent runs are queued (user sees a "Run queued" toast). Multiple workers per team supported but only one executes at a time. Parallel execution across workers is V2.

### Why Skip Video V1
Videos are 10-100MB per run and add significant storage + streaming complexity. Step screenshots cover 90% of debugging needs. Add video when users ask for it.

### BYOK Architecture
LLM calls run exclusively in Convex actions. The test agent never touches an API key directly — it calls back to Convex for any LLM guidance needed during exploration. Each user is prompted to configure their AI provider (Z.AI / OpenAI) and API key on first signup before accessing AI features. The key is encrypted at rest. This also makes the product SaaS-ready later — users bring their own keys, or you offer bundled keys as a paid tier.

### Multi-Tenant Ready
Better Auth organizations + Convex tenant isolation patterns. Everything is scoped by team ID from day one. Adding paid plans later means flipping on billing + limiting features per tier.
