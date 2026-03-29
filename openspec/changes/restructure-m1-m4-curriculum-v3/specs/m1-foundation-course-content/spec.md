## MODIFIED Requirements

### Requirement: M1 foundation lessons SHALL be fully authored in Chinese MDX
The system SHALL include complete Chinese MDX lesson content for the M1 learning arc, delivered as four v3-style Unit pages that cover Vibe Coding cognition, tool selection, first-page practice, and a closing module project.

#### Scenario: Learner opens an M1 lesson
- **WHEN** a learner visits any Chinese M1 lesson route
- **THEN** the corresponding MDX file SHALL contain complete Unit-style instructional content rather than outline-only text

#### Scenario: M1 lesson structure remains consistent
- **WHEN** an author reviews a Chinese M1 lesson file
- **THEN** the lesson SHALL include valid frontmatter, methodology framing, multiple `## Step` sections, embedded `<Exercise>` blocks, and a references section

### Requirement: M1 lessons SHALL align with the approved authoring plan
Each Chinese M1 lesson SHALL reflect the M1 Unit sequencing in `curriculum-v3.md`, including explicit emphasis on planning-driven learning behavior from the first module.

#### Scenario: Awareness unit introduces the course arc
- **WHEN** the first M1 lesson is reviewed
- **THEN** it SHALL explain what Vibe Coding is, compare adjacent modes, and connect the course path from Vibe Coding to Agentic Engineering

#### Scenario: Tooling and build units stay practical
- **WHEN** the tool-selection and first-build M1 lessons are reviewed
- **THEN** they SHALL include actionable prompts, tool-choice guidance, and beginner-friendly practice tasks consistent with the v3 curriculum
