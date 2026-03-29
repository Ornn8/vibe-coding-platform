## Why

The MVP platform scaffolding is complete, but most of the learner experience still lacks production-ready course content after M1. We need a structured content-authoring change now so the platform can deliver a coherent Chinese-first curriculum from foundational Vibe Coding concepts through planning-driven workflows.

## What Changes

- Author complete Chinese MDX lesson content for modules M1 through M4 based on the approved `content-authoring-plan.md`.
- Standardize lesson structure, embedded exercises, code-block formatting, and source attribution across all authored lessons.
- Fill module-level learning arcs so M1 introduces Vibe Coding cognition, M2 covers product thinking, M3 covers prompt engineering, and M4 covers planning-driven workflows and Claude Code onboarding.
- Add content QA and acceptance checks to ensure frontmatter, exercise IDs, references, and learner flow consistency match platform conventions.

## Capabilities

### New Capabilities
- `m1-foundation-course-content`: Covers authored Chinese MDX content for M1 awareness, concepts, tools, and first-run practice lessons.
- `m2-product-thinking-course-content`: Covers authored Chinese MDX content for M2 requirement definition, MVP scoping, user journeys, and anti-pattern lessons.
- `m3-prompt-engineering-course-content`: Covers authored Chinese MDX content for M3 context, prompt structure, system prompts, prompt templates, and anti-pattern lessons.
- `m4-planning-workflow-course-content`: Covers authored Chinese MDX content for M4 planning discipline, PRD writing, implementation planning, PEV loops, Ask/Plan mode, and Claude Code onboarding.

### Modified Capabilities
- None.

## Impact

- Affected code and content: `src/content/zh/m1/**`, `src/content/zh/m2/**`, `src/content/zh/m3/**`, `src/content/zh/m4/**`
- Supporting references: `content-authoring-plan.md`, metadata files, shared MDX rendering conventions
- Verification surface: MDX frontmatter validity, exercise formatting, source citation consistency, lesson navigation completeness
