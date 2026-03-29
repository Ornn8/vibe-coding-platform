## ADDED Requirements

### Requirement: M1 foundation lessons SHALL be fully authored in Chinese MDX
The system SHALL include complete Chinese MDX lesson content for the M1 learning arc, covering the historical context of Vibe Coding, core concept differentiation, tool landscape orientation, and a first-run "Hello World" practice lesson.

#### Scenario: Learner opens an M1 lesson
- **WHEN** a learner visits any Chinese M1 lesson route
- **THEN** the corresponding MDX file SHALL contain complete instructional content rather than placeholder or outline-only text

#### Scenario: M1 lesson structure remains consistent
- **WHEN** an author reviews a Chinese M1 lesson file
- **THEN** the lesson SHALL include valid frontmatter, body content, at least one embedded `<Exercise>` block, and a references section

### Requirement: M1 lessons SHALL align with the approved authoring plan
Each Chinese M1 lesson SHALL reflect the target knowledge points, writing focus, and exercise intent defined in `content-authoring-plan.md`.

#### Scenario: Historical lesson matches the plan
- **WHEN** the 1.1 lesson is reviewed
- **THEN** it SHALL connect the Vibe Coding term origin, its 2025-2026 evolution, and the course path from Vibe Coding to Agentic Engineering

#### Scenario: Tool and onboarding lessons match the plan
- **WHEN** the 1.3 and 1.4 lessons are reviewed
- **THEN** they SHALL include practical tool-selection guidance and a beginner-friendly first-page building exercise consistent with the plan
