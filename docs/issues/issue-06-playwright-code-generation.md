## Parent

PRD.md — Phase 2 (AI Engine)

## What to build

The code generator translates each approved test case's natural-language steps into Playwright TypeScript `.spec.ts` code. Follows selector priority (data-testid → text → role), adds error handling, and step comments. The UI provides a code preview panel showing generated code per test case. Generated code is stored alongside the test case in the database.

## Acceptance criteria

- [ ] Code generator produces valid Playwright TypeScript for each test case
- [ ] Generated code follows selector priority: data-testid → text → role
- [ ] Generated code includes error handling and step logging
- [ ] UI shows generated code in a syntax-highlighted preview panel
- [ ] User can re-generate code for individual test cases
- [ ] Tests: generated code compiles with TypeScript compiler, matches expected patterns

## Blocked by

- #5 — Test Plan Generation
