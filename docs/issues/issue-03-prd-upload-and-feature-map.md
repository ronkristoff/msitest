## Parent

PRD.md — Phase 2 (AI Engine)

## What to build

PRD document upload and processing pipeline. Users upload markdown or PDF files to a project. The PRD processor extracts text (via pdf-parse for PDFs). The LLM abstraction module (`generateText`) in `convex/llm.ts` handles provider selection, API key decryption, retry logic, and error normalization. An onboarding flow prompts users to configure their LLM API key (BYOK) immediately after signup — no AI features are accessible until a key is saved. The feature map extraction call takes PRD text and returns structured features, displayed as a visual flow graph on the project page.

## Acceptance criteria

- [ ] User can upload a markdown PRD — text extracted correctly (already working)
- [ ] User can upload a PDF PRD — text extracted via pdf-parse (unblock PDF in UI)
- [ ] Onboarding flow: after signup, user is prompted to configure AI provider + API key before accessing dashboard
- [ ] LLM abstraction module (`convex/llm.ts`) calls the configured provider with retry logic (already working)
- [ ] Feature map extraction returns structured JSON with features and use cases (already working)
- [ ] Feature map displays as a visual flow graph in the project UI (already working)
- [ ] Tests: PDF parsing, markdown parsing, feature map JSON schema validation

## Blocked by

- #2 — Project Management
