## Parent

PRD.md — Phase 1 (Foundation)

## What to build

Scaffold the entire project foundation: initialize Next.js with App Router + Tailwind CSS + TypeScript, set up Convex with the complete schema, install and configure Better Auth (email/password + GitHub/Google OAuth + organizations), and build the dashboard layout shell with sidebar navigation and route placeholders. This includes creating the project's tooling configuration (TypeScript, linting, formatting).

## Acceptance criteria

- [ ] `npm run dev` starts the Next.js dev server without errors
- [ ] Convex dev server runs and schema deploys with all tables (teams, projects, prd_documents, feature_maps, test_suites, test_cases, test_runs, test_run_results, test_run_step_results, failure_analyses, credentials, workers)
- [ ] Better Auth sign-up/sign-in works (email/password + GitHub + Google)
- [ ] Organization (team) creation on first user registration
- [ ] Dashboard layout renders with sidebar navigation and placeholder pages
- [ ] Convex function tests pass for schema validation and auth flow

## Blocked by

None - can start immediately
