## MODIFIED Requirements

### Requirement: M2 product-thinking lessons SHALL be fully authored in Chinese MDX
The system SHALL include complete Chinese MDX lesson content for the M2 learning arc, delivered as five v3-style Unit pages that cover failure analysis, soul questions, MVP prioritization, user journeys, and a requirement-doc-driven module project.

#### Scenario: Learner opens an M2 lesson
- **WHEN** a learner visits any Chinese M2 lesson route
- **THEN** the corresponding MDX file SHALL contain complete instructional content aligned to the module theme and organized into Step-based sections

#### Scenario: M2 lessons include actionable exercises
- **WHEN** an M2 lesson is reviewed
- **THEN** it SHALL embed multiple `<Exercise>` blocks that ask the learner to turn product-thinking concepts into concrete planning artifacts

### Requirement: M2 lessons SHALL teach planning inputs for AI-assisted product building
Each Chinese M2 lesson SHALL translate product-thinking concepts into artifacts or decisions that improve downstream AI implementation quality.

#### Scenario: MVP lesson teaches prioritization
- **WHEN** the MVP-focused M2 lesson is reviewed
- **THEN** it SHALL distinguish P0, P1, and P2 scope decisions and connect them to avoiding over-scoped AI implementation

#### Scenario: Closing project lesson bridges document to build
- **WHEN** the closing M2 project lesson is reviewed
- **THEN** it SHALL require learners to produce a requirement document and connect it to an MVP implementation workflow
