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

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **msitest** (1268 symbols, 2210 relationships, 55 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/msitest/context` | Codebase overview, check index freshness |
| `gitnexus://repo/msitest/clusters` | All functional areas |
| `gitnexus://repo/msitest/processes` | All execution flows |
| `gitnexus://repo/msitest/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
