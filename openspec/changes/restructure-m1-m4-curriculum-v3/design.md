## Context

The current learner experience is built around `module.lessons` metadata and `modules/[moduleSlug]/[lessonSlug]` routes. `curriculum-v3.md` introduces a richer Unit-Step pedagogy, but the app does not yet have a separate `Unit` data model, new route shape, or MDX components such as `Separator` and methodology-specific callouts. The content refresh therefore needs to deliver the v3 teaching model while preserving the current route contract.

## Goals / Non-Goals

**Goals:**
- Align exposed M1-M4 learning content with the structure, sequencing, and methodology emphasis defined in `curriculum-v3.md`.
- Preserve the existing `lessons` route model so the learner UI keeps working without a broader schema or routing migration.
- Add the minimum MDX component enhancements required to render Unit-style pages cleanly.
- Keep English routes operational via existing fallback-to-zh behavior when new Chinese lesson slugs or files do not yet have translations.

**Non-Goals:**
- Introduce the database-level `Unit` / `UnitProgress` schema described in `curriculum-v3.md`.
- Redesign learner navigation, admin editing flows, or progress tracking granularity in this change.
- Fully translate the new M1-M4 curriculum into English.

## Decisions

### Keep `lessons` as the compatibility boundary
We will keep `courseStructure.lessons`, the existing lesson routes, and the lesson MDX loader unchanged at the interface level. Each exposed lesson will instead become a v3-style Unit page internally, with `## Step` sections, multiple exercises, and module-level pedagogy. This avoids a cross-cutting route and persistence migration while still shipping the new curriculum.

Alternative considered: introduce `units` now and update routing, learning data loaders, and progress models in the same change. Rejected because it expands scope beyond content refresh and raises migration risk.

### Extend MDX primitives instead of inventing new page logic
We will enhance the shared MDX components to support methodology callouts, visual separators, and richer exercise rendering with optional level/id metadata. This keeps curriculum behavior in content files rather than hard-coding module-specific page logic.

Alternative considered: approximate the v3 layout with plain markdown only. Rejected because it would weaken the methodology framing and make the content harder to scan.

### Prefer route stability over slug purity
Where possible, existing lesson slugs will stay in place even if the visible lesson titles evolve to match the v3 Unit names. We will add the new M2 project lesson and stop exposing the old sixth M4 lesson through metadata. This reduces broken-link risk and keeps the change focused on curriculum value.

Alternative considered: rename all M1-M4 slugs to the exact v3 filenames. Rejected for now because it introduces avoidable routing churn and leaves English content further behind.

## Risks / Trade-offs

- [Route semantics drift from visible titles] -> Keep slugs stable for compatibility, and document the decision in this change so a future route migration can clean it up deliberately.
- [Longer MDX pages may reduce readability] -> Add separators, shorter paragraphs, step headings, and richer exercise blocks to preserve scanability.
- [English routes may not have matching content] -> Rely on `loadLessonMdx` fallback-to-zh behavior and avoid changing the loader contract.
- [M4 consolidation may leave an unused file in the tree] -> Remove the lesson from metadata now and leave deeper cleanup for a dedicated follow-up if needed.

## Migration Plan

1. Update the OpenSpec artifacts to capture the compatibility-first v3 migration.
2. Enhance shared MDX components and types to support the new content structure.
3. Update M1-M4 metadata in `course-structure.ts`.
4. Rewrite Chinese M1-M4 MDX files, add the new M2 project lesson, and ensure M4 exposes only five lessons.
5. Run lint and type/build-oriented checks that cover the touched surface.

Rollback strategy: restore the previous course metadata and MDX files from git if the new Unit-style content causes rendering or navigation issues.

## Open Questions

- Should a follow-up change rename legacy slugs so the file system and visible Unit names fully match v3 terminology?
- Should the future `Unit` model migration preserve old lesson completion data, or explicitly reset progress for M1-M4 when the curriculum is promoted?
