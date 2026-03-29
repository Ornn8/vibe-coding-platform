## MODIFIED Requirements

### Requirement: M1 foundation lessons SHALL be fully authored in Chinese MDX
The system SHALL include complete Chinese MDX lesson content for the M1 learning arc as four v3-aligned Unit pages covering what Vibe Coding is, tool selection, the first AI-generated webpage, and the module project kickoff.

#### Scenario: Learner opens an M1 lesson
- **WHEN** a learner visits any Chinese M1 lesson route
- **THEN** the corresponding MDX file SHALL present a unit-style page with multiple `## Step` sections instead of a single-topic stub

#### Scenario: M1 lesson structure remains consistent
- **WHEN** an author reviews a Chinese M1 lesson file
- **THEN** the lesson SHALL include valid frontmatter, methodology callout content, multiple Step sections, embedded `<Exercise>` blocks, and a references section

### Requirement: M1 lessons SHALL align with the approved authoring plan
Each Chinese M1 lesson SHALL reflect the v3 unit map in `curriculum-v3.md`, including folding mode comparison into Unit 1.1, focusing Unit 1.2 on tool landscape choices, making Unit 1.3 a guided first-build exercise, and turning Unit 1.4 into the module project preparation page.

#### Scenario: Introductory unit matches the v3 plan
- **WHEN** the M1 Unit 1.1 lesson is reviewed
- **THEN** it SHALL explain Vibe Coding, compare Vibe / Spec / Agentic modes, and introduce planning-driven learning as the module methodology thread

#### Scenario: Tool and project units match the v3 plan
- **WHEN** the M1 Unit 1.2 through 1.4 lessons are reviewed
- **THEN** they SHALL cover tool selection, first-page iteration workflow, and a guided static-site project plan consistent with `curriculum-v3.md`
