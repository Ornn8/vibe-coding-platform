## ADDED Requirements

### Requirement: M3 prompt-engineering lessons SHALL be fully authored in Chinese MDX
The system SHALL include complete Chinese MDX lesson content for the M3 learning arc, covering context design, four-part prompt structure, system prompts, prompt template libraries, and prompt anti-patterns.

#### Scenario: Learner opens an M3 lesson
- **WHEN** a learner visits any Chinese M3 lesson route
- **THEN** the corresponding MDX file SHALL provide complete instructional copy with examples and exercises rather than a placeholder outline

#### Scenario: M3 lessons include reusable prompt patterns
- **WHEN** the prompt-structure or prompt-template lessons are reviewed
- **THEN** they SHALL contain concrete prompt examples or templates that learners can adapt in practice

### Requirement: M3 lessons SHALL connect prompt quality to implementation outcomes
Each Chinese M3 lesson SHALL explain how stronger context, constraints, and prompt structure change the quality of AI-generated implementation results.

#### Scenario: Context lesson demonstrates output differences
- **WHEN** the context lesson is reviewed
- **THEN** it SHALL compare weak-context and rich-context prompting outcomes for a comparable task

#### Scenario: System prompt lesson bridges to tool usage
- **WHEN** the system prompt lesson is reviewed
- **THEN** it SHALL explain the role of files such as `CLAUDE.md`, `AGENTS.md`, or equivalent persistent project instructions
