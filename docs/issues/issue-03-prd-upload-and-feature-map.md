## Parent

PRD.md — Phase 2 (AI Engine)

## What to build

PRD document upload and processing pipeline. Users upload markdown or PDF files to a project. The PRD processor extracts text (via pdf-parse for PDFs). The LLM abstraction module (`generateText`, `generateWithImages`) is built with provider selection, API key decryption, retry logic, and error normalization. A team settings page lets users configure their own LLM API key (BYOK). The feature map extraction call takes PRD text and returns structured features, displayed as a visual flow graph on the project page.

## Acceptance criteria

- [ ] User can upload a markdown PRD — text extracted correctly
- [ ] User can upload a PDF PRD — text extracted via pdf-parse
- [ ] LLM abstraction module calls the configured provider with retry logic
- [ ] Team settings page allows configuring an LLM API key (encrypted storage)
- [ ] Feature map extraction returns structured JSON with features and use cases
- [ ] Feature map displays as a visual flow graph in the project UI
- [ ] Tests: PDF parsing, markdown parsing, feature map schema validation

## Blocked by

- #2 — Project Management
