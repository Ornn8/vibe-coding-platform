## MODIFIED Requirements

### Requirement: M3 prompt-engineering lessons SHALL be fully authored in Chinese MDX
The system SHALL include complete Chinese MDX lesson content for the M3 learning arc, delivered as five v3-style Unit pages that cover context design, prompt elements, system prompts, and reusable prompt assets.

#### Scenario: Learner opens an M3 lesson
- **WHEN** a learner visits any Chinese M3 lesson route
- **THEN** the corresponding MDX file SHALL contain complete Unit-style content with Step sections, concrete examples, and learner exercises

#### Scenario: M3 lessons stay reusable and practical
- **WHEN** an M3 lesson is reviewed
- **THEN** it SHALL provide before/after examples, prompt-writing guidance, and an exercise that can be reused in the learner's own projects

### Requirement: M3 lessons SHALL operationalize context engineering
Each Chinese M3 lesson SHALL connect prompt writing to the broader methodology of stabilizing context, setting constraints, and building reusable prompt assets.

#### Scenario: Four-element lessons cover both halves of the framework
- **WHEN** the middle M3 lessons are reviewed together
- **THEN** they SHALL collectively cover role/task definition as well as constraints/output formatting

#### Scenario: CLAUDE.md lesson teaches project-level prompting
- **WHEN** the system-prompt-focused M3 lesson is reviewed
- **THEN** it SHALL explain how project-level instructions such as `CLAUDE.md` or `AGENTS.md` stabilize long-running AI collaboration
