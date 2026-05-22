<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->

## Graphify — Code Intelligence

This project has a Graphify knowledge graph at `graphify-out/`.

> If the graph seems stale, run `graphify update .` (AST-only, no API cost).

### Always Do

- **Before answering architecture or codebase questions**, read `graphify-out/GRAPH_REPORT.md` for god nodes and community structure.
- **For cross-module questions** ("how does X relate to Y?"), prefer `graphify query`, `graphify path`, or `graphify explain` over grep.
- **Before editing a function or module**, use `graphify path "<symbol>" "<downstream>"` to understand blast radius and dependencies.
- **After modifying code files**, run `graphify update .` to keep the graph current.

### Never Do

- NEVER use plain find-and-replace for renaming — use `graphify query` to find all references first.
- NEVER skip `graphify update .` after committing — the graph must stay current.
- NEVER ignore dependency paths that show tight coupling when planning refactors.

### Commands

| Task | Command |
|------|---------|
| Full graph rebuild | `graphify analyze .` |
| Incremental AST update | `graphify update .` |
| Ask a question | `graphify query "<question>"` |
| Trace dependency path | `graphify path "<A>" "<B>"` |
| Explain a concept | `graphify explain "<concept>"` |
