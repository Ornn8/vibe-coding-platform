## Why

`curriculum-v3.md` updates M1-M4 from lesson-style topic pages into methodology-driven Unit pages, but the repository still exposes older, flatter lesson content. We need to refresh the curriculum now so the learner experience matches the approved v3 arc without breaking the current learning routes.

## What Changes

- Rewrite Chinese M1-M4 lesson content so each exposed lesson behaves like a v3 Unit page with multiple Steps, methodology framing, richer exercises, and explicit references.
- Update M1-M4 course metadata so module titles, descriptions, lesson sequencing, and project outcomes match `curriculum-v3.md`.
- Add MDX presentation support for methodology callouts, section separators, and richer exercise blocks used by the new Unit-style content.
- Keep the existing `lessons`-based route model for compatibility in this change, while adding the new M2 closing project lesson and consolidating exposed M4 lessons from six routes to five.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `m1-foundation-course-content`: Upgrade M1 from topic lessons to four v3-style Units covering cognition, tools, first build, and module project planning.
- `m2-product-thinking-course-content`: Expand M2 into five v3-style Units covering failure analysis, soul questions, MVP prioritization, journey mapping, and a requirement-doc-driven module project.
- `m3-prompt-engineering-course-content`: Re-sequence M3 into five v3-style Units centered on context, prompt elements, system prompts, and reusable prompt assets.
- `m4-planning-workflow-course-content`: Reframe M4 into five v3-style Units that connect planning artifacts, PEV/Ask-Plan workflow, Claude Code onboarding, and a full workflow project.

## Impact

- Affected content: `src/content/zh/m1/**`, `src/content/zh/m2/**`, `src/content/zh/m3/**`, `src/content/zh/m4/**`
- Affected metadata and content model: `src/content/course-structure.ts`, `src/content/types.ts`, localized metadata projections
- Affected MDX rendering: `src/components/shared/mdx-components.tsx`, `src/components/learn/exercise-block.tsx`, `src/lib/mdx.ts`
- Verification surface: lesson navigation, MDX rendering, fallback behavior for untranslated English routes, and consistency with `curriculum-v3.md`
