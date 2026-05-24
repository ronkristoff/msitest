## Parent

PRD.md — Phase 2 (AI Engine)

## What to build

The plan generator consumes the feature map, exploration results, and user description to produce a structured test plan. When the AI generates test cases, it **auto-creates a suite** for them (e.g., "Generated Plan — Jan 15"). Test cases always belong to a suite from birth. Cases are organized by category (functional, security, error handling) with natural-language steps and expected outcomes.

The UI displays the generated plan grouped by category. User can **edit a test case description** — this triggers regeneration of that case's natural-language steps (action sequence is regenerated separately in issue #6). User can select/deselect individual cases and approve the plan.

## Acceptance criteria

- [ ] Plan generator produces structured test cases from feature map + exploration + user description
- [ ] AI auto-creates a test suite to hold the generated test cases (name includes generation timestamp)
- [ ] Test cases organized by category (functional, security, error handling)
- [ ] Each test case has: title, description, steps array (natural language), expected outcomes
- [ ] UI shows generated plan grouped by category
- [ ] User can edit a test case description — AI regenerates the natural-language steps for that case
- [ ] User can select/deselect individual test cases
- [ ] User can approve the plan (sets status to "approved", saved to database)
- [ ] Tests: plan JSON schema validation, auto-suite creation

## Blocked by

- #4 — App Exploration Engine
