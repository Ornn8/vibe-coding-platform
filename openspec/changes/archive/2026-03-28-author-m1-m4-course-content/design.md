## Context

The platform already supports localized MDX lessons, embedded `<Exercise>` components, and lesson navigation, but only the first portion of M1 has seed content. `content-authoring-plan.md` defines a Chinese-first authoring plan for M1 through M4, including lesson-by-lesson knowledge goals, required exercises, and writing principles. The main constraint is that this change is content-heavy rather than infrastructure-heavy, so the design must optimize for consistency, reviewability, and compatibility with the existing MDX pipeline.

## Goals / Non-Goals

**Goals:**
- Produce complete Chinese MDX lessons for modules M1 through M4 according to the approved plan.
- Keep lesson structure consistent across frontmatter, body sections, `<Exercise>` blocks, and source attribution.
- Preserve compatibility with current metadata, MDX rendering, navigation, and progress-tracking conventions.
- Make authored content easy to review module-by-module and lesson-by-lesson.

**Non-Goals:**
- Writing English translations for the new lessons.
- Changing Prisma schema, auth flows, or learner-product behavior.
- Reworking the course structure beyond what is required to align authored lessons with existing slugs and metadata.
- Introducing a new CMS or content authoring toolchain.

## Decisions

### Author lessons directly in repository MDX files
The change will write lesson content directly into `src/content/zh/m1` through `src/content/zh/m4` rather than introducing generated intermediate assets.

Why:
- The platform already renders MDX files directly.
- Git-based review is the simplest way to inspect educational copy changes.
- The authoring plan already names file targets per lesson.

Alternative considered:
- Generating content from a separate authoring database or spreadsheet. Rejected because it adds workflow complexity without improving the immediate MVP delivery.

### Preserve existing lesson slugs and metadata contracts
New content will align to the existing module and lesson structure defined by the platform so learner routes, progress tracking, and previous/next navigation remain stable.

Why:
- The learner experience and seeded course structure are already wired to these slugs.
- Changing slugs during content rollout would create avoidable route and QA churn.

Alternative considered:
- Renaming lessons while authoring. Rejected because it expands the scope from content creation into platform migration.

### Enforce a uniform MDX authoring template
Every authored lesson will include frontmatter, narrative sections, embedded exercises placed near the relevant teaching points, and a short reference section.

Why:
- The plan explicitly requires a repeatable authoring format.
- Uniform structure improves learner expectations and editorial QA.
- Shared MDX components already support this pattern.

Alternative considered:
- Allowing each lesson to choose its own structure. Rejected because it makes module-level quality uneven and harder to review.

### Treat content QA as part of implementation, not a follow-up
Authoring work will include module-by-module verification for frontmatter completeness, valid exercise markup, source references, and build compatibility.

Why:
- MDX authoring errors are easy to introduce and can break rendering.
- Content quality issues become much harder to fix after dozens of files land.

Alternative considered:
- Deferring QA until after all modules are authored. Rejected because failure isolation would be slower and riskier.

## Risks / Trade-offs

- [High copy volume can cause inconsistency across lessons] → Author module by module using a shared structure and review checklist.
- [Source references may drift from plan intent] → Keep reference sections short and explicitly tied to the cited repos, reports, or public materials named in the authoring plan.
- [Existing metadata and authored lessons may diverge] → Validate each lesson against its target slug, order, and module before marking the task complete.
- [Long-form MDX can introduce formatting or rendering regressions] → Run build-level verification after each content batch or at least after each module.

## Migration Plan

1. Author M1-M4 lesson files in place under `src/content/zh/`.
2. Reconcile authored lessons against existing metadata and route expectations.
3. Run lint/build-level verification to catch MDX and routing regressions.
4. Review lessons in the learner UI and adjust formatting issues if needed.

Rollback:
- Revert the authored MDX files for the affected module or lesson. No data migration rollback is required because this change is content-only.

## Open Questions

- Should any M1-M4 lesson also include paired visual assets under `/public/content/`, or is text-first delivery sufficient for this phase?
- Should the post-authoring follow-up change include English translation immediately after Chinese content lands, or treat translation as a separate wave?
