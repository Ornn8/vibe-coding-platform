## Context

M1-M4 has already been upgraded to Unit-style lesson content, but M5-M8 still reflects the earlier flatter course structure in `courseStructure` and seeded data. The platform runtime still depends on `module.lessons`, seeded Prisma records, and lesson-level routes, so the M5-M8 upgrade needs to deliver the new curriculum design without introducing a second schema or route migration at the same time.

`curriculum-m5-m8.md` also proposes a practical rollout split: M5-M6 as core-course authoring first, then M7-M8 as advanced electives. That makes sense technically because M5-M6 extends the core learner path, while M7-M8 depends on the same rendering and seeding patterns but adds advanced-tier presentation and more complex project outcomes.

## Goals / Non-Goals

**Goals:**
- Align exposed M5-M8 learning content with the Unit-Step structure, methodology emphasis, and project expectations defined in `curriculum-m5-m8.md`.
- Preserve the curriculum document's target structure of 18 Units total across M5-M8: M5 (5), M6 (5), M7 (4), and M8 (4).
- Preserve the current `lessons`-based route model, seeded Prisma lesson records, and module project scaffolding.
- Ensure seeded course data and static metadata remain in sync so M5-M8 renders consistently in both database-backed and static fallback paths.
- Build review into the authoring workflow so generated content is checked for structure, references, learner progression, and route safety as it is created.

**Non-Goals:**
- Introduce a `Unit` / `UnitProgress` database schema in this change.
- Redesign learner navigation or admin editing UX for a dedicated Unit data model.
- Fully author English M5-M8 parity in the same change unless it becomes necessary for route correctness.

## Decisions

### Keep `lessons` as the platform boundary
M5-M8 will be authored as Unit-style lesson pages, but each Unit will still map to one lesson route and one seeded lesson record. This matches the successful M1-M4 rollout and avoids broad database and route churn.

This makes lesson slugs, MDX file names, and `courseStructure` entries part of the same runtime contract. All 18 new Units must keep those three surfaces synchronized so the current route model does not regress into content 404s.

Alternative considered: convert M5-M8 to a new Unit schema immediately. Rejected because it multiplies migration risk and is not required to ship the curriculum.

### Treat seed data as part of the content contract
`prisma/seed.ts` already derives module, lesson, exercise, and checklist records directly from `courseStructure`. We will keep that model and update the M5-M8 metadata first, then author MDX files to match those records. This keeps database-backed pages and static fallback in sync.

Alternative considered: author MDX only and defer seed updates. Rejected because the lesson counts and seeded exercises would immediately drift.

### Roll out in two authoring waves inside one change
Tasks will be organized as M5-M6 core content first, then M7-M8 advanced elective content. This follows the curriculum document's suggested implementation order while keeping the work inside one coherent OpenSpec change.

Wave breakdown:
- Core continuation: M5 (5 Units / 17 Steps) and M6 (5 Units / 16 Steps)
- Advanced elective continuation: M7 (4 Units / 11 Steps) and M8 (4 Units / 12 Steps)

Alternative considered: split M5-M6 and M7-M8 into separate OpenSpec changes immediately. Rejected for proposal scope because the architecture and authoring approach are shared.

### Pair generation with review checkpoints
Each module group will include explicit review tasks for structure, exercise progression, methodology consistency, seed/render alignment, and slug/file-name alignment. This reduces the risk of generating many MDX files quickly and discovering structural drift later.

## Risks / Trade-offs

- [Seeded data drifts from authored MDX files] Update `courseStructure` before final MDX passes and verify lesson counts and order against the curriculum document.
- [Lesson slugs drift between metadata, seed data, and MDX files] Treat lesson slug selection as part of the content contract and verify file names and routes while reviewing each module.
- [Long Unit pages become hard to scan] Reuse the M1-M4 Unit pattern: methodology callout, short paragraphs, `## Step` sections, and explicit exercises.
- [M7-M8 advanced positioning is lost in the UI] Preserve `tier: ADVANCED` and verify that seeded and rendered module summaries still expose the distinction.
- [Chinese-first authoring leaves English fallback uneven] Keep English metadata valid and defer full English content parity to a follow-up if needed.

## Migration Plan

1. Capture the M5-M8 rollout in OpenSpec proposal, design, specs, and tasks.
2. Update `courseStructure` so M5-M8 lesson counts, slugs, titles, descriptions, tiering, and project checklists match the new curriculum.
3. Verify `prisma/seed.ts` still seeds the correct number of lessons and project artifacts from the updated metadata.
4. Author and review M5-M6 Unit-Step MDX content as the core-course wave.
5. Author and review M7-M8 Unit-Step MDX content as the advanced-elective wave.
6. Run lint, typecheck, and seeded/render smoke verification on the touched surface.

Rollback strategy: restore previous M5-M8 metadata and MDX files from git, then reseed local content data if needed.

## Open Questions

- Should full English M5-M8 content parity be bundled into the implementation phase, or should Chinese-first authoring land first as with M1-M4?
- Do we want dedicated advanced-module visual affordances beyond the existing `tier` badge before M7-M8 content ships?
