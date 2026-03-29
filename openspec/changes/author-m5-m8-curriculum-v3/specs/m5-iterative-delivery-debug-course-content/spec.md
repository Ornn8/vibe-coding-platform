## ADDED Requirements

### Requirement: M5 iterative-delivery lessons SHALL be fully authored in Chinese MDX
The system SHALL include complete Chinese MDX lesson content for the M5 learning arc, delivered as five Unit-style lesson pages that cover stepwise implementation, debugging workflows, memory-bank usage, tool collaboration, and iterative CRUD delivery.

#### Scenario: Learner opens an M5 lesson
- **WHEN** a learner visits any Chinese M5 lesson route
- **THEN** the corresponding MDX file SHALL contain complete Unit-Step instructional content rather than outline-only text

#### Scenario: M5 lessons remain workflow-oriented
- **WHEN** an M5 lesson is reviewed
- **THEN** it SHALL include methodology framing, multiple `## Step` sections, and exercises that move from diagnosis into execution

### Requirement: M5 lessons SHALL operationalize iterative delivery discipline
Each Chinese M5 lesson SHALL teach how to break delivery into bounded steps, debug with AI, preserve context across sessions, and keep versioned checkpoints while iterating an existing project.

#### Scenario: Debug lesson teaches AI-assisted diagnosis
- **WHEN** the debugging-focused M5 lesson is reviewed
- **THEN** it SHALL show how to feed runtime errors, visual defects, or expected-vs-actual behavior back to AI as structured debug input

#### Scenario: Module project extends an existing CRUD app
- **WHEN** the M5 module project lesson is reviewed
- **THEN** it SHALL require iteration on an existing project, not a greenfield rebuild, and SHALL specify the project artifacts required for submission
