## Parent

PRD.md — Phase 3 (Test Execution)

## What to build

The failure analyzer runs after a test run completes. It collects all failed step data, screenshots, and console logs, then calls the LLM to classify each failure (real_bug / flaky_selector / timeout / environment). The LLM also generates an explanation and suggested fix. The UI shows per-failure analysis cards with classification badge, natural-language explanation, and actionable fix suggestion.

## Acceptance criteria

- [ ] Failure analyzer triggers automatically after run completion
- [ ] Analyzer collects screenshots, console logs, and error messages for failed steps
- [ ] LLM returns classification: real_bug / flaky_selector / timeout / environment
- [ ] LLM returns explanation text and suggested fix
- [ ] Analysis stored in failure_analyses table per test_run_result
- [ ] UI shows analysis cards: classification badge + explanation + suggested fix
- [ ] Tests: classification logic with known failure scenarios

## Blocked by

- #8 — Test Execution & Real-time Results
