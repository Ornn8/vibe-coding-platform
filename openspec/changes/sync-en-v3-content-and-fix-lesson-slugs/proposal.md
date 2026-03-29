## Why

The Chinese M1-M4 curriculum has already moved to v3-style lesson files, but the English version still trails behind and the runtime can still resolve lesson routes from stale database slugs. We need to close both gaps together so bilingual content stays aligned and lesson pages stop 404ing when metadata, database records, and MDX filenames diverge.

## What Changes

- Update English M1-M4 lesson content to match the Chinese v3 curriculum structure, sequencing, and pedagogy.
- Align English course metadata for M1-M4 with the current v3 lesson slugs and Unit-style titles.
- Fix lesson-route resolution so the learner app does not 404 when the database still contains legacy lesson slugs after a content migration.
- Define a migration path for lesson slug updates in seeded or persisted data used by the learning experience.

## Capabilities

### New Capabilities
- `learning-lesson-slug-resolution`: Covers runtime behavior and migration requirements for resolving lesson routes when file-based content and persisted lesson slugs differ.

### Modified Capabilities
- `m1-foundation-course-content`: Extend the v3 M1 update to include English MDX content and bilingual metadata parity.
- `m2-product-thinking-course-content`: Extend the v3 M2 update to include English MDX content and bilingual metadata parity.
- `m3-prompt-engineering-course-content`: Extend the v3 M3 update to include English MDX content and bilingual metadata parity.
- `m4-planning-workflow-course-content`: Extend the v3 M4 update to include English MDX content, bilingual metadata parity, and the five-lesson v3 structure in runtime data.

## Impact

- Affected content: `src/content/en/m1/**`, `src/content/en/m2/**`, `src/content/en/m3/**`, `src/content/en/m4/**`
- Affected metadata and route inputs: `src/content/course-structure.ts`, learning data loaders, seed or migration scripts
- Affected runtime behavior: lesson lookup in `src/lib/learning.ts`, MDX file resolution in `src/lib/mdx.ts`, learner lesson routes
- Verification surface: English lesson rendering, Chinese lesson routing, and DB-backed vs static-fallback lesson lookup behavior
