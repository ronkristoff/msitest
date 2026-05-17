## Parent

PRD.md — Phase 4 (Polish)

## What to build

Encrypted credential storage per project. Credentials have name, type, encrypted value, and optional targetUrl filter. CRUD UI for managing credentials. Worker decrypts credentials at runtime when the target URL matches. When credentials aren't available for a flow, the AI generates synthetic test data (usernames, emails, passwords).

## Acceptance criteria

- [ ] Credentials stored encrypted in Convex (encrypt in mutation, decrypt in action)
- [ ] Credentials CRUD UI (create, list, update, delete) per project
- [ ] Worker retrieves decrypted credentials matching the target URL
- [ ] Synthetic test data generation when credentials not provided
- [ ] Tests: encryption round-trip, tenant isolation (cross-team cannot read)

## Blocked by

- #7 — Worker/Agent & Playwright Runner
