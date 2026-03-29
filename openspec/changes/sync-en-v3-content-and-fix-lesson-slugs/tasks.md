## 1. Routing Diagnosis And Migration

- [ ] 1.1 Audit the current lesson source of truth for learner routes and identify where legacy M1-M4 slugs are still persisted
- [ ] 1.2 Implement a runtime mapping or data migration so M1-M4 learner routes resolve to the current v3 lesson slugs without 404s

## 2. English Metadata Alignment

- [ ] 2.1 Update bilingual course metadata so M1-M4 English lessons use the same v3 slug set and order as Chinese
- [ ] 2.2 Verify that every exposed English M1-M4 lesson slug has a matching MDX file or a deliberate fallback path

## 3. English Content Authoring

- [ ] 3.1 Rewrite English M1 lesson files to match the v3 Unit-style curriculum
- [ ] 3.2 Rewrite English M2 lesson files to match the v3 Unit-style curriculum
- [ ] 3.3 Rewrite English M3 lesson files to match the v3 Unit-style curriculum
- [ ] 3.4 Rewrite English M4 lesson files to match the v3 Unit-style curriculum

## 4. Verification

- [ ] 4.1 Validate learner lesson routing for zh and en under the current authenticated learning flow
- [ ] 4.2 Run lint and type-oriented checks after the routing and English content updates
