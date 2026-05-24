## Parent

PRD.md — Phase 2 (AI Engine)

## What to build

The action sequence generator translates each approved test case's natural-language steps into a **JSON action sequence** (not TypeScript code). The sequence uses a 28-action DSL: navigate, click, fill, select, check, uncheck, hover, press, upload, drag, dblclick, type, goBack, goForward, reload, scroll, iframe, dialog, setCookie, clearCookies, waitFor, waitForUrl, waitForTimeout, assertVisible, assertHidden, assertText, assertUrl, assertTitle, assertValue, assertCount, assertAttribute.

Selector priority: data-testid → text → role. The worker executes the action sequence step by step, capturing screenshots between each step. The generated JSON is stored in `test_cases.actionSequence`. The UI shows the generated action sequence in a readable preview panel.

## Acceptance criteria

- [ ] Action sequence generator produces valid JSON for each test case (28-action DSL)
- [ ] Generated actions follow selector priority: data-testid → text → role
- [ ] Each natural-language step maps to 1-3 action objects
- [ ] UI shows generated action sequence in a readable preview panel
- [ ] User can re-generate the action sequence for individual test cases
- [ ] Tests: generated JSON validates against action schema, round-trip parseable

## Blocked by

- #5 — Test Plan Generation
