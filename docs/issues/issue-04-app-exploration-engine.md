## Parent

PRD.md — Phase 2 (AI Engine)

## What to build

The explore engine that autonomously navigates the target app in two modes:

**Guided mode (with PRD):** Launches a browser, visits the root URL, pre-processes the DOM into a structured summary (links, buttons, inputs, headings — capped at ~4K tokens). Loops the LLM per page (max 5 hops per feature) to match page elements against PRD features. Captures DOM and screenshots at each page. Reports status per feature (explored/blocked/failed). If test account credentials exist for the project, performs an auth setup step before exploration.

**Discovery mode (URL only, no PRD):** Crawls the app from root URL, follows links up to N hops deep, catalogs all pages and interactive elements. AI infers features from crawl results and generates a feature map. This is the fallback when no PRD is uploaded.

A basic Worker/Agent CLI (`packages/test-agent/`) is built in exploration-only mode. The UI shows exploration progress: which features were found, which pages were visited, and which were blocked. The test agent calls back to Convex for LLM guidance during exploration — it never touches an API key directly.

## Acceptance criteria

- [ ] Explore engine navigates from root URL and extracts page links/buttons
- [ ] DOM pre-processor produces structured summary (links, buttons, inputs, headings) capped at ~4K tokens
- [ ] **Guided mode:** LLM matches extracted links against known features from the feature map (max 5 hops per feature)
- [ ] **Guided mode:** Auth setup step before exploration when test account credentials exist
- [ ] **Discovery mode:** Worker crawls app from root URL, AI infers features from crawl results
- [ ] Screenshots and DOM captured at each visited page
- [ ] Status reported per feature: explored / blocked / failed
- [ ] Worker CLI starts in exploration mode, polls for exploration jobs
- [ ] UI shows exploration results with per-feature status and screenshots
- [ ] Tests: link extraction from known HTML, feature matching with mock LLM, crawl depth limiting

## Blocked by

- #3 — PRD Upload & Feature Map
