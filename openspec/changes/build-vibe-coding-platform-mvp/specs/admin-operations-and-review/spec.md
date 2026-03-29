## ADDED Requirements

### Requirement: Admin content operations
The system SHALL provide Chinese-first admin interfaces for managing modules, lessons, exercises, and checklist items.

#### Scenario: Admin edits module metadata
- **WHEN** an admin updates module fields such as title, description, duration, tier, or order
- **THEN** the system persists the updated module data for subsequent learner and admin views

#### Scenario: Admin manages lesson structure
- **WHEN** an admin creates, edits, reorders, or deletes lesson-related entities
- **THEN** the system updates the associated lesson, exercise, and checklist records consistently

### Requirement: Admin user management
The system SHALL provide an admin user listing with searchable learner data and MUST support role management for eligible accounts.

#### Scenario: Admin searches users
- **WHEN** an admin filters the user list by name, email, role, or activity state
- **THEN** the system returns a filtered set of users matching the selected criteria

#### Scenario: Admin changes user role
- **WHEN** an admin updates a user's role from student to admin or the reverse
- **THEN** the system persists the new role and applies it to future authorization checks

### Requirement: Admin analytics dashboard
The system SHALL provide a dashboard summarizing learner counts, activity, completion metrics, and submission totals using aggregated platform data.

#### Scenario: Dashboard summary cards load
- **WHEN** an admin opens the dashboard
- **THEN** the system shows aggregated totals for registered users, active users, completion rate, and submissions

#### Scenario: Module funnel data is displayed
- **WHEN** dashboard charts are rendered
- **THEN** the system shows module-level start and completion data derived from learner progress records

### Requirement: Project review workflow
The system SHALL provide an admin review queue for module project submissions and MUST support status updates and review notes.

#### Scenario: Admin opens review queue
- **WHEN** an admin visits the reviews page
- **THEN** the system lists project submissions ordered for review with learner, module, and submission metadata

#### Scenario: Admin records review outcome
- **WHEN** an admin saves review feedback and updates a submission status
- **THEN** the system stores the review note and exposes the updated status to learner-facing views
