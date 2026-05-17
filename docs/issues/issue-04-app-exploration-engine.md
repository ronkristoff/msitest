## Parent

PRD.md — Phase 2 (AI Engine)

## What to build

The explore engine that autonomously navigates the target app. It launches a browser, visits the root URL, extracts links and buttons, uses the LLM to match them against PRD features, captures DOM and screenshots at each page, and reports status per feature (found/blocked/failed). A basic Worker/Agent CLI is built in exploration-only mode. The UI shows exploration progress: which features were found, which pages were visited, and which were blocked.

## Acceptance criteria

- [ ] Explore engine navigates from root URL and extracts page links/buttons
- [ ] LLM matches extracted links against known features from the feature map
- [ ] Screenshots and DOM captured at each visited page
- [ ] Status reported per feature: explored_successfully / blocked / failed
- [ ] Worker CLI starts in exploration mode, polls for exploration jobs
- [ ] UI shows exploration results with per-feature status and screenshots
- [ ] Tests: link extraction from known HTML, feature matching with mock LLM

## Blocked by

- #3 — PRD Upload & Feature Map
