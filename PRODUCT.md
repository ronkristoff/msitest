# Product

## Register

product

## Users

QA engineers debugging test failures. They're reading fast, often under pressure — a failed deployment, a flaky test in CI, a regression caught at the last minute. Their browser is open next to terminals, CI dashboards, and Slack threads. They need to understand what broke, why, and what to do about it — in seconds, not minutes.

Secondary users: developers reviewing CI check results and team leads monitoring test trends over time.

## Product Purpose

An AI-powered end-to-end testing platform. QA teams provide a URL and describe what to test. The AI explores the live app, generates a structured test plan, compiles it to Playwright code, executes it, and presents results with per-step screenshots and AI-authored failure analysis. The goal: eliminate the manual loop of writing test scripts, updating selectors, and interpreting raw failure dumps.

## Brand Personality

**Precise, calm, technical.**

- Exact numbers, not vague summaries. Screenshots over prose.
- Never alarmist. Failures are data, not drama.
- The UI feels like a well-calibrated instrument — reliable, quiet, focused.

## Anti-references

- Purple gradients, glassmorphism, nested cards, Inter font everywhere
- Hero banners, scroll-driven reveals, marketing-speak copy
- Emoji-heavy microcopy, playful illustrations
- Overly rounded corners, decorative blurs, gratuitous shadows

## Design Principles

1. **Status at a glance.** The primary job is understanding pass/fail immediately. Green/red signals must be scannable without reading text.
2. **Show, don't tell.** Per-step screenshots are the primary evidence. Text descriptions support, not replace, visual proof.
3. **Technical confidence.** Exact data builds trust. No rounding without reason. No hiding failures behind summaries.
4. **Fast read.** Optimize for scanning: strong hierarchy, consistent layout, minimal prose.
5. **Calm under pressure.** When tests fail, the UI helps. No red-alert banners, no frantic animations. Clear, actionable, composed.

## Accessibility & Inclusion

- WCAG 2.1 AA minimum
- Full keyboard navigation
- Screen reader support for all result views
- Reduced motion support for all animations
- Color is never the sole indicator of status (icons + labels always accompany pass/fail signals)
