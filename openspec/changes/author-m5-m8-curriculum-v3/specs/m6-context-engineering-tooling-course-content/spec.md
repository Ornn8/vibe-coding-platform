## ADDED Requirements

### Requirement: M6 tooling lessons SHALL be fully authored in Chinese MDX
The system SHALL include complete Chinese MDX lesson content for the M6 learning arc, delivered as five Unit-style lesson pages that cover context engineering, skills, MCP, and toolchain design.

#### Scenario: Learner opens an M6 lesson
- **WHEN** a learner visits any Chinese M6 lesson route
- **THEN** the corresponding MDX file SHALL contain complete Unit-Step instructional content aligned to the module theme

#### Scenario: M6 lessons stay tool-architecture focused
- **WHEN** an M6 lesson is reviewed
- **THEN** it SHALL explain what a tool capability enables, what operating guidance is required, and how the learner applies both in practice

### Requirement: M6 lessons SHALL connect tools to context engineering
Each Chinese M6 lesson SHALL move beyond prompt-writing tactics and explain how CLAUDE.md, memory-bank files, Skills, and MCP integrations work together as a context-engineering system.

#### Scenario: Skill lesson distinguishes capability from guidance
- **WHEN** the Skill-related M6 lessons are reviewed
- **THEN** they SHALL explain that MCP provides access while Skills provide reusable operating guidance

#### Scenario: Module project requires a configured toolchain
- **WHEN** the M6 module project lesson is reviewed
- **THEN** it SHALL require a project-level toolchain plan that includes CLAUDE.md, at least one self-authored Skill, and at least one MCP-backed workflow or equivalent integration plan
