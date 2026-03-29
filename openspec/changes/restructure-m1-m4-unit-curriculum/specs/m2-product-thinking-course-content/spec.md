## MODIFIED Requirements

### Requirement: M2 product-thinking lessons SHALL be fully authored in Chinese MDX
The system SHALL include complete Chinese MDX lesson content for the M2 learning arc as five v3-aligned Unit pages covering failure analysis, soul-question framing, MVP prioritization, user journey and requirement expression, and a requirement-doc plus MVP project page.

#### Scenario: Learner opens an M2 lesson
- **WHEN** a learner visits any Chinese M2 lesson route
- **THEN** the corresponding MDX file SHALL contain complete unit-style instructional content aligned to the v3 module theme

#### Scenario: M2 lessons include actionable exercises
- **WHEN** an M2 lesson is reviewed
- **THEN** it SHALL embed `<Exercise>` blocks that ask the learner to produce concrete planning artifacts such as user personas, P0/P1/P2 scopes, journey maps, or requirement text

### Requirement: M2 lessons SHALL teach planning inputs for AI-assisted product building
Each Chinese M2 lesson SHALL translate product-thinking concepts into artifacts or decisions that improve downstream AI implementation quality, using the v3 emphasis on planning-driven prompting and closed-loop delivery.

#### Scenario: Failure and MVP units teach prioritization discipline
- **WHEN** the M2 Unit 2.1 and 2.3 lessons are reviewed
- **THEN** they SHALL connect project failure patterns and P0/P1/P2 prioritization to avoiding over-scoped AI implementation

#### Scenario: Journey and project units teach operational prompts
- **WHEN** the M2 Unit 2.4 and 2.5 lessons are reviewed
- **THEN** they SHALL show how journey maps and requirement documents become inputs for later AI coding workflows
