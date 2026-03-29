## Context

The current learning stack still uses `module.lessons` and lesson-level routes. After the Chinese curriculum-v3 rollout, M1-M4 English routes are structurally behind: some files use older slugs and older content, and new routes may fall back to Chinese content via `loadLessonMdx`. This change should close that gap without expanding into a broader data-model migration.

## Goals / Non-Goals

**Goals:**
- Bring English M1-M4 learner content to the same Unit-style curriculum-v3 structure as Chinese.
- Keep the existing lessons-based route model and course structure interface intact.
- Ensure English M1-M4 lesson routes resolve to English MDX content directly rather than depending on Chinese fallback.

**Non-Goals:**
- Change the database schema or rename the app-wide `lessons` model to `units`.
- Rework learner navigation, progress tracking, or admin editing workflows beyond what is needed for English parity.
- Update M5-M8 English content in this change.

## Decisions

### Reuse the current M1-M4 slug set
English content will follow the same current M1-M4 slugs as Chinese and `courseStructure.ts`. This keeps routing stable and avoids another compatibility layer.

### Match Chinese structure one-to-one
Each English lesson will mirror the Chinese Unit page shape: methodology callout, Step headings, embedded exercises, summary, methodology recap, and references. This keeps cross-locale parity auditable.

### Treat fallback-to-zh as a temporary safety net only
The existing fallback in `loadLessonMdx` remains useful for resilience, but M1-M4 English should stop depending on it after this change.

## Risks / Trade-offs

- [English and Chinese drift during future edits] -> Keep both locales aligned to the same `courseStructure.ts` slugs and order.
- [Incomplete translation delays route parity] -> Use the current fallback only as a temporary backup while targeting full English file coverage in this change.
- [Metadata parity without content parity causes confusing UX] -> Update English MDX and metadata together, not in separate phases.
