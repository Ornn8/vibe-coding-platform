## ADDED Requirements

### Requirement: Learner lesson routes SHALL resolve against the current exposed curriculum slugs
The system SHALL resolve learner lesson pages using the current M1-M4 lesson slug set exposed by the curriculum, even when persisted lesson records still contain legacy slugs from earlier content versions.

#### Scenario: Legacy slug exists in persisted lesson data
- **WHEN** the learning layer loads a module whose persisted lessons still use a pre-v3 slug
- **THEN** the learner route resolution SHALL still find the current v3 lesson page instead of returning a 404

#### Scenario: Exposed lesson slug has a matching content file
- **WHEN** the learner UI renders a link for any exposed M1-M4 lesson
- **THEN** following that link SHALL resolve to a loadable MDX file in the current curriculum tree

### Requirement: Lesson slug migrations SHALL preserve learner continuity
The system SHALL define a migration or mapping path for M1-M4 lesson slug changes so progress, submissions, and navigation do not become orphaned after curriculum updates.

#### Scenario: Existing progress references a legacy lesson slug
- **WHEN** a learner has progress or submissions attached to an older M1-M4 lesson record
- **THEN** the system SHALL preserve access to that learner state after the slug migration or runtime mapping is applied
