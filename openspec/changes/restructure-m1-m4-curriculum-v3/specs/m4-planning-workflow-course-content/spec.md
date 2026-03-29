## MODIFIED Requirements

### Requirement: M4 planning-workflow lessons SHALL be fully authored in Chinese MDX
The system SHALL include complete Chinese MDX lesson content for the M4 learning arc, delivered as five v3-style Unit pages that connect planning artifacts, execution loops, Claude Code onboarding, and a workflow-oriented module project.

#### Scenario: Learner opens an M4 lesson
- **WHEN** a learner visits any exposed Chinese M4 lesson route
- **THEN** the corresponding MDX file SHALL contain complete workflow-oriented content and not just topic stubs

#### Scenario: M4 lesson exposure matches the v3 curriculum
- **WHEN** module metadata for M4 is reviewed
- **THEN** it SHALL expose five lessons in the learner UI that align to the v3 sequencing rather than the previous six-lesson layout

### Requirement: M4 lessons SHALL bridge from concept learning into execution discipline
Each Chinese M4 lesson SHALL make planning behavior operational by showing how to turn ideas into artifacts, how to verify AI outputs, and how to use terminal-based coding agents responsibly.

#### Scenario: Planning and workflow lessons connect
- **WHEN** the first two M4 lessons are reviewed together
- **THEN** they SHALL clearly connect PRD and implementation planning with PEV and Ask/Plan execution behavior

#### Scenario: Claude Code workflow is actionable
- **WHEN** the Claude Code onboarding and workflow lessons are reviewed
- **THEN** they SHALL include practical setup guidance, repo-context usage, and a learner task that exercises agent-assisted execution with verification
