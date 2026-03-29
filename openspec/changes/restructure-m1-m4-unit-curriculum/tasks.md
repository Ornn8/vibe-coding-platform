## 1. Course Structure

- [ ] 1.1 Update `src/content/course-structure.ts` so M1-M4 lesson arrays reflect the v3 unit map, titles, descriptions, and project framing.
- [ ] 1.2 Keep compatibility with the existing `lessons` data contract while documenting the unit-as-lesson transitional model.

## 2. MDX Runtime Support

- [ ] 2.1 Extend shared MDX components to support a `Separator` component and optional `id` / `level` props on `<Exercise>`.
- [ ] 2.2 Verify the new MDX syntax compiles through the existing `next-mdx-remote` pipeline.

## 3. M1-M4 Chinese Content Rewrite

- [ ] 3.1 Rewrite M1 Chinese MDX files to the four-unit v3 structure.
- [ ] 3.2 Rewrite M2 Chinese MDX files to the five-unit v3 structure and add the new project-oriented unit.
- [ ] 3.3 Rewrite M3 Chinese MDX files to the v3 prompt-engineering structure with split four-element coverage.
- [ ] 3.4 Rewrite M4 Chinese MDX files to the five-unit v3 workflow structure, including Claude Code onboarding and CRUD execution guidance.

## 4. Verification and Review

- [ ] 4.1 Run `npm run lint`.
- [ ] 4.2 Run `npx tsc --noEmit`.
- [ ] 4.3 Review the changed curriculum against `curriculum-v3.md` for module/unit coverage and remove stale files no longer referenced by the new lesson map.
