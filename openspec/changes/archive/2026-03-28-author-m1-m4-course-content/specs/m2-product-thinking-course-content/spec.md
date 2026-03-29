## ADDED Requirements

### Requirement: M2 product-thinking lessons SHALL be fully authored in Chinese MDX
The system SHALL include complete Chinese MDX lesson content for the M2 learning arc, covering soul-question framing, MVP thinking, user journeys, and product-definition anti-patterns.

#### Scenario: Learner opens an M2 lesson
- **WHEN** a learner visits any Chinese M2 lesson route
- **THEN** the corresponding MDX file SHALL contain complete instructional content aligned to the module theme

#### Scenario: M2 lessons include actionable exercises
- **WHEN** an M2 lesson is reviewed
- **THEN** it SHALL embed at least one `<Exercise>` block that asks the learner to apply the lesson framework to a concrete product scenario

### Requirement: M2 lessons SHALL teach planning inputs for AI-assisted product building
Each Chinese M2 lesson SHALL translate product-thinking concepts into artifacts or decisions that improve downstream AI implementation quality.

#### Scenario: MVP lesson teaches prioritization
- **WHEN** the MVP lesson is reviewed
- **THEN** it SHALL distinguish P0, P1, and P2 scope decisions and connect them to avoiding over-scoped AI implementation

#### Scenario: User-journey lesson teaches operational prompts
- **WHEN** the user-journey lesson is reviewed
- **THEN** it SHALL show how learner journey mapping informs the instructions later given to AI coding tools
