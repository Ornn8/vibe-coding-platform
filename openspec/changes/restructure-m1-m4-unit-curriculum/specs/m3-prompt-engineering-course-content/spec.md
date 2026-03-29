## MODIFIED Requirements

### Requirement: M3 prompt-engineering lessons SHALL be fully authored in Chinese MDX
The system SHALL include complete Chinese MDX lesson content for the M3 learning arc as five v3-aligned Unit pages covering context, the four prompt elements split across two units, system prompts and `CLAUDE.md`, and prompt anti-patterns plus portfolio building.

#### Scenario: Learner opens an M3 lesson
- **WHEN** a learner visits any Chinese M3 lesson route
- **THEN** the corresponding MDX file SHALL provide complete unit-style instructional copy with multiple Step sections, examples, and exercises

#### Scenario: M3 lessons include reusable prompt patterns
- **WHEN** the four-element, system-prompt, or portfolio lessons are reviewed
- **THEN** they SHALL contain concrete prompt examples, rewrite drills, or reusable templates that learners can adapt in practice

### Requirement: M3 lessons SHALL connect prompt quality to implementation outcomes
Each Chinese M3 lesson SHALL explain how stronger context, role setting, task definition, constraints, and output format change the quality of AI-generated implementation results and how persistent instructions keep collaboration stable over time.

#### Scenario: Context and four-element units demonstrate output differences
- **WHEN** the M3 Unit 3.1 through 3.3 lessons are reviewed
- **THEN** they SHALL compare weaker and stronger prompting patterns for comparable tasks and explain the execution consequences

#### Scenario: System prompt unit bridges to tool usage
- **WHEN** the M3 Unit 3.4 lesson is reviewed
- **THEN** it SHALL explain the role of files such as `CLAUDE.md`, `AGENTS.md`, or equivalent persistent project instructions and ask the learner to draft one
