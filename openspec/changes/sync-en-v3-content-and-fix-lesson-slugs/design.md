## Context

The app currently prefers database-backed module and lesson records through `getLearningModules()`. That means lesson slugs rendered in the learner UI come from persisted data when the database query succeeds. After the M1-M4 Chinese content migration, the filesystem now uses new v3 slugs, while persisted lesson rows can still point at older slugs. The result is a route that passes `getLessonBySlug()` but fails inside `loadLessonMdx()` because the requested MDX file does not exist under the old name. At the same time, the English content tree still needs the same v3 curriculum treatment already applied in Chinese.

## Goals / Non-Goals

**Goals:**
- Bring English M1-M4 content and metadata to parity with the current v3 Chinese curriculum.
- Eliminate learner-facing 404s caused by legacy lesson slugs in persisted data.
- Make the lesson resolution path explicit so future content migrations cannot silently desynchronize routes and MDX files.

**Non-Goals:**
- Redesign the broader `lessons` data model into `units` in this change.
- Rework admin authoring UX or the full database schema.
- Introduce a generalized slug alias system for every historical content rename beyond the current M1-M4 migration.

## Decisions

### Runtime must stop trusting persisted lesson slugs as the single source of truth
The current loader trusts database lesson slugs end-to-end. That is brittle for file-backed curricula. We should either map persisted progress/submission data onto the static v3 course structure or migrate database lesson rows to the new slugs before runtime lookup. This change should make one of those strategies explicit rather than relying on accidental alignment.

### English content should follow the same filenames and order as Chinese
The cleanest bilingual state is for `en` and `zh` to share the same lesson slug set for M1-M4. This keeps route behavior deterministic and avoids locale-specific slug drift.

### Lesson migration and content migration belong in one change
If we only update English content without fixing slug resolution, the app remains operationally fragile. If we only fix routing, bilingual curriculum stays out of sync. Shipping them together reduces repeated migration risk.

## Risks / Trade-offs

- [Persisted user progress references old lesson rows] -> Preserve lesson identity carefully during slug migration or explicitly map progress/submissions from old slugs to new slugs.
- [Fallback logic can hide future mismatches] -> Add explicit verification for lesson slug existence rather than relying on runtime 404s to expose bad state.
- [English parity increases content surface] -> Reuse the approved v3 structure and Chinese sequence as the canonical outline to keep scope bounded.

## Migration Plan

1. Audit current lesson rows or seed definitions for legacy M1-M4 slugs.
2. Decide the runtime source of truth during the transition: migrated DB rows or static-structure overlay.
3. Update English M1-M4 metadata and MDX files to the v3 slug set.
4. Add verification that every exposed M1-M4 lesson slug resolves to an MDX file in zh and en/fallback paths.
5. Validate learner routes against both authenticated DB-backed and static-fallback flows.

## Open Questions

- Should the fix be data-first (migrate DB rows) or runtime-first (overlay DB progress onto static course structure)?
- Is there existing production data that requires a one-time lesson slug migration script, or is reseeding acceptable in this environment?
