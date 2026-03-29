## ADDED Requirements

### Requirement: Module catalog and tier visibility
The system SHALL present all configured learning modules in learner-facing navigation and module listing views, including tier distinctions for core and advanced modules.

#### Scenario: Module list shows all modules
- **WHEN** a learner opens the modules index
- **THEN** the system displays every configured module with title, description, duration, lesson count, and progress summary

#### Scenario: Advanced modules are distinguished
- **WHEN** a learner views modules marked as advanced
- **THEN** the UI indicates that the module belongs to the advanced tier

### Requirement: MDX lesson delivery
The system SHALL render lesson content from locale-specific MDX files and MUST support embedded learning components such as exercises and callouts.

#### Scenario: Localized lesson is resolved
- **WHEN** a learner opens a lesson route for a given locale and lesson slug
- **THEN** the system loads the matching MDX file and metadata for that locale

#### Scenario: MDX embeds are rendered
- **WHEN** a lesson contains supported embedded components
- **THEN** the system renders those components within the lesson content area

### Requirement: Lesson completion tracking
The system SHALL allow authenticated learners to mark lessons as completed and MUST persist completion state per user and lesson.

#### Scenario: Learner completes a lesson
- **WHEN** a learner activates the lesson completion control
- **THEN** the system stores the completion record and shows the lesson as completed on refresh

#### Scenario: Module completion is derived
- **WHEN** a learner has completed every lesson in a module
- **THEN** the system marks that module as completed in learner progress views

### Requirement: Learner progress visibility
The system SHALL show personal progress summaries in the learner experience, including lesson totals, module totals, and recent activity indicators.

#### Scenario: Profile progress overview is displayed
- **WHEN** a learner opens the profile page
- **THEN** the system shows progress totals derived from persisted lesson completion data

#### Scenario: Activity log is updated once per day
- **WHEN** an authenticated learner is active on a given date
- **THEN** the system records at most one daily activity entry for that user and date
