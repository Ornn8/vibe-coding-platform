## ADDED Requirements

### Requirement: Lesson exercise submissions
The system SHALL allow authenticated learners to submit lesson exercise responses and MUST persist text and link-based submissions against the associated exercise.

#### Scenario: Text exercise is submitted
- **WHEN** a learner submits a text response for a lesson exercise
- **THEN** the system stores the submission and shows that the exercise has been submitted

#### Scenario: Link exercise is submitted
- **WHEN** a learner submits a URL response for a lesson exercise
- **THEN** the system stores the submission and associates it with the learner and exercise

### Requirement: Module project submissions
The system SHALL provide a dedicated project submission experience for each module project and MUST support draft and submitted states.

#### Scenario: Draft project is saved
- **WHEN** a learner saves a module project without final submission
- **THEN** the system preserves the current project content as a draft

#### Scenario: Project is submitted
- **WHEN** a learner submits a completed module project
- **THEN** the system records the submission state as submitted and exposes it in learner project listings

### Requirement: Submission checklist tracking
The system SHALL require learners to persist checklist progress for module project submissions and MUST not allow final submission unless the required checklist state is present.

#### Scenario: Checklist state is saved
- **WHEN** a learner updates self-review checklist items for a module project
- **THEN** the system stores the checklist state with the submission

#### Scenario: Final submission without checklist is blocked
- **WHEN** a learner attempts to submit a module project without the required checklist completion data
- **THEN** the system rejects the submission and shows a validation error

### Requirement: Prompt portfolio management
The system SHALL allow learners to create, edit, list, and remove personal prompt portfolio entries.

#### Scenario: Learner creates prompt entry
- **WHEN** a learner saves a new prompt portfolio item with title and content
- **THEN** the system stores the item under that learner's account

#### Scenario: Learner updates existing prompt entry
- **WHEN** a learner edits an existing prompt portfolio item
- **THEN** the system persists the updated content and shows it in the portfolio list
