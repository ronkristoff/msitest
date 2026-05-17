## Parent

PRD.md — Phase 2 (AI Engine)

## What to build

The plan generator consumes the feature map, exploration results, and user description to produce a structured test plan. Test cases are organized by category (functional, security, error handling) with natural-language steps and expected outcomes. The UI displays the generated plan, allows editing test case descriptions (which triggers regeneration of that case's steps), selecting/deselecting individual cases, and approving the plan.

## Acceptance criteria

- [ ] Plan generator produces structured test cases from feature map + exploration
- [ ] Test cases organized by category (functional, security, error handling)
- [ ] Each test case has: title, description, steps array, expected outcomes
- [ ] UI shows generated plan grouped by category
- [ ] User can edit a test case description — AI regenerates steps for that case
- [ ] User can select/deselect individual test cases
- [ ] User can approve the plan (saves to database)
- [ ] Tests: plan JSON schema validation

## Blocked by

- #4 — App Exploration Engine
