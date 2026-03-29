## ADDED Requirements

### Requirement: M7 agentic-engineering lessons SHALL be fully authored in Chinese MDX
The system SHALL include complete Chinese MDX lesson content for the M7 learning arc, delivered as four Unit-style lesson pages that cover Agentic Engineering, multi-agent workflows, quality guardrails, and automated delivery.

#### Scenario: Learner opens an M7 lesson
- **WHEN** a learner visits any Chinese M7 lesson route
- **THEN** the corresponding MDX file SHALL contain complete Unit-Step instructional content instead of placeholder summaries

#### Scenario: M7 remains clearly advanced-tier content
- **WHEN** M7 metadata is reviewed in the learning experience
- **THEN** the module SHALL remain marked as `ADVANCED` and the lesson content SHALL assume completion of M1-M6

### Requirement: M7 lessons SHALL teach agent orchestration rather than prompt-only execution
Each Chinese M7 lesson SHALL explain how work is split across agents, how quality is protected at scale, and how human review remains part of the delivery loop.

#### Scenario: Multi-agent lesson defines role separation
- **WHEN** the multi-agent workflow lesson is reviewed
- **THEN** it SHALL distinguish planning, coding, testing, and review responsibilities in an agentic workflow

#### Scenario: Quality-guard lesson includes review boundaries
- **WHEN** the quality-guard lesson is reviewed
- **THEN** it SHALL define which outputs require human review and which repetitive outputs may be trusted or automated
