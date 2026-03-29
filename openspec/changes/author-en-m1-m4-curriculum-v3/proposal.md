## Why

Chinese M1-M4 content has already moved to the curriculum-v3 Unit style, but the English side still points at older lesson content and older slugs. We need an English-side change so `/en` delivers the same learning arc instead of falling back to stale or missing content.

## What Changes

- Rewrite English M1-M4 MDX content so it matches the curriculum-v3 Unit structure already shipped in Chinese.
- Align English lesson slugs, titles, descriptions, and module/project metadata with the current M1-M4 course structure.
- Preserve the existing lessons-based route contract while bringing `/en` to feature parity with `/zh`.
- Verify that English learner pages no longer rely on Chinese fallback for M1-M4 after the update.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `m1-foundation-course-content`: Extend the curriculum-v3 M1 restructuring to English lesson content and metadata.
- `m2-product-thinking-course-content`: Extend the curriculum-v3 M2 restructuring to English lesson content and metadata, including the fifth Unit-style lesson.
- `m3-prompt-engineering-course-content`: Extend the curriculum-v3 M3 restructuring to English lesson content and metadata.
- `m4-planning-workflow-course-content`: Extend the curriculum-v3 M4 restructuring to English lesson content and metadata.

## Impact

- Affected content: `src/content/en/m1/**`, `src/content/en/m2/**`, `src/content/en/m3/**`, `src/content/en/m4/**`
- Affected metadata: `src/content/course-structure.ts`, locale projections, and any admin/editor surfaces that show English lesson data
- Verification surface: English lesson routing, MDX loading without zh fallback, and parity between `/zh` and `/en` module structures
